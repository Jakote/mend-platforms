/* MEND Services' own Supabase connection. EMPTY BY DEFAULT, so the page runs as
   a device preview and says so.

   Its own file, not core/config.js, so that going live here does not switch
   Pitso, Mafisa and Matsema out of preview at the same time (spec section 6).
   Only the project URL and the ANON key ever go here. tools/deploy.py refuses
   service_role in any config it ships.

   window.MEND_CONFIG = { supabaseUrl: 'https://xxxx.supabase.co', supabaseAnonKey: '…' };
*/
window.MEND_CONFIG = {};
