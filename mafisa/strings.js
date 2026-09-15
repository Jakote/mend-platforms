/* ===========================================================================
   MAFISA — this app's own strings.
   Loaded AFTER core/i18n.js and BEFORE core/mend.js. Namespaced `mafisa.` so
   three apps never edit one shared file. MEND_I18N.extend() REFUSES a key that
   already exists rather than silently winning — a shared string quietly
   redefined by one app is a bug nobody notices until the wrong word is on
   somebody's screen. Anything that warns on load is fixed HERE, by reusing the
   shared key, not by editing core/i18n.js.

   ⚠️ SESOTHO NEEDS A NATIVE SPEAKER. Jakote — every line marked /* CHECK *​/ is
   my construction, not something I know to be right. Where I could not say a
   thing plainly in Sesotho it is LEFT IN ENGLISH and marked ENGLISH-ONLY: a
   wrong translation read by somebody who speaks the language is worse than an
   untranslated one.

   Refusals and errors come first on purpose. Being told "no" in a language you
   read poorly is the same as not being told.
   =========================================================================== */
(function (global) {
  'use strict';
  if (!global.MEND_I18N) return;

  global.MEND_I18N.extend({

    /* ---- REFUSALS — the register says no more often than it says yes ----- */
    'mafisa.refused':          { en: 'Refused — nothing was written',
                                 st: 'Ho hanoe — ha ho letho le ngotsoeng' },                                  /* CHECK */
    'mafisa.recorded':         { en: 'Recorded',                st: 'Ho ngoliloe' },                           /* CHECK */
    'mafisa.err.dates.both':   { en: 'Both the first and the last day are needed.',
                                 st: 'Letsatsi la pele le la ho qetela ka bobeli lea hlokahala.' },            /* CHECK */
    'mafisa.err.dates.order':  { en: 'The last day cannot fall before the first day.',
                                 st: 'Letsatsi la ho qetela le ke ke la ba pele ho la pele.' },                /* CHECK */
    'mafisa.err.dates.past':   { en: 'A loan cannot start in the past.',
                                 st: 'Kalimo e ke ke ea qala nakong e fetileng.' },                            /* CHECK */
    'mafisa.err.clash':        { en: 'The dates clash. This asset is already committed for part of that period, and two people cannot have the same thing on the same day.',
                                 st: 'Matsatsi aa thulana. Ntho ena e se e beheletsoe karolo ea nako eo, ʼme batho ba babeli ba ke ke ba ba le ntho e le ʼngoe ka letsatsi le le leng.' }, /* CHECK */
    'mafisa.err.nosignin':     { en: 'Nobody is signed in on this page, so nothing can be written to the register.',
                                 st: 'Ha ho motho ea keneng leqepheng lena, kahoo ha ho letho le ka ngoloang bukaneng.' }, /* CHECK */

    /* Settlement refusals. MEND.canSettle is the only place the RULE lives;
       these put its answer into Sesotho and change nothing about it. */
    'mafisa.settle.err.amount':  { en: 'Put in how much was paid.',
                                   st: 'Ngola hore na ho lefiloe bokae.' },                                    /* CHECK */
    'mafisa.settle.err.parties': { en: 'A payment can only be between the owner and the borrower on this loan.',
                                   st: 'Tefo e ka etsahala pakeng tsa mongʼa sona le ea alimang feela.' },      /* CHECK */
    'mafisa.settle.err.same':    { en: 'That is the same person on both sides.',
                                   st: 'Eo ke motho a le mong mahlakoreng ka bobeli.' },                        /* CHECK */
    'mafisa.settle.err.ref':     { en: 'A payment by {method} needs its transaction code — that code is the whole record.',
                                   st: 'Tefo ea {method} e hloka khoutu ea eona ea tefo — khoutu eo ke eona rekoto kaofela.' }, /* CHECK */
    'mafisa.settle.err.toomuch': { en: 'That is more than twice what was agreed. Check the amount.',
                                   st: 'Seo se feta habeli ho se lumellanoeng. Hlahloba palo.' },              /* CHECK */
    'mafisa.settle.err.nobody':  { en: 'Only the two people in this payment can confirm it.',
                                   st: 'Ke batho ba babeli ba tefo ena feela ba ka e netefatsang.' },          /* CHECK */

    /* ---- SETTLEMENT ------------------------------------------------------ */
    'mafisa.settle.heading':   { en: 'Payments recorded',       st: 'Litefo tse ngoliloeng' },                 /* CHECK */
    'mafisa.settle.record':    { en: 'Record a payment that was made',
                                 st: 'Ngola tefo e seng e entsoe' },                                           /* CHECK */
    'mafisa.settle.none':      { en: 'No payment has been recorded against this loan.',
                                 st: 'Ha ho tefo e ngoliloeng kalimong ena.' },                                /* CHECK */
    'mafisa.settle.nopay':     { en: 'Nothing is paid here. The register writes down a payment the two of you already made — on the phone, at the bank, or hand to hand.',
                                 st: 'Ha ho chelete e lefshoang mona. Bukana e ngola tefo eo le seng le e entse — mohaleng, bankeng, kapa ka matsoho.' }, /* CHECK */
    'mafisa.settle.who':       { en: 'Who paid whom',           st: 'Ke mang ea lefileng mang' },              /* CHECK */
    'mafisa.settle.paidto':    { en: '{payer} paid {payee}',    st: '{payer} o lefile {payee}' },              /* CHECK */
    'mafisa.settle.method':    { en: 'How it was paid',         st: 'Tefo e entsoe joang' },                   /* CHECK */
    'mafisa.settle.amount':    { en: 'How much, in maloti',     st: 'Bokae, ka maloti' },                      /* CHECK */
    'mafisa.settle.date':      { en: 'Day it was paid',         st: 'Letsatsi la tefo' },                      /* CHECK */
    'mafisa.settle.ref':       { en: 'Transaction code',        st: 'Khoutu ea tefo' },                        /* CHECK */
    'mafisa.settle.ref.need':  { en: 'Required. It is the code in the message that came to your phone.',
                                 st: 'Ea hlokahala. Ke khoutu e molaetseng o tlileng fonong ea hao.' },         /* CHECK */
    'mafisa.settle.ref.cash':  { en: 'Cash has no code, so leave this empty.',
                                 st: 'Chelete e matsohong ha e na khoutu, kahoo e siee e se na letho.' },       /* CHECK */
    'mafisa.settle.note':      { en: 'What it was for',         st: 'E ne e le ea eng' },                      /* CHECK */
    'mafisa.settle.note.hint': { en: 'Rent, deposit, deposit returned — say which, because the two of you will want to know a year from now.',
                                 st: 'Rente, tefo ea tšireletso, kapa ho khutlisa tefo ea tšireletso — bolela hore na ke efe, hobane selemo se tlang le tla batla ho tseba.' }, /* CHECK */
    'mafisa.settle.save':      { en: 'Write the payment down',  st: 'Ngola tefo' },                            /* CHECK */
    'mafisa.settle.state.new': { en: 'Recorded. Neither party has confirmed it.',
                                 st: 'E ngoliloe. Ha ho le a mong ea e netefalitseng.' },                      /* CHECK */
    'mafisa.settle.confirm':   { en: 'Confirm my side',         st: 'Netefatsa lehlakore la ka' },             /* CHECK */
    'mafisa.settle.mine.done': { en: 'You confirmed this. {name} has not.',
                                 st: 'U netefalitse sena. {name} ha a so netefatse.' },                        /* CHECK */
    'mafisa.settle.theirs.done': { en: '{name} confirmed this. You have not.',
                                 st: '{name} o netefalitse sena. Uena ha u so netefatse.' },                   /* CHECK */
    'mafisa.settle.onlyown':   { en: 'Each party confirms only their own side. Confirming for the other one would make the record worthless.',
                                 st: 'Motho e mong le e mong o netefatsa lehlakore la hae feela. Ho netefatsa molemong oa e mong ho ka etsa hore rekoto e se be le thuso.' }, /* CHECK */
    'mafisa.settle.total':     { en: 'Confirmed by both sides: {total}. Rent agreed on this loan: {agreed}.',
                                 st: 'E netefalitsoeng ke mahlakore ka bobeli: {total}. Rente e lumellanoeng kalimong ena: {agreed}.' }, /* CHECK */
    'mafisa.settle.written':   { en: 'Written into the record. It is not settled until both of you have confirmed it.',
                                 st: 'E ngoliloe rekotong. Ha e so lefshoe ka botlalo ho fihlela le e netefalitse ka bobeli.' }, /* CHECK */
    'mafisa.settle.confirmed': { en: 'Your side is confirmed.', st: 'Lehlakore la hao le netefalitsoe.' },     /* CHECK */
    'mafisa.settle.toosoon':   { en: 'A payment can be recorded once the owner has agreed the loan. This one has not reached that yet.',
                                 st: 'Tefo e ka ngoloa ha mongʼa sona a se a lumetse kalimo. Ena ha e so fihle moo.' }, /* CHECK */

    'mafisa.method.mpesa':     { en: 'M-Pesa',                  st: 'M-Pesa' },
    'mafisa.method.ecocash':   { en: 'EcoCash',                 st: 'EcoCash' },
    'mafisa.method.cash':      { en: 'Cash',                    st: 'Chelete e matsohong' },                   /* CHECK */
    'mafisa.method.bank_transfer': { en: 'Bank transfer',       st: 'Ho romela ka banka' },                    /* CHECK */
    'mafisa.method.other':     { en: 'Something else',          st: 'Ho hong' },                               /* CHECK */

    /* ---- SHARE AND PRINT ------------------------------------------------- */
    'mafisa.share':            { en: 'Share',                   st: 'Arolelana' },                             /* CHECK */
    'mafisa.print':            { en: 'Print',                   st: 'Hatisa' },                                /* CHECK */
    'mafisa.print.loan':       { en: 'Print this to sign',      st: 'Hatisa sena hore le se saene' },           /* CHECK */
    'mafisa.share.copied':     { en: 'Copied. Paste it where you need it.',
                                 st: 'E kopitsitsoe. E kenye moo u e batlang teng.' },                          /* CHECK */
    'mafisa.share.manual':     { en: 'This browser would not copy it. Hold on the text, copy it, and paste it where you need it.',
                                 st: 'Sebatli sena ha sea ka sa e kopitsa. Tšoara mongolo, o kopitse, ebe u o kenya moo u o batlang teng.' }, /* CHECK */
    'mafisa.share.shared':     { en: 'Sent to the app you chose.',
                                 st: 'E rometsoe app eo u e khethileng.' },                                     /* CHECK */
    'mafisa.share.whatsapp':   { en: 'Open WhatsApp with this',  st: 'Bula WhatsApp ka sena' },                 /* CHECK */
    'mafisa.share.heading':    { en: 'The record as plain text', st: 'Rekoto e le mongolo feela' },             /* CHECK */

    /* ---- HEADINGS, LABELS, BUTTONS -------------------------------------- */
    'mafisa.tab.register':     { en: 'The register',            st: 'Bukana ea ngoliso' },
    'mafisa.tab.new':          { en: 'Register an asset',       st: 'Ngolisa ntho' },                          /* CHECK */
    'mafisa.tab.docs':         { en: 'My documents',            st: 'Litokomane tsa ka' },                     /* CHECK */
    'mafisa.tab.mine':         { en: 'My records',              st: 'Lirekoto tsa ka' },                       /* CHECK */
    'mafisa.loan.record':      { en: 'Loan record',             st: 'Rekoto ea kalimo' },                      /* CHECK */
    'mafisa.loan.open':        { en: 'Open the loan record',    st: 'Bula rekoto ea kalimo' },                  /* CHECK */
    'mafisa.asset.record':     { en: 'Asset record',            st: 'Rekoto ea ntho' },                        /* CHECK */
    'mafisa.borrower':         { en: 'Borrower',                st: 'Ea alimang' },                            /* CHECK */
    'mafisa.period':           { en: 'Period',                  st: 'Nako' },                                  /* CHECK */
    'mafisa.days':             { en: 'Days',                    st: 'Matsatsi' },
    'mafisa.rent':             { en: 'Rent',                    st: 'Rente' },                                 /* CHECK */
    'mafisa.dailyrate':        { en: 'Daily rate',              st: 'Theko ea letsatsi' },                     /* CHECK */
    'mafisa.state':            { en: 'State',                   st: 'Boemo' },                                 /* CHECK */
    'mafisa.condition':        { en: 'Condition',               st: 'Boemo ba eona' },                         /* CHECK */
    'mafisa.category':         { en: 'Category',                st: 'Mofuta' },                                /* CHECK */
    'mafisa.description':      { en: 'Description',             st: 'Tlhaloso' },                              /* CHECK */
    'mafisa.district':         { en: 'District',                st: 'Setereke' },                              /* CHECK */
    'mafisa.entered':          { en: 'Entered',                 st: 'E kentsoe' },                             /* CHECK */
    /* NOT 'Boemo ba eona' — that is the CONDITION of the thing, and the asset
       record shows both fields one above the other. Two different questions
       cannot carry the same label; in English they read as Status and
       Condition, and in Sesotho they have to differ too. */
    'mafisa.status':           { en: 'Status',                  st: 'Boemo bukaneng' },                        /* CHECK */
    'mafisa.in_register':      { en: 'In the register',         st: 'E bukaneng' },                            /* CHECK */
    'mafisa.held_back':        { en: 'Held back',               st: 'E boloketsoe morao' },                    /* CHECK */
    'mafisa.open_record':      { en: 'Open the record',         st: 'Bula rekoto' },                           /* CHECK */
    'mafisa.back_mine':        { en: 'My records',              st: 'Lirekoto tsa ka' },                       /* CHECK */
    'mafisa.norecord':         { en: 'No such record',          st: 'Ha ho rekoto e joalo' },                  /* CHECK */

    /* =====================================================================
       CONDITION PHOTOGRAPHS

       A bakkie goes out clean and comes back with a cracked light, and two
       people remember it differently. That is the argument this register was
       built for, and a photograph taken on the day is the only thing that
       ends it. Both sides photograph it going out and coming back; neither
       can change what they attached afterwards.
       ===================================================================== */
    'mafisa.cond.heading':     { en: 'Condition, photographed',
                                 st: 'Boemo, se nkiloeng ka senepe' },                                         /* CHECK */
    'mafisa.cond.sub':         { en: 'Both sides, both days',   st: 'Mahlakore ka bobeli, matsatsi ka bobeli' },/* CHECK */
    'mafisa.cond.out':         { en: 'The day it went out',     st: 'Letsatsi leo e tsoileng ka lona' },       /* CHECK */
    'mafisa.cond.in':          { en: 'The day it came back',    st: 'Letsatsi leo e khutlileng ka lona' },     /* CHECK */
    'mafisa.cond.none':        { en: 'No photograph was taken.', st: 'Ha ho senepe se nkiloeng.' },            /* CHECK */
    'mafisa.cond.add_out':     { en: 'Add a photograph of it going out',
                                 st: 'Kenya senepe sa eona ha e tsoa' },                                       /* CHECK */
    'mafisa.cond.add_in':      { en: 'Add a photograph of it coming back',
                                 st: 'Kenya senepe sa eona ha e khutla' },                                     /* CHECK */
    'mafisa.cond.caption':     { en: 'What the photograph shows',
                                 st: 'Senepe se bontša eng' },                                                 /* CHECK */
    'mafisa.cond.caption.hint':{ en: 'A few words — “left rear light”, “fuel gauge”, “the whole bakkie from the front”.',
                                 st: 'Mantsoe a seng makae — “lebone la morao ka letsohong le letšehali”, “sekala sa peterole”, “koloi kaofela ka pele”.' }, /* CHECK */
    'mafisa.cond.file':        { en: 'The photograph',          st: 'Senepe' },                                /* CHECK */
    /* The single most important sentence on this panel, and it is said BEFORE
       the file is chosen, not after it is sent. */
    'mafisa.cond.final':       { en: 'Once a photograph is attached here it cannot be changed or taken off. It is evidence: the other person will see it, and one of you may lean on it in an argument.',
                                 st: 'Ha senepe se se se kentsoe mona se ke ke sa fetoloa kapa sa tlosoa. Ke bopaki: motho e mong o tla se bona, ʼme e mong oa lona a ka itšetleha ka sona ha ho e-ba le qabang.' }, /* CHECK */
    'mafisa.cond.attach':      { en: 'Attach it',               st: 'E kenye' },                               /* CHECK */
    'mafisa.cond.attaching':   { en: 'Shrinking it and attaching…',
                                 st: 'Ho fokotsoa boholo ba sona ebe sea kenngoa…' },                          /* CHECK */
    'mafisa.cond.attached':    { en: 'The photograph is on the record',
                                 st: 'Senepe se rekotong' },                                                   /* CHECK */
    'mafisa.cond.attached.body': { en: 'It cannot be changed or removed now, by you or by anybody else.',
                                 st: 'Joale se ke ke sa fetoloa kapa sa tlosoa, ho sa natsoe hore na ke uena kapa ke mang.' }, /* CHECK */
    'mafisa.cond.by':          { en: 'Attached by {name}',      st: 'Se kentsoe ke {name}' },                  /* CHECK */
    /* recorded_out / recorded_in report when the SHUTTER went, which with an
       outbox can be days before the file leaves the phone. Saying which is the
       whole point: a photograph taken on the day of return and sent a week
       later is still a photograph of the day of return. */
    'mafisa.cond.taken':       { en: 'Taken {when}',            st: 'Se nkiloe ka {when}' },                   /* CHECK */
    'mafisa.cond.reached':     { en: 'Reached the register {when}',
                                 st: 'Se fihlile bukaneng ka {when}' },                                        /* CHECK */
    'mafisa.cond.taken_not_sent': { en: 'The day shown is the day the photograph was TAKEN, not the day it reached the register. With no signal the two can be a week apart, and the day it was taken is the one that matters.',
                                 st: 'Letsatsi le bontšitsoeng ke letsatsi leo senepe se NKILOENG ka lona, e seng letsatsi leo se fihlileng bukaneng ka lona. Ha ho se na marang-rang a ka arohana ka beke, ʼme letsatsi la ho nka senepe ke lona la bohlokoa.' }, /* CHECK */
    'mafisa.cond.first_taken': { en: 'First photograph taken {when}',
                                 st: 'Senepe sa pele se nkiloe ka {when}' },                                   /* CHECK */
    'mafisa.cond.both':        { en: 'Both days were photographed. Neither of you can say the other recorded nothing.',
                                 st: 'Matsatsi ka bobeli a nkiloe ka linepe. Ha ho ea ka reng e mong ha aa ka a ngola letho.' }, /* CHECK */
    'mafisa.cond.onlyone':     { en: 'Only one of the two days was photographed. A disagreement about damage is far harder to settle from one side alone.',
                                 st: 'Ke letsatsi le le leng feela le nkiloeng ka senepe. Qabang ka tšenyo e thata haholo ho e rarolla ka lehlakore le le leng feela.' }, /* CHECK */
    'mafisa.cond.count':       { en: '{n} photographs',         st: 'Linepe tse {n}' },                        /* CHECK */
    'mafisa.cond.count1':      { en: '1 photograph',            st: 'Senepe se le seng' },                     /* CHECK */
    'mafisa.cond.shrunk':      { en: 'Shrunk on this phone to at most {edge} pixels before it was sent — a cracked light reads the same, and you pay for far less data.',
                                 st: 'Se fokolitsoe fonong ena ho isa ho li-pixel tse {edge} pele se romeloa — lebone le petsohileng le sa ntse le bonahala, ʼme u lefa data e nyenyane haholo.' }, /* CHECK */
    /* Honest about what this build can and cannot show back. */
    'mafisa.cond.noimage':     { en: 'The picture itself is not on this screen. This page can show a photograph back only while the page stays open; reloaded, what remains is the record of it — who attached it, when it was taken, and what they said it shows.',
                                 st: 'Setšoantšo ka bosona ha se skirineng sena. Leqephe lena le ka bontša senepe feela ha leqephe le ntse le buletsoe; ha le khutlisitsoe, ho setse rekoto ea sona feela — hore na ke mang ea se kentseng, se nkiloe neng, le hore o itse se bontša eng.' },
  'mafisa.cond.nolink':   { en: 'The photograph is on the register but could not be opened just now. {why}',
                            st: 'Setšoantšo se ngolisitsoe empa ha se a khona ho buloa hajoale. {why}' }, /* CHECK */ /* CHECK */
    'mafisa.cond.toosoon':     { en: 'A photograph can be attached once the owner has agreed the loan. This one has not reached that yet.',
                                 st: 'Senepe se ka kenngoa ha mongʼa sona a se a lumetse kalimo. Ena ha e so fihle moo.' }, /* CHECK */
    'mafisa.cond.notparty':    { en: 'Only the owner and the borrower can attach a photograph to this loan.',
                                 st: 'Ke mongʼa sona le ea alimang feela ba ka kenyang senepe kalimong ena.' }, /* CHECK */
    'mafisa.cond.err.nofile':  { en: 'Choose a photograph first.', st: 'Khetha senepe pele.' },                 /* CHECK */
    'mafisa.cond.err.type':    { en: 'That file is not a photograph.',
                                 st: 'Faele eo hase senepe.' },                                                /* CHECK */
    'mafisa.cond.why':         { en: 'A bakkie goes out clean and comes back with a cracked light, and the two of you remember the day differently. A photograph taken on the day is the only thing that settles that, so both of you can add one, on the way out and on the way back.',
                                 st: 'Koloi e tsoa e hloekile ʼme e khutle e e-na le lebone le petsohileng, ʼme lona ka bobeli le hopola letsatsi leo ka mokhoa o fapaneng. Senepe se nkiloeng ka letsatsi leo ke sona feela se rarollang seo, kahoo ka bobeli le ka kenya sa lona, ha e tsoa le ha e khutla.' }, /* CHECK */

    /* =====================================================================
       DISPUTES

       The platform does not adjudicate. MEND GROUP is not a court, holds no
       money, and decides nothing. What it does is hold both accounts, dated,
       neither revisable once given — which is what ends most disagreements
       between people who have to keep living in the same district.
       ===================================================================== */
    'mafisa.disp.heading':     { en: 'If the two of you disagree',
                                 st: 'Haeba lona ka bobeli le sa lumellane' },                                  /* CHECK */
    'mafisa.disp.sub':         { en: 'Both accounts, neither judged',
                                 st: 'Litlaleho ka bobeli, ha ho e ahluloang' },                                /* CHECK */
    'mafisa.disp.none':        { en: 'Nothing has been raised on this loan.',
                                 st: 'Ha ho letho le hlahisitsoeng kalimong ena.' },                            /* CHECK */
    'mafisa.disp.record':      { en: 'Dispute record',          st: 'Rekoto ea qabang' },                      /* CHECK */
    'mafisa.disp.raised_line': { en: '{name} raised this on {date}, about {against}.',
                                 st: '{name} o hlahisitse sena ka {date}, mabapi le {against}.' },              /* CHECK */
    'mafisa.disp.accounts':    { en: 'Both accounts, in the order they were given',
                                 st: 'Litlaleho ka bobeli, ka tatellano eo li fanoeng ka eona' },               /* CHECK */
    'mafisa.disp.yours':       { en: 'your account',            st: 'tlaleho ea hao' },                        /* CHECK */
    'mafisa.disp.write':       { en: 'Your account of what happened',
                                 st: 'Tlaleho ea hao ea se etsahetseng' },                                      /* CHECK */
    'mafisa.disp.write.hint':  { en: 'Say what you saw and when. Do not argue with the other person here — write down your own account, because that is what the register keeps.',
                                 st: 'Bolela seo u se boneng le hore na neng. U se ke ua ngangisana le motho e mong mona — ngola tlaleho ea hao, hobane ke eona eo bukana e e bolokang.' }, /* CHECK */
    'mafisa.disp.send':        { en: 'Enter it in the record',  st: 'E kenye rekotong' },                      /* CHECK */
    'mafisa.disp.raise':       { en: 'Raise it on this loan',   st: 'E hlahise kalimong ena' },                /* CHECK */
    'mafisa.disp.amount.hint': { en: 'Leave it empty if no amount is in question.',
                                 st: 'E siee e le feela haeba ho se na chelete e buisanoang.' },                /* CHECK */
    'mafisa.disp.err.short':   { en: 'Write a sentence or two. A single word is not an account of anything.',
                                 st: 'Ngola polelo e le ʼngoe kapa tse peli. Lentsoe le le leng feela hase tlaleho ea letho.' }, /* CHECK */
    'mafisa.disp.err.nobody':  { en: 'Only the two people on this loan can raise something about it.',
                                 st: 'Ke batho ba babeli ba kalimo ena feela ba ka hlahisang taba ka eona.' },  /* CHECK */
    'mafisa.disp.err.tooearly':{ en: 'This loan has not been agreed yet, so there is nothing to disagree about.',
                                 st: 'Kalimo ena ha e so lumellanoe, kahoo ha ho letho leo ho ka ngangisanoang ka lona.' }, /* CHECK */
    'mafisa.disp.noeng':       { en: 'This loan has no engagement record behind it, and a dispute is held against the engagement rather than against the loan. Nothing can be attached to it.',
                                 st: 'Kalimo ena ha e na rekoto ea tumellano ka morao, ʼme qabang e bolokoa tumellanong e seng kalimong. Ha ho letho le ka kenngoang ho eona.' }, /* CHECK */
    'mafisa.disp.outcome.none':{ en: 'No outcome has been written yet. Either of you can write one, and it closes only when both of you have accepted it.',
                                 st: 'Ha ho sephetho se ngotsoeng. Mong le e mong oa lona a ka ngola se seng, ʼme se koaloa feela ha bobeli ba lona ba se amohetse.' }, /* CHECK */
    'mafisa.disp.outcome.write':{ en: 'Write what the two of you have agreed',
                                 st: 'Ngola seo lona ka bobeli le lumellaneng ka sona' },                       /* CHECK */
    'mafisa.disp.outcome.propose': { en: 'Write it and accept my side',
                                 st: 'E ngole ʼme u amohele lehlakore la ka' },                                /* CHECK */
    'mafisa.disp.outcome.accept': { en: 'Accept this outcome',  st: 'Amohela sephetho sena' },                 /* CHECK */
    'mafisa.disp.outcome.final': { en: 'Accepting is final and it is recorded under your name. Read what is written above before you do it — it is not changed after this, and accepting is not the same as being found right.',
                                 st: 'Ho amohela ha ho khutliseloe morao ʼme ho ngoloa tlas\u2019a lebitso la hao. Bala se ngotsoeng ka holimo pele u etsa joalo — ha se fetohe ka mor\u2019a moo, ʼme ho amohela hase ho fumanoa u nepile.' }, /* CHECK */
    'mafisa.disp.outcome.written_by': { en: 'Written by {name} on {date}',
                                 st: 'E ngotsoe ke {name} ka {date}' },                                        /* CHECK */
    'mafisa.disp.outcome.mine': { en: 'You have accepted it. {name} has not yet.',
                                 st: 'U e amohetse. {name} ha a so e amohele.' },                               /* CHECK */
    'mafisa.disp.outcome.theirs': { en: '{name} has accepted it. You have not yet.',
                                 st: '{name} o e amohetse. Uena ha u so e amohele.' },                          /* CHECK */
    'mafisa.disp.closed':      { en: 'Closed by both of you',   st: 'E koetsoe ke lona ka bobeli' },           /* CHECK */
    'mafisa.disp.photos':      { en: 'The condition photographs on this loan',
                                 st: 'Linepe tsa boemo kalimong ena' },                                        /* CHECK */
    'mafisa.disp.photos.line': { en: '{out} from the day it went out, {in} from the day it came back. They are above, on this same page.',
                                 st: 'Tse {out} tsa letsatsi leo e tsoileng ka lona, tse {in} tsa letsatsi leo e khutlileng ka lona. Li ka holimo, leqepheng lena lena.' }, /* CHECK */
    'mafisa.disp.photos.none': { en: 'No condition photograph was taken on either day, so there is nothing on this record but the two accounts.',
                                 st: 'Ha ho senepe sa boemo se nkiloeng letsatsing le leng la ʼona, kahoo rekotong ena ho na le litlaleho tse peli feela.' }, /* CHECK */
    'mafisa.disp.standing':    { en: 'Disputes on this name',   st: 'Liqabang lebitsong lena' },               /* CHECK */
    'mafisa.disp.standing.line': { en: '{open} open, {resolved} settled',
                                 st: 'Tse {open} tse buletsoeng, tse {resolved} tse rarollotsoeng' },           /* CHECK */
    'mafisa.disp.standing.clean': { en: 'Nothing has ever been raised against this name.',
                                 st: 'Ha ho letho le kileng la hlahisoa khahlanong le lebitso lena.' },         /* CHECK */
    'mafisa.disp.raised_state':{ en: 'Raised, no answer yet',   st: 'E hlahisitsoe, ha ho karabo' },           /* CHECK */
    'mafisa.disp.answered_state': { en: 'Both have written',    st: 'Ka bobeli ba ngotse' },                   /* CHECK */
    /* What somebody who is neither of the two parties may read on this page. */
    'mafisa.disp.stranger':    { en: 'Something was raised on this loan. What either of them wrote is between the two of them, and this page does not show it to anybody else.',
                                 st: 'Ho hlahisitsoe taba kalimong ena. Seo mong le e mong oa bona a se ngotseng ke sa bona ka bobeli, ʼme leqephe lena ha le se bontše motho e mong.' }, /* CHECK */
    'mafisa.disp.stranger.count': { en: '{open} open, {resolved} settled, on this loan',
                                 st: 'Tse {open} tse buletsoeng, tse {resolved} tse rarollotsoeng, kalimong ena' }, /* CHECK */

    /* ---- THE STATE OF A LOAN, and the stamps that carry it -------------- */
    'mafisa.st.requested':     { en: 'Requested',               st: 'E kopiloe' },                             /* CHECK */
    'mafisa.st.agreed':        { en: 'Agreed',                  st: 'Ho lumellanoe' },                         /* CHECK */
    'mafisa.st.out':           { en: 'Out',                     st: 'E tsoile' },                              /* CHECK */
    'mafisa.st.returned':      { en: 'Returned',                st: 'E khutlisitsoe' },                        /* CHECK */
    'mafisa.st.disputed':      { en: 'Disputed',                st: 'Ho na le qabang' },                       /* CHECK */
    'mafisa.st.cancelled':     { en: 'Cancelled',               st: 'E hlakotsoe' },                           /* CHECK */

    'mafisa.stamp.owned':      { en: 'Ownership verified',      st: 'Bongʼa sona bo netefalitsoe' },           /* CHECK */
    'mafisa.stamp.identified': { en: 'Owner identified · ownership not proved',
                                 st: 'Mongʼa sona o tsejoa · bongʼa sona ha boa pakoa' },                      /* CHECK */
    'mafisa.stamp.noproof':    { en: 'Not entered — proof missing',
                                 st: 'Ha ea kenngoa — bopaki ha bo eo' },                                      /* CHECK */
    'mafisa.stamp.heldback':   { en: 'Held back by the owner',  st: 'E boloketsoe morao ke mongʼa sona' },     /* CHECK */

    /* ---- THE REGISTER SCREEN -------------------------------------------- */
    'mafisa.reg.count':        { en: '{listed} of {total} entered',
                                 st: 'Tse {listed} ho tse {total} tse kentsoeng' },                            /* CHECK */
    'mafisa.reg.nomatch':      { en: 'Nothing in the register matches that.',
                                 st: 'Ha ho letho bukaneng le tsamaellanang le seo.' },                        /* CHECK */
    'mafisa.reg.held.heading': { en: 'Recorded, not entered',   st: 'Li ngolisitsoe, ha lia kenngoa' },        /* CHECK */
    'mafisa.reg.held.count':   { en: '{n} held back',           st: 'Tse {n} tse boloketsoeng morao' },        /* CHECK */
    'mafisa.reg.whyheld':      { en: 'Why it is held back',     st: 'Lebaka leo e boloketsoeng morao' },       /* CHECK */
    'mafisa.reg.heldok':       { en: 'Nothing is missing. The proof the register asks for is on file; the owner has simply not entered it.',
                                 st: 'Ha ho letho le sieo. Bopaki boo bukana e bo batlang bo teng; mongʼa sona ha a so e kenye feela.' }, /* CHECK */
    /* ENGLISH-ONLY, deliberately. These two paragraphs are the register's
       ARGUMENT for the way it checks things, not an instruction. They need a
       Mosotho to write them, not to translate them. */
    'mafisa.reg.note':         { en: 'An asset appears here only once the register has checked what it can check, and it does not check the same thing for everything. For a bakkie, a tractor, land or premises there is a registry to appeal to, so a document of THAT PARTICULAR KIND must be verified and in the owner\u2019s name. For a drill or an overlocker there is no registry anywhere, so ownership is not claimed at all \u2014 what is verified there is WHO THE OWNER IS. The stamp says which of the two it was. No document is ever shown, only the verdict.',
                                 st: null },                                                                   /* ENGLISH-ONLY */
    /* One string with a placeholder, not two fragments joined in the markup:
       Sesotho puts the clause somewhere else and a half-sentence cannot be
       translated at all. Every split sentence in this file was rebuilt this
       way. */
    'mafisa.reg.held.note':    { en: 'These assets exist on the register\u2019s books and cannot be borrowed. Some are missing the proof the register requires; others have it and their owner has not entered them. Both are shown, with the reason, rather than quietly dropped. These are the register’s own rules, applied the same way here as they are where the records are kept.',
                                 st: null },                                                                   /* ENGLISH-ONLY */
    'mafisa.act.nowstate':     { en: '{no} is now {state}.',    st: '{no} joale e {state}.' },                 /* CHECK */
    'mafisa.act.canreview':    { en: 'Both of you can now leave a review.',
                                 st: 'Joale ka bobeli le ka siea maikutlo a lona.' },                          /* CHECK */

    /* ---- THE ASSET RECORD ----------------------------------------------- */
    'mafisa.as.back':          { en: 'The register',            st: 'Bukana ea ngoliso' },                     /* CHECK */
    'mafisa.as.backreg':       { en: 'Back to the register',    st: 'Khutlela bukaneng' },                     /* CHECK */
    'mafisa.as.checked':       { en: 'What the register has checked',
                                 st: 'Seo bukana e se hlahlobileng' },                                         /* CHECK */
    'mafisa.as.private':       { en: 'The document is private and is not shown here, or anywhere, to anybody but its owner and the verifier. What a stranger gets is the verdict.',
                                 st: 'Tokomane ke ea lekunutu, ʼme ha e bontšoe mona, kapa kae kapa kae, ho mang kapa mang ntle le mongʼa eona le ea e hlahlobang. Seo motho e mosele a se fumanang ke qeto feela.' }, /* CHECK */
    'mafisa.as.standing':      { en: 'The owner\u2019s standing',   st: 'Seriti sa mongʼa sona' },                 /* CHECK */
    'mafisa.as.standing.sub':  { en: 'Earned across all three platforms',
                                 st: 'Se fumanoe lithaleng tsena tse tharo kaofela' },                         /* CHECK */
    'mafisa.as.said':          { en: 'What people have said',   st: 'Seo batho ba se buileng' },               /* CHECK */
    'mafisa.as.mine':          { en: 'This is your record.',    st: 'Ena ke rekoto ea hao.' },                 /* CHECK */
    'mafisa.as.mine.body':     { en: 'Loans against it are managed in My records.',
                                 st: 'Likalimo tsa eona li laoloa ho Lirekoto tsa ka.' },                      /* CHECK */
    'mafisa.as.gomine':        { en: 'Go to my records',        st: 'Ea lirekotong tsa ka' },                  /* CHECK */
    'mafisa.as.ask':           { en: 'Ask for this asset for a period. Nothing is charged and nothing is moved \u2014 the register records what the two of you agree.',
                                 st: 'Kopa ntho ena ka nako e itseng. Ha ho chelete e lefisoang ebile ha ho chelete e tsamaisoang \u2014 bukana e ngola seo lona ka bobeli le lumellanang ka sona.' }, /* CHECK */
    'mafisa.as.request':       { en: 'Request a loan',          st: 'Kopa kalimo' },                           /* CHECK */
    'mafisa.as.cannot':        { en: 'This asset cannot be borrowed.',
                                 st: 'Ntho ena e ke ke ea alingoa.' },                                         /* CHECK */
    'mafisa.as.cannot.body':   { en: 'Until a verified document belonging to its owner is attached, it stays out of the register.',
                                 st: 'Ho fihlela ho kenngoa tokomane e netefalitsoeng ea mongʼa sona, e sala kantle ho bukana.' }, /* CHECK */
    'mafisa.as.nocommitted':   { en: 'No committed periods.',   st: 'Ha ho nako e itlamiloeng.' },             /* CHECK */
    'mafisa.as.th.record':     { en: 'Record',                  st: 'Rekoto' },                                /* CHECK */
    'mafisa.as.th.state':      { en: 'State',                   st: 'Boemo' },                                 /* CHECK */
    'mafisa.as.legend.cmt':    { en: 'Committed (agreed or out)',
                                 st: 'E itlamiloe (ho lumellanoe kapa e tsoile)' },                            /* CHECK */
    'mafisa.as.legend.req':    { en: 'Requested, not yet agreed',
                                 st: 'E kopiloe, ha e so lumellanoe' },                                        /* CHECK */
    'mafisa.as.legend.today':  { en: 'Today',                   st: 'Kajeno' },
    /* ENGLISH-ONLY: the identity-versus-ownership argument, and the
       cross-platform standing argument. Both are reasoning, not labels. */
    'mafisa.as.identity.warn': { en: 'Read that carefully before you lend anything against it. The register is not telling you this asset belongs to {name}. It is telling you that {name} is a verified person with standing to lose, and that they entered it. For this category that is the whole of what anybody could establish, and saying more would be an invention.',
                                 st: null },                                                                   /* ENGLISH-ONLY */
    'mafisa.as.reviewrule':    { en: 'A review counts only if it came out of a job both sides marked completed. Standing earned on Pitso (trades and jobs) or on Matsema (pooled work) is the same standing here \u2014 one person, one record, three registers.',
                                 st: null },                                                                   /* ENGLISH-ONLY */

    /* ---- THE LOAN RECORD ------------------------------------------------- */
    'mafisa.ln.printnote':     { en: 'Printed, this is one page with both your names on it and a line for each signature. Take a copy each.',
                                 st: 'Ha e hatisitsoe, ke leqephe le le leng le nang le mabitso a lona ka bobeli le mola oa tekeno ea mong le e mong. Mong le e mong a nke kopi.' }, /* CHECK */
    'mafisa.ln.noasset':       { en: 'The asset this loan points at is not in the register on this device, so the record cannot be shown.',
                                 st: 'Ntho eo kalimo ena e supang ho eona ha e bukaneng ea sesebelisoa sena, kahoo rekoto e ke ke ea bontšoa.' }, /* CHECK */
    'mafisa.settle.sub':       { en: 'Recorded, never moved',   st: 'E ngoliloe, ha ho chelete e tsamaisitsoeng' }, /* CHECK */

    /* ---- REGISTER AN ASSET ---------------------------------------------- */
    'mafisa.nw.actingas':      { en: 'Acting as {name}',        st: 'U sebetsa e le {name}' },                 /* CHECK */
    'mafisa.nw.asset':         { en: 'The asset',               st: 'Ntho eo' },                               /* CHECK */
    'mafisa.nw.title':         { en: 'Title',                   st: 'Lebitso la eona' },                       /* CHECK */
    'mafisa.nw.title.hint':    { en: 'Between 3 and 120 characters. What someone would search for.',
                                 st: 'Litlhaku tse 3 ho isa ho tse 120. Seo motho a ka se batlang.' },         /* CHECK */
    'mafisa.nw.desc.ph':       { en: 'What it is, what it is good for, what comes with it.',
                                 st: 'Ke eng, e sebetsa eng, ʼme e tla le eng.' },                             /* CHECK */
    'mafisa.nw.lentfor':       { en: 'What it is lent for',     st: 'E alingoa ka eng' },                      /* CHECK */
    'mafisa.nw.daily':         { en: 'Daily rate (Maloti)',     st: 'Theko ea letsatsi (Maloti)' },            /* CHECK */
    'mafisa.nw.daily.hint':    { en: 'Per day, inclusive of the first and last day.',
                                 st: 'Ka letsatsi, ho kenyelletsa letsatsi la pele le la ho qetela.' },        /* CHECK */
    'mafisa.nw.dep':           { en: 'Deposit (Maloti)',        st: 'Tefo ea tšireletso (Maloti)' },           /* CHECK */
    'mafisa.nw.dep.hint':      { en: 'Held between the two of you. The register never touches it.',
                                 st: 'E lula pakeng tsa lona ka bobeli. Bukana ha e e ame le ka mohla.' },     /* CHECK */
    'mafisa.nw.willcheck':     { en: 'What the register will check',
                                 st: 'Seo bukana e tla se hlahloba' },                                          /* CHECK */
    'mafisa.nw.docs.private':  { en: 'Your documents are never shown to anybody but you and the verification desk. What appears on the record is the verdict, and nothing else.',
                                 st: 'Litokomane tsa hao ha li bontšoe motho e mong ntle le uena le ba hlahlobang. Se hlahang rekotong ke qeto feela, ha ho letho le leng.' }, /* CHECK */
    'mafisa.nw.enter':         { en: 'Enter in the register',   st: 'E kenye bukaneng' },                      /* CHECK */
    'mafisa.nw.hold':          { en: 'Record it, keep it back', st: 'E ngole, u e boloke morao' },              /* CHECK */
    'mafisa.nw.draft':         { en: 'What you type is kept in this browser as you go, so a reload does not lose it.',
                                 st: 'Seo u se ngolang se bolokoa sebating sena ha u ntse u tsoela pele, kahoo ho khutlisa leqephe ha ho se lahle.' }, /* CHECK */
    'mafisa.nw.choose':        { en: '— choose —',              st: '— khetha —' },                            /* CHECK */
    'mafisa.nw.none_selected': { en: '— none selected —',       st: '— ha ho e khethiloeng —' },               /* CHECK */
    /* ENGLISH-ONLY: the recorded-versus-entered argument. */
    'mafisa.nw.note':          { en: 'Two things happen here and they are separate. The asset is RECORDED whatever you do. It is ENTERED IN THE REGISTER \u2014 where strangers can find it and ask for it \u2014 only if the register can check what it needs to check for that category. Choose the category first: for some it is a document of one particular kind proving the thing is yours, and for others no such document exists anywhere and it is your identity instead.',
                                 st: null },                                                                   /* ENGLISH-ONLY */

    /* ---- THE PROOF CONTROL ---------------------------------------------- */
    'mafisa.pf.choosecat':     { en: 'Choose a category above. What has to be proved depends on it, and for a good many categories it is not ownership at all.',
                                 st: 'Khetha mofuta ka holimo. Se lokelang ho pakoa se itšetlehile ka oona, ʼme mefuteng e mengata hase bongʼa sona ho hang.' }, /* CHECK */
    'mafisa.pf.nocat':         { en: 'That category is not one the register recognises.',
                                 st: 'Mofuta oo hase o mong oa ao bukana e o tsebang.' },                      /* CHECK */
    'mafisa.pf.idok':          { en: 'Identity verified',       st: 'Boitsebiso bo netefalitsoe' },            /* CHECK */
    'mafisa.pf.idok.body':     { en: '{doc}, verified. This asset can be entered. The entry will be stamped “owner identified · ownership not proved”, because that is what actually happened.',
                                 st: '{doc}, e netefalitsoe. Ntho ena e ka kenngoa. Rekoto e tla tiisoa ka “mongʼa sona o tsejoa · bongʼa sona ha boa pakoa”, hobane ke sona se etsahetseng.' }, /* CHECK */
    'mafisa.pf.noid':          { en: 'No verified identity document',
                                 st: 'Ha ho tokomane ea boitsebiso e netefalitsoeng' },                        /* CHECK */
    'mafisa.pf.noid.body':     { en: 'The register needs {kinds}, verified, and you have none on file. You can still record the asset and keep it back.',
                                 st: 'Bukana e hloka {kinds}, e netefalitsoeng, ʼme ha u na e ngotsoeng. U ka ntse u ngola ntho eo ʼme ua e boloka morao.' }, /* CHECK */
    'mafisa.pf.godocs':        { en: 'Go to my documents',      st: 'Ea litokomaneng tsa ka' },                /* CHECK */
    'mafisa.pf.nothing':       { en: 'Nothing on file that would do',
                                 st: 'Ha ho letho le ngotsoeng le ka sebetsang' },                             /* CHECK */
    'mafisa.pf.onlyverified':  { en: 'Only your VERIFIED documents of this one kind are offered. Anything else you hold is not listed here because the register would refuse it.',
                                 st: 'Ho fanoa feela ka litokomane tsa hao TSE NETEFALITSOENG tsa mofuta ona o le mong. Tse ling tseo u nang le tsona ha li thathamisoe mona hobane bukana e ne e tla li hana.' }, /* CHECK */
    'mafisa.pf.verified_opt':  { en: '{doc} — verified',        st: '{doc} — e netefalitsoe' },                /* CHECK */
    /* ENGLISH-ONLY: the identity branch's explanation, and the "a trade
       certificate cannot prove you own a breaker" argument. */
    'mafisa.pf.idbranch':      { en: 'Nothing registers ownership of anything entered under \u201c{cat}\u201d. There is no registry, no papers, nowhere to look it up \u2014 so the register will not claim the thing is yours and does not ask you to prove it. What it checks instead is that you are a verified person, with a name and standing attached to the entry.',
                                 st: null },                                                                   /* ENGLISH-ONLY */
    'mafisa.pf.nothing.body':  { en: 'An entry under \u201c{cat}\u201d needs a verified {doc} in your name. You have none. Another document you hold cannot stand in for it: the register used to accept any verified document here, which meant a trade certificate could prove you owned a breaker, and it no longer does. Upload one and send it to the verification desk; record the asset and keep it back in the meantime.',
                                 st: null },                                                                   /* ENGLISH-ONLY */

    /* ---- REQUEST A LOAN -------------------------------------------------- */
    'mafisa.bw.notlisted':     { en: 'Not in the register',     st: 'Ha e bukaneng' },                         /* CHECK */
    'mafisa.bw.cannot':        { en: 'It cannot be borrowed.',  st: 'E ke ke ea alingoa.' },                   /* CHECK */
    'mafisa.bw.ownasset':      { en: 'This is your own asset',  st: 'Ena ke ntho ea hao' },                    /* CHECK */
    'mafisa.bw.ownasset.body': { en: 'You cannot lend a thing to yourself. The register refuses it, and so does the database.',
                                 st: 'U ke ke ua ithapisa ntho ea hao. Bukana ea e hana, le bukana ea ngoliso ea e hana.' }, /* CHECK */
    'mafisa.bw.backrecord':    { en: 'Back to the record',      st: 'Khutlela rekotong' },                     /* CHECK */
    'mafisa.bw.perday':        { en: '{amount} a day',          st: '{amount} ka letsatsi' },                  /* CHECK */
    'mafisa.bw.submit':        { en: 'Request this period',     st: 'Kopa nako ena' },                         /* CHECK */
    'mafisa.bw.committed':     { en: 'Already committed',       st: 'E se e itlamile' },                       /* CHECK */
    'mafisa.bw.pickaround':    { en: 'Pick around these',       st: 'Khetha ka thoko ho tsena' },              /* CHECK */
    'mafisa.bw.pickboth':      { en: 'Choose both dates and the figures appear here.',
                                 st: 'Khetha matsatsi ka bobeli ʼme lipalo li tla hlaha mona.' },              /* CHECK */
    'mafisa.bw.period':        { en: 'Period',                  st: 'Nako' },                                  /* CHECK */
    'mafisa.bw.days.incl':     { en: 'Days (first and last included)',
                                 st: 'Matsatsi (la pele le la ho qetela a kenyelelitsoe)' },                   /* CHECK */
    'mafisa.bw.rent':          { en: 'Rent for the period',     st: 'Rente ea nako eo' },                      /* CHECK */
    'mafisa.bw.dep.sep':       { en: 'Deposit (separate, returned to you)',
                                 st: 'Tefo ea tšireletso (e arohaneng, e khutlisetsoang ho uena)' },           /* CHECK */
    'mafisa.bw.figures':       { en: 'These are the figures the register writes down. No money moves through this platform: the two of you settle between yourselves and each mark it settled here.',
                                 st: 'Tsena ke lipalo tseo bukana e li ngolang. Ha ho chelete e fetang sethaleng sena: lona ka bobeli lea lefana ʼme mong le e mong a tšoae mona hore e lefiloe.' }, /* CHECK */

    /* ---- THE WRITE THAT DID NOT LAND ------------------------------------ */
    'mafisa.sync.notin':       { en: 'This record is not in the register',
                                 st: 'Rekoto ena ha e bukaneng' },                                             /* CHECK */
    'mafisa.sync.notin.body':  { en: 'It is on this screen because it is in this browser. The database refused it:',
                                 st: 'E skirineng sena hobane e sebating sena. Database e e hanne:' },          /* CHECK */
    'mafisa.sync.noreason':    { en: 'no reason given',         st: 'ha ho lebaka le fanoeng' },               /* CHECK */

    /* ---- STANDING -------------------------------------------------------- */
    'mafisa.rep.rating':       { en: 'Rating',                  st: 'Tekanyo' },                               /* CHECK */
    'mafisa.rep.vdocs':        { en: 'Verified documents',      st: 'Litokomane tse netefalitsoeng' },         /* CHECK */
    'mafisa.rep.fromn':        { en: 'from {n} reviews',        st: 'ho tsoa maikutlong a {n}' },              /* CHECK */

    /* ---- MY RECORDS ------------------------------------------------------ */
    'mafisa.my.how':           { en: 'How a loan moves',        st: 'Kalimo e tsamaea joang' },                /* CHECK */
    'mafisa.my.how.body':      { en: 'The owner agrees it, hands it over, and takes it back. Each step is written to the record trail and cannot be edited afterwards.',
                                 st: 'Mongʼa sona oa lumela, oa e fana, ebe oa e nka hape. Mohato o mong le o mong o ngoloa tlalehong ea liketso ʼme o ke ke oa fetoloa hamorao.' }, /* CHECK */
    'mafisa.my.own':           { en: 'Assets I own',            st: 'Lintho tseo ke nang le tsona' },          /* CHECK */
    'mafisa.my.taken':         { en: 'Loans I have taken',      st: 'Likalimo tseo ke li nkileng' },           /* CHECK */
    'mafisa.my.noassets':      { en: 'You own nothing on the register yet.',
                                 st: 'Ha u so be le letho bukaneng.' },                                        /* CHECK */
    'mafisa.my.noloans':       { en: 'You have not taken anything on loan.',
                                 st: 'Ha u so alime letho.' },                                                 /* CHECK */
    'mafisa.my.noloansasset':  { en: 'No loans recorded against this asset.',
                                 st: 'Ha ho likalimo tse ngoliloeng nthong ena.' },                            /* CHECK */
    'mafisa.my.checked':       { en: 'Checked:',                st: 'Ho hlahlobiloe:' },                       /* CHECK */
    'mafisa.my.withdraw':      { en: 'Withdraw from the register',
                                 st: 'E ntše bukaneng' },                                                      /* CHECK */
    'mafisa.my.attach':        { en: 'Attach the proof',        st: 'Kenya bopaki' },                          /* CHECK */
    'mafisa.my.attach.body':   { en: 'You have a verified {doc} on file that this entry could use.',
                                 st: 'U na le {doc} e netefalitsoeng e ngotsoeng eo rekoto ena e ka e sebelisang.' }, /* CHECK */
    'mafisa.my.attach.btn':    { en: 'Attach and enter',        st: 'E kenye ebe u ngolisa' },                 /* CHECK */
    'mafisa.my.needdoc':       { en: 'To enter this, a verified {doc} in your name has to be on file. Upload one and send it to the verification desk.',
                                 st: 'Ho kenya sena, {doc} e netefalitsoeng lebitsong la hao e tlameha ho ngoloa. Kenya e ʼngoe ebe u e romella ba hlahlobang.' }, /* CHECK */
    'mafisa.my.needid':        { en: 'To enter this, the register needs a verified identity document \u2014 {kinds}. Upload one and send it to the verification desk.',
                                 st: 'Ho kenya sena, bukana e hloka tokomane ea boitsebiso e netefalitsoeng \u2014 {kinds}. Kenya e ʼngoe ebe u e romella ba hlahlobang.' }, /* CHECK */
    'mafisa.my.reviews':       { en: 'Reviews',                 st: 'Maikutlo' },                              /* CHECK */
    'mafisa.my.reviews.sub':   { en: 'Returned loans only',     st: 'Likalimo tse khutlisitsoeng feela' },      /* CHECK */
    'mafisa.my.howwas':        { en: 'how was {name}?',         st: '{name} o bile joang?' },                  /* CHECK */
    'mafisa.my.inwords':       { en: 'In your own words',       st: 'Ka mantsoe a hao' },                      /* CHECK */
    'mafisa.my.inwords.ph':    { en: 'What actually happened.', st: 'Se hlileng se etsahetseng.' },            /* CHECK */
    'mafisa.my.recordreview':  { en: 'Record the review',       st: 'Ngola maikutlo' },                        /* CHECK */
    'mafisa.my.th.asset':      { en: 'Asset',                   st: 'Ntho' },                                  /* CHECK */
    'mafisa.my.dep':           { en: 'dep {amount}',            st: 'tšir. {amount}' },                        /* CHECK */
    'mafisa.rate.5':           { en: '5 — could not be better', st: '5 — ho ka se be molemo ho feta moo' },     /* CHECK */
    'mafisa.rate.4':           { en: '4 — good',                st: '4 — ho lokile' },                         /* CHECK */
    'mafisa.rate.3':           { en: '3 — acceptable',          st: '3 — hoa amoheleha' },                     /* CHECK */
    'mafisa.rate.2':           { en: '2 — poor',                st: '2 — ha hoa loka' },                       /* CHECK */
    'mafisa.rate.1':           { en: '1 — do not repeat it',    st: '1 — se ke sa pheta seo' },                /* CHECK */

    /* ---- WHAT AN OWNER AND A BORROWER MAY DO --------------------------- */
    'mafisa.do.agree':         { en: 'Agree',                   st: 'Lumela' },                                /* CHECK */
    'mafisa.do.decline':       { en: 'Decline',                 st: 'Hana' },                                  /* CHECK */
    'mafisa.do.markpaid':      { en: 'Mark as settled',         st: 'Tšoaea e le e lefiloeng' },               /* CHECK */
    'mafisa.set.both':         { en: 'Both parties confirmed settlement.',
                                 st: 'Mahlakore ka bobeli a netefalitse tefo.' },                              /* CHECK */
    'mafisa.set.mine':         { en: 'You marked it settled. Waiting on the other party.',
                                 st: 'U e tšoaile e le e lefiloeng. Ho emetsoe lehlakore le leng.' },           /* CHECK */
    'mafisa.set.theirs':       { en: 'The other party marked it settled.',
                                 st: 'Lehlakore le leng le e tšoaile e le e lefiloeng.' },                     /* CHECK */
    'mafisa.set.neither':      { en: 'Not yet marked settled by either party.',
                                 st: 'Ha e so tšoaoe e le e lefiloeng ke lehlakore le leng la ʼona.' },        /* CHECK */
    'mafisa.act.settled':      { en: 'Marked as settled by you on {no}. The register records that money changed hands between you. It does not hold or move any money.',
                                 st: 'E tšoailoe e le e lefiloeng ke uena ho {no}. Bukana e ngola hore chelete e fetile pakeng tsa lona. Ha e tšoare kapa ho tsamaisa chelete.' }, /* CHECK */
    'mafisa.act.listed':       { en: '{no} — {title} is now findable and can be asked for.',
                                 st: '{no} — {title} joale ea fumaneha ʼme e ka kopuoa.' },                     /* CHECK */
    'mafisa.act.unlisted':     { en: '{no} — {title} is no longer findable.',
                                 st: '{no} — {title} ha e sa fumaneha.' },                                      /* CHECK */
    'mafisa.act.entered':      { en: 'Entered in the register', st: 'E kentsoe bukaneng' },                    /* CHECK */
    'mafisa.act.withdrawn':    { en: 'Withdrawn from the register',
                                 st: 'E ntšitsoe bukaneng' },                                                   /* CHECK */
    'mafisa.act.refused.doc':  { en: 'Refused — that document does not do it',
                                 st: 'Ho hanoe — tokomane eo ha e etse seo' },                                 /* CHECK */
    'mafisa.act.refused.enter':{ en: 'Refused — cannot be entered in the register',
                                 st: 'Ho hanoe — e ke ke ea kenngoa bukaneng' },                               /* CHECK */
    'mafisa.act.refused.clash':{ en: 'Refused — the dates clash',
                                 st: 'Ho hanoe — matsatsi aa thulana' },                                       /* CHECK */
    'mafisa.act.clash.body':   { en: 'This asset is already committed {period} under record {no}. Two people cannot have the same thing on the same day.',
                                 st: 'Ntho ena e se e itlamile {period} tlas\u2019a rekoto {no}. Batho ba babeli ba ke ke ba ba le ntho e le ʼngoe ka letsatsi le le leng.' }, /* CHECK */
    'mafisa.act.agreed.body':  { en: '{no} is committed for {period}. Rent recorded at {rent}. Nothing has been charged.',
                                 st: '{no} e itlamile bakeng sa {period}. Rente e ngoliloe e le {rent}. Ha ho chelete e lefisitsoeng.' }, /* CHECK */

    /* ---- MY DOCUMENTS ---------------------------------------------------- */
    'mafisa.dc.count':         { en: '{n} on file · {v} verified',
                                 st: 'Tse {n} li ngotsoe · tse {v} li netefalitsoe' },                         /* CHECK */
    'mafisa.dc.none':          { en: 'Nothing on file. Every stamp on this register rests on one of these, so this is where an entry starts.',
                                 st: 'Ha ho letho le ngotsoeng. Tiiso e ʼngoe le e ʼngoe bukaneng ena e itšetlehile ka e ʼngoe ea tsena, kahoo ngoliso e qala mona.' }, /* CHECK */
    'mafisa.dc.add':           { en: 'Add a document',          st: 'Kenya tokomane' },                        /* CHECK */
    'mafisa.dc.twosteps':      { en: 'Two steps, on purpose',   st: 'Mehato e ʼmeli, ka boomo' },              /* CHECK */
    'mafisa.dc.nostore':       { en: 'This copy is not connected to a server, so NO FILE IS STORED ANYWHERE. The record of the document is written to this browser and the file itself is discarded. The flow is real; the storage is not.',
                                 st: 'Kopi ena ha e hokahane le seva, kahoo HA HO FAELE E BOLOKOANG KAE KAPA KAE. Rekoto ea tokomane e ngoloa sebating sena ʼme faele ka boeona ea lahloa. Tsamaiso ke ea ʼnete; polokelo ha se ea ʼnete.' }, /* CHECK */
    'mafisa.dc.whatisit':      { en: 'What is it',              st: 'Ke eng' },                                /* CHECK */
    'mafisa.dc.grp.owner':     { en: 'Proves a thing is yours', st: 'E paka hore ntho ke ea hao' },            /* CHECK */
    'mafisa.dc.grp.identity':  { en: 'Proves who you are',      st: 'E paka hore na u mang' },                 /* CHECK */
    'mafisa.dc.kind.hint':     { en: 'A category that has a registry behind it accepts only its own kind. A vehicle registration will not enter farmland and a title deed will not enter a bakkie.',
                                 st: 'Mofuta o nang le bukana ea semmuso o amohela mofuta oa oona feela. Ngoliso ea koloi e ke ke ea kenya masimo, ʼme tokomane ea masimo e ke ke ea kenya koloi.' }, /* CHECK */
    'mafisa.dc.file':          { en: 'The file',                st: 'Faele' },                                 /* CHECK */
    'mafisa.dc.file.hint':     { en: 'JPEG, PNG, HEIC or PDF, up to 10 MB. That is what the store accepts, refused here first so you are not told about it by a failed upload.',
                                 st: 'JPEG, PNG, HEIC kapa PDF, ho isa ho 10 MB. Ke seo polokelo e se lumellang; ho hanoa mona pele e le hore u se ke ua tsebisoa ka ho hlōleha ha ho romela.' }, /* CHECK */
    'mafisa.dc.expiry.hint':   { en: 'Leave it empty if it does not expire. Fill it in honestly if it does: on that date every entry resting on this document leaves the register by itself.',
                                 st: 'E siee e le feela haeba e sa fele. E tlatse ka nnete haeba e fela: ka letsatsi leo ngoliso e ʼngoe le e ʼngoe e itšetlehileng ka tokomane ena e tsoa bukaneng ka boeona.' }, /* CHECK */
    'mafisa.dc.upload':        { en: 'Upload as a draft',       st: 'Kenya e le mothalo oa pele' },            /* CHECK */
    'mafisa.dc.uploadnote':    { en: 'Uploading puts it on file as a DRAFT. It goes to the desk only when you send it, in a second, deliberate step. Half an upload must not land on a reviewer\u2019s desk.',
                                 st: 'Ho e kenya ho e ngola e le MOTHALO OA PELE. E ea ho ba hlahlobang feela ha u e romella, mohatong oa bobeli oa boomo. Tokomane e kenngoeng halofo e ke ke ea fihla tafoleng ea ea hlahlobang.' }, /* CHECK */
    'mafisa.dc.send':          { en: 'Send to the verification desk',
                                 st: 'Romella ba hlahlobang' },                                                /* CHECK */
    'mafisa.dc.link':          { en: 'Get a link to the file',  st: 'Fumana sehokelo sa faele' },              /* CHECK */
    'mafisa.dc.noexpiry':      { en: 'no expiry',               st: 'ha e fele' },                             /* CHECK */
    'mafisa.dc.stamp.draft':   { en: 'Draft — not submitted',   st: 'Mothalo oa pele — ha e so romelloe' },    /* CHECK */
    'mafisa.dc.stamp.waiting': { en: 'Waiting',                 st: 'E emetse' },                              /* CHECK */
    /* ENGLISH-ONLY: the private-documents argument and the four standing
       explanations. Each is reasoning about what the desk is and is not. */
    'mafisa.dc.private':       { en: 'These are private. Nobody but you and the verification desk ever sees a file; what the register publishes is the verdict. MEND GROUP operates that desk, which is a real job somebody does \u2014 a person looks at the document and decides \u2014 and not an automatic step that happens on upload.',
                                 st: null },                                                                   /* ENGLISH-ONLY */

    /* ---- SIGN IN --------------------------------------------------------- */
    'mafisa.si.nothing':       { en: 'There is nothing to sign in to',
                                 st: 'Ha ho letho leo u ka kenang ho lona' },                                  /* CHECK */
    'mafisa.si.nothing.body':  { en: 'This copy runs entirely in your browser \u2014 no server, no accounts. Use the ACTING AS selector at the top of the page to look at the register through somebody\u2019s eyes.',
                                 st: 'Kopi ena e sebetsa ka ho feletseng sebating sa hao \u2014 ha ho seva, ha ho li-akhaonto. Sebelisa sekhetho sa U SEBETSA E LE ka holimo ho leqephe ho sheba bukana ka mahlo a motho e mong.' }, /* CHECK */
    'mafisa.si.signedin':      { en: 'Signed in',               st: 'U kene' },                                /* CHECK */
    'mafisa.si.token':         { en: 'The sign-in token lives in this page only. Reload it and you will be asked for a code again; that is core/mend.js keeping the token in memory rather than in storage, and it is stated here rather than discovered when a write fails.',
                                 st: 'Tumello ea ho kena e lula leqepheng lena feela. Ha u khutlisa leqephe u tla kōptjoa khoutu hape; ke core/mend.js e bolokang tumello mohopolong e seng polokelong, ʼme sena se boleloa mona ho e-na le hore u se fumane ha ho ngola ho hlōleha.' }, /* CHECK */
    'mafisa.si.nopassword':    { en: 'No password',             st: 'Ha ho phasewete' },                       /* CHECK */
    'mafisa.si.note':          { en: 'We email you a code. It works once and then it is dead. There is no password on this platform, so there is nothing for you to remember and nothing for MEND to lose.',
                                 st: 'Re u romella khoutu ka imeile. E sebetsa hang feela ebe ea shoa. Ha ho phasewete sethaleng sena, kahoo ha ho letho leo u lokelang ho le hopola, ebile ha ho letho leo MEND e ka le lahlang.' }, /* CHECK */
    'mafisa.si.emailme':       { en: 'Email me a code',         st: 'Nthomelle khoutu ka imeile' },             /* CHECK */
    'mafisa.si.sent':          { en: 'Code sent',               st: 'Khoutu e rometsoe' },                     /* CHECK */
    'mafisa.si.sent.body':     { en: 'Sent to {email}. It is six digits and it expires shortly.',
                                 st: 'E rometsoe ho {email}. Ke linomoro tse tšeletseng ʼme e fela kapele.' },  /* CHECK */
    'mafisa.si.thecode':       { en: 'The code',                st: 'Khoutu' },                                /* CHECK */
    'mafisa.si.otheremail':    { en: 'Use a different email',   st: 'Sebelisa imeile e ʼngoe' },               /* CHECK */
    'mafisa.si.myentry':       { en: 'Your entry in the register',
                                 st: 'Ngoliso ea hao bukaneng' },                                              /* CHECK */
    'mafisa.si.nameknown':     { en: 'The name people know you by',
                                 st: 'Lebitso leo batho ba u tsebang ka lona' },                               /* CHECK */
    'mafisa.si.name.hint':     { en: 'Between 2 and 80 characters. A person or a business.',
                                 st: 'Litlhaku tse 2 ho isa ho tse 80. Motho kapa khoebo.' },                  /* CHECK */
    'mafisa.si.village':       { en: 'Village or town',         st: 'Motse kapa toropo' },                     /* CHECK */
    'mafisa.si.enterme':       { en: 'Enter me in the register', st: 'Nkenye bukaneng' },                      /* CHECK */
    'mafisa.si.first':         { en: 'Sign in first',           st: 'Kena pele' },                             /* CHECK */
    'mafisa.si.first.body':    { en: 'You have to be somebody to {what}. A register with anonymous entries in it is a noticeboard.',
                                 st: 'U tlameha ho ba motho ea tsejoang hore u {what}. Bukana e nang le lingoliso tse sa tsejoeng ke boto ea litsebiso feela.' }, /* CHECK */
    'mafisa.si.look':          { en: 'Look at the register',    st: 'Sheba bukana' },                          /* CHECK */
    'mafisa.si.preview':       { en: 'This is a preview running in your browser. Pick somebody in the ACTING AS selector at the top of the page to {what} as them.',
                                 st: 'Ona ke mohlala o sebetsang sebating sa hao. Khetha motho sekhethong sa U SEBETSA E LE ka holimo ho leqephe hore u {what} u le eena.' }, /* CHECK */
    'mafisa.si.profile.note':  { en: 'You are signed in, and the register does not know who you are yet. This is the entry every asset, loan and review of yours will hang off, on this platform and on the other two.',
                                 st: 'U kene, ʼme bukana ha e so tsebe hore na u mang. Ena ke ngoliso eo ntho e ʼngoe le e ʼngoe ea hao, kalimo le maikutlo li tla itšetleha ka eona, sethaleng sena le lithaleng tse ling tse peli.' }, /* CHECK */
    'mafisa.si.nobody':        { en: 'Nobody is signed in',     st: 'Ha ho motho ea keneng' },                 /* CHECK */
    'mafisa.si.notfromserver': { en: 'Not taken from the server.',
                                 st: 'Ha ea nkuoa sevareng.' },                                                /* CHECK */
    'mafisa.what.newasset':    { en: 'register an asset',       st: 'ngolisa ntho' },                          /* CHECK */
    'mafisa.what.mine':        { en: 'see your records',        st: 'bone lirekoto tsa hao' },                 /* CHECK */
    'mafisa.what.docs':        { en: 'see your documents',      st: 'bone litokomane tsa hao' },               /* CHECK */

    /* ---- THE RECORD TRAIL ------------------------------------------------ */
    'mafisa.tr.event':         { en: 'Event',                   st: 'Ketsahalo' },                             /* CHECK */
    'mafisa.tr.when':          { en: 'When',                    st: 'Neng' },                                  /* CHECK */
    'mafisa.tr.entries':       { en: '{n} entries',             st: 'Lingoliso tse {n}' },                     /* CHECK */
    'mafisa.tr.check':         { en: 'Check the chain',         st: 'Hlahloba ketane' },                       /* CHECK */
    'mafisa.tr.nothing':       { en: 'Nothing recorded yet. Register an asset or request a loan.',
                                 st: 'Ha ho letho le ngoliloeng. Ngolisa ntho kapa u kope kalimo.' },          /* CHECK */
    'mafisa.tr.appendonly':    { en: 'Append-only. Each entry carries the hash of the one before it, so an entry cannot be changed or removed without breaking every entry after it. That is the useful half of what a blockchain does, and it is a table. Nothing here is a chain, a token or a coin.',
                                 st: null },                                                                   /* ENGLISH-ONLY */
    'mafisa.tr.local':         { en: 'This copy is not connected to anything, so the trail is this browser\u2019s alone. Nobody else can see it and it does not survive the device.',
                                 st: 'Kopi ena ha e hokahane le letho, kahoo tlaleho ke ea sebati sena feela. Ha ho motho e mong ea ka e bonang ʼme ha e phele ho feta sesebelisoa sena.' }, /* CHECK */
    'mafisa.tr.queued':        { en: '{n} of these entries have not left this device. They are held and sent when the server answers, so this trail is currently longer here than it is anywhere else.',
                                 st: 'Lingoliso tse {n} tsa tsena ha li so tsoe sesebelisoeng sena. Li tšoere ʼme li romeloa ha seva se araba, kahoo tlaleho ena hajoale e telele mona ho feta kae kapa kae.' }, /* CHECK */

    /* ---- THE SHELL: the band, the alarms, the masthead ------------------ */
    'mafisa.sh.retry':         { en: 'Try the server again',    st: 'Leka seva hape' },                        /* CHECK */
    'mafisa.sh.sendnow':       { en: 'Send them now',           st: 'Li romele hona joale' },                  /* CHECK */
    'mafisa.sh.hide':          { en: 'Hide this notice — the rows stay marked',
                                 st: 'Pata tsebiso ena — mela e lula e tšoailoe' },                           /* CHECK */
    'mafisa.sh.actingas':      { en: 'Preview — acting as',     st: 'Mohlala — u sebetsa e le' },             /* CHECK */
    'mafisa.sh.finish':        { en: 'Finish your entry',       st: 'Qeta ngoliso ea hao' },                  /* CHECK */
    'mafisa.sh.asking':        { en: 'Asking for a link…',      st: 'Ho kōptjoa sehokelo…' },                 /* CHECK */
    'mafisa.sh.openfile':      { en: 'Open the file',           st: 'Bula faele' },                           /* CHECK */

    /* ---- THE FOOTER, as ONE string each. These used to be three fragments
       spliced round <strong> tags, which is exactly the shape that cannot be
       translated: Sesotho puts the verb somewhere the English markup has a
       closing tag. ---------------------------------------------------------- */
    'mafisa.foot.name':        { en: 'Mafisa \u2014 named for Moshoeshoe\u2019s cattle loan: an animal placed with a family who had none, so they could live off the milk and the work, while ownership stayed where it was. This is that, for a bakkie standing idle, a tractor twenty farmers need, an overlocker.',
                                 st: 'Mafisa \u2014 e rehelletsoe kalimo ea likhomo ea Moshoeshoe: phoofolo e behoang lelapeng le se nang letho, hore ba phele ka lebese le ka mosebetsi oa eona, athe bongʼa eona bo sala moo bo neng bo le teng. Ke sona seo, bakeng sa koloi e emeng feela, terekere eo lihoai tse mashome a mabeli li e hlokang, kapa mochini oa ho roka.' }, /* CHECK */
    'mafisa.foot.money':       { en: 'v1 RECORDS money. It never MOVES money. Rent and deposit are figures the two parties agree and settle between themselves; the register records that both of them said so.',
                                 st: 'v1 e NGOLA chelete. Ha e NAMOLE chelete le ka mohla. Rente le tefo ea tšireletso ke lipalo tseo mahlakore ka bobeli a lumellanang ka tsona ʼme a lefana ka bobona; bukana e ngola feela hore ka bobeli ba boletse joalo.' }, /* CHECK */
    'mafisa.foot.built':       { en: 'Built by',                st: 'E hahiloe ke' },                         /* CHECK */

    /* ---- DOCUMENT KINDS the shared table has no word for yet ------------ */
    'mafisa.doc.drivers_licence': { en: 'Driver\u2019s licence', st: 'Laesense ea ho khanna' },                  /* CHECK */
    'mafisa.doc.professional_registration': { en: 'Professional registration',
                                 st: 'Ngoliso ea profeshenale' },                                              /* CHECK */
    'mafisa.doc.lease':        { en: 'Lease',                   st: 'Konteraka ea hira' },                     /* CHECK */
    'mafisa.doc.membership':   { en: 'Membership',              st: 'Botho' },                                 /* CHECK */

    /* =====================================================================
       THE REFUSALS THE REGISTER MAKES, each as ONE sentence.

       These used to be assembled at the point of use: a noun, then a bit of
       English, then another noun. Nothing about that can be translated — the
       fragments either side of the join are not sentences in any language, and
       Sesotho puts the pieces in a different order anyway. Each is now one
       string with placeholders, which is the only shape a translator can work
       with and the only shape a test can assert on.
       ===================================================================== */
    'mafisa.pd.notonfile':     { en: 'That document is not on file.',
                                 st: 'Tokomane eo ha e ngoloa.' },                                             /* CHECK */
    'mafisa.pd.notowner':      { en: 'The proof must belong to the owner of the asset.',
                                 st: 'Bopaki bo tlameha ho ba ba mongʼa ntho eo.' },                           /* CHECK */
    'mafisa.pd.wrongkind':     { en: 'A {have} does not prove ownership of anything entered under \u201c{cat}\u201d. The register needs a {need}, verified and in your name.',
                                 st: '{have} ha e pake bongʼa ntho e ngolisitsoeng tlas\u2019a \u201c{cat}\u201d. Bukana e hloka {need}, e netefalitsoeng ebile e le lebitsong la hao.' }, /* CHECK */
    'mafisa.pd.expired':       { en: '{doc} has expired ({date}). An expired document does not prove anything, whatever the file still says.',
                                 st: '{doc} e felile ({date}). Tokomane e felileng ha e pake letho, ho sa natsoe hore na faele e re\u2019ng.' }, /* CHECK */
    'mafisa.pd.pending':       { en: '{doc} has not been verified yet. It is still waiting on review.',
                                 st: '{doc} ha e so netefatsoe. E ntse e emetse tlhahlobo.' },                  /* CHECK */
    'mafisa.pd.rejected':      { en: '{doc} was rejected at verification.',
                                 st: '{doc} e hanoe tlhahlobong.' },                                            /* CHECK */
    'mafisa.pd.unverified':    { en: '{doc} is not verified.',  st: '{doc} ha ea netefatsoa.' },               /* CHECK */

    'mafisa.lr.nocat':         { en: 'Choose a category. What the register has to see depends on it.',
                                 st: 'Khetha mofuta. Seo bukana e lokelang ho se bona se itšetlehile ka oona.' }, /* CHECK */
    'mafisa.lr.noidentity':    { en: 'Nothing registers ownership of anything entered under \u201c{cat}\u201d, so no document can prove it is yours. What the register asks for instead is a verified identity document \u2014 {kinds} \u2014 and there is none on file. The entry will say who the owner is. It will not say the asset is theirs.',
                                 st: 'Ha ho sebaka se ngolisang bongʼa ntho e ngolisitsoeng tlas\u2019a \u201c{cat}\u201d, kahoo ha ho tokomane e ka pakang hore ke ea hao. Seo bukana e se batlang ke tokomane ea boitsebiso e netefalitsoeng \u2014 {kinds} \u2014 ʼme ha ho e ngotsoeng. Ngoliso e tla bolela hore na mongʼa sona ke mang. E ke ke ea bolela hore ntho eo ke ea hae.' }, /* CHECK */
    'mafisa.lr.pickdoc':       { en: 'You have {n} verified {doc} on file. Choose it under \u201cProof of ownership\u201d below and this entry goes through \u2014 the register records which document it relied on.',
                               st: 'U na le {n} {doc} e netefalitsoeng faeleng. E khethe tlas\u2019a \u201cBopaki ba bong\u201d ka tlase, \u2019me ho ngolisoa hona ho tla tsoela pele.' }, /* CHECK */
    'mafisa.lr.needdoc':       { en: 'An entry under \u201c{cat}\u201d needs a verified {doc} in your name.',
                                 st: 'Ngoliso tlas\u2019a \u201c{cat}\u201d e hloka {doc} e netefalitsoeng lebitsong la hao.' }, /* CHECK */

    /* ---- WHAT THE REGISTER MAY SAY IT CHECKED --------------------------- */
    'mafisa.pv.unknowncat':    { en: 'This asset is filed under a category the register does not recognise ({cat}).',
                                 st: 'Ntho ena e ngolisitsoe tlas\u2019a mofuta oo bukana e sa o tsebeng ({cat}).' }, /* CHECK */
    'mafisa.pv.identity.ok':   { en: 'Ownership is NOT proved, and nothing here claims it is. Nothing registers ownership of anything under \u201c{cat}\u201d, so no document could prove it. What was checked is who the owner is: {doc}, verified.',
                                 st: 'Bongʼa sona HA BOA PAKOA, ʼme ha ho letho mona le reng bo pakiloe. Ha ho sebaka se ngolisang bongʼa ntho tlas\u2019a \u201c{cat}\u201d, kahoo ha ho tokomane e neng e ka bo paka. Se hlahlobiloeng ke hore na mongʼa sona ke mang: {doc}, e netefalitsoe.' }, /* CHECK */
    'mafisa.pv.identity.none': { en: 'Ownership cannot be proved for this category, and the owner has no verified identity document either \u2014 {kinds}. The register knows neither what nor who.',
                                 st: 'Bongʼa sona bo ke ke ba pakoa mofuteng ona, ʼme mongʼa sona le eena ha a na tokomane ea boitsebiso e netefalitsoeng \u2014 {kinds}. Bukana ha e tsebe ntho eo ebile ha e tsebe motho eo.' }, /* CHECK */
    'mafisa.pv.nodoc':         { en: 'No {doc} on file for this asset.',
                                 st: 'Ha ho {doc} e ngotsoeng nthong ena.' },                                  /* CHECK */
    'mafisa.pv.ok.expires':    { en: '{doc} verified, in the owner\u2019s name, expires {date}.',
                                 st: '{doc} e netefalitsoe, e le lebitsong la mongʼa sona, e fela ka {date}.' }, /* CHECK */
    'mafisa.pv.ok.noexpiry':   { en: '{doc} verified, in the owner\u2019s name, no expiry recorded.',
                                 st: '{doc} e netefalitsoe, e le lebitsong la mongʼa sona, ha ho letsatsi la ho fela le ngotsoeng.' }, /* CHECK */

    /* ---- WHERE A DOCUMENT STANDS ---------------------------------------- */
    'mafisa.ds.draft':         { en: 'On file with you, and seen by nobody. Uploading is not submitting: until you send it to the verification desk it proves nothing, anywhere on the register.',
                                 st: 'E ngotsoe ho uena, ʼme ha ho motho ea e boneng. Ho e kenya hase ho e romella: ho fihlela u e romella ho ba hlahlobang ha e pake letho, kae kapa kae bukaneng.' }, /* CHECK */
    'mafisa.ds.verified.on':   { en: 'Verified on {date}.',     st: 'E netefalitsoe ka {date}.' },             /* CHECK */
    'mafisa.ds.verified':      { en: 'Verified.',               st: 'E netefalitsoe.' },                       /* CHECK */
    'mafisa.ds.stops':         { en: 'It stops counting on {date}, with no warning and no grace: on that day every entry resting on it drops out of the register.',
                                 st: 'E khaotsa ho bala ka {date}, ntle le tlhokomeliso kapa nako ea mohau: ka letsatsi leo ngoliso e ʼngoe le e ʼngoe e itšetlehileng ka eona e tsoa bukaneng.' }, /* CHECK */
    'mafisa.ds.noexpiry':      { en: 'No expiry was recorded against it.',
                                 st: 'Ha ho letsatsi la ho fela le ngotsoeng ho eona.' },                      /* CHECK */
    'mafisa.ds.expired':       { en: 'Verified once, and past its expiry on {date}. It counts for nothing now.',
                                 st: 'E kile ea netefatsoa, ʼme e fetile letsatsi la eona la ho fela ka {date}. Joale ha e bale letho.' }, /* CHECK */
    'mafisa.ds.rejected':      { en: 'Rejected at the desk. The reason given: \u201c{note}\u201d',
                                 st: 'E hanoe ke ba hlahlobang. Lebaka le fanoeng: \u201c{note}\u201d' },     /* CHECK */
    'mafisa.ds.rejected.noreason': { en: 'Rejected at the desk with no reason recorded. Treat that as a fault in the record, not as a decision you have to accept.',
                                 st: 'E hanoe ke ba hlahlobang ntle le lebaka le ngotsoeng. Nka seo e le phoso rekotong, e seng qeto eo u tlamehang ho e amohela.' }, /* CHECK */
    'mafisa.ds.waiting.since': { en: 'On the verification desk since {date} \u2014 {n} days. The queue is oldest first. Nothing on the register changes until somebody decides.',
                                 st: 'E tafoleng ea tlhahlobo ho tloha ka {date} \u2014 matsatsi a {n}. Mola o qala ka tsa khale. Ha ho letho le fetohang bukaneng ho fihlela motho a etsa qeto.' }, /* CHECK */
    'mafisa.ds.waiting':       { en: 'On the verification desk. The queue is oldest first. Nothing on the register changes until somebody decides.',
                                 st: 'E tafoleng ea tlhahlobo. Mola o qala ka tsa khale. Ha ho letho le fetohang bukaneng ho fihlela motho a etsa qeto.' }, /* CHECK */

    /* =====================================================================
       THE PAPER

       The printed loan agreement is the thing two people sign and keep. If it
       is in a language one of them reads poorly, the whole point of printing it
       is lost — that is the document somebody produces a year later. So the
       paper follows the page.
       ===================================================================== */
    'mafisa.pr.tagline':       { en: 'the register of lent assets',
                                 st: 'bukana ea lintho tse alimanoang' },                                      /* CHECK */
    'mafisa.pr.printed':       { en: 'Printed {date}',          st: 'E hatisitsoe ka {date}' },                /* CHECK */
    'mafisa.pr.notserver':     { en: 'Not taken from the server.',
                                 st: 'Ha ea nkuoa sevareng.' },                                                /* CHECK */
    'mafisa.pr.lastheld':      { en: 'This is what this device last held.',
                                 st: 'Sena ke seo sesebelisoa sena se neng se se tšoere ha morao.' },           /* CHECK */
    'mafisa.pr.invented':      { en: 'This is what this device last held, and every person named on it is invented.',
                                 st: 'Sena ke seo sesebelisoa sena se neng se se tšoere ha morao, ʼme motho e mong le e mong ea bitsoang ho sona ke oa boiqapelo.' }, /* CHECK */
    'mafisa.pr.standing':      { en: '{jobs} jobs completed · {reviews} reviews',
                                 st: 'Mesebetsi e {jobs} e phethiloeng · maikutlo a {reviews}' },               /* CHECK */
    'mafisa.pr.reg':           { en: 'Register',                st: 'Bukana' },                                /* CHECK */
    'mafisa.pr.reg.in':        { en: 'Entered',                 st: 'E kentsoe' },                             /* CHECK */
    'mafisa.pr.checked':       { en: 'What the register checked.',
                                 st: 'Seo bukana e se hlahlobileng.' },                                        /* CHECK */
    'mafisa.pr.nodoc':         { en: 'No document is reproduced here or anywhere. What is published is the verdict.',
                                 st: 'Ha ho tokomane e hatisitsoeng mona kapa kae kapa kae. Se phatlalatsoang ke qeto feela.' }, /* CHECK */
    'mafisa.pr.committed':     { en: 'Committed periods',       st: 'Linako tse itlamiloeng' },                /* CHECK */
    'mafisa.pr.days.incl':     { en: 'Days (inclusive)',        st: 'Matsatsi (a kenyelelitsoeng)' },          /* CHECK */
    'mafisa.pr.condhandover':  { en: 'Condition at handover',   st: 'Boemo ha e fanoa' },                      /* CHECK */
    'mafisa.pr.state':         { en: 'State of the record',     st: 'Boemo ba rekoto' },                       /* CHECK */
    'mafisa.pr.what':          { en: 'What this paper is.',     st: 'Pampiri ena ke eng.' },                   /* CHECK */
    'mafisa.pr.what.body':     { en: 'Mafisa records this loan. It does not hold or move money and it is not a party to it. The rent and the deposit above are figures the two people named here agreed between themselves, and they settle them between themselves.',
                                 st: 'Mafisa e ngola kalimo ena. Ha e tšoare kapa ho tsamaisa chelete, ebile ha se lehlakore ho eona. Rente le tefo ea tšireletso tse ka holimo ke lipalo tseo batho ba babeli ba bitsoang mona ba lumellaneng ka tsona, ʼme ba lefana bona ka bobona.' }, /* CHECK */
    'mafisa.pr.own':           { en: 'Ownership does not move.', st: 'Bongʼa sona ha bo fetohe.' },            /* CHECK */
    'mafisa.pr.own.body':      { en: 'The asset remains the owner\u2019s throughout. What is lent is the use of it, for the period above and no longer.',
                                 st: 'Ntho eo e lula e le ea mongʼa eona nako eohle. Se alingoang ke tšebeliso ea eona, ka nako e boletsoeng ka holimo feela.' }, /* CHECK */
    'mafisa.pr.sign':          { en: 'Signing.',                st: 'Ho saena.' },                             /* CHECK */
    'mafisa.pr.sign.body':     { en: 'Each of you signs your own line. Take one copy each. If either of you later disputes what was agreed, this is the document, and the register holds the same figures.',
                                 st: 'Mong le e mong oa lona o saena mola oa hae. Mong le e mong a nke kopi e le ʼngoe. Haeba e mong oa lona a tla ngangisana ka se lumellanoeng hamorao, ke tokomane ena, ʼme bukana e na le lipalo tse tšoanang.' }, /* CHECK */
    'mafisa.pr.day':           { en: 'Day',                     st: 'Letsatsi' },                              /* CHECK */
    'mafisa.pr.how':           { en: 'How',                     st: 'Joang' },                                 /* CHECK */
    'mafisa.pr.code':          { en: 'Code',                    st: 'Khoutu' },                                /* CHECK */
    'mafisa.pr.confirmed':     { en: 'Confirmed',               st: 'E netefalitsoe' },                        /* CHECK */
    'mafisa.pr.byboth':        { en: 'by both',                 st: 'ke ka bobeli' },                          /* CHECK */
    'mafisa.pr.oneside':       { en: 'one side',                st: 'lehlakore le leng' },                     /* CHECK */
    'mafisa.pr.neither':       { en: 'neither',                 st: 'ha ho le a mong' },                       /* CHECK */
    'mafisa.pr.date':          { en: 'Date',                    st: 'Letsatsi' },                              /* CHECK */
    'mafisa.pr.asowner':       { en: '{name} — owner',          st: '{name} — mongʼa sona' },                  /* CHECK */
    'mafisa.pr.asborrower':    { en: '{name} — borrower',       st: '{name} — ea alimang' },                   /* CHECK */
    'mafisa.share.listed':     { en: 'In the register — it can be asked for.',
                                 st: 'E bukaneng — e ka kōptjoa.' },                                            /* CHECK */
    'mafisa.share.held':       { en: 'Held back — it cannot be borrowed.',
                                 st: 'E boloketsoe morao — e ke ke ea alingoa.' },                              /* CHECK */

    /* ---- THE MODE BAND AND THE ALARMS ----------------------------------- */
    'mafisa.mb.copy':          { en: 'Every figure on this page is a copy of what this device last held, and none of it is confirmed.',
                                 st: 'Palo e ʼngoe le e ʼngoe leqepheng lena ke kopi ea seo sesebelisoa sena se neng se se tšoere ha morao, ʼme ha ho e netefalitsoeng.' }, /* CHECK */
    'mafisa.mb.held':          { en: 'Anything you record is held on this device and sent when the server answers — held, not saved, and marked as such.',
                                 st: 'Seo u se ngolang se tšoaroa sesebelisoeng sena ʼme se romeloa ha seva se araba — se tšoeroe, ha sea bolokoa, ʼme se tšoailoe joalo.' }, /* CHECK */
    'mafisa.mb.nowrite':       { en: 'Nothing can be written while this lasts.',
                                 st: 'Ha ho letho le ka ngoloang ha sena se ntse se le joalo.' },              /* CHECK */
    'mafisa.al.invented':      { en: 'These are invented people, and this server has never answered',
                                 st: 'Bana ke batho ba boiqapelo, ʼme seva sena ha se so arabe le ka mohla' },  /* CHECK */
    'mafisa.al.noauth':        { en: 'Showing a name, holding no sign-in',
                                 st: 'E bontša lebitso, empa ha ho tumello ea ho kena' },                      /* CHECK */

    /* ---- THE CHAIN CHECK ------------------------------------------------- */
    'mafisa.ch.server':        { en: 'The server checked it, over the whole record and not only the part you can see.',
                                 st: 'Seva se e hlahlobile, rekotong kaofela e seng karolong eo u e bonang feela.' }, /* CHECK */
    'mafisa.ch.local':         { en: 'Checked here, over the copy this browser holds.',
                                 st: 'E hlahlobiloe mona, koping eo sebati sena se e tšoereng.' },             /* CHECK */
    'mafisa.ch.ok':            { en: '{n} entries, each carrying the hash of the one before it. Nothing has been altered.',
                                 st: 'Lingoliso tse {n}, e ʼngoe le e ʼngoe e nkile hash ea e ka pele ho eona. Ha ho letho le fetotsoeng.' }, /* CHECK */
    'mafisa.ch.broken':        { en: 'The break is at entry {seq}. Every entry after it is suspect.',
                                 st: 'Ho robeha ho ngolisong ea {seq}. Ngoliso e ʼngoe le e ʼngoe ka mor\u2019a eona ea belaetsa.' }, /* CHECK */
    'mafisa.ch.notchecked':    { en: 'The chain was neither confirmed nor found broken — the check could not be run.',
                                 st: 'Ketane ha ea netefatsoa ebile ha ea fumanoa e robehile — tlhahlobo e ke ke ea etsoa.' }, /* CHECK */

    /* ---- THE NEW-ASSET FORM'S LIVE HINTS -------------------------------- */
    'mafisa.hint.nodoc':       { en: 'Without this the asset can be recorded, but it cannot be entered in the register.',
                                 st: 'Ntle le sena ntho e ka ngoloa, empa e ke ke ea kenngoa bukaneng.' },     /* CHECK */
    'mafisa.hint.ok':          { en: 'The right kind of document, verified, in your name. This asset can be entered in the register.',
                                 st: 'Mofuta o nepahetseng oa tokomane, e netefalitsoeng, lebitsong la hao. Ntho ena e ka kenngoa bukaneng.' }, /* CHECK */
    'mafisa.hint.needkind':    { en: 'Ownership here is proved with one document and one only: {doc}. The register checks the kind, not merely that some document exists.',
                                 st: 'Bongʼa sona mona bo pakoa ka tokomane e le ʼngoe feela: {doc}. Bukana e hlahloba mofuta, e seng feela hore ho na le tokomane e itseng.' }, /* CHECK */
    'mafisa.hint.needid':      { en: 'Nothing registers ownership of this. The register will not say the asset is yours \u2014 it will say who you are, and for that it needs a verified identity document ({kinds}).',
                                 st: 'Ha ho sebaka se ngolisang bongʼa ntho ena. Bukana e ke ke ea re ntho ke ea hao \u2014 e tla bolela hore na u mang, ʼme bakeng sa seo e hloka tokomane ea boitsebiso e netefalitsoeng ({kinds}).' }, /* CHECK */
    'mafisa.err.nothingsaved': { en: 'Refused — nothing was saved',
                                 st: 'Ho hanoe — ha ho letho le bolokiloeng' },                                /* CHECK */
    'mafisa.err.nothinguploaded': { en: 'Refused — nothing was uploaded',
                                 st: 'Ho hanoe — ha ho letho le kentsoeng' },                                  /* CHECK */
    'mafisa.err.samerule':     { en: 'This is the register\u2019s own ownership rule, applied here exactly as it is applied where the records are kept \u2014 it checks the KIND of document, not merely that you have one.',
                                 st: 'Ona ke oona molao oa bukana ea ngoliso, o sebelisoang mona joalo ka moo o sebelisoang moo litlaleho li bolokoang, o hlahlobang MOFUTA oa tokomane e seng feela hore e teng. U ka ntse u ngola ntho eo ʼme ua e boloka morao.' }, /* CHECK */

    /* ---- SAYING SOMETHING IS WRONG ---------------------------------------
       Quiet on purpose. A register whose whole claim is verified ownership has
       to have a way for somebody to say "that is not his" — and it must not be
       a control that invites a tap from anyone merely irritated. The wording
       never treats a report as a finding: db/020_abuse.sql keeps it private to
       the reporter and the desk, and a stranger only ever sees a count. */
    'mafisa.rp.heading':       { en: 'Report this entry',      st: 'Tlaleha ngoliso ena' },                    /* CHECK */
    'mafisa.rp.notyours':      { en: 'If this entry says somebody owns a thing and they do not, that is the one this register most needs to hear. Everything here rests on ownership being true.',
                                 st: 'Haeba ngoliso ena e re motho ke mongʼa ntho empa e se ea hae, ke sona seo bukana ena e hlokang ho se utloa ka ho fetisisa. Tsohle tse ngotsoeng mona li itšetlehile ka hore bongʼa sona ke ʼnete.' }, /* CHECK */
    'mafisa.rp.claim':         { en: 'A report is a claim, not a finding. Nothing on this entry changes because you sent one; a person at MEND reads it and decides.',
                                 st: 'Tlaleho ke tseko, e seng qeto. Ha ho letho le fetohang ngolisong ena hobane u romelletse e ʼngoe; motho oa MEND o e bala ebe o etsa qeto.' }, /* CHECK */
    'mafisa.rp.send':          { en: 'Send the report',        st: 'Romela tlaleho' },                         /* CHECK */
    'mafisa.rp.signin':        { en: 'A report has to come from somebody. Sign in first.',
                                 st: 'Tlaleho e tlameha ho tsoa ho motho. Kena pele.' },                       /* CHECK */
    'mafisa.rp.sent':          { en: 'The report was recorded', st: 'Tlaleho e ngolisitsoe' },                 /* CHECK */

    /* ---- STRUCK FROM THE REGISTER ----------------------------------------
       MEND can take a listing down. What it may not do is
       make the entry disappear: in a deed book the line is ruled through and
       the reason is written beside it, and the page stays. A record that
       vanishes leaves the owner with nothing to point at. */
    'mafisa.md.heading':       { en: 'Struck from the register', st: 'Tse thathamisitsoeng bukaneng' },        /* CHECK */
    'mafisa.md.count':         { en: '{n} struck',             st: 'Tse {n} tse thathamisitsoeng' },           /* CHECK */
    'mafisa.md.on':            { en: 'Struck on {date}',       st: 'E thathamisitsoe ka {date}' },             /* CHECK */
    'mafisa.md.stillhere':     { en: 'The entry has not been removed. A register does not tear out a page: the line is ruled through, the reason is written beside it, and the page stays where it was.',
                                 st: 'Ngoliso ha ea tlosoa. Bukana ha e hahole leqephe: mola oa thathamisoa, lebaka le ngoloa pel’a oona, ʼme leqephe le sala moo le neng le le teng.' }, /* CHECK */
    'mafisa.md.cannot':        { en: 'This entry was taken down by MEND, so it cannot be borrowed. It is still shown, struck through and with the reason beside it, because a record that quietly disappears is worse than one that is marked.',
                                 st: 'Ngoliso ena e tlositsoe ke MEND, kahoo e ke ke ea alingoa. E ntse e bontšoa, e thathamisitsoe le lebaka le le pel’a eona, hobane rekoto e nyamelang ka setu e mpe ho feta e tšoauoeng.' }, /* CHECK */
    'mafisa.md.owner':         { en: 'MEND took this entry of yours down, for the reason written above. It cannot be put back in the register from this page. If you think it is wrong, answer the reason — the entry, the reason and the date all stay on the record either way.',
                                 st: 'MEND e tlositse ngoliso ena ea hao, ka lebaka le ngotsoeng ka holimo. E ke ke ea khutlisetsoa bukaneng ho tloha leqepheng lena. Haeba u nahana hore ho fositsoe, araba lebaka leo — ngoliso, lebaka le letsatsi li lula rekotong ka bobeli.' }, /* CHECK */

    /* ---- WHAT THE REGISTER IS NOT SHOWING ---------------------------------
       Downloads are bounded at 200 rows a table (core/mend.js, TABLES). A
       bounded list that does not say it is bounded is lying by omission. */
    'mafisa.cov.assets':       { en: 'Showing {loaded} of {total} entries — the ones entered most recently. The search above looks at all {total}.',
                                 st: 'Ho bontšoa tse {loaded} ho tse {total} — tse sa tsoa ngolisoa. Ho batla ka holimo ho sheba tsohle tse {total}.' }, /* CHECK */
    'mafisa.cov.loans':        { en: 'Showing {loaded} of {total} loan records — the most recent. Older ones are on the server and not on this device.',
                                 st: 'Ho bontšoa lirekoto tse {loaded} ho tse {total} tsa likalimo — tse sa tsoa etsoa. Tsa khale li sevaeng, ha li fonong ena.' }, /* CHECK */

    /* ---- SEARCH -----------------------------------------------------------
       Against the SERVER when there is one. What this device holds is the first
       200 assets, and a tractor in Mokhotlong would simply not be in it. */
    'mafisa.q.label':          { en: 'Search the whole register',
                                 st: 'Batla bukaneng kaofela' },                                               /* CHECK */
    'mafisa.q.ph':             { en: 'A thing, a category, a district',
                                 st: 'Ntho, mofuta, kapa setereke' },                                          /* CHECK */
    'mafisa.q.short':          { en: 'Type at least two letters.',
                                 st: 'Ngola bonyane litlhaku tse peli.' },                                     /* CHECK */
    'mafisa.q.busy':           { en: 'Searching the server…',  st: 'Ho batloa sevaeng…' },                     /* CHECK */
    'mafisa.q.count':          { en: '{n} found',              st: 'Tse {n} li fumanoe' },                      /* CHECK */
    'mafisa.q.server':         { en: 'Searched on the server, so every entry in the register was looked at — not only the ones downloaded to this device.',
                                 st: 'Ho batliloe sevaeng, kahoo ngoliso e ʼngoe le e ʼngoe e shebiloe — eseng tse kentsoeng fonong ena feela.' }, /* CHECK */
    'mafisa.q.local':          { en: 'The server could not be asked, so this looked only at what is on this device — the {n} entries downloaded here. Anything else in the register will not be found.',
                                 st: 'Seva se ne se sa fumanehe, kahoo ho shebiloe feela tse fonong ena — lingoliso tse {n} tse kentsoeng mona. Tse ling tsohle tsa bukana li ke ke tsa fumanoa.' }, /* CHECK */
    'mafisa.q.failed':         { en: 'The server refused the search ({why}), so this looked only at what is on this device.',
                                 st: 'Seva se hanne ho batla ({why}), kahoo ho shebiloe feela tse fonong ena.' }, /* CHECK */
    'mafisa.q.clear':          { en: 'Clear the search',       st: 'Hlakola ho batla' },                       /* CHECK */

    /* ---- YOUR ACCOUNT -----------------------------------------------------
       Two things, and the second one is irreversible, so it shows the whole
       account of what goes and what stays BEFORE it offers a button. */
    'mafisa.acct.heading':     { en: 'Your account',           st: 'Akhaonto ea hao' },                        /* CHECK */
    'mafisa.acct.needserver':  { en: 'Both of these need the server, and this page is not connected to one. Neither can be done from here.',
                                 st: 'Tsena ka bobeli li hloka seva, ʼme leqephe lena ha le hokahane le sona. Ha ho e ka etsoang mona.' }, /* CHECK */
    'mafisa.acct.copy':        { en: 'Take a copy',            st: 'Nka kopi' },                               /* CHECK */
    'mafisa.acct.copy.body':   { en: 'Everything MEND holds about you on this platform, in one file that you keep.',
                                 st: 'Tsohle tseo MEND e nang le tsona ka uena sethaleng sena, faeleng e le ʼngoe eo u e bolokang.' }, /* CHECK */
    'mafisa.acct.copy.note':   { en: 'The file LISTS your documents and your photographs — what each one is, when it was uploaded, whether it was accepted — but it does not contain the files themselves. Those stay private and are fetched one at a time, from the record each belongs to.',
                                 st: 'Faele ena e THATHAMISA litokomane le linepe tsa hao — hore e ʼngoe le e ʼngoe ke efe, e kentsoe neng, ebile e amohetsoe kapa che — empa ha e na lifaele ka botsona. Tsona li lula e le lekunutu, li nkuoa ka bonngoe rekotong eo e ʼngoe le e ʼngoe e leng ea eona.' }, /* CHECK */
    'mafisa.acct.copy.btn':    { en: 'Make the file',          st: 'Etsa faele' },                             /* CHECK */
    'mafisa.acct.copy.busy':   { en: 'Making the file…',       st: 'Faele ea etsoa…' },                        /* CHECK */
    'mafisa.acct.copy.made':   { en: 'The file was made',      st: 'Faele e entsoe' },                         /* CHECK */
    'mafisa.acct.copy.made.body': { en: 'Your browser has saved it. Nothing in the register changed.',
                                 st: 'Sebatli sa hao se e bolokile. Ha ho letho le fetohileng bukaneng.' },    /* CHECK */
    'mafisa.acct.remove':      { en: 'Remove your account',    st: 'Tlosa akhaonto ea hao' },                  /* CHECK */
    'mafisa.acct.remove.body': { en: 'Before anything is removed this shows you exactly what goes and exactly what stays. There is no button until you have read it.',
                                 st: 'Pele ho tlosoa letho, sena se u bontša hantle se tsamaeang le se salang. Ha ho konopo ho fihlela u se u baletse.' }, /* CHECK */
    'mafisa.acct.show':        { en: 'Show me what would happen',
                                 st: 'Mpontše se ka etsahalang' },                                             /* CHECK */
    'mafisa.acct.erased':      { en: 'Erased',                 st: 'Tse hlakoloang' },                         /* CHECK */
    'mafisa.acct.kept':        { en: 'Kept, without your name on it',
                                 st: 'Tse salang, ntle le lebitso la hao' },                                   /* CHECK */
    'mafisa.acct.photos.why':  { en: 'On this platform that means the condition photographs survive. A photograph taken when something was handed over, or when it came back, is the other person’s record of that day as much as yours — and if one side could destroy it by closing an account, none of them would be worth anything. They stay, with your name taken off them.',
                                 st: 'Sethaleng sena seo se bolela hore linepe tsa boemo lia sala. Senepe se nkiloeng ha ntho e fanoa, kapa ha e khutla, ke rekoto ea motho e mong ea letsatsi leo joalo ka ha e le ea hao — ʼme haeba lehlakore le le leng le ka se senya ka ho koala akhaonto, ha ho se seng sa tsona se neng se tla ba le thuso. Lia sala, lebitso la hao le tlositsoe ho tsona.' }, /* CHECK */
    'mafisa.acct.final':       { en: 'This cannot be undone. Nobody at MEND can put it back for you afterwards.',
                                 st: 'Sena se ke ke sa khutlisoa. Ha ho motho oa MEND ea ka se khutlisang hamorao.' }, /* CHECK */
    'mafisa.acct.type':        { en: 'Type your name exactly as it appears on your entry: {name}',
                                 st: 'Ngola lebitso la hao hantle joalo ka ha le hlaha ngolisong ea hao: {name}' }, /* CHECK */
    'mafisa.acct.confirm':     { en: 'Remove my account',      st: 'Tlosa akhaonto ea ka' },                   /* CHECK */
    'mafisa.acct.files':       { en: 'Removing your files — {done} of {total}…',
                                 st: 'Ho tlosoa lifaele tsa hao — tse {done} ho tse {total}…' },          /* CHECK */
    'mafisa.acct.record':      { en: 'The files are gone. Removing your name from the record…',
                                 st: 'Lifaele li tlositsoe. Ho tlosoa lebitso la hao rekotong…' },             /* CHECK */
    'mafisa.acct.filesfirst':  { en: 'The files go first, one at a time. If any one of them will not delete, nothing else is attempted and you are told which — rather than being told your documents are gone while they sit in a bucket.',
                                 st: 'Lifaele li tsamaea pele, ka bonngoe. Haeba e ʼngoe ea tsona e sa hlakolehe, ha ho se seng se etsoang ʼme u bolelloa hore na ke efe — ho e-na le hore u bolelloe hore litokomane tsa hao li fedile athe li ntse li le teng.' }, /* CHECK */
    'mafisa.acct.done':        { en: 'Your account was removed', st: 'Akhaonto ea hao e tlositsoe' },          /* CHECK */
    'mafisa.acct.done.body':   { en: 'You are signed out. What stayed is listed above and no longer carries your name.',
                                 st: 'U tsoile. Tse setseng li thathamisitsoe ka holimo ʼme ha li sa na lebitso la hao.' }, /* CHECK */
    'mafisa.acct.nothing':     { en: 'none',                   st: 'ha ho letho' },                            /* CHECK */

    /* The preview's own field names, said in words. An unknown key is printed
       as it came rather than hidden, so a new field added to the SQL shows up
       here instead of quietly vanishing from the account somebody is reading
       before they press an irreversible button. */
    'mafisa.acct.k.your_name_and_contact': { en: 'Your name and contact details',
                                 st: 'Lebitso la hao le litaba tsa ho u fumana' },                             /* CHECK */
    'mafisa.acct.k.documents': { en: 'Documents you uploaded', st: 'Litokomane tseo u li kentseng' },          /* CHECK */
    'mafisa.acct.k.photographs': { en: 'Photographs that are yours alone',
                                 st: 'Linepe tse leng tsa hao feela' },                                        /* CHECK */
    'mafisa.acct.k.listings':  { en: 'Entries you put in the register',
                                 st: 'Lingoliso tseo u li kentseng bukaneng' },                                /* CHECK */
    'mafisa.acct.k.completed_jobs': { en: 'Loans that were completed',
                                 st: 'Likalimo tse phethiloeng' },                                             /* CHECK */
    'mafisa.acct.k.reviews_others_wrote': { en: 'Reviews other people wrote about you',
                                 st: 'Litlhahlobo tseo batho ba bang ba li ngotseng ka uena' },                /* CHECK */
    'mafisa.acct.k.settled_payments': { en: 'Payments recorded',
                                 st: 'Litefo tse ngolisitsoeng' },                                             /* CHECK */
    'mafisa.acct.k.disputes':  { en: 'Disputes',               st: 'Liqabang' },                               /* CHECK */
    'mafisa.acct.k.record_entries': { en: 'Entries in the record trail',
                                 st: 'Lingoliso tlalehong ea liketso' },                                       /* CHECK */
    'mafisa.acct.k.condition_photographs': { en: 'Condition photographs',
                                 st: 'Linepe tsa boemo' },                                                     /* CHECK */

    /* ENGLISH-ONLY, deliberately, and listed so the gap stays visible:
         the register's explanation of what proof it checks and why
         the ownership-versus-identity paragraph on an asset record
         the record-trail explanation
         the document-privacy paragraph
       These are arguments, not instructions. They need a Mosotho to WRITE them,
       not to translate them, and a clumsy Sesotho paragraph would read worse
       than the English. */
  });
})(window);
