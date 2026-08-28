import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, MapPin, Radio, ArrowRight, Activity, CheckCircle2, Globe, Mountain } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LandingPage({ onStartDashboard }) {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center px-4 py-8 z-10 text-center max-w-5xl mx-auto">
      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2 pt-2"
      >
        <span className="px-3.5 py-1 rounded-full bg-[#1e293b] border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Smart India Hackathon (SIH Problem Statement 26001)
        </span>
        <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 text-xs font-semibold">
          Zero-Auth Public Access
        </span>
      </motion.div>

      {/* Main Hero Section with Uploaded Logo Image */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="my-auto py-8 space-y-6 flex flex-col items-center"
      >
        {/* Official Uploaded Logo Image */}
        <div className="cursor-pointer transition-transform hover:scale-105" onClick={onStartDashboard}>
          <img
            src="/logo.png"
            alt="Dhara Alert Logo"
            className="w-56 md:w-72 max-h-72 object-contain drop-shadow-xl mx-auto"
          />
        </div>

        {/* Title & Tagline */}
        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 uppercase">
            DHARA ALERT
          </h1>
          <p className="text-xs md:text-sm font-semibold tracking-widest text-emerald-400 uppercase">
            Smarter Warnings. Safer Hills.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs font-extrabold tracking-widest text-slate-300 uppercase py-1">
            <span className="text-emerald-400">PREDICT</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-500">PREVENT</span>
            <span className="text-slate-600">•</span>
            <span className="text-sky-400">PROTECT</span>
          </div>
          <p className="text-xs md:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto pt-1">
            AI-Powered Real-Time Landslide Early Warning & GIS Hazard Monitoring System for the <span className="text-emerald-400 font-semibold">North Eastern Region (NER)</span>
          </p>
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStartDashboard}
          className="mt-4 px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 font-bold text-white text-sm md:text-base tracking-wide shadow-md flex items-center gap-2.5 transition-all cursor-pointer group"
        >
          <Mountain className="w-5 h-5 text-emerald-200" />
          <span>START SYSTEM DASHBOARD</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl pt-6 text-left text-xs">
          <div className="p-3.5 rounded-xl bg-[#1e293b] border border-slate-700/80 space-y-1">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-slate-200">AI Risk Physics Engine</h4>
            <p className="text-[11px] text-slate-400">Live Mohr-Coulomb FoS calculation</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1e293b] border border-slate-700/80 space-y-1">
            <Radio className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-slate-200">GIS Map Telemetry</h4>
            <p className="text-[11px] text-slate-400">8 North Eastern States covered</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1e293b] border border-slate-700/80 space-y-1">
            <Globe className="w-4 h-4 text-sky-400" />
            <h4 className="font-bold text-slate-200">8 NER Languages</h4>
            <p className="text-[11px] text-slate-400">Assamese, Khasi, Mizo, Manipuri...</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1e293b] border border-slate-700/80 space-y-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-slate-200">Zero-Auth Access</h4>
            <p className="text-[11px] text-slate-400">No login required for citizens</p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="text-xs text-slate-500 pt-2">
        National Disaster Early Warning Platform | North Eastern Region | © 2026 Dhara Alert
      </div>
    </div>
  );
}
