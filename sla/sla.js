/* ===========================================================================
   MEND SERVICES — the SLA client module
   © MEND GROUP (PTY) LTD

   Deliberately thin. Every rule lives in db/036_sla.sql; this file only calls
   it and turns its answers into words. Spec: docs/superpowers/specs/
   2026-11-04-sla-module-design.md, section 6.
   =========================================================================== */
(function (global) {
  'use strict';

  const STATE_KEYS = {
    draft: 'sla.state.draft', submitted: 'sla.state.submitted', confirmed: 'sla.state.confirmed',
    not_disputed: 'sla.state.not_disputed', disputed: 'sla.state.disputed'
  };
  const DISPUTE_KINDS = ['not_done', 'done_badly', 'late', 'overcharged', 'other'];

  // R for rand, M for maloti: at par, but a South African client is billed in rand.
  function money(cents, currency) {
    if (cents == null) return '—';
    return (currency === 'ZAR' ? 'R' : 'M') +
      (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function stateKey(effectiveState) { return STATE_KEYS[effectiveState] || effectiveState; }
  function isDecided(s) { return s === 'confirmed' || s === 'not_disputed' || s === 'disputed'; }

  /* The database's own sentence. PostgREST wraps it as
     'HTTP 400 — {"code":"P0001","message":"month 1 is not settled yet…"}'. */
  function reason(err) {
    const m = String((err && err.message) || err || '');
    const j = m.indexOf('{');
    if (j >= 0) {
      try { const o = JSON.parse(m.slice(j)); if (o && o.message) return o.message; } catch (e) {}
    }
    return m.replace(/^HTTP \d+ — ?/, '');
  }

  function esc(x) {
    return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function byPosition(levels) { return levels.slice().sort(function (a, b) { return a.position - b.position; }); }

  /* A timestamp shown as a day is the day in Maseru. Slicing the UTC string
     gave yesterday for anything between 00:00 and 02:00 SAST (spec gap 9). */
  function maseruDay(ts) {
    if (ts == null) return null;
    const s = String(ts);
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    return new Date(s).toLocaleDateString('en-CA', { timeZone: 'Africa/Maseru' });
  }

  /* The month form's fields, as the rows sla_save_draft takes. A level with
     either number blank is not sent yet; its note travels with it. */
  function draftResults(levels, raw) {
    const out = [];
    byPosition(levels).forEach(function (l) {
      const r = (raw || {})[l.id] || {};
      if (r.met == null || r.total == null || String(r.met).trim() === '' || String(r.total).trim() === '') return;
      const row = { level_id: l.id, met: +r.met, total: +r.total };
      const note = String(r.note == null ? '' : r.note).trim();
      if (note) row.note = note;
      out.push(row);
    });
    return out;
  }

  /* The one-page monthly report, as data. One shape for MEND's preview before
     Submit, the client's view and the printed page, so "exactly what the client
     will see" is true by construction. fmt turns a YYYY-MM-DD into words. */
  function report(c, m, results, fmt) {
    fmt = fmt || function (d) { return d; };
    const e = c.engagements || {}, got = {};
    (results || []).forEach(function (r) { got[r.level_id] = r; });
    const client = (e.client && e.client.display_name) || '', state = m.effective_state || m.state;
    let status;
    if (state === 'confirmed')         status = { key: 'sla.report.status.confirmed', vars: { client: client, date: fmt(maseruDay(m.decided_at)) } };
    else if (state === 'disputed')     status = { key: 'sla.report.status.disputed',  vars: { client: client, date: fmt(maseruDay(m.decided_at)) } };
    else if (state === 'not_disputed') status = { key: 'sla.report.status.not_disputed', vars: { client: client, date: fmt(maseruDay(m.answer_by)) } };
    else if (state === 'submitted')    status = { key: 'sla.report.status.submitted', vars: { client: client,
                                                  sent: fmt(maseruDay(m.submitted_at)), date: fmt(maseruDay(m.answer_by)) } };
    else                               status = { key: 'sla.report.status.draft', vars: { client: client } };
    return {
      n: m.period_no, of: c.final_period_no || c.term_months,
      from: fmt(m.starts_on), to: fmt(m.ends_on),
      provider: (e.provider && e.provider.display_name) || '', client: client,
      rows: byPosition(c.sla_levels || []).map(function (l) {
        const r = got[l.id];
        return { name: l.name, target: l.target, met: r ? r.met : null, total: r ? r.total : null, note: (r && r.note) || null };
      }),
      text: m.report || '', state: state, status: status,
      fee: money(c.monthly_fee_cents, e.currency), paid: money(m.paid_cents || 0, e.currency)
    };
  }

  function reportHtml(R, T) {
    const cell = function (r, which) { return r.met == null ? '—' : esc(r[which]); };
    return '<article class="report" aria-label="' + esc(T('sla.report.heading', { n: R.n, of: R.of })) + '">' +
      '<div class="rp-top"><span>' + esc(R.provider) + '</span><span>' + esc(T('sla.report.heading', { n: R.n, of: R.of })) + '</span></div>' +
      '<h2 class="rp-client">' + esc(R.client) + '</h2>' +
      '<p class="rp-dates">' + esc(T('sla.month.dates', { from: R.from, to: R.to })) + '</p>' +
      '<table class="rp"><thead><tr><th>' + esc(T('sla.report.promise')) + '</th><th>' + esc(T('sla.report.target')) + '</th>' +
      '<th class="num">' + esc(T('sla.month.met')) + '</th><th class="num">' + esc(T('sla.month.total')) + '</th><th>' + esc(T('sla.report.note')) + '</th></tr></thead><tbody>' +
      R.rows.map(function (r) {
        const none = r.total === 0 && r.met === 0;
        return '<tr><td>' + esc(r.name) + '</td><td>' + esc(r.target) + '</td>' +
          (none ? '<td class="num" colspan="2">' + esc(T('sla.report.none')) + '</td>'
                : '<td class="num">' + cell(r, 'met') + '</td><td class="num">' + cell(r, 'total') + '</td>') +
          '<td>' + esc(r.note || '') + '</td></tr>';
      }).join('') + '</tbody></table>' +
      '<h3>' + esc(T('sla.report.what')) + '</h3><p class="rp-text">' + esc(R.text || '—') + '</p>' +
      '<p class="rp-status ' + esc(R.state) + '">' + esc(T(R.status.key, R.status.vars)) + '</p>' +
      '<p class="rp-money">' + esc(T('sla.report.money', { fee: R.fee, paid: R.paid })) + '</p></article>';
  }

  /* The mode line. Core's connected sentence says the data is shared with
     everyone using the platform, which is true of Pitso and false here: an SLA
     agreement is readable by its two parties and the desk (spec section 5). */
  function modeText(n, configured, T) {
    if (!configured) return T('sla.preview');
    if (n.mode === 'connected') return n.label + ': ' + T('sla.connected');
    return n.label + ': ' + n.detail;
  }

  function api(M) {
    const rpc = function (name, body) { return M.serverRpc(name, body || {}); };
    const enc = encodeURIComponent;
    return {
      createOffer: function (o) {
        return rpc('sla_create_offer', {
          p_client_label: o.client_label, p_function: o.function_code, p_term: o.term_months,
          p_fee_cents: o.monthly_fee_cents, p_currency: o.currency, p_starts_on: o.starts_on,
          p_scope: o.scope, p_notice_days: o.notice_days, p_levels: o.levels });
      },
      withdrawOffer: function (id) { return rpc('sla_withdraw_offer', { p_offer: id }); },
      preview:       function (code) { return rpc('sla_offer_preview', { p_code: code }); },
      accept:        function (code, authority) { return rpc('sla_accept_offer', { p_code: code, p_authority: !!authority }); },
      openMonth:     function (contractId) { return rpc('sla_open_period', { p_contract: contractId }); },
      saveDraft:     function (periodId, report, results) {
        return rpc('sla_save_draft', { p_period: periodId, p_report: report, p_results: results });
      },
      submit:        function (periodId) { return rpc('sla_submit', { p_period: periodId }); },
      // Save, then submit. If the answer to an earlier press was lost, the month is
      // already submitted and saving refuses; that is success, not an error.
      submitMonth: async function (periodId, report, results) {
        try {
          await rpc('sla_save_draft', { p_period: periodId, p_report: report, p_results: results });
          await rpc('sla_submit', { p_period: periodId });
        } catch (err) {
          const now = (await M.serverGet('/sla_periods?id=eq.' + enc(periodId) + '&select=state'))[0];
          if (now && now.state !== 'draft') return 'already';
          throw err;
        }
        return 'submitted';
      },
      // Months the client has not yet answered, for the agreements given.
      waiting: function (contractIds) {
        if (!contractIds.length) return Promise.resolve([]);
        return M.serverGet('/sla_periods_effective?contract_id=in.(' + contractIds.map(enc).join(',') +
          ')&effective_state=eq.submitted&select=id,contract_id,period_no,answer_by&order=answer_by.asc');
      },
      confirm:       function (periodId) { return rpc('sla_decide', { p_period: periodId, p_decision: 'confirm' }); },
      dispute:       function (periodId, kind, claim) {
        return rpc('sla_decide', { p_period: periodId, p_decision: 'dispute', p_kind: kind, p_claim: claim });
      },
      setPublicName: function (contractId, named) { return rpc('sla_set_public_name', { p_contract: contractId, p_named: !!named }); },
      giveNotice:    function (contractId, lastDay) { return rpc('sla_give_notice', { p_contract: contractId, p_last_day: lastDay }); },
      advance:       function (contractId) { return rpc('sla_advance', { p_contract: contractId }); },
      workRecord:    function (providerId) { return rpc('sla_work_record', { p_provider: providerId }); },
      exportMine:    function () { return rpc('sla_export_me', {}); },

      // Named columns only: phone and village are not readable through the API (db/035).
      myProfile: function (uid) { return M.serverGet('/profiles?id=eq.' + enc(uid) + '&select=id,kind,display_name'); },
      // A client is not a public listing (spec section 5): listed = false.
      createProfile: function (uid, name, kind) {
        return M.serverPost('/profiles?select=id', { id: uid, display_name: name, kind: kind, listed: false });
      },
      offers: function () { return M.serverGet('/sla_offers?select=*&state=eq.open&order=created_at.desc&limit=50'); },
      contracts: function () {
        return M.serverGet('/sla_contracts?select=*,sla_levels(*),engagements(*,' +
          'provider:profiles!engagements_provider_id_fkey(display_name),' +
          'client:profiles!engagements_counterparty_id_fkey(display_name))&order=created_at.desc&limit=50');
      },
      months:  function (contractId) { return M.serverGet('/sla_periods_effective?contract_id=eq.' + enc(contractId) + '&order=period_no.asc'); },
      results: function (periodId)   { return M.serverGet('/sla_period_results?period_id=eq.' + enc(periodId)); },
      // MEND records money it received, so its own side is confirmed as it records.
      recordPayment: function (p) {
        return M.serverPost('/settlements', {
          engagement_id: p.engagement_id, payer_id: p.client_id, payee_id: p.provider_id,
          amount_cents: p.amount_cents, currency: p.currency, method: p.method,
          reference: (p.reference || '').trim() || null, paid_on: p.paid_on,
          sla_period_id: p.period_id, confirmed_by_payee: true, recorded_by: p.provider_id });
      }
    };
  }

  global.MEND_SLA = { money: money, stateKey: stateKey, isDecided: isDecided, reason: reason,
                      api: api, DISPUTE_KINDS: DISPUTE_KINDS, maseruDay: maseruDay,
                      draftResults: draftResults, report: report, reportHtml: reportHtml, modeText: modeText };
})(typeof window !== 'undefined' ? window : globalThis);
