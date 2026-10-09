-- FORMERA — stop anonymous/public reads of the agents table (contains agent email addresses).
-- Project: imwfnbnwlrszafquxjud.
--
-- NOT APPLIED AND NOT NEEDED (9 Oct 2026): 02_anon_agent_email_check_readonly.sql returned
-- "NOT EXPOSED" (RLS on, zero policies), so the owner decided not to apply this. Kept only for
-- reference outside supabase/migrations so no tool applies it by accident.
-- If a future check ever shows exposure, it could be run when BOTH are true:
--   1. supabase/checks/01_backup_structure_readonly.sql output has been saved, and
--   2. supabase/checks/02_anon_agent_email_check_readonly.sql shows exposure.
--
-- Who still has access afterwards: the service role only. FORMERA's server code
-- (SUPABASE_SERVICE_ROLE_KEY) and the n8n "Supabase account" credential both use the
-- service role, which is not affected by RLS or by these revokes.
-- Nothing in the browser reads this table (FORMERA has no public Supabase key).
--
-- Rollback: re-create the policies listed in the saved backup ("policies" for
-- demo_real_estate_agents) and re-grant: grant select on public.demo_real_estate_agents to anon, authenticated;

begin;

alter table public.demo_real_estate_agents enable row level security;

-- Remove every policy on this table that lets anon/public/authenticated read it.
do $$
declare p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'demo_real_estate_agents'
      and cmd in ('SELECT', 'ALL')
      and (roles && array['anon', 'public', 'authenticated']::name[])
  loop
    execute format('drop policy %I on public.demo_real_estate_agents', p.policyname);
  end loop;
end $$;

revoke all on table public.demo_real_estate_agents from anon, authenticated;

commit;

-- Verify (expect: anon_can_select_table = false, anon_select_policies = 0):
--   run supabase/checks/02_anon_agent_email_check_readonly.sql again, and optionally
--   node supabase/checks/anon-agent-check.mjs  (expect "Not exposed").
