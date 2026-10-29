import React from 'react';
import { 
  Users, 
  Target, 
  School, 
  Share2, 
  Globe, 
  TrendingUp
} from 'lucide-react';
import type { Registration } from '../../types';
import { MetricCard } from './MetricCard';
import { ChartsSection } from './ChartsSection';
import { RegistrationsTable } from './RegistrationsTable';
import { getStorageMode } from '../../services/storage';

interface DashboardViewProps {
  registrations: Registration[];
  onLoadDemoData: () => void;
  onClearData: (onlySimulated?: boolean) => void;
  isLoading: boolean;
  onOpenSupabaseModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  registrations,
  onLoadDemoData,
  onClearData,
  isLoading,
  onOpenSupabaseModal,
}) => {
  const TARGET_GOAL = 500;
  const actualCount = registrations.length;
  const remainingCount = Math.max(0, TARGET_GOAL - actualCount);
  const progressPercent = Math.min(100, Math.round((actualCount / TARGET_GOAL) * 100));

  // Unique colleges represented
  const uniqueCollegesSet = new Set(
    registrations.map((r) => r.college.trim().toLowerCase()).filter(Boolean)
  );
  const uniqueCollegesCount = uniqueCollegesSet.size;

  // Referral-attributed (records that have a referral code or were routed via referral)
  const referralAttributedCount = registrations.filter(
    (r) => r.referralCode !== null && r.referralCode.trim() !== ''
  ).length;

  const referralPercent = actualCount > 0 
    ? Math.round((referralAttributedCount / actualCount) * 100) 
    : 0;

  // Direct / Organic registrations
  const directCount = registrations.filter(
    (r) => !r.referralCode || r.referralCode.trim() === ''
  ).length;

  const directPercent = actualCount > 0 
    ? Math.round((directCount / actualCount) * 100) 
    : 0;

  // Real vs Simulated counts
  const realCount = registrations.filter((r) => !r.isSimulated).length;
  const simulatedCount = registrations.filter((r) => r.isSimulated).length;

  const storageMode = getStorageMode();

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner / Dashboard Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Target className="w-4 h-4" />
            <span>Growth Campaign Mission Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Workshop Campaign Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tracking 500 final-year student registrations across 7 days on a ₹2,000 budget.
          </p>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3 text-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-left font-mono">
              <span className="text-slate-400 text-[10px] block">DATA ENGINE</span>
              <span className="font-semibold text-white">
                {storageMode === 'supabase' ? 'Supabase Cloud' : 'Local Persistence (Demo)'}
              </span>
            </div>
            <button
              onClick={onOpenSupabaseModal}
              className="text-[10px] text-indigo-400 hover:text-indigo-300 underline font-sans ml-1"
            >
              Config
            </button>
          </div>
        </div>
      </div>

      {/* Progress Towards 500 Target Bar */}
      <div className="rounded-2xl bg-[#0b1329] border border-slate-800 p-6 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-sm">Campaign Target Progress</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[11px]">
              {progressPercent}% Complete
            </span>
          </div>
          <div className="font-mono text-slate-400 text-xs">
            <strong className="text-white">{actualCount}</strong> registered •{' '}
            <strong className="text-amber-400">{remainingCount}</strong> remaining of {TARGET_GOAL}
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-400 transition-all duration-700 shadow-glow"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Day 1: Launch</span>
          <span>Day 4: Mid-Point</span>
          <span>Day 7: Goal (500 Registrations)</span>
        </div>
      </div>

      {/* 6 High-Level KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Metric 1: Total Registrations */}
        <MetricCard
          label="Actual Registrations"
          value={actualCount}
          target={TARGET_GOAL}
          icon={Users}
          subValue={`${realCount} real user submissions • ${simulatedCount} simulated`}
          badge={actualCount >= TARGET_GOAL ? 'Goal Reached!' : `${progressPercent}% of Target`}
          badgeColor={actualCount >= TARGET_GOAL ? 'text-emerald-400 bg-emerald-950/80 border-emerald-800' : 'text-indigo-400 bg-indigo-950/80 border-indigo-800'}
          accentColor="text-indigo-400"
        />

        {/* Metric 2: Remaining to Target */}
        <MetricCard
          label="Remaining Registrations"
          value={remainingCount}
          icon={Target}
          subValue="Goal: 500 final-year engineers"
          badge={remainingCount === 0 ? 'Complete' : 'In Progress'}
          badgeColor="text-amber-400 bg-amber-950/80 border-amber-800"
          accentColor="text-amber-400"
        />

        {/* Metric 3: Unique Colleges Represented */}
        <MetricCard
          label="Unique Colleges"
          value={uniqueCollegesCount}
          icon={School}
          subValue="Multi-campus distribution across India"
          badge="Campus Reach"
          badgeColor="text-cyan-400 bg-cyan-950/80 border-cyan-800"
          accentColor="text-cyan-400"
        />

        {/* Metric 4: Referral-Attributed Registrations */}
        <MetricCard
          label="Referral Attributed"
          value={referralAttributedCount}
          icon={Share2}
          subValue={`${referralPercent}% of all registrations driven by codes`}
          badge="Virality Loop"
          badgeColor="text-purple-400 bg-purple-950/80 border-purple-800"
          accentColor="text-purple-400"
        />

        {/* Metric 5: Direct / Organic Registrations */}
        <MetricCard
          label="Direct & Organic"
          value={directCount}
          icon={Globe}
          subValue={`${directPercent}% registered without a code`}
          badge="Inbound"
          badgeColor="text-emerald-400 bg-emerald-950/80 border-emerald-800"
          accentColor="text-emerald-400"
        />

        {/* Metric 6: Proposed Budget Efficiency */}
        <MetricCard
          label="Campaign CAC (Budget ₹2,000)"
          value={actualCount > 0 ? `₹${(2000 / actualCount).toFixed(2)}` : '₹4.00'}
          icon={TrendingUp}
          subValue="Planned CAC: ₹4.00 per student (₹2,000 / 500)"
          badge="Efficiency"
          badgeColor="text-blue-400 bg-blue-950/80 border-blue-800"
          accentColor="text-blue-400"
        />

      </div>

      {/* Visual Charts: Velocity, Channels & Referral Leaderboard */}
      <ChartsSection registrations={registrations} />

      {/* Filterable Registrations Table with CSV Export */}
      <RegistrationsTable
        registrations={registrations}
        onLoadDemoData={onLoadDemoData}
        onClearData={onClearData}
        isLoading={isLoading}
      />

    </div>
  );
};
