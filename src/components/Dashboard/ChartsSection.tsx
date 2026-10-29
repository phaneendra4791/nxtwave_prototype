import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import type { Registration, ChannelSource } from '../../types';
import { getAmbassadorInfo } from '../../services/referral';
import { TrendingUp, PieChart as PieIcon, Award } from 'lucide-react';

interface ChartsSectionProps {
  registrations: Registration[];
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ registrations }) => {
  // 1. Group registrations over the 7 days
  // Planned trajectory for 500 target:
  // Day 1: 35 | Day 2: 85 | Day 3: 155 | Day 4: 245 | Day 5: 350 | Day 6: 440 | Day 7: 500
  const plannedCumulative = [35, 85, 155, 245, 350, 440, 500];

  // We assign timestamps relative to the earliest date or a 7-day bracket
  const dayBuckets = [
    { day: 'Day 1', actual: 0, planned: plannedCumulative[0] },
    { day: 'Day 2', actual: 0, planned: plannedCumulative[1] },
    { day: 'Day 3', actual: 0, planned: plannedCumulative[2] },
    { day: 'Day 4', actual: 0, planned: plannedCumulative[3] },
    { day: 'Day 5', actual: 0, planned: plannedCumulative[4] },
    { day: 'Day 6', actual: 0, planned: plannedCumulative[5] },
    { day: 'Day 7', actual: 0, planned: plannedCumulative[6] },
  ];

  if (registrations.length > 0) {
    // Sort oldest first to calculate cumulative
    const sorted = [...registrations].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const firstTime = new Date(sorted[0].createdAt).getTime();
    
    sorted.forEach((r) => {
      const diffDays = Math.floor((new Date(r.createdAt).getTime() - firstTime) / (1000 * 60 * 60 * 24));
      const targetIndex = Math.min(Math.max(diffDays, 0), 6);
      dayBuckets[targetIndex].actual += 1;
    });

    // Make actual cumulative for line comparison
    let cumulative = 0;
    for (let i = 0; i < 7; i++) {
      cumulative += dayBuckets[i].actual;
      // If we don't have records yet for future days in a real run, keep last known
      dayBuckets[i].actual = cumulative;
    }
  }

  // 2. Channel Distribution (Strictly derived from underlying records)
  const channelCounts: Record<ChannelSource, number> = {
    ambassador: 0,
    college_club: 0,
    student_community: 0,
    organic_referral: 0,
    direct: 0,
  };

  registrations.forEach((r) => {
    if (channelCounts[r.channelSource] !== undefined) {
      channelCounts[r.channelSource] += 1;
    } else {
      channelCounts.direct += 1;
    }
  });

  const channelData = [
    { name: 'Campus Ambassadors', value: channelCounts.ambassador, color: '#6366f1', target: 240 },
    { name: 'College Clubs', value: channelCounts.college_club, color: '#06b6d4', target: 150 },
    { name: 'Student Communities', value: channelCounts.student_community, color: '#a855f7', target: 80 },
    { name: 'Organic & Friend Referrals', value: channelCounts.organic_referral, color: '#10b981', target: 30 },
    { name: 'Direct Visits', value: channelCounts.direct, color: '#64748b', target: 0 },
  ];

  // 3. Top Referral Codes (Derived from dataset)
  const refCodeMap: Record<string, number> = {};
  registrations.forEach((r) => {
    if (r.referralCode) {
      const code = r.referralCode.toUpperCase();
      refCodeMap[code] = (refCodeMap[code] || 0) + 1;
    }
  });

  const topReferralCodes = Object.entries(refCodeMap)
    .map(([code, count]) => {
      const amb = getAmbassadorInfo(code);
      return {
        code,
        count,
        name: amb ? amb.name : 'Peer Ambassador',
        college: amb ? amb.college : 'Student Referral',
        conversionShare: registrations.length > 0 ? ((count / registrations.length) * 100).toFixed(1) : '0',
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
      
      {/* 7-Day Campaign Trajectory Chart */}
      <div className="lg:col-span-7 rounded-2xl bg-[#0b1329] border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Campaign Velocity</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                7-Day Registration Growth Curve
              </h3>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />
                <span className="text-slate-300">Actual ({registrations.length})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-1 bg-slate-500 inline-block" />
                <span className="text-slate-400">Target (500)</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-6">
            Cumulative registrations tracked against the 500-student campaign target milestone trajectory.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dayBuckets} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" textAnchor="middle" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 520]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="planned" 
                  stroke="#64748b" 
                  strokeDasharray="4 4" 
                  fill="transparent" 
                  strokeWidth={2}
                  name="Planned Trajectory"
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#actualGradient)" 
                  strokeWidth={2.5}
                  name="Actual Registrations"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Target Pace: ~71 registrations/day</span>
          <span className="font-mono text-indigo-400">
            {registrations.length >= 500 ? 'Target Achieved! 🎉' : `${500 - registrations.length} more needed`}
          </span>
        </div>
      </div>

      {/* Acquisition Channel Breakdown */}
      <div className="lg:col-span-5 rounded-2xl bg-[#0b1329] border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <PieIcon className="w-4 h-4" />
            <span>Channel Mix</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">
            Registrations by Acquisition Source
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Strictly derived from referral codes and UTM parameters in the underlying records.
          </p>

          <div className="space-y-3 pt-2">
            {channelData.map((ch, idx) => {
              const share = registrations.length > 0 
                ? ((ch.value / registrations.length) * 100).toFixed(1) 
                : '0.0';
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ch.color }} />
                      <span>{ch.name}</span>
                    </span>
                    <span className="text-white font-mono font-semibold">
                      {ch.value} <span className="text-slate-500 font-normal">({share}%)</span>
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(Number(share), 100)}%`,
                        backgroundColor: ch.color 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Channel Targets: Amb 240 • Clubs 150 • Comm 80 • Org 30</span>
        </div>
      </div>

      {/* Top Referral Codes Leaderboard */}
      <div className="lg:col-span-12 rounded-2xl bg-[#0b1329] border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Top Referral Codes Leaderboard (Proposed ₹1,200 Reward Pool)
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Top 3 Referrers eligible for ₹600, ₹400, ₹200 tech vouchers
          </span>
        </div>

        {topReferralCodes.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800/80">
            No referral-attributed registrations logged yet. Load demo data or use a referral code to see the ranking.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {topReferralCodes.map((item, idx) => (
              <div 
                key={item.code}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-indigo-400 text-sm">
                      {item.code}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${
                      idx === 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      idx === 1 ? 'bg-slate-300/20 text-slate-200 border border-slate-400/30' :
                      idx === 2 ? 'bg-amber-800/20 text-amber-400 border border-amber-800/30' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      #{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{item.college}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Registrations:</span>
                  <span className="font-mono font-bold text-white text-sm">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
