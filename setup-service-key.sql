-- Set your service role key as a database setting
-- Replace YOUR_SERVICE_ROLE_KEY with your actual service role key from Supabase dashboard
ALTER DATABASE postgres SET app.service_role_key = 'YOUR_SERVICE_ROLE_KEY';

-- Alternative: You can also set it at the session level for testing
-- SELECT set_config('app.service_role_key', 'YOUR_SERVICE_ROLE_KEY', false);