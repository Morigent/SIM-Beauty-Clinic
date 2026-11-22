-- LuxeDerm — Phase 2: identity, catalog, booking.
-- Source of truth: prd.md §5.1–§5.4, §5.9, §6.1.
--
-- Deliberate deviations from prd.md, both additive:
--   * public.profiles.address      — the profile screen collects a home address
--                                    and §5.2 has no column for it.
--   * public.treatments.slug /
--     public.doctor_profiles.slug  — stable slugs so the presentation ids in
--                                    src/utils/data.ts map onto uuid primary keys.
--
-- Not included yet (Phase 2 remainder): doctor_schedules, schedule_exceptions and
-- the available_slots() RPC. The booking screen still renders the fixed
-- TIME_SLOTS grid; the database enforces NFR-06 through the partial unique index.

create type public.user_role as enum ('patient', 'employee', 'doctor', 'admin');
create type public.appointment_status as enum
  ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');

-- ---------------------------------------------------------------------------
-- Identity
-- ---------------------------------------------------------------------------

create table public.profiles (
  id         uuid primary key references auth.users on delete cascade,
  role       public.user_role not null default 'patient',
  full_name  text not null,
  phone      text,
  dob        date,
  address    text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.patient_details (
  patient_id      uuid primary key references public.profiles(id) on delete cascade,
  allergies       text[] default '{}',
  medical_history text,
  emergency_name  text,
  emergency_phone text
);

create table public.doctor_profiles (
  doctor_id   uuid primary key references public.profiles(id) on delete cascade,
  slug        text not null unique,
  specialty   text not null,
  bio         text,
  avatar_path text,
  is_active   boolean not null default true
);

-- ---------------------------------------------------------------------------
-- Catalog
-- ---------------------------------------------------------------------------

create table public.treatments (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  category     text not null,
  description  text,
  duration_min int  not null check (duration_min > 0),
  price_idr    int  not null check (price_idr >= 0),
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table public.doctor_treatments (
  doctor_id    uuid references public.doctor_profiles(doctor_id) on delete cascade,
  treatment_id uuid references public.treatments(id) on delete cascade,
  primary key (doctor_id, treatment_id)
);

-- ---------------------------------------------------------------------------
-- Booking
-- ---------------------------------------------------------------------------

create table public.appointments (
  id                  uuid primary key default gen_random_uuid(),
  patient_id          uuid references public.profiles(id) not null,
  doctor_id           uuid references public.doctor_profiles(doctor_id) not null,
  treatment_id        uuid references public.treatments(id) not null,
  starts_at           timestamptz not null,
  ends_at             timestamptz not null,
  status              public.appointment_status not null default 'pending',
  dp_amount_idr       int not null default 0,
  source              text not null default 'app',
  cancellation_reason text,
  reminder_sent_at    timestamptz,
  created_by          uuid references public.profiles(id) default auth.uid(),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  check (ends_at > starts_at)
);

-- NFR-06: double-booking is rejected by the database, not the UI.
create unique index appointments_no_double_booking
  on public.appointments (doctor_id, starts_at)
  where status in ('pending', 'confirmed');

create index appointments_patient_starts_at_idx
  on public.appointments (patient_id, starts_at desc);

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------

create function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger treatments_set_updated_at before update on public.treatments
  for each row execute function public.set_updated_at();
create trigger appointments_set_updated_at before update on public.appointments
  for each row execute function public.set_updated_at();

-- prd.md §5.2: only staff may change a profile role.
create function public.protect_role_change() returns trigger
language plpgsql as $$
begin
  if new.role is distinct from old.role
     and current_user in ('authenticated', 'anon') then
    raise exception 'profiles.role can only be changed by staff'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

create trigger profiles_protect_role_change before update on public.profiles
  for each row execute function public.protect_role_change();

-- Every auth user gets a profile row; full_name comes from signUp metadata.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      split_part(coalesce(new.email, ''), '@', 1)
    ),
    new.phone
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row level security (prd.md §5.9)
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.patient_details enable row level security;
alter table public.doctor_profiles enable row level security;
alter table public.treatments enable row level security;
alter table public.doctor_treatments enable row level security;
alter table public.appointments enable row level security;

create policy profiles_select_self on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

create policy profiles_update_self on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy patient_details_select_self on public.patient_details
  for select to authenticated using ((select auth.uid()) = patient_id);

create policy patient_details_insert_self on public.patient_details
  for insert to authenticated with check ((select auth.uid()) = patient_id);

create policy patient_details_update_self on public.patient_details
  for update to authenticated
  using ((select auth.uid()) = patient_id)
  with check ((select auth.uid()) = patient_id);

create policy doctor_profiles_select_all on public.doctor_profiles
  for select to anon, authenticated using (true);

create policy treatments_select_all on public.treatments
  for select to anon, authenticated using (true);

create policy doctor_treatments_select_all on public.doctor_treatments
  for select to anon, authenticated using (true);

create policy appointments_select_patient on public.appointments
  for select to authenticated using ((select auth.uid()) = patient_id);

create policy appointments_select_doctor on public.appointments
  for select to authenticated using ((select auth.uid()) = doctor_id);

create policy appointments_insert_patient on public.appointments
  for insert to authenticated with check ((select auth.uid()) = patient_id);

create policy appointments_update_patient on public.appointments
  for update to authenticated
  using ((select auth.uid()) = patient_id)
  with check ((select auth.uid()) = patient_id);

-- ---------------------------------------------------------------------------
-- Catalog seed — slugs match src/utils/data.ts.
-- price_idr is the seed value for the local catalog's USD display, converted at
-- Rp 16.000/USD; the UI keeps rendering its own price strings until the catalog
-- is read from the database.
-- ---------------------------------------------------------------------------

insert into public.treatments (slug, name, category, description, duration_min, price_idr)
values
  ('hydrafacial', 'HydraFacial', 'facial',
   'Deep cleanse, exfoliation, and hydration in one treatment for an instant glow.',
   45, 1920000),
  ('microneedling', 'Microneedling', 'resurfacing',
   'Fine needles stimulate collagen to smooth texture, scars, and fine lines.',
   60, 2880000),
  ('chemical-peel', 'Chemical Peel', 'resurfacing',
   'A gentle acid solution resurfaces skin, improving tone and clarity.',
   30, 1440000),
  ('dermaplaning', 'Dermaplaning', 'resurfacing',
   'Removes dead skin and fine vellus hair for a smooth, radiant surface.',
   30, 1120000),
  ('botox', 'Botox', 'injectables',
   'Relaxes targeted muscles to soften expression lines and wrinkles.',
   20, 4000000);

-- Doctor accounts are seeded without a password: they exist so appointments can
-- reference them, not for signing in.
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
select
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  d.email,
  null,
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  jsonb_build_object('full_name', d.full_name),
  now(),
  now()
from (values
  ('dr.ava@luxederm.com',  'Dr. Ava Chen'),
  ('dr.noah@luxederm.com', 'Dr. Noah Patel'),
  ('dr.mia@luxederm.com',  'Dr. Mia Rossi'),
  ('dr.liam@luxederm.com', 'Dr. Liam Kim'),
  ('dr.sora@luxederm.com', 'Dr. Sora Tan')
) as d(email, full_name);

update public.profiles p
set role = 'doctor'
where p.id in (
  select u.id from auth.users u where u.email like 'dr.%@luxederm.com'
);

insert into public.doctor_profiles (doctor_id, slug, specialty, bio)
select u.id, d.slug, d.specialty, d.bio
from (values
  ('dr.ava@luxederm.com', 'ava', 'Facial aesthetics',
   'Ava pairs gentle exfoliation with deep hydration to bring out skin''s natural glow without overdoing it.'),
  ('dr.noah@luxederm.com', 'noah', 'Cosmetic dermatology',
   'Noah focuses on texture and tone, using collagen-stimulating and muscle-relaxing treatments for a refreshed look.'),
  ('dr.mia@luxederm.com', 'mia', 'Skin rejuvenation',
   'Mia blends resurfacing peels with hydrating facials, tailoring each step to sensitive and combination skin.'),
  ('dr.liam@luxederm.com', 'liam', 'Dermatologic surgery',
   'Liam handles precise, low-downtime procedures and pairs them with surface smoothing for an even result.'),
  ('dr.sora@luxederm.com', 'sora', 'Laser therapy',
   'Sora specialises in energy-based treatments for pigmentation, redness, and scarring, guided by skin-type analysis.')
) as d(email, slug, specialty, bio)
join auth.users u on u.email = d.email;

insert into public.doctor_treatments (doctor_id, treatment_id)
select dp.doctor_id, t.id
from (values
  ('ava', 'hydrafacial'), ('ava', 'dermaplaning'), ('ava', 'chemical-peel'),
  ('noah', 'microneedling'), ('noah', 'botox'),
  ('mia', 'chemical-peel'), ('mia', 'hydrafacial'), ('mia', 'botox'),
  ('liam', 'microneedling'), ('liam', 'dermaplaning'), ('liam', 'hydrafacial')
) as m(doctor_slug, treatment_slug)
join public.doctor_profiles dp on dp.slug = m.doctor_slug
join public.treatments t on t.slug = m.treatment_slug;
