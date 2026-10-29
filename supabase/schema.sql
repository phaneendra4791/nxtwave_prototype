-- ==============================================================================
-- NxtWave AI Workshop Growth Campaign Platform
-- Supabase PostgreSQL Schema
-- ==============================================================================

-- 1. Create table for storing student registrations
CREATE TABLE IF NOT EXISTS public.registrations (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    college TEXT NOT NULL,
    study_year TEXT NOT NULL,
    referral_code TEXT,
    personal_referral_code TEXT NOT NULL,
    channel_source TEXT NOT NULL,
    is_simulated BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes for fast aggregation and lookup
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_referral_code ON public.registrations(referral_code);
CREATE INDEX IF NOT EXISTS idx_registrations_channel_source ON public.registrations(channel_source);
CREATE INDEX IF NOT EXISTS idx_registrations_college ON public.registrations(college);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at);

-- 3. Row Level Security (RLS) Policies
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous read for prototype metrics dashboard
CREATE POLICY "Allow public read access for analytics"
ON public.registrations
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow public anonymous insert for registration submissions
CREATE POLICY "Allow public insert for registrations"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Optional: Prevent unauthorized client-side updates/deletes in production
CREATE POLICY "Disallow client-side updates"
ON public.registrations
FOR UPDATE
TO anon
USING (false);

CREATE POLICY "Disallow client-side deletes"
ON public.registrations
FOR DELETE
TO anon
USING (false);

COMMENT ON TABLE public.registrations IS 'Student registrations for NxtWave AI Workshop simulated growth campaign';
