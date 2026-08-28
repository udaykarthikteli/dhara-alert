import React from 'react';
import { ShieldAlert, Cpu, Radio, Truck, Camera, ArrowRight, Activity, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { nerStatesData } from '../data/nerDistricts';

export default function HomePage({ onNavigate, aiResult, activeStateId, setActiveStateId, isOfficialMode }) {
  const { t } = useLanguage();
  const activeState = nerStatesData.find((s) => s.id === activeStateId) || nerStatesData[0];

  return (
    <div className="space-y-5">
      {/* State Selector Tabs */}
      <div className="bg-[#1e293b] border border-slate-700/80 p-2.5 rounded-xl flex items-center gap-2 overflow-x-auto scrollbar-none shadow-sm">
        <span className="text-xs font-semibold text-slate-400 px-2 flex-shrink-0">NER State Filter:</span>
        {nerStatesData.map((st) => (
          <button
            key={st.id}
            onClick={() => setActiveStateId(st.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 border ${
              activeStateId === st.id
                ? 'bg-emerald-700 text-white border-emerald-600 font-bold shadow-sm'
                : 'bg-[#0f172a] text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span>{st.name}</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                st.overallRisk === 'CRITICAL'
                  ? 'bg-rose-700 text-white'
                  : st.overallRisk === 'HIGH'
                  ? 'bg-amber-600 text-black'
                  : 'bg-emerald-800 text-white'
              }`}
            >
              {st.riskScore}%
            </span>
          </button>
        ))}
      </div>

      {/* Hero Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* State Summary Card */}
        <div className="bg-[#1e293b] border border-slate-700/80 p-4 rounded-xl shadow-sm space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Region</span>
            <span className="px-2.5 py-0.5 rounded-md bg-rose-950/60 text-rose-300 border border-rose-800/80 text-[11px] font-bold">
              {activeState.overallRisk} HAZARD
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">{activeState.name}</h2>
            <p className="text-xs text-slate-400 mt-1">Capital: {activeState.capital} | Active IoT Nodes: {activeState.activeSensorsCount}</p>
          </div>
          <button
            onClick={() => onNavigate('map')}
            className="w-full py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-200 font-semibold text-xs hover:bg-slate-800 flex items-center justify-center gap-2"
          >
            <Radio className="w-4 h-4 text-emerald-400" /> Open Full GIS Map <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live AI Risk Index Card */}
        <div className="bg-[#1e293b] border border-slate-700/80 p-4 rounded-xl shadow-sm space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Geotechnical Score</span>
            <span className="text-xs font-bold text-emerald-400">FoS: {aiResult.factorOfSafety}</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-100">{aiResult.lhiScore}%</span>
              <span className="text-xs font-bold text-slate-300">{aiResult.riskLevel} LHI</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Calculated via Mohr-Coulomb shear stress model</p>
          </div>
          <button
            onClick={() => onNavigate('ai')}
            className="w-full py-2 rounded-lg bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-600 flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4" /> Launch AI Risk Simulator <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Emergency Field Action Card */}
        <div className="bg-[#1e293b] border border-slate-700/80 p-4 rounded-xl shadow-sm space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Field Crowdsourcing</span>
            <span className="text-xs font-bold text-emerald-400">Zero-Auth Active</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Report Mountain Incident</h3>
            <p className="text-xs text-slate-400 mt-1">Geo-tagged photo upload for cracks & blocked roads</p>
          </div>
          <button
            onClick={() => onNavigate('reports')}
            className="w-full py-2 rounded-lg bg-rose-700 text-white font-semibold text-xs hover:bg-rose-600 flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" /> Submit Geo-Tagged Report <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Feature Navigation Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Highways Shortcut */}
        <div
          onClick={() => onNavigate('highways')}
          className="p-4 rounded-xl bg-[#1e293b] border border-slate-700/80 hover:border-slate-500 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <Truck className="w-5 h-5 text-amber-500" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="font-bold text-slate-100 text-sm">Highway Connectivity Status</h4>
          <p className="text-xs text-slate-400">Track blockages on NH-27, NH-10, NH-29 & Tawang Hwy</p>
        </div>

        {/* AI Geotechnical Shortcut */}
        <div
          onClick={() => onNavigate('ai')}
          className="p-4 rounded-xl bg-[#1e293b] border border-slate-700/80 hover:border-slate-500 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <Activity className="w-5 h-5 text-emerald-400" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="font-bold text-slate-100 text-sm">Slope Physics & FoS Engine</h4>
          <p className="text-xs text-slate-400">Interactive 2D mountain shear stress simulation</p>
        </div>

        {/* Helplines Shortcut */}
        <div
          onClick={() => onNavigate('helpline')}
          className="p-4 rounded-xl bg-[#1e293b] border border-slate-700/80 hover:border-slate-500 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <PhoneCall className="w-5 h-5 text-rose-400" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="font-bold text-slate-100 text-sm">SDMA & NDRF Helplines</h4>
          <p className="text-xs text-slate-400">Direct 24x7 helpline contacts for all 8 NER states</p>
        </div>
      </div>
    </div>
  );
}
