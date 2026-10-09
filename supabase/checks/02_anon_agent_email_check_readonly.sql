-- FORMERA — can anonymous visitors read agent email addresses? (read-only)
-- Project: imwfnbnwlrszafquxjud. Run in the SQL Editor. Changes nothing.
-- Returns ONE row of yes/no answers and counts. Never shows names or email addresses.
--
-- "anon" is the database role used by anyone holding the public (anon / publishable) key.
-- Agent emails are exposed only if anon can SELECT the email column AND row-level
-- security lets rows through (RLS off, or a policy that applies to anon/public).
--
-- The two policy counts are taken directly from the system catalogue with NO name
-- filter, to confirm independently whether the backup's empty "policies" list is real.

select
  -- independent policy counts
  (select count(*) from pg_catalog.pg_policy)                                   as policies_in_whole_database,
  (select count(*) from pg_catalog.pg_policy pol
     join pg_catalog.pg_class c on c.oid = pol.polrelid
     join pg_catalog.pg_namespace n on n.oid = c.relnamespace
     where n.nspname = 'public')                                                as policies_in_public_schema,

  -- agents table
  c.relrowsecurity                                                              as agents_rls_enabled,
  c.relforcerowsecurity                                                         as agents_rls_forced,
  has_table_privilege('anon', c.oid, 'SELECT')                                  as anon_has_select_grant,
  has_column_privilege('anon', c.oid, 'email', 'SELECT')                        as anon_has_email_column_grant,
  (select count(*) from pg_catalog.pg_policy pol where pol.polrelid = c.oid)    as policies_on_agents,
  (select count(*) from pg_catalog.pg_policy pol
     where pol.polrelid = c.oid and pol.polcmd in ('r', '*')
       and (pol.polroles = '{0}'::oid[]                                          -- 0 = PUBLIC (everyone)
            or 'anon'::regrole::oid = any (pol.polroles)))                       as anon_read_policies_on_agents,
  (select count(*) from public.demo_real_estate_agents
     where coalesce(email, '') <> '')                                           as agents_with_email,

  -- plain-English verdict
  case
    when not has_column_privilege('anon', c.oid, 'email', 'SELECT') then 'NOT EXPOSED: anon has no permission on the email column'
    when not c.relrowsecurity then 'EXPOSED: RLS is off and anon may read the email column'
    when (select count(*) from pg_catalog.pg_policy pol
            where pol.polrelid = c.oid and pol.polcmd in ('r', '*')
              and (pol.polroles = '{0}'::oid[] or 'anon'::regrole::oid = any (pol.polroles))) > 0
      then 'EXPOSED: a policy lets anon read agent rows'
    else 'NOT EXPOSED: RLS is on and no policy lets anon read agent rows'
  end                                                                           as verdict
from pg_catalog.pg_class c
join pg_catalog.pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname = 'demo_real_estate_agents';

-- Optional real-world confirmation (also read-only), with the project's anon/publishable key:
--   node supabase/checks/anon-agent-check.mjs   -> prints counts only, never addresses.
