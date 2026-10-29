import type { Registration, StudyYear } from '../types';
import { determineChannel, generatePersonalReferralCode } from './referral';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'nxtwave_growth_registrations_v1';

export function getStorageMode(): 'supabase' | 'local_demo' {
  return isSupabaseConfigured ? 'supabase' : 'local_demo';
}

/**
 * Loads registrations from active storage (Supabase or LocalStorage)
 */
export async function getRegistrations(): Promise<Registration[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          fullName: row.full_name,
          email: row.email,
          college: row.college,
          studyYear: row.study_year as StudyYear,
          referralCode: row.referral_code || null,
          personalReferralCode: row.personal_referral_code,
          channelSource: row.channel_source,
          isSimulated: Boolean(row.is_simulated),
          createdAt: row.created_at,
        }));
      }
      console.warn('Supabase query failed, falling back to local demo storage:', error?.message);
    } catch (err) {
      console.warn('Supabase connection error:', err);
    }
  }

  // Fallback to LocalStorage
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse local registrations:', err);
    return [];
  }
}

/**
 * Validates email format strictly
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim().toLowerCase());
}

/**
 * Checks if an email is already registered in the dataset
 */
export async function checkDuplicateEmail(email: string, existingList?: Registration[]): Promise<boolean> {
  const cleanEmail = email.trim().toLowerCase();
  const list = existingList || await getRegistrations();
  return list.some(r => r.email.trim().toLowerCase() === cleanEmail);
}

export interface RegisterInput {
  fullName: string;
  email: string;
  college: string;
  studyYear: StudyYear;
  referralCode?: string | null;
}

/**
 * Adds a new registration with duplicate validation and persistence
 */
