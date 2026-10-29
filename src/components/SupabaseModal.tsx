import React, { useState } from 'react';
import { X, Database, Check, Copy } from 'lucide-react';
import { isSupabaseConfigured } from '../services/supabase';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlCode = `-- Run this in your Supabase SQL Editor:
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

CREATE POLICY "Allow public read access for analytics"
ON public.registrations FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow public insert for registrations"
ON public.registrations FOR INSERT TO anon, authenticated WITH CHECK (true);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#0b1329] border border-slate-800 rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Database & Persistence Configuration</h3>
            <span className="text-xs text-slate-400">Supabase Cloud vs. Local Demo Persistence</span>
          </div>
        </div>

        {/* Status Box */}
        <div className={`p-4 rounded-xl border mb-5 text-xs flex items-center justify-between ${
          isSupabaseConfigured 
            ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
            : 'bg-amber-950/40 border-amber-800/40 text-amber-200'
        }`}>
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>
              Current Active Storage:{' '}
              <strong className="text-white">
                {isSupabaseConfigured ? 'Supabase PostgreSQL Cloud' : 'Local Browser Storage (Demo Mode)'}
              </strong>
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700">
            {isSupabaseConfigured ? 'Production Live' : 'Demo Prototype'}
          </span>
        </div>

        {/* Instructions */}
        <div className="space-y-4 text-xs text-slate-300 mb-6">
          <p className="leading-relaxed">
            By default, this application functions seamlessly in <strong>Local Demo Mode</strong> using browser storage. It saves registrations, calculates live analytics, and exports CSVs without requiring external setup.
          </p>

          <p className="leading-relaxed">
            To connect a live Supabase PostgreSQL database for multi-user synchronization:
          </p>

          <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
            <li>Create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-indigo-400 underline">supabase.com</a></li>
            <li>Copy the SQL schema below into the Supabase SQL Editor and run it</li>
            <li>Add <code className="text-indigo-300 font-mono">VITE_SUPABASE_URL</code> and <code className="text-indigo-300 font-mono">VITE_SUPABASE_ANON_KEY</code> to your environment or Vercel dashboard</li>
          </ol>
        </div>

        {/* SQL Schema Snippet */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden mb-6">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-400">supabase/schema.sql</span>
            <button
              onClick={handleCopy}
              className="text-xs text-indigo-400 hover:text-white flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied SQL' : 'Copy SQL'}</span>
            </button>
          </div>
          <pre className="p-4 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-48">
            {sqlCode}
          </pre>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
        >
          Got it, Close
        </button>

      </div>
    </div>
  );
};
