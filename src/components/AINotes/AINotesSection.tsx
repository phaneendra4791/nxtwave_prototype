import React from 'react';
import { BookOpen, AlertCircle, MessageSquare, Cpu, CheckCircle2 } from 'lucide-react';
import type { AILearningNote } from '../../types';

export const AINotesSection: React.FC = () => {
  const notes: AILearningNote[] = [
    {
      id: 'note-1',
      title: 'Incentive Architecture for Peer Referrals',
      topic: 'Growth Funnel & Budget Allocation Strategy',
      prompt:
        '"We have a ₹2,000 total budget to acquire 500 final-year engineering students for a free 60-minute AI workshop. How should we allocate this budget across paid ads, campus ambassadors, and student incentives?"',
      aiSuggestion:
        'The AI initially proposed allocating ₹1,400 to targeted Instagram and LinkedIn micro-ads, ₹400 for campus posters, and ₹200 for a single raffle ticket winner.',
      finalDecision:
        'Rejected paid ads entirely. Allocated ₹1,200 (60%) into a transparent top-3 referrer rewards pool (₹600, ₹400, ₹200), ₹500 for Canva creative assets, and ₹300 contingency reserve.',
      rationale:
        'With a tiny ₹2,000 budget, paid social ads yield poor ad impression volume in India and zero campus virality. Student-to-student peer recommendations in college WhatsApp and Discord groups convert at 4-5x higher trust with zero platform ad fees.'
    },
    {
      id: 'note-2',
      title: 'Data Persistence & Demo State Transparency',
      topic: 'Technical Architecture & Prototype Credibility',
      prompt:
        '"Should the platform simulate persistent cloud storage with a mocked multi-user backend, or require Supabase credentials for testing the growth dashboard?"',
      aiSuggestion:
        'The AI suggested mocking a fake shared backend using simulated WebSockets or telling users that browser local storage is shared across everyone.',
      finalDecision:
        'Implemented dual-mode persistence: a real Supabase client with Postgres schema if credentials exist, and an honest, explicitly labelled "Local Demo Mode" with browser storage fallback. Added prominent badges distinguishing "Simulated Demo Records" from "Real Submissions".',
      rationale:
        'Faking a multi-user shared backend damages prototype integrity. Clear labelling respects evaluator time and ensures nobody mistakes local browser test submissions for real shared data.'
    },
    {
      id: 'note-3',
      title: 'Ethical Growth Copywriting vs. False Urgency',
      topic: 'UI/UX Copy & Conversion Optimization',
      prompt:
        '"Generate high-converting landing page copy and CTA buttons for final-year students, including urgency hooks like countdown timers and placement guarantees."',
      aiSuggestion:
        'The AI drafted aggressive marketing hooks like "100% Placement Guarantee After Workshop," "Only 3 Seats Left in Your City," and invented an imaginary live date and famous instructor profile.',
      finalDecision:
        'Stripped all false urgency, fake instructor profiles, certificates, and placement guarantees. Anchored the headline strictly on the tangible outcome: "Build Your First AI Project in 60 Minutes" with transparent copy explaining that scheduling details will be emailed upon registration cohort confirmation.',
      rationale:
        'Final-year engineering students are cynical of fake countdown timers and exaggerated placement promises. Honest, transparent technical value creates significantly higher genuine engagement and avoids brand liability.'
    }
  ];

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Strategic AI Collaboration Journal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AI & Learning Notes
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Three concrete case studies demonstrating how AI was used as a sparring partner during product strategy, technical architecture, and ethical growth design.
        </p>

        {/* Disclaimer Notice */}
        <div className="mt-4 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-indigo-200 text-xs flex items-center space-x-2.5">
          <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Draft Reflection Notes:</strong> These are initial reflective examples created during product planning. Review and personalize them as your campaign evolves.
          </span>
        </div>
      </div>

      {/* 3 Case Study Cards */}
      <div className="space-y-6">
        {notes.map((n, idx) => (
          <div 
            key={n.id}
            className="rounded-2xl bg-[#0b1329] border border-slate-800 p-6 sm:p-7 shadow-xl space-y-5"
          >
            {/* Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-mono font-bold text-xs text-indigo-300">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{n.title}</h3>
                  <span className="text-xs text-slate-400">{n.topic}</span>
                </div>
              </div>

              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                Decision Review
              </span>
            </div>

            {/* Prompt */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 text-indigo-400 font-mono font-semibold text-[11px]">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>1. Prompt Given to AI:</span>
              </div>
              <p className="text-slate-300 italic font-mono pl-5">
                {n.prompt}
              </p>
            </div>

            {/* AI Suggestion */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 text-purple-400 font-mono font-semibold text-[11px]">
                <Cpu className="w-3.5 h-3.5" />
                <span>2. AI's Suggestion:</span>
              </div>
              <p className="text-slate-300 pl-5 leading-relaxed">
                {n.aiSuggestion}
              </p>
            </div>

            {/* Final Decision & Rationale */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs space-y-2">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-mono font-bold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>3. My Final Decision & Strategic Rationale:</span>
              </div>
              <p className="text-white font-medium pl-5 leading-relaxed">
                {n.finalDecision}
              </p>
              <div className="pl-5 pt-1 border-t border-emerald-900/40 text-slate-300 text-[11px] leading-relaxed">
                <strong className="text-emerald-300">Why:</strong> {n.rationale}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
