-- FORMERA — one enquiry per (session, request), even when identical requests arrive at
-- the same moment. Project: imwfnbnwlrszafquxjud.
--
-- APPLIED 9 Oct 2026 in the Supabase SQL Editor; verified (constraint
-- demo_real_estate_enquiries_session_request_key exists). Structure backup taken first:
--   Documents\walkflow-n8n-migration\formera-supabase-backup\2026-10-09-pre-formera-consolidation\structure-backup.json
--
-- Why: on 9 Oct 2026 (test T11) two identical requests sent at the same instant both passed
-- the workflow's duplicate check and created two enquiries. The backup shows
-- demo_real_estate_viewings ALREADY has UNIQUE (session_id, request_id)
-- (demo_real_estate_viewings_session_id_request_id_key), so only enquiries needs it.
-- With this constraint the second insert is rejected: the website shows "please try again",
-- a retry with the same requestId returns the saved enquiry as a duplicate, and the
-- Error Handler sends one alert for the rejected attempt.
--
-- Existing duplicates make this script stop with nothing changed. The extra synthetic T11
-- enquiry 41f41856-2e48-424b-b5a2-07a4b9d928f9 must be removed first (approved separately).
--
-- Rollback:
--   alter table public.demo_real_estate_enquiries drop constraint demo_real_estate_enquiries_session_request_key;

begin;

do $$
begin
  if exists (select 1 from public.demo_real_estate_enquiries
             group by session_id, request_id having count(*) > 1) then
    raise exception 'Duplicate (session_id, request_id) rows exist in demo_real_estate_enquiries; resolve them first.';
  end if;
end $$;

alter table public.demo_real_estate_enquiries
  add constraint demo_real_estate_enquiries_session_request_key unique (session_id, request_id);

commit;

-- Verify (expect 1 row):
--   select conname from pg_constraint
--   where conrelid = 'public.demo_real_estate_enquiries'::regclass and contype = 'u';
