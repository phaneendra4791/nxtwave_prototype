import React from 'react';
import { Lightbulb, Wrench, Rocket, Clock, CheckCircle2 } from 'lucide-react';

export const WorkshopOutline: React.FC = () => {
  const stages = [
    {
      number: '01',
      title: 'Understand',
      subtitle: 'The Mechanics of Modern AI APIs',
      duration: '15 Minutes',
      timeSlot: '00:00 – 00:15',
      icon: Lightbulb,
      color: 'from-blue-500 to-indigo-600',
      badgeColor: 'text-blue-400 bg-blue-950/70 border-blue-800/60',
      description:
        'Deconstruct how Large Language Model endpoints function under the hood without getting lost in academic mathematics.',
      points: [
        'How tokens, context windows, and model temperatures impact outputs',
        'Crafting deterministic system prompts that prevent hallucinations',
        'Structuring LLM requests to return validated JSON schemas instead of freeform text'
      ]
    },
    {
      number: '02',
      title: 'Build',
      subtitle: 'Live Code the AI Resume Copilot',
      duration: '35 Minutes',
      timeSlot: '00:15 – 00:50',
      icon: Wrench,
      color: 'from-indigo-500 to-purple-600',
      badgeColor: 'text-purple-400 bg-purple-950/70 border-purple-800/60',
      description:
        'The core hands-on sprint. You code alongside the session to wire together user inputs, prompt logic, and AI response handlers.',
      points: [
        'Initializing secure client authentication and calling the AI API',
        'Parsing resume input text and extracting core technical skills',
        'Computing role match scores and generating custom interview questions in real time'
      ]
    },
    {
      number: '03',
      title: 'Test & Demo',
      subtitle: 'Guardrails, Deployment & Showcase',
      duration: '10 Minutes',
      timeSlot: '00:50 – 01:00',
      icon: Rocket,
      color: 'from-purple-500 to-cyan-500',
      badgeColor: 'text-cyan-400 bg-cyan-950/70 border-cyan-800/60',
      description:
        'Stress-test your application with edge cases, deploy it live on the web, and package the code into your GitHub portfolio.',
      points: [
        'Handling API rate limits, error states, and unexpected inputs smoothly',
        'Deploying the live app on Vercel with zero server configuration',
        'Packaging the GitHub README to highlight AI engineering competencies to recruiters'
      ]
    }
  ];

  return (
    <section className="py-20 bg-slate-950/80 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-800/60 text-xs font-semibold text-indigo-300 mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Structured 60-Minute Agenda</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Three Clear Stages. One Complete AI App.
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Every minute is planned for maximum practical coding efficiency. No filler introductions.
          </p>
        </div>

        {/* 3-Stage Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stages.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-[#0b1329] border border-slate-800/90 p-7 flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-xl group"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-slate-400">Stage {st.number}</span>
                        <h3 className="text-xl font-bold text-white">{st.title}</h3>
                      </div>
                    </div>

                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${st.badgeColor}`}>
                      {st.duration}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-indigo-400 mb-2 font-medium">
                    {st.timeSlot}
                  </p>
                  <h4 className="text-sm font-semibold text-slate-200 mb-3">
                    {st.subtitle}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {st.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-800/80 space-y-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    What You Learn & Execute:
                  </p>
                  {st.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
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
