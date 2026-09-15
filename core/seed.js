/* ===========================================================================
   SHARED PREVIEW DATA — loaded before core/mend.js in device mode.

   ONE set of people across all three platforms. That is the point: Thabang is
   an electrician on Pitso, the owner of a bakkie on Mafisa, and a member of a
   pool on Matsema, and his standing is the same standing in all three places.

   Everything here is invented. No real person, business, buyer or certificate
   is represented. The buyer names are fictional on purpose — a demo must not
   imply a relationship with a real retailer.
   =========================================================================== */
window.MEND_SEED = {
  session: { profile_id: 'p-thabang' },

  profiles: [
    { id:'p-thabang', kind:'person', display_name:'Thabang Mokoena', district:'Maseru', village:'Ha Thetsane',
      phone:'+266 5800 0001', bio:'Electrician, 12 years. Domestic and small commercial. Own transport.' },
    { id:'p-lineo',   kind:'person', display_name:'Lineo Rants’o', district:'Berea', village:'Teyateyaneng',
      phone:'+266 5800 0002', bio:'Seamstress and tailoring. School uniforms, alterations, traditional wear.' },
    { id:'p-teboho',  kind:'person', display_name:'Teboho Letsie', district:'Maseru', village:'Ha Abia',
      phone:'+266 5800 0003', bio:'Plumber. Geysers, boreholes, pressure pumps.' },
    { id:'p-palesa',  kind:'person', display_name:'Palesa Khoele', district:'Maseru', village:'Maseru West',
      phone:'+266 5800 0004', bio:'Bookkeeping and VAT returns for small businesses.' },
    { id:'p-mokoto',  kind:'entity', display_name:'Ha-Mokoto Growers', district:'Leribe', village:'Ha Mokoto',
      phone:'+266 5800 0005', bio:'Twenty-two smallholder vegetable farmers, working together since 2021.' },
    { id:'p-nthabi',  kind:'person', display_name:'Nthabiseng Molapo', district:'Leribe', village:'Hlotse',
      phone:'+266 5800 0006', bio:'Cabbage and spinach, 1.4 hectares under irrigation.' },
    { id:'p-sello',   kind:'person', display_name:'Sello Matete', district:'Leribe', village:'Pitseng',
      phone:'+266 5800 0007', bio:'Mohair and wool. 180 angora goats.' },
    { id:'p-refiloe', kind:'person', display_name:'Refiloe Mahao', district:'Maseru', village:'Lithabaneng',
      phone:'+266 5800 0008', bio:'Runs a hardware and building supplies shop.' }
  ],

  entities: [
    { profile_id:'p-mokoto', legal_name:'Ha-Mokoto Growers Association', reg_no:'—', tin:'—' }
  ],

  /* Documents are PRIVATE. What a stranger sees is the verdict, never the file.
     Note the deliberately expired one: the UI must show it as expired even
     though its stored status still reads 'verified'. */
  documents: [
    { id:'d-1', profile_id:'p-thabang', kind:'national_id',        storage_path:'private/…', status:'verified', expires_on:null },
    { id:'d-2', profile_id:'p-thabang', kind:'trade_certificate',  storage_path:'private/…', status:'verified',
      issued_by:'Lerotholi Polytechnic', issued_on:'2013-11-29', expires_on:null },
    { id:'d-3', profile_id:'p-thabang', kind:'vehicle_registration', storage_path:'private/…', status:'verified',
      issued_on:'2021-03-02', expires_on:'2027-03-02' },
    { id:'d-4', profile_id:'p-teboho',  kind:'national_id',        storage_path:'private/…', status:'verified', expires_on:null },
    { id:'d-5', profile_id:'p-teboho',  kind:'trade_certificate',  storage_path:'private/…', status:'pending',
      issued_by:'Lerotholi Polytechnic', issued_on:'2016-06-10', stage: 'submitted' },
    { id:'d-6', profile_id:'p-lineo',   kind:'national_id',        storage_path:'private/…', status:'verified', expires_on:null },
    { id:'d-7', profile_id:'p-palesa',  kind:'professional_registration', storage_path:'private/…', status:'verified',
      issued_on:'2022-02-01', expires_on:'2024-02-01' },   /* EXPIRED — must not count anywhere */
    { id:'d-8', profile_id:'p-refiloe', kind:'company_registration', storage_path:'private/…', status:'verified', expires_on:null },
    { id:'d-9', profile_id:'p-nthabi',  kind:'national_id',        storage_path:'private/…', status:'verified', expires_on:null },
    { id:'d-10',profile_id:'p-sello',   kind:'national_id',        storage_path:'private/…', status:'verified', expires_on:null }
  ],

  /* Completed work, spread across all three platforms. This is what makes the
     `standing` numbers real rather than decorative. */
  notifications: [
    /* Thabang is the person the demo signs you in as. Without these the strip
       hides its notification button entirely and the whole feature reads as
       missing — which is exactly what a tester concluded. */
    { id:'n-1', profile_id:'p-thabang', platform:'pitso', kind:'offer_accepted',
      subject_table:'pitso_offers', subject_id:'o-1',
      body_key:'notif.offer_accepted', body_vars:{ name:'Refiloe Mahao', title:'Burst pipe under the kitchen sink' },
      read_at:null, created_at:'2026-09-09T07:40:00.000Z' },
    { id:'n-2', profile_id:'p-thabang', platform:'mafisa', kind:'doc_verified',
      subject_table:'documents', subject_id:'d-3',
      body_key:'notif.doc_verified', body_vars:{ kind:'vehicle registration' },
      read_at:null, created_at:'2026-09-05T11:12:00.000Z' }
  ],
  settlements: [
    /* The four completed jobs that read as paid now carry the record that says
       so. The engagement booleans used to assert payment with nothing behind
       them, and Pitso showed both statements on one card. */
    { id:'s-1', engagement_id:'e-1', payer_id:'p-refiloe',  payee_id:'p-thabang',
      amount_cents:185000, currency:'LSL', method:'mpesa',    reference:'QK4TF8N2LP',
      paid_on:'2026-07-16', recorded_by:'p-refiloe',
      confirmed_by_payer:true, confirmed_by_payee:true },
    { id:'s-2', engagement_id:'e-2', payer_id:'p-palesa',   payee_id:'p-thabang',
      amount_cents:62000,  currency:'LSL', method:'ecocash',  reference:'EC88213945',
      paid_on:'2026-08-04', recorded_by:'p-thabang',
      confirmed_by_payer:true, confirmed_by_payee:true },
    { id:'s-3', engagement_id:'e-3', payer_id:'p-lineo',    payee_id:'p-thabang',
      amount_cents:135000, currency:'LSL', method:'cash',     reference:null,
      paid_on:'2026-08-24', recorded_by:'p-thabang', note:'Paid at the yard when the bakkie came back',
      confirmed_by_payer:true, confirmed_by_payee:true },
    { id:'s-4', engagement_id:'e-5', payer_id:'p-palesa',   payee_id:'p-lineo',
      amount_cents:48000,  currency:'LSL', method:'mpesa',    reference:'QK9RD2X7BB',
      paid_on:'2026-08-15', recorded_by:'p-palesa',
      confirmed_by_payer:true, confirmed_by_payee:true }
  ],
  engagements: [
    { id:'e-1', platform:'pitso',   provider_id:'p-thabang', counterparty_id:'p-refiloe',
      subject_table:'pitso_offers', subject_id:'o-1', state:'completed', agreed_cents:185000,
      currency:'LSL', started_on:'2026-07-14', ended_on:'2026-07-16',
      /* settled_by_* is DERIVED from settlements — see db/023 */ },
    { id:'e-2', platform:'pitso',   provider_id:'p-thabang', counterparty_id:'p-palesa',
      subject_table:'pitso_offers', subject_id:'o-2', state:'completed', agreed_cents:62000,
      currency:'LSL', started_on:'2026-08-03', ended_on:'2026-08-03',
      /* settled_by_* is DERIVED from settlements — see db/023 */ },
    { id:'e-3', platform:'mafisa',  provider_id:'p-thabang', counterparty_id:'p-lineo',
      subject_table:'mafisa_loans', subject_id:'l-1', state:'completed', agreed_cents:135000,
      currency:'LSL', started_on:'2026-08-21', ended_on:'2026-08-24',
      /* settled_by_* is DERIVED from settlements — see db/023 */ },
    { id:'e-4', platform:'matsema', provider_id:'p-nthabi', counterparty_id:'p-mokoto',
      subject_table:'matsema_pledges', subject_id:'g-1', state:'completed',
      started_on:'2026-06-01', ended_on:'2026-07-30' },
    { id:'e-5', platform:'pitso',   provider_id:'p-lineo',  counterparty_id:'p-palesa',
      subject_table:'pitso_offers', subject_id:'o-3', state:'completed', agreed_cents:48000,
      currency:'LSL', started_on:'2026-08-11', ended_on:'2026-08-15',
      /* settled_by_* is DERIVED from settlements — see db/023 */ },
    { id:'e-6', platform:'pitso',   provider_id:'p-teboho', counterparty_id:'p-refiloe',
      subject_table:'pitso_offers', subject_id:'o-4', state:'active', agreed_cents:240000, currency:'LSL',
      started_on:'2026-09-08' }
  ],

  reviews: [
    { id:'r-1', engagement_id:'e-1', author_id:'p-refiloe', subject_id:'p-thabang', rating:5,
      body:'Rewired the whole shop over a weekend so we never closed. Priced it before he started and it did not move.',
      created_at:'2026-07-17T09:12:00Z' },
    { id:'r-2', engagement_id:'e-2', author_id:'p-palesa',  subject_id:'p-thabang', rating:4,
      body:'Good work on the DB board. Came an hour late but phoned first.', created_at:'2026-08-04T18:40:00Z' },
    { id:'r-3', engagement_id:'e-3', author_id:'p-lineo',   subject_id:'p-thabang', rating:5,
      body:'Bakkie was clean and he did not argue about the extra day.', created_at:'2026-08-25T07:55:00Z' },
    { id:'r-4', engagement_id:'e-5', author_id:'p-palesa',  subject_id:'p-lineo',   rating:5,
      body:'Forty uniforms in four days and every one fitted.', created_at:'2026-08-16T12:00:00Z' },
    { id:'r-5', engagement_id:'e-4', author_id:'p-mokoto',  subject_id:'p-nthabi',  rating:5,
      body:'Delivered 2,100 kg against a 2,000 kg pledge, on the day.', created_at:'2026-07-31T06:30:00Z' }
  ],

  ledger: [],

  /* Reference data, mirroring db/004_reference.sql. It belongs in the seed
     because without it device mode has no trade or category names at all — and
     somebody searching "ramotlakase" rather than "electrician" would find
     nothing, which is precisely the person this platform is for. */
  pitso_trades: [
    { code:'plumber',      name_en:'Plumber',                 name_st:'Rakhoele' },
    { code:'electrician',  name_en:'Electrician',             name_st:'Ramotlakase' },
    { code:'builder',      name_en:'Builder / bricklayer',    name_st:'Moaki' },
    { code:'carpenter',    name_en:'Carpenter',               name_st:'Rakhabo' },
    { code:'painter',      name_en:'Painter',                 name_st:'Mopenti' },
    { code:'welder',       name_en:'Welder',                  name_st:'Mowelli' },
    { code:'mechanic',     name_en:'Motor mechanic',          name_st:'Ramechanic' },
    { code:'panelbeater',  name_en:'Panel beater',            name_st:null },
    { code:'tiler',        name_en:'Tiler',                   name_st:null },
    { code:'roofer',       name_en:'Roofer',                  name_st:null },
    { code:'borehole',     name_en:'Borehole & pumps',        name_st:null },
    { code:'solar',        name_en:'Solar & inverters',       name_st:null },
    { code:'aircon',       name_en:'Refrigeration & aircon',  name_st:null },
    { code:'itsupport',    name_en:'IT support & networks',   name_st:null },
    { code:'appliance',    name_en:'Appliance repair',        name_st:null },
    { code:'locksmith',    name_en:'Locksmith',               name_st:null },
    { code:'landscaper',   name_en:'Landscaping & paving',    name_st:null },
    { code:'cleaner',      name_en:'Cleaning services',       name_st:'Mohloekisi' },
    { code:'mover',        name_en:'Removals & transport',    name_st:null },
    { code:'caterer',      name_en:'Catering',                name_st:'Moapehi' },
    { code:'seamstress',   name_en:'Tailoring & dressmaking', name_st:'Moroki' },
    { code:'hairdresser',  name_en:'Hair & beauty',           name_st:null },
    { code:'photographer', name_en:'Photography & video',     name_st:null },
    { code:'accountant',   name_en:'Bookkeeping & tax',       name_st:null },
    { code:'hr',           name_en:'HR on demand',            name_st:null },
    { code:'legal',        name_en:'Legal drafting',          name_st:null },
    { code:'surveyor',     name_en:'Land surveying',          name_st:null },
    { code:'vet',          name_en:'Veterinary & livestock',  name_st:null }
  ],

  mafisa_categories: [
    { code:'vehicle',      name_en:'Bakkie / vehicle',        name_st:'Koloi',       proof:'vehicle_registration' },
    { code:'tractor',      name_en:'Tractor & implements',    name_st:'Terekere',          proof:'vehicle_registration' },
    { code:'trailer',      name_en:'Trailer',                 name_st:'Thereilara',          proof:'vehicle_registration' },
    { code:'livestock',    name_en:'Livestock',               name_st:'Liphoofolo',  proof:null },
    { code:'land',         name_en:'Farmland',                name_st:'Masimo',      proof:'title_deed' },
    { code:'premises',     name_en:'Premises / storage',      name_st:'Sebaka sa polokelo',          proof:'lease' },
    { code:'powertool',    name_en:'Power tools',             name_st:'Lisebelisoa tsa motlakase',          proof:null },
    { code:'construction', name_en:'Construction equipment',  name_st:'Lisebelisoa tsa kaho',          proof:null },
    { code:'generator',    name_en:'Generator & power',       name_st:'Jenereithara',          proof:null },
    { code:'event',        name_en:'Event equipment (tents, chairs, PA)', name_st:'Lisebelisoa tsa mekete', proof:null },
    { code:'catering',     name_en:'Catering equipment',      name_st:'Lisebelisoa tsa ho pheha',          proof:null },
    { code:'media',        name_en:'Cameras & AV',            name_st:'Likhamera le lisebelisoa tsa lentsoe',          proof:null },
    { code:'sewing',       name_en:'Sewing & textile machines', name_st:'Michini ea ho roka',        proof:null },
    { code:'welding',      name_en:'Welding plant',           name_st:'Lisebelisoa tsa ho welda',          proof:null }
  ],

  /* ---- PITSO ---- */
  pitso_providers: [
    { profile_id:'p-thabang', trade_code:'electrician', years_experience:12, districts:['Maseru','Berea'],
      rate:'hourly',   rate_cents:18000, headline:'Domestic and small commercial. Own transport.', available:true },
    { profile_id:'p-teboho',  trade_code:'plumber',     years_experience:9,  districts:['Maseru'],
      rate:'per_job',  rate_cents:null,  headline:'Geysers, boreholes, pressure pumps.', available:true },
    { profile_id:'p-lineo',   trade_code:'seamstress',  years_experience:15, districts:['Berea','Maseru'],
      rate:'quote_only', rate_cents:null,headline:'School uniforms, alterations, traditional wear.', available:true },
    { profile_id:'p-palesa',  trade_code:'accountant',  years_experience:7,  districts:['Maseru'],
      rate:'hourly',   rate_cents:25000, headline:'Bookkeeping and VAT returns for small businesses.', available:false }
  ],
  pitso_requests: [
    { id:'q-1', requester_id:'p-refiloe', trade_code:'electrician', district:'Maseru',
      title:'Three-phase supply for a new compressor', needed_by:'2026-09-19', budget_cents:400000,
      description:'Hardware shop in Lithabaneng. Compressor arrives Friday, nothing is wired for it.',
      state:'open', created_at:'2026-09-09T08:00:00Z' },
    { id:'q-2', requester_id:'p-palesa',  trade_code:'itsupport',   district:'Maseru',
      title:'Two workstations will not see the shared printer', needed_by:'2026-09-12', budget_cents:90000,
      description:'Worked until we changed routers. Everything else on the network is fine.',
      state:'open', created_at:'2026-09-10T06:15:00Z' },
    { id:'q-3', requester_id:'p-lineo',   trade_code:'welder',      district:'Berea',
      title:'Burglar bars for four windows', needed_by:'2026-09-30', budget_cents:250000,
      state:'open', created_at:'2026-09-06T15:20:00Z' },
    { id:'q-old-1', requester_id:'p-refiloe', trade_code:'electrician', district:'Maseru',
      title:'Rewire the shop', state:'closed', created_at:'2026-07-10T08:00:00Z' },
    { id:'q-old-2', requester_id:'p-palesa',  trade_code:'electrician', district:'Maseru',
      title:'DB board and two new circuits', state:'closed', created_at:'2026-08-01T08:00:00Z' },
    { id:'q-old-3', requester_id:'p-palesa',  trade_code:'seamstress',  district:'Maseru',
      title:'Forty school uniforms', state:'closed', created_at:'2026-08-09T08:00:00Z' },
    { id:'q-old-4', requester_id:'p-refiloe', trade_code:'plumber',     district:'Maseru',
      title:'Geyser replacement', state:'closed', created_at:'2026-09-06T08:00:00Z' }
  ],
  /* The offers the completed engagements came out of. They were referenced by
     e-1, e-2, e-3, e-4 and e-5 and never written, so every engagement in this
     file pointed at a row that did not exist — six dangling references. Found
     by the wiring build; core/test/core.test.js now fails if it happens again.
     The quotes agree with their engagement's agreed_cents. */
  pitso_offers: [
    { id:'o-1', request_id:'q-old-1', provider_id:'p-thabang', quote_cents:185000,
      message:'Rewire the shop over the weekend so you never close.',
      state:'accepted', created_at:'2026-07-12T09:00:00Z' },
    { id:'o-2', request_id:'q-old-2', provider_id:'p-thabang', quote_cents:62000,
      message:'DB board and the two circuits. Half a day.',
      state:'accepted', created_at:'2026-08-02T14:20:00Z' },
    { id:'o-3', request_id:'q-old-3', provider_id:'p-lineo', quote_cents:48000,
      message:'Forty uniforms, four days.',
      state:'accepted', created_at:'2026-08-10T07:15:00Z' },
    { id:'o-4', request_id:'q-old-4', provider_id:'p-teboho', quote_cents:240000,
      message:'Geyser replacement and the pressure valve.',
      state:'accepted', created_at:'2026-09-07T11:00:00Z' },
    { id:'o-5', request_id:'q-1', provider_id:'p-thabang', quote_cents:365000,
      message:'Can start Thursday. Price includes the isolator and the certificate of compliance.',
      state:'offered', created_at:'2026-09-09T11:30:00Z' }
  ],

  /* The closed requests those offers answered. Kept so a completed job can be
     opened and read, rather than dead-ending at a missing row. */
  /* ---- MAFISA ---- */
  mafisa_assets: [
    { id:'a-1', owner_id:'p-thabang', category:'vehicle', title:'Toyota Hilux single cab, 2016',
      district:'Maseru', condition:'Good. 240,000 km. Canopy fitted.',
      daily_cents:45000, deposit_cents:150000, proof_doc_id:'d-3', listed:true },
    { id:'a-2', owner_id:'p-refiloe', category:'construction', title:'Concrete mixer, 500 litre, petrol',
      district:'Maseru', condition:'Serviced August 2026.',
      daily_cents:28000, deposit_cents:80000, proof_doc_id:'d-8', listed:true },
    { id:'a-3', owner_id:'p-sello',   category:'livestock', title:'Two Brahman bulls, breeding',
      district:'Leribe', condition:'Four and six years. Vaccinations current.',
      daily_cents:null, deposit_cents:null, proof_doc_id:null, listed:false },
    { id:'a-4', owner_id:'p-mokoto',  category:'tractor', title:'Massey Ferguson 385 with disc plough',
      district:'Leribe', condition:'Association-owned. Operator can be arranged.',
      daily_cents:95000, deposit_cents:300000, proof_doc_id:null, listed:false },
    { id:'a-5', owner_id:'p-lineo',   category:'sewing', title:'Industrial overlocker, 5-thread',
      district:'Berea', condition:'Working. Serviced twice a year.',
      daily_cents:12000, deposit_cents:40000, proof_doc_id:null, listed:false }
  ],
  mafisa_loans: [
    { id:'l-1', asset_id:'a-1', borrower_id:'p-lineo', from_date:'2026-08-21', to_date:'2026-08-23',
      agreed_cents:135000, state:'returned', created_at:'2026-08-19T10:00:00Z',
      out_note:'Full tank, canopy clean.', return_note:'Back on time, fuel low.' },
    { id:'l-2', asset_id:'a-1', borrower_id:'p-refiloe', from_date:'2026-09-14', to_date:'2026-09-16',
      agreed_cents:135000, state:'agreed', created_at:'2026-09-08T13:00:00Z' },
    { id:'l-3', asset_id:'a-2', borrower_id:'p-teboho',  from_date:'2026-09-11', to_date:'2026-09-13',
      agreed_cents:84000,  state:'requested', created_at:'2026-09-10T05:40:00Z' }
  ],

  /* ---- MATSEMA ---- */
  matsema_pools: [
    /* A finished pool, so a completed engagement has somewhere real to point.
       It also shows a new member what a pool looks like when it worked. */
    { id:'m-0', convenor_id:'p-mokoto', title:'Cabbage — July order, delivered',
      district:'Leribe', target_kind:'volume', target_value:2000, unit:'kg',
      buyer:'Khotso Supermarket (Maseru)', closes_on:'2026-07-30', state:'closed',
      purpose:'The first order this group filled together. Two farmers, 2,100 kg against 2,000 promised.' },
    { id:'m-1', convenor_id:'p-mokoto', title:'Cabbage for Khotso Supermarket — October order',
      district:'Leribe', target_kind:'volume', target_value:12000, unit:'kg',
      buyer:'Khotso Supermarket (Maseru)', closes_on:'2026-10-15', state:'forming',
      purpose:'The buyer wants 12 tonnes a month, delivered weekly. No one of us can fill that alone, and none of us has been able to bid.' },
    { id:'m-2', convenor_id:'p-sello',  title:'Mohair clip — pooled for the winter auction',
      district:'Leribe', target_kind:'volume', target_value:2500, unit:'kg',
      buyer:'—', closes_on:'2026-11-30', state:'forming',
      purpose:'A pooled clip is graded and sold as one lot. Small clips sold separately take the lowest grade price.' },
    { id:'m-3', convenor_id:'p-mokoto', title:'Shared cold room — Hlotse',
      district:'Leribe', target_kind:'amount', target_value:85000, unit:'LSL',
      closes_on:'2027-02-28', state:'forming',
      purpose:'Twelve members losing produce to heat between harvest and market day.' }
  ],
  matsema_pledges: [
    /* Belongs to m-0, the pool that closed in July. Putting it on a LIVE pool
       would have moved that pool's totals and quietly changed what the app
       demonstrates — m-1 must stay 5,500 pledged / 3,500 confirmed of 12,000. */
    { id:'g-1', pool_id:'m-0', member_id:'p-nthabi', amount:2100, state:'delivered',
      note:'Delivered 2,100 kg against a 2,000 kg pledge, on the day.' },
    { id:'g-2', pool_id:'m-1', member_id:'p-nthabi',  amount:3500, state:'confirmed', note:'Two plantings, staggered.' },
    { id:'g-3', pool_id:'m-1', member_id:'p-sello',   amount:1200, state:'pledged' },
    { id:'g-4', pool_id:'m-1', member_id:'p-refiloe', amount:800,  state:'pledged' },
    { id:'g-5', pool_id:'m-2', member_id:'p-sello',   amount:900,  state:'confirmed' },
    { id:'g-6', pool_id:'m-3', member_id:'p-nthabi',  amount:8000, state:'pledged' }
  ]
};
