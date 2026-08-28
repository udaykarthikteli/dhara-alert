import React from 'react';
import GisRiskMap from '../components/GisRiskMap';
import { nerStatesData } from '../data/nerDistricts';

export default function GisMapPage({ activeStateId, setActiveStateId }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1e293b] p-3 rounded-xl border border-slate-700/80">
        <div>
          <h2 className="text-base font-bold text-slate-100">Interactive GIS Hazard & Sensor Telemetry Map</h2>
          <p className="text-xs text-slate-400">Live spatial indexing for 8 North Eastern States</p>
        </div>

        {/* State Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {nerStatesData.map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStateId(st.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeStateId === st.id
                  ? 'bg-emerald-700 text-white font-bold'
                  : 'bg-[#0f172a] text-slate-400 border border-slate-800'
              }`}
            >
              {st.name}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[620px]">
        <GisRiskMap activeStateId={activeStateId} />
      </div>
    </div>
  );
}
