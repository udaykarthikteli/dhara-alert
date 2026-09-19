import React, { useState, useEffect } from 'react';
import FieldReportForm from '../components/FieldReportForm';
import { Camera, MapPin, Plus, CheckCircle2, FileText, Download, Filter, Search, ShieldAlert, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { sampleCitizenReports } from '../data/nerDistricts';
import { getOfflineReports } from '../utils/offlineStorage';
import { exportIncidentCsv, exportIncidentPdf } from '../utils/reportExporter';

const NER_STATES = [
  { id: 'ALL', name: 'All North-East States' },
  { id: 'Meghalaya', name: 'Meghalaya' },
  { id: 'Assam', name: 'Assam' },
  { id: 'Sikkim', name: 'Sikkim' },
  { id: 'Arunachal Pradesh', name: 'Arunachal Pradesh' },
  { id: 'Mizoram', name: 'Mizoram' },
  { id: 'Nagaland', name: 'Nagaland' },
  { id: 'Manipur', name: 'Manipur' },
  { id: 'Tripura', name: 'Tripura' }
];

export default function ReportsPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [reports, setReports] = useState(() => [
    ...getOfflineReports(),
    ...sampleCitizenReports
  ]);

  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail) {
        setReports([...e.detail, ...sampleCitizenReports]);
      }
    };
    window.addEventListener('dhara_offline_reports_updated', handleSync);
    return () => window.removeEventListener('dhara_offline_reports_updated', handleSync);
  }, []);

  const handleNewReport = (newRep) => {
    setReports((prev) => [newRep, ...prev]);
  };

  // Filtered reports
  const filteredReports = reports.filter((rep) => {
    const matchesState = selectedState === 'ALL' || (rep.state && rep.state.toLowerCase() === selectedState.toLowerCase()) || (rep.location && rep.location.toLowerCase().includes(selectedState.toLowerCase()));
    const matchesSeverity = selectedSeverity === 'ALL' || rep.severity === selectedSeverity;
    const matchesSearch = searchQuery === '' || 
      rep.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.category?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesState && matchesSeverity && matchesSearch;
  });

  const criticalCount = filteredReports.filter(r => r.severity === 'CRITICAL').length;
  const highCount = filteredReports.filter(r => r.severity === 'HIGH').length;

  return (
    <div className="space-y-6">
      {/* Top Banner Header with Actions */}
      <div className="bg-[#121b2d]/90 p-4 rounded-2xl border border-[#1e2c45] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Camera className="w-6 h-6 text-rose-400" />
            Crowdsourced Citizen & Field Officer Hazard Feeds
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time geotagged hazard registry with automated PDF/CSV SITREP exports and offline sync
          </p>
        </div>

        {/* Action Export Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => exportIncidentCsv(filteredReports, { state: selectedState })}
            className="px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            title="Download CSV Incident Sheet"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => exportIncidentPdf(filteredReports, { state: selectedState })}
            className="px-3 py-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs flex items-center gap-1.5 transition shadow-sm"
            title="Generate Official Disaster Situational Assessment Report (PDF)"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Official PDF SITREP</span>
          </button>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 font-bold text-white text-xs hover:brightness-110 shadow-lg shadow-rose-500/25 flex items-center gap-2 flex-shrink-0"
          >
            <Plus className="w-4 h-4" /> Submit Report
          </button>
        </div>
      </div>

      {/* Filter & Metric Summary Toolbar */}
      <div className="bg-[#0f172a]/95 p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* State Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer text-xs"
            >
              {NER_STATES.map((s) => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200">
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-700">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer text-xs"
            >
              <option value="ALL" className="bg-slate-900">All Threat Levels</option>
              <option value="CRITICAL" className="bg-slate-900 text-rose-400">Critical Only</option>
              <option value="HIGH" className="bg-slate-900 text-amber-400">High Only</option>
              <option value="MODERATE" className="bg-slate-900 text-blue-400">Moderate Only</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-700 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search location or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-slate-200 outline-none placeholder:text-slate-500 text-xs w-full"
            />
          </div>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          <span>Showing: <strong className="text-white">{filteredReports.length}</strong> incidents</span>
          {criticalCount > 0 && (
            <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              {criticalCount} Critical
            </span>
          )}
          {highCount > 0 && (
            <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {highCount} High
            </span>
          )}
        </div>
      </div>

      {/* Reports Cards Grid */}
      {filteredReports.length === 0 ? (
        <div className="bg-[#121b2d]/60 border border-slate-800 rounded-2xl p-12 text-center space-y-2">
          <ShieldAlert className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">No incident reports match your filter criteria</h3>
          <p className="text-xs text-slate-500">Try selecting a different state or clear your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map((rep) => (
            <div key={rep.id} className="bg-[#121b2d]/90 border border-[#1e2c45] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-slate-700 transition">
              <div className="relative h-44 bg-slate-900 overflow-hidden">
                <img src={rep.photoUrl} alt={rep.category} className="w-full h-full object-cover" />
                <span className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase shadow-md ${
                  rep.severity === 'CRITICAL' ? 'bg-rose-500 text-white' : rep.severity === 'HIGH' ? 'bg-amber-500 text-black' : 'bg-blue-500 text-white'
                }`}>
                  {rep.severity || 'MODERATE'}
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
                  <span>Reporter: {rep.author || 'Citizen Volunteer'}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> GPS Verified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <FieldReportForm
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReportSubmitted={handleNewReport}
      />
    </div>
  );
}

