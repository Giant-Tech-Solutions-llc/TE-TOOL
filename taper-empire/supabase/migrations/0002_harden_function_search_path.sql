-- 0002_harden_function_search_path.sql
-- Pins set_updated_at's search_path (clears the Supabase "function_search_path_mutable"
-- security advisor). now() resolves from pg_catalog regardless, so '' is safe.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
