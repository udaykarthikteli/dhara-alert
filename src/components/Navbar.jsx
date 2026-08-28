import React, { useState } from 'react';
import { Globe, ShieldAlert, Mountain } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({
  isOfficialMode,
  setIsOfficialMode,
  onOpenAiPredictor,
  onOpenReportForm,
  onOpenEmergencyContacts,
  onOpenHome,
  currentPage = 'home',
  onNavigatePage
}) {
  const { langCode, setLangCode, languages, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const activeLangObj = languages.find((l) => l.code === langCode) || languages[0];

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'map', label: 'GIS Map' },
    { id: 'ai', label: 'AI Simulator' },
    { id: 'highways', label: 'Highways' },
    { id: 'reports', label: 'Field Reports' },
    { id: 'helpline', label: 'Helplines' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1e293b] border-b border-slate-700/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Logo & Title with uploaded logo icon */}
        <div
          onClick={onOpenHome}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="Return to Home Landing Screen"
        >
          <img src="/logo.png" alt="Dhara Alert Logo" className="h-9 w-auto object-contain" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-slate-100 text-base md:text-lg tracking-tight group-hover:text-emerald-400 transition-colors">
                {t('appTitle')}
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                NER AI v2.0
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden md:block">Smarter Warnings. Safer Hills.</p>
          </div>
        </div>

        {/* Page Nav Links (Desktop) */}
        {onNavigatePage && (
          <div className="hidden lg:flex items-center gap-1 bg-[#0f172a] p-1 rounded-lg border border-slate-700/80 text-xs">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigatePage(item.id)}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  currentPage === item.id
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Mode Toggle Pill */}
          <button
            onClick={() => setIsOfficialMode(!isOfficialMode)}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              isOfficialMode
                ? 'bg-amber-950/60 text-amber-300 border-amber-800/80'
                : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            {isOfficialMode ? t('officialMode') : t('noLoginBadge')}
          </button>

          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0f172a] border border-slate-700 text-xs font-semibold text-slate-200 hover:border-slate-500 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeLangObj.native}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 py-1">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLangCode(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      langCode === l.code ? 'text-emerald-400 font-bold bg-emerald-950/40' : 'text-slate-300'
                    }`}
                  >
                    <span>{l.native} ({l.name})</span>
                    <span className="text-[10px] text-slate-500">{l.region.split('/')[0]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Field Report Action */}
          <button
            onClick={onOpenReportForm}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-700 text-white text-xs font-semibold hover:bg-rose-600 transition-all shadow-sm"
          >
            <span className="hidden sm:inline">Submit Field Report</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </div>
    </header>
  );
}
