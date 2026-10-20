/* ===========================================================================
   SESOTHO AND ENGLISH
   These platforms are named for Basotho institutions. Speaking only English
   would undercut the entire argument they are making.

   ⚠️ REVIEW NEEDED — Jakote, you are the native speaker here and I am not.
   Every Sesotho string below is a first pass. Some I am confident about
   (lebitso, mosebetsi, setereke, chelete); others are my best construction and
   may be clumsy or wrong in register. Anything you change, change it here —
   all four apps read from this one file. Entries marked CHECK are the ones I
   am least sure of, and none of them is worth shipping wrong to someone who
   speaks the language properly.

   Load AFTER config.js and BEFORE mend.js.
   =========================================================================== */
(function (global) {
  'use strict';

  const STR = {
    /* ---- the shell -------------------------------------------------------- */
    'title.pitso':         { en: 'Pitso — skilled work, and what people say about it',
                             st: 'Pitso — mosebetsi oa botsebi, le seo batho ba se buang ka oona' },  /* CHECK */
    'title.mafisa':        { en: 'Mafisa — the register of lent assets',
                             st: 'Mafisa — bukana ea ngoliso ea thepa e alimisoang' },                /* CHECK */
    'title.matsema':       { en: 'Matsema — what one field cannot supply, twenty can',
                             st: 'Matsema — seo tšimo e le ʼngoe e ke keng ea se fana, tse mashome a mabeli li ka se fana' }, /* CHECK */
    'title.verify':        { en: 'Verification desk — MEND GROUP',
                             st: 'Tafole ea netefatso — MEND GROUP' },                               /* CHECK */
    'legal.terms':         { en: 'Terms',                 st: 'Melao ea tšebeliso' },     /* CHECK */
    'legal.privacy':       { en: 'Privacy',               st: 'Lekunutu' },                /* CHECK */
    'app.language':        { en: 'Language',             st: 'Puo' },
    'app.english':         { en: 'English',              st: 'Senyesemane' },
    'app.sesotho':         { en: 'Sesotho',              st: 'Sesotho' },
    'app.signin':          { en: 'Sign in',              st: 'Kena' },
    'app.signout':         { en: 'Sign out',             st: 'Tsoa' },
    'app.email':           { en: 'Email',                st: 'Imeile' },
    'app.code':            { en: 'One-time code',        st: 'Khoutu ea nakoana' },      /* CHECK */
    'app.back':            { en: 'Back',                 st: 'Khutlela morao' },
    'app.save':            { en: 'Save',                 st: 'Boloka' },
    'app.send':            { en: 'Send',                 st: 'Romela' },
    'app.cancel':          { en: 'Cancel',               st: 'Hlakola' },
    'app.search':          { en: 'Search',               st: 'Batla' },
    'app.all':             { en: 'All',                  st: 'Tsohle' },
    'app.yes':             { en: 'Yes',                  st: 'E' },
    'app.no':              { en: 'No',                   st: 'Che' },
    'app.open':            { en: 'Open',                 st: 'Bula' },
    'app.close':           { en: 'Close',                st: 'Koala' },
    'app.today':           { en: 'Today',                st: 'Kajeno' },
    'app.name':            { en: 'Name',                 st: 'Lebitso' },
    'app.phone':           { en: 'Phone',                st: 'Nomoro ea mohala' },
    'app.district':        { en: 'District',             st: 'Setereke' },
    'app.village':         { en: 'Village',              st: 'Motse' },
    'app.price':           { en: 'Price',                st: 'Theko' },
    'app.money':           { en: 'Money',                st: 'Chelete' },
    'app.day':             { en: 'day',                  st: 'letsatsi' },
    'app.days':            { en: 'days',                 st: 'matsatsi' },
    'app.person':          { en: 'person',               st: 'motho' },
    'app.people':          { en: 'people',               st: 'batho' },
    'app.none':            { en: 'None',                 st: 'Ha ho letho' },
    'app.loading':         { en: 'Loading…',             st: 'Ea kenya…' },              /* CHECK */

    /* ---- connection state — the honesty strings --------------------------- */
    'mode.device':         { en: 'Preview · this device', st: 'Pontšo · sesebelisoa sena' }, /* CHECK */
    'mode.device.detail':  { en: 'Not connected to a server yet. Everything you enter is saved in this browser and is visible to nobody else.',
                             st: 'Ha e so hokahane le seva. Tsohle tseo u li kenyang li bolokoa mona feela, ha ho motho e mong ea li bonang.' }, /* CHECK */
    'mode.invented':       { en: 'Every person, business, review and buyer shown here is invented — none of them is real.',
                             st: 'Batho bohle, likhoebo, litlhahlobo le bareki ba bontšoang mona ke ba iqapetsoeng — ha ho le a mong oa ʼnete.' }, /* CHECK */
    'mode.connecting':     { en: 'Connecting…',           st: 'Ea hokahanya…' },          /* CHECK */
    'mode.connected':      { en: 'Live',                  st: 'E phela' },                /* CHECK */
    'mode.unreachable':    { en: 'Cannot reach the server', st: 'Ha e fumane seva' },     /* CHECK */
    'mode.unreachable.detail': { en: 'You are looking at whatever was last saved on this device. Do not treat it as current.',
                             st: 'U shebile tse bolokiloeng qetellong mona. Se ke oa li nka e le tsa hajoale.' }, /* CHECK */

    /* ---- the outbox ------------------------------------------------------- */
    'outbox.waiting':      { en: 'waiting to send',       st: 'e emetse ho romelloa' },   /* CHECK */
    'outbox.detail':       { en: 'You have no signal. This is saved on your phone and will send itself when the signal comes back.',
                             st: 'Ha ho letšoao. Sena se bolokiloe fonong ea hao, se tla romelloa ha letšoao le khutla.' }, /* CHECK */
    'outbox.failed':       { en: 'This did not save',     st: 'Sena ha sea bolokoa' },    /* CHECK */
    'outbox.sending':      { en: 'These will go through in a moment.',
                             st: 'Tsena li tla romelloa hanyenyane.' },                  /* CHECK */
    'app.offline':         { en: 'No signal',              st: 'Ha ho letšoao' },
    'app.offline.detail':  { en: 'You can carry on. Anything you do is kept on this phone and sends itself when the signal comes back.',
                             st: 'U ka tsoela pele. Seo u se etsang se bolokoa fonong ena, se romelloe ha letšoao le khutla.' }, /* CHECK */

    /* ---- documents and verification --------------------------------------- */
    'doc.documents':       { en: 'Documents',             st: 'Litokomane' },
    'doc.document':        { en: 'Document',              st: 'Tokomane' },
    'doc.upload':          { en: 'Upload',                st: 'Kenya' },                  /* CHECK */
    'doc.submit':          { en: 'Submit for checking',   st: 'Romela hore e hlahlojoe' },/* CHECK */
    'doc.draft':           { en: 'Not sent yet',          st: 'Ha e so romelloe' },
    'doc.waiting':         { en: 'Waiting to be checked', st: 'E emetse ho hlahlojoa' },  /* CHECK */
    'doc.verified':        { en: 'Verified',              st: 'E netefalitsoe' },
    'doc.rejected':        { en: 'Not accepted',          st: 'Ha ea amoheloa' },         /* CHECK */
    'doc.expired':         { en: 'Expired',               st: 'E felile' },
    'doc.reason':          { en: 'Reason',                st: 'Lebaka' },
    'doc.none':            { en: 'You have not sent any documents yet.',
                             st: 'Ha u so romele litokomane.' },                          /* CHECK */
    'doc.national_id':     { en: 'National ID',           st: 'Boitsebiso ba naha' },     /* CHECK */
    'doc.passport':        { en: 'Passport',              st: 'Phasepoto' },
    'doc.trade_certificate': { en: 'Trade certificate',   st: 'Setifikeiti sa mosebetsi' },/* CHECK */
    'doc.vehicle_registration': { en: 'Vehicle registration', st: 'Ngoliso ea koloi' },   /* CHECK */
    'doc.title_deed':      { en: 'Title deed',            st: 'Tokomane ea mobu' },       /* CHECK */
    'doc.proof_of_address':{ en: 'Proof of address',      st: 'Bopaki ba moo u lulang' }, /* CHECK */
    'doc.company_registration': { en: 'Company registration', st: 'Ngoliso ea khoebo' },  /* CHECK */

    /* ---- standing --------------------------------------------------------- */
    'rep.standing':        { en: 'Standing',              st: 'Botumo' },                 /* CHECK */
    'rep.jobs':            { en: 'jobs completed',        st: 'mesebetsi e phethiloeng' },/* CHECK */
    'rep.reviews':         { en: 'reviews',               st: 'litlhahlobo' },            /* CHECK */
    'rep.noreviews':       { en: 'No reviews yet',        st: 'Ha ho litlhahlobo' },
    'rep.also_on':         { en: 'Also on',               st: 'Hape ho' },                /* CHECK */

    /* ---- money — the constraint stated in both languages -------------------- */
    'money.records_only':  { en: 'This platform records what you agreed. It never holds or moves your money — you settle between yourselves.',
                             st: 'Sethala sena se ngola seo le se lumellaneng. Ha se tšoare kapa se fetise chelete ea hao — le lefana le le babeli.' }, /* CHECK */
    'money.mark_settled':  { en: 'Mark as settled',       st: 'Tšoaea e le e lefiloeng' },/* CHECK */
    'money.settled':       { en: 'Both sides confirmed payment', st: 'Ka bobeli le netefalitse tefo' }, /* CHECK */

    /* ---- the three platforms ---------------------------------------------- */
    'pitso.name':          { en: 'Pitso',                 st: 'Pitso' },
    'pitso.tagline':       { en: 'Anyone may stand, and be judged on what they say.',
                             st: 'Mang kapa mang a ka ema, a ahloloe ka seo a se buang.' }, /* CHECK */
    'pitso.find':          { en: 'Find someone',          st: 'Batla motho' },
    'pitso.post':          { en: 'Post a request',        st: 'Kopa mosebetsi' },          /* CHECK */
    'pitso.requests':      { en: 'Open requests',         st: 'Likopo tse buloetseng' },   /* CHECK */
    'pitso.trade':         { en: 'Trade',                 st: 'Mosebetsi' },
    'pitso.offer':         { en: 'Make an offer',         st: 'Fana ka theko' },           /* CHECK */

    'mafisa.name':         { en: 'Mafisa',                st: 'Mafisa' },
    'mafisa.tagline':      { en: 'What you are not using, in the hands of someone who can work with it.',
                             st: 'Seo u sa se sebeliseng, matsohong a ea ka se sebetsang.' }, /* CHECK */
    'mafisa.register':     { en: 'The register',          st: 'Bukana ea ngoliso' },       /* CHECK */
    'mafisa.owner':        { en: 'Owner',                 st: 'Mongʼa sona' },            /* CHECK */
    'mafisa.borrow':       { en: 'Ask to borrow',         st: 'Kopa ho alima' },           /* CHECK */
    'mafisa.return':       { en: 'Returned',              st: 'E khutlisitsoe' },          /* CHECK */
    'mafisa.perday':       { en: 'per day',               st: 'ka letsatsi' },
    'mafisa.deposit':      { en: 'Deposit',               st: 'Tefo ea tšireletso' },      /* CHECK */

    'matsema.name':        { en: 'Matsema',               st: 'Matsema' },
    'matsema.tagline':     { en: 'What one field cannot supply, twenty can.',
                             st: 'Seo tšimo e le \'ngoe e ke keng ea se fana, tse mashome a mabeli li ka se fana.' }, /* CHECK */
    'matsema.pool':        { en: 'Pool',                  st: 'Sehlopha' },                /* CHECK */
    'matsema.pools':       { en: 'Pools',                 st: 'Lihlopha' },                /* CHECK */
    'matsema.pledge':      { en: 'Pledge',                st: 'Itlama' },                  /* CHECK */
    'matsema.pledged':     { en: 'Pledged',               st: 'Ho itlamiloe' },            /* CHECK */
    'matsema.confirmed':   { en: 'Confirmed',             st: 'Ho netefalitsoe' },         /* CHECK */
    'matsema.short':       { en: 'Still short',           st: 'Ho ntse ho haella' },       /* CHECK */
    'matsema.cannot_promise': { en: 'This pool cannot yet promise the buyer.',
                             st: 'Sehlopha sena se ke ke sa tšepisa moreki hajoale.' },    /* CHECK */
    'matsema.can_promise': { en: 'This pool can keep its promise.',
                             st: 'Sehlopha sena se ka phethahatsa tšepiso ea sona.' },     /* CHECK */
    'install.add':         { en: 'Add to phone',         st: 'Kenya fonong' },              /* CHECK */
    'install.why':         { en: 'It opens without signal and costs no data to open again.',
                             st: 'E buleha ntle le letšoao, ha e je data ha u e bula hape.' }, /* CHECK */
    /* Notifications. The database stores a KEY and its variables; the sentence
       is built here, in whatever language the reader chose. */
    'notif.doc_verified':  { en: 'Your {kind} was checked and accepted.',
                             st: 'Tokomane ea hao ea {kind} e hlahlobiloe ea amoheloa.' },     /* CHECK */
    'notif.doc_rejected':  { en: 'Your {kind} was not accepted. {note}',
                             st: 'Tokomane ea hao ea {kind} ha ea amoheloa. {note}' },         /* CHECK */
    'notif.offer_made':    { en: '{who} answered your job: {title}',
                             st: '{who} o arabile mosebetsi oa hao: {title}' },                /* CHECK */
    'notif.offer_accepted':{ en: 'Your price was accepted for {title}.',
                             st: 'Theko ea hao e amohetsoe bakeng sa {title}.' },              /* CHECK */
    'notif.loan_requested':{ en: '{who} wants to borrow {item}, {from} to {to}.',
                             st: '{who} o batla ho alima {item}, ho tloha {from} ho isa {to}.' }, /* CHECK */
    'notif.loan_state':    { en: '{item} — now {state}.',
                             st: '{item} — hona joale {state}.' },                             /* CHECK */
    'notif.pledge_made':   { en: 'Someone pledged {amount} {unit} to {pool}.',
                             st: 'Motho e mong o itlamme ka {amount} {unit} ho {pool}.' },     /* CHECK */
    'notif.pledge_state':  { en: 'Your pledge to {pool} is now {state}.',
                             st: 'Boitlamo ba hao ho {pool} hona joale ke {state}.' },         /* CHECK */
    'notif.pool_ready':    { en: '{pool} has reached its target. It can now promise the buyer.',
                             st: '{pool} e fihletse sepheo. Hona joale e ka tšepisa moreki.' },/* CHECK */
    'notif.settlement_recorded': { en: 'A payment of M{amount} by {method} was recorded against you.',
                             st: 'Tefo ea M{amount} ka {method} e ngolisitsoe ho uena.' },     /* CHECK */
    'notif.settlement_confirmed':{ en: 'The other side confirmed the payment.',
                             st: 'Lehlakore le leng le netefalitse tefo.' },                  /* CHECK */
    'deliv.schedule':      { en: 'Delivery schedule',    st: 'Kemiso ea ho fana' },        /* CHECK */
    'deliv.due':           { en: 'due',                  st: 'e lokelang' },                /* CHECK */
    'deliv.met':           { en: 'delivered in full',    st: 'e fanoe ka botlalo' },        /* CHECK */
    'deliv.part':          { en: 'part delivered',       st: 'e fanoe karolo' },            /* CHECK */
    'deliv.missed':        { en: 'missed',               st: 'e siiloe' },                  /* CHECK */
    'deliv.behind':        { en: 'Behind by {n} {unit}.',
                             st: 'Ho setse {n} {unit}.' },                                  /* CHECK */
    'deliv.ontrack':       { en: 'Every delivery due so far has been made in full.',
                             st: 'Litlhahiso tsohle tse lokelang ho fihlela joale li entsoe ka botlalo.' }, /* CHECK */
    'report.this':         { en: 'Report this',           st: 'Tlaleha sena' },            /* CHECK */
    'report.why':          { en: 'What is wrong with it',  st: 'Se phoso ka sona' },        /* CHECK */
    'report.detail':       { en: 'Anything you can tell us', st: 'Seo u ka re bolellang sona' }, /* CHECK */
    'report.sent':         { en: 'Thank you. The desk will look at it.',
                             st: 'Kea leboha. Tafole e tla e sheba.' },                      /* CHECK */
    'report.already':      { en: 'You have already reported this.',
                             st: 'U se u tlalehile sena.' },                                 /* CHECK */
    'report.private':      { en: 'What you write here is seen only by MEND. It is not shown to the person you are reporting.',
                             st: 'Seo u se ngolang mona se bonoa ke MEND feela. Ha se bontšoe motho eo u mo tlalehang.' }, /* CHECK */
    'report.signal':       { en: '{n} people have reported this.',
                             st: 'Batho ba {n} ba tlalehile sena.' },                        /* CHECK */
    'report.r.not_real':   { en: 'It does not exist',       st: 'Ha e teng' },               /* CHECK */
    'report.r.not_theirs': { en: 'It is not theirs',        st: 'Hase ea bona' },            /* CHECK */
    'report.r.misleading': { en: 'It is misleading',        st: 'Ea thetsa' },               /* CHECK */
    'report.r.offensive':  { en: 'It is offensive',         st: 'Ea khopisa' },              /* CHECK */
    'report.r.unsafe':     { en: 'It is unsafe',            st: 'Ha e bolokehe' },           /* CHECK */
    'report.r.spam':       { en: 'It is spam',              st: 'Ke litšila' },              /* CHECK */
    'report.r.other':      { en: 'Something else',          st: 'Ho hong' },
    'mod.hidden':          { en: 'Taken down by MEND',      st: 'E tlositsoe ke MEND' },     /* CHECK */
    'mod.reason':          { en: 'Reason given',            st: 'Lebaka le fanoeng' },       /* CHECK */
    'dispute.title':       { en: 'Something went wrong',   st: 'Ho na le se sa tsamaeang hantle' }, /* CHECK */
    'dispute.plural':      { en: 'Disputes',              st: 'Liqabang' },                  /* CHECK */
    'dispute.n_open':      { en: '{n} open',              st: '{n} tse buletsoeng' },        /* CHECK */
    'desk.n_waiting':      { en: '{n} waiting',           st: '{n} tse emetseng' },          /* CHECK */
    'dispute.opened_today':{ en: 'opened today',          st: 'e buletsoe kajeno' },         /* CHECK */
    'dispute.one_side_only':{ en: 'Only one side has been heard. Nothing can be concluded from that.',
                             st: 'Ke lehlakore le le leng feela le utloahetseng. Ha ho seo se ka etsoang ka hoo.' }, /* CHECK */
    'desk.title':          { en: 'Verification desk',     st: 'Tafole ea netefatso' },       /* CHECK */
    'desk.nothing':        { en: 'Nothing waiting',       st: 'Ha ho letho le emetseng' },   /* CHECK */
    'desk.oldest_first':   { en: 'Oldest first. Somebody cannot work until their certificate clears, so the number of days is the thing to look at.',
                             st: 'Tsa khale pele. Motho a ke ke a sebetsa ho fihlela setifikeiti sa hae se lokile, kahoo palo ea matsatsi ke eona ntho e shebahalang.' }, /* CHECK */
    'desk.releases':       { en: 'Verifying this releases',
                             st: 'Ho netefatsa sena ho lokolla' },                            /* CHECK */
    'desk.open_doc':       { en: 'Open the document',     st: 'Bula tokomane' },             /* CHECK */
    'desk.reject_reason':  { en: 'Reason — required to reject',
                             st: 'Lebaka — lea hlokahala ha u hana' },                        /* CHECK */
    'desk.rules_in_db':    { en: 'The rules are in the database, not in this page. A decision must name a reviewer who is staff, can never be the document\'s owner, is stamped with the time, and must give a reason when it rejects.',
                             st: 'Melao e ka har\'a database, eseng leqepheng lena. Qeto e tlameha ho bolela mohlahlobi ea sebetsang mona, e ke ke ea e-ba mongʼa tokomane, e tšoauoa ka nako, ebile e tlameha ho fana ka lebaka ha e hana.' }, /* CHECK */
    'desk.person':         { en: 'Person',                st: 'Motho' },
    'desk.issued':         { en: 'Issued',                st: 'E fanoe' },                  /* CHECK */
    'desk.expires':        { en: 'Expires',               st: 'E fela' },                   /* CHECK */
    'desk.verify':         { en: 'Verify',                st: 'Netefatsa' },                /* CHECK */
    'desk.reject':         { en: 'Reject',                st: 'Hana' },
    'desk.check_prompt':   { en: 'What did you check, or what is wrong with it?',
                             st: 'U hlahlobile eng, kapa ho phoso eng ka eona?' },          /* CHECK */
    'desk.no_server':      { en: 'No server configured',  st: 'Ha ho seva se behiloeng' },  /* CHECK */
    'desk.no_server_why':  { en: 'The desk decides who is verified, and that decision has to be stored somewhere everyone can see. Running against a browser would mean verifying documents for nobody.',
                             st: 'Tafole ena e etsa qeto ea hore na ke mang ea netefalitsoeng, mme qeto eo e tlameha ho bolokoa moo bohle ba ka e bonang. Ho sebetsa ka sebatli feela e ka ba ho netefatsa litokomane ho se motho.' }, /* CHECK */
    'desk.fill_in':        { en: 'Fill in {file} with a Supabase project URL and its anon key. Never the service_role key — it bypasses every policy that keeps these documents private.',
                             st: 'Kenya {file} le URL ea projeke ea Supabase le senotlolo sa eona sa anon. Le ka mohla e seng senotlolo sa service_role — se feta melao eohle e bolokang litokomane tsena e le lekunutu.' }, /* CHECK */
    'auth.enter_code':     { en: 'Enter the code',        st: 'Kenya khoutu' },             /* CHECK */
    'auth.sent_to':        { en: 'Sent to {email}.',      st: 'E rometsoe ho {email}.' },   /* CHECK */
    'auth.six_digit':      { en: 'Six-digit code',        st: 'Khoutu ea linomoro tse tšeletseng' }, /* CHECK */
    'auth.another_email':  { en: 'Use another email',     st: 'Sebelisa imeile e ʼngoe' },  /* CHECK */
    'auth.send_code':      { en: 'Send me a code',        st: 'Nthomelle khoutu' },         /* CHECK */
    'desk.dispute_note':   { en: 'A dispute that nobody has answered is the one that turns into a person leaving the platform.',
                             st: 'Qabang eo ho seng motho ea e arabileng ke eona e fellang ka hore motho a tlohele sethala.' }, /* CHECK */
    'dispute.raise':       { en: 'Raise it',              st: 'E hlahise' },                 /* CHECK */
    'dispute.claim':       { en: 'What happened, in your own words',
                             st: 'Se etsahetseng, ka mantsoe a hao' },                       /* CHECK */
    'dispute.their_side':  { en: 'What they said',        st: 'Seo ba se buileng' },         /* CHECK */
    'dispute.final':       { en: 'Once you send this it cannot be changed. The other person will read it as you wrote it.',
                             st: 'Ha u se u e romelletse e ke ke ea fetoloa. Motho e mong o tla e bala kamoo u e ngotseng.' }, /* CHECK */
    'dispute.no_verdict':  { en: 'This platform does not decide who is right. It keeps both accounts so neither can be changed later.',
                             st: 'Sethala sena ha se khethe hore na ke mang ea nepileng. Se boloka litlaleho tsa ka bobeli e le hore ho se be ea li fetolang hamorao.' }, /* CHECK */
    'dispute.both_accept': { en: 'Both of you must accept the outcome before this closes.',
                             st: 'Ka bobeli le tlameha ho amohela qeto pele sena se koaloa.' }, /* CHECK */
    'dispute.open':        { en: 'open',                  st: 'e buletsoe' },                /* CHECK */
    'dispute.answered':    { en: 'answered',              st: 'e arabiloe' },                /* CHECK */
    'dispute.withdrawn':   { en: 'withdrawn',             st: 'e huletsoe morao' },          /* CHECK */
    'dispute.raise_about': { en: 'Raise something about this job',
                             st: 'Hlahisa ntho e mabapi le mosebetsi ona' },                 /* CHECK */
    'dispute.against':     { en: 'This is about',         st: 'Sena se mabapi le' },         /* CHECK */
    'dispute.what_kind':   { en: 'What went wrong',       st: 'Se fositsoeng' },             /* CHECK */
    'dispute.amount':      { en: 'How much is in question',
                             st: 'Chelete e teng puisanong' },                                /* CHECK */
    'dispute.add_reply':   { en: 'Add your side',         st: 'Kenya lehlakore la hao' },    /* CHECK */
    'dispute.your_turn':   { en: 'They have written. Yours is the next word.',
                             st: 'Ba ngotse. Lentsoe le latelang ke la hao.' },               /* CHECK */
    'dispute.outcome':     { en: 'What was agreed',       st: 'Se lumellanoeng' },           /* CHECK */
    'dispute.you_accepted':{ en: 'You have accepted this outcome.',
                             st: 'U amohetse qeto ena.' },                                    /* CHECK */
    'dispute.waiting_them':{ en: 'Waiting for the other person to accept.',
                             st: 'Ho emetsoe motho e mong hore a amohele.' },                 /* CHECK */
    'dispute.closed_on':   { en: 'Settled on {date}, by both.',
                             st: 'E rarollotsoe ka {date}, ka bobeli.' },                     /* CHECK */
    'dispute.count_only':  { en: 'Other people see only that a dispute exists and whether it was settled — never what was said.',
                             st: 'Batho ba bang ba bona feela hore ho na le qabang le hore na e rarollotsoe — ha ba bone se builoeng.' }, /* CHECK */
    'dispute.k.not_done':      { en: 'The work was not done',      st: 'Mosebetsi ha oa etsoa' },        /* CHECK */
    'dispute.k.done_badly':    { en: 'The work was done badly',    st: 'Mosebetsi o entsoe hampe' },     /* CHECK */
    'dispute.k.damage':        { en: 'Something was damaged',      st: 'Ho na le se senyehileng' },      /* CHECK */
    'dispute.k.late':          { en: 'It was late',                st: 'E ile ea lieha' },               /* CHECK */
    'dispute.k.not_returned':  { en: 'It was not brought back',    st: 'Ha ea khutlisoa' },              /* CHECK */
    'dispute.k.not_paid':      { en: 'I was not paid',             st: 'Ha kea lefuoa' },                /* CHECK */
    'dispute.k.overcharged':   { en: 'I was charged too much',     st: 'Ke lefisitsoe ho feta tekano' }, /* CHECK */
    'dispute.k.other':         { en: 'Something else',             st: 'Ho hong' },
    'dispute.resolved':    { en: 'settled',               st: 'e rarollotsoe' },             /* CHECK */
    'notif.dispute_raised':{ en: '{who} has raised something about a job you did together. Your side has not been heard yet.',
                             st: '{who} o hlahisitse ntho e mabapi le mosebetsi oo le o entseng hammoho. Lehlakore la hao ha le so utloahale.' }, /* CHECK */
    'notif.dispute_statement':{ en: '{who} has written their side. Yours is the next word.',
                             st: '{who} o ngotse lehlakore la hae. Lentsoe le latelang ke la hao.' }, /* CHECK */
    'notif.dispute_outcome':{ en: 'An outcome has been put forward and is waiting on you.',
                             st: 'Qeto e beiloe, e emetse uena.' },                     /* CHECK */
    'notif.dispute_resolved':{ en: 'That was settled — both of you accepted the outcome.',
                             st: 'Seo se rarollotsoe — ka bobeli le amohetse qeto.' },   /* CHECK */
    'notif.photo_attached':{ en: 'A photograph was added to the record.',
                             st: 'Setšoantšo se kentsoe tlalehong.' },                   /* CHECK */
    'notif.none':          { en: 'Nothing new.',           st: 'Ha ho letho le lecha.' },
    'notif.title':         { en: 'What has happened',      st: 'Se etsahetseng' },             /* CHECK */

    /* ====================================================================
       THE SHARED SURFACE — every label, state and refusal the three apps have
       in common. Written in one voice on purpose: Jakote reviews one file, not
       four, and a term translated two ways across two apps reads as two
       different things to someone who speaks the language.

       Nearly everything below is marked CHECK. I am not a native speaker and
       this is a careful first pass, not a finished translation.
       ==================================================================== */

    /* ---- doing things ---- */
    'app.preview.offline': { en: 'No signal — and no server either. This is still a preview on this device.',
                             st: 'Ha ho letšoao — ebile ha ho seva. Ena e ntse e le pontšo mochining ona.' }, /* CHECK */
    'claim.deviceonly':    { en: '— but only on this device. Nothing was sent, because no server is connected.',
                             st: '— empa feela mochining ona. Ha ho letho le rometsoeng, hobane ha ho seva se hokahantsoeng.' }, /* CHECK */
    'i18n.englishonly':    { en: '(English only — not yet written in Sesotho.)',
                             st: '(Senyesemane feela — ha e e-s\u2019o ngoloe ka Sesotho.)' }, /* CHECK */
    'rec.nothing_yet':     { en: 'Nothing recorded yet',      st: 'Ha ho letho le ngolisitsoeng' }, /* CHECK */
    'pitso.rec.unknown':   { en: 'The record could not be checked.', st: 'Rekoto ha ea ka ea hlahlojoa.' }, /* CHECK */
    'desk.reports':        { en: 'Reports',                st: 'Litlaleho' },                    /* CHECK */
    'desk.reports_none':   { en: 'Nothing has been reported, or this account is not on the desk. Row level security returns nothing to someone who is not staff, so those look the same from here.',
                             st: 'Ha ho letho le tlalehiloeng, kapa ak\u2019haonto ena ha e tafoleng.' }, /* CHECK */
    'desk.reports_n':      { en: '{n} reported',               st: 'Tse {n} tse tlalehiloeng' },     /* CHECK */
    'desk.reports_note':   { en: 'What people said is shown here and nowhere else. A stranger only ever sees a count, and never the words. Two reports are an opinion; they are not a finding.',
                             st: 'Seo batho ba se buileng se bonts\u2019oa mona feela. Mojaki o bona palo feela, e seng mantsoe.' }, /* CHECK */
    'desk.reports_count':  { en: '{n} report(s)',              st: 'Litlaleho tse {n}' },            /* CHECK */
    'desk.reports_open':   { en: '{n} still open',             st: 'Tse {n} li ntse li butsoe' },    /* CHECK */
    'desk.taken_down':     { en: 'Taken down.',                st: 'E tlositsoe.' },                 /* CHECK */
    'desk.takedown_why':   { en: 'Why it is coming down. The person it happens to reads this, so write it for them.',
                             st: 'Lebaka la ho e tlosa. Motho eo ho etsahalang ho eena o bala sena.' }, /* CHECK */
    'desk.take_down':      { en: 'Take it down',               st: 'E tlose' },                      /* CHECK */
    'rec.nothing_to_check': { en: 'There is nothing in the record yet, so there is nothing to check. Entries appear here as work is done.',
                             st: 'Ha ho letho tlalehong ho fihlela joale, kahoo ha ho letho le hlahlojoang. Litlaleho li hlaha mona ha mosebetsi o etsoa.' }, /* CHECK */
    'rec.server_checked':  { en: 'The server checked the whole record. You can see only your own entries.',
                             st: 'Seva se hlahlobile tlaleho eohle. Uena u bona litlaleho tsa hao feela.' }, /* CHECK */
    'rec.could_not_ask':   { en: 'Could not ask the server: {why}',
                             st: 'Ho hlolehile ho botsa seva: {why}' }, /* CHECK */
    'date.missing':        { en: 'Put in the {what}.',        st: 'Kenya {what}.' },                /* CHECK */
    'date.shape':          { en: 'That {what} is not a date.', st: '{what} eo hase letsatsi.' },      /* CHECK */
    'date.future':        { en: 'The {what} is {date}, which has not happened yet. A record is of something already done.',
                             st: '{what} ke {date}, e e-s\u2019o etsahale. Tlaleho ke ea se etsahetseng.' }, /* CHECK */
    'date.past':          { en: 'The {what} is {date}, which has already passed. Choose a date still to come.',
                             st: '{what} ke {date}, e se e fetile. Khetha letsatsi le tlang.' },      /* CHECK */
    'date.tooOld':        { en: 'The {what} is {date}, which is before this platform existed. Check the year.',
                             st: '{what} ke {date}, e pele sethala sena se e-ba teng. Hlahloba selemo.' }, /* CHECK */
    'date.what.payment':   { en: 'date paid',                   st: 'letsatsi la tefo' },             /* CHECK */
    'date.what.closes':    { en: 'closing date',                st: 'letsatsi la ho koala' },         /* CHECK */
    'date.what.due':       { en: 'delivery date',               st: 'letsatsi la ho fana' },          /* CHECK */
    'session.reloaded':    { en: 'You were signed out when the page reloaded. Sign in again to continue.',
                             st: 'U ntšitsoe ha leqephe le qala bocha. Kena hape ho tsoela pele.' }, /* CHECK */
    'ui.add':              { en: 'Add',                   st: 'Kenya' },
    'ui.edit':             { en: 'Change',                st: 'Fetola' },
    'ui.remove':           { en: 'Remove',                st: 'Tlosa' },
    'ui.confirm':          { en: 'Confirm',               st: 'Netefatsa' },          /* CHECK */
    'ui.accept':           { en: 'Accept',                st: 'Amohela' },
    'ui.decline':          { en: 'Decline',               st: 'Hana' },
    'ui.withdraw':         { en: 'Withdraw',              st: 'Hulela morao' },       /* CHECK */
    'ui.share':            { en: 'Share',                 st: 'Arolelana' },          /* CHECK */
    'ui.print':            { en: 'Print',                 st: 'Hatisa' },             /* CHECK */
    'ui.copy':             { en: 'Copy',                  st: 'Kopitsa' },            /* CHECK */
    'ui.copied':           { en: 'Copied',                st: 'E kopitsitsoe' },      /* CHECK */
    'ui.start_one':        { en: 'Start one',             st: 'Qala e ʼngoe' },       /* CHECK */
    'ui.nothing_yet':      { en: 'Nothing yet.',          st: 'Ha ho letho hajoale.' },
    'ui.more':             { en: 'More',                  st: 'Tse ling' },
    'ui.back_to_list':     { en: 'Back to the list',      st: 'Khutlela lethathamong' }, /* CHECK */
    'ui.optional':         { en: 'optional',              st: 'ha e tlamehe' },       /* CHECK */
    'ui.required':         { en: 'needed',                st: 'ea hlokahala' },       /* CHECK */

    /* ---- filters and lists ---- */
    'ui.all_districts':    { en: 'All districts',         st: 'Litereke tsohle' },    /* CHECK */
    'ui.all_categories':   { en: 'All categories',        st: 'Mefuta eohle' },       /* CHECK */
    'ui.all_trades':       { en: 'Any trade',             st: 'Mosebetsi ofe kapa ofe' }, /* CHECK */
    'ui.category':         { en: 'Category',              st: 'Mofuta' },             /* CHECK */
    'ui.description':      { en: 'Description',           st: 'Tlhaloso' },           /* CHECK */
    'ui.condition':        { en: 'Condition',             st: 'Boemo' },              /* CHECK */
    'ui.note':             { en: 'Note',                  st: 'Tlhokomeliso' },       /* CHECK */
    'ui.amount':           { en: 'Amount',                st: 'Palo' },
    'ui.date':             { en: 'Date',                  st: 'Letsatsi' },
    'ui.from':             { en: 'From',                  st: 'Ho tloha' },
    'ui.to':               { en: 'To',                    st: 'Ho isa' },

    /* ---- documents and the desk ---- */
    'doc.issued_by':       { en: 'Issued by',             st: 'E fanoe ke' },         /* CHECK */
    'doc.issued_on':       { en: 'Issued on',             st: 'E fanoe ka' },         /* CHECK */
    'doc.expires_on':      { en: 'Expires on',            st: 'E fela ka' },          /* CHECK */
    'doc.no_expiry':       { en: 'Leave blank if it does not expire.',
                             st: 'Tlohela ho se letho haeba e sa fele.' },            /* CHECK */
    'doc.identity_ok':     { en: 'Identity verified',     st: 'Boitsebiso bo netefalitsoe' }, /* CHECK */
    'doc.ownership_ok':    { en: 'Ownership verified',    st: 'Bong ba sona bo netefalitsoe' }, /* CHECK */
    'doc.none_verified':   { en: 'No verified documents', st: 'Ha ho litokomane tse netefalitsoeng' }, /* CHECK */
    'doc.private':         { en: 'It goes to a private store. Nobody sees the document itself — only whether it was accepted.',
                             st: 'E kenngoa sebakeng sa lekunutu. Ha ho motho ea bonang tokomane ka boeona — ho bonoa feela hore na e amohetsoe.' }, /* CHECK */
    'doc.file_types':      { en: 'A clear photograph or a PDF.',
                             st: 'Setšoantšo se hlakileng kapa PDF.' },               /* CHECK */

    /* ---- standing ---- */
    'rep.jobs_done':       { en: 'Jobs completed',        st: 'Mesebetsi e phethiloeng' }, /* CHECK */
    'rep.owner_standing':  { en: 'Owner standing',        st: 'Botumo ba mongʼa sona' }, /* CHECK */
    'rep.one_standing':    { en: 'One standing, three platforms. The same person, the same reviews, the same verified documents.',
                             st: 'Botumo bo le bong, lithala tse tharo. Motho a le mong, litlhahlobo tse tšoanang, litokomane tse tšoanang tse netefalitsoeng.' }, /* CHECK */
    'rep.review_rule':     { en: 'A review counts only if it came out of a job both sides marked completed.',
                             st: 'Tlhahlobo e balloa feela haeba e tsoa mosebetsing oo ka bobeli le o tšoaileng o phethiloe.' }, /* CHECK */

    /* ---- money, said the same way everywhere ---- */
    'money.between_you':   { en: 'Held between the two of you. This platform never touches it.',
                             st: 'Chelete e lula lipakeng tsa lōna ba babeli. Sethala sena ha se e ame.' }, /* CHECK */
    'money.code_needed':   { en: 'An {method} payment needs its transaction code.',
                             st: 'Tefo ea {method} e hloka khoutu ea eona.' },        /* CHECK */
    'money.cash_no_code':  { en: 'Cash has no code.',     st: 'Chelete e tšoereng ha e na khoutu.' }, /* CHECK */
    'money.rent_agreed':   { en: 'Rent agreed',           st: 'Hira e lumellanoeng' }, /* CHECK */
    'money.deposit':       { en: 'Deposit',               st: 'Tefo ea tšireletso' },  /* CHECK */
    'money.one_side':      { en: 'One side has confirmed', st: 'Lehlakore le leng le netefalitse' }, /* CHECK */
    'money.recorded':      { en: 'Recorded, not yet confirmed', st: 'E ngolisitsoe, e e-so netefatsoe' }, /* CHECK */

    /* ---- the outbox and the record ---- */
    'rec.trail':           { en: 'Record trail',          st: 'Tlaleho ea liketso' },  /* CHECK */
    'rec.chain_ok':        { en: 'The record is intact',  st: 'Tlaleho ha ea sentsoa' }, /* CHECK */
    'rec.chain_broken':    { en: 'The record has been tampered with',
                             st: 'Tlaleho e sentsoe' },                                /* CHECK */
    'rec.not_checked':     { en: 'Not checked',           st: 'Ha ea hlahlojoa' },      /* CHECK */
    'sync.not_saved':      { en: 'Not saved',             st: 'Ha ea bolokoa' },
    'sync.never_saved':    { en: 'This never reached the server',
                             st: 'Sena ha sea ka sa fihla sevareng' },                 /* CHECK */
    'sync.on_device':      { en: 'Held on this phone and sent when the server can be reached. Nothing is lost.',
                             st: 'E bolokiloe fonong ena, e romelloe ha seva se fumaneha. Ha ho letho le lahlehang.' }, /* CHECK */
    'sync.stale':          { en: 'Old figures',           st: 'Lipalo tsa khale' },     /* CHECK */

    /* ---- Mafisa ---- */
    'mafisa.calendar':     { en: 'Loan calendar',         st: 'Khalendara ea likalimo' }, /* CHECK */
    'mafisa.committed':    { en: 'Already committed',     st: 'E se e itlamile' },      /* CHECK */
    'mafisa.committed_days':{ en: 'Committed days',       st: 'Matsatsi a itlamiloeng' }, /* CHECK */
    'mafisa.handed_over':  { en: 'Handed over',           st: 'E fanoe' },              /* CHECK */
    'mafisa.taken_back':   { en: 'Taken back',            st: 'E khutlisitsoe' },       /* CHECK */
    'mafisa.clash':        { en: 'That period is already promised to somebody else.',
                             st: 'Nako eo e se e tšepisitsoe motho e mong.' },          /* CHECK */
    'mafisa.wrong_proof':  { en: 'A {category} needs a verified {required} that belongs to you.',
                             st: '{category} e hloka {required} e netefalitsoeng ea hao.' }, /* CHECK */
    'mafisa.identity_only':{ en: 'Nothing registers ownership of this, so what is proved is who you are — not that it is yours.',
                             st: 'Ha ho ngoliso ea bong ba ntho ena, kahoo ho pakoa hore na u mang — eseng hore ke ea hao.' }, /* CHECK */

    /* ---- Matsema ---- */
    'matsema.open_pools':  { en: 'Open pools',            st: 'Lihlopha tse buletsoeng' }, /* CHECK */
    'matsema.target':      { en: 'Target',                st: 'Sepheo' },
    'matsema.closing':     { en: 'Closing date',          st: 'Letsatsi la ho koala' },  /* CHECK */
    'matsema.pledged_only':{ en: 'Pledged but not confirmed', st: 'Ho itlamiloe empa ha ho so netefatsoe' }, /* CHECK */
    'matsema.confirmed_sub':{ en: 'Confirmed subtotal',   st: 'Palo e netefalitsoeng' }, /* CHECK */
    'matsema.members_counted':{ en: 'Members counted',    st: 'Litho tse baloang' },     /* CHECK */
    'matsema.can_supply':  { en: 'Can supply',            st: 'E ka fana' },             /* CHECK */
    'matsema.mark_delivered':{ en: 'Mark delivered',      st: 'Tšoaea e fanoe' },        /* CHECK */
    'matsema.already_delivered':{ en: 'Already delivered', st: 'E se e fanoe' },         /* CHECK */
    'matsema.contract_against':{ en: 'Contract against the confirmed figure: {n} {unit}.',
                             st: 'Etsa konteraka ho ea ka palo e netefalitsoeng: {n} {unit}.' }, /* CHECK */
    'matsema.no_money':    { en: 'A pool records commitments. It never holds money.',
                             st: 'Sehlopha se ngola boitlamo. Ha se tšoare chelete.' },  /* CHECK */

    /* ---- signing in ---- */
    'auth.code_sent':      { en: 'Code sent',             st: 'Khoutu e rometsoe' },     /* CHECK */
    'auth.check_email':    { en: 'Check your email for a six-digit code.',
                             st: 'Sheba imeile ea hao bakeng sa khoutu ea linomoro tse tšeletseng.' }, /* CHECK */
    'auth.signed_in_as':   { en: 'Signed in as',          st: 'U kene e le' },           /* CHECK */
    'auth.no_password':    { en: 'There is no password to type, and none to lose.',
                             st: 'Ha ho phasewete eo u lokelang ho e ngola, ebile ha ho e lahlehang.' }, /* CHECK */

    'matsema.member':      { en: 'member',                st: 'setho' },
    'matsema.members':     { en: 'members',               st: 'litho' }
  };

  const LANGS = ['en', 'st'];
  const LKEY = 'mend.lang';

  function detect() {
    try {
      const saved = localStorage.getItem(LKEY);
      if (saved && LANGS.indexOf(saved) >= 0) return saved;
    } catch (e) {}
    // A Sesotho browser locale should get Sesotho without being asked.
    const nav = (global.navigator && (global.navigator.language || '')) || '';
    if (/^st\b/i.test(nav)) return 'st';
    return 'en';
  }

  let lang = detect();

  /* Stamp it immediately. Only setLang() did this, so a reader who had already
     chosen Sesotho got a page declaring lang="en" to their screen reader until
     they toggled again — which is worse than never having offered the choice,
     because the page is now lying about itself in the language they cannot use.
     Found by the Matsema build. */
  if (global.document && global.document.documentElement) {
    global.document.documentElement.setAttribute('lang', lang);
  }

  const watchers = [];
  function onLang(fn) { watchers.push(fn); fn(lang); }

  function setLang(l) {
    if (LANGS.indexOf(l) < 0) return lang;
    lang = l;
    try { localStorage.setItem(LKEY, l); } catch (e) {}
    if (global.document) global.document.documentElement.setAttribute('lang', l);
    watchers.forEach(function (f) { try { f(lang); } catch (e) {} });
    return lang;
  }

  /* t('doc.verified')                      -> 'E netefalitsoe'
     t('rep.jobs', { n: 3 })                -> substitutes {n}
     A missing key returns the key itself rather than an empty string, so a gap
     is visible in testing instead of silently blank on someone's screen. */
  /* A STRING WITH NO SESOTHO FALLS BACK TO ENGLISH, AND MUST SAY SO.

     Some passages are marked ENGLISH-ONLY on purpose: they are dense reasoning
     a Mosotho should WRITE rather than have machine-translated, and several of
     them are the trust warnings — "nobody has verified who this convenor is".
     A tester pointed out the result: a farmer in Leribe reads the whole page in
     Sesotho except the sentence telling them the convenor is unchecked.

     Inventing Sesotho for those would be worse than leaving them. So the page
     keeps the English and marks it, which is the honest third option: the
     reader knows the passage has not been translated rather than wondering why
     the language button half-worked. */
  function t(key, vars) {
    const row = STR[key];
    const missing = !!(row && lang !== 'en' && row[lang] == null);
    let out = row ? (row[lang] != null ? row[lang] : row.en) : key;
    if (missing && key !== 'i18n.englishonly') out += ' ' + t('i18n.englishonly');
    if (vars) Object.keys(vars).forEach(function (k) {
      out = out.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
    });
    return out;
  }

  /* Which strings still need a native speaker. Printed by the test so the list
     never quietly becomes stale. */
  function needsReview() {
    return Object.keys(STR).filter(function (k) {
      return STR[k].st == null || STR[k].st === STR[k].en;
    });
  }

  /* Each app adds its OWN strings from its own file (apps/<name>/strings.js), so
     three people working in parallel never edit this one. Keys are namespaced by
     app; extending with a key that already exists is refused rather than
     silently winning, because a shared string quietly redefined by one app is a
     bug nobody notices until the wrong word is on someone's screen. */
  function extend(bundle) {
    const clashes = [];
    Object.keys(bundle).forEach(function (k) {
      if (STR[k]) { clashes.push(k); return; }
      STR[k] = bundle[k];
    });
    if (clashes.length && global.console) {
      console.warn('[i18n] refused to redefine existing keys:', clashes.join(', '));
    }
    return clashes;
  }

  global.MEND_I18N = { t: t, lang: function () { return lang; }, setLang: setLang,
                       onLang: onLang, LANGS: LANGS, strings: STR, needsReview: needsReview,
                       extend: extend };
})(window);
