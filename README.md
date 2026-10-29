# NxtWave Growth Intern Challenge: AI Workshop Growth Platform

A complete, responsive web application and simulated growth campaign platform designed to attract **500 final-year engineering students** across India to register for a free, 60-minute workshop: **“Build Your First AI Project in 60 Minutes.”**

> **Prototype Disclaimer:** This website is an interactive demonstration prototype built for the NxtWave Growth Intern hiring challenge. It is not an official commercial NxtWave registration portal. No real financial charges or unprompted student messages are conducted.

---

## 🚀 Live Demo & Repository Structure

- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS (Curated Deep Navy `#070c1e`, Indigo `#6366f1`, Cyan `#06b6d4`, and frosted glassmorphism)
- **Icons:** Lucide React
- **Analytics Charts:** Recharts (Area charts for velocity, channel breakdown, and leaderboard)
- **Data Persistence:** Dual-mode architecture:
  - **Local Demo Mode:** Browser `localStorage` with ~198 realistic seeded benchmark records across Days 1–4.
  - **Supabase Mode:** Live PostgreSQL synchronization with Row-Level Security (RLS) if `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are provided.
- **Testing:** Vitest automated test suite (14 passing unit tests covering validation, duplicate prevention, and referral tracking).

---

## 🎯 Campaign Strategy Summary

- **Workshop Name:** “Build Your First AI Project in 60 Minutes”
- **Target Audience:** Final-year engineering students (2026 Batch) preparing for campus placements
- **Total Campaign Duration:** 7 Days
- **Total Budget:** ₹2,000
- **Target Registrations:** 500 Students
- **Projected Unit CAC:** ₹4.00 per student (₹2,000 / 500)

### Channel Plan (Total 500)
1. **Campus Ambassadors (240 registrations - 48%):** 12 student leads across target colleges (SRM, IITB, BITS, VIT, RVCE, DTU, NITW, PES) each aiming for 20 registrations via departmental groups.
2. **College Clubs & Societies (150 registrations - 30%):** Partnerships with ACM, CSI, and placement cell student reps.
3. **Student Tech Communities (80 registrations - 16%):** Developer Discords, WhatsApp hubs, and regional hackathon channels.
4. **Organic & Peer Referrals (30 registrations - 6%):** Viral loop where registered students invite lab partners using personalized `?ref=` links.

### ₹2,000 Budget Allocation
- **₹1,200 (60%):** Top 3 Referrers Rewards Pool (1st: ₹600, 2nd: ₹400, 3rd: ₹200 tech vouchers / gift cards)
- **₹500 (25%):** Creative materials & promotional assets (Canva templates, WhatsApp story flyers, code teaser graphics)
- **₹300 (15%):** Mid-campaign contingency & reserve fund

---

## 💻 Key Application Features

### 1. Student Landing Page
- **Brand Identity:** Styled as **“NxtWave / Campus Lab”** with clean typography and modern visual hierarchy.
- **Hero Section:** Clear headline *"Build Your First AI Project in 60 Minutes"*, beginner-friendly positioning, primary CTA *"Reserve My Free Seat"*, and secondary CTA *"See What You’ll Build"*.
- **Interactive Project Sandbox:** Live interactive preview of the **AI Resume & Interview Copilot** application students build in 60 minutes, showcasing role matching, skills extraction, and AI interview questions.
- **Three Concise Benefits:**
  1. *Placement-Ready Portfolio Asset* (Live URL + GitHub code)
  2. *Practical AI Skills, Zero Fluff* (Hands-on API calls, prompt templates, structured JSON)
  3. *Zero Pre-requisites & Free Access* (Browser-based, ₹0 cost)
- **Three-Stage Workshop Outline:**
  - *Stage 1: Understand (00:00 – 00:15)* — Tokens, temperature, system prompts, structured schema guardrails.
  - *Stage 2: Build (00:15 – 00:50)* — Live code the AI resume evaluator and question generator.
  - *Stage 3: Test & Demo (00:50 – 01:00)* — Rate limiting, edge cases, GitHub README packaging, Vercel deployment.
- **Realistic FAQs:** Transparently answers scheduling, fees (₹0), prerequisites, and confirms that meeting links will be delivered post-confirmation.

### 2. Registration Flow & Duplicate Prevention
- **Fields:** Full Name, Email, College/University, Year of Study (Target: Final Year 2026 Batch), Optional Referral Code, and Confirmation Consent checkbox.
- **No Sensitive Data:** Never collects phone numbers, Aadhaar details, passwords, or payments.
- **Strict Validation:** Regex-based email checking and real-time duplicate email prevention.
- **Confirmation Screen:**
  - Displays instant registration confirmation.
  - Generates a unique personal referral code (e.g. `ROHA456`).
  - Provides a one-click shareable link (`?ref=YOURCODE`) to attribute peer signups.
  - Explains scheduling roadmap clearly without inventing fake meeting links.

### 3. Growth Dashboard & Analytics
- **Live KPI Metrics:**
  - Target: 500
  - Actual Registrations
  - Remaining Registrations
  - Visual Progress Bar (% to Goal)
  - Unique Colleges Represented (dynamic Set calculation)
  - Referral-Attributed Registrations
  - Direct / Organic Registrations
  - Campaign CAC Tracker
- **Recharts Data Visualizations:**
  - *7-Day Growth Curve:* Daily cumulative registrations compared against planned milestone trajectory.
  - *Channel Mix:* Breakdown across Campus Ambassadors, Clubs, Communities, Friend Referrals, and Direct.
  - *Top Referral Leaderboard:* Real-time ranking of top ambassadors for the ₹1,200 reward pool.
- **Registrations Table:**
  - Search by Name, Email, College, or Referral Code.
  - Filter by Channel, Study Batch, and Record Type (Real vs. Simulated).
  - Explicit badges labelling *“Real Submission”* vs *“Simulated Demo”*.
  - Full **CSV Export** downloading structured campaign records.
  - Interactive **“Load Demo Data”** and **“Clear Demo Data”** actions.

### 4. 7-Day Strategy Page
- Dedicated strategic blueprint showing daily milestones (Day 1 through Day 7), target pacing, planned tasks, and data-driven operational adjustment triggers.

### 5. AI Learning Notes (`AI_LEARNING_NOTES.md`)
- Three concrete case studies documenting:
  1. *Prompt given to AI*
  2. *AI's suggestion*
  3. *My final decision and why*

---

## 🛠️ Installation & Local Development

### Prerequisites
- Node.js (v18+ or v20+ / v24+)
- npm (v9+)

### Steps
```bash
# 1. Clone or navigate to the workspace directory
cd nxtwave

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
http://localhost:5173
```

---

## 🧪 Running Automated Unit Tests

The project includes unit tests written in **Vitest**:

```bash
# Run test suite
npm run test

