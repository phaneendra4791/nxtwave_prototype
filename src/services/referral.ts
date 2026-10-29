import type { AmbassadorInfo, ChannelSource } from '../types';

export const KNOWN_AMBASSADORS: AmbassadorInfo[] = [
  { code: 'SRM01', name: 'Aarav Sharma', college: 'SRM Institute of Science & Technology', channel: 'ambassador' },
  { code: 'IITB05', name: 'Rohan Deshmukh', college: 'IIT Bombay', channel: 'ambassador' },
  { code: 'BITS02', name: 'Ananya Verma', college: 'BITS Pilani', channel: 'ambassador' },
  { code: 'VIT03', name: 'Karthik Raja', college: 'VIT Vellore', channel: 'ambassador' },
  { code: 'RVCE01', name: 'Sneha Kulkarni', college: 'RV College of Engineering, Bengaluru', channel: 'ambassador' },
  { code: 'DTU04', name: 'Aditya Gupta', college: 'Delhi Technological University', channel: 'ambassador' },
  { code: 'NITW02', name: 'Pooja Reddy', college: 'NIT Warangal', channel: 'ambassador' },
  { code: 'PES01', name: 'Varun Nair', college: 'PES University, Bengaluru', channel: 'ambassador' },
  { code: 'CLUB-CS', name: 'ACM & CSI Student Chapters', college: 'Multi-Campus Tech Clubs', channel: 'college_club' },
  { code: 'COMM-DISCORD', name: 'Bangalore Student Devs', college: 'Inter-College Discord Community', channel: 'student_community' },
  { code: 'COMM-WHATSAPP', name: 'Final Year Placements Hub', college: 'Campus WhatsApp Network', channel: 'student_community' },
];

/**
 * Extracts referral code from URL search parameters or returns null
 */
export function getReferralCodeFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref') || params.get('referral');
  return ref ? ref.trim().toUpperCase() : null;
}

/**
 * Generates a unique, clean personal referral code based on user's name
 */
export function generatePersonalReferralCode(name: string): string {
  const cleanName = name.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase() || 'NXTAI';
  const randomSuffix = Math.floor(100 + Math.random() * 900); // 3 digits
  return `${cleanName}${randomSuffix}`;
}

/**
 * Resolves the channel source based on the referral code
 */
export function determineChannel(code?: string | null): ChannelSource {
  if (!code) return 'direct';
  
  const upperCode = code.toUpperCase().trim();
  const known = KNOWN_AMBASSADORS.find(a => a.code.toUpperCase() === upperCode);
  if (known) return known.channel;

  if (upperCode.startsWith('CLUB-')) return 'college_club';
  if (upperCode.startsWith('COMM-')) return 'student_community';
  
  // Custom peer-to-peer code
  return 'organic_referral';
}

/**
 * Returns ambassador details if known
 */
export function getAmbassadorInfo(code: string): AmbassadorInfo | undefined {
  const upperCode = code.toUpperCase().trim();
  return KNOWN_AMBASSADORS.find(a => a.code.toUpperCase() === upperCode);
}
