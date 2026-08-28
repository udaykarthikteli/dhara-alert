import React from 'react';
import GisRiskMap from '../components/GisRiskMap';
import { nerStatesData } from '../data/nerDistricts';

export default function GisMapPage({ activeStateId, setActiveStateId }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#121b2d]/90 p-3 rounded-2xl border border-[#1e2c45]">
        <div>
          <h2 className="text-lg font-bold text-slate-100">Interactive GIS Hazard & Sensor Telemetry Map</h2>
          <p className="text-xs text-slate-400">Live spatial indexing for 8 North Eastern States</p>
        </div>

        {/* State Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {nerStatesData.map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStateId(st.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activeStateId === st.id
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'bg-[#0a0f1d] text-slate-400 border border-slate-800'
              }`}
            >
              {st.name}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[650px]">
        <GisRiskMap activeStateId={activeStateId} />
      </div>
    </div>
  );
}
