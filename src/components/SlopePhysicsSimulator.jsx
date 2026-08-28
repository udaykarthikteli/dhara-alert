import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Zap, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SlopePhysicsSimulator({ aiResult }) {
  const { t } = useLanguage();
  const { factorOfSafety, lhiScore, riskLevel, color, resistingStrength, shearStress, porePressure } = aiResult;

  const isFailing = factorOfSafety < 1.0;

  return (
    <div className="bg-[#121b2d]/90 backdrop-blur-md border border-[#1e2c45] rounded-2xl p-5 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm md:text-base">Geological Slope Physics Visualizer</h3>
            <p className="text-xs text-slate-400">Mohr-Coulomb Shear Stress vs Pore Pressure</p>
          </div>
        </div>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5"
          style={{ backgroundColor: `${color}15`, color: color, borderColor: `${color}40` }}
        >
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: color }} />
          FoS: {factorOfSafety}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* 2D Hill Cross Section SVG Animation */}
        <div className="lg:col-span-7 relative bg-[#0a0f1d] rounded-xl p-4 border border-slate-800 h-64 flex flex-col justify-between overflow-hidden">
          <div className="absolute top-2 left-3 z-10 flex items-center gap-2 text-xs text-slate-400">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Cross-Section Failure Plane</span>
          </div>

          <svg className="w-full h-full" viewBox="0 0 500 240">
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d1527" />
                <stop offset="100%" stopColor="#0a0f1d" />
              </linearGradient>
              <linearGradient id="soilGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2d3748" />
                <stop offset="100%" stopColor="#1a202c" />
              </linearGradient>
              <linearGradient id="failGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Background Grid */}
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e2c45" strokeWidth="0.5" />
            </pattern>
            <rect width="500" height="240" fill="url(#grid)" />

            {/* Stable Bedrock Layer */}
            <path d="M 0,240 L 0,180 L 150,180 L 380,80 L 500,80 L 500,240 Z" fill="#141d2e" stroke="#253552" strokeWidth="2" />

            {/* Failure Slip Surface Curve */}
            <path
              d="M 120,180 Q 250,170 380,80"
              fill="none"
              stroke={isFailing ? "#ff2a5f" : "#00f0ff"}
              strokeWidth={isFailing ? "4" : "2"}
              strokeDasharray={isFailing ? "4,4" : "none"}
              className={isFailing ? "animate-pulse" : ""}
            />

            {/* Unstable Soil Slope Block */}
            <motion.path
              d="M 120,180 Q 250,150 380,80 L 450,80 L 220,200 Z"
              fill="url(#soilGrad)"
              stroke="#4a5568"
              strokeWidth="1.5"
              animate={isFailing ? { x: [0, 8, 15], y: [0, 5, 12], rotate: [0, 1, 2] } : { x: 0, y: 0, rotate: 0 }}
              transition={{ repeat: isFailing ? Infinity : 0, duration: 1.5, repeatType: "reverse" }}
            />

            {/* Pore Pressure Water Table Animation */}
            <line x1="120" y1="175" x2="380" y2="90" stroke="#00f0ff" strokeWidth="2" opacity="0.6" strokeDasharray="3,3" />

            {/* Force Vectors */}
            <g className="text-xs">
              {/* Shear Stress Vector (Driving) */}
              <line x1="280" y1="120" x2="330" y2="100" stroke="#ff2a5f" strokeWidth="3" markerEnd="url(#arrow)" />
              <text x="335" y="98" fill="#ff2a5f" fontSize="11" fontWeight="bold">τ (Driving) {shearStress} kPa</text>

              {/* Resisting Strength Vector */}
              <line x1="280" y1="120" x2="230" y2="140" stroke="#00e676" strokeWidth="3" />
              <text x="160" y="155" fill="#00e676" fontSize="11" fontWeight="bold">s (Strength) {resistingStrength} kPa</text>
            </g>
          </svg>

          {isFailing && (
            <div className="absolute bottom-2 right-2 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-md animate-bounce flex items-center gap-1 shadow-lg">
              <Zap className="w-3.5 h-3.5" />
              SHEAR FAILURE ACTIVE
            </div>
          )}
        </div>

        {/* Telemetry Metrics & FoS Radial Meter */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-[#0a0f1d] p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">{t('riskIndex')}</span>
            <div className="text-right">
              <span className="text-xl font-extrabold text-slate-100">{lhiScore}%</span>
              <div className="w-24 bg-slate-800 h-2 rounded-full mt-1 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${lhiScore}%`, backgroundColor: color }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#0a0f1d] p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-slate-500 block">Pore Water Press (u)</span>
              <span className="text-sm font-bold text-cyan-400">{porePressure} kPa</span>
            </div>
            <div className="bg-[#0a0f1d] p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-slate-500 block">Shear Stress (τ)</span>
              <span className="text-sm font-bold text-rose-400">{shearStress} kPa</span>
            </div>
          </div>

          <div className="p-3 rounded-xl border flex items-center gap-3 text-xs" style={{ backgroundColor: `${color}10`, borderColor: `${color}30` }}>
            <ShieldAlert className="w-5 h-5 flex-shrink-0" style={{ color }} />
            <div>
              <div className="font-bold text-slate-100" style={{ color }}>
                {t(aiResult.statusTextKey)}
              </div>
              <div className="text-slate-400 mt-0.5">
                Recommended Evacuation Radius: <span className="text-slate-200 font-semibold">{aiResult.evacuationRadiusKm} km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
