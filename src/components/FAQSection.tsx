import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQSectionProps {
  onRegisterClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onRegisterClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is this workshop truly 100% free with no hidden charges?',
      a: 'Yes, completely free. The workshop has zero registration fees, requires no paid API keys or subscriptions, and does not collect any payment details.'
    },
    {
      q: 'When will the workshop date and live meeting link be shared?',
      a: 'As this is an active 7-day student growth campaign, confirmed session dates, timing slots, and streaming links will be delivered directly to your registered email address once the registration cohort is finalized.'
    },
    {
      q: 'What are the technical prerequisites for attending?',
      a: 'A laptop with any modern web browser (Chrome, Edge, Brave, Firefox) and basic familiarity with high-level coding concepts (such as JavaScript or Python). You do not need machine learning coursework or high-end GPU hardware.'
    },
    {
      q: 'Will certificates or placement guarantees be provided?',
      a: 'No. To maintain complete honesty, this 60-minute workshop does not offer certificates of completion or commercial placement guarantees. The true tangible value is the working, deployable AI project you build and add to your GitHub portfolio.'
    },
    {
      q: 'Is this an official NxtWave commercial portal?',
      a: 'No. This application is an interactive demonstration prototype developed specifically for the NxtWave Growth Intern hiring challenge to simulate student acquisition, referral loops, and campaign analytics.'
    },
    {
      q: 'How does the campus referral program work?',
      a: 'Every registered student receives a personal referral link (e.g. ?ref=YOURNAME). When classmates register using your link, attribution is tracked on the live Growth Dashboard. The campaign plan proposes ₹1,200 in small rewards for the top 3 referrers.'
    }
  ];

  return (
    <section className="py-20 bg-slate-950/60 border-t border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Clear Answers, Zero Ambiguity
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Everything you need to know about the session, technology, and scheduling.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 mb-16">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#0b1329] border border-slate-800/90 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between text-white font-medium text-sm hover:text-indigo-300 transition"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-900/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final Registration CTA Card */}
        <div className="rounded-2xl p-8 sm:p-10 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-800/40 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Build Your First Working AI Project?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Join fellow final-year engineering students across India in this 60-minute hands-on build session. 
              Zero cost, high practical impact.
            </p>
            <div className="pt-2">
              <button
                onClick={onRegisterClick}
                className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-glow hover:shadow-indigo-500/50 transition inline-flex items-center space-x-2"
              >
                <span>Reserve My Free Seat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              ⚡ Campaign Target: 500 Registrations • Scheduling details dispatched post-registration
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
