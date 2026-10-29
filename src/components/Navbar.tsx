import React, { useState } from 'react';
import { 
  Sparkles, 
  BarChart3, 
  Compass, 
  BookOpen, 
  Share2, 
  Menu, 
  X,
  CheckCircle2
} from 'lucide-react';
import { KNOWN_AMBASSADORS } from '../services/referral';

interface NavbarProps {
  activeTab: 'landing' | 'dashboard' | 'strategy' | 'ai-notes';
  setActiveTab: (tab: 'landing' | 'dashboard' | 'strategy' | 'ai-notes') => void;
  registrationsCount: number;
  currentRefCode: string | null;
  onSelectRefCode: (code: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  registrationsCount,
  currentRefCode,
  onSelectRefCode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [refPickerOpen, setRefPickerOpen] = useState(false);

  const handleTabClick = (tab: 'landing' | 'dashboard' | 'strategy' | 'ai-notes') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#070c1e]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => handleTabClick('landing')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-glow flex items-center justify-center">
              <div className="w-full h-full bg-[#070c1e] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-tight text-white text-base">NxtWave</span>
                <span className="text-slate-400 font-light text-sm">/</span>
                <span className="text-indigo-400 font-semibold text-sm">Campus Lab</span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">Growth Campaign Prototype</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => handleTabClick('landing')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'landing'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Workshop Landing
            </button>

            <button
              onClick={() => handleTabClick('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Growth Dashboard</span>
              <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                activeTab === 'dashboard' ? 'bg-indigo-900/80 text-indigo-200' : 'bg-slate-800 text-slate-400'
              }`}>
                {registrationsCount}
              </span>
            </button>

            <button
              onClick={() => handleTabClick('strategy')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'strategy'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>7-Day Strategy</span>
            </button>

            <button
              onClick={() => handleTabClick('ai-notes')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'ai-notes'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>AI Learning Notes</span>
            </button>
          </nav>

          {/* Quick Tools: Referral Simulation Dropdown */}
          <div className="hidden lg:flex items-center shrink-0">
            <div className="relative">
              <button
                onClick={() => setRefPickerOpen(!refPickerOpen)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/70 text-xs text-slate-300 hover:border-indigo-500/50 flex items-center space-x-1.5 transition shadow-sm"
                title="Test how referral attribution changes the experience"
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ref: <strong className="text-white font-mono">{currentRefCode || 'None (Direct)'}</strong></span>
              </button>

              {refPickerOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 text-xs">
                  <div className="px-2 py-1 text-slate-400 font-semibold border-b border-slate-800 mb-1 flex justify-between items-center">
                    <span>Simulate Referral Link</span>
                    <span className="text-[10px] text-indigo-400">?ref=...</span>
                  </div>
                  <div className="max-h-56 overflow-y-auto space-y-1">
                    <button
                      onClick={() => { onSelectRefCode(''); setRefPickerOpen(false); }}
                      className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between ${
                        !currentRefCode ? 'bg-indigo-600/30 text-indigo-300' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span>Direct (No Referral)</span>
                      {!currentRefCode && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                    </button>
                    {KNOWN_AMBASSADORS.map((amb) => (
                      <button
                        key={amb.code}
                        onClick={() => { onSelectRefCode(amb.code); setRefPickerOpen(false); }}
                        className={`w-full text-left px-2 py-1.5 rounded flex flex-col ${
                          currentRefCode === amb.code ? 'bg-indigo-600/30 text-indigo-300' : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-indigo-400">?ref={amb.code}</span>
                          <span className="text-[10px] text-slate-400 capitalize">{amb.channel}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 truncate">{amb.name} • {amb.college}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#070c1e] px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => handleTabClick('landing')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'landing' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Workshop Landing Page
          </button>
          <button
            onClick={() => handleTabClick('dashboard')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Growth Dashboard</span>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full font-mono">{registrationsCount}</span>
          </button>
          <button
            onClick={() => handleTabClick('strategy')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 ${
              activeTab === 'strategy' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>7-Day Campaign Strategy</span>
          </button>
          <button
            onClick={() => handleTabClick('ai-notes')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 ${
              activeTab === 'ai-notes' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>AI Learning Notes</span>
          </button>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Current Ref: <strong className="text-white font-mono">{currentRefCode || 'Direct'}</strong></span>
          </div>
        </div>
      )}
    </header>
  );
};
