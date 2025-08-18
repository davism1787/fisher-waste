import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Booking {
  id: string;
  service_type: 'dumpster' | 'junk' | 'demolition';
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  start_date?: string;
  end_date?: string;
  dumpster_size?: string;
  project_description: string;
  urgency?: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  total_amount?: number;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_interest?: string;
  message: string;
  contact_method: 'email' | 'phone' | 'text';
  status: 'new' | 'contacted' | 'converted' | 'closed';
  created_at: string;
}

export interface Availability {
  id: string;
  date: string;
  available_slots: number;
  service_type: 'dumpster' | 'junk' | 'demolition';
  created_at: string;
}