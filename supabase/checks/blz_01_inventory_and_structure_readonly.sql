-- FORMERA — read-only inventory + structure backup of the SECOND project.
-- Project: blzvcwjvapngralswfto (https://blzvcwjvapngralswfto.supabase.co)
-- Check the browser address bar contains "blzvcwjvapngralswfto" before running.
-- Supabase -> SQL Editor -> New query -> paste -> Run. Changes nothing.
-- Returns ONE row with ONE json column ("inventory"). Export -> Download JSON and save as
--   Documents\walkflow-n8n-migration\formera-supabase-backup\2026-10-09-blzvcwjvapngralswfto\structure-backup.json
-- Contains NO row contents and no secrets: names, definitions, rules and counts only.
-- Covers every table in every non-Supabase schema (names are not known in advance).

with t as (
  select c.oid, n.nspname, c.relname, c.relkind, c.relrowsecurity, c.relforcerowsecurity
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where c.relkind in ('r', 'p', 'v', 'm')
    and n.nspname not in ('pg_catalog', 'information_schema', 'pg_toast', 'auth', 'storage', 'realtime',
                          'supabase_functions', 'supabase_migrations', 'extensions', 'graphql', 'graphql_public',
                          'pgsodium', 'pgsodium_masks', 'vault', 'net', 'cron', '_realtime', '_analytics', 'pgbouncer')
    and left(n.nspname, 3) <> 'pg_'
)
select jsonb_build_object(
  'taken_at', now(),
  'project_hint', 'blzvcwjvapngralswfto',
  'table_count', (select count(*) from t where relkind in ('r', 'p')),
  'tables', (select coalesce(jsonb_agg(jsonb_build_object(
      'schema', t.nspname, 'table', t.relname, 'kind', t.relkind,
      'exact_rows', case when t.relkind in ('r', 'p', 'm') then
          (xpath('/row/c/text()', query_to_xml(format('select count(*) as c from %I.%I', t.nspname, t.relname), false, true, '')))[1]::text::bigint end,
      'rls_enabled', t.relrowsecurity, 'rls_forced', t.relforcerowsecurity,
      'view_definition', case when t.relkind in ('v', 'm') then pg_get_viewdef(t.oid) end,
      'columns', (select jsonb_agg(jsonb_build_object('name', a.attname, 'type', format_type(a.atttypid, a.atttypmod),
          'not_null', a.attnotnull, 'default', pg_get_expr(d.adbin, d.adrelid)) order by a.attnum)
        from pg_attribute a left join pg_attrdef d on d.adrelid = a.attrelid and d.adnum = a.attnum
        where a.attrelid = t.oid and a.attnum > 0 and not a.attisdropped),
      'constraints', (select coalesce(jsonb_agg(jsonb_build_object('name', con.conname, 'type', con.contype,
          'def', pg_get_constraintdef(con.oid)) order by con.conname), '[]'::jsonb) from pg_constraint con where con.conrelid = t.oid),
      'indexes', (select coalesce(jsonb_agg(i.indexdef order by i.indexname), '[]'::jsonb)
        from pg_indexes i where i.schemaname = t.nspname and i.tablename = t.relname),
      'triggers', (select coalesce(jsonb_agg(pg_get_triggerdef(tg.oid) order by tg.tgname), '[]'::jsonb)
        from pg_trigger tg where tg.tgrelid = t.oid and not tg.tgisinternal),
      'grants', (select coalesce(jsonb_agg(jsonb_build_object('grantee', g.grantee, 'privilege', g.privilege_type)
          order by g.grantee, g.privilege_type), '[]'::jsonb)
        from information_schema.role_table_grants g where g.table_schema = t.nspname and g.table_name = t.relname)
    ) order by t.nspname, t.relname), '[]'::jsonb) from t),
  'policies', (select coalesce(jsonb_agg(jsonb_build_object('schema', n.nspname, 'table', c.relname, 'name', pol.polname,
      'command', pol.polcmd, 'permissive', pol.polpermissive,
      'roles', (select coalesce(jsonb_agg(case when r = 0 then 'public' else r::regrole::text end), '[]'::jsonb) from unnest(pol.polroles) r),
      'using', pg_get_expr(pol.polqual, pol.polrelid), 'with_check', pg_get_expr(pol.polwithcheck, pol.polrelid))
      order by n.nspname, c.relname, pol.polname), '[]'::jsonb)
    from pg_policy pol join pg_class c on c.oid = pol.polrelid join pg_namespace n on n.oid = c.relnamespace
    where n.nspname not in ('auth', 'storage', 'realtime', 'supabase_functions', 'vault')),
  'storage_policies', (select coalesce(jsonb_agg(jsonb_build_object('table', c.relname, 'name', pol.polname,
      'command', pol.polcmd, 'using', pg_get_expr(pol.polqual, pol.polrelid), 'with_check', pg_get_expr(pol.polwithcheck, pol.polrelid))
      order by c.relname, pol.polname), '[]'::jsonb)
    from pg_policy pol join pg_class c on c.oid = pol.polrelid join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'storage'),
  'functions', (select coalesce(jsonb_agg(jsonb_build_object('schema', n.nspname, 'name', p.proname,
      'security_definer', p.prosecdef, 'definition', pg_get_functiondef(p.oid), 'grants', p.proacl::text) order by n.nspname, p.proname), '[]'::jsonb)
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.prokind = 'f'),
  'storage_buckets', (select coalesce(jsonb_agg(jsonb_build_object('id', b.id, 'name', b.name, 'public', b.public,
      'file_size_limit', b.file_size_limit, 'allowed_mime_types', b.allowed_mime_types,
      'objects', (select count(*) from storage.objects o where o.bucket_id = b.id),
      'total_bytes', (select coalesce(sum((o.metadata->>'size')::bigint), 0) from storage.objects o where o.bucket_id = b.id))
      order by b.name), '[]'::jsonb) from storage.buckets b),
  'auth_users', (select count(*) from auth.users),
  'auth_identity_providers', (select coalesce(jsonb_agg(distinct i.provider), '[]'::jsonb) from auth.identities i),
  'extensions', (select coalesce(jsonb_agg(e.extname order by e.extname), '[]'::jsonb) from pg_extension e),
  'cron_schema_present', (select exists (select 1 from pg_namespace where nspname = 'cron'))
) as inventory;
