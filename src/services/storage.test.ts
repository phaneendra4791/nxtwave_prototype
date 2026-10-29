import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { isValidEmail, checkDuplicateEmail, addRegistration } from './storage';
import type { Registration } from '../types';

// In Node environment, mock localStorage
class LocalStorageMock {
  private store: Record<string, string> = {};
  clear() {
    this.store = {};
  }
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }
  removeItem(key: string) {
    delete this.store[key];
  }
}

beforeAll(() => {
  if (typeof globalThis.localStorage === 'undefined') {
    (globalThis as any).localStorage = new LocalStorageMock();
  }
});

describe('Storage & Registration Logic Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Email Format Validation', () => {
    it('validates standard email formats correctly', () => {
      expect(isValidEmail('student@srmist.edu.in')).toBe(true);
      expect(isValidEmail('rohan.deshmukh@iitb.ac.in')).toBe(true);
      expect(isValidEmail('priya123@gmail.com')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('plainaddress')).toBe(false);
      expect(isValidEmail('student@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('student@.com')).toBe(false);
      expect(isValidEmail('student@domain')).toBe(false);
    });
  });

  describe('Duplicate Email Prevention', () => {
    const existingList: Registration[] = [
      {
        id: 'reg-1',
        fullName: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        college: 'SRM Institute',
        studyYear: 'Final Year (2026 Batch)',
        referralCode: null,
        personalReferralCode: 'AARA101',
        channelSource: 'direct',
        isSimulated: false,
        createdAt: new Date().toISOString(),
      }
    ];

    it('detects duplicate email regardless of case or whitespace', async () => {
      expect(await checkDuplicateEmail('aarav.sharma@example.com', existingList)).toBe(true);
      expect(await checkDuplicateEmail('  AARAV.SHARMA@EXAMPLE.COM  ', existingList)).toBe(true);
    });

    it('allows new, unique emails', async () => {
      expect(await checkDuplicateEmail('unique.student@example.com', existingList)).toBe(false);
    });
  });

  describe('Registration Submission Flow', () => {
    it('successfully creates registration with all required fields', async () => {
      const result = await addRegistration({
        fullName: 'Ananya Verma',
        email: 'ananya@bits.edu.in',
        college: 'BITS Pilani',
        studyYear: 'Final Year (2026 Batch)',
        referralCode: 'SRM01',
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.fullName).toBe('Ananya Verma');
      expect(result.data?.email).toBe('ananya@bits.edu.in');
      expect(result.data?.channelSource).toBe('ambassador');
      expect(result.data?.personalReferralCode).toMatch(/^ANAN\d{3}$/);
      expect(result.data?.isSimulated).toBe(false);
    });

    it('rejects duplicate registration attempt on same email', async () => {
      await addRegistration({
        fullName: 'Karthik Raja',
        email: 'karthik@vit.ac.in',
        college: 'VIT Vellore',
        studyYear: 'Final Year (2026 Batch)',
      });

      const duplicateAttempt = await addRegistration({
        fullName: 'Karthik Raja (Attempt 2)',
        email: 'karthik@vit.ac.in',
        college: 'VIT Vellore',
        studyYear: 'Final Year (2026 Batch)',
      });

      expect(duplicateAttempt.success).toBe(false);
      expect(duplicateAttempt.error).toContain('already registered');
    });

    it('rejects submissions with missing full name', async () => {
      const result = await addRegistration({
        fullName: '   ',
        email: 'valid@example.com',
        college: 'RVCE',
        studyYear: 'Final Year (2026 Batch)',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('full name');
    });

    it('rejects submissions with missing college', async () => {
      const result = await addRegistration({
        fullName: 'Valid Name',
        email: 'valid@example.com',
        college: '   ',
        studyYear: 'Final Year (2026 Batch)',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('college or university');
    });
  });
});
