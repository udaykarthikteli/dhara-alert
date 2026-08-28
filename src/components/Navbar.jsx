import React, { useState } from 'react';
import { Mountain, Globe, Cpu, Camera, Phone, ShieldAlert, Zap, Radio } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({
  isOfficialMode,
  setIsOfficialMode,
  onOpenAiPredictor,
  onOpenReportForm,
  onOpenEmergencyContacts,
  onOpenHome
}) {
  const { langCode, setLangCode, languages, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const activeLangObj = languages.find((l) => l.code === langCode) || languages[0];

  return (
    <header className="sticky top-0 z-40 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-[#1e2c45] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div
          onClick={onOpenHome}
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to Home Landing Screen"
        >
          <div className="p-2.5 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20 text-black group-hover:scale-105 transition-transform">
            <Mountain className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-slate-100 text-base md:text-xl tracking-tight group-hover:text-cyan-400 transition-colors">
                {t('appTitle')}
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                NER AI v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">{t('subtitle')}</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Mode Toggle Pill */}
          <button
            onClick={() => setIsOfficialMode(!isOfficialMode)}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isOfficialMode
                ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            {isOfficialMode ? t('officialMode') : t('noLoginBadge')}
          </button>

          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#121b2d] border border-[#1e2c45] text-xs font-semibold text-slate-200 hover:border-cyan-500/50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{activeLangObj.native}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#121b2d] border border-[#1e2c45] rounded-xl shadow-2xl overflow-hidden z-50 py-1">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLangCode(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      langCode === l.code ? 'text-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-300'
                    }`}
                  >
                    <span>{l.native} ({l.name})</span>
                    <span className="text-[10px] text-slate-500">{l.region.split('/')[0]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Simulator Action */}
          <button
            onClick={onOpenAiPredictor}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-all"
          >
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>AI Predictor</span>
          </button>

          {/* Field Report Action */}
          <button
            onClick={onOpenReportForm}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs font-bold shadow-lg shadow-rose-500/20 hover:brightness-110 transition-all"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Submit Field Report</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </div>
    </header>
  );
}
