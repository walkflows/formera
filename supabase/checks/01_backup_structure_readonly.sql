-- FORMERA — read-only structure backup (run BEFORE any database change).
-- Project: imwfnbnwlrszafquxjud. Supabase dashboard -> SQL Editor -> New query -> paste -> Run.
-- Changes nothing. Returns ONE row with ONE json column ("backup"): Export -> Download JSON, and save it in
-- Documents\walkflow-n8n-migration\formera-supabase-backup\2026-10-09-pre-formera-consolidation\structure-backup.json
-- Contains no table contents and no secrets (row counts only).
--
-- v2 (9 Oct 2026): v1 matched names with LIKE 'demo\_real\_estate\_%' and returned nulls.
-- v2 uses the exact FORMERA table and function names instead of a pattern.
-- "missing_tables" must be [] and "table_count" must be 10.

with wanted(name) as (
  values ('demo_real_estate_activity_events'), ('demo_real_estate_agents'), ('demo_real_estate_assignments'),
         ('demo_real_estate_enquiries'), ('demo_real_estate_jobs'), ('demo_real_estate_matches'),
         ('demo_real_estate_properties'), ('demo_real_estate_sessions'), ('demo_real_estate_tasks'),
         ('demo_real_estate_viewings')
),
t as (
  select c.oid, c.relname, c.relrowsecurity, c.relforcerowsecurity
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  join wanted w on w.name = c.relname
  where n.nspname = 'public' and c.relkind in ('r', 'p')
)
select jsonb_build_object(
  'taken_at', now(),
  'project_hint', 'imwfnbnwlrszafquxjud',
  'table_count', (select count(*) from t),
  'missing_tables', (select coalesce(jsonb_agg(w.name), '[]'::jsonb) from wanted w where w.name not in (select relname from t)),
  'row_counts', jsonb_build_object(
      'demo_real_estate_activity_events', (select count(*) from public.demo_real_estate_activity_events),
      'demo_real_estate_agents',          (select count(*) from public.demo_real_estate_agents),
      'demo_real_estate_assignments',     (select count(*) from public.demo_real_estate_assignments),
      'demo_real_estate_enquiries',       (select count(*) from public.demo_real_estate_enquiries),
      'demo_real_estate_jobs',            (select count(*) from public.demo_real_estate_jobs),
      'demo_real_estate_matches',         (select count(*) from public.demo_real_estate_matches),
      'demo_real_estate_properties',      (select count(*) from public.demo_real_estate_properties),
      'demo_real_estate_sessions',        (select count(*) from public.demo_real_estate_sessions),
      'demo_real_estate_tasks',           (select count(*) from public.demo_real_estate_tasks),
      'demo_real_estate_viewings',        (select count(*) from public.demo_real_estate_viewings)),
  'tables', (select jsonb_agg(jsonb_build_object(
      'table', t.relname,
      'rls_enabled', t.relrowsecurity,
      'rls_forced', t.relforcerowsecurity,
      'columns', (select jsonb_agg(jsonb_build_object(
          'name', a.attname, 'type', format_type(a.atttypid, a.atttypmod), 'not_null', a.attnotnull,
          'default', pg_get_expr(d.adbin, d.adrelid)) order by a.attnum)
        from pg_attribute a left join pg_attrdef d on d.adrelid = a.attrelid and d.adnum = a.attnum
        where a.attrelid = t.oid and a.attnum > 0 and not a.attisdropped),
      'constraints', (select coalesce(jsonb_agg(jsonb_build_object('name', con.conname, 'type', con.contype,
          'def', pg_get_constraintdef(con.oid)) order by con.conname), '[]'::jsonb)
        from pg_constraint con where con.conrelid = t.oid),
      'indexes', (select coalesce(jsonb_agg(i.indexdef order by i.indexname), '[]'::jsonb)
        from pg_indexes i where i.schemaname = 'public' and i.tablename = t.relname),
      'triggers', (select coalesce(jsonb_agg(pg_get_triggerdef(tg.oid) order by tg.tgname), '[]'::jsonb)
        from pg_trigger tg where tg.tgrelid = t.oid and not tg.tgisinternal),
      'grants', (select coalesce(jsonb_agg(jsonb_build_object('grantee', g.grantee, 'privilege', g.privilege_type)
          order by g.grantee, g.privilege_type), '[]'::jsonb)
        from information_schema.role_table_grants g where g.table_schema = 'public' and g.table_name = t.relname),
      'column_grants', (select coalesce(jsonb_agg(jsonb_build_object('grantee', g.grantee, 'column', g.column_name,
          'privilege', g.privilege_type)), '[]'::jsonb)
        from information_schema.column_privileges g
        where g.table_schema = 'public' and g.table_name = t.relname and g.grantee in ('anon', 'authenticated'))
    ) order by t.relname) from t),
  'policies', (select coalesce(jsonb_agg(jsonb_build_object('table', p.tablename, 'name', p.policyname,
      'permissive', p.permissive, 'roles', p.roles, 'command', p.cmd, 'using', p.qual, 'with_check', p.with_check)
      order by p.tablename, p.policyname), '[]'::jsonb)
    from pg_policies p join wanted w on w.name = p.tablename where p.schemaname = 'public'),
  'functions', (select coalesce(jsonb_agg(jsonb_build_object('schema', n.nspname, 'name', p.proname,
      'definition', pg_get_functiondef(p.oid), 'grants', p.proacl::text) order by p.proname), '[]'::jsonb)
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.prokind = 'f'
      and (left(p.proname, 17) = 'demo_real_estate_'
           or p.oid in (select tg.tgfoid from pg_trigger tg join t on t.oid = tg.tgrelid where not tg.tgisinternal))),
  -- pg_cron: the 00 diagnostic (9 Oct 2026) showed no "cron" schema, so there are no scheduled database jobs.
  'cron_schema_present', (select exists (select 1 from pg_namespace where nspname = 'cron'))
) as backup;
