/* ===========================================================================
   PITSO — this app's own strings.
   Loaded BEFORE core/mend.js and AFTER core/i18n.js. Keys are namespaced
   `pitso.` so three apps can be worked on in parallel without touching one
   shared file. MEND_I18N.extend() REFUSES a key that already exists rather
   than silently winning, so anything below that collides is a bug to fix here,
   not in core/i18n.js.

   ⚠️ SESOTHO NEEDS A NATIVE SPEAKER. Jakote — everything marked /* CHECK *​/
   is my construction, not something I know to be right. Where I could not put
   a thing plainly in Sesotho I have LEFT IT IN ENGLISH and marked it
   ENGLISH-ONLY, because a wrong translation read by somebody who speaks the
   language is worse than an untranslated one.

   Order of priority in here, deliberately: refusals and errors first. A person
   told "no" in a language they read poorly has not been told anything.

   ---------------------------------------------------------------------------
   WHAT IS **NOT** IN HERE, AND WHERE IT WENT INSTEAD
   core/i18n.js carries 227 shared strings. Nine keys that used to live in this
   file were removed because a shared one already said the same thing, and the
   app now calls the shared key:
     pitso.tab.find   → pitso.find        pitso.share      → ui.share
     pitso.tab.post   → pitso.post        pitso.print      → ui.print
     pitso.tab.requests → pitso.requests  pitso.anytrade   → ui.all_trades
     pitso.makeoffer  → pitso.offer       pitso.anydistrict→ ui.all_districts
     pitso.settle.err.ref → money.code_needed
     pitso.settle.ref.cash → money.cash_no_code
   The whole dispute vocabulary (dispute.* and dispute.k.*) is shared too; only
   Pitso's own dispute wording — refusals, buttons, the profile panel — is here
   under `pitso.disp.`.
   =========================================================================== */