# Run tests in watch mode
npx vitest
```

**Test Coverage:**
- Email syntax validation (valid, missing `@`, malformed domains).
- Duplicate email prevention across casing and whitespace.
- Referral code attribution and channel classification (`SRM01` -> ambassador, `CLUB-CS` -> club, custom -> organic).
- Personal referral code format generation (`NAME` + 3 digits).
- Missing field rejections (empty name, blank college).

---

## 🗄️ Supabase Setup (Optional)

If you wish to synchronize data to a live Supabase PostgreSQL database:

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard and execute the script in `supabase/schema.sql`:
   ```sql
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

   ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Allow public read" ON public.registrations FOR SELECT TO anon, authenticated USING (true);
   CREATE POLICY "Allow public insert" ON public.registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
   ```
3. Copy `.env.example` to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Restart your Vite server. The application will automatically detect Supabase credentials and switch from Local Demo Mode to Supabase Cloud Live sync.

---

## 🚢 Deploying to Vercel

The application is pre-configured with `vercel.json` for seamless deployment.

### Option 1: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Via GitHub & Vercel Dashboard
1. Push your repository to GitHub.
2. In the Vercel Dashboard, click **“Add New Project”** and import your repository.
3. Settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. *(Optional)* Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Environment Variables if using Supabase.
5. Click **Deploy**.
