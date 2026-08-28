import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Sliders, RefreshCw, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { calculateAiLandslideRisk } from '../utils/aiRiskEngine';
import { useLanguage } from '../context/LanguageContext';

export default function AiPredictorModal({ isOpen, onClose, onApplyPrediction }) {
  const { t } = useLanguage();

  const [rainfall24h, setRainfall24h] = useState(185);
  const [soilMoisture, setSoilMoisture] = useState(88);
  const [slopeAngle, setSlopeAngle] = useState(48);
  const [insarDeformation, setInsarDeformation] = useState(14);
  const [seismicVibration, setSeismicVibration] = useState(0.18);

  if (!isOpen) return null;

  const currentResult = calculateAiLandslideRisk({
    rainfall24h,
    soilMoisture,
    slopeAngle,
    insarDeformation,
    seismicVibration
  });

  const handleApply = () => {
    if (onApplyPrediction) {
      onApplyPrediction(currentResult);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#121b2d] border border-[#1e2c45] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#0a0f1d]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-100 text-base md:text-lg">{t('aiPredictionTitle')}</h3>
                <p className="text-xs text-slate-400">{t('aiPredictorDesc')}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 overflow-y-auto space-y-5">
            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rainfall Slider */}
              <div className="bg-[#0a0f1d] p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{t('rainfall')}</span>
                  <span className="text-cyan-400 font-bold">{rainfall24h} mm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="350"
                  value={rainfall24h}
                  onChange={(e) => setRainfall24h(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Soil Moisture Slider */}
              <div className="bg-[#0a0f1d] p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{t('soilMoisture')}</span>
                  <span className="text-amber-400 font-bold">{soilMoisture}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={soilMoisture}
                  onChange={(e) => setSoilMoisture(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slope Angle Slider */}
              <div className="bg-[#0a0f1d] p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{t('slopeAngle')}</span>
                  <span className="text-rose-400 font-bold">{slopeAngle}°</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="75"
                  value={slopeAngle}
                  onChange={(e) => setSlopeAngle(Number(e.target.value))}
                  className="w-full accent-rose-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Satellite InSAR Deformation */}
              <div className="bg-[#0a0f1d] p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{t('insarDeformation')}</span>
                  <span className="text-purple-400 font-bold">{insarDeformation} mm/yr</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={insarDeformation}
                  onChange={(e) => setInsarDeformation(Number(e.target.value))}
                  className="w-full accent-purple-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Simulated Result Card */}
            <div className="p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4" style={{ backgroundColor: `${currentResult.color}10`, borderColor: `${currentResult.color}40` }}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full text-white" style={{ backgroundColor: currentResult.color }}>
                  {currentResult.riskLevel === 'CRITICAL' ? <AlertTriangle className="w-6 h-6 animate-bounce" /> : <ShieldCheck className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Simulated AI Status</span>
                  <h4 className="font-extrabold text-base md:text-lg text-slate-100" style={{ color: currentResult.color }}>
                    {t(currentResult.statusTextKey)}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-4 text-center">
                <div className="bg-[#0a0f1d] px-4 py-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{t('riskIndex')}</span>
                  <span className="text-lg font-black text-slate-100">{currentResult.lhiScore}%</span>
                </div>
                <div className="bg-[#0a0f1d] px-4 py-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{t('factorOfSafety')}</span>
                  <span className="text-lg font-black text-cyan-400">{currentResult.factorOfSafety}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-slate-800 bg-[#0a0f1d] flex items-center justify-between">
            <button
              onClick={() => {
                setRainfall24h(120);
                setSoilMoisture(75);
                setSlopeAngle(40);
                setInsarDeformation(8);
              }}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-800 hover:bg-slate-800"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
            </button>

            <button
              onClick={handleApply}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-black text-xs md:text-sm hover:brightness-110 shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Zap className="w-4 h-4" /> Apply AI Prediction Model
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
