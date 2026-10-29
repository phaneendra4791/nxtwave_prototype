import React from 'react';
import { 
  Compass, 
  Target, 
  IndianRupee, 
  Calendar, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  TrendingUp 
} from 'lucide-react';
import type { ChannelPlan, BudgetAllocation, DayMilestone } from '../../types';

export const CampaignStrategy: React.FC = () => {
  const channelPlans: ChannelPlan[] = [
    {
      id: 'ambassador',
      name: 'Campus Ambassadors Program',
      target: 240,
      description: 'Handpicked student leads across 8 engineering campuses driving peer registrations.',
      tactic: '12 active ambassadors each targeting 20 registrations through departmental WhatsApp groups and campus Discord servers.'
    },
    {
      id: 'college_club',
      name: 'College Clubs & Placement Cells',
      target: 150,
      description: 'Collaborating with ACM/CSI student chapters, coding clubs, and placement training coordinators.',
      tactic: 'Joint announcement flyers spotlighting placement portfolio relevance for final-year batch (2026).'
    },
    {
      id: 'student_community',
      name: 'Student Tech Communities',
      target: 80,
      description: 'Developer Discords, Telegram groups, and regional tech meetups in Bengaluru, Pune, Hyderabad, Delhi.',
      tactic: 'Interactive sneak peeks of the AI resume analyzer code snippet to spark organic technical curiosity.'
    },
    {
      id: 'organic_referral',
      name: 'Peer & Friend Referrals',
      target: 30,
      description: 'Viral referral loops where enrolled students invite their final-year lab partners and roommates.',
      tactic: 'Post-registration confirmation incentive screen: share link to participate in the top 3 referrer rewards.'
    }
  ];

  const budgetBreakdown: BudgetAllocation[] = [
    {
      category: 'Top 3 Referrer Rewards Pool',
      amount: 1200,
      percentage: 60,
      description: 'Tiered gift cards / tech vouchers for highest performing student ambassadors (1st: ₹600, 2nd: ₹400, 3rd: ₹200).'
    },
    {
      category: 'Creative Materials & Promo Assets',
      amount: 500,
      percentage: 25,
      description: 'Canva Pro design templates, high-resolution teaser graphics, and promotional flyers for WhatsApp/Instagram stories.'
    },
    {
      category: 'Contingency & Mid-Campaign Reserve',
      amount: 300,
      percentage: 15,
      description: 'Reserve buffer for targeted boosts or emergency micro-incentives if specific channels lag behind target.'
    }
  ];

  const timelineMilestones: DayMilestone[] = [
    {
      day: 1,
      title: 'Launch & Ambassador Briefing',
      focus: 'Foundational Onboarding',
      targetAccumulated: 35,
      tasks: [
        'Brief 12 selected campus ambassadors with unique ?ref= codes',
        'Distribute high-impact messaging scripts focused on final-year placement prep',
        'Verify tracking attribution in the Growth Mission Control dashboard'
      ],
      adjustmentTrigger: 'If Day 1 registrations < 25, conduct individual syncs with underperforming ambassadors to audit messaging tone.'
    },
    {
      day: 2,
      title: 'Club & Society Outreach',
      focus: 'Institutional Partnerships',
      targetAccumulated: 85,
      tasks: [
        'Engage ACM, IEEE, and CSI student tech leads across target engineering colleges',
        'Co-brand promotional announcements: "Build Your First AI Project in 60 Mins"',
        'Track CLUB-CS tracking codes in daily dashboard'
      ],
      adjustmentTrigger: 'If club response is slow, offer dedicated Q&A slot for the partner club during the live workshop.'
    },
    {
      day: 3,
      title: 'Community Announcements',
      focus: 'Developer Hubs',
      targetAccumulated: 155,
      tasks: [
        'Share "See What You Will Build" interactive preview in student Discord channels',
        'Position the workshop around practical LLM API skills rather than boring theory',
        'Monitor duplicate email prevention rates and bounce rates'
      ],
      adjustmentTrigger: 'Check conversion rate from community clicks to submissions. If < 8%, simplify registration page copy.'
    },
    {
      day: 4,
      title: 'Mid-Campaign Leaderboard Push',
      focus: 'Incentive Momentum',
      targetAccumulated: 245,
      tasks: [
        'Publish interim top referrers leaderboard to all campus ambassadors',
        'Highlight the ₹1,200 reward pool to ignite competitive peer spirit',
        'Analyze college distribution to find under-represented campuses'
      ],
      adjustmentTrigger: 'If ambassadors lag target, deploy ₹150 from the reserve budget as a mid-week sprint bonus.'
    },
    {
      day: 5,
      title: 'Peer Referral Surge',
      focus: 'Viral Expansion',
      targetAccumulated: 350,
      tasks: [
        'Prompt confirmed students via email with their unique ?ref= links',
        'Encourage students to invite their final-year lab partners',
        'Track organic referral conversion on the analytics dashboard'
      ],
      adjustmentTrigger: 'If peer loop underperforms, emphasize that friends can collaborate during the build phase.'
    },
    {
      day: 6,
      title: 'Seat Scarcity & Last Call',
      focus: 'Registration Urgency',
      targetAccumulated: 440,
      tasks: [
        'Announce remaining seat counter (e.g., "Only 60 seats remaining of 500")',
        'Direct push to students who viewed the landing page but did not register',
        'Prepare pre-workshop technical prerequisites checklist'
      ],
      adjustmentTrigger: 'If remaining seats > 80, coordinate urgent broadcast with top 3 performing college clubs.'
    },
    {
      day: 7,
      title: 'Final Surge & Prep Onboarding',
      focus: 'Target Realization (500)',
      targetAccumulated: 500,
      tasks: [
        'Reach final 500 confirmed student milestone',
        'Announce top 3 referrer winners and verify code attribution logs',
        'Dispatch email confirmation notices stating scheduling details are finalized'
      ],
      adjustmentTrigger: 'Celebrate achieving target within the ₹2,000 budget constraint (CAC: ₹4.00 per student).'
    }
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4" />
          <span>Strategic Growth Blueprint</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          7-Day Campaign Strategy & Budget Plan
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Comprehensive multi-channel acquisition roadmap engineered to secure 500 final-year engineering student registrations within a strict ₹2,000 budget.
        </p>

        {/* Disclaimer */}
        <div className="mt-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-200 text-xs flex items-center space-x-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Planning Assumptions Notice:</strong> Numbers displayed below represent planned campaign targets and hypotheses, not achieved historical results. Real-time outcomes are tracked live on the Growth Dashboard.
          </span>
        </div>
      </div>

      {/* Target & Budget Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Target */}
        <div className="rounded-2xl bg-[#0b1329] border border-slate-800 p-6 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-xs font-semibold uppercase text-slate-400">Total Registration Goal</span>
            <div className="text-3xl font-extrabold text-white font-mono mt-1">500 Students</div>
            <p className="text-[11px] text-slate-400 mt-1">Target: Final-Year Engineers (2026)</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-950/90 border border-indigo-800 flex items-center justify-center text-indigo-400">
            <Target className="w-6 h-6" />
          </div>
        </div>

        {/* Total Budget */}
        <div className="rounded-2xl bg-[#0b1329] border border-slate-800 p-6 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-xs font-semibold uppercase text-slate-400">Allocated Campaign Budget</span>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">₹2,000</div>
            <p className="text-[11px] text-slate-400 mt-1">Zero Paid Ad Spend</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-950/90 border border-emerald-800 flex items-center justify-center text-emerald-400">
            <IndianRupee className="w-6 h-6" />
          </div>
        </div>

        {/* Projected CAC */}
        <div className="rounded-2xl bg-[#0b1329] border border-slate-800 p-6 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-xs font-semibold uppercase text-slate-400">Projected Unit CAC</span>
            <div className="text-3xl font-extrabold text-cyan-400 font-mono mt-1">₹4.00</div>
            <p className="text-[11px] text-slate-400 mt-1">₹2,000 / 500 Registrations</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-950/90 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Channel Plan Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Channel Target Allocation (Total 500)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Diversified acquisition mix avoiding reliance on any single campus or channel.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {channelPlans.map((ch) => (
            <div 
              key={ch.id}
              className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-sm">{ch.name}</h3>
                  <div className="text-right">
                    <span className="font-mono font-extrabold text-indigo-400 text-base">{ch.target}</span>
                    <span className="text-xs text-slate-500 block">seats ({((ch.target / 500) * 100).toFixed(0)}%)</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mb-3 leading-relaxed">{ch.description}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
                <strong className="text-indigo-300 font-medium">Execution Tactic:</strong> {ch.tactic}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Breakdown Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <IndianRupee className="w-4 h-4 text-emerald-400" />
            <span>₹2,000 Budget Allocation Breakdown</span>
          </h2>
          <p className="text-xs text-slate-400">
            Transparent breakdown ensuring every rupee drives organic virality and creative appeal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {budgetBreakdown.map((b, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-mono font-semibold">{b.percentage}% Allocation</span>
                  <span className="text-lg font-mono font-extrabold text-emerald-400">₹{b.amount}</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{b.category}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{b.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                Category Code: BGT-0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Timeline & Performance Adjustment Triggers */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>7-Day Timeline & Adaptive Performance Triggers</span>
          </h2>
          <p className="text-xs text-slate-400">
            How daily dashboard metrics guide operational adjustments throughout the sprint.
          </p>
        </div>

        <div className="space-y-4">
          {timelineMilestones.map((m) => (
            <div 
              key={m.day}
              className="rounded-2xl bg-[#0b1329] border border-slate-800 p-5 hover:border-slate-700 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center font-mono font-bold text-xs text-indigo-300">
                    D{m.day}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{m.title}</h3>
                    <span className="text-[11px] text-indigo-400 font-mono">Focus: {m.focus}</span>
                  </div>
                </div>

                <div className="text-right sm:text-right font-mono text-xs">
                  <span className="text-slate-400">Milestone Target: </span>
                  <strong className="text-emerald-400">{m.targetAccumulated} Registrations</strong>
                </div>
              </div>

              <div className="pt-3 grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                {/* Tasks */}
                <div className="md:col-span-7 space-y-1.5">
                  <span className="font-semibold text-slate-300 text-[11px] uppercase tracking-wider block">
                    Planned Sprint Tasks:
                  </span>
                  {m.tasks.map((t, i) => (
                    <div key={i} className="flex items-start space-x-2 text-slate-300 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                {/* Data Trigger */}
                <div className="md:col-span-5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2 text-amber-200/90">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase block tracking-wider">
                      Data-Driven Adjustment Trigger:
                    </span>
                    <p className="text-[11px] leading-relaxed mt-0.5 text-slate-300">
                      {m.adjustmentTrigger}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
