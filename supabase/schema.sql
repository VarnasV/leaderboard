-- Create a table for employees
create table employees (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  dvd_score integer default 0,
  avatar text,
  department text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table employees enable row level security;

-- Create a policy that allows read access to everyone (authenticated)
create policy "Enable read access for authenticated users"
  on employees for select
  to authenticated
  using (true);

-- Create a policy that allows insert/update/delete only for authenticated users (or specific roles if needed)
-- For now, allow all authenticated users to modify (you might want to restrict this to admins)
create policy "Enable write access for authenticated users"
  on employees for insert
  to authenticated
  with check (true);

create policy "Enable update access for authenticated users"
  on employees for update
  to authenticated
  using (true);

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

