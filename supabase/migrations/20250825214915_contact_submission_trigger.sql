-- Create a function to call the edge function
CREATE OR REPLACE FUNCTION notify_admin_of_contact()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the edge function using pg_net
  PERFORM net.http_post(
    url := 'https://kwzfrthodkxmjgglgctw.supabase.co/functions/v1/send-info-request-to-admin',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_key')
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'contact_submissions',
      'record', row_to_json(NEW),
      'schema', 'public',
      'old_record', null
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE OR REPLACE TRIGGER contact_submission_notification
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_admin_of_contact();
