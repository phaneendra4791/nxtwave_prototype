import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Trash2, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import type { Registration, ChannelSource } from '../../types';
import { exportToCSV } from '../../services/storage';

interface RegistrationsTableProps {
  registrations: Registration[];
  onLoadDemoData: () => void;
  onClearData: (onlySimulated?: boolean) => void;
  isLoading: boolean;
}

export const RegistrationsTable: React.FC<RegistrationsTableProps> = ({
  registrations,
  onLoadDemoData,
  onClearData,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all'); // all, real, simulated
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter logic
  const filtered = registrations.filter((r) => {
    // Search
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      r.fullName.toLowerCase().includes(searchLower) ||
      r.email.toLowerCase().includes(searchLower) ||
      r.college.toLowerCase().includes(searchLower) ||
      (r.referralCode && r.referralCode.toLowerCase().includes(searchLower)) ||
      r.personalReferralCode.toLowerCase().includes(searchLower);

    if (!matchesSearch) return false;

    // Channel
    if (channelFilter !== 'all' && r.channelSource !== channelFilter) {
      return false;
    }

    // Study Year
    if (yearFilter !== 'all' && r.studyYear !== yearFilter) {
      return false;
    }

    // Type (Real vs Simulated)
    if (typeFilter === 'real' && r.isSimulated) return false;
    if (typeFilter === 'simulated' && !r.isSimulated) return false;

    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRecords = filtered.slice(startIndex, startIndex + pageSize);

  const channelBadge = (source: ChannelSource) => {
    switch (source) {
      case 'ambassador':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800">Campus Ambassador</span>;
      case 'college_club':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">College Club</span>;
      case 'student_community':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800">Student Comm</span>;
      case 'organic_referral':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">Friend Referral</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">Direct</span>;
    }
  };

  return (
    <div className="rounded-2xl bg-[#0b1329] border border-slate-800 p-6 shadow-xl space-y-5">
      
      {/* Controls & Filter Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>Recent Workshop Registrations</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {filtered.length} {filtered.length === 1 ? 'record' : 'records'}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real user submissions are highlighted alongside clearly labelled simulated demo records.
          </p>
        </div>

        {/* Global Dataset Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportToCSV(filtered)}
            disabled={filtered.length === 0}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition"
            title="Download full CSV file of filtered registrations"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onLoadDemoData}
            disabled={isLoading}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 disabled:opacity-50 text-white text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
            title="Populate dataset with ~198 realistic student records across days 1-4"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Load Demo Data</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Clear simulated demo registrations? Real submissions will be kept.')) {
                onClearData(true);
              }
            }}
            disabled={registrations.length === 0}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-800 text-xs font-medium flex items-center space-x-1 transition"
            title="Remove simulated records"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Demo Data</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, email, college, ref..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Channel Filter */}
        <div>
          <select
            value={channelFilter}
            onChange={(e) => { setChannelFilter(e.target.value); setCurrentPage(1); }}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Acquisition Channels</option>
            <option value="ambassador">Campus Ambassadors</option>
            <option value="college_club">College Clubs</option>
            <option value="student_community">Student Communities</option>
            <option value="organic_referral">Friend / Peer Referrals</option>
            <option value="direct">Direct Visits</option>
          </select>
        </div>

        {/* Study Year Filter */}
        <div>
          <select
            value={yearFilter}
            onChange={(e) => { setYearFilter(e.target.value); setCurrentPage(1); }}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Study Batches</option>
            <option value="Final Year (2026 Batch)">Final Year (2026 Batch)</option>
            <option value="Pre-Final Year (2027 Batch)">Pre-Final Year (2027 Batch)</option>
            <option value="Third Year">Third Year</option>
            <option value="Postgraduate / Other">Postgraduate / Other</option>
          </select>
        </div>

        {/* Record Type Filter */}
        <div>
          <select
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Records (Real + Simulated)</option>
            <option value="real">Real Submissions Only</option>
            <option value="simulated">Simulated Demo Data Only</option>
          </select>
        </div>

      </div>

      {/* Registrations Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800/90">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
              <th className="py-3 px-4">Student & Contact</th>
              <th className="py-3 px-4">College / University</th>
              <th className="py-3 px-4">Study Year</th>
              <th className="py-3 px-4">Referral Used</th>
              <th className="py-3 px-4">Acquisition Channel</th>
              <th className="py-3 px-4">Record Status</th>
              <th className="py-3 px-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-[#080d22]">
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  <div className="max-w-xs mx-auto space-y-2">
                    <p className="text-sm font-semibold text-slate-400">No registrations found</p>
                    <p className="text-xs">Adjust your search filters or click "Load Demo Data" to populate 198 sample records.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedRecords.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-900/40 transition">
                  {/* Student & Email */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{reg.fullName}</div>
                    <div className="text-[11px] font-mono text-slate-400">{reg.email}</div>
                  </td>

                  {/* College */}
                  <td className="py-3 px-4 text-slate-300 max-w-xs truncate" title={reg.college}>
                    {reg.college}
                  </td>

                  {/* Year */}
                  <td className="py-3 px-4 text-slate-300">
                    <span className="text-[11px]">{reg.studyYear}</span>
                  </td>

                  {/* Referral Code */}
                  <td className="py-3 px-4 font-mono">
                    {reg.referralCode ? (
                      <span className="text-indigo-400 font-semibold">{reg.referralCode}</span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>

                  {/* Channel */}
                  <td className="py-3 px-4">
                    {channelBadge(reg.channelSource)}
                  </td>

                  {/* Status Tag */}
                  <td className="py-3 px-4">
                    {reg.isSimulated ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 text-amber-300/80 border border-amber-800/40">
                        <span>Simulated Demo</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Real Submission</span>
                      </span>
                    )}
                  </td>

                  {/* Timestamp */}
                  <td className="py-3 px-4 text-right text-slate-400 font-mono text-[11px]">
                    {new Date(reg.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {filtered.length > pageSize && (
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span>
            Showing <strong className="text-white">{startIndex + 1}</strong> to{' '}
            <strong className="text-white">{Math.min(startIndex + pageSize, filtered.length)}</strong> of{' '}
            <strong className="text-white">{filtered.length}</strong> records
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 text-slate-300 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-slate-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 text-slate-300 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
