import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, ShieldAlert, Cpu, MapPin, Radio, ArrowRight, Activity, Zap, CheckCircle2, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LandingPage({ onStartDashboard }) {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center px-4 py-8 z-10 text-center max-w-6xl mx-auto">
      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-2 pt-4"
      >
        <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          Smart India Hackathon (SIH Problem Statement 26001)
        </span>
        <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
          Zero-Auth Public Access
        </span>
      </motion.div>

      {/* Main Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="my-auto py-10 space-y-6 flex flex-col items-center"
      >
        {/* Animated Custom Logo Emblem */}
        <div className="relative group cursor-pointer" onClick={onStartDashboard}>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-rose-500 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <div className="relative w-28 h-28 md:w-36 md:h-36 bg-[#121b2d] border-2 border-cyan-500/40 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
            {/* Background Radar Animation Grid */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:12px_12px]" />
            <Mountain className="w-16 h-16 md:w-20 md:h-20 text-cyan-400 relative z-10 stroke-[2] drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]" />
            <ShieldAlert className="w-8 h-8 text-rose-500 absolute bottom-3 right-3 z-20 animate-pulse" />
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-3 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-100 uppercase">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-rose-400 bg-clip-text text-transparent drop-shadow-md">
              DHARA ALERT
            </span>
          </h1>
          <p className="text-sm md:text-lg text-slate-300 font-medium leading-relaxed">
            AI-Powered Real-Time Landslide Early Warning & GIS Hazard Monitoring System for the <span className="text-cyan-400 font-bold">North Eastern Region (NER)</span>
          </p>
        </div>

        {/* Action Button: START DASHBOARD */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartDashboard}
          className="mt-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 font-black text-black text-base md:text-lg tracking-wide shadow-2xl shadow-cyan-500/40 hover:brightness-110 flex items-center gap-3 transition-all cursor-pointer group"
        >
          <Zap className="w-6 h-6 fill-black" />
          <span>START SYSTEM DASHBOARD</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
        </motion.button>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl pt-8 text-left text-xs">
          <div className="p-3.5 rounded-2xl bg-[#121b2d]/80 border border-[#1e2c45] space-y-1 backdrop-blur-md">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h4 className="font-bold text-slate-200">AI Risk Physics Engine</h4>
            <p className="text-[11px] text-slate-400">Live Mohr-Coulomb FoS calculation</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#121b2d]/80 border border-[#1e2c45] space-y-1 backdrop-blur-md">
            <Radio className="w-5 h-5 text-rose-400" />
            <h4 className="font-bold text-slate-200">GIS Map Telemetry</h4>
            <p className="text-[11px] text-slate-400">8 North Eastern States covered</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#121b2d]/80 border border-[#1e2c45] space-y-1 backdrop-blur-md">
            <Globe className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-slate-200">8 NER Languages</h4>
            <p className="text-[11px] text-slate-400">Assamese, Khasi, Mizo, Manipuri...</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#121b2d]/80 border border-[#1e2c45] space-y-1 backdrop-blur-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-slate-200">Zero-Auth Access</h4>
            <p className="text-[11px] text-slate-400">No login required for citizens</p>
          </div>
        </div>
      </motion.div>

      {/* Footer info */}
      <div className="text-xs text-slate-500 pt-4">
        Deployable on Vercel | PWA Offline Capability Enabled | © 2026 Dhara Alert NER
      </div>
    </div>
  );
}
