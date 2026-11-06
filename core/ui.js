/* ===========================================================================
   THE STRIP — one shared bar, three very different apps
   © MEND GROUP (PTY) LTD

   Language, install-to-phone, and what is waiting to send are the same job in
   Pitso, Mafisa and Matsema. Building them three times would mean three
   behaviours, three bugs and three chances to forget one — so they are built
   once and rendered into a SHADOW ROOT, which is what makes a single component
   safe to drop into three unrelated design systems: nothing here can inherit
   their CSS and nothing here can leak into it.

   An app tints it by setting these on :root — it is not obliged to:
     --mend-bar-bg  --mend-bar-fg  --mend-bar-accent  --mend-bar-line
   =========================================================================== */
(function (global) {
  'use strict';
  if (!global.document || !global.MEND) return;

  const M = global.MEND;
  const DISMISS = 'mend.install.dismissed';

  const host = document.createElement('div');
  host.id = 'mend-strip';
  host.setAttribute('data-mend', 'strip');
  const root = host.attachShadow({ mode: 'open' });

  root.innerHTML = `
  <style>
    :host{ all: initial; }
    .bar{
      position: fixed; left: 0; right: 0; bottom: 0; z-index: 2147483000;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      background: var(--mend-bar-bg, #1c1917); color: var(--mend-bar-fg, #f5f5f4);
      border-top: 2px solid var(--mend-bar-line, rgba(255,255,255,.16));
      display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
      padding: 8px 12px calc(8px + env(safe-area-inset-bottom, 0px));
      font-size: 13px; line-height: 1.45;
    }
    .grow{ flex: 1 1 auto; min-width: 0; }
    button{
      font: inherit; font-weight: 600; cursor: pointer; border-radius: 0;
      padding: 7px 11px; min-height: 40px;              /* thumb-sized on a cheap phone */
      background: transparent; color: inherit;
      border: 1.5px solid var(--mend-bar-line, rgba(255,255,255,.3));
    }
    button:hover{ background: rgba(255,255,255,.10); }
    /* :host{all:initial} above resets the focus ring too, which strands anyone
       navigating by keyboard — and a shared component doing that breaks it in
       every app at once. Put back something that is visible on both a dark and
       a light bar. */
    button:focus-visible{
      outline: 3px solid var(--mend-bar-fg, #f5f5f4);
      outline-offset: 2px;
      background: rgba(255,255,255,.14);
    }
    @media (forced-colors: active){
      button:focus-visible{ outline: 3px solid ButtonText; }
    }
    button.on{ background: var(--mend-bar-accent, #0d9488); border-color: transparent; color: #fff; }
    button.go{ background: var(--mend-bar-accent, #0d9488); border-color: transparent; color: #fff; }
    .langs{ display: flex; gap: 0; flex: 0 0 auto; }
    .langs button{ border-right-width: 0; }
    .langs button:last-child{ border-right-width: 1.5px; }
    #notif{ position: relative; font-variant-numeric: tabular-nums; }
    #notif .n{ display:inline-block; min-width: 20px; padding: 0 5px; margin-left: 6px;
               background: var(--mend-bar-accent, #0d9488); color:#fff; font-size: 12px; }
    .msg{ display: flex; align-items: center; gap: 8px; min-width: 0; }
    .dot{ width: 9px; height: 9px; flex: 0 0 auto; border-radius: 50%; background: #a3a3a3; }
    .dot.wait{ background: #f59e0b; }
    .dot.bad{ background: #ef4444; }
    .dot.off{ background: #737373; }
    .t{ overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .full{ flex-basis: 100%; font-size: 12.5px; opacity: .85; white-space: normal; }
    /* Always reachable, never shouting. Somebody looking for the terms is
       looking on purpose; somebody who is not should not be nudged. */
    .legal{ font-size: 11.5px; opacity: .65; }
    /* 44px of hit area without 44px of bar: the padding grows the target and
       the negative margin gives the space back, so the line setting does not
       move. Same trick the apps use for inline links. */
    .legal a{ color: inherit; text-decoration: underline;
              display: inline-block; padding: 15px 6px; margin: -15px -2px; }
    .legal a:focus-visible{ outline: 2px solid var(--mend-bar-fg, #f5f5f4); outline-offset: 2px; }
    [hidden]{ display: none !important; }
    @media (max-width: 420px){ .t{ white-space: normal; } }
  </style>
  <div class="bar" part="bar">
    <div class="langs" role="group" aria-label="Language"></div>
    <div class="grow msg" role="status" aria-live="polite">
      <span class="dot" id="dot" aria-hidden="true"></span><span class="t" id="msg"></span>
    </div>
    <button id="notif" hidden></button>
    <button class="go" id="install" hidden></button>
    <button id="send" hidden></button>
    <div class="full" id="detail" hidden></div>
    <div class="full legal"><a id="terms" target="_blank" rel="noopener"></a> ·
      <a id="privacy" target="_blank" rel="noopener"></a></div>
  </div>`;

  const $ = (id) => root.getElementById(id);
  const langs = root.querySelector('.langs');

  /* ---- language ---------------------------------------------------------- */
  const LABEL = { en: 'English', st: 'Sesotho' };
  function paintLangs() {
    langs.innerHTML = '';
    (M.LANGS || ['en']).forEach(function (l) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = LABEL[l] || l;
      b.setAttribute('lang', l);
      b.setAttribute('aria-pressed', String(M.lang() === l));
      if (M.lang() === l) b.className = 'on';
      b.addEventListener('click', function () { M.setLang(l); });
      langs.appendChild(b);
    });
  }

  /* ---- install to the phone ---------------------------------------------- */
  let installEvent = null;
  const installed = () =>
    (global.matchMedia && matchMedia('(display-mode: standalone)').matches) ||
    global.navigator.standalone === true;

  global.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); installEvent = e; paint();
  });
  global.addEventListener('appinstalled', function () { installEvent = null; paint(); });

  $('install').addEventListener('click', async function () {
    if (!installEvent) return;
    installEvent.prompt();
    try { await installEvent.userChoice; } catch (e) {}
    installEvent = null; paint();
  });

  /* ---- what is waiting --------------------------------------------------- */
  $('send').addEventListener('click', function () { M.flushOutbox(); });

  /* Notifications live in the strip because every app needs them and none of
     them should build their own. Clicking dispatches an event the app can act
     on; if the app does not listen, the strip shows them itself rather than
     doing nothing. */
  $('notif').addEventListener('click', function () {
    const handled = !host.dispatchEvent(new CustomEvent('mend-notifications', {
      bubbles: true, composed: true, cancelable: true
    }));
    if (!handled) showNotifications();
  });

  function showNotifications() {
    const rows = M.notifications ? M.notifications() : [];
    const box = document.createElement('div');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', M.t('notif.title'));
    box.style.cssText = 'position:fixed;inset:auto 0 88px 0;z-index:2147483001;max-height:60vh;' +
      'overflow:auto;background:#fff;color:#111;border-top:2px solid #0003;' +
      'font:14px/1.5 system-ui,sans-serif;padding:12px 14px';
    box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;' +
      'gap:10px;margin-bottom:8px"><strong>' + esc(M.t('notif.title')) + '</strong>' +
      '<button style="min-height:40px;padding:6px 12px">' + esc(M.t('app.close')) + '</button></div>' +
      (rows.length
        ? rows.map(function (n) {
            return '<div style="padding:9px 0;border-top:1px solid #0001' +
                   (n.read_at ? ';opacity:.55' : '') + '">' + esc(n.text) + '</div>';
          }).join('')
        : '<div style="opacity:.6">' + esc(M.t('notif.none')) + '</div>');
    box.querySelector('button').addEventListener('click', function () {
      box.remove(); if (M.markAllRead) M.markAllRead(); paint();
    });
    document.body.appendChild(box);
  }

  function esc(x) {
    return String(x == null ? '' : x).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function paint() {
    paintLangs();

    if (M.LEGAL) {
      $('terms').href = M.LEGAL.terms;
      $('terms').textContent = M.t('legal.terms');
      $('privacy').href = M.LEGAL.privacy;
      $('privacy').textContent = M.t('legal.privacy');
    }

    const pending = M.pending || 0;
    const failed = (M.writeErrors || []).length;
    const online = global.navigator.onLine !== false;
    const dot = $('dot'), msg = $('msg'), detail = $('detail');

    // Order matters: the worst true thing first. A failed write is a problem the
    // person must act on; a queued one is fine and simply not sent yet; being
    // offline is neither. Showing them the same way is how a real failure gets
    // mistaken for a temporary one.
    if (failed) {
      dot.className = 'dot bad';
      msg.textContent = M.t('outbox.failed');
      const last = M.writeErrors[M.writeErrors.length - 1];
      detail.textContent = last ? last.message : '';
      detail.hidden = !last;
    } else if (M.signedOutOnReload) {
      // The page used to keep showing a name after a reload while the server had
      // no idea who you were. It now signs you out honestly — and says so, because
      // being silently signed out is how someone loses an afternoon of work.
      dot.className = 'dot bad';
      msg.textContent = M.t('session.reloaded');
      detail.hidden = true;
    } else if (pending) {
      dot.className = 'dot wait';
      msg.textContent = pending + ' ' + M.t('outbox.waiting');
      // Queued-with-signal and queued-without are not the same situation and
      // must not read the same. Saying "you have no signal" to someone who has
      // signal is simply false, and it teaches people to ignore the bar.
      detail.textContent = online ? M.t('outbox.sending') : M.t('outbox.detail');
      detail.hidden = false;
    } else if (!online && !M.CONFIGURED) {
      // No signal AND no server. The old code fell through to the offline branch
      // and promised "it sends itself when the signal comes back" — an upload to
      // a server that does not exist. Losing signal must not upgrade a preview
      // into a promise.
      dot.className = 'dot off';
      msg.textContent = M.t('app.preview.offline');
      detail.hidden = true;
    } else if (!online) {
      // Being offline is not the same as being unconfigured. The mode label
      // answers "is there a server"; this answers "is there a network".
      dot.className = 'dot off';
      msg.textContent = M.t('app.offline');
      detail.textContent = M.t('app.offline.detail');
      detail.hidden = false;
    } else {
      const n = M.modeNotice();
      dot.className = 'dot' + (n.mode === 'connected' ? '' : ' off');
      msg.textContent = n.label;
      detail.hidden = true;
    }

    // "Send now" only when there is something to send AND a network to send it
    // on. Offering it with no signal invites a tap that cannot do anything.
    $('send').hidden = !(pending && online);
    $('send').textContent = M.t('app.send');

    const unread = M.unreadCount ? M.unreadCount() : 0;
    const anyNotif = M.notifications ? M.notifications().length : 0;
    $('notif').hidden = anyNotif === 0;
    $('notif').innerHTML = esc(M.t('notif.title')) +
      (unread ? '<span class="n">' + unread + '</span>' : '');
    $('notif').setAttribute('aria-label',
      M.t('notif.title') + (unread ? ' — ' + unread : ''));

    const canInstall = !!installEvent && !installed();
    let dismissed = false;
    try { dismissed = localStorage.getItem(DISMISS) === '1'; } catch (e) {}
    $('install').hidden = !(canInstall && !dismissed);
    // The honest benefit, not "get our app": it opens with no signal and costs
    // nothing to open again. That is what is actually worth something here.
    $('install').textContent = M.t('install.add') === 'install.add'
      ? 'Add to phone' : M.t('install.add');
  }

  /* The tab title is the one piece of the page a reader sees before anything
     else and the last thing that gets translated, because it lives outside the
     app's own render. An app declares its key once; the strip keeps it current. */
  function paintTitle() {
    const key = document.documentElement.getAttribute('data-title-key');
    if (!key) return;
    const s = M.t(key);
    if (s && s !== key) document.title = s;
  }
  M.onLang(paintTitle);

  M.onStatus(paint);
  M.onOutbox(paint);
  M.onWriteError(paint);
  M.onLang(paint);
  global.addEventListener('online', paint);
  global.addEventListener('offline', paint);

  /* ---------------------------------------------------------------------
     Links between the platforms, corrected wherever they appear.

     The three apps carry hard-coded https://<app>.mendgroup.co.za hrefs in
     their own markup. Those are correct once five DNS records exist and DEAD
     until then — and these links are the visible proof of the one architectural
     claim the whole thing rests on, so a dead one is not cosmetic.

     Hunting them in three large files by pattern is how a placeholder attribute
     got broken earlier today. This does it once, at runtime, for anything
     already on the page and anything rendered later — so it also catches links
     nobody has written yet.
     --------------------------------------------------------------------- */
  const SUB = /^https?:\/\/(pitso|mafisa|matsema)\.mendgroup\.co\.za(\/.*)?$/i;

  function fixLinks(root) {
    if (!M.HOSTS) return;
    const scope = root && root.querySelectorAll ? root : document;
    let links;
    try { links = scope.querySelectorAll('a[href*="mendgroup.co.za"]'); } catch (e) { return; }
    [].forEach.call(links, function (a) {
      const m = SUB.exec(a.getAttribute('href') || '');
      if (!m) return;
      const target = M.HOSTS[m[1].toLowerCase()];
      if (!target) return;
      const rest = (m[2] || '').replace(/^\//, '');
      const fixed = target + rest;
      if (a.href !== fixed) { a.href = fixed; a.setAttribute('data-host-fixed', ''); }
    });
  }

  function watchLinks() {
    fixLinks(document);
    if (typeof MutationObserver !== 'function') return;
    const obs = new MutationObserver(function (records) {
      for (const r of records) {
        if (r.type === 'childList' && r.addedNodes.length) { fixLinks(document); return; }
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  function mount() {
    if (!document.body) return document.addEventListener('DOMContentLoaded', mount);
    document.body.appendChild(host);
    // Keep the bar from covering the last line of the page.
    const pad = document.createElement('style');
    pad.textContent = 'body{padding-bottom:88px !important}@media print{#mend-strip{display:none !important}}';
    document.head.appendChild(pad);
    paint();
    watchLinks();
  }
  mount();

  M.strip = { paint: paint, host: host,
              dismissInstall: function () { try { localStorage.setItem(DISMISS, '1'); } catch (e) {} paint(); } };
})(window);
