import React, { useState, useEffect } from 'react';
import type { Registration } from './types';
import { 
  getRegistrations, 
  seedDemoData, 
  clearRegistrations 
} from './services/storage';
import { getReferralCodeFromUrl } from './services/referral';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectPreview } from './components/ProjectPreview';
import { Benefits } from './components/Benefits';
import { WorkshopOutline } from './components/WorkshopOutline';
import { RegistrationSection } from './components/RegistrationSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { DashboardView } from './components/Dashboard/DashboardView';
import { CampaignStrategy } from './components/Strategy/CampaignStrategy';
import { AINotesSection } from './components/AINotes/AINotesSection';
import { SupabaseModal } from './components/SupabaseModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'landing' | 'dashboard' | 'strategy' | 'ai-notes'>('landing');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentRefCode, setCurrentRefCode] = useState<string | null>(null);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState<boolean>(false);

  // Initialize data and referral parameter
  useEffect(() => {
    // 1. Detect referral from URL query string ?ref=XYZ
    const ref = getReferralCodeFromUrl();
    if (ref) {
      setCurrentRefCode(ref);
    }

    // 2. Fetch registrations
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const data = await getRegistrations();
        // If dataset is completely empty on fresh first load, optionally seed demo data
        if (data.length === 0) {
          const seeded = await seedDemoData();
          setRegistrations(seeded);
        } else {
          setRegistrations(data);
        }
      } catch (err) {
        console.error('Failed to load registrations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Handler for changing or testing referral codes
  const handleSelectRefCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    setCurrentRefCode(clean || null);
    
    // Update browser URL query parameter without full reload
    const url = new URL(window.location.href);
    if (clean) {
      url.searchParams.set('ref', clean);
    } else {
      url.searchParams.delete('ref');
      url.searchParams.delete('referral');
    }
    window.history.replaceState({}, '', url.toString());
  };

  // Handler for newly submitted registration
  const handleSuccessfulRegistration = (newRecord: Registration) => {
    setRegistrations((prev) => [newRecord, ...prev]);
  };

  // Handler to load demo seed data explicitly
  const handleLoadDemoData = async () => {
    setIsLoading(true);
    try {
      const updated = await seedDemoData();
      setRegistrations(updated);
    } catch (err) {
      console.error('Failed to seed demo data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler to clear simulated records
  const handleClearData = async (onlySimulated = true) => {
    setIsLoading(true);
    try {
      const remaining = await clearRegistrations(onlySimulated);
      setRegistrations(remaining);
    } catch (err) {
      console.error('Failed to clear data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll helpers
  const scrollToRegistration = () => {
    if (activeTab !== 'landing') {
      setActiveTab('landing');
      setTimeout(() => {
        document.getElementById('registration-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('registration-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWhatYouWillBuild = () => {
    if (activeTab !== 'landing') {
      setActiveTab('landing');
      setTimeout(() => {
        document.getElementById('what-you-will-build')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('what-you-will-build')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070c1e] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        registrationsCount={registrations.length}
        currentRefCode={currentRefCode}
        onSelectRefCode={handleSelectRefCode}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'landing' && (
          <div>
            <Hero
              onReserveClick={scrollToRegistration}
              onSeeWhatYouBuildClick={scrollToWhatYouWillBuild}
              currentRefCode={currentRefCode}
              registrationsCount={registrations.length}
            />

            <Benefits />

            <ProjectPreview />

            <WorkshopOutline />

            <RegistrationSection
              initialReferralCode={currentRefCode}
              onSuccessfulRegistration={handleSuccessfulRegistration}
            />

            <FAQSection onRegisterClick={scrollToRegistration} />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            registrations={registrations}
            onLoadDemoData={handleLoadDemoData}
            onClearData={handleClearData}
            isLoading={isLoading}
            onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
          />
        )}

        {activeTab === 'strategy' && (
          <CampaignStrategy />
        )}

        {activeTab === 'ai-notes' && (
          <AINotesSection />
        )}
      </main>

      {/* Site-wide Footer */}
      <Footer />

      {/* Supabase / Persistence Configuration Modal */}
      <SupabaseModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
      />

    </div>
  );
};

export default App;
