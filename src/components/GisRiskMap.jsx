import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Radio, Layers } from 'lucide-react';
import { nerStatesData, sampleCitizenReports } from '../data/nerDistricts';
import { useLanguage } from '../context/LanguageContext';

export default function GisRiskMap({ activeStateId, onSelectHotspot }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Initialize once

    // Default center set to Shillong / NER region center
    const map = L.map(mapContainerRef.current, {
      center: [25.8, 92.5],
      zoom: 7,
      zoomControl: false
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    // Dark GIS Map Tiles (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 18,
      subdomains: 'abcd'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Render Markers for States & Hotspots
    nerStatesData.forEach((state) => {
      const circleColor = state.overallRisk === 'CRITICAL' ? '#b91c1c' : state.overallRisk === 'HIGH' ? '#d97706' : '#15803d';
      
      const stateCircle = L.circle(state.center, {
        color: circleColor,
        fillColor: circleColor,
        fillOpacity: 0.15,
        radius: 35000
      }).addTo(map);

      stateCircle.bindTooltip(`<b>${state.name}</b><br/>Overall Hazard Risk: ${state.riskScore}% (${state.overallRisk})`, {
        className: 'custom-leaflet-tooltip'
      });

      // Hotspot markers
      state.hotspots.forEach((hs) => {
        const markerColor = hs.risk === 'CRITICAL' ? '#b91c1c' : '#d97706';
        
        const customIcon = L.divIcon({
          className: 'custom-map-icon',
          html: `<div style="background-color: ${markerColor}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [14, 14]
        });

        const marker = L.marker([hs.lat, hs.lng], { icon: customIcon }).addTo(map);

        const popupContent = `
          <div style="font-family: sans-serif; padding: 4px; color: #f8fafc;">
            <h4 style="margin: 0; font-weight: 800; font-size: 13px; color: #f8fafc;">${hs.name}</h4>
            <div style="font-size: 11px; margin-top: 4px; color: #cbd5e1;">
              <b>State:</b> ${state.name}<br/>
              <b>Risk Level:</b> <span style="color: ${markerColor}; font-weight: bold;">${hs.risk} (${hs.riskScore}%)</span><br/>
              <b>Highway:</b> ${hs.road}<br/>
              <b>Rainfall:</b> ${hs.rainfall}<br/>
              <b>Soil Saturation:</b> ${hs.moisture}
            </div>
          </div>
        `;
        marker.bindPopup(popupContent);
      });
    });

    // Add Citizen Field Reports Markers
    sampleCitizenReports.forEach((rep) => {
      const repIcon = L.divIcon({
        className: 'citizen-report-icon',
        html: `<div style="background-color: #0284c7; width: 12px; height: 12px; border-radius: 2px; border: 2px solid white; transform: rotate(45deg);"></div>`,
        iconSize: [12, 12]
      });

      const reportMarker = L.marker([rep.lat, rep.lng], { icon: repIcon }).addTo(map);
      reportMarker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px; color: #f8fafc;">
          <span style="font-size: 9px; background: #0284c7; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;">CITIZEN REPORT</span>
          <h4 style="margin: 4px 0 2px 0; font-size: 12px; font-weight: bold;">${rep.category}</h4>
          <p style="font-size: 11px; margin: 0; color: #cbd5e1;">${rep.description}</p>
          <div style="font-size: 10px; color: #94a3b8; margin-top: 4px;">📍 ${rep.location} (${rep.timestamp})</div>
        </div>
      `);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map view when activeStateId changes
  useEffect(() => {
    if (!mapInstanceRef.current || !activeStateId) return;
    const found = nerStatesData.find((s) => s.id === activeStateId);
    if (found) {
      mapInstanceRef.current.flyTo(found.center, found.zoom, { duration: 1.5 });
    }
  }, [activeStateId]);

  return (
    <div className="bg-[#1e293b] border border-slate-700/80 rounded-xl p-3.5 shadow-sm relative overflow-hidden flex flex-col h-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 z-10">
        <div>
          <h3 className="font-bold text-slate-100 text-sm md:text-base flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            {t('gisMapTitle')}
          </h3>
          <p className="text-xs text-slate-400">{t('gisSub')}</p>
        </div>

        {/* Layer Filters */}
        <div className="flex items-center gap-1 bg-[#0f172a] p-1 rounded-lg border border-slate-800 text-xs">
          {['ALL', 'CRITICAL', 'SENSORS', 'REPORTS'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-2.5 py-1 rounded-md transition-all text-xs font-semibold ${
                activeFilter === f ? 'bg-emerald-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 rounded-lg overflow-hidden border border-slate-800">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Legend */}
        <div className="absolute bottom-3 left-3 bg-[#0f172a]/95 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1.5 z-10 shadow-md">
          <div className="font-bold text-slate-200 mb-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-emerald-400" /> GIS Map Legend
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-700" /> Critical Hazard Zone
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-600" /> High Advisory Zone
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-sky-600 rotate-45" /> Field Citizen Report
          </div>
        </div>
      </div>
    </div>
  );
}
