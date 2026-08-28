import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Cpu, Radio, Truck, Camera, ArrowRight, Zap, MapPin, Activity, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { nerStatesData, sampleCitizenReports } from '../data/nerDistricts';

export default function HomePage({ onNavigate, aiResult, activeStateId, setActiveStateId, isOfficialMode }) {
  const { t } = useLanguage();
  const activeState = nerStatesData.find((s) => s.id === activeStateId) || nerStatesData[0];

  return (
    <div className="space-y-6">
      {/* State Selector Tabs */}
      <div className="bg-[#121b2d]/90 backdrop-blur-md border border-[#1e2c45] p-3 rounded-2xl flex items-center gap-2 overflow-x-auto scrollbar-none shadow-xl">
        <span className="text-xs font-bold text-slate-400 px-2 flex-shrink-0">NER State Filter:</span>
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

      {/* Hero Overview Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* State Summary Card */}
        <div className="bg-[#121b2d]/90 border border-[#1e2c45] p-5 rounded-2xl shadow-xl space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Region</span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold animate-pulse">
              {activeState.overallRisk} HAZARD
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-100">{activeState.name}</h2>
            <p className="text-xs text-slate-400 mt-1">Capital: {activeState.capital} | Active IoT Nodes: {activeState.activeSensorsCount}</p>
          </div>
          <button
            onClick={() => onNavigate('map')}
            className="w-full py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs hover:bg-cyan-500/20 flex items-center justify-center gap-2"
          >
            <Radio className="w-4 h-4" /> Open Full GIS Map <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live AI Risk Index Card */}
        <div className="bg-[#121b2d]/90 border border-[#1e2c45] p-5 rounded-2xl shadow-xl space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Geotechnical Score</span>
            <span className="text-xs font-bold text-cyan-400">FoS: {aiResult.factorOfSafety}</span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-100">{aiResult.lhiScore}%</span>
              <span className="text-xs font-bold" style={{ color: aiResult.color }}>{aiResult.riskLevel} LHI</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Calculated via Mohr-Coulomb shear stress model</p>
          </div>
          <button
            onClick={() => onNavigate('ai')}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs hover:brightness-110 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4" /> Launch AI Risk Simulator <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Emergency Field Action Card */}
        <div className="bg-[#121b2d]/90 border border-[#1e2c45] p-5 rounded-2xl shadow-xl space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Field Crowdsourcing</span>
            <span className="text-xs font-bold text-emerald-400">Zero-Auth Active</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Report Mountain Incident</h3>
            <p className="text-xs text-slate-400 mt-1">Geo-tagged photo upload for cracks & blocked roads</p>
          </div>
          <button
            onClick={() => onNavigate('reports')}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold text-xs hover:brightness-110 shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" /> Submit Geo-Tagged Report <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Feature Cards Grid Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Highways Shortcut */}
        <div
          onClick={() => onNavigate('highways')}
          className="p-4 rounded-2xl bg-[#121b2d] border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <Truck className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="font-bold text-slate-100 text-sm">Highway Connectivity Status</h4>
          <p className="text-xs text-slate-400">Track blockages on NH-27, NH-10, NH-29 & Tawang Hwy</p>
        </div>

        {/* AI Geotechnical Page Shortcut */}
        <div
          onClick={() => onNavigate('ai')}
          className="p-4 rounded-2xl bg-[#121b2d] border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <Activity className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="font-bold text-slate-100 text-sm">Slope Physics & FoS Engine</h4>
          <p className="text-xs text-slate-400">Interactive 2D mountain shear stress simulation</p>
        </div>

        {/* Helplines Shortcut */}
        <div
          onClick={() => onNavigate('helpline')}
          className="p-4 rounded-2xl bg-[#121b2d] border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <PhoneCall className="w-6 h-6 text-rose-400 group-hover:scale-110 transition-transform" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="font-bold text-slate-100 text-sm">SDMA & NDRF Helplines</h4>
          <p className="text-xs text-slate-400">Direct 24x7 helpline contacts for all 8 NER states</p>
        </div>
      </div>
    </div>
  );
}
