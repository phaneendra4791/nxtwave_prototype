import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Copy, 
  Check, 
  Share2, 
  ArrowRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { StudyYear, Registration } from '../types';
import { addRegistration, isValidEmail, getStorageMode } from '../services/storage';
import { getAmbassadorInfo } from '../services/referral';

interface RegistrationSectionProps {
  initialReferralCode: string | null;
  onSuccessfulRegistration: (record: Registration) => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  initialReferralCode,
  onSuccessfulRegistration,
}) => {
  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [studyYear, setStudyYear] = useState<StudyYear>('Final Year (2026 Batch)');
  const [referralCode, setReferralCode] = useState(initialReferralCode || '');
  const [consent, setConsent] = useState(false);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedRecord, setCompletedRecord] = useState<Registration | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const storageMode = getStorageMode();

  // Sync with prop when url or preset changes
  useEffect(() => {
    if (initialReferralCode) {
      setReferralCode(initialReferralCode);
    }
  }, [initialReferralCode]);

  const ambassador = referralCode ? getAmbassadorInfo(referralCode) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!email.trim() || !isValidEmail(email)) {
      setErrorMessage('Please provide a valid college or personal email address.');
      return;
    }

    if (!college.trim()) {
      setErrorMessage('Please enter your college or university name.');
      return;
    }

    if (!consent) {
      setErrorMessage('Please confirm that you agree to receive workshop confirmation details.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await addRegistration({
        fullName,
        email,
        college,
        studyYear,
        referralCode: referralCode.trim() || null,
      });

      if (!result.success || !result.data) {
        setErrorMessage(result.error || 'Failed to submit registration. Please try again.');
        setIsLoading(false);
        return;
      }

      // Success!
      setCompletedRecord(result.data);
      onSuccessfulRegistration(result.data);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#38bdf8', '#a855f7', '#10b981']
        });
      } catch (err) {
        // Safe fallback if canvas not available
      }

    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!completedRecord) return;
    const shareUrl = `${window.location.origin}${window.location.pathname}?ref=${completedRecord.personalReferralCode}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = () => {
    if (!completedRecord) return;
    navigator.clipboard.writeText(completedRecord.personalReferralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section id="registration-section" className="py-20 bg-[#070c1e] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-xs font-semibold text-indigo-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limited to 500 Seats • Zero Registration Fee</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Reserve Your Free Seat Now
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Quick registration with minimal required fields. No phone numbers, passwords, or payments collected.
          </p>
        </div>

        {/* Prototype & Storage Notice */}
        <div className="mb-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start space-x-3">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-200">Demonstration Prototype Notice:</p>
            <p className="text-slate-400 leading-relaxed">
              This platform is a simulated growth campaign demonstration prototype for the NxtWave Growth Intern challenge. 
              {storageMode === 'supabase' 
                ? ' Submissions are securely synced with Supabase PostgreSQL.' 
                : ' Submissions are saved to local browser storage in demo mode.'} 
              {' '}Exact scheduling details will be sent via confirmation email once the workshop schedule is finalized.
            </p>
          </div>
        </div>

        {/* Main Card: Form OR Confirmation Screen */}
        <div className="rounded-2xl bg-[#0b1329] border border-slate-800 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          
          {completedRecord ? (
            /* ============================================================== */
            /* SUCCESS CONFIRMATION VIEW                                      */
            /* ============================================================== */
            <div className="animate-fadeIn space-y-6">
              
              {/* Top Success Badge */}
              <div className="text-center pb-6 border-b border-slate-800">
                <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4 shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Registration Successfully Recorded!
                </h3>
                <p className="text-slate-300 text-sm mt-2">
                  Welcome aboard, <strong className="text-white">{completedRecord.fullName}</strong>. Your seat reservation request has been processed.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Confirmation logged for <span className="font-mono text-indigo-300">{completedRecord.email}</span> • {completedRecord.college}
                </p>
              </div>

              {/* What Happens Next Checklist */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 text-xs">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                  What Happens Next (Scheduling Roadmap):
                </h4>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>No instant meeting link:</strong> As this is a 7-day growth campaign prototype, the final calendar invite and session streaming link will be dispatched via email 24 hours prior to the workshop.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Pre-workshop Setup:</strong> You only need a modern web browser and a free GitHub account. No GPU installation needed.</span>
                  </div>
                </div>
              </div>

              {/* Personal Referral Attribution Box */}
              <div className="p-5 rounded-xl bg-indigo-950/50 border border-indigo-800/60 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-indigo-300 uppercase tracking-wider font-semibold">
                      Your Unique Referral Code
                    </span>
                    <h5 className="text-lg font-bold text-white font-mono">
                      {completedRecord.personalReferralCode}
                    </h5>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center space-x-1.5 transition"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1.5">
                    Shareable Invitation Link (Attributes registrations to you):
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      readOnly
                      value={`${window.location.origin}${window.location.pathname}?ref=${completedRecord.personalReferralCode}`}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition shrink-0"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-indigo-300/80">
                  🎁 <strong>Campaign Incentive:</strong> Classmates who invite peers participate in the ₹1,200 top referrer rewards pool, tracked live on the Growth Dashboard!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setCompletedRecord(null);
                    setFullName('');
                    setEmail('');
                    setConsent(false);
                  }}
                  className="text-xs text-slate-400 hover:text-white underline transition"
                >
                  Register another student (for testing)
                </button>

                <a
                  href="#what-you-will-build"
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition"
                >
                  <span>Explore Workshop Project Preview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ) : (
            /* ============================================================== */
            /* REGISTRATION FORM VIEW                                         */
            /* ============================================================== */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-800/80 text-rose-200 text-xs flex items-start space-x-2.5 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="reg-fullname" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="reg-fullname"
                    type="text"
                    required
                    placeholder="e.g. Priya Sundaram"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>

                <div>
                  <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    placeholder="e.g. priya.s@srmist.edu.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              {/* College & Study Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="reg-college" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    College / University <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="reg-college"
                    type="text"
                    required
                    placeholder="e.g. SRM Institute of Science & Technology"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>

                <div>
                  <label htmlFor="reg-study-year" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Year of Study <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="reg-study-year"
                    value={studyYear}
                    onChange={(e) => setStudyYear(e.target.value as StudyYear)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  >
                    <option value="Final Year (2026 Batch)">Final Year (2026 Batch) — Target</option>
                    <option value="Pre-Final Year (2027 Batch)">Pre-Final Year (2027 Batch)</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Postgraduate / Other">Postgraduate / Other</option>
                  </select>
                </div>
              </div>

              {/* Referral Code (Optional, Auto-populated) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="reg-referral" className="text-xs font-semibold text-slate-300">
                    Referral Code <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  {ambassador && (
                    <span className="text-[11px] text-indigo-400 font-medium">
                      Ambassador: {ambassador.name} ({ambassador.college})
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="reg-referral"
                    type="text"
                    placeholder="e.g. SRM01 or leave blank for direct"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-indigo-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 uppercase transition"
                  />
                  {referralCode && (
                    <button
                      type="button"
                      onClick={() => setReferralCode('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Have a campus ambassador or friend referral code? Enter it above to attribute credit.
                </p>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    id="reg-consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                  />
                  <span className="text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed">
                    I agree to register for the free “Build Your First AI Project in 60 Minutes” workshop and acknowledge that this web application is a challenge prototype. I consent to receiving workshop scheduling communications.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  id="submit-registration-btn"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm shadow-glow flex items-center justify-center space-x-2 transition"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Validating & Recording Registration...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Free Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
