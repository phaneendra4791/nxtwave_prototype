import { describe, it, expect } from 'vitest';
import { 
  determineChannel, 
  generatePersonalReferralCode, 
  getAmbassadorInfo 
} from './referral';

describe('Referral Service Unit Tests', () => {
  it('identifies direct traffic when no referral code is present', () => {
    expect(determineChannel(null)).toBe('direct');
    expect(determineChannel(undefined)).toBe('direct');
    expect(determineChannel('')).toBe('direct');
  });

  it('correctly maps known campus ambassadors to ambassador channel', () => {
    expect(determineChannel('SRM01')).toBe('ambassador');
    expect(determineChannel('srm01')).toBe('ambassador'); // case-insensitive
    expect(determineChannel('IITB05')).toBe('ambassador');
    expect(determineChannel('BITS02')).toBe('ambassador');
  });

  it('correctly categorizes club and community codes', () => {
    expect(determineChannel('CLUB-CS')).toBe('college_club');
    expect(determineChannel('COMM-DISCORD')).toBe('student_community');
  });

  it('classifies custom peer referral codes as organic_referral', () => {
    expect(determineChannel('PRIYA123')).toBe('organic_referral');
    expect(determineChannel('ROHAN999')).toBe('organic_referral');
  });

  it('generates consistent, clean personal referral codes', () => {
    const code = generatePersonalReferralCode('Sneha Kulkarni');
    expect(code).toMatch(/^SNEH\d{3}$/);

    const fallbackCode = generatePersonalReferralCode('---');
    expect(fallbackCode).toMatch(/^NXTAI\d{3}$/);
  });

  it('retrieves ambassador details accurately', () => {
    const amb = getAmbassadorInfo('SRM01');
    expect(amb).toBeDefined();
    expect(amb?.name).toBe('Aarav Sharma');
    expect(amb?.college).toContain('SRM Institute');
  });
});
