import React, { useState } from 'react';
import FieldReportForm from '../components/FieldReportForm';
import { Camera, MapPin, Radio, Plus, CheckCircle2, ShieldAlert } from 'lucide-react';
import { sampleCitizenReports } from '../data/nerDistricts';
import { getOfflineReports } from '../utils/offlineStorage';

export default function ReportsPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reports, setReports] = useState(() => [
    ...getOfflineReports(),
    ...sampleCitizenReports
  ]);

  const handleNewReport = (newRep) => {
    setReports((prev) => [newRep, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#121b2d]/90 p-4 rounded-2xl border border-[#1e2c45] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Camera className="w-6 h-6 text-rose-400" />
            Crowdsourced Citizen & Field Officer Hazard Feeds
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Zero-Auth public reporting platform with automatic GPS geo-tagging and offline sync
          </p>
        </div>

        <button
          onClick={() => setIsReportModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 font-bold text-white text-xs hover:brightness-110 shadow-lg shadow-rose-500/20 flex items-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Submit Geo-Tagged Report
        </button>
      </div>

      {/* Reports Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((rep) => (
          <div key={rep.id} className="bg-[#121b2d]/90 border border-[#1e2c45] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              <img src={rep.photoUrl} alt={rep.category} className="w-full h-full object-cover" />
              <span className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase shadow-md ${
                rep.severity === 'CRITICAL' ? 'bg-rose-500 text-white' : rep.severity === 'HIGH' ? 'bg-amber-500 text-black' : 'bg-blue-500 text-white'
              }`}>
                {rep.severity}
              </span>
              <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md text-[10px] text-cyan-400 px-2 py-0.5 rounded-md font-mono">
                📍 {rep.location}
              </span>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between text-xs">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-1 text-[11px]">
                  <span className="font-semibold text-slate-200">{rep.category}</span>
                  <span>{rep.timestamp}</span>
                </div>
                <p className="text-slate-300 line-clamp-3">{rep.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
                <span>Reporter: {rep.author || 'Citizen User'}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> GPS Verified
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FieldReportForm
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReportSubmitted={handleNewReport}
      />
    </div>
  );
}
