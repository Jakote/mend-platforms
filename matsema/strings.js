/* ===========================================================================
   MATSEMA — this app's own strings.
   Loaded AFTER core/i18n.js and BEFORE core/mend.js. Namespaced `matsema.` so
   three apps never edit one shared file. MEND_I18N.extend() REFUSES a key that
   already exists rather than silently winning; anything that warns on load is
   fixed HERE by reusing the shared key, never by editing core/i18n.js.

   ⚠️ SESOTHO NEEDS A NATIVE SPEAKER. Jakote — every line marked /* CHECK *​/ is
   my construction. Where I could not say a thing plainly it is LEFT IN ENGLISH
   and marked ENGLISH-ONLY, because a wrong translation read by somebody who
   speaks the language is worse than an untranslated one.

   The single most important distinction in this file is confirmed versus
   pledged. A buyer who contracts against the wrong one loses the contract, and
   the co-op loses it permanently. If any Sesotho below blurs those two words,
   change it before anything else.

   SECOND most important, added with the delivery schedule: DUE versus
   DELIVERED. A pledge is an intention and a delivery is a fact, and the two
   must never be read as one figure either.
   =========================================================================== */
(function (global) {
  'use strict';
  if (!global.MEND_I18N) return;

  global.MEND_I18N.extend({
  /* The buyer's sheet and the delivery record. These are the lines a supermarket
     buyer actually reads, and the distinction between confirmed and pledged is
     the one that loses a co-op its contract if it is got wrong — so it is stated
     twice, in both languages. */
  'matsema.sheet.heldto':    { en: 'What this pool can be held to',
                               st: 'Seo sehlopha sena se ka tšoaroang ka sona' },            /* CHECK */
  'matsema.sheet.confirmed_against': { en: 'CONFIRMED, against a target of {target}',
                               st: 'HO NETEFALITSOE, khahlanong le sepheo sa {target}' },    /* CHECK */
  'matsema.sheet.checked_by': { en: 'Checked by the convenor with each member. This is the figure that may be contracted against.',
                               st: 'E hlahlobiloe ke mokhanni le setho ka seng. Ke palo ena e ka etsoang konteraka ka eona.' }, /* CHECK */
  'matsema.sheet.delivered_already': { en: 'ALREADY DELIVERED',
                               st: 'E SE E FANOE' },                                         /* CHECK */
  'matsema.sheet.included':  { en: 'Included in the confirmed figure above, not added to it.',
                               st: 'E kenyelelitsoe palong e netefalitsoeng ka holimo, ha e ekeletsoe ho eona.' }, /* CHECK */
  'matsema.sheet.short':     { en: 'STILL SHORT, in confirmed commitments',
                               st: 'HO NTSE HO HAELLA, boitlamong bo netefalitsoeng' },      /* CHECK */
  'matsema.sheet.arrived':   { en: 'What has actually arrived',
                               st: 'Se seng se fihlile e le kannete' },                      /* CHECK */
  'matsema.sheet.delivered_against': { en: 'DELIVERED SO FAR, against {due} due by today',
                               st: 'E FANOE HO FIHLELA JOALE, khahlanong le {due} e lokelang kajeno' }, /* CHECK */
  'matsema.sheet.due_that_day': { en: 'Due that day',   st: 'E lokelang letsatsing leo' },    /* CHECK */
  'matsema.sheet.arrived_col': { en: 'Arrived',         st: 'E fihlile' },                    /* CHECK */
  'matsema.sheet.state_col': { en: 'State',             st: 'Boemo' },
  'matsema.sheet.due_today': { en: 'Due by today',      st: 'E lokelang kajeno' },            /* CHECK */
  'matsema.sheet.fact':      { en: 'A delivery is a fact; a pledge is an intention.',
                               st: 'Ho fana ke ntho e etsahetseng; boitlamo ke morero.' },    /* CHECK */
  'matsema.sheet.no_dates':  { en: 'NO DELIVERY DATES HAVE BEEN SET',
                               st: 'HA HO MATSATSI A HO FANA A BEHILOENG' },                  /* CHECK */
  'matsema.sheet.not_commitment': { en: 'Not a commitment', st: 'Hase boitlamo' },            /* CHECK */
  'matsema.sheet.pledged_not_confirmed': { en: 'PLEDGED BUT NOT CONFIRMED',
                               st: 'HO ITLAMILOE EMPA HA HO SO NETEFATSOE' },                 /* CHECK */
  'matsema.sheet.pledged_total': { en: 'PLEDGED IN TOTAL — the confirmed figure is part of this, not additional to it',
                               st: 'KAOFELA HO ITLAMILOE — palo e netefalitsoeng ke karolo ea sena, ha e ekeletsoe ho sona' }, /* CHECK */
  'matsema.sheet.read_apart': { en: 'Read the two figures separately.',
                               st: 'Bala lipalo tsena tse peli ka thoko.' },                  /* CHECK */
  'matsema.sheet.who_in':    { en: 'Who is in the pool', st: 'Ba leng sehlopheng' },          /* CHECK */
  'matsema.sheet.member':    { en: 'Member',             st: 'Setho' },
  'matsema.sheet.pledged_only_col': { en: 'Pledged only, not confirmed',
                               st: 'Ho itlamiloe feela, ha ho so netefatsoe' },               /* CHECK */
  'matsema.sheet.who_speak': { en: 'Who to speak to',    st: 'Eo u ka buang le eena' },       /* CHECK */
  'matsema.sheet.buyer_named': { en: 'Buyer named on the pool',
                               st: 'Moreki ea boletsoeng sehlopheng' },                       /* CHECK */
  'matsema.sheet.whatis':    { en: 'What Matsema is, and is not.',
                               st: 'Seo Matsema e leng sona, le seo e seng sona.' },          /* CHECK */
  'matsema.sheet.not_server': { en: 'Not taken from the server.',
                               st: 'Ha e nkuoe sevareng.' },                                  /* CHECK */
  'matsema.you_are':         { en: 'You are',            st: 'U' },
  'matsema.verif_unpublished': { en: 'Verification is not published yet.',
                               st: 'Netefatso ha e so phatlalatsoe.' },                       /* CHECK */
  'matsema.counts_stale':    { en: 'These counts may be out of date.',
                               st: 'Lipalo tsena e ka ʼna eaba ha se tsa hajoale.' },         /* CHECK */
  'matsema.upload_not_submit': { en: 'Uploading is not submitting.',
                               st: 'Ho kenya hase ho romela.' },                              /* CHECK */
  'matsema.no_file_leaves':  { en: 'Preview — no file leaves this browser.',
                               st: 'Pontšo — ha ho faele e tsoang sebating sena.' },          /* CHECK */
  'matsema.signin_reload':   { en: 'The sign-in does not survive a reload.',
                               st: 'Ho kena ha ho phele ha leqephe le buloa botsoa.' },       /* CHECK */
  'matsema.file_limits':     { en: 'JPEG, PNG, HEIC or PDF, up to 10 MB — the same limits the storage bucket itself enforces.',
                               st: 'JPEG, PNG, HEIC kapa PDF, ho isa ho 10 MB — meeli e tšoanang le eo sebaka sa polokelo se e behang.' }, /* CHECK */
  'matsema.units_hint':      { en: 'kg / bales / crates', st: 'kg / mekotla / mabokoso' },     /* CHECK */
  'matsema.built_by':        { en: 'Built by',           st: 'E hahiloe ke' },                /* CHECK */


    /* ---- REFUSALS AND ERRORS -------------------------------------------- */
    'matsema.refused':          { en: 'Refused',                 st: 'Ho hanoe' },                             /* CHECK */
    'matsema.err.nobody':       { en: 'You must be acting as somebody to do that.',
                                  st: 'U tlameha ho ba motho e mong ho etsa seo.' },                           /* CHECK */
    'matsema.err.title':        { en: 'A pool title must be between 4 and 140 characters. The schema refuses anything else.',
                                  st: 'Sehlooho sa sehlopha se lokela ho ba pakeng tsa litlhaku tse 4 le tse 140. Ha ho se seng se amoheloang.' }, /* CHECK */
    'matsema.err.target':       { en: 'A target must be greater than zero. A pool with no target cannot tell anyone whether it is short.',
                                  st: 'Sepheo se tlameha ho feta lefeela. Sehlopha se se nang sepheo se ke ke sa bolella motho hore na se haella.' }, /* CHECK */
    'matsema.err.pledge.zero':  { en: 'A pledge must be greater than zero. A pledge of nothing counts as a member while adding nothing to the pool, and that is how a pool ends up unable to keep a promise it already made.',
                                  st: 'Boitlamo bo tlameha ho feta lefeela. Boitlamo ba lefeela bo bala setho empa bo sa eketse letho sehlopheng, ʼme ke kamoo sehlopha se qetellang se sitoa ho phethahatsa tšepiso eo se seng se e entse.' }, /* CHECK */
    'matsema.err.pledge.dup':   { en: 'You have already pledged {amount} to this pool. One member may hold only one pledge in a pool.',
                                  st: 'U se u itlamme ka {amount} sehlopheng sena. Setho se ka ba le boitlamo bo le bong feela sehlopheng.' }, /* CHECK */
    'matsema.err.name':         { en: 'A name must be between 2 and 80 characters. The schema refuses anything else.',
                                  st: 'Lebitso le lokela ho ba pakeng tsa litlhaku tse 2 le tse 80. Ha ho se seng se amoheloang.' }, /* CHECK */

    /* Settlement refusals. MEND.canSettle is the ONLY place the rule lives;
       these carry its answer into Sesotho and change nothing about it. */
    'matsema.settle.err.amount':  { en: 'Put in how much was paid.',
                                    st: 'Ngola hore na ho lefiloe bokae.' },                                   /* CHECK */
    'matsema.settle.err.parties': { en: 'A payment can only be between the member and the convenor of this pool.',
                                    st: 'Tefo e ka etsahala pakeng tsa setho le mookameli oa sehlopha sena feela.' }, /* CHECK */
    'matsema.settle.err.same':    { en: 'That is the same person on both sides.',
                                    st: 'Eo ke motho a le mong mahlakoreng ka bobeli.' },                      /* CHECK */
    'matsema.settle.err.ref':     { en: 'A payment by {method} needs its transaction code — that code is the whole record.',
                                    st: 'Tefo ea {method} e hloka khoutu ea eona ea tefo — khoutu eo ke eona rekoto kaofela.' }, /* CHECK */
    'matsema.settle.err.toomuch': { en: 'That is more than twice what was agreed. Check the amount.',
                                    st: 'Seo se feta habeli ho se lumellanoeng. Hlahloba palo.' },             /* CHECK */
    'matsema.settle.err.nobody':  { en: 'Only the two people in this payment can confirm it.',
                                    st: 'Ke batho ba babeli ba tefo ena feela ba ka e netefatsang.' },         /* CHECK */

    /* ---- SETTLEMENT ----------------------------------------------------- */
    'matsema.settle.heading':   { en: 'Payment for what was delivered',
                                  st: 'Tefo ea se fanoeng' },                                                  /* CHECK */
    'matsema.settle.record':    { en: 'Record a payment that was made',
                                  st: 'Ngola tefo e seng e entsoe' },                                          /* CHECK */
    'matsema.settle.none':      { en: 'No payment has been recorded for this delivery.',
                                  st: 'Ha ho tefo e ngoliloeng phanong ena.' },                                /* CHECK */
    'matsema.settle.nopay':     { en: 'Nothing is paid here. Matsema writes down a payment that already happened between the two of you — on the phone, at the bank, or hand to hand.',
                                  st: 'Ha ho chelete e lefshoang mona. Matsema e ngola tefo e seng e etsahetse pakeng tsa lōna — mohaleng, bankeng, kapa ka matsoho.' }, /* CHECK */
    'matsema.settle.who':       { en: 'Who paid whom',           st: 'Ke mang ea lefileng mang' },             /* CHECK */
    'matsema.settle.paidto':    { en: '{payer} paid {payee}',    st: '{payer} o lefile {payee}' },             /* CHECK */
    'matsema.settle.method':    { en: 'How it was paid',         st: 'Tefo e entsoe joang' },                  /* CHECK */
    'matsema.settle.amount':    { en: 'How much, in maloti',     st: 'Bokae, ka maloti' },                     /* CHECK */
    'matsema.settle.date':      { en: 'Day it was paid',         st: 'Letsatsi la tefo' },                     /* CHECK */
    'matsema.settle.ref':       { en: 'Transaction code',        st: 'Khoutu ea tefo' },                       /* CHECK */
    'matsema.settle.ref.need':  { en: 'Required. It is the code in the message that came to your phone.',
                                  st: 'Ea hlokahala. Ke khoutu e molaetseng o tlileng fonong ea hao.' },        /* CHECK */
    'matsema.settle.ref.cash':  { en: 'Cash has no code, so leave this empty.',
                                  st: 'Chelete e matsohong ha e na khoutu, kahoo e siee e se na letho.' },      /* CHECK */
    'matsema.settle.save':      { en: 'Write the payment down',  st: 'Ngola tefo' },                           /* CHECK */
    'matsema.settle.state.new': { en: 'Recorded. Neither of you has confirmed it.',
                                  st: 'E ngoliloe. Ha ho le a mong oa lōna ea e netefalitseng.' },            /* CHECK */
    'matsema.settle.confirm':   { en: 'Confirm my side',         st: 'Netefatsa lehlakore la ka' },            /* CHECK */
    'matsema.settle.mine.done': { en: 'You confirmed this. {name} has not.',
                                  st: 'U netefalitse sena. {name} ha a so netefatse.' },                       /* CHECK */
    'matsema.settle.theirs.done': { en: '{name} confirmed this. You have not.',
                                  st: '{name} o netefalitse sena. Uena ha u so netefatse.' },                  /* CHECK */
    'matsema.settle.onlyown':   { en: 'Each of you confirms only your own side. That is the whole value of the record.',
                                  st: 'E mong le e mong o netefatsa lehlakore la hae feela. Ke sona sohle se etsang hore rekoto e be le thuso.' }, /* CHECK */
    'matsema.settle.written':   { en: 'Written down. It is not settled until you have both confirmed it.',
                                  st: 'E ngoliloe. Ha e so lefshoe ka botlalo ho fihlela le e netefalitse ka bobeli.' }, /* CHECK */
    'matsema.settle.confirmed': { en: 'Your side is confirmed.', st: 'Lehlakore la hao le netefalitsoe.' },    /* CHECK */
    'matsema.settle.notyet':    { en: 'A payment can be recorded once the convenor has marked this share delivered.',
                                  st: 'Tefo e ka ngoloa ha mookameli a se a tšoaile karolo ena e le e fanoeng.' }, /* CHECK */
    'matsema.settle.noeng':     { en: 'This delivery has no engagement record behind it — a payment hangs off the engagement, not off the pledge. Deliveries marked through this page get one; this row did not.',
                                  st: 'Phano ena ha e na tlaleho ea mosebetsi ka morao — tefo e itšetlehile ka mosebetsi, eseng ka boitlamo. Liphano tse tšoauoang leqepheng lena li fumana e ʼngoe; mola ona ha oa e fumana.' }, /* CHECK */

    'matsema.method.mpesa':     { en: 'M-Pesa',                  st: 'M-Pesa' },
    'matsema.method.ecocash':   { en: 'EcoCash',                 st: 'EcoCash' },
    'matsema.method.cash':      { en: 'Cash',                    st: 'Chelete e matsohong' },                  /* CHECK */
    'matsema.method.bank_transfer': { en: 'Bank transfer',       st: 'Ho romela ka banka' },                   /* CHECK */
    'matsema.method.other':     { en: 'Something else',          st: 'Ho hong' },                              /* CHECK */

    /* ---- SHARE AND THE BUYER'S SHEET ------------------------------------- */
    'matsema.share':            { en: 'Share this pool',         st: 'Arolelana sehlopha sena' },              /* CHECK */
    'matsema.print.buyer':      { en: 'Buyer’s sheet',           st: 'Leqephe la moreki' },                    /* CHECK */
    'matsema.share.copied':     { en: 'Copied. Paste it into the WhatsApp group.',
                                  st: 'E kopitsitsoe. E kenye sehlopheng sa WhatsApp.' },                       /* CHECK */
    'matsema.share.manual':     { en: 'This browser would not copy it. Hold on the text, copy it, and paste it where you need it.',
                                  st: 'Sebatli sena ha sea ka sa e kopitsa. Tšoara mongolo, o kopitse, ebe u o kenya moo u o batlang teng.' }, /* CHECK */
    'matsema.share.shared':     { en: 'Sent to the app you chose.',
                                  st: 'E rometsoe app eo u e khethileng.' },                                    /* CHECK */
    'matsema.share.whatsapp':   { en: 'Open WhatsApp with this',  st: 'Bula WhatsApp ka sena' },                /* CHECK */
    'matsema.share.heading':    { en: 'The pool as plain text',   st: 'Sehlopha e le mongolo feela' },          /* CHECK */
    'matsema.buyer.explain':    { en: 'The buyer’s sheet prints the confirmed figure and the pledged figure separately, and says which one may be contracted against. Send it, print it, file it.',
                                  st: 'Leqephe la moreki le hatisa palo e netefalitsoeng le palo ea boitlamo ka thoko, ʼme le bolela hore na ke efe e ka etsetsoang konteraka. Le romele, le hatise, le boloke.' }, /* CHECK */

    /* ---- CONFIRMED versus PLEDGED — the distinction the whole app turns on */
    /* These two lines are the whole point of the notice. They carry their own
       figure so the label and the number can never be pasted apart. */
    'matsema.confirmedonly':    { en: 'CONFIRMED {qty} — this is the figure a buyer may contract against',
                                  st: 'HO NETEFALITSOE {qty} — ke palo eo moreki a ka etsang konteraka ka eona' }, /* CHECK */
    'matsema.pledgedonly':      { en: 'Pledged but not confirmed: {qty} — this is NOT a supply commitment',
                                  st: 'Ho itlamiloe empa ha ho so netefatsoe: {qty} — sena HASE boitlamo ba ho fana' }, /* CHECK */
    'matsema.pledgedtotal':     { en: 'Pledged in total, confirmed included',
                                  st: 'Boitlamo bohle hammoho le bo netefalitsoeng' },                         /* CHECK */
    'matsema.shortby':          { en: 'Still short, in confirmed commitments',
                                  st: 'Ho ntse ho haella, boitlamong bo netefalitsoeng' },                     /* CHECK */
    'matsema.noclosing':        { en: 'No closing date',         st: 'Ha ho letsatsi la ho koala' },           /* CHECK */
    'matsema.closed_on':        { en: 'Closed {date}',           st: 'E koetsoe ka {date}' },                  /* CHECK */
    'matsema.closes_today':     { en: 'Closes today',            st: 'E koala kajeno' },                       /* CHECK */
    'matsema.closes_in':        { en: 'Closes in {n} · {date}',  st: 'E koala ka {n} · {date}' },              /* CHECK */
    'matsema.can_promise_to':   { en: 'This pool can keep its promise to {buyer}.',
                                  st: 'Sehlopha sena se ka phethahatsa tšepiso ea sona ho {buyer}.' },         /* CHECK */
    'matsema.buyer':            { en: 'Buyer',                   st: 'Moreki' },
    'matsema.convenor':         { en: 'Convenor',                st: 'Mookameli' },                            /* CHECK */
    'matsema.delivered':        { en: 'Delivered',               st: 'Ho fanoe' },                             /* CHECK */

    /* ---- TABS AND HEADINGS ---------------------------------------------- */
    'matsema.tab.pools':        { en: 'Pools',                   st: 'Lihlopha' },
    'matsema.tab.start':        { en: 'Start',                   st: 'Qala' },                                 /* CHECK */
    'matsema.tab.mine':         { en: 'My pools',                st: 'Lihlopha tsa ka' },                      /* CHECK */
    'matsema.tab.docs':         { en: 'Documents',               st: 'Litokomane' },

    /* =====================================================================
       THE POOL LIST
       ===================================================================== */
    'matsema.pools.intro':      { en: 'A pool is a convenor, a target, a closing date, and members pledging a share. When the confirmed total reaches the target, the pool can bid.',
                                  st: 'Sehlopha ke mookameli, sepheo, letsatsi la ho koala, le litho tse itlamang ka karolo. Ha palo e netefalitsoeng e fihla sepheong, sehlopha se ka kenya theko.' }, /* CHECK */
    'matsema.pools.none':       { en: 'No pools in that district yet',
                                  st: 'Ha ho lihlopha setereke seo hajoale' },                                 /* CHECK */
    'matsema.open_pool':        { en: 'Open this pool →',        st: 'Bula sehlopha sena →' },                 /* CHECK */
    'matsema.kind.volume':      { en: 'volume',                  st: 'boima' },                                /* CHECK */
    'matsema.kind.amount':      { en: 'amount of money',         st: 'chelete' },                              /* CHECK */
    'matsema.kind.members':     { en: 'number of members',       st: 'palo ea litho' },                        /* CHECK */

    /* =====================================================================
       THE PROGRESS BAR — the biggest element on the screen, so every word on
       it is read. Each sentence is ONE string with placeholders: translating
       "Pledged", the number and "of" as three fragments produces word order
       no Sesotho speaker uses.
       ===================================================================== */
    'matsema.confirmed_of':     { en: 'confirmed of {qty}',      st: 'ho netefalitsoe ho {qty}' },             /* CHECK */
    'matsema.words.pledged':    { en: 'Pledged {pledged} of {target}.',
                                  st: 'Ho itlamiloe ka {pledged} ho {target}.' },                              /* CHECK */
    'matsema.words.confirmed':  { en: 'Confirmed {confirmed}.',  st: 'Ho netefalitsoe {confirmed}.' },         /* CHECK */
    'matsema.words.confirmed_delivered': { en: 'Confirmed {confirmed}, of which {delivered} is already delivered.',
                                  st: 'Ho netefalitsoe {confirmed}, ho tsona {delivered} e se e fanoe.' },     /* CHECK */
    'matsema.words.whole':      { en: 'The whole target is confirmed.',
                                  st: 'Sepheo sohle se netefalitsoe.' },                                       /* CHECK */
    'matsema.words.short':      { en: 'Still short {short} in confirmed commitments.',
                                  st: 'Ho ntse ho haella {short} boitlamong bo netefalitsoeng.' },             /* CHECK */
    'matsema.legend.pledged':   { en: 'Pledged only',            st: 'Boitlamo feela' },                       /* CHECK */
    'matsema.legend.notsaved':  { en: 'Never saved',             st: 'Ha ea bolokoa' },                        /* CHECK */
    'matsema.saving':           { en: 'Saving…',                 st: 'Ea boloka…' },                           /* CHECK */
    'matsema.badge.notsaved':   { en: 'Pledge not saved',        st: 'Boitlamo ha boa bolokoa' },              /* CHECK */
    'matsema.bar.aria':         { en: 'Confirmed {confirmed} of {target}. Pledged {pledged}.',
                                  st: 'Ho netefalitsoe {confirmed} ho {target}. Ho itlamiloe ka {pledged}.' }, /* CHECK */
    'matsema.bar.aria.stale':   { en: 'Figures may be out of date; the server did not answer.',
                                  st: 'Lipalo e ka ba tsa khale; seva ha sea araba.' },                        /* CHECK */
    'matsema.bar.aria.risk':    { en: '{n} pledge rows were never saved to the database.',
                                  st: 'Mela ea boitlamo e {n} ha ea ka ea bolokoa database-ng.' },             /* CHECK */

    /* ---- THE VERDICT. The sentence a convenor reads out and a member
       repeats, so it has to be in the language the person actually reads. --- */
    'matsema.verdict.stale':    { en: 'Cannot say — the server did not answer.',
                                  st: 'Ha ho khonehe ho bolela — seva ha sea araba.' },                        /* CHECK */
    'matsema.verdict.stale.sub':{ en: 'Every figure above is whatever was last saved in this browser. Do not read it to a buyer and do not decide anything on it until the page has reconnected.',
                                  st: 'Lipalo tsohle tse ka holimo ke tse bolokiloeng qetellong sebatling sena. Se ke oa li bala ho moreki, ʼme u se ke oa etsa qeto ka tsona ho fihlela leqephe le hokahane hape.' }, /* CHECK */
    'matsema.verdict.risk.one': { en: '1 pledge in this pool was never saved.',
                                  st: 'Boitlamo bo le 1 sehlopheng sena ha boa ka ba bolokoa.' },              /* CHECK */
    'matsema.verdict.risk.many':{ en: '{n} pledges in this pool were never saved.',
                                  st: 'Boitlamo bo {n} sehlopheng sena ha boa ka ba bolokoa.' },               /* CHECK */
    'matsema.verdict.risk.sub': { en: 'Counted in the totals above but rejected by the database: {pledged} pledged, {confirmed} of it counted as confirmed. Until those rows land, this pool cannot promise anyone anything.',
                                  st: 'Ho baloa lipalong tse ka holimo empa ho hanoe ke database: {pledged} bo itlamiloeng, {confirmed} ho tsona bo baloang bo netefalitsoe. Ho fihlela mela eo e fihla, sehlopha sena se ke ke sa tšepisa motho letho.' }, /* CHECK */
    'matsema.verdict.settling': { en: 'Checked against this device. The server round trip has not come back yet.',
                                  st: 'Ho hlahlobiloe sesebelisoeng sena. Karabo ea seva ha e so khutle.' },   /* CHECK */
    'matsema.verdict.saving.one': { en: '1 pledge here has not been acknowledged by the server yet — it is queued on this device and will be sent.',
                                  st: 'Boitlamo bo le 1 mona ha bo so amoheloe ke seva — bo emetse sesebelisoeng sena, bo tla romelloa.' }, /* CHECK */
    'matsema.verdict.saving.many': { en: '{n} pledges here have not been acknowledged by the server yet — they are queued on this device and will be sent.',
                                  st: 'Boitlamo bo {n} mona ha bo so amoheloe ke seva — bo emetse sesebelisoeng sena, bo tla romelloa.' }, /* CHECK */

    /* =====================================================================
       STANDING AND IDENTITY
       ===================================================================== */
    'matsema.rating':           { en: 'Rating',                  st: 'Tekanyo ea linaleli' },                              /* CHECK */
    'matsema.verified_docs':    { en: 'Verified documents',      st: 'Litokomane tse netefalitsoeng' },        /* CHECK */
    'matsema.standing_in':      { en: 'Standing carried in: {list}.',
                                  st: 'Botumo bo tsoang ho: {list}.' },                                        /* CHECK */
    'matsema.standing_none':    { en: 'No completed work on any of the three platforms yet.',
                                  st: 'Ha ho mosebetsi o phethiloeng lithaleng tse tharo hajoale.' },          /* CHECK */
    'matsema.on_platform':      { en: '{n} on {platform}',       st: '{n} ho {platform}' },                    /* CHECK */
    'matsema.id.verified':      { en: '{kind} verified',         st: '{kind} e netefalitsoe' },                /* CHECK */
    'matsema.id.none':          { en: 'Identity not verified',   st: 'Boitsebiso ha boa netefatsoa' },         /* CHECK */
    'matsema.id.unknown':       { en: 'Verification not published',
                                  st: 'Netefatso ha e so phatlalatsoe' },                                      /* CHECK */
    'matsema.cs.verified':     { en: 'MEND Group\u2019s verification desk has seen a {doc} for this convenor and accepted it{until}. The document itself stays private \u2014 what is published is the verdict, never the file.',
                                 st: 'Tafole ea netefatso ea MEND Group e bone {doc} ea molaoli enoa \u2019me ea e amohela{until}. Tokomane ka boeona e lula e le lekunutu \u2014 se phatlalatsoang ke qeto, eseng faele.' }, /* CHECK */
    'matsema.cs.none':         { en: 'Nobody has verified who this convenor is. They may be exactly who they say they are; this platform has simply not checked, and will not imply that it has.',
                                 st: 'Ha ho motho ea netefalitseng hore na molaoli enoa ke mang. E ka \u2019na ea e-ba hantle feela seo ba ipolelang ho ba sona; sethala sena ha se e-s\u2019o hlahlobe, \u2019me se ke ke sa etsa eka se hlahlobile.' }, /* CHECK */
    'matsema.cs.hidden':       { en: 'This page cannot tell you. Documents are private to the person they belong to, so a page signed in as somebody else reads nothing back \u2014 which is not the same as there being nothing there. Matsema will not print \u201cnot verified\u201d over a gap in what it is allowed to see.',
                                 st: 'Leqephe lena le ke ke la u bolella. Litokomane ke lekunutu la mong\u2019a tsona, kahoo leqephe le kenetsoeng ke motho e mong ha le bale letho \u2014 seo ha se tšoane le hore ha ho letho teng. Matsema e ke ke ea ngola \u201cha e netefatsoa\u201d holim\u2019a seo e sa lumelloang ho se bona.' }, /* CHECK */
    'matsema.cs.until':        { en: ', valid until {date}', st: ', e sebetsa ho fihlela {date}' }, /* CHECK */
    'matsema.id.counted':      { en: 'Counted as identity: a national ID, passport or company registration that the desk has verified and that has not expired. These are counts and nothing else \u2014 there is no trust score here, because a single number would hide exactly the thing a buyer needs to look at.',
                                 st: 'Se baloang e le boitsebiso: karete ea naha, phasepoto kapa ngoliso ea k\u2019hamphani eo tafole e e netefalitseng \u2019me e s\u2019o felloe ke nako. Tsena ke lipalo feela \u2014 ha ho na lintlha tsa ts\u2019epo mona, hobane palo e le \u2019ngoe e ka pata hantle ntho eo moreki a lokelang ho e sheba.' }, /* CHECK */
    'matsema.pledge.done':     { en: 'Your pledge of {amount} is in. It counts toward the pool\u2019s total, and you can withdraw it while the pool is still forming.',
                                 st: 'Ts\u2019episo ea hau ea {amount} e kenngoe. E baloa palong ea sehlopha, \u2019me u ka e hula ha sehlopha se ntse se bopeha.' }, /* CHECK */
    'matsema.who_convening':    { en: 'Who is convening this',   st: 'Ke mang ea okametseng sena' },           /* CHECK */
    'matsema.unknown_convenor': { en: 'Unknown convenor',        st: 'Mookameli ea sa tsejoeng' },             /* CHECK */
    /* Whole phrases, singular and plural apart. Sesotho agreement runs off the
       noun: setho takes `se`, litho take `tse`, and gluing a count word onto a
       shared tail produces "litho ba nang le…", which is wrong in a way a
       speaker notices immediately. One string per case, no assembly. */
    'matsema.vcount.verified.one':  { en: 'member with a verified identity',
                                      st: 'setho se nang le boitsebiso bo netefalitsoeng' },                   /* CHECK */
    'matsema.vcount.verified.many': { en: 'members with a verified identity',
                                      st: 'litho tse nang le boitsebiso bo netefalitsoeng' },                  /* CHECK */
    'matsema.vcount.none.one':      { en: 'member with none',    st: 'setho se se nang bona' },                /* CHECK */
    'matsema.vcount.none.many':     { en: 'members with none',   st: 'litho tse se nang bona' },               /* CHECK */
    'matsema.vcount.unknown.one':   { en: 'member this page may not check',
                                      st: 'setho seo leqephe lena le ke keng la se hlahloba' },                /* CHECK */
    'matsema.vcount.unknown.many':  { en: 'members this page may not check',
                                      st: 'litho tseo leqephe lena le ke keng la li hlahloba' },               /* CHECK */
    'matsema.vcount.pool.one':      { en: 'member in the pool',  st: 'setho sehlopheng' },                     /* CHECK */
    'matsema.vcount.pool.many':     { en: 'members in the pool', st: 'litho sehlopheng' },                     /* CHECK */

    /* ---- document kinds the shared table does not carry ------------------ */
    'matsema.doc.drivers_licence':          { en: 'Driver’s licence',   st: 'Laesense ea ho khanna' },        /* CHECK */
    'matsema.doc.professional_registration':{ en: 'Professional registration', st: 'Ngoliso ea mosebetsi oa botsebi' }, /* CHECK */
    'matsema.doc.lease':                    { en: 'Lease',              st: 'Konteraka ea hira' },            /* CHECK */
    'matsema.doc.membership':               { en: 'Membership of a co-operative or association',
                                              st: 'Boitho sehlopheng sa kopanelo kapa mokhatlo' },            /* CHECK */

    /* =====================================================================
       THE POOL DETAIL
       ===================================================================== */
    'matsema.all_pools':        { en: '← All pools',             st: '← Lihlopha tsohle' },                    /* CHECK */
    'matsema.back_to_pool':     { en: '← Back to the pool',      st: '← Khutlela sehlopheng' },                /* CHECK */
    'matsema.gone':             { en: 'That pool no longer exists',
                                  st: 'Sehlopha seo ha se sa le teng' },                                        /* CHECK */
    'matsema.not_named':        { en: 'Not named yet',           st: 'Ha a so boleloe' },                      /* CHECK */
    'matsema.your_pledge':      { en: 'Your pledge',             st: 'Boitlamo ba hao' },                      /* CHECK */
    'matsema.one_per_pool':     { en: 'One pledge per member per pool. To change it, speak to the convenor.',
                                  st: 'Boitlamo bo le bong ka setho sehlopheng se le seng. Ho bo fetola, bua le mookameli.' }, /* CHECK */
    'matsema.pledge_share':     { en: 'Pledge a share of this pool',
                                  st: 'Itlame ka karolo ea sehlopha sena' },                                   /* CHECK */
    'matsema.who_is_in':        { en: 'Who is in ({n})',         st: 'Ba kenang ({n})' },                      /* CHECK */
    'matsema.nobody_yet':       { en: 'Nobody has pledged yet',  st: 'Ha ho motho ea itlamileng hajoale' },    /* CHECK */
    'matsema.unknown_member':   { en: 'Unknown member',          st: 'Setho se sa tsejoeng' },                 /* CHECK */
    'matsema.confirm_pledge':   { en: 'Confirm this pledge',     st: 'Netefatsa boitlamo bona' },              /* CHECK */
    'matsema.state.withdrawn':  { en: 'Withdrawn',               st: 'Ho huletsoe morao' },                    /* CHECK */
    'matsema.state.failed':     { en: 'Failed',                  st: 'Ho hlolehile' },                         /* CHECK */
    'matsema.notsaved.title':   { en: 'Never saved',             st: 'Ha ea bolokoa' },                        /* CHECK */
    'matsema.notsaved.body':    { en: 'This pledge is in this browser only — the database refused it. Nobody else can see it, and the totals above are counting it.',
                                  st: 'Boitlamo bona bo sebatling sena feela — database e bo hanne. Ha ho motho e mong ea bo bonang, ʼme lipalo tse ka holimo li ntse li bo bala.' }, /* CHECK */
    'matsema.saving.body':      { en: 'Not confirmed by the database yet.',
                                  st: 'Ha e so netefatsoe ke database.' },                                     /* CHECK */

    /* =====================================================================
       THE DELIVERY SCHEDULE
       A pool owing twelve tonnes a month delivers weekly, not once. This is
       where "are we on track" stops being a feeling.
       ===================================================================== */
    'matsema.deliv.none':       { en: 'No delivery dates have been set yet.',
                                  st: 'Ha ho matsatsi a phano a behiloeng hajoale.' },                         /* CHECK */
    'matsema.deliv.none.why':   { en: 'A pool owing twelve tonnes a month delivers weekly, not once. Until the dates are set, nobody can say whether this pool is keeping up.',
                                  st: 'Sehlopha se kolotang lithane tse 12 ka khoeli se fana beke le beke, eseng hang. Ha matsatsi a e-so behoe, ha ho motho ea ka bolelang hore na sehlopha sena se ntse se latela.' }, /* CHECK */
    'matsema.deliv.add':        { en: 'Add a delivery date',     st: 'Kenya letsatsi la phano' },              /* CHECK */
    'matsema.deliv.due_on':     { en: 'Day it is due',           st: 'Letsatsi la phano' },                    /* CHECK */
    'matsema.deliv.qty_due':    { en: 'How much is due that day',
                                  st: 'Ho lokela ho fanoa bokae letsatsing leo' },                             /* CHECK */
    'matsema.deliv.save':       { en: 'Put it on the schedule',  st: 'E kenye kemisong' },                     /* CHECK */
    'matsema.deliv.arrived':    { en: 'How much actually arrived',
                                  st: 'Ho fihlile bokae ka ʼnete' },                                           /* CHECK */
    'matsema.deliv.record':     { en: 'Record what arrived',     st: 'Ngola se fihlileng' },                   /* CHECK */
    'matsema.deliv.what_call':  { en: 'What you want to call it',
                                  st: 'Seo u batlang ho se bitsa' },                                            /* CHECK */
    'matsema.deliv.derived':    { en: 'The state is worked out from the numbers. It is never typed in — the database refuses that, and so does this screen.',
                                  st: 'Boemo bo baloa ho tsoa lipalong. Ha bo ngoloe ka letsoho — database ha e bo amohele, ʼme le leqephe lena ha le bo amohele.' }, /* CHECK */
    'matsema.deliv.refused':    { en: 'You marked this “{chosen}”. {delivered} arrived against {due} due, so it is recorded as “{derived}”. The numbers decide, not the word.',
                                  st: 'U e tšoaile e le “{chosen}”. Ho fihlile {delivered} ho {due} e neng e lokela, kahoo e ngoliloe e le “{derived}”. Lipalo li etsa qeto, eseng lentsoe.' }, /* CHECK */
    'matsema.deliv.err.date':   { en: 'Put in the day it is due.',
                                  st: 'Ngola letsatsi la phano.' },                                            /* CHECK */
    'matsema.deliv.err.qty':    { en: 'How much is due must be more than zero. A delivery of nothing is not a delivery.',
                                  st: 'Palo e lokelang ho fanoa e tlameha ho feta lefeela. Phano ea lefeela hase phano.' }, /* CHECK */
    'matsema.deliv.err.dup':    { en: 'There is already a delivery due on {date}. One date, one delivery — the database enforces it.',
                                  st: 'Ho se ho na le phano e lokelang ka {date}. Letsatsi le leng, phano e ʼngoe — database e tiisa seo.' }, /* CHECK */
    'matsema.deliv.err.neg':    { en: 'What arrived cannot be less than nothing.',
                                  st: 'Se fihlileng se ke ke sa ba ka tlase ho lefeela.' },                    /* CHECK */
    'matsema.deliv.only_conv':  { en: 'Only the convenor sets the dates and records what arrived.',
                                  st: 'Ke mookameli feela ea behang matsatsi le ho ngola se fihlileng.' },     /* CHECK */
    'matsema.deliv.due_so_far': { en: 'Due so far',              st: 'Ho loketseng ho fihlela joale' },        /* CHECK */
    'matsema.deliv.arrived_so_far': { en: 'Arrived so far',      st: 'Ho fihlileng ho fihlela joale' },        /* CHECK */
    'matsema.deliv.promised':   { en: 'Promised in total',       st: 'Ho tšepisitsoeng hohle' },               /* CHECK */
    'matsema.deliv.next':       { en: 'Next due',                st: 'E latelang' },                           /* CHECK */
    'matsema.deliv.dates':      { en: 'Dates set',               st: 'Matsatsi a behiloeng' },                 /* CHECK */
    'matsema.deliv.nothing_due':{ en: 'Nothing has fallen due yet.',
                                  st: 'Ha ho letho le seng le lokela hajoale.' },                              /* CHECK */
    'matsema.deliv.of_due':     { en: '{delivered} of {due}',    st: '{delivered} ho {due}' },                 /* CHECK */
    'matsema.deliv.cancelled':  { en: 'cancelled',               st: 'e hlakotsoe' },                          /* CHECK */
    'matsema.deliv.record_for': { en: 'Record what arrived on {date}',
                                  st: 'Ngola se fihlileng ka {date}' },                                        /* CHECK */

    /* =====================================================================
       DISPUTES
       THE PLATFORM DOES NOT ADJUDICATE. Every string below has to be readable
       without implying a verdict. Nothing here may say who is right.
       ===================================================================== */
    'matsema.disp.section':     { en: 'If something went wrong', st: 'Haeba ho na le se sa tsamaeang hantle' },/* CHECK */
    'matsema.disp.none':        { en: 'Nothing has been raised about this delivery.',
                                  st: 'Ha ho letho le hlahisitsoeng mabapi le phano ena.' },                   /* CHECK */
    'matsema.disp.cannot':      { en: 'This cannot be raised: {why}',
                                  st: 'Sena se ke ke sa hlahisoa: {why}' },                                     /* CHECK */
    'matsema.disp.about':       { en: 'This is about {name}',    st: 'Sena se mabapi le {name}' },             /* CHECK */
    'matsema.disp.amount_hint': { en: 'Leave this empty if it is not about money.',
                                  st: 'E siee e se na letho haeba e sa amane le chelete.' },                    /* CHECK */
    'matsema.disp.account_n':   { en: 'Account {n} · {who} · {date}',
                                  st: 'Tlaleho {n} · {who} · {date}' },                                        /* CHECK */
    'matsema.disp.send':        { en: 'Write this down, finally',
                                  st: 'E ngole, e ke ke ea fetoloa' },                                          /* CHECK */
    'matsema.disp.reply_send':  { en: 'Add my side, finally',    st: 'Kenya lehlakore la ka, le ke ke la fetoloa' }, /* CHECK */
    'matsema.disp.outcome_hint':{ en: 'Write what the two of you agreed between yourselves. Matsema records it; it did not decide it.',
                                  st: 'Ngola seo le se lumellaneng le le babeli. Matsema e se ngola feela; ha e a se etsa qeto.' }, /* CHECK */
    'matsema.disp.accept':      { en: 'Accept this outcome',     st: 'Amohela qeto ena' },                     /* CHECK */
    'matsema.disp.raised_on':   { en: 'Raised {date}',           st: 'E hlahisitsoe ka {date}' },              /* CHECK */
    'matsema.disp.amount_at':   { en: 'Amount in question: {amount}',
                                  st: 'Chelete e puisanong: {amount}' },                                        /* CHECK */
    'matsema.disp.standing':    { en: 'Raised about this member',
                                  st: 'Tse hlahisitsoeng mabapi le setho sena' },                               /* CHECK */
    'matsema.disp.counts':      { en: '{open} open · {resolved} settled',
                                  st: '{open} tse buletsoeng · {resolved} tse rarollotsoeng' },                /* CHECK */
    'matsema.disp.nothing_raised': { en: 'Nothing has been raised about this member.',
                                  st: 'Ha ho letho le hlahisitsoeng mabapi le setho sena.' },                  /* CHECK */

    /* MEND.canDispute's own refusals, carried into Sesotho and not changed.
       The rule lives in core; these are only its words. */
    'matsema.disp.why.nojob':   { en: 'there is no such job on the record',
                                  st: 'ha ho mosebetsi o joalo tlalehong' },                                    /* CHECK */
    'matsema.disp.why.notagreed': { en: 'this job has not been agreed yet, so there is nothing to dispute',
                                  st: 'mosebetsi ona ha o so lumellanoe, kahoo ha ho letho le ka qabanoang ka lona' }, /* CHECK */
    'matsema.disp.why.notparty':{ en: 'only the two people in this job can raise something about it',
                                  st: 'ke batho ba babeli ba mosebetsi ona feela ba ka hlahisang ntho ka oona' }, /* CHECK */
    'matsema.disp.why.yourself':{ en: 'that is you',            st: 'eo ke uena' },                            /* CHECK */
    'matsema.disp.why.notinjob':{ en: 'that person was not part of this job',
                                  st: 'motho eo o ne a se karolo ea mosebetsi ona' },                           /* CHECK */
    'matsema.disp.why.tooshort':{ en: 'say what went wrong, in a sentence or two',
                                  st: 'bolela se fositsoeng, ka polelo e le ʼngoe kapa tse peli' },             /* CHECK */

    /* =====================================================================
       START A POOL / PLEDGE
       ===================================================================== */
    'matsema.start.heading':    { en: 'Start a pool',            st: 'Qala sehlopha' },                        /* CHECK */
    'matsema.start.intro':      { en: 'You are the convenor. You set the target the buyer asked for, and you confirm each member’s pledge once you believe they can actually deliver it.',
                                  st: 'Uena u mookameli. U beha sepheo seo moreki a se kopileng, ʼme u netefatsa boitlamo ba setho se seng le se seng ha u lumela hore ba ka fana ka ʼnete.' }, /* CHECK */
    'matsema.start.title':      { en: 'Title',                   st: 'Sehlooho' },                             /* CHECK */
    'matsema.start.title.hint': { en: 'Between 4 and 140 characters.',
                                  st: 'Pakeng tsa litlhaku tse 4 le tse 140.' },                               /* CHECK */
    'matsema.start.purpose':    { en: 'Purpose',                 st: 'Morero' },                               /* CHECK */
    'matsema.start.purpose.ph': { en: 'What can this pool do together that none of you can do alone?',
                                  st: 'Sehlopha sena se ka etsa eng hammoho seo ho seng le a mong ea ka se etsang a le mong?' }, /* CHECK */
    'matsema.start.kind':       { en: 'Target kind',             st: 'Mofuta oa sepheo' },                     /* CHECK */
    'matsema.start.value':      { en: 'Target value',            st: 'Palo ea sepheo' },                       /* CHECK */
    'matsema.start.unit':       { en: 'Unit',                    st: 'Tekanyo' },                              /* CHECK */
    'matsema.start.unit.hint':  { en: 'Money pools use LSL.',    st: 'Lihlopha tsa chelete li sebelisa LSL.' },/* CHECK */
    'matsema.start.buyer.ph':   { en: 'Who is this for? Leave blank if not known yet',
                                  st: 'Sena ke sa mang? E siee e se na letho haeba ho e-so tsejoe' },          /* CHECK */
    'matsema.start.go':         { en: 'Start the pool',          st: 'Qala sehlopha' },                        /* CHECK */
    'matsema.pledge.heading':   { en: 'Pledge a share',          st: 'Itlame ka karolo' },                     /* CHECK */
    'matsema.pledge.your':      { en: 'Your share',              st: 'Karolo ea hao' },                        /* CHECK */
    'matsema.pledge.hint.by':   { en: 'What you can actually deliver by {date}. A pledge is a commitment to supply, not a payment.',
                                  st: 'Seo u ka se fanang ka ʼnete ho fihlela {date}. Boitlamo ke tšepiso ea ho fana, eseng tefo.' }, /* CHECK */
    'matsema.pledge.hint.call': { en: 'What you can actually deliver when the convenor calls the pool. A pledge is a commitment to supply, not a payment.',
                                  st: 'Seo u ka se fanang ka ʼnete ha mookameli a bitsa sehlopha. Boitlamo ke tšepiso ea ho fana, eseng tefo.' }, /* CHECK */
    'matsema.pledge.note':      { en: 'Note for the convenor',   st: 'Tlhokomeliso ho mookameli' },            /* CHECK */
    'matsema.pledge.note.ph':   { en: 'Anything the convenor should know — planting dates, transport, grading',
                                  st: 'Seo mookameli a lokelang ho se tseba — matsatsi a ho lema, lipalangoang, ho arola litheko' }, /* CHECK */
    'matsema.pledge.go':        { en: 'Make this pledge',        st: 'Etsa boitlamo bona' },                   /* CHECK */
    'matsema.pledge.already':   { en: 'You have already pledged {qty} to this pool.',
                                  st: 'U se u itlamme ka {qty} sehlopheng sena.' },                            /* CHECK */
    'matsema.pledge.nomoney':   { en: 'No money moves here. You are recording a promise to supply.',
                                  st: 'Ha ho chelete e tsamaeang mona. U ngola tšepiso ea ho fana.' },         /* CHECK */

    /* ---- my pools ---- */
    'matsema.mine.convening':   { en: 'Pools I convene',         st: 'Lihlopha tseo ke li okametseng' },       /* CHECK */
    'matsema.mine.joined':      { en: 'Pools I have joined',     st: 'Lihlopha tseo ke kenneng ho tsona' },    /* CHECK */
    'matsema.mine.none_conv':   { en: 'You convene no pools yet', st: 'Ha u so okamele sehlopha' },            /* CHECK */
    'matsema.mine.none_joined': { en: 'You have not pledged to any pool yet',
                                  st: 'Ha u so itlame sehlopheng leha se le seng' },                            /* CHECK */
    'matsema.mine.nobody':      { en: 'Nobody is signed in',     st: 'Ha ho motho ea keneng' },                /* CHECK */
    'matsema.mine.waiting.one': { en: '1 pledge waiting for you to confirm →',
                                  st: 'Boitlamo bo le 1 bo u emetse hore u bo netefatse →' },                  /* CHECK */
    'matsema.mine.waiting.many':{ en: '{n} pledges waiting for you to confirm →',
                                  st: 'Boitlamo bo {n} bo u emetse hore u bo netefatse →' },                   /* CHECK */
    'matsema.mine.nothing':     { en: 'Nothing waiting to be confirmed →',
                                  st: 'Ha ho letho le emetseng ho netefatsoa →' },                             /* CHECK */
    'matsema.mine.your_pledge': { en: 'Your pledge: {qty}',      st: 'Boitlamo ba hao: {qty}' },               /* CHECK */

    /* ---- documents screen ---- */
    'matsema.docs.heading':     { en: 'My documents',            st: 'Litokomane tsa ka' },                    /* CHECK */
    'matsema.docs.have':        { en: 'What you have',           st: 'Seo u nang le sona' },                   /* CHECK */
    'matsema.docs.none':        { en: 'Nothing uploaded yet',    st: 'Ha ho letho le kenyelelitsoeng' },       /* CHECK */
    'matsema.docs.add':         { en: 'Add a document',          st: 'Kenya tokomane' },                       /* CHECK */
    'matsema.docs.file':        { en: 'The file',                st: 'Faele' },                                /* CHECK */
    'matsema.docs.what':        { en: 'What is it',              st: 'Ke eng' },                               /* CHECK */
    'matsema.docs.issuer.ph':   { en: 'Who issued it',           st: 'Ke mang ea e fanileng' },                /* CHECK */
    'matsema.docs.upload':      { en: 'Upload as a draft',       st: 'Kenya e le e sa romelloang' },           /* CHECK */
    'matsema.docs.uploading':   { en: 'Uploading…',              st: 'Ea kenya…' },                            /* CHECK */
    'matsema.docs.submit':      { en: 'Send to the verification desk',
                                  st: 'Romela tafoleng ea netefatso' },                                         /* CHECK */
    'matsema.docs.open':        { en: 'Open the file',           st: 'Bula faele' },                           /* CHECK */
    'matsema.docs.asking':      { en: 'Asking…',                 st: 'Ea kopa…' },                             /* CHECK */
    'matsema.docs.sent':        { en: 'Sent. It is on the reviewer’s desk now and cannot be edited while it is there.',
                                  st: 'E rometsoe. E tafoleng ea mohlahlobi hona joale, ʼme e ke ke ea fetoloa ha e le teng.' }, /* CHECK */
    /* Why a document is in the state it is in. One whole sentence per state,
       with the date as a placeholder — a fragment plus a date plus another
       fragment only ever comes out in English word order. */
    'matsema.docs.why.verified':    { en: 'Seen and accepted by the verification desk.',
                                      st: 'E boniloe ʼme ea amoheloa ke tafole ea netefatso.' },               /* CHECK */
    'matsema.docs.why.verified_on': { en: 'Seen and accepted by the verification desk on {date}.',
                                      st: 'E boniloe ʼme ea amoheloa ke tafole ea netefatso ka {date}.' },     /* CHECK */
    'matsema.docs.why.expires':     { en: 'It stops counting on {date}.',
                                      st: 'E khaotsa ho bala ka {date}.' },                                     /* CHECK */
    'matsema.docs.why.expired':     { en: 'This was verified, but it expired on {date}. It counts for nothing on any of the three platforms until you send the current one.',
                                      st: 'E ne e netefalitsoe, empa e felile ka {date}. Ha e bale letho lithaleng tse tharo ho fihlela u romela ea hajoale.' }, /* CHECK */
    'matsema.docs.why.waiting':     { en: 'On the reviewer’s desk since {date}. The oldest submission is looked at first.',
                                      st: 'E tafoleng ea mohlahlobi ho tloha ka {date}. E romelletsoeng pele ke eona e shebiloang pele.' }, /* CHECK */
    'matsema.docs.why.waiting_nodate': { en: 'On the reviewer’s desk. The date it was sent was not recorded.',
                                      st: 'E tafoleng ea mohlahlobi. Letsatsi leo e rometsoeng ka lona ha lea ngoloa.' }, /* CHECK */
    'matsema.docs.why.draft':       { en: 'Uploaded, and NOT sent to the verification desk. Nobody is looking at it yet.',
                                      st: 'E kenyelelitsoe, empa HA EA ROMELLOA tafoleng ea netefatso. Ha ho motho ea e shebang hajoale.' }, /* CHECK */

    'matsema.docs.uploaded':    { en: 'Uploaded as a DRAFT. It has not been sent to the verification desk — press “Send to the verification desk” below when you are ready for somebody to look at it.',
                                  st: 'E kenyelelitsoe e SA ROMELLOA. Ha ea romelloa tafoleng ea netefatso — tobetsa “Romela tafoleng ea netefatso” ka tlase ha u loketse hore motho a e shebe.' }, /* CHECK */
    'matsema.docs.err.nofile':  { en: 'Choose a file first. There is nothing to upload.',
                                  st: 'Khetha faele pele. Ha ho letho le ka kenyelloang.' },                   /* CHECK */
    'matsema.docs.err.toobig':  { en: 'That file is {mb} MB. The bucket refuses anything over 10 MB, so it would be rejected on arrival. Photograph it at a lower resolution.',
                                  st: 'Faele eo ke {mb} MB. Sebaka sa polokelo ha se amohele se fetang 10 MB, kahoo e ne e tla hanoa ha e fihla. E nke setšoantšo se senyenyane.' }, /* CHECK */
    'matsema.docs.err.mime':    { en: 'The bucket accepts JPEG, PNG, HEIC and PDF only. That file says it is {type}.',
                                  st: 'Sebaka sa polokelo se amohela JPEG, PNG, HEIC le PDF feela. Faele eo e re ke {type}.' }, /* CHECK */
    'matsema.docs.err.dates':   { en: 'The expiry date has to be after the issue date.',
                                  st: 'Letsatsi la ho fela le tlameha ho ba ka mor’a letsatsi la ho fanoa.' }, /* CHECK */
    'matsema.docs.err.nolink':  { en: 'There is no file to open. This page is not connected to a server, so nothing was ever uploaded — only the record of it exists, in this browser.',
                                  st: 'Ha ho faele e ka buloang. Leqephe lena ha le hokahane le seva, kahoo ha ho letho le kileng la kenyelloa — ho na le tlaleho feela, sebatling sena.' }, /* CHECK */
    'matsema.docs.err.link':    { en: 'Could not produce a link: {why}',
                                  st: 'Ha ho khonehe ho etsa sehokelo: {why}' },                                /* CHECK */

    /* ---- the write-failure alarm. Two different things, said differently:
       a write the server REFUSED is never coming back; a write that is QUEUED
       is still on its way. Both mean "not in the database yet"; only one is a
       wound, and the Sesotho must not blur them either. ---- */
    'matsema.alarm.refused.one':  { en: '1 change was refused',  st: 'Phetoho e le 1 e hanoe' },               /* CHECK */
    'matsema.alarm.refused.many': { en: '{n} changes were refused', st: 'Liphetoho tse {n} li hanoe' },        /* CHECK */
    'matsema.alarm.refused.detail': { en: 'These exist in this browser and nowhere else. The database said no, and it will say no again — so nobody else can see them, and any pool total counting them cannot be promised to a buyer.',
                                  st: 'Tsena li teng sebatling sena feela. Database e hanne, ʼme e tla hana hape — kahoo ha ho motho e mong ea li bonang, ʼme palo efe kapa efe ea sehlopha e li balang e ke ke ea tšepisoa moreki.' }, /* CHECK */
    'matsema.alarm.waiting.one':  { en: '1 change is waiting to be sent',
                                    st: 'Phetoho e le 1 e emetse ho romelloa' },                                /* CHECK */
    'matsema.alarm.waiting.many': { en: '{n} changes are waiting to be sent',
                                    st: 'Liphetoho tse {n} li emetse ho romelloa' },                            /* CHECK */
    'matsema.actbar.reload':    { en: 'A session from before the reload — the token was not kept',
                                  st: 'Seboka sa pele ho ho khutlisoa ha leqephe — token ha ea bolokoa' },     /* CHECK */
    'matsema.actbar.nopassword':{ en: 'Email and a one-time code. No password.',
                                  st: 'Imeile le khoutu ea nakoana. Ha ho phasewete.' },                        /* CHECK */
    'matsema.notsignedin':      { en: 'Not signed in',           st: 'Ha u so kene' },                         /* CHECK */

    /* ---- the masthead, the footer and the honesty banner ---------------- */
    'matsema.mast.what':        { en: 'Moshoeshoe’s work parties: the field one family could not hoe in a season, twenty families finished in a day. This is that, for supply. What one field cannot fill, twenty can.',
                                  st: 'Matsema a Moshoeshoe: tšimo eo lelapa le le leng le neng le ke ke la e lema selemong sohle, malapa a mashome a mabeli a ne a e qeta ka letsatsi le le leng. Ke sona seo, empa bakeng sa ho fana ka thepa. Seo tšimo e le ʼngoe e ke keng ea se fana, tse mashome a mabeli li ka se fana.' }, /* CHECK */
    'matsema.actas':            { en: 'Act as which member',    st: 'Sebetsa u le setho sefe' },              /* CHECK */
    'matsema.notlive':          { en: 'Nothing on this page is live',
                                  st: 'Ha ho letho le phelang leqepheng lena' },                                /* CHECK */

    /* ---- the documents screen's own refusals and the member profile ------ */
    'matsema.docs.signin_first':{ en: 'Sign in to see your documents',
                                  st: 'Kena ho bona litokomane tsa hao' },                                      /* CHECK */
    'matsema.docs.signedout':   { en: 'The reload signed you out',
                                  st: 'Ho khutlisoa ha leqephe ho u ntšitse' },                                 /* CHECK */
    'matsema.docs.noprofile':   { en: 'No member profile',       st: 'Ha ho profaele ea setho' },              /* CHECK */
    'matsema.docs.rejhead':     { en: 'Rejected — the reason given',
                                  st: 'Ha ea amoheloa — lebaka le fanoeng' },                                   /* CHECK */
    'matsema.docs.neverdb':     { en: 'This never reached the database',
                                  st: 'Sena ha sea ka sa fihla database-ng' },                                  /* CHECK */
    'matsema.docs.opensigned':  { en: 'Open the signed link →',  st: 'Bula sehokelo se saenneng →' },          /* CHECK */
    'matsema.prof.name':        { en: 'Your name, or the name of the entity',
                                  st: 'Lebitso la hao, kapa lebitso la mokhatlo' },                             /* CHECK */
    'matsema.prof.name.hint':   { en: 'Between 2 and 80 characters — what the schema accepts.',
                                  st: 'Pakeng tsa litlhaku tse 2 le tse 80 — seo schema e se amohelang.' },    /* CHECK */
    'matsema.prof.village':     { en: 'Village or town',         st: 'Motse kapa toropo' },                     /* CHECK */
    'matsema.prof.go':          { en: 'Create my member profile',
                                  st: 'Etsa profaele ea ka ea setho' },                                         /* CHECK */
    'matsema.back_to_pools':    { en: 'Back to the pools',       st: 'Khutlela lihlopheng' },                   /* CHECK */
    'matsema.signedin':         { en: 'Signed in',               st: 'U kene' },                               /* CHECK */

    'matsema.docs.badge.waiting':  { en: 'Waiting',              st: 'E emetse' },                             /* CHECK */
    'matsema.docs.badge.draft':    { en: 'Draft',                st: 'Ha e so romelloe' },                     /* CHECK */

    /* ---- sign in ---- */
    'matsema.auth.account':     { en: 'Your account',            st: 'Akhaonto ea hao' },                      /* CHECK */
    'matsema.auth.send_code':   { en: 'Send me a code',          st: 'Nthomelle khoutu' },                     /* CHECK */
    'matsema.auth.sending':     { en: 'Sending…',                st: 'Ea romela…' },                           /* CHECK */
    'matsema.auth.checking':    { en: 'Checking…',               st: 'Ea hlahloba…' },                         /* CHECK */
    'matsema.auth.the_code':    { en: 'The code',                st: 'Khoutu' },                               /* CHECK */
    'matsema.auth.code_went':   { en: 'A code went to {email}.', st: 'Khoutu e ile ea {email}.' },             /* CHECK */
    'matsema.auth.other_email': { en: 'Use a different email',   st: 'Sebelisa imeile e ʼngoe' },              /* CHECK */
    'matsema.auth.bad_email':   { en: 'That does not look like an email address, and the code has nowhere to go.',
                                  st: 'Eo ha e shebahale e le aterese ea imeile, ʼme khoutu ha e na moo e eang teng.' }, /* CHECK */
    'matsema.auth.enter_code':  { en: 'Enter the code from the email.',
                                  st: 'Kenya khoutu e tsoang imeileng.' },                                      /* CHECK */
    'matsema.auth.notsent':     { en: 'The code could not be sent: {why}',
                                  st: 'Khoutu ha ea ka ea romelloa: {why}' },                                   /* CHECK */

    'matsema.deliv.behind_head':{ en: 'Behind on deliveries',    st: 'Ho setse morao liphanong' },             /* CHECK */

    /* =====================================================================
       SAYING SOMETHING IS WRONG WITH A POOL

       The labels and the reasons come from the SHARED table — report.this,
       report.why, report.detail, report.private, report.signal, report.r.*
       and mod.hidden / mod.reason — so "report" is the same word here, on
       Pitso and on Mafisa. Only the pool-shaped sentences are here.
       ===================================================================== */
    'matsema.report.heading':   { en: 'Report this pool',
                                  st: 'Tlaleha sehlopha sena' },                                               /* CHECK */
    'matsema.report.lead':      { en: 'If something here is wrong — the pool does not exist, the buyer is invented, the convenor is not who they say — tell MEND. Nothing about this reaches the convenor.',
                                  st: 'Haeba ho na le se fosahetseng mona — sehlopha ha se teng, moreki o iqapetsoe, mokhanni hase eena eo a ipolelang hore ke eena — bolella MEND. Ha ho letho la sena le fihlang ho mokhanni.' }, /* CHECK */
    'matsema.report.send':      { en: 'Send this to MEND',
                                  st: 'Romela sena ho MEND' },                                                 /* CHECK */
    'matsema.report.cannot':    { en: 'You cannot report this: {why}',
                                  st: 'U ke ke oa tlaleha sena: {why}' },                                      /* CHECK */
    'matsema.report.why.nobody':{ en: 'you have to be acting as somebody before you can report anything',
                                  st: 'u tlameha ho ba motho pele u ka tlaleha letho' },                        /* CHECK */
    'matsema.report.one_opinion':{ en: 'One report is one opinion, so a count is published only once a second person has said the same thing.',
                                  st: 'Tlaleho e le ʼngoe ke maikutlo a motho a le mong, kahoo palo e hatisoa feela ha motho oa bobeli a buile ntho e tšoanang.' }, /* CHECK */
    'matsema.report.yours':     { en: 'You reported this pool. MEND has it; nobody else can see that it was you.',
                                  st: 'U tlalehile sehlopha sena. MEND e na le eona; ha ho motho e mong ea bonang hore e ne e le uena.' }, /* CHECK */

    /* ---- the verdict, when a claim has been made about the pool ---------- */
    'matsema.verdict.reported': { en: 'Something has been raised about this pool.',
                                  st: 'Ho na le se hlahisitsoeng ka sehlopha sena.' },                         /* CHECK */
    'matsema.verdict.reported.sub': { en: 'A report is a claim, not a finding. MEND has decided nothing and no figure above has been changed by it. It is here so a buyer knows it was raised before contracting against these numbers.',
                                  st: 'Tlaleho ke tseko, eseng qeto. MEND ha e so etse qeto ʼme ha ho palo e ka holimo e fetotsoeng ke eona. E mona e le hore moreki a tsebe hore e hlahisitsoe pele a etsa konteraka ka lipalo tsena.' }, /* CHECK */
    'matsema.verdict.reported.supply': { en: 'On the figures alone: {confirmed} confirmed of {target}.',
                                  st: 'Ka lipalo feela: {confirmed} bo netefalitsoeng ho {target}.' },          /* CHECK */
    'matsema.badge.reported':   { en: 'Reported',                st: 'E tlalehiloe' },                          /* CHECK */

    /* =====================================================================
       A POOL MEND HAS TAKEN DOWN
       Members who pledged to it are entitled to know what happened and why —
       a pool that simply stops appearing teaches everyone that the record
       cannot be relied on.
       ===================================================================== */
    'matsema.mod.headline':     { en: 'MEND has taken this pool down.',
                                  st: 'MEND e tlositse sehlopha sena.' },                                      /* CHECK */
    'matsema.mod.on':           { en: 'Taken down on {date}.',   st: 'E tlositsoe ka {date}.' },                /* CHECK */
    'matsema.mod.body':         { en: 'It is no longer open for pledges and it must not be offered to a buyer. This is MEND deciding what may be offered on its own platform. It is not a judgement between the people in the pool, and it settles nothing between them.',
                                  st: 'Ha e sa buletsoe boitlamo ʼme e ke ke ea fanoa ho moreki. Ena ke MEND e etsa qeto ka se ka fanoang sethaleng sa eona. Hase kahlolo lipakeng tsa batho ba sehlopheng, ʼme ha e rarolle letho pakeng tsa bona.' }, /* CHECK */
    'matsema.mod.members':      { en: 'If you pledged to this pool, this is what happened to it. Your pledge is still on the record below and the convenor can still be reached.',
                                  st: 'Haeba u ile ua itlama sehlopheng sena, sena ke se etsahetseng ho sona. Boitlamo ba hao bo ntse bo le tlalehong e ka tlase ʼme mokhanni o ntse a fumaneha.' }, /* CHECK */
    'matsema.mod.restored':     { en: 'MEND took this pool down and has since put it back. Restored on {date}.',
                                  st: 'MEND e ile ea tlosa sehlopha sena ʼme e se e se khutlisitse. Se khutlisitsoe ka {date}.' }, /* CHECK */
    'matsema.verdict.hidden':   { en: 'Taken down by MEND. Nothing here may be contracted against.',
                                  st: 'E tlositsoe ke MEND. Ha ho letho mona le ka etsoang konteraka ka lona.' }, /* CHECK */

    /* =====================================================================
       WHAT THE LIST IS NOT SHOWING

       A bounded list that does not say it is bounded is lying by omission.
       Pledges are the serious one: a total computed from some of the rows is
       not a small total, it is a WRONG total, and a buyer relying on it is
       the worst failure this app has.
       ===================================================================== */
    'matsema.cov.pools':        { en: 'Showing {loaded} of {total} pools.',
                                  st: 'Ho bontšoa {loaded} ho {total} lihlopheng.' },                          /* CHECK */
    'matsema.cov.pools.why':    { en: 'The list stops there so the page still opens on a slow connection. Search above to reach a pool that is not on it — the search runs on the server, not on this list.',
                                  st: 'Lethathamo le emisa moo e le hore leqephe le ntse le buleha ka khokahano e liehang. Batla ka holimo ho fihlela sehlopha se seng ho lona — patlo e sebetsa sevareng, eseng lethathamong lena.' }, /* CHECK */
    'matsema.cov.pledges':      { en: 'Showing {loaded} of {total} pledges.',
                                  st: 'Ho bontšoa {loaded} ho {total} boitlamong.' },                          /* CHECK */
    'matsema.cov.deliv':        { en: 'Showing {loaded} of {total} delivery rows — the record below is part of the record, not all of it.',
                                  st: 'Ho bontšoa {loaded} ho {total} melaneng ea ho fana — tlaleho e ka tlase ke karolo ea tlaleho, eseng eona kaofela.' }, /* CHECK */
    'matsema.verdict.partial':  { en: 'Cannot say — not every pledge in this pool was loaded.',
                                  st: 'Ha ho khonehe ho bolela — hase boitlamo bohle sehlopheng sena bo kentsoeng.' }, /* CHECK */
    'matsema.verdict.partial.sub': { en: '{loaded} of {total} pledge rows reached this device. Every total above is added up from those rows only, so it is short of the real one by an amount nobody here knows. Do not read it to a buyer.',
                                  st: 'Melo e {loaded} ho e {total} ea boitlamo e fihlile sesebelisoeng sena. Lipalo tsohle tse ka holimo li baloa ho tsona feela, kahoo li haella ho tsa ʼnete ka palo eo ho seng ea e tsebang mona. Se ke oa li bala ho moreki.' }, /* CHECK */
    'matsema.badge.partial':    { en: 'Part of the list',        st: 'Karolo ea lethathamo' },                  /* CHECK */
    'matsema.sheet.partial':    { en: 'INCOMPLETE — NOT EVERY PLEDGE WAS LOADED',
                                  st: 'HA E FELLA — HASE BOITLAMO BOHLE BO KENTSOENG' },                       /* CHECK */
    'matsema.sheet.partial.sub': { en: 'Only {loaded} of this pool’s {total} pledge rows reached the device this sheet was produced on. Every figure printed here is added up from those rows alone and is lower than the true figure by an unknown amount. Do not contract against this sheet. Produce it again on a connection that can load the whole pool.',
                                  st: 'Only {loaded} of this pool’s {total} pledge rows reached the device this sheet was produced on. Every figure printed here is added up from those rows alone and is lower than the true figure by an unknown amount. Do not contract against this sheet. Produce it again on a connection that can load the whole pool.' }, /* CHECK — ENGLISH LEFT IN PLACE: this is the paragraph that stops a supermarket contracting on a wrong total. It has to be written by a Mosotho, not translated by me. */

    /* =====================================================================
       SEARCHING THE SERVER
       searchAll() can only find what this device already downloaded, which is
       now the first 200 of each list. The screen says which of the two ran.
       ===================================================================== */
    'matsema.search.label':     { en: 'Search every pool, person and listing',
                                  st: 'Batla sehlopha, motho le thepa e ngolisitsoeng' },                      /* CHECK */
    'matsema.search.ph':        { en: 'A crop, a place, a name',
                                  st: 'Lijalo, sebaka, lebitso' },                                             /* CHECK */
    'matsema.search.short':     { en: 'Two letters or more.',    st: 'Litlhaku tse peli kapa ho feta.' },       /* CHECK */
    'matsema.search.working':   { en: 'Searching…',              st: 'Ea batla…' },                            /* CHECK */
    'matsema.search.n':         { en: '{n} found for “{q}”.',    st: '{n} e fumanoe bakeng sa “{q}”.' },        /* CHECK */
    'matsema.search.none':      { en: 'Nothing matched “{q}”.',  st: 'Ha ho letho le tsamaellanang le “{q}”.' },/* CHECK */
    'matsema.search.server':    { en: 'Searched everything on the server.',
                                  st: 'Ho batlisisitsoe tsohle tse sevareng.' },                               /* CHECK */
    'matsema.search.local':     { en: 'Searched only what is loaded on this device. Anything the server holds beyond that cannot be found from here.',
                                  st: 'Ho batlisisitsoe feela tse kentsoeng sesebelisoeng sena. Tse ling tsohle tse sevareng li ke ke tsa fumanoa mona.' }, /* CHECK */
    'matsema.search.failed':    { en: 'The server search did not run ({why}). What is below came from this device only.',
                                  st: 'Patlo ea seva ha ea ka ea sebetsa ({why}). Tse ka tlase li tsoa sesebelisoeng sena feela.' }, /* CHECK */
    'matsema.search.elsewhere': { en: 'on {platform}',           st: 'ho {platform}' },                         /* CHECK */
    'matsema.res.person':       { en: 'Person',                  st: 'Motho' },
    'matsema.res.provider':     { en: 'Tradesperson',            st: 'Setsebi sa mosebetsi' },                  /* CHECK */
    'matsema.res.request':      { en: 'Job wanted',              st: 'Mosebetsi o batloang' },                  /* CHECK */
    'matsema.res.asset':        { en: 'Thing for hire',          st: 'Thepa e hirisoang' },                     /* CHECK */
    'matsema.res.pool':         { en: 'Pool',                    st: 'Sehlopha' },                              /* CHECK */

    /* =====================================================================
       YOUR ACCOUNT — taking a copy, and going

       Do not overpromise here. What is erased, what is kept and WHY it is
       kept are all stated before the button, and the Matsema-shaped part of
       it is stated in Matsema's own terms: a delivery that happened is the
       pool's record and the buyer's, not only yours.
       ===================================================================== */
    'matsema.acct.link':        { en: 'Your account — take a copy of your record, or remove it',
                                  st: 'Akhaonto ea hao — nka kopi ea tlaleho ea hao, kapa u e tlose' },        /* CHECK */
    'matsema.acct.needs_server':{ en: 'Taking a copy and removing an account both need a server. This page is not configured against one, so nothing you see is held anywhere but this browser — there is nothing to take a copy of, and nothing to erase.',
                                  st: 'Ho nka kopi le ho tlosa akhaonto ka bobeli li hloka seva. Leqephe lena ha le hokahane le se seng, kahoo se u se bonang ha se bolokoe kae kapa kae ntle le sebatling sena — ha ho letho la ho nka kopi, ʼme ha ho letho la ho hlakola.' }, /* CHECK */

    'matsema.acct.copy.heading':{ en: 'Take a copy',             st: 'Nka kopi' },                              /* CHECK */
    'matsema.acct.copy.lead':   { en: 'Everything MEND GROUP holds about you across the three platforms, in one file you keep. Documents and photographs are listed but not included — those are private files and each one is asked for on its own.',
                                  st: 'Tsohle tseo MEND GROUP e nang le tsona ka uena lithaleng tse tharo, faeleng e le ʼngoe eo u e bolokang. Litokomane le linepe li thathamisitsoe empa ha li kenyelletsoe — tseo ke lifaele tsa lekunutu ʼme e ʼngoe le e ʼngoe e kōpuoa ka boeona.' }, /* CHECK */
    'matsema.acct.copy.go':     { en: 'Make my copy',            st: 'Etsa kopi ea ka' },                       /* CHECK */
    'matsema.acct.copy.working':{ en: 'Gathering it…',           st: 'Ea e bokella…' },                        /* CHECK */
    'matsema.acct.copy.ready':  { en: 'Your copy is ready — {size}.',
                                  st: 'Kopi ea hao e loketse — {size}.' },                                     /* CHECK */
    'matsema.acct.copy.save':   { en: 'Save the file',           st: 'Boloka faele' },                          /* CHECK */
    'matsema.acct.copy.failed': { en: 'The copy could not be made: {why}',
                                  st: 'Kopi ha ea ka ea etsoa: {why}' },                                       /* CHECK */

    'matsema.acct.remove.heading': { en: 'Remove your account',  st: 'Tlosa akhaonto ea hao' },                 /* CHECK */
    'matsema.acct.remove.lead': { en: 'This is what it does, in numbers, before anything happens.',
                                  st: 'Sena ke seo e se etsang, ka lipalo, pele ho etsahala letho.' },          /* CHECK */
    'matsema.acct.preview.working': { en: 'Working out what this would do…',
                                  st: 'Ea hlahloba hore na sena se ka etsa eng…' },                           /* CHECK */
    'matsema.acct.preview.failed': { en: 'The preview could not be fetched, so nothing is offered here: {why}',
                                  st: 'Pontšo e ka pele ha ea ka ea fumanoa, kahoo ha ho letho le fanoang mona: {why}' }, /* CHECK */
    'matsema.acct.erased':      { en: 'Erased',                  st: 'Ho hlakotsoe' },                          /* CHECK */
    'matsema.acct.kept':        { en: 'Kept, with your name off it',
                                  st: 'Ho bolokiloe, lebitso la hao le tlositsoe' },                           /* CHECK */
    'matsema.acct.why_kept':    { en: 'Why those stay',          st: 'Hobaneng tseo li setse' },                /* CHECK */
    'matsema.acct.undone':      { en: 'This cannot be undone.',  st: 'Sena se ke ke sa khutlisoa.' },           /* CHECK */
    'matsema.acct.k.your_name_and_contact': { en: 'Your name, phone, village and anything you wrote about yourself',
                                  st: 'Lebitso la hao, mohala, motse le sohle seo u ingotseng sona' },          /* CHECK */
    'matsema.acct.k.documents': { en: 'Documents',               st: 'Litokomane' },
    'matsema.acct.k.photographs': { en: 'Photographs',           st: 'Linepe' },
    'matsema.acct.k.listings':  { en: 'Listings taken down',     st: 'Lingoliso tse tlositsoeng' },             /* CHECK */
    'matsema.acct.k.completed_jobs': { en: 'Completed jobs',     st: 'Mesebetsi e phethiloeng' },               /* CHECK */
    'matsema.acct.k.reviews_others_wrote': { en: 'Reviews other people wrote about you',
                                  st: 'Litlhahlobo tseo batho ba bang ba li ngotseng ka uena' },                /* CHECK */
    'matsema.acct.k.settled_payments': { en: 'Settled payments', st: 'Litefo tse lefiloeng' },                  /* CHECK */
    'matsema.acct.k.disputes':  { en: 'Disputes',                st: 'Liqabang' },                              /* CHECK */
    'matsema.acct.k.record_entries': { en: 'Entries in the record trail',
                                  st: 'Lingoliso tlalehong ea liketso' },                                      /* CHECK */
    'matsema.acct.k.condition_photographs': { en: 'Handover and evidence photographs',
                                  st: 'Linepe tsa ha ho fanoa le tsa bopaki' },                                 /* CHECK */

    'matsema.acct.pool.heading':{ en: 'What happens to your pledges',
                                  st: 'Se etsahalang ka boitlamo ba hao' },                                    /* CHECK */
    'matsema.acct.pool.delivered': { en: 'A delivery that has already happened stays. The pool and its buyer depend on that record, and a supply history one side could erase by closing an account would be worth nothing to either of them.',
                                  st: 'Ho fana ho seng ho etsahetse ho lula ho le teng. Sehlopha le moreki oa sona li itšetlehile ka tlaleho eo, ʼme tlaleho ea phano eo lehlakore le leng le ka e hlakolang ka ho koala akhaonto e ne e ke ke ea ba le thuso ho bobeli ba tsona.' }, /* CHECK */
    'matsema.acct.pool.forming':{ en: 'A pledge to a pool that is still forming should leave with you. It is a promise about a harvest that has not happened, and the pool has to know it is gone.',
                                  st: 'Boitlamo sehlopheng se ntseng se bopeha bo lokela ho tsamaea le uena. Ke tšepiso ka kotulo e e-song etsahale, ʼme sehlopha se tlameha ho tseba hore bo tsamaile.' }, /* CHECK */
    'matsema.acct.pool.gap.head': { en: 'What the erasure does not do',
                                  st: 'Seo ho hlakoloa ho sa se etseng' },                                      /* CHECK */
    'matsema.acct.pool.gap':    { en: 'The erasure does not do that for you. It removes your name, your documents and your photographs; it does not touch a pledge, so one left behind would sit in the pool total under a name that no longer names anybody. Withdraw them here first — the convenor sees the pool fall by that much straight away.',
                                  st: 'Ho hlakoloa ha ho u etsetse seo. Ho tlosa lebitso la hao, litokomane tsa hao le linepe tsa hao; ha ho ame boitlamo, kahoo bo setseng bo ne bo tla lula palong ea sehlopha tlas’a lebitso le sa hloleng le bitsa motho. Bo huleleng morao mona pele — mokhanni o bona sehlopha se theoha ka palo eo hang-hang.' }, /* CHECK */
    'matsema.acct.pool.none':   { en: 'You have no pledge on a pool that is still forming.',
                                  st: 'Ha u na boitlamo sehlopheng se ntseng se bopeha.' },                    /* CHECK */
    'matsema.acct.pool.withdraw': { en: 'Withdraw this pledge',  st: 'Hulela boitlamo bona morao' },            /* CHECK */
    'matsema.acct.pool.withdrawn': { en: 'Withdrawn. {pool} is now {qty} lower.',
                                  st: 'Bo huletsoe morao. {pool} joale se theohile ka {qty}.' },                /* CHECK */
    'matsema.acct.pool.kept_rows.one': { en: 'One pledge of yours is on a pool that has moved past forming, or has already been delivered. That one stays.',
                                  st: 'Boitlamo bo le bong ba hao bo sehlopheng se fetileng boemo ba ho bopeha, kapa bo se bo fanoe. Boo bo lula bo le teng.' }, /* CHECK */
    'matsema.acct.pool.kept_rows.many': { en: '{n} pledges of yours are on a pool that has moved past forming, or have already been delivered. Those stay.',
                                  st: 'Boitlamo ba hao bo {n} bo sehlopheng se fetileng boemo ba ho bopeha, kapa bo se bo fanoe. Boo bo lula bo le teng.' }, /* CHECK */

    'matsema.acct.confirm.label': { en: 'Type your name exactly as it is on your profile',
                                  st: 'Ngola lebitso la hao feela joalokaha le le profaeleng ea hao' },        /* CHECK */
    'matsema.acct.confirm.hint':{ en: 'It is “{name}”. Nothing happens until it matches — a button this size should not be reachable by a stray tap.',
                                  st: 'Ke “{name}”. Ha ho letho le etsahalang ho fihlela le tšoana — konopo e kholo hakana ha ea lokela ho fihleloa ka ho tobetsa ka phoso.' }, /* CHECK */
    'matsema.acct.remove.go':   { en: 'Remove my account',       st: 'Tlosa akhaonto ea ka' },                  /* CHECK */
    'matsema.acct.remove.working': { en: 'Removing…',            st: 'Ea tlosa…' },                            /* CHECK */
    'matsema.acct.remove.files':{ en: 'Removing your files — {done} of {total}.',
                                  st: 'Ea tlosa lifaele tsa hao — {done} ho {total}.' },                       /* CHECK */
    'matsema.acct.remove.record': { en: 'The files are gone. Removing the record now.',
                                  st: 'Lifaele li tlositsoe. Ea tlosa tlaleho hona joale.' },                  /* CHECK */
    'matsema.acct.remove.done': { en: 'Your account has been removed.',
                                  st: 'Akhaonto ea hao e tlositsoe.' },                                        /* CHECK */
    'matsema.acct.remove.failed': { en: 'Nothing was removed: {why}',
                                  st: 'Ha ho letho le tlositsoeng: {why}' }                                    /* CHECK */

    /* ENGLISH-ONLY, deliberately, and listed so the gap stays visible rather
       than forgotten. Every one of these is a paragraph of legal or
       explanatory prose, not a label. A Mosotho has to WRITE them, not
       translate them, and a clumsy rendering of any of them is worse than the
       English:
         · the long form of "records commitments, never holds money" in the
           three law boxes (the short form IS translated — `matsema.no_money`)
         · the paragraph on why there is no trust score
         · the "who is convening this" explanation of what the desk has seen
         · the buyer's-sheet prose: "Read the two figures separately", "What
           has actually arrived", "What Matsema is, and is not". This is the
           most important English on the platform — it is what a supermarket
           reads — and it should be the FIRST thing a native speaker writes
         · the dispute's own explanation of why there is no verdict has a
           shared translation (`dispute.no_verdict`) and IS used; only the
           longer note under it stays English
         · the sign-in and upload explanations ("uploading is not submitting",
           "the sign-in does not survive a reload")
         · `matsema.sheet.partial.sub` — the paragraph that stops a supermarket
           contracting against a total added up from half the pledge rows. It
           carries st = en on purpose and shows in needsReview(). This is the
           SECOND thing a native speaker should write, after the buyer's sheet
       Anything on this list renders in English in both languages, on purpose.
       ===================================================================== */
  });
})(window);
