import React, { useState } from 'react';
import { AlertTriangle, Bell, Volume2, ShieldAlert, CheckCircle2, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LiveAlertsBanner({ activeRiskLevel = 'HIGH', onTriggerSos }) {
  const { t } = useLanguage();
  const [sosSent, setSosSent] = useState(false);

  const handleSosClick = () => {
    setSosSent(true);
    if (onTriggerSos) onTriggerSos();
    setTimeout(() => setSosSent(false), 5000);
  };

  return (
    <div className="space-y-3">
      {/* Dynamic Emergency Warning Ticker */}
      <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2.5 bg-rose-500/20 rounded-xl text-rose-400 flex-shrink-0 animate-pulse">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-extrabold text-rose-400 block uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Live Emergency Ticker - North Eastern Region
            </span>
            <p className="text-slate-200 mt-0.5 line-clamp-2">{t('emergencyAlert')}</p>
          </div>
        </div>

        <button
          onClick={handleSosClick}
          className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 flex-shrink-0 shadow-lg ${
            sosSent
              ? 'bg-emerald-500 text-black shadow-emerald-500/20'
              : 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-rose-500/30 hover:brightness-110 animate-pulse'
          }`}
        >
          {sosSent ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> SOS Broadcast Sent!
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" /> {t('sosBtn')}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
