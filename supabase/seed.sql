-- Demo QA accounts. Email confirmation is enabled on the project, so an account
-- cannot be completed from the app without a working SMTP setup. These two rows
-- keep the demo usable; delete them once real onboarding is live.
-- Passwords are the same demo credentials the app shipped with before Supabase
-- auth existed (previously in src/utils/data.ts).

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
select
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  v.email,
  extensions.crypt(v.password, extensions.gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  jsonb_build_object('full_name', v.full_name),
  now(),
  now()
from (values
  ('ava@luxederm.com',  'ava123',  'Ava Chen'),
  ('noah@luxederm.com', 'noah123', 'Noah Patel')
) as v(email, password, full_name)
where not exists (select 1 from auth.users u where u.email = v.email);

insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
select
  u.email,
  u.id,
  jsonb_build_object('sub', u.id::text, 'email', u.email, 'email_verified', true),
  'email',
  now(), now(), now()
from auth.users u
where u.email in ('ava@luxederm.com', 'noah@luxederm.com')
  and not exists (
    select 1 from auth.identities i
    where i.provider_id = u.email and i.provider = 'email'
  );

-- GoTrue scans these token columns into non-nullable strings; rows inserted by
-- SQL must carry '' rather than null or every auth query fails with
-- "Database error querying schema".
update auth.users
set
  confirmation_token         = coalesce(confirmation_token, ''),
  recovery_token             = coalesce(recovery_token, ''),
  email_change               = coalesce(email_change, ''),
  email_change_token_new     = coalesce(email_change_token_new, ''),
  email_change_token_current = coalesce(email_change_token_current, ''),
  phone_change               = coalesce(phone_change, ''),
  phone_change_token         = coalesce(phone_change_token, ''),
  reauthentication_token     = coalesce(reauthentication_token, '');
