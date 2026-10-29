import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  target?: string | number;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
  accentColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  target,
  icon: Icon,
  badge,
  badgeColor = 'text-indigo-400 bg-indigo-950/70 border-indigo-800/60',
  accentColor = 'text-indigo-400',
}) => {
  return (
    <div className="rounded-2xl bg-[#0b1329] border border-slate-800 p-5 shadow-lg relative overflow-hidden flex flex-col justify-between hover:border-slate-700 transition">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {label}
          </span>
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
            <Icon className={`w-4 h-4 ${accentColor}`} />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            {value}
          </span>
          {target && (
            <span className="text-xs font-mono text-slate-500">
              / {target} target
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        {subValue && (
          <span className="text-slate-400 text-[11px] truncate">{subValue}</span>
        )}
        {badge && (
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${badgeColor} ml-auto`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};
