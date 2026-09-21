/* Supabase connection. EMPTY BY DEFAULT — the apps run in device-preview mode
   until this is filled in, and say so on screen.

   Fill in ONLY the project URL and the ANON (public) key. The service_role key
   must never appear in a file that a browser downloads: it bypasses every
   policy in db/003_rls.sql, which is the entire protection on this data.

   window.MEND_CONFIG = {
     supabaseUrl:     'https://xxxxxxxx.supabase.co',
     supabaseAnonKey: 'eyJhbGciOi...'
   };
*/
window.MEND_CONFIG = {};
