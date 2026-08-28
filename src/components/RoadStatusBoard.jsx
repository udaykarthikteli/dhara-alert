import React from 'react';
import { Truck, AlertCircle, CheckCircle, AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { nerStatesData } from '../data/nerDistricts';

export default function RoadStatusBoard() {
  const { t } = useLanguage();

  // Aggregate all highways from states
  const allHighways = nerStatesData.flatMap((s) => s.vulnerableHighways.map((h) => ({ ...h, stateName: s.name })));

  return (
    <div className="bg-[#121b2d]/90 border border-[#1e2c45] rounded-2xl p-4 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm md:text-base">{t('roadStatusTitle')}</h3>
            <p className="text-xs text-slate-400">Real-time status of critical NER transit corridors</p>
          </div>
        </div>
        <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 font-mono">
          {allHighways.length} Highways Monitored
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {allHighways.map((h) => {
          const isBlocked = h.status === 'BLOCKED';
          const isCaution = h.status === 'CAUTION';

          return (
            <div
              key={h.id}
              className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                isBlocked
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                  : isCaution
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{h.stateName}</span>
                  <h4 className="font-bold text-slate-100 text-xs md:text-sm mt-0.5">{h.name}</h4>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase border ${
                    isBlocked
                      ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                      : isCaution
                      ? 'bg-amber-500 text-black border-amber-400'
                      : 'bg-emerald-500 text-black border-emerald-400'
                  }`}
                >
                  {h.status}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-2 flex items-center gap-1.5">
                {isBlocked ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                ) : isCaution ? (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                )}
                {h.condition}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
