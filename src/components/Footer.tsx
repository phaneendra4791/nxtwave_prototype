import React from 'react';
import { Sparkles, Shield, AlertTriangle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#040712] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Disclaimer Banner */}
        <div className="mb-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3 text-slate-300">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-semibold text-amber-300">Candidate Challenge Prototype Disclaimer:</span>
            <p className="text-slate-400 leading-relaxed">
              This web application is a simulated growth campaign platform designed and implemented for the 
              <strong> NxtWave Growth Intern Challenge</strong>. It is <strong>not</strong> an official commercial NxtWave registration portal. 
              No unprompted external emails are sent, no real money is charged, and student submissions in demo mode remain strictly local to your browser session.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white text-base">NxtWave / Campus Lab</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Attracting 500 final-year engineering students across India to build their first practical GenAI application within 60 minutes on a ₹2,000 simulated budget.
            </p>
            <p className="text-[11px] font-mono text-indigo-400">
              Prototype Build: v1.0.0 • React + Vite + Tailwind + Supabase Demo
            </p>
          </div>

          {/* Campaign Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Platform Views
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero-primary-cta" className="hover:text-white transition">Student Landing Page</a>
              </li>
              <li>
                <a href="#what-you-will-build" className="hover:text-white transition">Workshop Project Preview</a>
              </li>
              <li>
                <a href="#registration-section" className="hover:text-white transition">Free Registration Form</a>
              </li>
              <li>
                <span className="text-slate-500">Growth Dashboard (Admin)</span>
              </li>
            </ul>
          </div>

          {/* Ethics & Compliance */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Governance & Privacy
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero phone numbers collected</span>
              </li>
              <li>No spam communications</li>
              <li>No commercial payment gateway</li>
              <li>Transparent attribution metrics</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} NxtWave Growth Intern Candidate Prototype. All rights reserved.</p>
          <p>Built with React 19, TypeScript, Tailwind CSS, Lucide & Recharts.</p>
        </div>

      </div>
    </footer>
  );
};
