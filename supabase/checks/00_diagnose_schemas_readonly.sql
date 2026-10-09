-- FORMERA — read-only diagnostic: which project is this, and where are the tables?
-- Changes nothing. Run it in Supabase -> SQL Editor -> New query -> Run.
--
-- Expected in project imwfnbnwlrszafquxjud (as read through its API on 9 Oct 2026):
--   10 tables named demo_real_estate_* in schema public,
--   demo_real_estate_agents = 3 rows, _properties = 15, _enquiries = 14, _viewings = 7.
-- Shows table names and row counts only, no table contents.

-- 1. Every non-system schema and how many tables / FORMERA-named tables it has.
select n.nspname as schema_name,
       count(*) filter (where c.relkind in ('r', 'p'))                                    as tables,
       count(*) filter (where c.relkind in ('r', 'p') and position('real_estate' in c.relname) > 0) as real_estate_tables
from pg_namespace n
left join pg_class c on c.relnamespace = n.oid
where n.nspname not in ('pg_catalog', 'information_schema', 'pg_toast')
  and n.nspname not like 'pg\_temp%' and n.nspname not like 'pg\_toast\_temp%'
group by n.nspname
order by real_estate_tables desc, schema_name;