export async function addRegistration(
  input: RegisterInput,
  options?: { isSimulated?: boolean; customCreatedAt?: string }
): Promise<{ success: boolean; data?: Registration; error?: string }> {
  const fullName = input.fullName.trim();
  const email = input.email.trim().toLowerCase();
  const college = input.college.trim();
  const referralCode = input.referralCode ? input.referralCode.trim().toUpperCase() : null;

  if (!fullName) {
    return { success: false, error: 'Please enter your full name.' };
  }

  if (!email || !isValidEmail(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!college) {
    return { success: false, error: 'Please specify your college or university.' };
  }

  const currentList = await getRegistrations();
  const isDuplicate = currentList.some(r => r.email.trim().toLowerCase() === email);
  if (isDuplicate) {
    return { 
      success: false, 
      error: 'This email is already registered for the workshop. Please check your inbox for confirmation.' 
    };
  }

  const newRecord: Registration = {
    id: `reg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    fullName,
    email,
    college,
    studyYear: input.studyYear,
    referralCode,
    personalReferralCode: generatePersonalReferralCode(fullName),
    channelSource: determineChannel(referralCode),
    isSimulated: options?.isSimulated ?? false,
    createdAt: options?.customCreatedAt || new Date().toISOString(),
  };

  // Persist to Supabase if available
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('registrations').insert({
        id: newRecord.id,
        full_name: newRecord.fullName,
        email: newRecord.email,
        college: newRecord.college,
        study_year: newRecord.studyYear,
        referral_code: newRecord.referralCode,
        personal_referral_code: newRecord.personalReferralCode,
        channel_source: newRecord.channelSource,
        is_simulated: newRecord.isSimulated,
        created_at: newRecord.createdAt,
      });

      if (!error) {
        return { success: true, data: newRecord };
      }
      console.warn('Supabase insert failed, saving to local fallback:', error.message);
    } catch (err) {
      console.warn('Supabase write error, falling back:', err);
    }
  }

  // Persist to LocalStorage
  const updatedList = [newRecord, ...currentList];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  } catch (err) {
    console.error('LocalStorage write failed:', err);
  }

  return { success: true, data: newRecord };
}

/**
 * Seeds realistic demonstration data (approx 198 registrations across Days 1-4)
 * with explicit isSimulated = true.
 */
export async function seedDemoData(): Promise<Registration[]> {
  const seedColleges = [
    'SRM Institute of Science & Technology',
    'VIT Vellore',
    'RV College of Engineering, Bengaluru',
    'BITS Pilani',
    'IIT Bombay',
    'Delhi Technological University',
    'NIT Warangal',
    'PES University, Bengaluru',
    'MS Ramaiah Institute of Technology',
    'Thapar Institute of Engg & Tech',
    'College of Engineering Pune (COEP)',
    'Jadavpur University, Kolkata'
  ];

  const firstNames = [
    'Aarav', 'Vihaan', 'Aditya', 'Sai', 'Aryan', 'Ishaan', 'Kabir', 'Rohan', 'Dhruv', 'Arjun',
    'Ananya', 'Diya', 'Sneha', 'Pooja', 'Tanvi', 'Isha', 'Riya', 'Kavya', 'Sanya', 'Meera',
    'Karthik', 'Nikhil', 'Varun', 'Pranav', 'Harsh', 'Rahul', 'Shreya', 'Anika', 'Neha', 'Bhavya'
  ];

  const lastNames = [
    'Sharma', 'Verma', 'Patel', 'Reddy', 'Deshmukh', 'Nair', 'Kulkarni', 'Gupta', 'Iyer', 'Menon',
    'Chopra', 'Rao', 'Bhat', 'Joshi', 'Singh', 'Kapoor', 'Mehta', 'Nambiar', 'Ghosh', 'Chatterjee'
  ];

  const ambassadorCodes = ['SRM01', 'IITB05', 'BITS02', 'VIT03', 'RVCE01', 'DTU04', 'NITW02', 'PES01'];
  const clubCodes = ['CLUB-CS', 'COMM-DISCORD', 'COMM-WHATSAPP'];

  // Current simulated campaign is on Day 4 of 7
  // Day 1: 34 registrations
  // Day 2: 52 registrations
  // Day 3: 63 registrations
  // Day 4: 49 registrations
  // Total ~ 198 registrations
  const simulatedRecords: Registration[] = [];
  const baseTime = new Date('2026-10-26T09:00:00Z'); // Day 1 morning

  const dailyCounts = [34, 52, 63, 49];

  let recordIndex = 0;
  for (let day = 0; day < 4; day++) {
    const count = dailyCounts[day];
    for (let i = 0; i < count; i++) {
      recordIndex++;
      const fName = firstNames[(recordIndex * 7 + i) % firstNames.length];
      const lName = lastNames[(recordIndex * 13 + i) % lastNames.length];
      const fullName = `${fName} ${lName}`;
      const college = seedColleges[(i + day * 3) % seedColleges.length];
      
      // Determine referral code based on channel targets:
      // Ambassadors (~48%), Clubs/Comm (~35%), Organic/Direct (~17%)
      const roll = (recordIndex * 19 + i * 3) % 100;
      let refCode: string | null = null;
      if (roll < 48) {
        refCode = ambassadorCodes[(i + day) % ambassadorCodes.length];
      } else if (roll < 78) {
        refCode = clubCodes[(i + day) % clubCodes.length];
      } else if (roll < 90) {
        refCode = `${fName.slice(0, 4).toUpperCase()}789`; // peer referral
      } else {
        refCode = null; // direct
      }

      // Distribute timestamp across daytime
      const hourOffset = (day * 24) + 8 + ((i * 14) % 14); // 8 AM to 10 PM
      const minuteOffset = (i * 23) % 60;
      const date = new Date(baseTime.getTime() + (hourOffset * 3600 + minuteOffset * 60) * 1000);

      const studyYear: StudyYear = (i % 8 === 0) 
        ? 'Pre-Final Year (2027 Batch)' 
        : 'Final Year (2026 Batch)';

      simulatedRecords.push({
        id: `sim-${day + 1}-${i + 1}`,
        fullName,
        email: `${fName.toLowerCase()}.${lName.toLowerCase()}.${recordIndex}@example.edu`,
        college,
        studyYear,
        referralCode: refCode,
        personalReferralCode: `${fName.slice(0, 4).toUpperCase()}${100 + ((recordIndex * 29) % 899)}`,
        channelSource: determineChannel(refCode),
        isSimulated: true,
        createdAt: date.toISOString(),
      });
    }
  }

  // Reverse so newest appears first
  simulatedRecords.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Merge with any real user registrations that were created in local mode
  const current = await getRegistrations();
  const realRecords = current.filter(r => !r.isSimulated);
  const combined = [...realRecords, ...simulatedRecords];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
  } catch (err) {
    console.error('LocalStorage write failed:', err);
  }

  return combined;
}

/**
 * Clears demo records or resets all local records
 */
export async function clearRegistrations(onlySimulated = true): Promise<Registration[]> {
  const current = await getRegistrations();
  const remaining = onlySimulated ? current.filter(r => !r.isSimulated) : [];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
  } catch (err) {
    console.error('LocalStorage clear failed:', err);
  }
  return remaining;
}

/**
 * Exports current registrations dataset to a clean CSV file
 */
export function exportToCSV(registrations: Registration[]): void {
  if (!registrations || registrations.length === 0) {
    alert('No registrations available to export.');
    return;
  }

  const headers = [
    'Registration ID',
    'Full Name',
    'Email Address',
    'College / University',
    'Study Year',
    'Referral Code Used',
    'Acquisition Channel',
    'Personal Referral Code',
    'Record Type',
    'Timestamp (ISO)'
  ];

  const rows = registrations.map(r => [
    `"${r.id}"`,
    `"${r.fullName.replace(/"/g, '""')}"`,
    `"${r.email.replace(/"/g, '""')}"`,
    `"${r.college.replace(/"/g, '""')}"`,
    `"${r.studyYear}"`,
    `"${r.referralCode || 'None (Direct)'}"`,
    `"${r.channelSource}"`,
    `"${r.personalReferralCode}"`,
    `"${r.isSimulated ? 'Simulated Demo' : 'Real Submission'}"`,
    `"${r.createdAt}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().slice(0, 10);
  link.setAttribute('href', url);
  link.setAttribute('download', `nxtwave_ai_workshop_registrations_${timestamp}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
