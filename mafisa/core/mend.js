/* ===========================================================================
   MEND PLATFORMS — SHARED CORE
   Mafisa · Pitso · Matsema. One identity, one verification pipeline, one
   reputation, one ledger. Three front ends that look nothing alike.

   © MEND GROUP (PTY) LTD · Reg 96070 · TIN 200176439-4

   TWO MODES, AND THE APP ALWAYS SAYS WHICH ONE IT IS IN:

     connected  — core/config.js carries a Supabase URL + ANON key. Real
                  Postgres, real auth, real storage, RLS enforced server-side.
     device     — no config. Everything lives in this browser only. Seeded so
                  the platform can be demonstrated, and labelled on screen so
                  nobody mistakes a demonstration for a deployment.

   The ANON key is the only key that ever appears here. The service_role key
   must never reach a browser: RLS in db/003_rls.sql is what protects the data,
   and service_role bypasses every policy in that file.
   =========================================================================== */
(function (global) {
  'use strict';

  const CFG = global.MEND_CONFIG || {};

  /* CONFIGURED means a URL and key are present. It does NOT mean the server
     answered. Those are different claims and conflating them is how a page ends
     up announcing "Connected · shared across everyone" while running entirely on
     localStorage. Only a completed round-trip sets status to 'connected'. */
  const CONFIGURED = !!(CFG.supabaseUrl && CFG.supabaseAnonKey);
  const REST = CONFIGURED ? CFG.supabaseUrl.replace(/\/+$/, '') + '/rest/v1' : null;
  const AUTH = CONFIGURED ? CFG.supabaseUrl.replace(/\/+$/, '') + '/auth/v1'  : null;

  let status = CONFIGURED ? 'connecting' : 'device';   // device|connecting|connected|unreachable
  let statusDetail = '';
  const statusWatchers = [];
  function onStatus(fn) { statusWatchers.push(fn); fn(status, statusDetail); }
  function setStatus(s, detail) {
    status = s; statusDetail = detail || '';
    statusWatchers.forEach(function (f) { try { f(status, statusDetail); } catch (e) {} });
  }

  /* Every table the apps read, with HOW MUCH of it to fetch.
     
     This used to be select=* with no limit, on every open. PostgREST does not
     cap that: 21KB on an empty database, and megabytes once there are a few
     thousand assets. On a connection somebody pays for by the megabyte,
     "download the whole database to look at one bakkie" is not a performance
     problem, it is a bill — which makes this the same problem as everything
     else here, not a separate engineering concern.

       limit  how many rows at most
       order  which ones, when there are more than that
       where  a PostgREST filter, so rows nobody can see are never sent. May be
              a function, evaluated at connect time, for a filter that depends
              on who is signed in.
     
     Most tables need no limit because row level security already scopes them to
     one person: their own documents, their own engagements, their own
     disputes. The ones listed here are the public, unbounded ones. */
  /* Open to everyone, plus your own whatever its state. Without the second
     half, a request that was withdrawn or taken down is never downloaded, so
     the person who posted it cannot see it OR the notice explaining where it
     went — the one person the notice is written for. Takes the owner column
     because each platform names it differently. */
  function openOrMine(col) {
    return function () {
      const mine = db && db.session && db.session.profile_id;
      return mine ? 'or=(state.eq.open,' + col + '.eq.' + mine + ')' : 'state=eq.open';
    };
  }

  const TABLES = {
    profiles:           { limit: 300, order: 'created_at.desc' },
    entities:           { limit: 300 },
    pitso_trades:       { limit: 100 },              // reference data, small and fixed
    mafisa_categories:  { limit: 100 },
    pitso_providers:    { limit: 200, order: 'created_at.desc' },
    pitso_requests:     { limit: 200, order: 'created_at.desc', where: openOrMine('requester_id') },
    pitso_offers:       { limit: 200, order: 'created_at.desc' },
    mafisa_assets:      { limit: 200, order: 'created_at.desc' },
    mafisa_loans:       { limit: 200, order: 'created_at.desc' },
    matsema_pools:      { limit: 200, order: 'created_at.desc' },
    matsema_pledges:    { limit: 500, order: 'created_at.desc' },
    matsema_deliveries: { limit: 500, order: 'due_on.asc' },
    documents:          { limit: 200, order: 'created_at.desc' },
    engagements:        { limit: 200, order: 'created_at.desc' },
    reviews:            { limit: 300, order: 'created_at.desc' },
    settlements:        { limit: 200, order: 'created_at.desc' },
    disputes:           { limit: 100, order: 'created_at.desc' },
    dispute_statements: { limit: 300, order: 'created_at.asc' },
    attachments:        { limit: 200, order: 'created_at.desc' },
    reports:            { limit: 100, order: 'created_at.desc' },
    moderation:         { limit: 100, order: 'created_at.desc' },
    report_signal:      { limit: 200 },   // counts only; the claim text never leaves the desk
    notifications:      { limit: 100, order: 'created_at.desc' },
    ledger:             { limit: 100, order: 'seq.desc' }
  };
  const TABLE_NAMES = Object.keys(TABLES);

  /* What was left behind. A bounded list that does not say it is bounded is
     lying by omission — "200 of 4,312" is honest, showing 200 silently is not. */
  let coverage = {};
  function coverageOf(table) { return coverage[table] || null; }

  /* Tables keyed by profile_id rather than a synthetic id. update() needs to
     know which column addresses a row. */
  const PK = { pitso_providers: 'profile_id', entities: 'profile_id',
               pitso_trades: 'code', mafisa_categories: 'code', ledger: 'seq' };
  const pkOf = function (table) { return PK[table] || 'id'; };

  let session = null;               // { access_token, user: { id } } once signed in
  const writeErrors = [];
  const errorWatchers = [];
  function onWriteError(fn) { errorWatchers.push(fn); }
  function reportWriteError(e) {
    writeErrors.push(e);
    errorWatchers.forEach(function (f) { try { f(e); } catch (x) {} });
  }

  function bearer() { return (session && session.access_token) || CFG.supabaseAnonKey; }

  /* Same request, but reads the total out of Content-Range so a bounded list
     can tell the person how much it is not showing them.

     This asks for count=estimated, NOT count=planned. count=planned is the
     planner's guess and it is free, but it is a guess even when the truth is
     cheap: measured against this schema, an EMPTY pitso_requests reported 380.
     "Showing 0 of 380" is not an approximation, it is a number we invented, and
     the whole point of this line is to be honest about what is missing.
     count=estimated does a real count while the table is small and falls back to
     the estimate only once it is big; measured exact at 500, 2,000 and 5,000
     rows, which is past anything these platforms will hold for years. */
  async function restWithCount(path) {
    const res = await fetch(REST + path, {
      headers: { 'apikey': CFG.supabaseAnonKey, 'Authorization': 'Bearer ' + bearer(),
                 'Content-Type': 'application/json', 'Prefer': 'count=estimated' }
    });
    if (!res.ok) {
      const err = new Error('HTTP ' + res.status); err.status = res.status; throw err;
    }
    const range = res.headers.get('content-range') || '';
    const total = parseInt((range.split('/')[1] || ''), 10);
    return { rows: await res.json(), total: isNaN(total) ? null : total };
  }

  async function rest(path, opts) {
    opts = opts || {};
    const res = await fetch(REST + path, {
      method: opts.method || 'GET',
      headers: Object.assign({
        'apikey': CFG.supabaseAnonKey,
        'Authorization': 'Bearer ' + bearer(),
        'Content-Type': 'application/json'
      }, opts.headers || {}),
      body: opts.body ? JSON.stringify(opts.body) : undefined
    });
    if (!res.ok) {
      const text = await res.text().catch(function () { return ''; });
      const err = new Error('HTTP ' + res.status + (text ? ' — ' + text.slice(0, 240) : ''));
      err.status = res.status;
      throw err;
    }
    return res.status === 204 ? null : res.json();
  }

  // ---- money ---------------------------------------------------------------
  // Lesotho loti, at par with the rand. Stored as integer cents everywhere,
  // because float arithmetic on money is how quotes stop reconciling.
  // en-US grouping on purpose: M45,999.00, matching the TM Stone quote builder
  // and every document MEND has already put in front of a client. en-ZA would
  // render M45 999,00 and make two MEND systems disagree on the same page.
  const M = (cents) =>
    cents == null ? '—'
    : 'M' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const Mshort = (cents) =>
    cents == null ? '—'
    : 'M' + Math.round(cents / 100).toLocaleString('en-US');

  const DISTRICTS = ['Maseru', 'Berea', 'Leribe', 'Mafeteng', 'Mohale’s Hoek',
    'Quthing', 'Qacha’s Nek', 'Mokhotlong', 'Thaba-Tseka', 'Butha-Buthe'];

  // ---- dates ---------------------------------------------------------------
  const today = () => new Date().toISOString().slice(0, 10);
  const daysUntil = (d) => d ? Math.ceil((new Date(d) - new Date(today())) / 86400000) : null;
  const fmtDate = (d) => d ? new Date(d + 'T00:00:00').toLocaleDateString('en-ZA',
    { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  /* -------------------------------------------------------------------------
     DEVICE STORE
     Mirrors the shape of the SQL schema, not a convenient subset of it, so an
     app written against device mode works unchanged against Postgres. Where a
     rule exists in SQL as a trigger or constraint, the same rule is repeated
     here and points at its migration, so the two cannot silently diverge.
     ------------------------------------------------------------------------- */
  const KEY = 'mend.platforms.v1';
  let db = null;

  /* A SESSION IS THE TOKEN, NOT THE ROW THAT REMEMBERS IT.

     `session` — the object holding the access token — lives in memory and dies
     with the page. The profile id was being written to localStorage as well, so
     after a reload me() answered with a person while bearer() had fallen back to
     the anon key. The screen said signed in; the server had never heard of them.
     It failed closed, which is the only reason it was not a leak: lists came back
     empty and writes did nothing, and the person was told neither.

     So on load, a remembered profile with no live token is not a session. Clear
     it and say so. In device preview there is no token to lose and signInAs is
     how the demo works, so this applies only when a server is configured. */
  let signedOutOnReload = false;

  function load() {
    if (db) return db;
    try { db = JSON.parse(localStorage.getItem(KEY)); } catch (e) { db = null; }
    if (!db) { db = seed(); save(); }
    if (CONFIGURED && db.session && !session) {
      db.session = null;
      signedOutOnReload = true;
      save();
    }
    return db;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} }
  /* Real UUIDs: the database columns are uuid, so a locally generated id must be
     one too or an optimistic row can never be reconciled with the stored row. */
  function uid() {
    const c = global.crypto || (typeof globalThis !== 'undefined' && globalThis.crypto);
    if (c && c.randomUUID) return c.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (ch) {
      const r = Math.random() * 16 | 0;
      return (ch === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // ---- the ledger, in the browser -----------------------------------------
  // Same idea as db/001_spine.sql: append only, each entry carrying the hash of
  // the one before it. Not a blockchain and not pretending to be one — it is a
  // record that cannot be quietly edited, which was the only part worth having.
  async function sha256(text) {
    const c = global.crypto || (typeof globalThis !== 'undefined' && globalThis.crypto);
    if (c && c.subtle) {
      const buf = await c.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
    }
    let h = 0; for (let i = 0; i < text.length; i++) { h = (h * 31 + text.charCodeAt(i)) | 0; }
    return 'nocrypto' + (h >>> 0).toString(16);
  }

  /* Writes are SERIALISED through this queue, and that is not incidental.
     Hashing is async (crypto.subtle returns a promise), so a naive implementation
     reads the previous hash and the next sequence number, awaits the digest, and
     only then pushes. Two actions in the same tick therefore both read the same
     state and produce two rows claiming seq 1 with the same prev_hash — a chain
     that verifies as broken from its first entry. Found by the Pitso build.
     Everything below the await must be inside the critical section. */
  let ledgerQueue = Promise.resolve();

  function record(event_type, opts) {
    const run = async () => {
      const d = load(); opts = opts || {};
      const prev = d.ledger.length ? d.ledger[d.ledger.length - 1].hash : null;
      const row = {
        seq: d.ledger.length + 1,
        occurred_at: new Date().toISOString(),
        actor_id: opts.actor_id || (d.session && d.session.profile_id) || null,
        platform: opts.platform || null,
        event_type,
        subject_table: opts.subject_table || null,
        subject_id: opts.subject_id || null,
        payload: opts.payload || {},
        prev_hash: prev
      };
      row.hash = await sha256([prev || 'genesis', row.occurred_at, row.actor_id || '-',
                               row.event_type, row.subject_id || '-', JSON.stringify(row.payload)].join('|'));
      d.ledger.push(row); save();

      /* The ledger has to reach Postgres or it is a diary, not a record: it was
         device-only, and a reconnect replaced the cache and took it with it.
         seq, prev_hash and hash are deliberately NOT sent — the ledger_chain()
         trigger computes the authoritative chain server-side, and a client that
         supplied its own would be chaining a record it also controls. */
      if (CONFIGURED) {
        enqueue({ op: 'insert', table: 'ledger', key: 'seq', id: row.seq,
                  body: { occurred_at: row.occurred_at, actor_id: row.actor_id,
                          platform: row.platform, event_type: row.event_type,
                          subject_table: row.subject_table, subject_id: row.subject_id,
                          payload: row.payload },
                  queued_at: new Date().toISOString() });
        flushOutbox();
      }
      return row;
    };
    // Chain onto the queue, and never let one failed write wedge every later one.
    const next = ledgerQueue.then(run, run);
    ledgerQueue = next.catch(() => {});
    return next;
  }

  /* Two different questions, and conflating them would be dishonest.

     Connected: row level security shows a person only their OWN ledger entries,
     so the chain they can see has gaps by design and CANNOT be checked locally —
     entry 9's prev_hash refers to entry 8, which belongs to somebody else. The
     server checks the whole chain and reports whether it is intact, without
     revealing what is in it.

     Device: there is one chain and it is all here, so check it directly. */
  async function verifyLedger() {
    const d = load();
    /* An empty chain is not an intact chain. It said "THE RECORD IS INTACT —
       0 entries. Nothing has been altered", which is the confident green answer
       to a question nobody asked: there was nothing to alter. On a page that
       sells this as the audit trail, that is the worst possible thing to show a
       prospect who came to test exactly this. */
    if (!d.ledger || d.ledger.length === 0) {
      return { ok: null, entries: 0, empty: true, scope: 'device',
               note: t('rec.nothing_to_check') };
    }
    if (status === 'connected') {
      try {
        const broken = await rest('/rpc/ledger_verify', { method: 'POST', body: {} });
        return (broken && broken.length)
          ? { ok: false, broken_at: broken[0].broken_at, scope: 'server' }
          : { ok: true, entries: d.ledger.length, scope: 'server',
              note: t('rec.server_checked') };
      } catch (e) {
        return { ok: null, scope: 'server', error: t('rec.could_not_ask', { why: e.message }) };
      }
    }
    for (let i = 0; i < d.ledger.length; i++) {
      const expect = i === 0 ? null : d.ledger[i - 1].hash;
      if (d.ledger[i].prev_hash !== expect)
        return { ok: false, broken_at: d.ledger[i].seq, scope: 'device' };
    }
    return { ok: true, entries: d.ledger.length, scope: 'device' };
  }

  // ---- documents ------------------------------------------------------------
  // Mirrors documents_effective: a verified document past its expiry is expired,
  // whatever the stored column says. Every caller must use this, never .status.
  function effectiveStatus(doc) {
    if (!doc) return null;
    if (doc.status === 'verified' && doc.expires_on && doc.expires_on < today()) return 'expired';
    return doc.status;
  }
  const isVerified = (doc) => effectiveStatus(doc) === 'verified';

  // ---- standing -------------------------------------------------------------
  // Mirrors the `standing` view. This is the product: one reputation, earned on
  // any of the three, spent on all of them.
  function standing(profile_id) {
    const d = load();
    const eng = d.engagements.filter(e => e.provider_id === profile_id);
    const done = eng.filter(e => e.state === 'completed');
    const revs = d.reviews.filter(r => r.subject_id === profile_id);
    const byPlatform = (p) => done.filter(e => e.platform === p).length;
    return {
      profile_id,
      jobs_completed: done.length,
      pitso_completed: byPlatform('pitso'),
      mafisa_completed: byPlatform('mafisa'),
      matsema_completed: byPlatform('matsema'),
      rating: revs.length ? Math.round(revs.reduce((s, r) => s + r.rating, 0) / revs.length * 100) / 100 : null,
      review_count: revs.length,
      verified_docs: d.documents.filter(x => x.profile_id === profile_id && isVerified(x)).length
    };
  }

  // A review requires a completed engagement between the two parties, and is
  // never about yourself. Same gate as the SQL trigger review_needs_completed_engagement().
  function canReview(engagement_id, author_id, subject_id) {
    const d = load();
    const e = d.engagements.find(x => x.id === engagement_id);
    if (!e) return 'no such engagement';
    if (e.state !== 'completed') return 'the job is not completed yet';
    if (author_id === subject_id) return 'you cannot review yourself';
    if (![e.provider_id, e.counterparty_id].includes(author_id)) return 'you were not part of this job';
    if (d.reviews.some(r => r.engagement_id === engagement_id && r.author_id === author_id))
      return 'you have already reviewed this job';
    return null; // null means allowed
  }

  // ---- profiles -------------------------------------------------------------
  const profile = (id) => load().profiles.find(p => p.id === id) || null;
  const me = () => { const d = load(); return d.session ? profile(d.session.profile_id) : null; };
  function signInAs(profile_id) { const d = load(); d.session = { profile_id }; save(); return me(); }
  function signOut() { const d = load(); d.session = null; save(); }

  // Rounds DOWN to the half star. A reputation system must never round a 4.5
  // up to five stars: the half star it did not earn is the one a stranger is
  // deciding on.
  function star(rating) {
    if (rating == null) return '—';
    const full = Math.floor(rating);
    const half = (rating - full) >= 0.5;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
  }

  // ---- generic table access, same call shape in both modes -------------------
  function all(table) { return (load()[table] || []).slice(); }
  /* -------------------------------------------------------------------------
     THE OUTBOX
     Data is expensive and signal is patchy outside Maseru. Someone standing in
     a yard in Mokhotlong must be able to accept a job, mark a loan returned or
     pledge to a pool with no bars showing, and have it arrive when the signal
     does. Anything less makes the platform a Maseru product.

     The distinction that matters: a write that could not LEAVE is queued and
     retried; a write the server REFUSED is not. Retrying a 403 forever would
     hammer the network on an expensive connection to be told no again.
     ------------------------------------------------------------------------- */
  const OUTBOX = 'mend.outbox.v1';
  let flushing = false;

  function outbox() {
    try { return JSON.parse(localStorage.getItem(OUTBOX)) || []; } catch (e) { return []; }
  }
  function setOutbox(q) {
    try { localStorage.setItem(OUTBOX, JSON.stringify(q)); } catch (e) {}
  }

  function retryable(err) {
    if (!err) return false;
    if (err.status == null) return true;                 // fetch threw: no network
    if (err.status === 408 || err.status === 429) return true;
    return err.status >= 500;                            // the server broke, not us
  }

  function enqueue(entry) {
    const q = outbox();
    // Coalesce: two updates to the same row while offline should send once, in
    // the order they happened, not twice.
    if (entry.op === 'update') {
      const prior = q.find(function (e) {
        return e.op === 'update' && e.table === entry.table && e.id === entry.id;
      });
      if (prior) { Object.assign(prior.body, entry.body); prior.queued_at = entry.queued_at; setOutbox(q); return; }
    }
    q.push(entry); setOutbox(q);
    notifyOutbox();
  }

  const outboxWatchers = [];
  function onOutbox(fn) { outboxWatchers.push(fn); fn(outbox()); }
  function notifyOutbox() {
    const q = outbox();
    outboxWatchers.forEach(function (f) { try { f(q); } catch (e) {} });
  }

  /* Sends everything waiting, oldest first, stopping at the first thing that
     still cannot leave — order matters, because an offer references a request. */
  async function flushOutbox() {
    if (flushing || status !== 'connected') return { sent: 0, waiting: outbox().length };
    flushing = true;
    let sent = 0;
    try {
      while (true) {
        const q = outbox();
        if (!q.length) break;
        const e = q[0];
        try {
          let saved;
          if (e.op === 'insert') {
            saved = await rest('/' + e.table, { method: 'POST', body: e.body,
                                        headers: { 'Prefer': 'return=representation' } });
          } else {
            saved = await rest('/' + e.table + '?' + e.key + '=eq.' + encodeURIComponent(e.id),
                       { method: 'PATCH', body: e.body,
                         headers: { 'Prefer': 'return=representation' } });
            /* PostgREST answers 200 with [] when a PATCH matched NO ROWS. Taking
               that as success is how a document that exists only in one browser
               comes to read as "waiting on the reviewer's desk". Nothing was
               updated, and no retry will change that — the row is not there. */
            if (!saved || !saved.length) {
              const err = new Error('nothing on the server matched this row, so the change was not saved');
              err.status = 404;
              throw err;
            }
          }
          q.shift(); setOutbox(q); sent++;
          markSynced(e.table, e.key, e.id, saved && saved[0]);
        } catch (err) {
          if (retryable(err)) break;            // still no signal: leave it, try later
          // The server refused it. Retrying will not change the answer.
          q.shift(); setOutbox(q);
          markFailed(e.table, e.key, e.id, err.message);
          reportWriteError({ table: e.table, op: e.op, id: e.id, message: err.message,
                             permanent: true });
        }
      }
    } finally { flushing = false; notifyOutbox(); }
    return { sent: sent, waiting: outbox().length };
  }

  function findRow(table, key, id) {
    const d = load();
    return (d[table] || []).find(function (x) { return x[key] === id; });
  }
  function markSynced(table, key, id, saved) {
    const r = findRow(table, key, id);
    if (r) {
      // Take the server's version of the row: it may have filled defaults, and
      // for the ledger it computes seq and the hash chain.
      if (saved) Object.keys(saved).forEach(function (k) { r[k] = saved[k]; });
      delete r._sync; delete r._error; save();
    }
  }
  function markFailed(table, key, id, message) {
    const r = findRow(table, key, id);
    if (r) { r._sync = 'failed'; r._error = message; save(); }
  }

  if (typeof global.addEventListener === 'function') {
    global.addEventListener('online', function () {
      // Coming back online is the moment to re-check the server, then send.
      connect().then(flushOutbox);
    });
  }

  function insert(table, row) {
    const d = load();
    const r = Object.assign({ id: uid(), created_at: new Date().toISOString() }, row);
    (d[table] = d[table] || []).push(r); save();
    if (CONFIGURED) {
      r._sync = 'saving';
      const body = {}; Object.keys(r).forEach(function (k) { if (k[0] !== '_') body[k] = r[k]; });
      enqueue({ op: 'insert', table: table, key: pkOf(table), id: r[pkOf(table)],
                body: body, queued_at: new Date().toISOString() });
      flushOutbox();
    }
    return r;
  }

  /* Rows that cannot be changed after they are written, and the reason each one
     cannot. These rules live in Postgres as triggers, and until now the device
     store did not know about them at all — so in preview mode, which is the
     only mode anything runs in today, a screen saying "neither account can be
     revised once given" was simply false. A promise the software does not keep
     is worse than no promise. Found by the Pitso build. */
  const IMMUTABLE = {
    dispute_statements: 'an account cannot be changed after the other side has read it',
    ledger:             'the record is append-only — add a correcting entry instead'
  };
  function immutableReason(table, row) {
    if (IMMUTABLE[table]) return IMMUTABLE[table];
    if (table === 'attachments' && row &&
        ['condition_out', 'condition_in', 'evidence'].indexOf(row.kind) >= 0)
      return 'a ' + row.kind.replace('_', ' ') + ' photograph is the record of a moment and cannot be changed';
    return null;
  }

  function update(table, id, patch) {
    const d = load(); const key = pkOf(table);
    const r = (d[table] || []).find(function (x) { return x[key] === id; });
    if (!r) return null;
    const why = immutableReason(table, r);
    // The exception: clearing this row's own sync bookkeeping is not a change
    // to the record, and the outbox must be able to mark it sent.
    const onlySync = Object.keys(patch).every(function (k) { return k[0] === '_'; });
    if (why && !onlySync) throw new Error(why);
    Object.assign(r, patch); save();
    if (CONFIGURED) {
      r._sync = 'saving';
      enqueue({ op: 'update', table: table, key: key, id: id,
                body: patch, queued_at: new Date().toISOString() });
      flushOutbox();
    }
    return r;
  }

  function seed() { return (global.MEND_SEED || { profiles: [], documents: [], engagements: [], reviews: [], ledger: [] }); }

  /* -------------------------------------------------------------------------
     CONNECTED MODE
     Reads stay synchronous, served from a cache hydrated once on load. The apps
     hold 82 call sites into all()/insert()/update(); making reads async would
     rewrite every one of them for datasets that fit comfortably in memory.
     Writes go to Postgres and update the cache, so a failure is a visible
     failure rather than a row that only ever existed in one browser.
     ------------------------------------------------------------------------- */
  async function connect() {
    if (!CONFIGURED) { setStatus('device'); return { mode: 'device' }; }
    setStatus('connecting');
    try {
      /* Ask for the count alongside the rows, so a truncated list can say so.
         Prefer: count=planned is an ESTIMATE on large tables and free; exact
         would make every open pay for a full scan of every table, which is the
         cost this change exists to remove. */
      const fetched = await Promise.all(TABLE_NAMES.map(function (t) {
        const spec = TABLES[t] || {};
        const parts = ['select=*'];
        const where = typeof spec.where === 'function' ? spec.where() : spec.where;
        if (where) parts.push(where);
        if (spec.order) parts.push('order=' + spec.order);
        parts.push('limit=' + (spec.limit || 200));
        return restWithCount('/' + t + '?' + parts.join('&')).catch(function (e) {
          // A table the anon key may not read is not a connection failure — RLS
          // is doing its job. Only a transport failure means unreachable.
          if (e.status === 401 || e.status === 403) return { rows: [], total: 0 };
          throw e;
        });
      }));
      const fresh = { session: db && db.session ? db.session : null };
      let rows = 0;
      coverage = {};
      TABLE_NAMES.forEach(function (t, i) {
        const got = fetched[i] || { rows: [], total: 0 };
        fresh[t] = got.rows || [];
        rows += fresh[t].length;
        if (got.total != null && got.total > fresh[t].length) {
          coverage[t] = { loaded: fresh[t].length, total: got.total };
        }
      });

      /* Anything still in the outbox has NOT reached the server, so it is not in
         what we just fetched. Carrying it across is not an optimisation: without
         this, a person who acts with no signal watches their work vanish the
         moment the signal returns, while it is in fact queued and fine. */
      const q = outbox();
      const previous = db || {};
      q.forEach(function (e) {
        const key = e.key || 'id';
        fresh[e.table] = fresh[e.table] || [];
        const already = fresh[e.table].find(function (x) { return x[key] === e.id; });
        if (already) { Object.assign(already, e.body, { _sync: 'saving' }); return; }
        const local = (previous[e.table] || []).find(function (x) { return x[key] === e.id; });
        fresh[e.table].push(Object.assign({}, local || e.body, { _sync: 'saving' }));
      });

      db = fresh; save();
      const bounded = Object.keys(coverage).length;
      setStatus('connected', rows + ' rows from ' + CFG.supabaseUrl.replace(/^https?:\/\//, '')
                + (bounded ? ' · ' + bounded + ' list(s) shown in part' : ''));
      return { mode: 'connected', rows: rows, coverage: coverage };
    } catch (e) {
      // Fall back to whatever is on the device, and SAY SO. Never silently
      // present cached rows as live ones.
      setStatus('unreachable', e.message);
      return { mode: 'unreachable', error: e.message };
    }
  }

  /* ---- documents: upload, submit, and the reviewer's decision ------------- */

  /* The file goes to a PRIVATE bucket under <profile_id>/<document_id>. Nothing
     here ever produces a public URL — a document is reachable only through a
     signed link asked for at the moment it is looked at. */
  async function uploadDocument(file, kind, meta) {
    meta = meta || {};
    const who = me();
    if (!who) throw new Error('Sign in before uploading a document.');
    const id = uid();
    const ext = (file.name.match(/\.[a-z0-9]+$/i) || [''])[0].toLowerCase();
    const path = who.id + '/' + id + ext;

    if (status === 'connected') {
      const res = await fetch(CFG.supabaseUrl.replace(/\/+$/, '') + '/storage/v1/object/documents/' + path, {
        method: 'POST',
        headers: { 'apikey': CFG.supabaseAnonKey, 'Authorization': 'Bearer ' + bearer(),
                   'Content-Type': file.type || 'application/octet-stream' },
        body: file
      });
      if (!res.ok) throw new Error('Upload failed: HTTP ' + res.status + ' — ' + (await res.text()).slice(0, 200));
    }
    // stage 'draft': uploading is not submitting. Half an upload must not land
    // on a reviewer's desk.
    const row = insert('documents', {
      id: id, profile_id: who.id, kind: kind, storage_path: path,
      status: 'pending', stage: 'draft',
      issued_by: meta.issued_by || null, issued_on: meta.issued_on || null,
      expires_on: meta.expires_on || null
    });
    await record('document.uploaded', { subject_table: 'documents', subject_id: id,
                                        payload: { kind: kind } });
    return row;
  }

  function submitDocument(id) {
    const r = update('documents', id, { stage: 'submitted', submitted_at: new Date().toISOString() });
    if (r) record('document.submitted', { subject_table: 'documents', subject_id: id });
    return r;
  }

  /* A signed link, valid for a few minutes. Used by the owner to check what they
     sent and by a reviewer to look at it. It is never rendered into a page that
     someone else can read. */
  async function documentLink(doc, seconds) {
    if (status !== 'connected') return null;
    const res = await fetch(CFG.supabaseUrl.replace(/\/+$/, '') + '/storage/v1/object/sign/documents/' + doc.storage_path, {
      method: 'POST',
      headers: { 'apikey': CFG.supabaseAnonKey, 'Authorization': 'Bearer ' + bearer(),
                 'Content-Type': 'application/json' },
      body: JSON.stringify({ expiresIn: seconds || 300 })
    });
    if (!res.ok) throw new Error('Could not produce a link: HTTP ' + res.status);
    const j = await res.json();
    return CFG.supabaseUrl.replace(/\/+$/, '') + '/storage/v1' + j.signedURL;
  }

  /* What a person may see about their own documents, with expiry applied. */
  function myDocuments() {
    const who = me(); if (!who) return [];
    return all('documents')
      .filter(function (d) { return d.profile_id === who.id; })
      .map(function (d) { return Object.assign({}, d, { effective: effectiveStatus(d) }); });
  }

  /* The reviewer's queue. Empty for everyone who is not staff — RLS returns
     nothing, so this needs no client-side permission check to be safe. */
  function verificationQueue() {
    return all('documents')
      .filter(function (d) { return d.stage === 'submitted' && d.status === 'pending'; })
      .sort(function (a, b) { return (a.submitted_at || '') < (b.submitted_at || '') ? -1 : 1; });
  }

  function decideDocument(id, decision, note) {
    const who = me();
    if (!who) throw new Error('Sign in first.');
    if (decision === 'rejected' && !String(note || '').trim())
      throw new Error('A rejection must give the person a reason.');
    const d = all('documents').find(function (x) { return x.id === id; });
    if (d && d.profile_id === who.id)
      throw new Error('A document cannot be verified by the person it belongs to.');
    const row = update('documents', id, { status: decision, reviewed_by: who.id, note: note || null });
    /* The person whose document it is finds out. On a server db/010 does this;
       here it did not happen at all, so a verdict was reached and nobody was
       told — the desk knew and the person waiting did not. */
    if (d) notify(d.profile_id,
                  decision === 'verified' ? 'doc_verified' : 'doc_rejected',
                  decision === 'verified' ? 'notif.doc_verified' : 'notif.doc_rejected',
                  { kind: d.kind, note: note || '' },
                  { table: 'documents', id: id });
    return row;
  }

  /* ---- deliveries: on track is a number, not a feeling --------------------- */

  /* The state is DERIVED from the quantities and the date, here as in the
     database. Letting a convenor type "met" over a short delivery is exactly
     how a buyer finds out too late. */
  function deliveryState(d) {
    const t = today();
    if (d.state === 'cancelled') return 'cancelled';
    if (Number(d.delivered) >= Number(d.quantity_due)) return 'met';
    if (Number(d.delivered) > 0) return d.due_on < t ? 'missed' : 'part';
    return d.due_on < t ? 'missed' : 'due';
  }

  function deliveriesFor(pool_id) {
    return all('matsema_deliveries')
      .filter(function (d) { return d.pool_id === pool_id; })
      .sort(function (a, b) { return a.due_on < b.due_on ? -1 : 1; })
      .map(function (d) { return Object.assign({}, d, { state: deliveryState(d) }); });
  }

  /* Where a pool actually stands against what it promised, by today. The two
     numbers a buyer cares about are due-so-far and delivered-so-far, and they
     are deliberately separate from the pledge totals: a pledge is an intention,
     a delivery is a fact. */
  function deliveryStanding(pool_id) {
    const rows = deliveriesFor(pool_id).filter(function (d) { return d.state !== 'cancelled'; });
    const t = today();
    const sum = function (f, filt) {
      return rows.filter(filt || function () { return true; })
                 .reduce(function (a, d) { return a + Number(d[f] || 0); }, 0);
    };
    const past = function (d) { return d.due_on <= t; };
    const next = rows.find(function (d) { return d.state === 'due' || d.state === 'part'; });
    return {
      scheduled: rows.length,
      met: rows.filter(function (d) { return d.state === 'met'; }).length,
      missed: rows.filter(function (d) { return d.state === 'missed'; }).length,
      due_so_far: sum('quantity_due', past),
      delivered_so_far: sum('delivered', past),
      promised_total: sum('quantity_due'),
      delivered_total: sum('delivered'),
      next_due: next ? next.due_on : null,
      // The honest headline: behind, on track, or nothing promised yet.
      behind_by: Math.max(0, sum('quantity_due', past) - sum('delivered', past))
    };
  }

  /* ---- photographs -------------------------------------------------------- */

  /* Downscaled in the browser BEFORE it goes anywhere. A 6MB photograph
     straight off a phone camera, sent over a connection somebody pays for by
     the megabyte, is a real cost — and for a picture of a cracked light, 1280px
     tells you everything 4000px does. The database refuses anything over 2MB
     as a backstop, but the point is not to reach it. */
  const PHOTO_MAX_EDGE = 1280;
  const PHOTO_QUALITY = 0.72;

  function downscale(file, maxEdge, quality) {
    return new Promise(function (resolve, reject) {
      if (!global.document || !file.type || file.type.indexOf('image/') !== 0)
        return resolve({ blob: file, width: null, height: null, from: file.size });
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = function () {
        URL.revokeObjectURL(url);
        const scale = Math.min(1, (maxEdge || PHOTO_MAX_EDGE) / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        c.toBlob(function (blob) {
          // If shrinking made it bigger (already-optimised small images do this),
          // keep the original rather than paying for the "optimisation".
          resolve(blob && blob.size < file.size
            ? { blob: blob, width: w, height: h, from: file.size }
            : { blob: file, width: img.width, height: img.height, from: file.size });
        }, 'image/jpeg', quality || PHOTO_QUALITY);
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('That file is not an image.')); };
      img.src = url;
    });
  }

  async function attachPhoto(file, spec) {
    const who = me();
    if (!who) throw new Error('Sign in before adding a photograph.');
    if (!spec || !spec.subject_table || !spec.subject_id) throw new Error('nothing to attach it to');

    const small = await downscale(file, spec.maxEdge, spec.quality);
    if (small.blob.size > 2097152)
      throw new Error('That photograph is still too large after shrinking. Try a smaller one.');

    const id = uid();
    const path = who.id + '/' + id + '.jpg';
    if (status === 'connected') {
      const res = await fetch(CFG.supabaseUrl.replace(/\/+$/, '') + '/storage/v1/object/photos/' + path, {
        method: 'POST',
        headers: { 'apikey': CFG.supabaseAnonKey, 'Authorization': 'Bearer ' + bearer(),
                   'Content-Type': small.blob.type || 'image/jpeg' },
        body: small.blob
      });
      if (!res.ok) throw new Error('Could not send the photograph: HTTP ' + res.status);
    }

    const row = insert('attachments', {
      id: id, subject_table: spec.subject_table, subject_id: spec.subject_id,
      kind: spec.kind || 'other',
      visibility: spec.visibility || (spec.kind === 'listing' ? 'public' : 'parties'),
      uploaded_by: who.id, storage_path: path,
      mime: small.blob.type || 'image/jpeg', bytes: small.blob.size,
      caption: spec.caption || null,
      // When it was TAKEN, which with an outbox may be days before it is sent.
      taken_at: spec.taken_at || new Date().toISOString()
    });
    record('photo.attached', { subject_table: spec.subject_table, subject_id: spec.subject_id,
                               payload: { kind: row.kind, bytes: row.bytes } });
    return Object.assign({}, row, { shrunk_from: small.from, width: small.width, height: small.height });
  }

  /* Documents got documentLink(); photographs got nothing — so a condition
     photograph could be attached and then never looked at again, not by the
     other party and not by the person who took it after a reload. That is a
     hole directly under the one feature a damage argument turns on. Found by
     the Mafisa build.

     Same shape as documentLink: a short-lived signed URL, asked for at the
     moment somebody looks. No public URL for a photograph exists either. */
  async function photoLink(attachment, seconds) {
    if (!attachment || !attachment.storage_path) return null;
    if (status !== 'connected') return null;      // device mode has no server to sign
    const res = await fetch(
      CFG.supabaseUrl.replace(/\/+$/, '') + '/storage/v1/object/sign/photos/' + attachment.storage_path, {
        method: 'POST',
        headers: { 'apikey': CFG.supabaseAnonKey, 'Authorization': 'Bearer ' + bearer(),
                   'Content-Type': 'application/json' },
        body: JSON.stringify({ expiresIn: seconds || 300 })
      });
    if (!res.ok) throw new Error('Could not produce a link to that photograph: HTTP ' + res.status);
    const j = await res.json();
    return CFG.supabaseUrl.replace(/\/+$/, '') + '/storage/v1' + j.signedURL;
  }

  function attachmentsFor(subject_table, subject_id, kind) {
    return all('attachments').filter(function (a) {
      return a.subject_table === subject_table && a.subject_id === subject_id
             && (!kind || a.kind === kind);
    });
  }

  /* Both sides of a loan, side by side. This is the view an argument gets
     settled from — and it reports when each photograph was TAKEN. */
  function loanCondition(loan_id) {
    const out = attachmentsFor('mafisa_loans', loan_id, 'condition_out');
    const inn = attachmentsFor('mafisa_loans', loan_id, 'condition_in');
    const when = function (rows) {
      const ts = rows.map(function (r) { return r.taken_at || r.created_at; }).filter(Boolean).sort();
      return ts[0] || null;
    };
    const arrived = function (rows) {
      const ts = rows.map(function (r) { return r.created_at; }).filter(Boolean).sort();
      return ts[0] || null;
    };
    return { out: out, in: inn, photos_out: out.length, photos_in: inn.length,
             // When the shutter went, which is what settles an argument …
             recorded_out: when(out), recorded_in: when(inn),
             // … and when it reached the register, which with an outbox may be
             // days later. The SQL view reports both; this did not.
             uploaded_out: arrived(out), uploaded_in: arrived(inn),
             // Neither side can later say the other never recorded anything.
             both_recorded: out.length > 0 && inn.length > 0 };
  }

  /* ---- telling somebody when it breaks ------------------------------------ */

  /* Until now a failure on a phone in Mokhotlong was invisible: the person saw
     something wrong, closed the app, and nobody ever knew.

     Everything about this is shaped by what it must NOT send. No message a
     person typed, no claim text, no document path, no token, no full user
     agent. A crash report quietly carrying somebody's national ID number would
     be a worse failure than the crash it was reporting. */
  /* Which app this is, from the key deploy stamps on <html>. Written this way
     because `global.document && document.x` still NAMES document, which throws
     outside a browser — the guard short-circuits the value, not the reference. */
  const APP_ID = (function () {
    const d = global.document;
    const k = d && d.documentElement && d.documentElement.getAttribute('data-title-key');
    return String(k || 'title.platforms').replace('title.', '');
  })();
  let errorsSent = 0;
  const ERROR_CAP = 10;              // per page life; a loop must not become a flood
  const seenErrors = {};

  function coarsePlatform() {
    const ua = (global.navigator && navigator.userAgent) || '';
    const os = /Android/i.test(ua) ? 'Android'
             : /iPhone|iPad|iPod/i.test(ua) ? 'iOS'
             : /Windows/i.test(ua) ? 'Windows'
             : /Mac OS/i.test(ua) ? 'macOS'
             : /Linux/i.test(ua) ? 'Linux' : 'other';
    const br = /Chrome|CriOS/i.test(ua) ? 'Chrome'
             : /Firefox|FxiOS/i.test(ua) ? 'Firefox'
             : /Safari/i.test(ua) ? 'Safari' : 'other';
    return os + ', ' + br;           // enough to reproduce; not a fingerprint
  }

  /* Strip anything that looks like it belongs to a person before it leaves. */
  function scrub(text) {
    return String(text == null ? '' : text)
      .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '<email>')
      .replace(/\+?\d[\d ()-]{7,}\d/g, '<number>')
      .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '<id>')
      .replace(/eyJ[\w-]{10,}\.[\w-]+\.[\w-]+/g, '<token>')
      .replace(/(apikey|authorization|bearer)[=: ]\S+/gi, '$1 <redacted>')
      .slice(0, 500);
  }

  async function reportError(kind, message, where) {
    if (!CONFIGURED || status !== 'connected') return false;
    const key = kind + '|' + message + '|' + (where || '');
    if (seenErrors[key]) return false;            // once per page, per fault
    if (errorsSent >= ERROR_CAP) return false;
    seenErrors[key] = true; errorsSent++;
    try {
      await rest('/rpc/report_error', { method: 'POST', body: {
        p_app: APP_ID, p_kind: kind,
        p_message: scrub(message), p_where: scrub(where),
        p_route: (global.location && location.hash) || null,
        p_version: '1.0.0',
        p_lang: lang(),
        p_online: global.navigator ? navigator.onLine !== false : null,
        p_platform: coarsePlatform()
      }});
      return true;
    } catch (e) { return false; }    // never let reporting a fault raise one
  }

  if (global.addEventListener) {
    global.addEventListener('error', function (e) {
      reportError('unhandled', (e && e.message) || 'script error',
                  e && e.filename ? e.filename + ':' + e.lineno : null);
    });
    global.addEventListener('unhandledrejection', function (e) {
      const r = e && e.reason;
      reportError('unhandled', (r && r.message) || String(r || 'promise rejected'), null);
    });
  }

  // A write the server refused is the most useful signal there is: it means the
  // app asked for something the database would never allow.
  onWriteError(function (e) {
    if (e && e.permanent) reportError('write', e.message, e.table + '.' + e.op);
  });

  /* ---- saying something is wrong ------------------------------------------ */

  const REPORT_REASONS = ['not_real', 'not_theirs', 'misleading', 'offensive',
                          'unsafe', 'spam', 'other'];

  /* A report is a CLAIM, not a finding. It is private to the person who made it
     and to the desk, and what a stranger ever sees is a count — and only once
     more than one person has said so, because one report is one opinion and
     publishing it would make this a place people are damaged by a single tap. */
  function canReport(subject_table, subject_id) {
    const who = me();
    if (!who) return 'sign in to report something';
    if (all('reports').some(function (r) {
      return r.reporter_id === who.id && r.subject_table === subject_table
          && r.subject_id === subject_id;
    })) return 'you have already reported this';
    return null;
  }

  function report(subject_table, subject_id, reason, detail) {
    const why = canReport(subject_table, subject_id);
    if (why) throw new Error(why);
    if (REPORT_REASONS.indexOf(reason) < 0) throw new Error('choose a reason');
    const r = insert('reports', {
      reporter_id: me().id, subject_table: subject_table, subject_id: subject_id,
      reason: reason, detail: (detail || '').trim() || null, state: 'open'
    });
    record('reported', { subject_table: subject_table, subject_id: subject_id,
                         payload: { reason: reason } });
    return r;
  }

  /* Only a count, and only from two people up. Mirrors the report_signal view. */
  /* Connected, this reads the PUBLISHED count — report_signal, which emits a
     row only from two reports up and carries no claim text. It cannot be
     counted from the reports table itself: RLS shows a client only its own
     reports, so the local count was at most one and returned 0 for everybody.
     That worked in device preview because the seed is local, which is the worst
     shape a bug can have. Found by the Matsema build. */
  function reportSignal(subject_table, subject_id) {
    if (status === 'connected') {
      const row = all('report_signal').find(function (r) {
        return r.subject_table === subject_table && r.subject_id === subject_id;
      });
      return row ? row.reports : 0;
    }
    const n = all('reports').filter(function (r) {
      return r.subject_table === subject_table && r.subject_id === subject_id
          && r.state === 'open';
    }).length;
    return n >= 2 ? n : 0;
  }

  /* Whether something has been taken down, and why. Public on purpose: a person
     whose listing was hidden is entitled to see that it was, and the reason. */
  /* THE DESK'S SIDE OF A REPORT.

     Reports were being written and read by nobody: db/020 scopes them to the
     reporter and to staff, the desk had two tabs, and neither was reports. So a
     person filed a complaint, was told "the desk will look at it", and no screen
     in the product could ever show it to anyone.

     Taking something down mirrors db/020: a reason of at least ten characters,
     recorded against the staff member who did it, and the open reports on that
     subject closed by the same act. A takedown with no reason attached is how a
     moderation system becomes something people cannot argue with. */
  function takeDown(subject_table, subject_id, reason) {
    const who = me();
    if (!who) throw new Error('Sign in first.');
    const why = String(reason || '').trim();
    if (why.length < 10)
      throw new Error('A takedown has to say why, in at least ten characters. '
                    + 'The person it happens to is entitled to the reason.');
    const row = insert('moderation', {
      subject_table: subject_table, subject_id: subject_id,
      action: 'hidden', reason: why, by_staff: who.id,
      created_at: new Date().toISOString()
    });
    all('reports')
      .filter(function (r) {
        return r.subject_table === subject_table && r.subject_id === subject_id && r.state === 'open';
      })
      .forEach(function (r) { update('reports', r.id, { state: 'closed' }); });
    return row;
  }

  /* What the desk sees: one entry per reported thing, newest first, with the
     reasons people gave and whatever has already been done about it. */
  function reportQueue() {
    const groups = {};
    all('reports').forEach(function (r) {
      const k = r.subject_table + '\u0000' + r.subject_id;
      if (!groups[k]) groups[k] = { subject_table: r.subject_table, subject_id: r.subject_id,
                                    reports: [], open: 0, first: r.created_at, last: r.created_at };
      groups[k].reports.push(r);
      if (r.state === 'open') groups[k].open++;
      if ((r.created_at || '') < (groups[k].first || '')) groups[k].first = r.created_at;
      if ((r.created_at || '') > (groups[k].last || '')) groups[k].last = r.created_at;
    });
    return Object.keys(groups).map(function (k) {
      const g = groups[k];
      g.moderation = moderationOf(g.subject_table, g.subject_id);
      return g;
    }).sort(function (a, b) {
      if (a.open !== b.open) return b.open - a.open;          // unanswered first
      return (b.last || '') < (a.last || '') ? -1 : 1;
    });
  }

  function moderationOf(subject_table, subject_id) {
    return all('moderation')
      .filter(function (m) { return m.subject_table === subject_table && m.subject_id === subject_id; })
      .sort(function (a, b) { return (b.created_at || '') < (a.created_at || '') ? -1 : 1; })[0] || null;
  }

  /* ---- when it goes wrong ------------------------------------------------- */

  const DISPUTE_KINDS = ['not_done','done_badly','damage','late','not_returned',
                         'not_paid','overcharged','other'];

  /* The platform does not adjudicate. It holds both accounts, dated, and neither
     can be revised once given — which is what ends most disagreements between
     people who have to keep living in the same district. */
  function canDispute(engagement_id, spec) {
    const who = me(); if (!who) return 'sign in first';
    const e = all('engagements').find(function (x) { return x.id === engagement_id; });
    if (!e) return 'no such job';
    if (e.state === 'proposed') return 'this job has not been agreed yet, so there is nothing to dispute';
    const parties = [e.provider_id, e.counterparty_id];
    if (parties.indexOf(who.id) < 0) return 'only the two people in this job can raise a dispute about it';
    if (spec.against === who.id) return 'that is you';
    if (parties.indexOf(spec.against) < 0) return 'that person was not part of this job';
    if (String(spec.claim || '').trim().length < 10) return 'say what went wrong, in a sentence or two';
    return null;
  }

  function raiseDispute(engagement_id, spec) {
    const why = canDispute(engagement_id, spec);
    if (why) throw new Error(why);
    const who = me();
    const d = insert('disputes', {
      engagement_id: engagement_id, raised_by: who.id, against: spec.against,
      kind: spec.kind || 'other', claim: String(spec.claim).trim(),
      amount_cents: spec.amount_cents || null, state: 'open'
    });
    addStatement(d.id, spec.claim, spec.evidence);
    /* The engagement carries a 'disputed' state that nothing ever set, so a job
       could be in open dispute while still reading as completed everywhere it
       appeared. Set it, and put it back when the dispute closes. */
    update('engagements', engagement_id, { state: 'disputed' });
    record('dispute.raised', { subject_table: 'disputes', subject_id: d.id,
                               payload: { kind: d.kind } });
    return d;
  }

  /* Final on the way in. An account that can be edited once the other side has
     read it is not an account of anything. */
  function addStatement(dispute_id, body, evidence) {
    const who = me(); if (!who) throw new Error('sign in first');
    if (String(body || '').trim().length < 5) throw new Error('write a little more than that');
    const s = insert('dispute_statements', {
      dispute_id: dispute_id, author_id: who.id,
      body: String(body).trim(), evidence: evidence || []
    });
    /* 'answered' means THE OTHER SIDE HAS SPOKEN, and nothing else. raiseDispute
       calls straight through to here with the raiser's own first account, so
       setting it unconditionally stored a one-second-old dispute — one account,
       nobody having replied — as answered. A desk sorting by that would put the
       unanswered ones at the bottom, which is precisely backwards: the ones
       nobody has replied to are the ones that end with a person leaving. */
    const d = all('disputes').find(function (x) { return x.id === dispute_id; });
    if (d && d.state === 'open' && who.id === d.against) {
      update('disputes', dispute_id, { state: 'answered' });
    }
    return s;
  }

  /* There was no way to take a dispute back. Somebody who raises one in anger
     and sorts it out over the fence needs a way to say so, and leaving it open
     for ever shows on the other person's standing. */
  function withdrawDispute(dispute_id) {
    const who = me(); if (!who) throw new Error('sign in first');
    const d = all('disputes').find(function (x) { return x.id === dispute_id; });
    if (!d) throw new Error('no such dispute');
    if (d.raised_by !== who.id) throw new Error('only the person who raised it can take it back');
    if (d.state === 'resolved') throw new Error('that one is already settled');
    const r = update('disputes', dispute_id,
                     { state: 'withdrawn', closed_at: new Date().toISOString() });
    update('engagements', d.engagement_id, { state: 'completed' });
    record('dispute.withdrawn', { subject_table: 'disputes', subject_id: dispute_id });
    return r;
  }

  function disputeFor(engagement_id) {
    const d = all('disputes').filter(function (x) { return x.engagement_id === engagement_id; });
    return d.map(function (x) {
      return Object.assign({}, x, {
        statements: all('dispute_statements')
          .filter(function (s) { return s.dispute_id === x.id; })
          .sort(function (a, b) { return (a.created_at || '') < (b.created_at || '') ? -1 : 1; }),
        both_accepted: x.outcome_agreed_by_raiser && x.outcome_agreed_by_other
      });
    });
  }

  /* Closing takes both. One party declaring it settled is not a settlement. */
  function acceptOutcome(dispute_id, outcome) {
    const who = me(); if (!who) throw new Error('sign in first');
    const d = all('disputes').find(function (x) { return x.id === dispute_id; });
    if (!d) throw new Error('no such dispute');
    const patch = {};
    const wanted = outcome == null ? null : String(outcome).trim();

    /* If the WORDS change, every acceptance already given falls away. Without
       this, the second party could pass different words and close the record on
       a sentence the first person never saw — which is not a settlement, it is
       the opposite of one, and it would have been indistinguishable from a real
       one afterwards. Found by the Pitso build. */
    if (wanted && wanted !== String(d.outcome || '').trim()) {
      patch.outcome = wanted;
      patch.outcome_agreed_by_raiser = false;
      patch.outcome_agreed_by_other = false;
    }

    if (d.raised_by === who.id) patch.outcome_agreed_by_raiser = true;
    else if (d.against === who.id) patch.outcome_agreed_by_other = true;
    else throw new Error('only the two people in this dispute can accept an outcome');
    const merged = Object.assign({}, d, patch);
    if (merged.outcome_agreed_by_raiser && merged.outcome_agreed_by_other
        && String(merged.outcome || '').trim()) {
      patch.state = 'resolved';
      patch.closed_at = new Date().toISOString();
    }
    const r = update('disputes', dispute_id, patch);
    if (patch.state === 'resolved') {
      update('engagements', d.engagement_id, { state: 'completed' });
    }
    record('dispute.' + (patch.state === 'resolved' ? 'resolved' : 'outcome_accepted'),
           { subject_table: 'disputes', subject_id: dispute_id });
    return r;
  }

  /* What a stranger may know: counts, never the accusation. An accusation is
     not a finding, and publishing one would make this platform a place people
     are damaged by rumour. */
  function disputeStanding(profile_id) {
    const rows = all('disputes').filter(function (d) { return d.against === profile_id; });
    const recent = Date.now() - 180 * 86400000;
    return {
      open: rows.filter(function (d) { return d.state === 'open' || d.state === 'answered'; }).length,
      resolved: rows.filter(function (d) { return d.state === 'resolved'; }).length,
      open_recent: rows.filter(function (d) {
        return (d.state === 'open' || d.state === 'answered')
            && new Date(d.created_at || 0).getTime() > recent; }).length
    };
  }

  /* ---- one search, three platforms ---------------------------------------- */

  /* This is the architectural claim made usable. Searching "Thabang" should
     find the electrician on Pitso, the bakkie on Mafisa and the pool member on
     Matsema — one person, one standing, three places. If a reader cannot see
     that, the shared spine is an implementation detail nobody benefits from.

     Each app is its own origin, so results carry an absolute URL to the app
     that owns them. */
  /* Where the sibling platforms live, worked out from where THIS page is.

     The three are deployed to two places at once: GitHub Pages project paths,
     which work today, and mendgroup.co.za subdomains, which work the moment
     five DNS records exist. A hard-coded subdomain would make every
     cross-platform link dead until then — and those links are the visible proof
     of the one architectural claim this whole thing rests on. */
  /* WHERE THE OTHER PLATFORMS ARE.

     This used to resolve by HOSTNAME: pitso.mendgroup.co.za and its siblings.
     That is what made the product's central claim false. Three subdomains are
     three origins, so they are three separate localStorages — a document
     submitted on Pitso simply did not exist on Mafisa, while every page went on
     saying "one standing, three platforms". A tester proved it in a minute.

     So resolution is now by PATH, and the apps are served from one origin. The
     same rule covers every way this is served — /pitso/ under one domain,
     /apps/pitso/ in the monorepo, /mend-platforms/pitso/ on github.io — because
     in all three the siblings sit beside you. */
  const APPS = ['pitso', 'mafisa', 'matsema', 'verify'];

  function siteBase() {
    const loc = global.location || {};
    const path = loc.pathname || '/';
    const origin = loc.origin || '';
    // Standing inside an app: the base is everything above this app's folder.
    const m = path.match(new RegExp('^(.*?)/(' + APPS.join('|') + ')(?:/|$)'));
    if (m) return origin + m[1] + '/';
    // Standing at the site root (the landing page).
    if (/\/$/.test(path)) return origin + path;
    return origin + path.replace(/[^/]*$/, '');
  }

  function siblingHosts() {
    const base = siteBase();
    const out = { home: base };
    APPS.forEach(function (a) { out[a] = base + a + '/'; });
    return out;
  }

  const HOSTS = siblingHosts();

  /* Where the terms and the privacy notice live. They sit with the landing
     page, and every app links to them from the shared strip — so a person can
     always reach them from wherever they are, and no app has to carry a copy
     that could drift out of date. */
  /* The terms and the privacy notice live at the root of the site, beside the
     landing page, so every app reaches them through the same base. */
  function legalHome() { return siteBase(); }

  const LEGAL = { terms: legalHome() + 'terms.html', privacy: legalHome() + 'privacy.html' };

  /* Folding for Sesotho, and it has to do three things a generic fold does not:

       tšoeu   -> tsoeu     diacritics come off (NFD)
       Rantsʼo -> rantso    the modifier apostrophe comes off. It is a LETTER in
                            Sesotho orthography, not punctuation, so NFD leaves
                            it — and nobody types it on a phone keyboard. Names
                            carrying it (Rantsʼo, Mongʼa, ʼMè) would otherwise be
                            unfindable by the people who know them.
       Ha-Mokoto -> hamokoto  so "ha mokoto" and "hamokoto" both match.

     Anyone searching for a neighbour by name must find them typing the way they
     actually type. */
  function fold(x) {
    return String(x == null ? '' : x).toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[\u02BC\u02BB\u2018\u2019'`´]/g, '')
      .replace(/[^a-z0-9]+/g, '');
  }

  function hit(needle, hay) { return fold(hay).indexOf(needle) >= 0; }

  /* Only Pitso has a person's own screen. Sending a Matsema-first member to
     matsema.../#/provider/<id> landed on a route that does not exist, and the
     router fell through to the pool list without saying anything. Prefer a
     platform that has the page; otherwise no link at all, which is honest. */
  function personUrl(on, id) {
    if ((on || []).indexOf('pitso') >= 0) return HOSTS.pitso + '#/provider/' + id;
    return null;
  }

  /* Search on the SERVER when there is one. searchAll() can only find what the
     client has already downloaded — which, now that downloads are bounded, is
     the first 200 of each list. Someone looking for the one welder in
     Mokhotlong would simply not find him. mend_search() runs over everything
     and returns only what is already public. */
  async function searchServer(query, limit) {
    if (status !== 'connected') return null;
    const rows = await rest('/rpc/mend_search', {
      method: 'POST', body: { q: String(query || ''), want: limit || 20 }
    });
    return (rows || []).map(function (r) {
      const on = (r.extra && r.extra.on) || [];
      return {
        type: r.kind, platform: r.platform, id: r.id,
        title: r.title, subtitle: r.subtitle,
        on: on,
        url: r.platform ? HOSTS[r.platform] + '#/' +
             ({ provider: 'provider', asset: 'asset', pool: 'pool', request: 'request' }[r.kind] || '') +
             '/' + r.id
           : personUrl(on, r.id)
      };
    });
  }

  /* How much of a list is actually on this device. */
  async function counts() {
    if (status !== 'connected') return null;
    return rest('/rpc/mend_counts', { method: 'POST', body: {} });
  }

  function searchAll(query, opts) {
    opts = opts || {};
    const q = fold(query);
    if (q.length < 2) return [];
    const out = [];
    const nameOf = function (id) { const p = profile(id); return p ? p.display_name : ''; };
    const trades = all('pitso_trades');
    const cats = all('mafisa_categories');

    // People first: a person is the thing that spans the three.
    all('profiles').forEach(function (p) {
      if (!(hit(q, p.display_name) || hit(q, p.district) || hit(q, p.village) || hit(q, p.bio))) return;
      const st = standing(p.id);
      const on = [];
      if (st.pitso_completed || all('pitso_providers').some(function (x) { return x.profile_id === p.id; })) on.push('pitso');
      if (st.mafisa_completed || all('mafisa_assets').some(function (x) { return x.owner_id === p.id; })) on.push('mafisa');
      if (st.matsema_completed || all('matsema_pledges').some(function (x) { return x.member_id === p.id; })) on.push('matsema');
      out.push({ type: 'person', platform: null, id: p.id,
                 title: p.display_name,
                 subtitle: [p.district, p.bio].filter(Boolean).join(' · '),
                 standing: st, on: on,
                 url: personUrl(on, p.id) });
    });

    all('pitso_providers').forEach(function (v) {
      const tr = trades.find(function (t) { return t.code === v.trade_code; }) || {};
      if (!(hit(q, nameOf(v.profile_id)) || hit(q, tr.name_en) || hit(q, tr.name_st)
            || hit(q, v.headline) || (v.districts || []).some(function (d) { return hit(q, d); }))) return;
      out.push({ type: 'provider', platform: 'pitso', id: v.profile_id,
                 title: nameOf(v.profile_id),
                 subtitle: (tr.name_en || v.trade_code) + ' · ' + (v.districts || []).join(', '),
                 available: v.available,
                 url: HOSTS.pitso + '#/provider/' + v.profile_id });
    });

    all('pitso_requests').filter(function (r) { return r.state === 'open'; }).forEach(function (r) {
      if (!(hit(q, r.title) || hit(q, r.description) || hit(q, r.district) || hit(q, r.trade_code))) return;
      out.push({ type: 'request', platform: 'pitso', id: r.id,
                 title: r.title, subtitle: r.district + (r.needed_by ? ' · by ' + fmtDate(r.needed_by) : ''),
                 url: HOSTS.pitso + '#/request/' + r.id });
    });

    all('mafisa_assets').filter(function (a) { return a.listed; }).forEach(function (a) {
      const c = cats.find(function (x) { return x.code === a.category; }) || {};
      if (!(hit(q, a.title) || hit(q, a.description) || hit(q, a.district)
            || hit(q, c.name_en) || hit(q, c.name_st) || hit(q, nameOf(a.owner_id)))) return;
      out.push({ type: 'asset', platform: 'mafisa', id: a.id,
                 title: a.title,
                 subtitle: (c.name_en || a.category) + ' · ' + a.district +
                           (a.daily_cents ? ' · ' + M(a.daily_cents) + ' ' + t('mafisa.perday') : ''),
                 url: HOSTS.mafisa + '#/asset/' + a.id });
    });

    all('matsema_pools').filter(function (p) { return p.state !== 'closed' && p.state !== 'abandoned'; })
      .forEach(function (p) {
        if (!(hit(q, p.title) || hit(q, p.purpose) || hit(q, p.district) || hit(q, p.buyer))) return;
        out.push({ type: 'pool', platform: 'matsema', id: p.id,
                   title: p.title,
                   subtitle: p.district + ' · ' + p.target_value + ' ' + (p.unit || ''),
                   url: HOSTS.matsema + '#/pool/' + p.id });
      });

    // A person who appears on more than one platform is the most interesting
    // answer this search can give, so it is sorted to the top rather than
    // buried under whatever matched the string most literally.
    out.sort(function (a, b) {
      const rank = function (r) {
        if (r.type === 'person') return 0 - ((r.on || []).length);
        return 1;
      };
      return rank(a) - rank(b);
    });
    return opts.limit ? out.slice(0, opts.limit) : out;
  }

  /* ---- what has happened while you were not looking ----------------------- */

  /* Notifications arrive as a key and its variables, never as a sentence — the
     trigger that noticed does not know what language the reader uses. The
     sentence is built here, at the moment somebody reads it. */
  /* TELLING SOMEBODY SOMETHING HAPPENED.

     db/010 and db/015 create notifications with triggers, so on a real server
     this is already handled. On the device nothing did, so nothing ever
     appeared — and because the strip hides its button at zero, the whole
     feature was invisible. A tester concluded it did not exist. It did; it just
     had nothing to show.

     This mirrors the trigger for device preview, the same way every refusal in
     these apps mirrors the one in the database. It refuses to run when a server
     is answering, because there the trigger has already done it and two copies
     of the same news is worse than none. */
  function notify(profile_id, kind, body_key, vars, opts) {
    opts = opts || {};
    if (status === 'connected') return null;          // the trigger owns it there
    if (!profile_id) return null;
    const who = me();
    if (who && profile_id === who.id && !opts.self) return null;  // never notify yourself
    return insert('notifications', {
      profile_id: profile_id,
      platform: opts.platform || null,
      kind: kind,
      subject_table: opts.table || null,
      subject_id: opts.id || null,
      body_key: body_key,
      body_vars: vars || {},
      read_at: null,
      created_at: new Date().toISOString()
    });
  }

  function notifications(opts) {
    opts = opts || {};
    const who = me(); if (!who) return [];
    let rows = all('notifications').filter(function (n) { return n.profile_id === who.id; });
    if (opts.unreadOnly) rows = rows.filter(function (n) { return !n.read_at; });
    rows.sort(function (a, b) { return (b.created_at || '') < (a.created_at || '') ? -1 : 1; });
    return rows.map(function (n) {
      return Object.assign({}, n, { text: t(n.body_key, n.body_vars || {}) });
    });
  }

  function unreadCount() { return notifications({ unreadOnly: true }).length; }

  function markRead(id) {
    return update('notifications', id, { read_at: new Date().toISOString() });
  }

  function markAllRead() {
    const rows = notifications({ unreadOnly: true });
    rows.forEach(function (n) { markRead(n.id); });
    return rows.length;
  }

  /* ---- reaching people who are not on this page --------------------------- */

  /* WhatsApp is how Lesotho actually communicates, and plenty of the people who
     could DO a job have no smartphone at all. So everything on these platforms
     has to be able to leave them as plain text somebody can paste, read aloud,
     or print and put on a wall. Not a screenshot, not a link preview — text.

     Falls back all the way down: the Web Share sheet, then the clipboard, then
     the text itself returned so the app can show it to be copied by hand. A
     share that silently does nothing is worse than no share button. */
  async function share(spec) {
    const lines = (spec.lines || []).filter(function (l) { return l != null && l !== ''; });
    const text = [spec.title, ''].concat(lines).concat(spec.url ? ['', spec.url] : []).join('\n');

    if (global.navigator && navigator.share) {
      try {
        await navigator.share({ title: spec.title, text: text });
        record('shared', { subject_table: spec.table || null, subject_id: spec.id || null,
                           payload: { via: 'share-sheet' } });
        return { via: 'share-sheet', text: text };
      } catch (e) {
        if (e && e.name === 'AbortError') return { via: 'cancelled', text: text };
        // fall through — a browser that lists navigator.share but refuses it
      }
    }
    if (global.navigator && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return { via: 'clipboard', text: text };
      } catch (e) {}
    }
    return { via: 'manual', text: text };
  }

  /* A WhatsApp deep link, for the common case of sending one specific person a
     specific thing. wa.me works with or without the app installed. */
  function whatsappLink(phone, text) {
    const digits = String(phone || '').replace(/[^0-9]/g, '');
    return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(text || '');
  }

  /* Print one element as a document. The page's own chrome is hidden by the
     print stylesheet, so what comes out is the record rather than a screenshot
     of an app — a printed thing two people can both hold and sign. */
  function printRecord(node, title) {
    if (!node) return false;
    const prior = document.title;
    document.body.setAttribute('data-printing', '');
    node.setAttribute('data-print-target', '');
    /* CSS cannot select an ancestor, so mark the chain from the target up to
       body. Without this, a target nested anywhere below body had its own
       parent hidden by the "hide everything else" rule and printed a blank
       page — which is exactly what the apps hit, and worked around by building
       their print sheet as a body-level element. */
    const path = [];
    for (let n = node.parentElement; n && n !== document.body; n = n.parentElement) {
      n.setAttribute('data-print-path', ''); path.push(n);
    }
    if (title) document.title = title;
    const clean = function () {
      document.body.removeAttribute('data-printing');
      node.removeAttribute('data-print-target');
      path.forEach(function (n) { n.removeAttribute('data-print-path'); });
      document.title = prior;
      global.removeEventListener('afterprint', clean);
    };
    global.addEventListener('afterprint', clean);
    global.print();
    setTimeout(clean, 3000);   // some browsers never fire afterprint
    return true;
  }

  /* ---- taking your things, and going ------------------------------------- */

  async function exportMe() {
    if (status !== 'connected') throw new Error('This needs a connection — there is nothing on a server to export yet.');
    return rest('/rpc/mend_export_me', { method: 'POST', body: {} });
  }

  async function deletionPreview() {
    if (status !== 'connected') throw new Error('This needs a connection.');
    return rest('/rpc/mend_deletion_preview', { method: 'POST', body: {} });
  }

  /* THE ORDER HERE IS THE WHOLE THING.

     Supabase refuses a direct DELETE on storage.objects, so the database cannot
     remove the files. If the profile were anonymised first and a file then
     failed to delete, the person would have been told their national ID was
     gone while it sat in a bucket. So: files first, one at a time, and if any
     one of them will not go, STOP and say which — nothing else has happened
     yet, and they can try again. */
  async function deleteMe(confirmName, onProgress) {
    const who = me();
    if (!who) throw new Error('Sign in first.');
    if (status !== 'connected') throw new Error('This needs a connection.');

    /* ASK THE SERVER, NOT THE CACHE. The cache is capped at 200 rows a table
       since the scale change, so a person with more than 200 documents or
       photographs would have deleted the first 200, and mend_delete_me would
       then have refused with "your files are still in storage… if you are
       seeing this, it did not finish" — pointing at the app when the cause was
       a row limit. They could never have completed an erasure, and the message
       would never have said why. Found by the Mafisa build.

       Row level security scopes both tables to this person, so asking for all
       of them returns only theirs. */
    const mine = await Promise.all([
      rest('/documents?select=storage_path&profile_id=eq.' + who.id),
      // Condition and evidence photographs are deliberately excluded. They are
      // the other party's record of what was handed over, and the storage policy
      // refuses to delete them — asking would fail and stop the whole erasure.
      rest('/attachments?select=storage_path&uploaded_by=eq.' + who.id +
           '&kind=not.in.(condition_out,condition_in,evidence)')
    ]);
    const files = []
      .concat((mine[0] || []).map(function (d) { return { bucket: 'documents', path: d.storage_path }; }))
      .concat((mine[1] || []).map(function (a) { return { bucket: 'photos', path: a.storage_path }; }))
      .filter(function (f) { return f.path; });

    const failed = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (onProgress) onProgress({ step: 'files', done: i, total: files.length });
      try {
        const res = await fetch(
          CFG.supabaseUrl.replace(/\/+$/, '') + '/storage/v1/object/' + f.bucket + '/' + f.path,
          { method: 'DELETE',
            headers: { 'apikey': CFG.supabaseAnonKey, 'Authorization': 'Bearer ' + bearer() } });
        if (!res.ok && res.status !== 404) failed.push(f.path + ' (HTTP ' + res.status + ')');
      } catch (e) { failed.push(f.path + ' (' + e.message + ')'); }
    }
    if (failed.length) {
      throw new Error('Nothing was removed. These files would not delete, so the rest was not attempted: '
                      + failed.join(', '));
    }

    if (onProgress) onProgress({ step: 'record', done: files.length, total: files.length });
    const result = await rest('/rpc/mend_delete_me', { method: 'POST', body: { confirm_name: confirmName } });
    await record('account.removed', { payload: { files: files.length } });
    signOut();
    return result;
  }

  /* ---- settlements: record that money moved, never move it ---------------- */

  const ELECTRONIC = ['mpesa', 'ecocash', 'bank_transfer'];
  const METHOD_LABEL = { mpesa: 'M-Pesa', ecocash: 'EcoCash', cash: 'Cash',
                         bank_transfer: 'Bank transfer', other: 'Other' };

  /* Mirrors db/009_settlements.sql. Returns null when allowed, otherwise the
     reason — the same shape as canReview, so an app shows the reason instead of
     a dead button. */
  /* DATES NOBODY CHECKED.

     A tester recorded a payment dated 2030, created a pool that closed in 2020
     and still took pledges, and added a delivery due in 2019 that was stored
     immediately as "missed" — writing a broken promise into the record a
     buyer's sheet uses to judge whether a pool has kept one before. Every one
     was accepted in silence.

     canSettle checked the parties, the amount, the reference and a 2x ceiling,
     and never looked at the date at all. So this is the rule the others reuse:
     a date that has not happened yet cannot be a record of something that did,
     and a date before this platform existed is a typo rather than history. */
  const PLATFORM_EPOCH = '2025-06-13';        // MEND GROUP's incorporation date

  function dateRefusal(iso, what, opts) {
    opts = opts || {};
    if (!iso) return opts.required ? t('date.missing', { what: what }) : null;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return t('date.shape', { what: what });
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return t('date.shape', { what: what });
    if (!opts.future && iso > today()) return t('date.future', { what: what, date: fmtDate(iso) });
    if (opts.future && iso < today()) return t('date.past', { what: what, date: fmtDate(iso) });
    if (iso < PLATFORM_EPOCH) return t('date.tooOld', { what: what, date: fmtDate(iso) });
    return null;
  }

  function canSettle(engagement_id, s) {
    const e = all('engagements').find(function (x) { return x.id === engagement_id; });
    if (!e) return 'no such job';
    const parties = [e.provider_id, e.counterparty_id];
    if (parties.indexOf(s.payer_id) < 0 || parties.indexOf(s.payee_id) < 0)
      return 'a payment can only be between the two people in this job';
    if (s.payer_id === s.payee_id) return 'that is the same person on both sides';
    if (!(s.amount_cents > 0)) return 'put in how much was paid';
    if (ELECTRONIC.indexOf(s.method) >= 0 && !String(s.reference || '').trim())
      return 'an ' + (METHOD_LABEL[s.method] || s.method) +
             ' payment needs its transaction code — that code is the whole record';
    if (e.agreed_cents && s.amount_cents > e.agreed_cents * 2)
      return 'that is more than twice the M' + (e.agreed_cents / 100).toFixed(2) +
             ' agreed. Check the amount.';
    // A payment is a record of something that already happened.
    const whenBad = dateRefusal(s.paid_on, t('date.what.payment'));
    if (whenBad) return whenBad;
    return null;
  }

  function recordSettlement(engagement_id, s) {
    const why = canSettle(engagement_id, s);
    if (why) throw new Error(why);
    const who = me();
    const row = insert('settlements', {
      engagement_id: engagement_id,
      payer_id: s.payer_id, payee_id: s.payee_id,
      amount_cents: s.amount_cents, currency: s.currency || 'LSL',
      method: s.method, reference: (s.reference || '').trim() || null,
      paid_on: s.paid_on || today(), note: s.note || null,
      confirmed_by_payer: who && who.id === s.payer_id,
      confirmed_by_payee: who && who.id === s.payee_id,
      recorded_by: who ? who.id : null
    });
    record('settlement.recorded', { subject_table: 'settlements', subject_id: row.id,
                                    payload: { method: s.method, amount_cents: s.amount_cents } });
    return row;
  }

  /* Each side confirms only their own side. Confirming for the other person
     would make the record worthless — the whole value is that both said so. */
  function confirmSettlement(id) {
    const who = me(); if (!who) throw new Error('Sign in first.');
    const s = all('settlements').find(function (x) { return x.id === id; });
    if (!s) throw new Error('no such payment');
    const patch = {};
    if (s.payer_id === who.id) patch.confirmed_by_payer = true;
    else if (s.payee_id === who.id) patch.confirmed_by_payee = true;
    else throw new Error('only the two people in this payment can confirm it');
    const r = update('settlements', id, patch);
    record('settlement.confirmed', { subject_table: 'settlements', subject_id: id });
    return r;
  }

  /* WHETHER A JOB WAS PAID — ONE ANSWER, FROM ONE PLACE.

     engagements.settled_by_* used to be written independently of the
     settlements table, and Pitso rendered both. A tester read, four lines apart
     on one card: "Both parties confirmed payment of M1,850.00" and "No payment
     has been recorded on this job yet." Both were true to the data; the data
     disagreed with itself.

     db/023 makes those columns derived by trigger. This derives them the same
     way on the device, so the two modes cannot diverge either. */
  function settledState(e, viewer_id) {
    const rows = all('settlements').filter(function (s) {
      return s.engagement_id === e.id && s.confirmed_by_payer && s.confirmed_by_payee;
    });
    const touched = function (who) {
      return rows.some(function (s) { return s.payer_id === who || s.payee_id === who; });
    };
    return {
      provider: touched(e.provider_id),
      counterparty: touched(e.counterparty_id),
      both: touched(e.provider_id) && touched(e.counterparty_id),
      mine: viewer_id ? touched(viewer_id) : false,
      rows: rows.length
    };
  }

  function settlementsFor(engagement_id) {
    return all('settlements')
      .filter(function (s) { return s.engagement_id === engagement_id; })
      .map(function (s) {
        const both = s.confirmed_by_payer && s.confirmed_by_payee;
        return Object.assign({}, s, {
          agreed_by_both: both,
          method_label: METHOD_LABEL[s.method] || s.method,
          state_label: both ? 'Settled — both confirmed'
                     : (s.confirmed_by_payer || s.confirmed_by_payee) ? 'One side has confirmed'
                     : 'Recorded, not yet confirmed'
        });
      });
  }

  /* What is still outstanding on a job, by the record rather than by memory. */
  function settledTotal(engagement_id) {
    return settlementsFor(engagement_id)
      .filter(function (s) { return s.agreed_by_both; })
      .reduce(function (t, s) { return t + (s.amount_cents || 0); }, 0);
  }

  /* ---- auth: email one-time code. No password is ever handled here. ------- */
  async function sendSignInCode(email) {
    if (!CONFIGURED) throw new Error('Not configured for sign-in — this is a device preview.');
    await fetch(AUTH + '/otp', {
      method: 'POST',
      headers: { 'apikey': CFG.supabaseAnonKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, create_user: true })
    }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); });
    return true;
  }

  async function verifySignInCode(email, token) {
    const res = await fetch(AUTH + '/verify', {
      method: 'POST',
      headers: { 'apikey': CFG.supabaseAnonKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, token: token, type: 'email' })
    });
    if (!res.ok) throw new Error('That code was not accepted.');
    session = await res.json();
    const d = load(); d.session = { profile_id: session.user.id, email: email }; save();
    signedOutOnReload = false;
    await connect();                       // re-read: RLS shows more once signed in
    return session.user;
  }

  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} db = null; return load(); }

  /* -------------------------------------------------------------------------
     THE MODE BANNER
     Every app calls this on load. An app that is not connected to anything must
     say so on its own face — the alternative is a page that looks like software
     with nothing behind it, which is a mistake this business has made before.
     ------------------------------------------------------------------------- */
  /* EVERY SUCCESS MESSAGE IS A CLAIM ABOUT WHAT THE SYSTEM DID.

     "Sent. It is on the reviewer's desk now" was printed unconditionally, so in
     device preview the app told people MEND GROUP had their identity document
     on a desk and then counted the days it had been waiting. Nothing had been
     sent; there is no desk on that origin; the verdict was never coming.

     A tester found it by doing the obvious thing an evaluator does first. Wrap
     any message that asserts something reached a server in this, and in preview
     it says what actually happened instead. */
  /* Text built in an app rather than looked up in the string table cannot be
     translated and cannot be marked by t(). Several of Mafisa's success
     messages are built that way, so a Sesotho reader met them in English with
     nothing saying why. This marks them the same way t() marks a missing
     translation. */
  function enOnly(text) {
    const I = global.MEND_I18N;
    if (!I || !I.lang || I.lang() === 'en') return text;
    return text + ' ' + I.t('i18n.englishonly');
  }

  function claimed(text) {
    if (CONFIGURED && status === 'connected') return text;
    return text + ' ' + t('claim.deviceonly');
  }

  function modeNotice() {
    const T = global.MEND_I18N ? global.MEND_I18N.t : function (k, v) { return null; };
    const or = function (key, fallback) { const s = T(key); return (s && s !== key) ? s : fallback; };

    if (status === 'connected') return {
      mode: 'connected', label: or('mode.connected', 'Live'),
      detail: or('mode.connected.detail', 'Connected and shared with everyone using this platform.')
              + ' ' + statusDetail };

    if (status === 'connecting') return {
      mode: 'connecting', label: or('mode.connecting', 'Connecting…'),
      detail: or('mode.connecting.detail', 'Reaching the server. Nothing on screen is confirmed live yet.') };

    if (status === 'unreachable') return {
      mode: 'unreachable', label: or('mode.unreachable', 'Cannot reach the server'),
      detail: or('mode.unreachable.detail',
                 'This page is configured to connect but the server did not answer, so you are '
               + 'looking at whatever was last saved on this device. Do not treat it as current.')
              + (statusDetail ? ' (' + statusDetail + ')' : '') };

    return { mode: 'device', label: or('mode.device', 'Preview · this device'),
             detail: or('mode.device.detail',
                        'Not connected to a server yet. Everything you enter is saved in this browser '
                      + 'and is visible to nobody else.')
                     + ' ' + or('mode.invented',
                        'Every person, business, review and buyer shown here is invented — none of them is real.') };
  }

  // Auto-connect on load when configured. Apps that want to control the moment
  // can call MEND.connect() themselves; calling it twice is harmless.
  if (CONFIGURED && typeof fetch === 'function') { connect().then(flushOutbox); }

  /* Language. i18n.js is optional — an app that has not loaded it still works,
     it just speaks English. t() falling back to the key makes a missing string
     visible in testing rather than blank on somebody's screen. */
  const I18N = global.MEND_I18N;
  const t = I18N ? I18N.t : function (k) { return k; };
  const lang = I18N ? I18N.lang : function () { return 'en'; };
  const setLang = I18N ? I18N.setLang : function () { return 'en'; };
  const onLang = I18N ? I18N.onLang : function (fn) { fn('en'); };

  global.MEND = {
    t, lang, setLang, onLang, LANGS: (I18N ? I18N.LANGS : ['en']),
    CONFIGURED, config: CFG, modeNotice, connect, onStatus, onWriteError,
    get status() { return status; },
    get statusDetail() { return statusDetail; },
    get writeErrors() { return writeErrors.slice(); },
    sendSignInCode, verifySignInCode,
    outbox, flushOutbox, onOutbox,
    get pending() { return outbox().length; },
    deliveriesFor, deliveryStanding, deliveryState,
    attachPhoto, attachmentsFor, photoLink, loanCondition, PHOTO_MAX_EDGE,
    reportError, scrubForReport: scrub,
    REPORT_REASONS, canReport, report, reportSignal, moderationOf, takeDown, reportQueue,
    DISPUTE_KINDS, canDispute, raiseDispute, addStatement, disputeFor,
    acceptOutcome, withdrawDispute, disputeStanding,
    searchAll, searchServer, counts, HOSTS, LEGAL,
    coverageOf,
    TABLES,          // exported so a test can check what we ask the server for
    get coverage() { return JSON.parse(JSON.stringify(coverage)); },
    notifications, unreadCount, markRead, markAllRead, notify,
    share, whatsappLink, printRecord,
    exportMe, deletionPreview, deleteMe,
    canSettle, recordSettlement, confirmSettlement, settlementsFor, settledTotal,
    SETTLE_METHODS: ['mpesa','ecocash','cash','bank_transfer','other'],
    uploadDocument, submitDocument, documentLink, myDocuments,
    verificationQueue, decideDocument,
    // Kept so existing call sites do not break, but it answers the question
    // "is a server configured", NOT "is a server answering". Use .status for that.
    get CONNECTED() { return status === 'connected'; },
    M, Mshort, DISTRICTS, today, daysUntil, fmtDate, star,
    all, insert, update, reset, claimed, enOnly, settledState, dateRefusal,
    profile, me, signInAs, signOut,
    /* True when a reload discarded a sign-in. The app says so rather than
       leaving the person to wonder why their own work vanished. */
    get signedOutOnReload() { return signedOutOnReload; },
    standing, canReview, effectiveStatus, isVerified,
    record, verifyLedger,
    version: '1.0.0'
  };
})(window);
