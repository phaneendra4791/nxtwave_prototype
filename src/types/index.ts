export type StudyYear = 
  | 'Final Year (2026 Batch)' 
  | 'Pre-Final Year (2027 Batch)' 
  | 'Third Year' 
  | 'Postgraduate / Other';

export type ChannelSource = 
  | 'ambassador' 
  | 'college_club' 
  | 'student_community' 
  | 'organic_referral' 
  | 'direct';

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  college: string;
  studyYear: StudyYear;
  referralCode: string | null;
  personalReferralCode: string;
  channelSource: ChannelSource;
  isSimulated: boolean;
  createdAt: string;
}

export interface AmbassadorInfo {
  code: string;
  name: string;
  college: string;
  channel: ChannelSource;
}

export interface ChannelPlan {
  id: ChannelSource;
  name: string;
  target: number;
  description: string;
  tactic: string;
}

export interface BudgetAllocation {
  category: string;
  amount: number;
  percentage: number;
  description: string;
}

export interface DayMilestone {
  day: number;
  title: string;
  focus: string;
  targetAccumulated: number;
  tasks: string[];
  adjustmentTrigger: string;
}

export interface AILearningNote {
  id: string;
  title: string;
  topic: string;
  prompt: string;
  aiSuggestion: string;
  finalDecision: string;
  rationale: string;
}
