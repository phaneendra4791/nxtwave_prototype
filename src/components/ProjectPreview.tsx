import React, { useState } from 'react';
import { Terminal, CheckCircle2, Cpu, FileText, ArrowRight } from 'lucide-react';

export const ProjectPreview: React.FC = () => {
  const [jobRole, setJobRole] = useState<'ai_engineer' | 'frontend_dev' | 'fullstack_dev'>('ai_engineer');
  const [isSimulating, setIsSimulating] = useState(false);

  const roleProfiles = {
    ai_engineer: {
      title: 'Associate AI Engineer / GenAI Specialist',
      matchScore: 92,
      extractedSkills: ['Python', 'REST APIs', 'Prompt Engineering', 'LangChain Basics', 'Git'],
      missingSkills: ['Vector DB Indexing', 'Evaluation Guardrails'],
      generatedQuestions: [
        'How do you prevent hallucinations when extracting structured JSON from an LLM response?',
        'What criteria do you use to choose between few-shot prompt crafting vs fine-tuning?',
      ],
      tokensUsed: 420,
      latency: '340ms'
    },
    frontend_dev: {
      title: 'Junior Frontend Engineer (React/TypeScript)',
      matchScore: 88,
      extractedSkills: ['React', 'TypeScript', 'Tailwind CSS', 'State Management', 'HTML5/CSS3'],
      missingSkills: ['SSR Performance Auditing', 'Web Workers'],
      generatedQuestions: [
        'How would you stream AI model response tokens smoothly into a React component UI?',
        'Explain how you optimize Core Web Vitals on high-interactivity dashboards.',
      ],
      tokensUsed: 380,
      latency: '290ms'
    },
    fullstack_dev: {
      title: 'Full-Stack Software Engineer',
      matchScore: 94,
      extractedSkills: ['Node.js', 'PostgreSQL', 'React', 'Docker', 'REST API Design'],
      missingSkills: ['Redis Caching Layer', 'Message Queues'],
      generatedQuestions: [
        'How would you structure a rate-limiter for high-volume AI API endpoints?',
        'Describe your database schema design for storing multi-tenant user prompts.',
      ],
      tokensUsed: 460,
      latency: '380ms'
    }
  };

  const handleSimulate = (role: 'ai_engineer' | 'frontend_dev' | 'fullstack_dev') => {
    setJobRole(role);
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 400);
  };

  const current = roleProfiles[jobRole];

  return (
    <section id="what-you-will-build" className="py-20 bg-slate-950/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-semibold text-cyan-300 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Hands-on Project Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            The Project: <span className="gradient-text">AI Resume & Technical Copilot</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            In 60 minutes, you won't just listen to theory. You'll build and run an end-to-end application that parses resumes, computes semantic job-matching scores, and synthesizes tailored interview questions.
          </p>
        </div>

        {/* Interactive Sandbox Card */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-[#0b1329] border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Mock App Window Header */}
          <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 font-mono text-xs text-slate-400">ai-resume-copilot.app • Live Demo Output</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Model: Gemini 1.5 Flash</span>
            </div>
          </div>

          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Controls: Target Role Switcher */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Select Target Placement Role
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'ai_engineer', label: 'AI Engineer / GenAI Specialist' },
                    { id: 'frontend_dev', label: 'Frontend Engineer (React/TS)' },
                    { id: 'fullstack_dev', label: 'Full-Stack Software Engineer' },
                  ].map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleSimulate(role.id as any)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-between ${
                        jobRole === role.id
                          ? 'bg-indigo-600/30 border border-indigo-500/60 text-white'
                          : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <span>{role.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Architecture Stack Badge List */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <p className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Workshop Tech Stack Covered:</span>
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300">JavaScript / TS</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300">LLM API Client</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-300">Prompt Templates</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300">JSON Schema Guard</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300">Vercel Deploy</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300">
                <strong>Why final-year recruiters love this:</strong> Shows you can connect modern AI intelligence with real-world business logic and deliver a live production link.
              </div>
            </div>

            {/* Right Screen: AI Output Visualization */}
            <div className="lg:col-span-7 bg-slate-900/90 rounded-xl p-5 border border-slate-800/90 flex flex-col justify-between">
              
              {isSimulating ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-slate-400 font-mono">Synthesizing prompt vectors & evaluation...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Top Match Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400">Target Benchmark</span>
                      <h4 className="text-sm font-bold text-white">{current.title}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400">Match Score</span>
                      <div className="text-xl font-extrabold text-emerald-400 font-mono">{current.matchScore}%</div>
                    </div>
                  </div>

                  {/* Skills Extracted */}
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Identified Skills ({current.extractedSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {current.extractedSkills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-xs flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>{s}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Keywords Recommendation */}
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Recommended Keyword Enhancements
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {current.missingSkills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-amber-950/50 border border-amber-800/40 text-amber-300 text-xs">
                          + {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Generated Technical Interview Questions */}
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Tailored Placement Interview Questions Generated
                    </span>
                    <div className="space-y-2 mt-2">
                      {current.generatedQuestions.map((q, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200 font-mono">
                          <span className="text-indigo-400 font-bold mr-2">Q{idx + 1}:</span>
                          {q}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Telemetry bar */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Inference: {current.latency}</span>
                    <span>Tokens: {current.tokensUsed}</span>
                    <span>Guardrail: Structured Schema</span>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
