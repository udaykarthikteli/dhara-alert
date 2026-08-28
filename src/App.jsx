import React, { useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import LandslideCanvasBg from './components/LandslideCanvasBg';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import LiveAlertsBanner from './components/LiveAlertsBanner';
import SlopePhysicsSimulator from './components/SlopePhysicsSimulator';
import GisRiskMap from './components/GisRiskMap';
import RoadStatusBoard from './components/RoadStatusBoard';
import AiPredictorModal from './components/AiPredictorModal';
import FieldReportForm from './components/FieldReportForm';
import EmergencyContactsModal from './components/EmergencyContactsModal';
import { calculateAiLandslideRisk } from './utils/aiRiskEngine';
import { nerStatesData, sampleCitizenReports } from './data/nerDistricts';
import { getOfflineReports } from './utils/offlineStorage';
import { ShieldCheck, Cpu, Camera, MapPin, Radio, Activity, RefreshCcw, Sliders, Volume2 } from 'lucide-react';

export default function App() {
  const { t } = useLanguage();

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

  const activeState = nerStatesData.find((s) => s.id === activeStateId) || nerStatesData[0];

  const handleNewReport = (newRep) => {
    setCitizenReports((prev) => [newRep, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 font-sans relative overflow-x-hidden pb-20 md:pb-10 selection:bg-cyan-500 selection:text-black">
      {/* Background Physics Simulation */}
      <LandslideCanvasBg riskLevel={aiResult.riskLevel} active={true} speed={1} />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar
          isOfficialMode={isOfficialMode}
          setIsOfficialMode={setIsOfficialMode}
          onOpenAiPredictor={() => setIsAiModalOpen(true)}
          onOpenReportForm={() => setIsReportModalOpen(true)}
          onOpenEmergencyContacts={() => setIsHelplineOpen(true)}
        />

        {/* Dashboard Content Area */}
        <main className="max-w-7xl mx-auto px-4 py-5 space-y-6 flex-1 w-full">
          {/* Emergency Ticker */}
          <LiveAlertsBanner
            activeRiskLevel={aiResult.riskLevel}
            onTriggerSos={() => setIsHelplineOpen(true)}
          />

          {/* State Risk Selector Tabs */}
          <div className="bg-[#121b2d]/80 backdrop-blur-md border border-[#1e2c45] p-2 rounded-2xl flex items-center gap-1.5 overflow-x-auto scrollbar-none shadow-lg">
            <span className="text-xs font-bold text-slate-400 px-3 flex-shrink-0">NER State Filter:</span>
            {nerStatesData.map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveStateId(st.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 border ${
                  activeStateId === st.id
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20'
                    : 'bg-[#0a0f1d] text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{st.name}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    st.overallRisk === 'CRITICAL'
                      ? 'bg-rose-500 text-white'
                      : st.overallRisk === 'HIGH'
                      ? 'bg-amber-500 text-black'
                      : 'bg-emerald-500 text-black'
                  }`}
                >
                  {st.riskScore}%
                </span>
              </button>
            ))}
          </div>

          {/* Top Grid: GIS Map & Slope Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* GIS Interactive Map */}
            <div className="lg:col-span-7">
              <GisRiskMap activeStateId={activeStateId} />
            </div>

            {/* 2D Physics Visualizer */}
            <div className="lg:col-span-5 flex flex-col">
              <SlopePhysicsSimulator aiResult={aiResult} />
            </div>
          </div>

          {/* Highways Status & Citizen Feed Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Road Status Board */}
            <div className="lg:col-span-7">
              <RoadStatusBoard />
            </div>

            {/* Live Citizen Reports Feed */}
            <div className="lg:col-span-5 bg-[#121b2d]/90 border border-[#1e2c45] rounded-2xl p-4 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <h3 className="font-bold text-slate-100 text-sm md:text-base flex items-center gap-2">
                    <Radio className="w-4 h-4 text-cyan-400" />
                    {t('recentReports')}
                  </h3>
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="text-xs text-rose-400 hover:underline font-bold flex items-center gap-1"
                  >
                    + Report Incident
                  </button>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {citizenReports.slice(0, 4).map((rep) => (
                    <div key={rep.id} className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{rep.category}</span>
                        <span className="text-[10px] text-slate-500">{rep.timestamp}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] line-clamp-2">{rep.description}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                        <span className="text-cyan-400 font-semibold">📍 {rep.location}</span>
                        <span className="text-rose-400 font-bold">{rep.severity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

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
