// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Database } from "./types.ts";

console.log("Hello from `resend` function!");

type UserRecord = Database["public"]["Tables"]["contact_submissions"]["Row"];
interface WebhookPayload {
  type: "INSERT";
  table: string;
  record: null | UserRecord;
  schema: "public";
  old_record: null | UserRecord;
}

serve(async (req) => {
  const payload: WebhookPayload = await req.json();
  const newInfoRequest = payload.record;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
    },
    body: JSON.stringify({
      from: "Fisher WS Support <support@pulsepath.hoppfab.com>",
      to: ["davism1787@gmail.com"],
      subject: "Fisher Waste - Website Info Request",
      html: `
          <h2>Request for Information</h2>
          <p>Hi FW Support,</p>
          <p>You've received a new info request from the website.</p>
          <ol>
            <li>Here are the details of the request: 
              <ul style="margin-top: 10px;">
                <li>Name: ${newInfoRequest?.name}</li>
                <li>Email: ${newInfoRequest?.email}</li>
                <li>Phone: ${newInfoRequest?.phone}</li>
                <li>Contact Method: ${newInfoRequest?.contact_method}</li>
                <li>Info Request Date: ${newInfoRequest?.created_at}</li>
                <li>Service Interest: ${newInfoRequest?.service_interest}</li>
                <li>Message: ${newInfoRequest?.message}</li>
              </ul>
            </li>
          </ol>

          <p>Please respond to the client as soon as possible. We state that we will get back to them within 12 hours during business hours.</p>
          <p>Best regards,<br>Fisher Waste Solutions</p>
        `,
    }),
  });

  const data = await res.json();
  console.log({ data });

  return new Response("ok");
});
