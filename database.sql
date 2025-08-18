-- Fisher Waste Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_type TEXT NOT NULL CHECK (service_type IN ('dumpster', 'junk', 'demolition')),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  address TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  dumpster_size TEXT CHECK (dumpster_size IN ('10', '20', '30', '40')),
  project_description TEXT,
  urgency TEXT CHECK (urgency IN ('standard', 'priority', 'emergency')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  total_amount DECIMAL(10,2),
  payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_interest TEXT,
  message TEXT NOT NULL,
  contact_method TEXT DEFAULT 'email' CHECK (contact_method IN ('email', 'phone', 'text')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create availability table
CREATE TABLE IF NOT EXISTS availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  available_slots INTEGER DEFAULT 10 CHECK (available_slots >= 0),
  service_type TEXT NOT NULL CHECK (service_type IN ('dumpster', 'junk', 'demolition')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, service_type)
);

-- Create pricing table for dumpster sizes
CREATE TABLE IF NOT EXISTS dumpster_pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  size TEXT NOT NULL UNIQUE CHECK (size IN ('10', '20', '30', '40')),
  base_price DECIMAL(8,2) NOT NULL,
  per_day_rate DECIMAL(8,2) NOT NULL,
  weight_limit INTEGER NOT NULL, -- in pounds
  overage_fee DECIMAL(8,2) NOT NULL, -- per pound over limit
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default pricing
INSERT INTO dumpster_pricing (size, base_price, per_day_rate, weight_limit, overage_fee) VALUES
('10', 299.00, 25.00, 2000, 0.05),
('20', 399.00, 35.00, 4000, 0.05),
('30', 499.00, 45.00, 6000, 0.05),
('40', 599.00, 55.00, 8000, 0.05)
ON CONFLICT (size) DO NOTHING;

-- Initialize availability for next 90 days
INSERT INTO availability (date, available_slots, service_type)
SELECT 
  CURRENT_DATE + generate_series(1, 90) as date,
  10 as available_slots,
  service_type
FROM (VALUES ('dumpster'), ('junk'), ('demolition')) as services(service_type)
ON CONFLICT (date, service_type) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for bookings updated_at
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for dumpster_pricing updated_at
CREATE TRIGGER update_dumpster_pricing_updated_at BEFORE UPDATE ON dumpster_pricing
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to decrement available slots
CREATE OR REPLACE FUNCTION decrement_available_slots(target_date date, target_service_type text)
RETURNS void AS $$
BEGIN
  UPDATE availability 
  SET available_slots = available_slots - 1 
  WHERE date = target_date AND service_type = target_service_type;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE dumpster_pricing ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for production)
-- These policies allow public read/write access for the booking system
-- In production, you may want to restrict these further

-- Bookings policies
CREATE POLICY "Allow public insert bookings" ON bookings
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public read own bookings" ON bookings
    FOR SELECT TO anon USING (true);

-- Contact submissions policies  
CREATE POLICY "Allow public insert contact_submissions" ON contact_submissions
    FOR INSERT TO anon WITH CHECK (true);

-- Availability policies (read-only for public)
CREATE POLICY "Allow public read availability" ON availability
    FOR SELECT TO anon USING (true);

-- Pricing policies (read-only for public)
CREATE POLICY "Allow public read dumpster_pricing" ON dumpster_pricing
    FOR SELECT TO anon USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_service_type ON bookings(service_type);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_availability_date_service ON availability(date, service_type);