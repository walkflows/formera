-- FORMERA — read-only diagnostic part 2: every user table outside Supabase's own schemas,
-- with an estimated row count (from statistics, no table contents read).
-- Changes nothing. Run after 00_diagnose_schemas_readonly.sql.

select n.nspname as schema_name,
       c.relname as table_name,
       c.relrowsecurity as rls_enabled,
       s.n_live_tup as approx_rows
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
left join pg_stat_user_tables s on s.relid = c.oid
where c.relkind in ('r', 'p')
  and n.nspname not in ('pg_catalog', 'information_schema', 'pg_toast', 'auth', 'storage', 'realtime',
                        'supabase_functions', 'supabase_migrations', 'extensions', 'graphql', 'graphql_public',
                        'pgsodium', 'pgsodium_masks', 'vault', 'net', 'cron', '_realtime', '_analytics')
order by n.nspname, c.relname;
