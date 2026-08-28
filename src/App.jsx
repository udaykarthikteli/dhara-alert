import React, { useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import LandslideCanvasBg from './components/LandslideCanvasBg';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import LiveAlertsBanner from './components/LiveAlertsBanner';
import AiPredictorModal from './components/AiPredictorModal';
import FieldReportForm from './components/FieldReportForm';
import EmergencyContactsModal from './components/EmergencyContactsModal';
import LandingPage from './components/LandingPage';

// Pages
import HomePage from './pages/HomePage';
import GisMapPage from './pages/GisMapPage';
import AiPredictorPage from './pages/AiPredictorPage';
import HighwaysPage from './pages/HighwaysPage';
import ReportsPage from './pages/ReportsPage';
import HelplinePage from './pages/HelplinePage';

import { calculateAiLandslideRisk } from './utils/aiRiskEngine';
import { nerStatesData, sampleCitizenReports } from './data/nerDistricts';
import { getOfflineReports } from './utils/offlineStorage';

export default function App() {
  const { t } = useLanguage();

  const [showLanding, setShowLanding] = useState(true);
  const [activePage, setActivePage] = useState('home'); // 'home', 'map', 'ai', 'highways', 'reports', 'helpline'
  const [activeStateId, setActiveStateId] = useState('meg'); // Default Meghalaya
  const [isOfficialMode, setIsOfficialMode] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('dashboard');

  // Modals
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);

  // Live AI Prediction state
  const [aiResult, setAiResult] = useState(() =>
    calculateAiLandslideRisk({ rainfall24h: 185, soilMoisture: 88, slopeAngle: 48 })
  );

  // Field Reports state
  const [citizenReports, setCitizenReports] = useState(() => [
    ...getOfflineReports(),
    ...sampleCitizenReports
  ]);

  const handleNewReport = (newRep) => {
    setCitizenReports((prev) => [newRep, ...prev]);
  };

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    if (showLanding) setShowLanding(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 font-sans relative overflow-x-hidden pb-20 md:pb-10 selection:bg-cyan-500 selection:text-black">
      {/* Background Physics Simulation */}
      <LandslideCanvasBg riskLevel={aiResult.riskLevel} active={true} speed={1} />

      {showLanding ? (
        <LandingPage onStartDashboard={() => setShowLanding(false)} />
      ) : (
        /* Main Container */
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar
            isOfficialMode={isOfficialMode}
            setIsOfficialMode={setIsOfficialMode}
            onOpenAiPredictor={() => setIsAiModalOpen(true)}
            onOpenReportForm={() => setIsReportModalOpen(true)}
            onOpenEmergencyContacts={() => setIsHelplineOpen(true)}
            onOpenHome={() => setShowLanding(true)}
            currentPage={activePage}
            onNavigatePage={(p) => setActivePage(p)}
          />

          {/* Dashboard Content Area */}
          <main className="max-w-7xl mx-auto px-4 py-5 space-y-6 flex-1 w-full">
            {/* Emergency Ticker */}
            <LiveAlertsBanner
              activeRiskLevel={aiResult.riskLevel}
              onTriggerSos={() => setIsHelplineOpen(true)}
            />

            {/* Page Router */}
            {activePage === 'home' && (
              <HomePage
                onNavigate={navigateTo}
                aiResult={aiResult}
                activeStateId={activeStateId}
                setActiveStateId={setActiveStateId}
                isOfficialMode={isOfficialMode}
              />
            )}

            {activePage === 'map' && (
              <GisMapPage activeStateId={activeStateId} setActiveStateId={setActiveStateId} />
            )}

            {activePage === 'ai' && (
              <AiPredictorPage aiResult={aiResult} setAiResult={setAiResult} />
            )}

            {activePage === 'highways' && <HighwaysPage />}

            {activePage === 'reports' && <ReportsPage />}

            {activePage === 'helpline' && <HelplinePage />}
          </main>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeMobileTab}
        setActiveTab={setActiveMobileTab}
        onOpenAiPredictor={() => setIsAiModalOpen(true)}
        onOpenReportForm={() => setIsReportModalOpen(true)}
        onOpenEmergencyContacts={() => setIsHelplineOpen(true)}
      />

      {/* Modals */}
      <AiPredictorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyPrediction={(res) => setAiResult(res)}
      />

      <FieldReportForm
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReportSubmitted={handleNewReport}
      />

      <EmergencyContactsModal
        isOpen={isHelplineOpen}
        onClose={() => setIsHelplineOpen(false)}
      />
    </div>
  );
}