(function (global) {
  'use strict';
  if (!global.MEND_I18N) return;

  global.MEND_I18N.extend({

    /* ---- REFUSALS AND ERRORS — the ones that matter most ----------------- */
    'pitso.err.noserver':      { en: 'The server is not answering, so nothing can be saved. Anything entered now would sit in this browser alone. This stays closed until the connection is back.',
                                 st: 'Seva ha se arabe, kahoo ha ho letho le ka bolokoang. Seo u se kenyang hona joale se ka lula sebatling sena feela. Sena se koaletsoe ho fihlela khokahano e khutla.' }, /* CHECK */
    'pitso.err.connecting':    { en: 'Still reaching the server. Anything entered right now would not get to it — give it a moment.',
                                 st: 'E ntse e leka ho fihla ho seva. Seo u se kenyang hona joale se ke ke sa fihla — ema hanyenyane.' }, /* CHECK */
    'pitso.err.offer.own':     { en: 'You cannot make an offer on your own request.',
                                 st: 'U ke ke ua fana ka theko mosebetsing oa hao.' },                        /* CHECK */
    'pitso.err.offer.closed':  { en: 'That request is no longer open.',
                                 st: 'Kopo eo ha e sa buleha.' },                                             /* CHECK */
    'pitso.err.offer.twice':   { en: 'You have already made an offer on that job.',
                                 st: 'U se u fane ka theko mosebetsing oo.' },                                /* CHECK */
    'pitso.err.quote':         { en: 'Enter a number of maloti, or leave it blank.',
                                 st: 'Ngola palo ea maloti, kapa u e siee e se na letho.' },                   /* CHECK */
    'pitso.err.saysomething':  { en: 'Say something. Four characters at least.',
                                 st: 'Bua ho hong. Bonyane litlhaku tse ʼnè.' },                              /* CHECK */
    'pitso.err.taken':         { en: 'That job already has someone on it.',
                                 st: 'Mosebetsi oo o se o na le motho.' },                                    /* CHECK */
    'pitso.err.accept.owner':  { en: 'Only the person who posted the job can accept an offer.',
                                 st: 'Ke ea ngotseng mosebetsi feela ea ka amohelang theko.' },                /* CHECK */
    'pitso.err.rate':          { en: 'Give it a number out of five.',
                                 st: 'Fana ka palo ho tse hlano.' },                                          /* CHECK */
    'pitso.err.reviewbody':    { en: 'Say what happened, in a sentence at least.',
                                 st: 'Bolela se etsahetseng, bonyane ka polelo e le ʼngoe.' },                 /* CHECK */
    'pitso.err.reviewlong':    { en: 'Keep it under 1,200 characters.',
                                 st: 'E boloke e le tlaase ho litlhaku tse 1,200.' },                         /* CHECK */
    'pitso.err.signin.post':   { en: 'Sign in first — a request has to carry a name.',
                                 st: 'Kena pele — kopo e tlameha ho tšoara lebitso.' },                       /* CHECK */
    'pitso.err.review.no':     { en: 'Cannot leave that review: {why}.',
                                 st: 'Tlhahlobo eo e ke ke ea siuoa: {why}.' },                               /* CHECK */

    /* Form errors — posting, offering, profile, upload. */
    'pitso.err.pick.trade':    { en: 'Choose the trade you need.',        st: 'Khetha mosebetsi oo u o hlokang.' },  /* CHECK */
    'pitso.err.pick.district': { en: 'Choose a district.',                st: 'Khetha setereke.' },                  /* CHECK */
    'pitso.err.title.len':     { en: 'Between 4 and 120 characters.',     st: 'Pakeng tsa litlhaku tse 4 le tse 120.' }, /* CHECK */
    'pitso.err.date.past':     { en: 'That date has already passed.',     st: 'Letsatsi leo le se le fetile.' },     /* CHECK */
    'pitso.err.name.len':      { en: 'Between 2 and 80 characters.',      st: 'Pakeng tsa litlhaku tse 2 le tse 80.' }, /* CHECK */
    'pitso.err.bio.len':       { en: 'Keep it under 600 characters.',     st: 'E boloke e le tlaase ho litlhaku tse 600.' }, /* CHECK */
    'pitso.err.doc.kind':      { en: 'Say what the document is.',         st: 'Bolela hore na tokomane ke efe.' },   /* CHECK */
    'pitso.err.doc.file':      { en: 'Choose the file — a photo or a PDF.',
                                 st: 'Khetha faele — setšoantšo kapa PDF.' },                                 /* CHECK */
    'pitso.err.doc.big':       { en: 'That file is {size}MB and the limit is 10MB.',
                                 st: 'Faele eo ke {size}MB, moeli ke 10MB.' },                                 /* CHECK */
    'pitso.err.doc.type':      { en: 'It must be a JPEG, PNG, HEIC or PDF.',
                                 st: 'E tlameha ho ba JPEG, PNG, HEIC kapa PDF.' },                            /* CHECK */
    'pitso.err.doc.future':    { en: 'That date is still in the future.',
                                 st: 'Letsatsi leo le sa tla.' },                                              /* CHECK */
    'pitso.err.doc.order':     { en: 'It has to expire after it was issued.',
                                 st: 'E tlameha ho fela ka mor’a hore e fanoe.' },                             /* CHECK */
    'pitso.err.doc.gone':      { en: 'That date has passed, so it is already expired and cannot be verified. Find a current one.',
                                 st: 'Letsatsi leo le fetile, kahoo e se e felile ʼme e ke ke ea netefatsoa. Batla e ncha.' }, /* CHECK */
    'pitso.err.upload':        { en: 'It did not upload, and nothing was saved: {why}',
                                 st: 'Ha ea kena, ʼme ha ho letho le bolokiloeng: {why}' },                     /* CHECK */

    /* Settlement refusals. The RULE lives in MEND.canSettle and nowhere else;
       these only put its answer into Sesotho. If core changes its wording the
       match below misses and the English is shown — degraded, but never wrong. */
    'pitso.settle.err.amount':  { en: 'Put in how much was paid.',
                                  st: 'Ngola hore na ho lefiloe bokae.' },                                    /* CHECK */
    'pitso.settle.err.parties': { en: 'A payment can only be between the two people in this job.',
                                  st: 'Tefo e ka etsahala pakeng tsa batho ba babeli ba mosebetsi ona feela.' },/* CHECK */
    'pitso.settle.err.same':    { en: 'That is the same person on both sides.',
                                  st: 'Eo ke motho a le mong mahlakoreng ka bobeli.' },                       /* CHECK */
    'pitso.settle.err.toomuch': { en: 'That is more than twice what was agreed. Check the amount.',
                                  st: 'Seo se feta habeli ho se lumellanoeng. Hlahloba palo.' },              /* CHECK */
    'pitso.settle.err.nobody':  { en: 'Only the two people in this payment can confirm it.',
                                  st: 'Ke batho ba babeli ba tefo ena feela ba ka e netefatsang.' },          /* CHECK */

    /* ---- DISPUTE REFUSALS ------------------------------------------------ */
    /* MEND.canDispute is the ONLY place these rules live. As with settlement,
       this maps its English answer onto Sesotho and nothing more. A miss shows
       the English — degraded, never wrong. */
    'pitso.disp.err.signin':    { en: 'Sign in first.',            st: 'Kena pele.' },                        /* CHECK */
    'pitso.disp.err.nojob':     { en: 'There is no such job.',     st: 'Ha ho mosebetsi o joalo.' },           /* CHECK */
    'pitso.disp.err.notagreed': { en: 'This job has not been agreed yet, so there is nothing to disagree about.',
                                  st: 'Mosebetsi ona ha o so lumellanoe, kahoo ha ho seo ho ka phehisanoang ka sona.' }, /* CHECK */
    'pitso.disp.err.notparty':  { en: 'Only the two people in this job can raise something about it.',
                                  st: 'Ke batho ba babeli ba mosebetsi ona feela ba ka hlahisang ntho ka oona.' }, /* CHECK */
    'pitso.disp.err.self':      { en: 'That is you.',              st: 'Eo ke uena.' },                       /* CHECK */
    'pitso.disp.err.notinjob':  { en: 'That person was not part of this job.',
                                  st: 'Motho eo o ne a se karolo ea mosebetsi ona.' },                        /* CHECK */
    'pitso.disp.err.claim':     { en: 'Say what went wrong, in a sentence or two.',
                                  st: 'Bolela se fositsoeng, ka polelo e le ʼngoe kapa tse peli.' },          /* CHECK */
    'pitso.disp.err.stmt':      { en: 'Write a little more than that.',
                                  st: 'Ngola ho hong ho hongata ho feta moo.' },                              /* CHECK */
    'pitso.disp.err.nodispute': { en: 'There is no such record.',  st: 'Ha ho rekoto e joalo.' },              /* CHECK */
    'pitso.disp.err.notyours':  { en: 'Only the two people in this can accept what was agreed.',
                                  st: 'Ke batho ba babeli ba ntho ena feela ba ka amohelang se lumellanoeng.' }, /* CHECK */

    /* ---- DISPUTE: the screen -------------------------------------------- */
    /* The platform does not adjudicate. Nothing below may read as a verdict. */
    'pitso.disp.raise_head':   { en: 'Raise something about this job',
                                 st: 'Hlahisa ntho mabapi le mosebetsi ona' },                                /* CHECK */
    'pitso.disp.cannot':       { en: 'You cannot raise anything here: {why}',
                                 st: 'U ke ke ua hlahisa letho mona: {why}' },                                /* CHECK */
    'pitso.disp.about_person': { en: 'This is about {name}.',      st: 'Sena se mabapi le {name}.' },          /* CHECK */
    'pitso.disp.amount_hint':  { en: 'Only if money is in question. Leave it blank if it is not.',
                                 st: 'Feela haeba ho na le chelete e phehisanoang. E siee e se na letho haeba ho se joalo.' }, /* CHECK */
    'pitso.disp.send_claim':   { en: 'Put this on the record',     st: 'Kenya sena rekotong' },                /* CHECK */
    'pitso.disp.send_stmt':    { en: 'Add this to the record',     st: 'Eketsa sena rekotong' },               /* CHECK */
    'pitso.disp.raised_on':    { en: 'Raised {date} by {name}',    st: 'E hlahisitsoe ka {date} ke {name}' },  /* CHECK */
    'pitso.disp.amount_line':  { en: 'Money in question: {amount}',
                                 st: 'Chelete e phehisanoang: {amount}' },                                     /* CHECK */
    'pitso.disp.accounts':     { en: 'Both accounts',              st: 'Litlaleho tsa mahlakore ka bobeli' },  /* CHECK */
    'pitso.disp.side.raiser':  { en: 'raised it',                  st: 'ke ea e hlahisitseng' },               /* CHECK */
    'pitso.disp.side.other':   { en: 'it is about them',           st: 'ke eena eo e buang ka eena' },         /* CHECK */
    'pitso.disp.nothing_said': { en: 'Nothing has been written yet.',
                                 st: 'Ha ho letho le ngotsoeng hajoale.' },                                    /* CHECK */
    'pitso.disp.you':          { en: 'you',                        st: 'uena' },
    'pitso.disp.already_open': { en: 'Something is already open on this job. Add to it below rather than starting a second one.',
                                 st: 'Ho na le ntho e seng e buletsoe mosebetsing ona. E ekeletse ka tlase ho e-na le ho qala e ʼngoe.' }, /* CHECK */

    /* The outcome. Either of them writes what was agreed; each accepts only
       their own side; it closes when both have. */
    'pitso.disp.write_outcome':{ en: 'Write down what was agreed',  st: 'Ngola se lumellanoeng' },             /* CHECK */
    'pitso.disp.write_accept': { en: 'Write it down and accept it', st: 'E ngole ʼme u e amohele' },           /* CHECK */
    'pitso.disp.accept_asis':  { en: 'Accept it as it is written',  st: 'E amohele kamoo e ngotsoeng kateng' },/* CHECK */
    'pitso.disp.outcome_fixed':{ en: 'What is written above cannot be altered. If you do not agree with it, say so as your next account instead — this stays open until you accept it.',
                                 st: 'Se ngotsoeng kaholimo se ke ke sa fetoloa. Haeba u sa lumellane le sona, bolela joalo tlalehong ea hao e latelang — sena se lula se buletsoe ho fihlela u se amohela.' }, /* CHECK */
    'pitso.disp.outcome_none': { en: 'Nothing has been agreed yet. Either of you may write down what you agreed, and the other accepts it.',
                                 st: 'Ha ho seo ho seng ho lumellanoe ka sona. E mong le e mong oa lōna a ka ngola seo le lumellaneng ka sona, ʼme e mong a se amohele.' }, /* CHECK */

    /* Flashes. */
    'pitso.disp.flash.raised': { en: 'It is on the record, with your account of it. {name} can now write theirs.',
                                 st: 'E rekotong, hammoho le tlaleho ea hao. {name} a ka ngola ea hae hona joale.' }, /* CHECK */
    'pitso.disp.flash.stmt':   { en: 'Added to the record. It cannot be changed now.',
                                 st: 'E eketsoa rekotong. E ke ke ea fetoloa hona joale.' },                   /* CHECK */
    'pitso.disp.flash.mine':   { en: 'You have accepted it. It closes when {name} does too.',
                                 st: 'U e amohetse. E tla koala ha {name} le eena a e amohela.' },             /* CHECK */
    'pitso.disp.flash.closed': { en: 'Settled, by both of you. Nothing here can be changed now.',
                                 st: 'E rarollotsoe ke lōna ka bobeli. Ha ho letho mona le ka fetoloang hona joale.' }, /* CHECK */

    /* On a provider profile: COUNTS ONLY. An accusation is not a finding, and
       the claim itself must never be rendered here. */
    'pitso.disp.standing':     { en: 'Disagreements',              st: 'Liphehisano' },                        /* CHECK */
    'pitso.disp.open_n':       { en: 'open',                       st: 'tse buletsoeng' },                     /* CHECK */
    'pitso.disp.settled_n':    { en: 'settled',                    st: 'tse rarollotsoeng' },                  /* CHECK */
    'pitso.disp.none_ever':    { en: 'Nothing has ever been raised about this person.',
                                 st: 'Ha ho letho le kileng la hlahisoa ka motho enoa.' },                     /* CHECK */
    'pitso.disp.recent':       { en: '{n} of the open ones were raised in the last six months.',
                                 st: '{n} ho tse buletsoeng li hlahisitsoe likhoeling tse tšeletseng tse fetileng.' }, /* CHECK */

    /* ---- SETTLEMENT — recording that money moved, never moving it -------- */
    'pitso.settle.heading':    { en: 'Payment',                 st: 'Tefo' },
    'pitso.settle.record':     { en: 'Record a payment that was made',
                                 st: 'Ngola tefo e seng e entsoe' },                                          /* CHECK */
    'pitso.settle.none':       { en: 'No payment has been recorded on this job yet.',
                                 st: 'Ha ho tefo e ngoliloeng mosebetsing ona.' },                            /* CHECK */
    'pitso.settle.nopay':      { en: 'Nothing is paid here. Pitso writes down a payment the two of you already made somewhere else — on the phone, in the bank, or in your hands.',
                                 st: 'Ha ho chelete e lefshoang mona. Pitso e ngola tefo eo le seng le e entse kae kae — mohaleng, bankeng, kapa ka matsoho.' }, /* CHECK */
    'pitso.settle.who':        { en: 'Who paid whom',           st: 'Ke mang ea lefileng mang' },             /* CHECK */
    'pitso.settle.paidto':     { en: '{payer} paid {payee}',    st: '{payer} o lefile {payee}' },             /* CHECK */
    'pitso.settle.method':     { en: 'How it was paid',         st: 'Tefo e entsoe joang' },                  /* CHECK */
    'pitso.settle.amount':     { en: 'How much, in maloti',     st: 'Bokae, ka maloti' },                     /* CHECK */
    'pitso.settle.date':       { en: 'Day it was paid',         st: 'Letsatsi la tefo' },                     /* CHECK */
    'pitso.settle.ref':        { en: 'Transaction code',        st: 'Khoutu ea tefo' },                       /* CHECK */
    'pitso.settle.ref.need':   { en: 'Required. It is the code in the message that came to your phone.',
                                 st: 'Ea hlokahala. Ke khoutu e molaetseng o tlileng fonong ea hao.' },        /* CHECK */
    'pitso.settle.save':       { en: 'Write the payment down',  st: 'Ngola tefo' },                           /* CHECK */
    'pitso.settle.state.new':  { en: 'Recorded. Neither of you has confirmed it yet.',
                                 st: 'E ngoliloe. Ha ho le a mong oa lōna ea e netefalitseng.' },             /* CHECK */
    'pitso.settle.confirm':    { en: 'Confirm my side of this',  st: 'Netefatsa lehlakore la ka' },           /* CHECK */
    'pitso.settle.mine.done':  { en: 'You have confirmed this. {name} has not.',
                                 st: 'U netefalitse sena. {name} ha a so netefatse.' },                        /* CHECK */
    'pitso.settle.theirs.done':{ en: '{name} has confirmed this. You have not.',
                                 st: '{name} o netefalitse sena. Uena ha u so netefatse.' },                   /* CHECK */
    'pitso.settle.onlyown':    { en: 'Each of you confirms only your own side. That is what makes the record worth anything.',
                                 st: 'E mong le e mong o netefatsa lehlakore la hae feela. Ke sona se etsang hore rekoto e be le thuso.' }, /* CHECK */
    'pitso.settle.total':      { en: 'Confirmed by both sides so far: {total} of {agreed}.',
                                 st: 'E netefalitsoeng ke mahlakore ka bobeli ho fihlela joale: {total} ho {agreed}.' }, /* CHECK */
    'pitso.settle.written':    { en: 'Written down. It is not settled until you have both confirmed it.',
                                 st: 'E ngoliloe. Ha e so lefshoe ka botlalo ho fihlela le e netefalitse ka bobeli.' }, /* CHECK */
    'pitso.settle.confirmed':  { en: 'Your side is confirmed.', st: 'Lehlakore la hao le netefalitsoe.' },    /* CHECK */
    'pitso.settle.toosoon':    { en: 'A payment can be recorded once the work is running or finished. This job is {state}.',
                                 st: 'Tefo e ka ngoloa ha mosebetsi o se o tsamaea kapa o phethiloe. Mosebetsi ona o {state}.' }, /* CHECK */
    'pitso.settle.marked':     { en: 'Recorded that you consider this settled. Pitso does not move the money — it records that you both say it moved.',
                                 st: 'Ho ngoliloe hore uena u nka sena se lefiloe. Pitso ha e tsamaise chelete — e ngola hore ka bobeli le re e tsamaile.' }, /* CHECK */
    'pitso.settle.bothsaid':   { en: 'Both parties confirmed payment of {amount}.',
                                 st: 'Mahlakore ka bobeli a netefalitse tefo ea {amount}.' },                  /* CHECK */
    'pitso.settle.waitother':  { en: 'You marked this settled. Waiting for {name} to confirm.',
                                 st: 'U tšoaile sena se lefiloe. Ho emetsoe {name} hore a netefatse.' },       /* CHECK */
    'pitso.settle.oncepaid.p': { en: 'Once {name} has paid you, mark it settled here. Pitso records the agreement — the money moves between the two of you.',
                                 st: 'Ha {name} a se a u lefile, se tšoae se lefiloe mona. Pitso e ngola tumellano — chelete e tsamaea pakeng tsa lōna ka bobeli.' }, /* CHECK */
    'pitso.settle.oncepaid.c': { en: 'Once you have paid {name}, mark it settled here. Pitso records the agreement — the money moves between the two of you.',
                                 st: 'Ha u se u lefile {name}, se tšoae se lefiloe mona. Pitso e ngola tumellano — chelete e tsamaea pakeng tsa lōna ka bobeli.' }, /* CHECK */

    'pitso.method.mpesa':      { en: 'M-Pesa',                  st: 'M-Pesa' },
    'pitso.method.ecocash':    { en: 'EcoCash',                 st: 'EcoCash' },
    'pitso.method.cash':       { en: 'Cash',                    st: 'Chelete e matsohong' },                  /* CHECK */
    'pitso.method.bank_transfer': { en: 'Bank transfer',        st: 'Ho romela ka banka' },                   /* CHECK */
    'pitso.method.other':      { en: 'Something else',          st: 'Ho hong' },                              /* CHECK */

    /* ---- STATES, said as words rather than as column values -------------- */
    /* These were printed straight out of the database — 'agreed', 'engaged',
       'offered' — which is the schema talking, not the app. */
    'pitso.st.proposed':       { en: 'proposed',                st: 'e sisintsoe' },                          /* CHECK */
    'pitso.st.agreed':         { en: 'agreed',                  st: 'ho lumellanoe' },                        /* CHECK */
    'pitso.st.active':         { en: 'running',                 st: 'ea tsamaea' },                           /* CHECK */
    'pitso.st.completed':      { en: 'finished',                st: 'e phethiloe' },                          /* CHECK */
    'pitso.st.cancelled':      { en: 'cancelled',               st: 'e hlakotsoe' },                          /* CHECK */
    'pitso.st.disputed':       { en: 'in dispute',              st: 'ho phehisanoa ka eona' },                /* CHECK */
    'pitso.st.open':           { en: 'open',                    st: 'e buletsoe' },                           /* CHECK */
    'pitso.st.engaged':        { en: 'taken',                   st: 'e nkiloe' },                             /* CHECK */
    'pitso.st.offered':        { en: 'offered',                 st: 'ho fanoe ka theko' },                    /* CHECK */
    'pitso.st.accepted':       { en: 'accepted',                st: 'e amohetsoe' },                          /* CHECK */
    'pitso.st.declined':       { en: 'not taken',               st: 'ha ea nkuoa' },                          /* CHECK */
    'pitso.st.withdrawn':      { en: 'withdrawn',               st: 'e huletsoe morao' },                     /* CHECK */

    /* ---- SHARE AND PRINT ------------------------------------------------- */
    'pitso.share.copied':      { en: 'Copied. Paste it into the WhatsApp group.',
                                 st: 'E kopitsitsoe. E kenye sehlopheng sa WhatsApp.' },                       /* CHECK */
    'pitso.share.manual':      { en: 'Your phone would not copy it. Hold on the text, copy it, and paste it where you want it.',
                                 st: 'Fono ea hao ha ea ka ea e kopitsa. Tšoara mongolo, o kopitse, ebe u o kenya moo u o batlang teng.' }, /* CHECK */
    'pitso.share.shared':      { en: 'Sent to the app you chose.',
                                 st: 'E rometsoe app eo u e khethileng.' },                                    /* CHECK */
    'pitso.share.whatsapp':    { en: 'Open WhatsApp with this',  st: 'Bula WhatsApp ka sena' },                /* CHECK */
    'pitso.share.notice':      { en: 'A notice to paste into a group',
                                 st: 'Tsebiso eo u ka e kenyang sehlopheng' },                                 /* CHECK */

    /* ---- HEADINGS, LABELS, BUTTONS, EMPTY STATES ------------------------- */
    'pitso.tab.mine':          { en: 'My work',                 st: 'Mosebetsi oa ka' },                      /* CHECK */
    'pitso.tab.docs':          { en: 'My documents',            st: 'Litokomane tsa ka' },                    /* CHECK */
    'pitso.onlyavailable':     { en: 'Only people taking work right now',
                                 st: 'Batho ba nkang mosebetsi hona joale feela' },                            /* CHECK */
    'pitso.onboard':           { en: '{n} on the board',        st: '{n} boteng' },                           /* CHECK */
    'pitso.empty.board':       { en: 'Nobody on the board matches that yet. Widen the filter, or post the job and let people come to you.',
                                 st: 'Ha ho motho ea lumellanang le seo. Fokotsa lisefo, kapa u ngole mosebetsi ʼme batho ba tle ho uena.' }, /* CHECK */
    'pitso.empty.requests':    { en: 'Nothing on the board right now.',
                                 st: 'Ha ho letho boteng hajoale.' },                                          /* CHECK */
    'pitso.sendoffer':         { en: 'Send the offer',          st: 'Romela theko' },                          /* CHECK */
    'pitso.accept':            { en: 'Accept this offer',       st: 'Amohela theko ena' },                     /* CHECK */
    'pitso.complete':          { en: 'Mark the work complete',  st: 'Tšoaea mosebetsi o phethiloe' },          /* CHECK */
    'pitso.nooffers':          { en: 'No offers yet',           st: 'Ha ho litheko' },                         /* CHECK */
    'pitso.postedby':          { en: 'Posted by',               st: 'E ngotsoe ke' },                          /* CHECK */
    'pitso.neededby':          { en: 'Needed by',               st: 'E hlokahala ka' },                        /* CHECK */
    'pitso.budget':            { en: 'Budget',                  st: 'Chelete e beheloeng' },                   /* CHECK */
    'pitso.agreed':            { en: 'Agreed',                  st: 'Ho lumellanoe ka' },                      /* CHECK */
    'pitso.years':             { en: 'years',                   st: 'lilemo' },
    'pitso.notakingwork':      { en: 'not taking work now',     st: 'ha a nke mosebetsi hajoale' },            /* CHECK */
    'pitso.openbudget':        { en: 'open',                    st: 'ha e beoa' },                             /* CHECK */

    /* ---- VIEW 1 · FIND SOMEONE ------------------------------------------ */
    'pitso.find.intro':        { en: 'Everyone here is a named person with a standing that was earned in front of other people. What they charge is the last thing on the notice, and that is on purpose.',
                                 st: 'Motho e mong le e mong mona o na le lebitso, le botumo boo a bo fumaneng ponong ea batho ba bang. Theko ea hae ke ntho ea ho qetela tsebisong, ʼme re e behile teng ka boomo.' }, /* CHECK */
    'pitso.rate.hourly':       { en: '{amount} an hour',        st: '{amount} ka hora' },                      /* CHECK */
    'pitso.rate.daily':        { en: '{amount} a day',          st: '{amount} ka letsatsi' },                  /* CHECK */
    'pitso.rate.perjob':       { en: 'Priced per job',          st: 'Theko ka mosebetsi' },                    /* CHECK */
    'pitso.rate.quote':        { en: 'By quote',                st: 'Ka theko e fanoang' },                    /* CHECK */
    'pitso.nreviews':          { en: '{n} reviews',             st: 'litlhahlobo tse {n}' },                   /* CHECK */
    'pitso.onereview':         { en: '1 review',                st: 'tlhahlobo e le ʼngoe' },                  /* CHECK */
    'pitso.njobs':             { en: '{n} jobs completed',      st: 'mesebetsi e {n} e phethiloeng' },         /* CHECK */
    'pitso.onejob':            { en: '1 job completed',         st: 'mosebetsi o le mong o phethiloeng' },     /* CHECK */
    'pitso.ndocs':             { en: '{n} verified documents',  st: 'litokomane tse {n} tse netefalitsoeng' }, /* CHECK */
    'pitso.onedoc':            { en: '1 verified document',     st: 'tokomane e le ʼngoe e netefalitsoeng' },  /* CHECK */
    'pitso.nexpired':          { en: '{n} expired',             st: 'tse {n} tse felileng' },                  /* CHECK */

    /* ---- VIEW 2 · A PERSON'S PAGE --------------------------------------- */
    'pitso.prof.nosuch':       { en: 'No such person.',         st: 'Ha ho motho e a joalo.' },                /* CHECK */
    'pitso.prof.back':         { en: '← Back to the board',     st: '← Khutlela boteng' },                     /* CHECK */
    'pitso.prof.notaking':     { en: 'not taking work at the moment',
                                 st: 'ha a nke mosebetsi hajoale' },                                           /* CHECK */
    'pitso.prof.carried':      { en: 'Earned on any of the three platforms, carried to all of them.',
                                 st: 'Bo fumanoe ho e ʼngoe ea lithala tse tharo, ʼme bo tsamaea le eena ho tsona tsohle.' }, /* CHECK */
    'pitso.prof.jobs_here':    { en: 'jobs on Pitso',           st: 'mesebetsi ho Pitso' },                    /* CHECK */
    /* Restructured from '<n> jobs on <a>Mafisa</a>' — a fragment either side of
       a link cannot be translated, because the word order moves. */
    'pitso.prof.jobs_on':      { en: 'jobs on {platform}',      st: 'mesebetsi ho {platform}' },               /* CHECK */
    'pitso.prof.avg_of':       { en: 'average of {n}',          st: 'karolelano ea {n}' },                     /* CHECK */
    'pitso.prof.cross':        { en: 'Mafisa is where equipment is lent between neighbours; Matsema is where people buy and sell together. Same person, same documents, same reviews — follow either link and you land on the platform the number was earned on.',
                                 st: 'Mafisa ke moo baahisani ba alimanang lisebelisoa; Matsema ke moo batho ba rekang le ho rekisa hammoho. Motho a le mong, litokomane tse tšoanang, litlhahlobo tse tšoanang — tobetsa sehokelo ʼme u fihla thaleng eo palo eo e fumanoeng ho eona.' }, /* CHECK */
    'pitso.prof.checked':      { en: 'What has been checked',   st: 'Se hlahlobiloeng' },                      /* CHECK */
    'pitso.prof.verdict_only': { en: 'The verdict is public. The documents themselves are private and are never shown to anyone but the person who submitted them.',
                                 st: 'Qeto ea tlhahlobo ea bonoa ke bohle. Litokomane ka botsona ke tsa lekunutu, ha li bontšoe motho e mong ntle le ea li rometseng.' }, /* CHECK */
    'pitso.prof.nothing_sent': { en: 'Nothing submitted for checking yet.',
                                 st: 'Ha ho letho le rometsoeng ho hlahlojoa.' },                              /* CHECK */
    'pitso.prof.said':         { en: 'What people said',        st: 'Seo batho ba se buileng' },               /* CHECK */
    'pitso.prof.noreviews':    { en: 'No reviews yet. A review here can only come from a job both sides marked completed.',
                                 st: 'Ha ho litlhahlobo hajoale. Tlhahlobo mona e tsoa feela mosebetsing oo mahlakore ka bobeli a o tšoaileng o phethiloe.' }, /* CHECK */
    'pitso.prof.hire':         { en: 'Post a job for a {trade}',  st: 'Ngola mosebetsi oa {trade}' },           /* CHECK */
    'pitso.prof.noqueue':      { en: 'Requests go on the open board, where anyone can see them. Pitso does not put you in a private queue behind one person.',
                                 st: 'Likopo li ea ho bohle ba mosebetsi oo. Pitso ha e u kenye moleng oa lekunutu ka mor’a motho a le mong.' }, /* CHECK */

    /* Document verdicts as they read on someone else's page. */
    'pitso.dv.verified':       { en: '{doc} verified',          st: '{doc} e netefalitsoe' },                  /* CHECK */
    'pitso.dv.expired':        { en: '{doc} expired · lapsed {date}, not counted',
                                 st: '{doc} e felile · e felile ka {date}, ha e baloe' },                      /* CHECK */
    'pitso.dv.rejected':       { en: '{doc} was not accepted',  st: '{doc} ha ea amoheloa' },                  /* CHECK */
    'pitso.dv.waiting':        { en: '{doc} submitted, not yet checked',
                                 st: '{doc} e rometsoe, ha e so hlahlojoe' },                                  /* CHECK */
    'pitso.dv.validto':        { en: 'valid to {date}',         st: 'e sebetsa ho fihlela {date}' },           /* CHECK */
    'pitso.dv.issued':         { en: 'issued {date}',           st: 'e fanoe ka {date}' },                     /* CHECK */

    /* ---- VIEW 3 · POST A REQUEST ---------------------------------------- */
    'pitso.post.intro':        { en: 'Say what needs doing. It goes on the open board where anyone can see it and offer \u2014 the trade and district you choose are how people find it, not a fence around it. You choose who does the work, and you are never charged to be introduced.',
                                 st: 'Bolela se hlokang ho etsoa. Se kena letlapeng le bulehileng moo mang kapa mang a ka se bonang ʼme a fana ka theko. Uena u khetha ea sebetsang, ʼme ha ho moo u lefang ho tsebisoa.' }, /* CHECK */
    'pitso.post.pick_trade':   { en: 'Choose a trade…',         st: 'Khetha mosebetsi…' },                     /* CHECK */
    'pitso.post.pick_dist':    { en: 'Choose a district…',      st: 'Khetha setereke…' },                      /* CHECK */
    'pitso.post.trade':        { en: 'Trade needed',            st: 'Mosebetsi o hlokahalang' },               /* CHECK */
    'pitso.post.title':        { en: 'What needs doing',        st: 'Se hlokang ho etsoa' },                   /* CHECK */
    'pitso.post.title_hint':   { en: 'A short line, 4 to 120 characters. This is the headline on the board.',
                                 st: 'Mola o mokhutšoanyane, litlhaku tse 4 ho isa ho tse 120. Ke sehlooho boteng.' }, /* CHECK */
    'pitso.post.title_ph':     { en: 'Geyser leaking into the ceiling',
                                 st: 'Geyser e dutlela siling' },                                              /* CHECK */
    'pitso.post.detail':       { en: 'The detail',              st: 'Tlhaloso e felletseng' },                 /* CHECK */
    'pitso.post.detail_ph':    { en: 'Where it is, what you have already tried, when someone can get in.',
                                 st: 'Hore na e hokae, seo u se lekileng, le hore na motho a ka kena neng.' },  /* CHECK */
    'pitso.post.budget':       { en: 'Budget in maloti',        st: 'Chelete e beheloeng, ka maloti' },        /* CHECK */
    'pitso.post.budget_hint':  { en: 'Optional. Leave it blank to be quoted.',
                                 st: 'Ha e tlamehe. E siee e se na letho hore u fuoe theko.' },                 /* CHECK */
    'pitso.post.note':         { en: 'Pitso records what you agree. Money moves between the two of you, the way it does now — the platform never holds it.',
                                 st: 'Pitso e ngola seo le lumellanang ka sona. Chelete e tsamaea pakeng tsa lōna ka bobeli, joalo ka hajoale — thala ha e e tšoare le ka mohla.' }, /* CHECK */
    'pitso.post.go':           { en: 'Put it on the board',     st: 'E behe boteng' },                         /* CHECK */
    'pitso.post.done':         { en: 'Posted. It is on the board now, and every {trade} working in {district} can see it.',
                                 st: 'E ngotsoe. E boteng hona joale, ʼme {trade} e mong le e mong ea sebetsang {district} oa e bona.' }, /* CHECK */

    /* ---- VIEW 4 · THE BOARD --------------------------------------------- */
    'pitso.req.intro':         { en: 'Work that people in Lesotho are asking for. Anyone may make an offer — one each, and the person who posted it decides. What each of them has had verified is on their profile, so you can see it before you choose.',
                                 st: 'Mesebetsi eo batho Lesotho ba e batlang. Mang kapa mang a ka fana ka theko — e le ʼngoe ka motho, ʼme ea e ngotseng ke eena ea khethang. Seo e mong le e mong a se netefalitseng se bonahala boitsebisong ba hae.' }, /* CHECK */
    'pitso.req.postedby':      { en: 'Posted by {name} · {date}', st: 'E ngotsoe ke {name} · {date}' },        /* CHECK */
    'pitso.req.taken':         { en: 'Taken — an offer on this job was accepted.',
                                 st: 'E nkiloe — theko mosebetsing ona e amohetsoe.' },                        /* CHECK */
    'pitso.req.noffers':       { en: '{n} offers so far',       st: 'litheko tse {n} ho fihlela joale' },      /* CHECK */
    'pitso.req.oneoffer':      { en: '1 offer so far',          st: 'theko e le ʼngoe ho fihlela joale' },     /* CHECK */
    'pitso.req.youroffer':     { en: 'Your offer:',             st: 'Theko ea hao:' },                         /* CHECK */
    'pitso.req.willquote':     { en: 'to be quoted after seeing the job',
                                 st: 'theko e tla fanoa ha mosebetsi o se o boniloe' },                        /* CHECK */
    'pitso.req.willquote_b':   { en: 'Will quote after seeing the job',
                                 st: 'O tla fana ka theko ha a se a bone mosebetsi' },                          /* CHECK */
    'pitso.req.yourprice':     { en: 'Your price in maloti',    st: 'Theko ea hao ka maloti' },                /* CHECK */
    'pitso.req.price_hint':    { en: 'Leave it blank if you must see the job first.',
                                 st: 'E siee e se na letho haeba u lokela ho bona mosebetsi pele.' },          /* CHECK */
    'pitso.req.whatoffer':     { en: 'What you are offering',   st: 'Seo u fanang ka sona' },                  /* CHECK */
    'pitso.req.whatoffer_ph':  { en: 'When you can start, what the price covers, what it does not.',
                                 st: 'Hore na u ka qala neng, theko e kenyelletsa eng, le seo e sa se kenyelletseng.' }, /* CHECK */
    'pitso.req.offersent':     { en: 'Offer sent to {name}. You will see it under My work.',
                                 st: 'Theko e rometsoe ho {name}. U tla e bona tlas’a Mosebetsi oa ka.' },     /* CHECK */
    'pitso.req.accepted':      { en: '{name} has the job, and it is now under My work for both of you.',
                                 st: '{name} o na le mosebetsi, ʼme o tlas’a Mosebetsi oa ka ho lōna ka bobeli.' }, /* CHECK */

    /* ---- VIEW 5 · MY WORK ----------------------------------------------- */
    'pitso.mine.intro':        { en: 'Everything you have asked for, everything you have offered, and every job that is running or done — across all three platforms, because it is one standing.',
                                 st: 'Tsohle tseo u li kopileng, tsohle tseo u faneng ka theko ho tsona, le mosebetsi o mong le o mong o tsamaeang kapa o phethiloeng — lithaleng tsohle tse tharo, hobane botumo ke bo bong feela.' }, /* CHECK */
    'pitso.mine.posted':       { en: 'Jobs I posted',           st: 'Mesebetsi eo ke e ngotseng' },            /* CHECK */
    'pitso.mine.noposted':     { en: 'Nothing posted yet.',     st: 'Ha ho letho le ngotsoeng hajoale.' },     /* CHECK */
    'pitso.mine.putone':       { en: 'Put something on the board.', st: 'Behang ho hong boteng.' },            /* CHECK */
    'pitso.mine.offers':       { en: 'Offers I made',           st: 'Litheko tseo ke faneng ka tsona' },       /* CHECK */
    'pitso.mine.nooffers':     { en: 'No offers made yet.',     st: 'Ha ho litheko tseo u faneng ka tsona.' }, /* CHECK */
    'pitso.mine.jobs':         { en: 'Jobs running and finished', st: 'Mesebetsi e tsamaeang le e phethiloeng' }, /* CHECK */
    'pitso.mine.nojobs':       { en: 'Nothing yet.',            st: 'Ha ho letho hajoale.' },
    'pitso.mine.workfor':      { en: 'Work for {name}',         st: 'Mosebetsi oa {name}' },                   /* CHECK */
    'pitso.mine.workby':       { en: 'Work by {name}',          st: 'Mosebetsi o etsoang ke {name}' },         /* CHECK */
    'pitso.mine.nofigure':     { en: 'no figure recorded',      st: 'ha ho palo e ngotsoeng' },                /* CHECK */
    'pitso.mine.started':      { en: 'Started {date}',          st: 'E qalile ka {date}' },                    /* CHECK */
    'pitso.mine.ended':        { en: 'Ended {date}',            st: 'E felile ka {date}' },                    /* CHECK */
    'pitso.mine.forwhom':      { en: 'For {name}',              st: 'Bakeng sa {name}' },                      /* CHECK */
    'pitso.mine.ajob':         { en: 'a job',                   st: 'mosebetsi' },
    'pitso.mine.toquote':      { en: 'To be quoted',            st: 'Theko e tla fanoa' },                     /* CHECK */
    'pitso.mine.reviewbtn':    { en: 'Say what this person was like',
                                 st: 'Bolela hore na motho enoa o bile joang' },                                /* CHECK */
    'pitso.mine.reviewno':     { en: 'Review: {why}.',          st: 'Tlhahlobo: {why}.' },                     /* CHECK */
    'pitso.mine.reviewing':    { en: 'Reviewing {name}',        st: 'Ho hlahlojoa {name}' },                   /* CHECK */
    'pitso.mine.rev_final':    { en: 'This is permanent, it carries your name, and it follows this person to Mafisa and Matsema too.',
                                 st: 'Sena se lula se le teng, se tšoere lebitso la hao, ʼme se latela motho enoa le ho Mafisa le Matsema.' }, /* CHECK */
    'pitso.mine.outof5':       { en: 'Out of five',             st: 'Ho tse hlano' },                          /* CHECK */
    'pitso.mine.whathappened': { en: 'What happened',           st: 'Se etsahetseng' },                        /* CHECK */
    'pitso.mine.rev_ph':       { en: 'What they did, whether the price held, whether they turned up.',
                                 st: 'Seo ba se entseng, hore na theko e ile ea lula joalo, le hore na ba ile ba fihla.' }, /* CHECK */
    'pitso.mine.leaverev':     { en: 'Leave the review',        st: 'Siea tlhahlobo' },                        /* CHECK */
    'pitso.mine.revdone':      { en: 'Review left on {name}. It is part of their standing everywhere now.',
                                 st: 'Tlhahlobo e siiloe ho {name}. Ke karolo ea botumo ba hae hohle hona joale.' }, /* CHECK */
    'pitso.mine.marksettled':  { en: 'Mark as settled',         st: 'Tšoaea e lefiloe' },                      /* CHECK */
    'pitso.mine.completed':    { en: 'Marked complete. A review can be left on it now, by either side.',
                                 st: 'E tšoailoe e phethiloe. Tlhahlobo e ka siuoa ho eona hona joale, ke lehlakore lefe kapa lefe.' }, /* CHECK */
    'pitso.mine.rating_aria':  { en: '{n} out of 5',            st: '{n} ho tse 5' },                          /* CHECK */

    /* The record (the ledger). */
    'pitso.rec.head':          { en: 'The record',              st: 'Rekoto' },                                /* CHECK */
    'pitso.rec.explain':       { en: 'Every action above is written into a book that can only be added to. Each entry carries a mark taken from the one before it, so nothing can be quietly changed afterwards.',
                                 st: 'Ketso e ʼngoe le e ʼngoe e kaholimo e ngoloa bukeng eo ho eona ho kenngoang feela. Tlaleho e ʼngoe le e ʼngoe e tšoere letšoao le nkiloeng ho e tlileng pele ho eona, kahoo ha ho letho le ka fetoloang ka sephiri hamorao.' }, /* CHECK */
    'pitso.rec.deviceonly':    { en: 'In this build the chain is kept in this browser only: entries are not pushed to the server, and reconnecting replaces them with whatever the server holds. The mechanism is real; the server-side copy of it is not wired up yet.',
                                 st: 'Hajoale ketane ena e bolokoa sebatling sena feela: litlaleho ha li romeloe sevaeng, ʼme ha khokahano e khutla li nkeloa sebaka ke tseo seva se nang le tsona. Mokhoa o teng ka ʼnete; karolo ea seva ha e so hokeloe.' }, /* CHECK */
    'pitso.rec.nentries':      { en: '{n} entries so far.',     st: 'Litlaleho tse {n} ho fihlela joale.' },   /* CHECK */
    'pitso.rec.oneentry':      { en: '1 entry so far.',         st: 'Tlaleho e le ʼngoe ho fihlela joale.' },  /* CHECK */
    'pitso.rec.check':         { en: 'Check the chain',         st: 'Hlahloba ketane' },                       /* CHECK */
    'pitso.rec.intact':        { en: 'Chain intact — {n} entries.',
                                 st: 'Ketane e phetse hantle — litlaleho tse {n}.' },                          /* CHECK */
    'pitso.rec.broken':        { en: 'Broken at entry {n}.',    st: 'E robehile tlalehong ea {n}.' },          /* CHECK */

    /* ---- VIEW 6 · MY DOCUMENTS ------------------------------------------ */
    'pitso.docs.intro':        { en: 'What you can prove about yourself, kept in one place and used by all three platforms. Other people see only the verdict — verified, waiting, not accepted. The document itself stays private: it is held in a locked store, and only you and the person checking it can ever open it.',
                                 st: 'Seo u ka se pakang ka uena, se bolokiloe sebakeng se le seng ʼme se sebelisoa ke lithala tsohle tse tharo. Batho ba bang ba bona qeto feela — e netefalitsoe, e emetse, ha ea amoheloa. Tokomane ka boeona ke ea lekunutu: e bolokiloe sebakeng se notletsoeng, ʼme ke uena le motho ea e hlahlobang feela le ka e bulang.' }, /* CHECK */
    'pitso.docs.signin':       { en: 'Sign in at the top of this page first. A document belongs to a person, so there is nothing here until Pitso knows who you are.',
                                 st: 'Kena ka holimo ho leqephe lena pele. Tokomane ke ea motho, kahoo ha ho letho mona ho fihlela Pitso e tseba hore na u mang.' }, /* CHECK */
    'pitso.docs.noserver':     { en: 'No server is connected, so no file leaves this browser. You can walk the steps through and read what each one says, but nothing is stored anywhere and nobody is asked to check anything.',
                                 st: 'Ha ho seva se hokahantsoeng, kahoo ha ho faele e tsoang sebatling sena. U ka tsamaea mehato ʼme ua bala seo e mong le e mong o se buang, empa ha ho letho le bolokoang ʼme ha ho motho ea kōptjoang ho hlahloba letho.' }, /* CHECK */
    'pitso.docs.empty':        { en: 'Nothing here yet. What you send in is what turns an empty profile into one a stranger will hire from.',
                                 st: 'Ha ho letho mona hajoale. Seo u se romelang ke sona se fetolang leqephe le se nang letho hore e be leo motho eo u sa mo tsebeng a ka hirang ho lona.' }, /* CHECK */
    'pitso.docs.sendhead':     { en: 'Send something in',       st: 'Romela ho hong' },                        /* CHECK */
    'pitso.docs.twosteps':     { en: 'It arrives as a draft. You check it, then you send it for checking — two steps on purpose.',
                                 st: 'E fihla e le ea pele. Ua e hlahloba, ebe ua e romela ho hlahlojoa — mehato e ʼmeli ka boomo.' }, /* CHECK */
    'pitso.docs.notsent':      { en: 'Draft · nobody has been asked to look at it yet',
                                 st: 'Ea pele · ha ho motho ea kōptjoang ho e sheba hajoale' },                 /* CHECK */
    'pitso.docs.waitsince':    { en: 'Waiting since {date} · {n} days on the desk',
                                 st: 'E emetse ho tloha ka {date} · matsatsi a {n} tafoleng' },                 /* CHECK */
    'pitso.docs.waitsince1':   { en: 'Waiting since {date} · 1 day on the desk',
                                 st: 'E emetse ho tloha ka {date} · letsatsi le le leng tafoleng' },            /* CHECK */
    'pitso.docs.waittoday':    { en: 'Waiting since {date} · sent today',
                                 st: 'E emetse ho tloha ka {date} · e rometsoe kajeno' },                       /* CHECK */
    'pitso.docs.waitnodate':   { en: 'Waiting to be checked · the date it was sent was not recorded',
                                 st: 'E emetse ho hlahlojoa · letsatsi la ho romeloa ha lea ngoloa' },          /* CHECK */
    'pitso.docs.verifiedon':   { en: 'Verified · {date}',       st: 'E netefalitsoe · {date}' },               /* CHECK */
    'pitso.docs.rejectedon':   { en: 'Not accepted · {date}',   st: 'Ha ea amoheloa · {date}' },               /* CHECK */
    'pitso.docs.expiredon':    { en: 'Expired · it lapsed on {date} and stopped counting that day',
                                 st: 'E felile · e felile ka {date} ʼme ea khaotsa ho baloa letsatsing leo' },  /* CHECK */
    'pitso.docs.unsaved':      { en: 'Not saved · this exists in this browser and nowhere else',
                                 st: 'Ha ea bolokoa · e teng sebatling sena feela, ha ho kae kapa kae' },       /* CHECK */
    'pitso.docs.unsaved_why':  { en: 'The file itself may have reached the store, but the record of it did not, so nobody can find it and no reviewer will ever see it. Upload it again once the fault at the top of this page is gone.',
                                 st: 'Faele ka boeona e ka ’na eaba e fihlile polokelong, empa tlaleho ea eona ha ea fihla, kahoo ha ho motho ea ka e fumanang ʼme ha ho mohlahlobi ea tla e bona. E kenye hape ha phoso e ka holimo ho leqephe lena e se e felile.' }, /* CHECK */
    'pitso.docs.reason_given': { en: 'The reason given:',       st: 'Lebaka le fanoeng:' },                    /* CHECK */
    'pitso.docs.noreason':     { en: 'none was recorded. That should not happen — ask the desk what to fix before sending it again.',
                                 st: 'ha ho le leng le ngotsoeng. Seo se ne se sa lokela ho etsahala — botsa mohlahlobi hore na u lokise eng pele u e romela hape.' }, /* CHECK */
    'pitso.docs.expired_why':  { en: 'Send a current one. Until you do this counts for nothing on Pitso, Mafisa or Matsema, whatever the older record says.',
                                 st: 'Romela e ncha. Ho fihlela u etsa joalo, ena ha e baloe ho Pitso, Mafisa kapa Matsema, ho sa tsotellehe seo rekoto ea khale e se buang.' }, /* CHECK */
    'pitso.docs.issuedby':     { en: 'Issued by {who}',         st: 'E fanoe ke {who}' },                      /* CHECK */
    'pitso.docs.issuedon':     { en: 'issued {date}',           st: 'e fanoe ka {date}' },                     /* CHECK */
    'pitso.docs.expireson':    { en: 'expires {date}',          st: 'e fela ka {date}' },                      /* CHECK */
    'pitso.docs.sendwarn':     { en: 'This puts it on a reviewer’s desk at MEND GROUP. Open it first and check it is the right page and that it can actually be read.',
                                 st: 'Sena se e beha tafoleng ea mohlahlobi ho MEND GROUP. E bule pele ʼme u hlahlobe hore ke leqephe le nepahetseng le hore e ka baloa.' }, /* CHECK */
    'pitso.docs.sendyes':      { en: 'Yes, send it for checking',
                                 st: 'E, e romele ho hlahlojoa' },                                              /* CHECK */
    'pitso.docs.notyet':       { en: 'Not yet',                 st: 'Eseng hajoale' },                         /* CHECK */
    'pitso.docs.notsubmit':    { en: 'Uploading is not submitting. It stays here, seen by nobody, until you send it — so a half-finished upload never lands on somebody’s desk.',
                                 st: 'Ho kenya tokomane hase ho e romela. E lula mona, ho se motho ea e bonang, ho fihlela u e romela — hore tokomane e sa phethoang e se ke ea fihla tafoleng ea motho.' }, /* CHECK */
    'pitso.docs.sendbtn':      { en: 'Send it for checking',    st: 'E romele ho hlahlojoa' },                 /* CHECK */
    'pitso.docs.openwhat':     { en: 'Open what you sent',      st: 'Bula seo u se rometseng' },               /* CHECK */
    'pitso.docs.linklife':     { en: '— the link works for about five minutes, and only for you.',
                                 st: '— sehokelo se sebetsa metsotso e ka bang mehlano, ʼme ke sa hao feela.' },/* CHECK */
    'pitso.docs.checkwhat':    { en: 'Check what I sent',       st: 'Hlahloba seo ke se rometseng' },          /* CHECK */
    'pitso.docs.pickkind':     { en: 'Choose what it is…',      st: 'Khetha hore na ke eng…' },                /* CHECK */
    'pitso.docs.whatitis':     { en: 'What it is',              st: 'Ke eng' },                                /* CHECK */
    'pitso.docs.thefile':      { en: 'The file',                st: 'Faele' },                                 /* CHECK */
    'pitso.docs.filehint':     { en: 'A clear photo or a PDF. JPEG, PNG, HEIC or PDF, up to 10MB. It goes to a private store — no link to it exists that anyone can guess.',
                                 st: 'Setšoantšo se hlakileng kapa PDF. JPEG, PNG, HEIC kapa PDF, ho isa ho 10MB. E ea polokelong ea lekunutu — ha ho sehokelo se eang ho eona seo motho a ka se hakanyang.' }, /* CHECK */
    'pitso.docs.whoissued':    { en: 'Who issued it',           st: 'Ke mang ea e fanueng' },                  /* CHECK */
    'pitso.docs.whohint':      { en: 'Optional, but it is the first thing a reviewer looks for.',
                                 st: 'Ha e tlamehe, empa ke ntho ea pele eo mohlahlobi a e batlang.' },        /* CHECK */
    'pitso.docs.uploadbtn':    { en: 'Upload it as a draft',    st: 'E kenye e le ea pele' },                  /* CHECK */
    'pitso.docs.uploading':    { en: 'Uploading…',              st: 'Ea kenngoa…' },                           /* CHECK */
    'pitso.docs.uploaded':     { en: 'Uploaded as a draft. Nothing has gone to a reviewer yet — open it, check it can be read, then send it for checking.',
                                 st: 'E kentsoe e le ea pele. Ha ho letho le eang ho mohlahlobi hajoale — e bule, u hlahlobe hore ea baloa, ebe ua e romela ho hlahlojoa.' }, /* CHECK */
    'pitso.docs.sent':         { en: 'Sent. It is on the reviewer’s desk now, and the verdict will appear here.',
                                 st: 'E rometsoe. E tafoleng ea mohlahlobi hona joale, ʼme qeto e tla hlaha mona.' }, /* CHECK */
    'pitso.docs.gone':         { en: 'That document is no longer here, so nothing was sent.',
                                 st: 'Tokomane eo ha e sa le teng mona, kahoo ha ho letho le rometsoeng.' },   /* CHECK */
    'pitso.docs.nolink':       { en: 'Nothing to open: no server is connected, so no file was ever stored. In a preview only the entry exists.',
                                 st: 'Ha ho letho le ka buloang: ha ho seva se hokahantsoeng, kahoo ha ho faele e kileng ea bolokoa. Pontšong ho na le tlaleho feela.' }, /* CHECK */
    'pitso.docs.asking':       { en: 'Asking for a link…',      st: 'Ho kōptjoa sehokelo…' },                  /* CHECK */
    'pitso.docs.nolinkback':   { en: 'No link came back.',      st: 'Ha ho sehokelo se khutlileng.' },         /* CHECK */
    'pitso.docs.linkfail':     { en: 'Could not get a link: {why}',
                                 st: 'Sehokelo ha sea fumaneha: {why}' },                                       /* CHECK */

    /* What each document is for. */
    'pitso.docwhy.national_id':  { en: 'Proves you are who you say you are. Almost everything else rests on it.',
                                   st: 'E paka hore u uena eo u reng u eena. Hoo e ka bang tsohle tse ling li itšetlehile ka eona.' }, /* CHECK */
    'pitso.docwhy.passport':     { en: 'Stands in for the national ID if that is what you hold.',
                                   st: 'E nka sebaka sa ID ea naha haeba ke eona eo u nang le eona.' },         /* CHECK */
    'pitso.docwhy.trade_certificate': { en: 'The paper from the college or the board that says you were trained.',
                                   st: 'Pampiri e tsoang kolecheng kapa botsamaising e bolelang hore u rutiloe.' }, /* CHECK */
    'pitso.docwhy.professional_registration': { en: 'Registration with a professional body, where your trade has one.',
                                   st: 'Ngoliso mokhatlong oa mosebetsi oa hao, moo o leng teng.' },           /* CHECK */
    'pitso.docwhy.company_registration': { en: 'For a business rather than a person — the registration certificate.',
                                   st: 'Bakeng sa khoebo e seng motho — setifikeiti sa ngoliso.' },            /* CHECK */
    'pitso.docwhy.proof_of_address': { en: 'A recent bill or letter showing where you actually are.',
                                   st: 'Bili kapa lengolo la morao tjena le bontšang moo u leng teng.' },      /* CHECK */

    /* Document names Pitso shows that core does not carry. */
    'pitso.doc.professional_registration': { en: 'Professional registration',
                                   st: 'Ngoliso ea mosebetsi' },                                               /* CHECK */
    'pitso.doc.drivers_licence': { en: 'Driver’s licence',      st: 'Laesense ea ho khanna' },                 /* CHECK */
    'pitso.doc.lease':           { en: 'Lease',                 st: 'Konteraka ea ho hira' },                  /* CHECK */
    'pitso.doc.membership':      { en: 'Membership',            st: 'Botho ba mokhatlo' },                     /* CHECK */

    /* ---- SIGNING IN AND THE PROFILE ------------------------------------- */
    'pitso.auth.first':        { en: 'Sign in first',           st: 'Kena pele' },                             /* CHECK */
    'pitso.auth.why':          { en: 'The board and the open requests are there for anyone to read. Posting work, making an offer and your own documents all carry your name, so Pitso has to know who you are before it will write anything down.',
                                 st: 'Boto le likopo tse buletsoeng li teng hore mang kapa mang a li bale. Ho ngola mosebetsi, ho fana ka theko le litokomane tsa hao li tšoere lebitso la hao, kahoo Pitso e tlameha ho tseba hore na u mang pele e ngola letho.' }, /* CHECK */
    'pitso.auth.how':          { en: 'Use the form at the top of the page: your email, then the six-digit code we send you. There is no password to remember and no password field to type one into.',
                                 st: 'Sebelisa foromo e ka holimo ho leqephe: imeile ea hao, ebe khoutu ea linomoro tse tšeletseng eo re u romelang eona. Ha ho phasewete eo u lokelang ho e hopola, ʼme ha ho sebaka sa ho e ngola.' }, /* CHECK */
    'pitso.auth.signin_email': { en: 'Sign in with your email', st: 'Kena ka imeile ea hao' },                 /* CHECK */
    'pitso.auth.emailme':      { en: 'Email me a code',         st: 'Nthomelle khoutu ka imeile' },            /* CHECK */
    'pitso.auth.sending':      { en: 'Sending…',                st: 'Ea romeloa…' },                           /* CHECK */
    'pitso.auth.checking':     { en: 'Checking…',               st: 'Ea hlahlojoa…' },                         /* CHECK */
    'pitso.auth.nopass':       { en: 'We send a six-digit code to that address. There is no password here, and no field to type one into.',
                                 st: 'Re romela khoutu ea linomoro tse tšeletseng atereseng eo. Ha ho phasewete mona, ʼme ha ho sebaka sa ho e ngola.' }, /* CHECK */
    'pitso.auth.codesent':     { en: 'Code sent to {email}',    st: 'Khoutu e rometsoe ho {email}' },          /* CHECK */
    'pitso.auth.otheraddr':    { en: 'Use a different address', st: 'Sebelisa aterese e ʼngoe' },              /* CHECK */
    'pitso.auth.bademail':     { en: 'That does not look like an email address.',
                                 st: 'Eo ha e shebahale joalo ka aterese ea imeile.' },                        /* CHECK */
    'pitso.auth.sent':         { en: 'Sent. The code is six digits and it does not last long.',
                                 st: 'E rometsoe. Khoutu ke linomoro tse tšeletseng, ʼme ha e nke nako e telele.' }, /* CHECK */
    'pitso.auth.sendfail':     { en: 'The code could not be sent: {why}',
                                 st: 'Khoutu ha ea ka ea romeloa: {why}' },                                    /* CHECK */
    'pitso.auth.badcode':      { en: 'The code is the digits from the email, nothing else.',
                                 st: 'Khoutu ke linomoro tse tsoang imeileng, ha ho letho le leng.' },         /* CHECK */
    'pitso.auth.signedin':     { en: 'Signed in as {email}.',   st: 'U kene e le {email}.' },                  /* CHECK */
    'pitso.auth.signedout':    { en: 'Signed out. Pitso has forgotten who you are on this device.',
                                 st: 'U tsoile. Pitso e lebetse hore na u mang sesebelisoeng sena.' },         /* CHECK */
    'pitso.auth.aswho':        { en: 'You are signed in as',    st: 'U kene e le' },                           /* CHECK */

    'pitso.prof.finish':       { en: 'Finish your profile',     st: 'Qetela leqephe la hao' },                 /* CHECK */
    'pitso.prof.finish_why':   { en: 'You are signed in as {email}, but there is no name against you yet. This is what a stranger reads before deciding to work with you, so it is the one thing Pitso asks for up front.',
                                 st: 'U kene e le {email}, empa ha ho lebitso le ngotsoeng ho uena hajoale. Sena ke seo motho eo u sa mo tsebeng a se balang pele a etsa qeto ea ho sebetsa le uena, kahoo ke ntho e le ʼngoe eo Pitso e e kōpang pele.' }, /* CHECK */
    'pitso.prof.yourname':     { en: 'Your name, or the business name',
                                 st: 'Lebitso la hao, kapa la khoebo' },                                        /* CHECK */
    'pitso.prof.name_hint':    { en: 'Between 2 and 80 characters. Use the name people already know you by.',
                                 st: 'Pakeng tsa litlhaku tse 2 le tse 80. Sebelisa lebitso leo batho ba se ba u tseba ka lona.' }, /* CHECK */
    'pitso.prof.village':      { en: 'Village or suburb',       st: 'Motse kapa lebatooa' },                   /* CHECK */
    'pitso.prof.phone_hint':   { en: 'Optional. People who want to hire you will use it.',
                                 st: 'Ha e tlamehe. Batho ba batlang ho u hira ba tla e sebelisa.' },          /* CHECK */
    'pitso.prof.whatyoudo':    { en: 'What you do',             st: 'Seo u se etsang' },                       /* CHECK */
    'pitso.prof.saveit':       { en: 'Save it',                 st: 'E boloke' },                              /* CHECK */
    'pitso.prof.saved':        { en: 'Saved. If the server refuses it you will be told at the top of this page, in those words.',
                                 st: 'E bolokiloe. Haeba seva se e hana u tla bolelloa ka holimo ho leqephe lena, ka mantsoe ao.' }, /* CHECK */

    /* ---- WRITES THAT DID NOT LAND --------------------------------------- */
    'pitso.wfail.one':         { en: 'Something you did was not saved',
                                 st: 'Ho na le seo u se entseng se sa bolokoang' },                            /* CHECK */
    'pitso.wfail.many':        { en: '{n} things you did were not saved',
                                 st: 'Lintho tse {n} tseo u li entseng ha lia bolokoa' },                      /* CHECK */
    'pitso.wfail.explain':     { en: 'It is still on your screen, and it is not in the database. Nobody else can see it and it will be gone when this browser forgets it. Do it again once the server is answering.',
                                 st: 'E ntse e le skrineng sa hao, empa ha e eo polokelong ea lintlha. Ha ho motho e mong ea e bonang, ʼme e tla nyamela ha sebatli sena se e lebala. E etse hape ha seva se se se araba.' }, /* CHECK */
    'pitso.wfail.core':        { en: 'This one is a fault in the shared core, not in anything you typed: it sends its own bookkeeping field to the database along with the row. Retyping it will not help.',
                                 st: 'Ena ke phoso e ka hare ho lenaneo, eseng ho seo u se ngotseng: le romela lebala la lona la ka hare polokelong hammoho le mola. Ho e ngola hape ho ke ke ha thusa.' }, /* CHECK */
    'pitso.wfail.read':        { en: 'I have read this',        st: 'Ke se ke e balile' },                     /* CHECK */
    'pitso.wfail.notsaved':    { en: 'not saved',               st: 'ha ea bolokoa' },                         /* CHECK */
    'pitso.wfail.saving':      { en: 'saving…',                 st: 'ea bolokoa…' },                           /* CHECK */
    'pitso.wfail.sendingtip':  { en: 'Being sent to the server',
                                 st: 'E ntse e romeloa sevaeng' },                                              /* CHECK */
    'pitso.wfail.nomsg':       { en: 'no message',              st: 'ha ho molaetsa' },                        /* CHECK */
    'pitso.w.request':         { en: 'the request you posted',  st: 'kopo eo u e ngotseng' },                  /* CHECK */
    'pitso.w.offer':           { en: 'the offer you made',      st: 'theko eo u faneng ka eona' },             /* CHECK */
    'pitso.w.engagement':      { en: 'the job you accepted or updated',
                                 st: 'mosebetsi oo u o amohetseng kapa u o fetotseng' },                       /* CHECK */
    'pitso.w.review':          { en: 'the review you left',     st: 'tlhahlobo eo u e siileng' },              /* CHECK */
    'pitso.w.document':        { en: 'the document you uploaded',
                                 st: 'tokomane eo u e kentseng' },                                              /* CHECK */
    'pitso.w.profile':         { en: 'your profile',            st: 'leqephe la hao' },                        /* CHECK */
    'pitso.w.provider':        { en: 'your listing',            st: 'tsebiso ea hao' },                        /* CHECK */
    'pitso.w.other':           { en: 'a row in {table}',        st: 'mola o ho {table}' },                     /* CHECK */
    'pitso.w.change':          { en: ' — the change to it',     st: ' — phetoho ho eona' },                    /* CHECK */

    /* ---- THE SHELL ------------------------------------------------------- */
    'pitso.stale':             { en: 'What is on this screen is not live. It is whatever this browser saved last.',
                                 st: 'Se skrineng sena ha se sa ʼnete hona joale. Ke seo sebatli sena se se bolokileng ha morao.' }, /* CHECK */
    'pitso.reloaded':          { en: 'The connection changed while you were typing — this page reloaded its data underneath you. Check what you are about to send.',
                                 st: 'Khokahano e fetohile ha u ntse u ngola — leqephe lena le nkile lintlha tse ncha. Hlahloba seo u se romelang.' }, /* CHECK */

    /* ---- THE FOOTER ------------------------------------------------------ */
    /* Written as ONE string with placeholders. The two platform names are links
       inside the sentence, and Sesotho does not put them where English does. */
    'pitso.foot.three':        { en: '{pitso} — one of three MEND platforms sharing one identity, one verification and one reputation. The other two are {mafisa} (equipment lent between neighbours) and {matsema} (buying and selling together). A standing earned here is the same standing there.',
                                 st: '{pitso} — e ʼngoe ea lithala tse tharo tsa MEND tse arolelanang boitsebiso bo bong, netefatso e ʼngoe le botumo bo bong. Tse ling tse peli ke {mafisa} (lisebelisoa tse alimanoang ke baahisani) le {matsema} (ho reka le ho rekisa hammoho). Botumo bo fumanoeng mona ke bona bo teng le mane.' }, /* CHECK */
    'pitso.foot.nomoney':      { en: 'Pitso records what was agreed and what both sides say was settled. It never holds or moves your money.',
                                 st: 'Pitso e ngola se lumellanoeng le seo mahlakore ka bobeli a reng se lefiloe. Ha e tšoare kapa ho tsamaisa chelete ea hao.' }, /* CHECK */
    'pitso.foot.by':           { en: 'Website by {mend} · Reg No. 96070 · TIN 200176439-4',
                                 st: 'Sebaka sena se entsoe ke {mend} · Reg No. 96070 · TIN 200176439-4' },     /* CHECK */

    /* ---- THE PRINTED SHEETS ---------------------------------------------- */
    /* These go on paper and get kept, so they are worth having in Sesotho too. */
    'pitso.sheet.person':      { en: 'Pitso · a person on the board',
                                 st: 'Pitso · motho ea boteng' },                                               /* CHECK */
    'pitso.sheet.wanted':      { en: 'Pitso · work wanted',     st: 'Pitso · mosebetsi o batloang' },          /* CHECK */
    'pitso.sheet.worksin':     { en: 'Works in',                st: 'O sebetsa' },                             /* CHECK */
    'pitso.sheet.charges':     { en: 'Charges',                 st: 'O lefisa' },                              /* CHECK */
    'pitso.sheet.state':       { en: 'State',                   st: 'Boemo' },                                 /* CHECK */
    'pitso.sheet.offers':      { en: 'Offers',                  st: 'Litheko' },                               /* CHECK */
    'pitso.sheet.from':        { en: 'From',                    st: 'Ho tsoa ho' },                            /* CHECK */
    'pitso.sheet.verdict':     { en: 'Verdict',                 st: 'Qeto' },                                  /* CHECK */
    'pitso.sheet.nodocs':      { en: 'Nothing submitted for checking.',
                                 st: 'Ha ho letho le rometsoeng ho hlahlojoa.' },                              /* CHECK */
    'pitso.sheet.norevs':      { en: 'No reviews yet.',         st: 'Ha ho litlhahlobo hajoale.' },            /* CHECK */
    'pitso.sheet.nooffers':    { en: 'No offers yet.',          st: 'Ha ho litheko hajoale.' },                /* CHECK */
    'pitso.sheet.docsprivate': { en: 'The documents themselves are private. What is printed here is the verdict, never the file.',
                                 st: 'Litokomane ka botsona ke tsa lekunutu. Se hatisitsoeng mona ke qeto, eseng faele.' }, /* CHECK */
    'pitso.sheet.ratingfrom':  { en: '{rating} from {n}',       st: '{rating} ho tse {n}' },                   /* CHECK */
    'pitso.sheet.norating':    { en: 'no reviews',              st: 'ha ho litlhahlobo' },                     /* CHECK */
    'pitso.sheet.printedon':   { en: 'Printed {date} · {host}',
                                 st: 'E hatisitsoe ka {date} · {host}' },                       /* CHECK */
    'pitso.sheet.notserver':   { en: 'Not taken from the server. This is what this device last held.',
                                 st: 'Ha e nkoa sevaeng. Sena ke seo sesebelisoa sena se neng se se tšoere ha morao.' }, /* CHECK */
    'pitso.sheet.invented':    { en: 'Not taken from the server. This is what this device last held, and every person named on it is invented.',
                                 st: 'Ha e nkoa sevaeng. Sena ke seo sesebelisoa sena se neng se se tšoere ha morao, ʼme motho e mong le e mong ea bitsoang mona o iqapetsoe.' }, /* CHECK */
    'pitso.sheet.anyoneoffer': { en: 'Anyone may make an offer \u2014 what they have had verified is on their profile.',
                                 st: 'Mang kapa mang a ka fana ka theko \u2014 seo ba se netefalitseng se bonahala boitsebisong ba bona.' },        /* CHECK */
    'pitso.sheet.takenline':   { en: 'TAKEN — an offer on this job has been accepted.',
                                 st: 'E NKILOE — theko mosebetsing ona e amohetsoe.' },                        /* CHECK */

    /* ---- SAYING SOMETHING IS WRONG --------------------------------------
       The words for the act itself are shared (report.this, report.why,
       report.private, report.signal, report.r.*) because all three platforms
       report the same way. Only Pitso's own wording is here: the heading of
       the form, the button on it, and the refusals core/mend.js can return.

       Deliberately plain and deliberately small. A prominent REPORT button on
       every listing is an invitation, and the people who accept an invitation
       like that first are rarely the ones with a real complaint. */
    'pitso.rep.head':          { en: 'Tell MEND what is wrong',
                                 st: 'Bolella MEND se fositsoeng' },                                           /* CHECK */
    'pitso.rep.about':         { en: 'About {what}',            st: 'Mabapi le {what}' },                      /* CHECK */
    'pitso.rep.pick':          { en: 'Choose one',              st: 'Khetha e le ʼngoe' },                     /* CHECK */
    'pitso.rep.detail_ph':     { en: 'Only if there is something more to say',
                                 st: 'Feela haeba ho na le se seng seo u ka se buang' },                       /* CHECK */
    'pitso.rep.send':          { en: 'Send this to MEND',       st: 'Romela sena ho MEND' },                   /* CHECK */
    'pitso.rep.err.signin':    { en: 'Sign in before reporting something. A report with nobody behind it is not worth anything to the desk.',
                                 st: 'Kena pele u tlaleha ho hong. Tlaleho e se nang motho ka mor\'a eona ha e na thuso ho tafole.' }, /* CHECK */
    'pitso.rep.err.reason':    { en: 'Choose what is wrong with it first.',
                                 st: 'Khetha pele hore na ho phoso eng ka sona.' },                            /* CHECK */
    'pitso.rep.what.provider': { en: 'this listing',            st: 'lenane lena' },                           /* CHECK */
    'pitso.rep.what.request':  { en: 'this request',            st: 'kōpo ena' },                              /* CHECK */

    /* ---- WHEN MEND HAS TAKEN SOMETHING DOWN ------------------------------
       Shown to everybody, including the person it happened to, which is the
       whole point. A listing that quietly stops appearing, with no word said,
       is indistinguishable from a bug — to the person it happened to and to
       whoever has to answer for it afterwards. */
    'pitso.mod.note':          { en: 'MEND has taken this down, so it no longer appears where people are looking.',
                                 st: 'MEND e e tlositse, kahoo ha e sa hlaha moo batho ba shebang teng.' },     /* CHECK */
    'pitso.mod.on':            { en: 'on {date}',               st: 'ka {date}' },                             /* CHECK */

    /* ---- WHAT THE LIST IS NOT SHOWING ------------------------------------
       A bounded list that does not say it is bounded is lying by omission. */
    'pitso.cov.showing':       { en: 'Showing {loaded} of {total}.',
                                 st: 'Ho bontšoa {loaded} ho {total}.' },                                      /* CHECK */
    'pitso.cov.why':           { en: 'This device downloaded the most recent {loaded}. The rest are on the server and are not on this page.',
                                 st: 'Sesebelisoa sena se khoasolotse tse {loaded} tsa moraorao. Tse ling li sevaeng ʼme ha li leqepheng lena.' }, /* CHECK */
    'pitso.cov.search':        { en: 'Search above to reach the ones that were not downloaded.',
                                 st: 'Batla ka holimo ho fihlela tse sa kang tsa khoasolloa.' },                /* CHECK */

    /* ---- SEARCHING ------------------------------------------------------
       The cache is the first 200, so a search that only reads the cache would
       tell the one welder in Mokhotlong that he does not exist. Which of the
       two searches actually ran is printed, every time. */
    'pitso.q.label':           { en: 'Search by name, trade or place',
                                 st: 'Batla ka lebitso, mosebetsi kapa sebaka' },                              /* CHECK */
    'pitso.q.ph':              { en: 'welder, Mokhotlong, Mokoena…',
                                 st: 'mowelli, Mokhotlong, Mokoena…' },                                        /* CHECK */
    'pitso.q.running':         { en: 'Searching…',              st: 'Ea batla…' },                             /* CHECK */
    'pitso.q.min':             { en: 'Type at least two letters.',
                                 st: 'Ngola bonyane litlhaku tse peli.' },                                      /* CHECK */
    'pitso.q.none':            { en: 'Nothing matched that.',   st: 'Ha ho letho le tsamaellanang le seo.' },   /* CHECK */
    'pitso.q.one':             { en: '1 found.',                st: 'Ho fumanoe e le ʼngoe.' },                /* CHECK */
    'pitso.q.n':               { en: '{n} found.',              st: 'Ho fumanoe tse {n}.' },                   /* CHECK */
    'pitso.q.server':          { en: 'Searched every listing on the server, not only what this device holds.',
                                 st: 'Ho batlisisitsoe manane ʼohle a sevaeng, eseng feela ao sesebelisoa sena se nang le ʼona.' }, /* CHECK */
    'pitso.q.local':           { en: 'Searched only what is on this device. Anything on the server that was not downloaded was not searched.',
                                 st: 'Ho batlisisitsoe feela se leng sesebelisoeng sena. Se seng le se seng se sevaeng se sa kang sa khoasolloa ha sea ka sa batlisisoa.' }, /* CHECK */
    'pitso.q.err':             { en: 'The search did not come back: {why}',
                                 st: 'Patlo ha ea ka ea khutla: {why}' },                                       /* CHECK */
    'pitso.q.clear':           { en: 'Clear the search',        st: 'Hlakola patlo' },                          /* CHECK */
    'pitso.q.elsewhere':       { en: 'on another platform',     st: 'sethaleng se seng' },                      /* CHECK */
    'pitso.q.t.person':        { en: 'Person',                  st: 'Motho' },
    'pitso.q.t.provider':      { en: 'Tradesperson',            st: 'Setsebi' },                               /* CHECK */
    'pitso.q.t.request':       { en: 'Open request',            st: 'Kōpo e buletsoeng' },                     /* CHECK */
    'pitso.q.t.asset':         { en: 'Something lent out',      st: 'Ntho e alimisoang' },                     /* CHECK */
    'pitso.q.t.pool':          { en: 'Buying group',            st: 'Sehlopha sa ho reka' },                   /* CHECK */

    /* ---- YOUR ACCOUNT ---------------------------------------------------
       Two things only: take a copy, and go. The wording must not overpromise.
       Jobs, confirmed payments, settled disputes and handover photographs
       STAY — they are the other person's record as much as this one's, and a
       Delete button that promises more than it delivers is worse than none. */
    'pitso.acct.head':         { en: 'Your account',            st: 'Akhaonto ea hao' },                       /* CHECK */
    'pitso.acct.intro':        { en: 'What this platform holds about you, and how to take it away with you or close it.',
                                 st: 'Seo sethala sena se nang le sona ka uena, le kamoo u ka se nkang kapa ua koala akhaonto.' }, /* CHECK */
    'pitso.acct.copy':         { en: 'Take a copy',             st: 'Nka kopi' },                              /* CHECK */
    'pitso.acct.copy_why':     { en: 'Everything MEND holds about you across the three platforms, as one file you keep.',
                                 st: 'Tsohle tseo MEND e nang le tsona ka uena lithaleng tse tharo, e le faele e le ʼngoe eo u e bolokang.' }, /* CHECK */
    'pitso.acct.copy_nofiles': { en: 'The document and photograph files themselves are not inside it — they are private files. It lists them, and each one can still be opened from My documents.',
                                 st: 'Lifaele tsa litokomane le tsa linepe ha li ka hare ho eona — ke lifaele tsa lekunutu. E li thathamisa, ʼme e ʼngoe le e ʼngoe e ntse e ka buloa ho Litokomane tsa ka.' }, /* CHECK */
    'pitso.acct.copy_asking':  { en: 'Asking the server for your copy…',
                                 st: 'Ho kōpuoa kopi ea hao sevaeng…' },                                        /* CHECK */
    'pitso.acct.copy_ready':   { en: 'Your copy is ready. It was made on {date}.',
                                 st: 'Kopi ea hao e se e loketse. E entsoe ka {date}.' },                       /* CHECK */
    'pitso.acct.download':     { en: 'Save the file',           st: 'Boloka faele' },                          /* CHECK */
    'pitso.acct.copy_manual':  { en: 'If nothing is saved when you tap that, the whole file is in the box below and can be copied by hand.',
                                 st: 'Haeba ho se letho le bolokoang ha u tobetsa moo, faele kaofela e ka lebokoseng le ka tlase ʼme e ka kopishoa ka letsoho.' }, /* CHECK */
    'pitso.acct.copy_failed':  { en: 'The copy did not come back: {why}',
                                 st: 'Kopi ha ea ka ea khutla: {why}' },                                        /* CHECK */
    'pitso.acct.remove':       { en: 'Remove your account',     st: 'Tlosa akhaonto ea hao' },                  /* CHECK */
    'pitso.acct.remove_why':   { en: 'Nothing happens until you have read what this erases and what it does not.',
                                 st: 'Ha ho letho le etsahalang ho fihlela u balile seo sena se se hlakolang le seo se sa se hlakoleng.' }, /* CHECK */
    'pitso.acct.show':         { en: 'Show me what this would do',
                                 st: 'Mpontše seo sena se ka se etsang' },                                      /* CHECK */
    'pitso.acct.asking':       { en: 'Asking the server…',      st: 'Ho botsoa seva…' },                        /* CHECK */
    'pitso.acct.erased':       { en: 'Erased',                  st: 'Se hlakoloang' },                          /* CHECK */
    'pitso.acct.kept':         { en: 'Kept, without your name on it',
                                 st: 'Se bolokoang, ntle le lebitso la hao ho sona' },                          /* CHECK */
    'pitso.acct.cannot_undo':  { en: 'This cannot be undone.',  st: 'Sena se ke ke sa khutlisoa.' },           /* CHECK */
    'pitso.acct.confirm':      { en: 'Type your name to confirm',
                                 st: 'Ngola lebitso la hao ho netefatsa' },                                     /* CHECK */
    'pitso.acct.confirm_hint': { en: 'Exactly as it is written here: {name}',
                                 st: 'Hantle feela kamoo le ngotsoeng ka teng mona: {name}' },                  /* CHECK */
    'pitso.acct.do_it':        { en: 'Remove my account',       st: 'Tlosa akhaonto ea ka' },                   /* CHECK */
    'pitso.acct.working':      { en: 'Removing your files — {done} of {total}. Do not close this page.',
                                 st: 'Ho tlosoa lifaele tsa hao — {done} ho {total}. Se ke oa koala leqephe lena.' }, /* CHECK */
    'pitso.acct.record':       { en: 'Files removed. Closing the account…',
                                 st: 'Lifaele li tlositsoe. Akhaonto ea koaloa…' },                             /* CHECK */
    'pitso.acct.done':         { en: 'Your account has been removed and you have been signed out.',
                                 st: 'Akhaonto ea hao e tlositsoe ʼme u ntšitsoe.' },                           /* CHECK */
    'pitso.acct.failed':       { en: 'Nothing was removed: {why}',
                                 st: 'Ha ho letho le tlositsoeng: {why}' },                                     /* CHECK */
    'pitso.acct.needs_conn':   { en: 'This needs a server. There is nothing on a server to take a copy of or to remove, so this stays closed until a connection is configured and answering.',
                                 st: 'Sena se hloka seva. Ha ho letho sevaeng seo ho ka nkoang kopi ea sona kapa se ka tlosoang, kahoo sena se lula se koetsoe ho fihlela khokahano e beiloe ʼme e araba.' }, /* CHECK */
    /* The counts mend_deletion_preview() returns, in words. A key it returns
       that is not named here is shown as it comes — degraded and visible,
       rather than dropped from a screen a person is reading before an
       irreversible act. */
    'pitso.acct.k.your_name_and_contact': { en: 'Your name and contact details',
                                 st: 'Lebitso la hao le litaba tsa ho u fumana' },                              /* CHECK */
    'pitso.acct.k.documents':  { en: 'Documents you uploaded',  st: 'Litokomane tseo u li kentseng' },          /* CHECK */
    'pitso.acct.k.photographs':{ en: 'Photographs you took',    st: 'Linepe tseo u li nkileng' },               /* CHECK */
    'pitso.acct.k.listings':   { en: 'Listings and requests you posted',
                                 st: 'Manane le likōpo tseo u li behileng' },                                   /* CHECK */
    'pitso.acct.k.completed_jobs': { en: 'Jobs you finished',   st: 'Mesebetsi eo u e qetileng' },              /* CHECK */
    'pitso.acct.k.reviews_others_wrote': { en: 'What other people wrote about you',
                                 st: 'Seo batho ba bang ba se ngotseng ka uena' },                              /* CHECK */
    'pitso.acct.k.settled_payments': { en: 'Payments both sides confirmed',
                                 st: 'Litefo tseo mahlakore ka bobeli a li netefalitseng' },                    /* CHECK */
    'pitso.acct.k.disputes':   { en: 'Disagreements you were part of',
                                 st: 'Liqabang tseo u neng u le karolo ea tsona' },                             /* CHECK */
    'pitso.acct.k.record_entries': { en: 'Entries in the record trail',
                                 st: 'Lingoliso tseleng ea rekoto' },                                           /* CHECK */
    'pitso.acct.k.condition_photographs': { en: 'Handover photographs',
                                 st: 'Linepe tsa ha ho fanoa' }                                                 /* CHECK */

    /* ENGLISH-ONLY: nothing is left in this file. The two places English still
       reaches a Sesotho reader are named here so the gap stays visible:
         1. TRADE NAMES (the TRADES table in index.html) mirror
            db/004_reference.sql, which carries `name_en` and a partly-filled
            `name_st`. Seven of the twenty-eight have a Sesotho name in the
            reference data and twenty-one do not. Translating them HERE would
            put the app out of step with the database it mirrors — the fix
            belongs in 004_reference.sql, and it needs a native speaker who
            knows what a panel beater is actually called.
         2. REFUSALS THAT COME BACK FROM core/mend.js unmatched. Every refusal
            core can currently return is mapped above; if core changes its
            wording the English comes through, which is degraded and visible,
            rather than wrong. */
  });
})(window);
