import React from 'react';
import { Briefcase, Layers, Zap, CheckCircle2 } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Briefcase,
      title: 'Placement-Ready Portfolio Asset',
      badge: 'Resume Builder',
      badgeColor: 'text-indigo-400 bg-indigo-950/80 border-indigo-800/60',
      description:
        'Instead of another generic to-do list, walk away with a real AI project deployed to GitHub and live on the web that immediately validates your GenAI capability in final-year technical interviews.',
      highlights: ['Live working demo URL', 'Clean GitHub code repository', 'Demonstrates API integration']
    },
    {
      icon: Layers,
      title: 'Practical AI Skills, Zero Fluff',
      badge: 'Core Competency',
      badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-800/60',
      description:
        'Skip the theoretical math formulas and learn how software engineers actually integrate modern LLM APIs, handle prompts, guard against hallucinations, and build high-performance user interfaces.',
      highlights: ['Hands-on prompt engineering', 'Structured JSON outputs', 'Client-side integration']
    },
    {
      icon: Zap,
      title: 'Zero Pre-requisites & Free Access',
      badge: '100% Free',
      badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/60',
      description:
        'Built from the ground up for busy final-year students. No paid subscriptions, no expensive GPU hardware, and no complex environment setups needed. Jump right into coding from your browser.',
      highlights: ['Browser-based environment', 'No credit card needed', '60-minute concise structure']
    }
  ];

  return (
    <section className="py-20 bg-[#070c1e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-widest text-indigo-400 mb-2">Designed for Final-Year Students</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Spend 60 Minutes On This Workshop?
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Three concrete outcomes engineered to elevate your engineering credentials before campus placements.
          </p>
        </div>

        {/* 3 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl p-7 bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all hover:-translate-y-1 group flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-indigo-950/90 border border-indigo-800/50 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${b.badgeColor}`}>
                      {b.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {b.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {b.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  {b.highlights.map((h, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
