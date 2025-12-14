-- Create a table for employees
create extension if not exists pgcrypto;

create table if not exists employees (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  dvd_score integer default 0,
  avatar text,
  department text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table employees enable row level security;

-- Create policies (drop first to allow idempotency)
drop policy if exists "Enable read access for authenticated users" on employees;
create policy "Enable read access for authenticated users"
  on employees for select
  to authenticated
  using (true);

drop policy if exists "Enable write access for authenticated users" on employees;
create policy "Enable write access for authenticated users"
  on employees for insert
  to authenticated
  with check (true);

drop policy if exists "Enable update access for authenticated users" on employees;
create policy "Enable update access for authenticated users"
  on employees for update
  to authenticated
  using (true);

drop policy if exists "Enable delete access for authenticated users" on employees;
create policy "Enable delete access for authenticated users"
  on employees for delete
  to authenticated
  using (true);

-- Insert some mock data
insert into employees (name, dvd_score, avatar, department) values
  ('Sarah Mitchell', 2847, 'SM', 'Engineering'),
  ('James Rodriguez', 2635, 'JR', 'Product'),
  ('Emily Chen', 2521, 'EC', 'Design'),
  ('Michael Brown', 2398, 'MB', 'Engineering'),
  ('Lisa Anderson', 2287, 'LA', 'Marketing'),
  ('David Kim', 2156, 'DK', 'Sales'),
  ('Rachel Green', 2089, 'RG', 'Engineering'),
  ('Tom Wilson', 1974, 'TW', 'Product'),
  ('Anna Martinez', 1856, 'AM', 'Design'),
  ('Chris Taylor', 1743, 'CT', 'Engineering');

-- Create a user in the auth.users table
do $$
begin
  if not exists (select 1 from auth.users where email = 'vidmantas.varnas.faustas@gmail.com') then
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'vidmantas.varnas.faustas@gmail.com',
      extensions.crypt('password123', extensions.gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  end if;
end
$$;

-- Insert into public.employees table if you want this user to be an employee as well
-- Note: You'll need the ID generated above if you want to link them, 
-- but auth.users and public.employees are often separate in this simple setup unless linked by ID.
-- For this simple app, we just need the auth user to log in.

