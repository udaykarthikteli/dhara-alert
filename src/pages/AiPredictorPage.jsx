import React, { useState } from 'react';
import SlopePhysicsSimulator from '../components/SlopePhysicsSimulator';
import { calculateAiLandslideRisk } from '../utils/aiRiskEngine';
import { Cpu, Sliders, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AiPredictorPage({ aiResult, setAiResult }) {
  const { t } = useLanguage();

  const [rainfall24h, setRainfall24h] = useState(185);
  const [soilMoisture, setSoilMoisture] = useState(88);
  const [slopeAngle, setSlopeAngle] = useState(48);
  const [insarDeformation, setInsarDeformation] = useState(14);

  const handleSliderChange = (newRain, newMoisture, newSlope, newInsar) => {
    setRainfall24h(newRain);
    setSoilMoisture(newMoisture);
    setSlopeAngle(newSlope);
    setInsarDeformation(newInsar);

    const calculated = calculateAiLandslideRisk({
      rainfall24h: newRain,
      soilMoisture: newMoisture,
      slopeAngle: newSlope,
      insarDeformation: newInsar
    });
    setAiResult(calculated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#121b2d]/90 p-4 rounded-2xl border border-[#1e2c45] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
            AI Geotechnical Risk & FoS Neural Engine
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time Mohr-Coulomb Soil Mechanics Shear Strength & Factor of Safety Calculator
          </p>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
          AI Confidence: {aiResult.confidenceScore}%
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Controls Panel */}
        <div className="lg:col-span-5 bg-[#121b2d]/90 p-5 rounded-2xl border border-[#1e2c45] space-y-4 shadow-xl">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Environmental & Sensor Input Controls
          </h3>

          <div className="space-y-4 text-xs">
            {/* Rainfall Slider */}
            <div className="bg-[#0a0f1d] p-3 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">24h Cumulative Rainfall</span>
                <span className="text-cyan-400 font-bold">{rainfall24h} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="350"
                value={rainfall24h}
                onChange={(e) => handleSliderChange(Number(e.target.value), soilMoisture, slopeAngle, insarDeformation)}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Soil Moisture Slider */}
            <div className="bg-[#0a0f1d] p-3 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Soil Saturation Level</span>
                <span className="text-amber-400 font-bold">{soilMoisture}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={soilMoisture}
                onChange={(e) => handleSliderChange(rainfall24h, Number(e.target.value), slopeAngle, insarDeformation)}
                className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slope Angle Slider */}
            <div className="bg-[#0a0f1d] p-3 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Terrain Slope Inclination Angle</span>
                <span className="text-rose-400 font-bold">{slopeAngle}°</span>
              </div>
              <input
                type="range"
                min="15"
                max="75"
                value={slopeAngle}
                onChange={(e) => handleSliderChange(rainfall24h, soilMoisture, Number(e.target.value), insarDeformation)}
                className="w-full accent-rose-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Satellite InSAR Slider */}
            <div className="bg-[#0a0f1d] p-3 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-300">Satellite InSAR Deformation</span>
                <span className="text-purple-400 font-bold">{insarDeformation} mm/yr</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={insarDeformation}
                onChange={(e) => handleSliderChange(rainfall24h, soilMoisture, slopeAngle, Number(e.target.value))}
                className="w-full accent-purple-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 2D Physics Simulator Visualizer */}
        <div className="lg:col-span-7">
          <SlopePhysicsSimulator aiResult={aiResult} />
        </div>
      </div>
    </div>
  );
}
