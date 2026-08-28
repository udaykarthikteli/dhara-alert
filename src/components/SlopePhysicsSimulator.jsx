import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SlopePhysicsSimulator({ aiResult }) {
  const { t } = useLanguage();
  const { factorOfSafety, lhiScore, riskLevel, color, resistingStrength, shearStress, porePressure } = aiResult;

  const isFailing = factorOfSafety < 1.0;

  // Natural Earth status colors
  const statusBadgeBg = isFailing ? '#b91c1c' : factorOfSafety < 1.3 ? '#d97706' : '#15803d';

  return (
    <div className="bg-[#1e293b] border border-slate-700/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-800 rounded-lg text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Geological Slope Physics Visualizer</h3>
            <p className="text-[11px] text-slate-400">Mohr-Coulomb Shear Stress vs Pore Pressure</p>
          </div>
        </div>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-md text-white flex items-center gap-1.5 shadow-sm"
          style={{ backgroundColor: statusBadgeBg }}
        >
          FoS: {factorOfSafety}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* 2D Hill Cross Section SVG Animation */}
        <div className="lg:col-span-7 relative bg-[#0f172a] rounded-lg p-3 border border-slate-800 h-60 flex flex-col justify-between overflow-hidden">
          <div className="absolute top-2 left-3 z-10 flex items-center gap-1.5 text-xs text-slate-400">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cross-Section Failure Plane</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 500 240">
            {/* Stable Bedrock Layer */}
            <path d="M 0,240 L 0,180 L 150,180 L 380,80 L 500,80 L 500,240 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />

            {/* Failure Slip Surface Curve */}
            <path
              d="M 120,180 Q 250,170 380,80"
              fill="none"
              stroke={isFailing ? "#dc2626" : "#2563eb"}
              strokeWidth="2"
              strokeDasharray={isFailing ? "4,4" : "none"}
            />

            {/* Unstable Soil Slope Block */}
            <motion.path
              d="M 120,180 Q 250,150 380,80 L 450,80 L 220,200 Z"
              fill="#334155"
              stroke="#475569"
              strokeWidth="1.5"
              animate={isFailing ? { x: [0, 4, 8], y: [0, 3, 6] } : { x: 0, y: 0 }}
              transition={{ repeat: isFailing ? Infinity : 0, duration: 1.5, repeatType: "reverse" }}
            />

            {/* Pore Pressure Water Table Animation */}
            <line x1="120" y1="175" x2="380" y2="90" stroke="#0284c7" strokeWidth="1.5" opacity="0.7" strokeDasharray="3,3" />

            {/* Force Vectors */}
            <g className="text-xs">
              {/* Shear Stress Vector (Driving) */}
              <line x1="280" y1="120" x2="325" y2="102" stroke="#dc2626" strokeWidth="2.5" />
              <text x="330" y="100" fill="#f87171" fontSize="10" fontWeight="bold">τ (Driving) {shearStress} kPa</text>

              {/* Resisting Strength Vector */}
              <line x1="280" y1="120" x2="235" y2="138" stroke="#16a34a" strokeWidth="2.5" />
              <text x="165" y="150" fill="#4ade80" fontSize="10" fontWeight="bold">s (Strength) {resistingStrength} kPa</text>
            </g>
          </svg>

          {isFailing && (
            <div className="absolute bottom-2 right-2 bg-red-700 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
              SHEAR FAILURE ACTIVE
            </div>
          )}
        </div>

        {/* Telemetry Metrics */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="bg-[#0f172a] p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">{t('riskIndex')}</span>
            <div className="text-right">
              <span className="text-lg font-bold text-slate-100">{lhiScore}%</span>
              <div className="w-24 bg-slate-800 h-2 rounded-full mt-1 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${lhiScore}%`, backgroundColor: statusBadgeBg }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Pore Water Press (u)</span>
              <span className="text-xs font-bold text-sky-400">{porePressure} kPa</span>
            </div>
            <div className="bg-[#0f172a] p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Shear Stress (τ)</span>
              <span className="text-xs font-bold text-rose-400">{shearStress} kPa</span>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-700/80 bg-[#0f172a] text-xs flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-500" />
            <div>
              <div className="font-bold text-slate-100">
                {t(aiResult.statusTextKey)}
              </div>
              <div className="text-slate-400 mt-0.5 text-[11px]">
                Recommended Evacuation Radius: <span className="text-slate-200 font-semibold">{aiResult.evacuationRadiusKm} km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
