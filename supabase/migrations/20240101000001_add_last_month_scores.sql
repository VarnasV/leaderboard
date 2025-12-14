alter table employees add column if not exists last_month_dvd_score integer default 0;

update employees set last_month_dvd_score = 2912 where name = 'James Rodriguez';
update employees set last_month_dvd_score = 2801 where name = 'Emily Chen';
update employees set last_month_dvd_score = 2654 where name = 'Michael Brown';

