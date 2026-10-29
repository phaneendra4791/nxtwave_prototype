import React from 'react';
import { Sparkles, ArrowRight, Code2, Users, Clock, ShieldCheck } from 'lucide-react';
import { getAmbassadorInfo } from '../services/referral';

interface HeroProps {
  onReserveClick: () => void;
  onSeeWhatYouBuildClick: () => void;
  currentRefCode: string | null;
  registrationsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onReserveClick,
  onSeeWhatYouBuildClick,
  currentRefCode,
  registrationsCount,
}) => {
  const ambassador = currentRefCode ? getAmbassadorInfo(currentRefCode) : null;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Referral Welcome Banner if active */}
        {currentRefCode && (
          <div className="mb-6 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-medium animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>
              Invited via Campus Referral <strong className="font-mono text-white">[{currentRefCode}]</strong>
              {ambassador ? ` • ${ambassador.name} (${ambassador.college})` : ''}
            </span>
          </div>
        )}

        <div className="text-center max-w-4xl mx-auto">
          
          {/* Top Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-300 mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
            <span className="text-indigo-400 font-bold uppercase tracking-wider text-[11px]">NxtWave / Campus Lab</span>
            <span className="text-slate-500">•</span>
            <span>Free 60-Minute Hands-On Workshop</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            Build Your First AI Project in{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              60 Minutes
            </span>
          </h1>

          {/* Supporting Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
            A free, beginner-friendly live session designed specifically for final-year engineering students. 
            Build and deploy a functional generative AI application step-by-step—with zero machine learning background required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              id="hero-primary-cta"
              onClick={onReserveClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base shadow-glow hover:shadow-indigo-500/40 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Reserve My Free Seat</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="hero-secondary-cta"
              onClick={onSeeWhatYouBuildClick}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-base transition-all flex items-center justify-center space-x-2"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>See What You'll Build</span>
            </button>
          </div>

          {/* Micro Value Proposition Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-950 flex items-center justify-center text-indigo-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Duration</p>
                <p className="text-sm text-white font-semibold">60 Minutes Sharp</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Workshop Cost</p>
                <p className="text-sm text-emerald-400 font-semibold">100% Free (₹0)</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Audience</p>
                <p className="text-sm text-white font-semibold">Final-Year Tech</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-purple-950 flex items-center justify-center text-purple-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Campaign Target</p>
                <p className="text-sm text-purple-300 font-semibold font-mono">{registrationsCount} / 500 Seats</p>
              </div>
            </div>
          </div>

          {/* Transparent Scheduling Note */}
          <div className="mt-6 text-xs text-slate-400 flex items-center justify-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span>Scheduling and streaming details will be shared via email after registration confirmation.</span>
          </div>

        </div>
      </div>
    </section>
  );
};
