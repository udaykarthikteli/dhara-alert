import React from 'react';
import { Home, Map, Cpu, Camera, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MobileNav({
  activeTab,
  setActiveTab,
  onOpenAiPredictor,
  onOpenReportForm,
  onOpenEmergencyContacts
}) {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0f1d]/95 backdrop-blur-lg border-t border-[#1e2c45] md:hidden px-2 py-2">
      <div className="flex items-center justify-around">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 p-1.5 text-[10px] font-bold ${
            activeTab === 'dashboard' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={onOpenAiPredictor}
          className="flex flex-col items-center gap-1 p-1.5 text-[10px] font-bold text-slate-400 hover:text-cyan-400"
        >
          <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span>AI Model</span>
        </button>

        <button
          onClick={onOpenReportForm}
          className="flex flex-col items-center justify-center p-3 rounded-full bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-xl shadow-rose-500/40 -mt-5 border-4 border-[#0a0f1d]"
        >
          <Camera className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-1 p-1.5 text-[10px] font-bold ${
            activeTab === 'map' ? 'text-cyan-400' : 'text-slate-400'
          }`}
        >
          <Map className="w-5 h-5" />
          <span>GIS Map</span>
        </button>

        <button
          onClick={onOpenEmergencyContacts}
          className="flex flex-col items-center gap-1 p-1.5 text-[10px] font-bold text-slate-400 hover:text-rose-400"
        >
          <PhoneCall className="w-5 h-5 text-rose-400" />
          <span>Helpline</span>
        </button>
      </div>
    </nav>
  );
}
