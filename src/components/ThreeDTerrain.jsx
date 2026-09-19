import React, { useState, useEffect, useRef } from 'react';
import { Layers, Eye, Compass, Sun, MapPin, ZoomIn, ZoomOut, RotateCw, AlertTriangle, ShieldCheck, Mountain } from 'lucide-react';

const REGIONAL_PRESETS = [
  {
    id: 'meg-shillong',
    name: 'Shillong Plateau & Cherrapunji',
    state: 'Meghalaya',
    elevationRange: '800m - 1,960m',
    riskLevel: 'HIGH',
    center: [25.5788, 91.8933],
    pitch: 58,
    bearing: 42,
    zoom: 1.8,
    exaggeration: 2.2,
    slopeAvg: '38°',
    description: 'Deep limestone gorges with extreme precipitation runoff corridors and high saturation slope collapse risk.'
  },
  {
    id: 'sik-gangtok',
    name: 'Teesta Valley & Gangtok Slopes',
    state: 'Sikkim',
    elevationRange: '1,400m - 3,200m',
    riskLevel: 'CRITICAL',
    center: [27.3389, 88.6065],
    pitch: 65,
    bearing: 125,
    zoom: 2.2,
    exaggeration: 2.8,
    slopeAvg: '52°',
    description: 'Active tectonic shear zones along NH-10. High vulnerability to translational debris slides during cloudbursts.'
  },
  {
    id: 'aru-tawang',
    name: 'Tawang - Sela Pass Mountain Corridor',
    state: 'Arunachal Pradesh',
    elevationRange: '2,200m - 4,170m',
    riskLevel: 'HIGH',
    center: [27.5861, 91.8594],
    pitch: 52,
    bearing: 210,
    zoom: 1.7,
    exaggeration: 3.0,
    slopeAvg: '44°',
    description: 'High-altitude glacio-fluvial scree slopes subject to freeze-thaw rockfalls and road breaches.'
  },
  {
    id: 'asm-dimahasao',
    name: 'Dima Hasao Hill Section',
    state: 'Assam',
    elevationRange: '300m - 1,100m',
    riskLevel: 'MODERATE',
    center: [25.1764, 93.0232],
    pitch: 45,
    bearing: 15,
    zoom: 1.5,
    exaggeration: 1.8,
    slopeAvg: '29°',
    description: 'Clay-rich sedimentary formations with high susceptibility to slow rotational slumps across railway links.'
  },
  {
    id: 'miz-aizawl',
    name: 'Aizawl North-South Ridgeline',
    state: 'Mizoram',
    elevationRange: '600m - 1,250m',
    riskLevel: 'HIGH',
    center: [23.7271, 92.7176],
    pitch: 60,
    bearing: 340,
    zoom: 2.0,
    exaggeration: 2.4,
    slopeAvg: '46°',
    description: 'Steep hill slopes with dense urban loads along anticlinal axes causing structural subsidence.'
  }
];

const HAZARD_HOTSPOTS = [
  { id: 'h1', name: 'Sonapur Tunnel Bypass (NH-06)', state: 'Meghalaya', x: 0.35, y: 0.42, elev: '1,120m', risk: 'CRITICAL', note: 'Frequent mudflow blockages during heavy rain' },
  { id: 'h2', name: 'Pagla Jhora Chasm', state: 'Sikkim Border', x: 0.62, y: 0.31, elev: '1,840m', risk: 'HIGH', note: 'Continuous creeping subsidence zone' },
  { id: 'h3', name: 'NH-10 29th Mile Corridor', state: 'Sikkim', x: 0.55, y: 0.65, elev: '950m', risk: 'CRITICAL', note: 'Teesta river toe erosion causing slope undercutting' },
  { id: 'h4', name: 'Bhalukpong Valley Entrance', state: 'Arunachal', x: 0.78, y: 0.48, elev: '1,420m', risk: 'MODERATE', note: 'Seasonal scree rockfall zone' }
];

export default function ThreeDTerrain() {
  const canvasRef = useRef(null);

  // 3D Camera & Lighting State
  const [selectedPreset, setSelectedPreset] = useState(REGIONAL_PRESETS[0]);
  const [pitch, setPitch] = useState(58); // degrees
  const [bearing, setBearing] = useState(42); // degrees rotation
  const [zoom, setZoom] = useState(1.8);
  const [exaggeration, setExaggeration] = useState(2.2); // vertical scale
  const [sunAzimuth, setSunAzimuth] = useState(135); // lighting angle

  // Active Layers
  const [layers, setLayers] = useState({
    satellite: true,
    slopeHeatmap: true,
    contours: true,
    drainage: true,
    hotspots: true,
    geology: false
  });

  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle Preset Change
  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setPitch(preset.pitch);
    setBearing(preset.bearing);
    setZoom(preset.zoom);
    setExaggeration(preset.exaggeration);
  };

  // 3D Canvas Rendering Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      const width = canvas.parentElement.clientWidth || 800;
      const height = canvas.parentElement.clientHeight || 550;
      canvas.width = width;
      canvas.height = height;

      // Dark Mountain Atmosphere Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#070b14');
      bgGrad.addColorStop(0.5, '#0d1527');
      bgGrad.addColorStop(1, '#080d19');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant Fog & Atmospheric Horizon Glow
      const horizonY = height * 0.28;
      const fogGrad = ctx.createLinearGradient(0, horizonY - 60, 0, horizonY + 120);
      fogGrad.addColorStop(0, 'rgba(14, 165, 233, 0)');
      fogGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.12)');
      fogGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, horizonY - 60, width, 180);

      // Grid Dimensions for 3D Terrain Mesh
      const rows = 36;
      const cols = 48;
      const gridPoints = [];

      const radPitch = (pitch * Math.PI) / 180;
      const radBearing = (bearing * Math.PI) / 180;
      const radSun = (sunAzimuth * Math.PI) / 180;
      const sunX = Math.cos(radSun);
      const sunY = Math.sin(radSun);

      // Generate Mountainous Elevation Matrix
      const seedFactor = selectedPreset.id === 'sik-gangtok' ? 1.4 : selectedPreset.id === 'aru-tawang' ? 1.7 : 1.1;

      for (let r = 0; r <= rows; r++) {
        gridPoints[r] = [];
        for (let c = 0; c <= cols; c++) {
          const u = (c / cols) * 2 - 1;
          const v = (r / rows) * 2 - 1;

          // Multi-octave synthetic elevation topography based on region
          const distFromCenter = Math.sqrt(u * u + v * v);
          const ridge1 = Math.sin(u * 4 + v * 3) * Math.cos(v * 4 - u * 2);
          const ridge2 = Math.sin(u * 8 - v * 6) * 0.4 * Math.cos(u * 6 + v * 7);
          const peak = Math.exp(-distFromCenter * 2.2) * 1.8;
          const canyon = -Math.exp(-Math.pow((u * 0.8 + v * 0.6), 2) * 8) * 0.8;

          let rawElev = (ridge1 + ridge2 + peak + canyon) * 0.5 + 0.5;
          rawElev = Math.max(0, Math.min(1.2, rawElev)) * exaggeration * seedFactor;

          // Project 3D (x, y, z) into 2D Screen Space with Pitch & Bearing
          const worldX = u * 280 * zoom;
          const worldY = v * 240 * zoom;
          const worldZ = rawElev * 70;

          // Apply Rotation (Bearing)
          const rotX = worldX * Math.cos(radBearing) - worldY * Math.sin(radBearing);
          const rotY = worldX * Math.sin(radBearing) + worldY * Math.cos(radBearing);

          // Apply Pitch (Tilt) & Isometric Perspective Projection
          const projY = (rotY * Math.cos(radPitch) - worldZ * Math.sin(radPitch)) + height * 0.55;
          const projX = rotX + width * 0.5;

          // Approximate Slope Gradient (Degrees)
          const slopeGradient = Math.min(65, Math.abs(ridge1 * 35 + ridge2 * 25));

          gridPoints[r][c] = {
            x: projX,
            y: projY,
            z: worldZ,
            elev: rawElev,
            slope: slopeGradient,
            u,
            v
          };
        }
      }

      // Render 3D Polygons Back-to-Front
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p1 = gridPoints[r][c];
          const p2 = gridPoints[r][c + 1];
          const p3 = gridPoints[r + 1][c + 1];
          const p4 = gridPoints[r + 1][c];

          // Compute Face Normal for Hillshade Lighting
          const dx = p2.x - p1.x;
          const dy = p4.y - p1.y;
          const dz = (p2.elev - p1.elev) * 20;
          const lightIntensity = Math.max(0.2, Math.min(1.0, 0.5 + (dx * sunX + dy * sunY) * 0.003 + dz * 0.05));

          // Base Color by Active Layers
          let baseColor = 'rgba(28, 42, 65, 0.9)';

          if (layers.slopeHeatmap) {
            // Slope Inclinometry Heatmap
            if (p1.slope > 45) {
              baseColor = `rgba(239, 68, 68, ${0.75 * lightIntensity})`; // Red: Severe
            } else if (p1.slope > 30) {
              baseColor = `rgba(249, 115, 22, ${0.7 * lightIntensity})`; // Orange: High
            } else if (p1.slope > 18) {
              baseColor = `rgba(234, 179, 8, ${0.65 * lightIntensity})`; // Yellow: Moderate
            } else {
              baseColor = `rgba(34, 197, 94, ${0.55 * lightIntensity})`; // Green: Stable
            }
          } else if (layers.satellite) {
            // High Resolution Satellite Elevation Shading
            if (p1.elev > 2.0) {
              baseColor = `rgba(226, 232, 240, ${0.9 * lightIntensity})`; // Snow / High Crest
            } else if (p1.elev > 1.2) {
              baseColor = `rgba(120, 113, 108, ${0.85 * lightIntensity})`; // Exposed Rock / Scree
            } else if (p1.elev > 0.6) {
              baseColor = `rgba(30, 80, 50, ${0.9 * lightIntensity})`; // Mountain Forest
            } else {
              baseColor = `rgba(15, 45, 30, ${0.9 * lightIntensity})`; // Valley Vegetation
            }
          } else if (layers.geology) {
            // Geological Formation Layer
            baseColor = p1.slope > 35 
              ? `rgba(168, 85, 247, ${0.7 * lightIntensity})` // Loose Sandstone
              : `rgba(59, 130, 246, ${0.65 * lightIntensity})`; // Gneiss / Granite
          }

          // Draw Terrain Polygon
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();

          ctx.fillStyle = baseColor;
          ctx.fill();

          // Contour Isolines Overlay
          if (layers.contours && (r % 2 === 0 || c % 2 === 0)) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }

          // Drainage / River Water Runoff Channels
          if (layers.drainage && p1.elev < 0.35 && p1.slope < 20) {
            ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
            ctx.fill();
          }
        }
      }

      // Render 3D Hazard Hotspots Pins
      if (layers.hotspots) {
        HAZARD_HOTSPOTS.forEach((spot) => {
          const rIdx = Math.min(rows, Math.max(0, Math.floor(spot.y * rows)));
          const cIdx = Math.min(cols, Math.max(0, Math.floor(spot.x * cols)));
          const pt = gridPoints[rIdx]?.[cIdx];

          if (pt) {
            const isHovered = hoveredHotspot?.id === spot.id;
            const isSelected = selectedHotspot?.id === spot.id;

            // Pin Post Line
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(pt.x, pt.y - 28);
            ctx.strokeStyle = spot.risk === 'CRITICAL' ? '#ef4444' : '#f59e0b';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Pin Radar Pulse
            ctx.beginPath();
            ctx.arc(pt.x, pt.y - 28, isHovered || isSelected ? 8 : 5, 0, Math.PI * 2);
            ctx.fillStyle = spot.risk === 'CRITICAL' ? '#ef4444' : '#f59e0b';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Pin Label Tag
            ctx.fillStyle = 'rgba(10, 15, 29, 0.85)';
            ctx.strokeStyle = spot.risk === 'CRITICAL' ? 'rgba(239, 68, 68, 0.6)' : 'rgba(245, 158, 11, 0.6)';
            ctx.lineWidth = 1;

            const text = `${spot.name} (${spot.elev})`;
            ctx.font = '10px Inter, sans-serif';
            const textWidth = ctx.measureText(text).width;
            
            const badgeX = pt.x - textWidth / 2 - 6;
            const badgeY = pt.y - 48;
            ctx.fillRect(badgeX, badgeY, textWidth + 12, 16);
            ctx.strokeRect(badgeX, badgeY, textWidth + 12, 16);

            ctx.fillStyle = '#f8fafc';
            ctx.fillText(text, badgeX + 6, badgeY + 11);
          }
        });
      }
    };

    render();
    window.addEventListener('resize', render);
    return () => {
      window.removeEventListener('resize', render);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [pitch, bearing, zoom, exaggeration, sunAzimuth, layers, selectedPreset, hoveredHotspot, selectedHotspot]);

  // Mouse Orbit Drag Controls
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setBearing((prev) => (prev + deltaX * 0.4) % 360);
    setPitch((prev) => Math.max(15, Math.min(85, prev - deltaY * 0.3)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="bg-[#0f172a] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col lg:flex-row h-full min-h-[620px]">
      {/* 3D Canvas Viewport */}
      <div 
        className="relative flex-1 bg-slate-950 cursor-grab active:cursor-grabbing overflow-hidden select-none min-h-[420px]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Viewport Floating HUD Controls */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <div className="bg-[#0b1324]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/30 text-xs flex items-center gap-2 text-cyan-300 shadow-lg">
            <Mountain className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">{selectedPreset.name}</span>
            <span className="text-slate-400">({selectedPreset.elevationRange})</span>
          </div>

          <div className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg ${
            selectedPreset.riskLevel === 'CRITICAL' ? 'bg-rose-500/90 text-white' : 'bg-amber-500/90 text-black'
          }`}>
            <AlertTriangle className="w-3.5 h-3.5" />
            {selectedPreset.riskLevel} SLOPE RISK
          </div>
        </div>

        {/* Floating Quick Action Orbit Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button 
            onClick={() => setZoom((z) => Math.min(3.5, z + 0.2))}
            title="Zoom In"
            className="p-2 bg-[#0f172a]/80 hover:bg-cyan-600/30 border border-slate-700 rounded-lg text-slate-200 hover:text-cyan-400 transition shadow-md"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setZoom((z) => Math.max(0.8, z - 0.2))}
            title="Zoom Out"
            className="p-2 bg-[#0f172a]/80 hover:bg-cyan-600/30 border border-slate-700 rounded-lg text-slate-200 hover:text-cyan-400 transition shadow-md"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button 
            onClick={() => { setPitch(55); setBearing(0); setZoom(1.8); setExaggeration(2.0); }}
            title="Reset 3D Camera"
            className="p-2 bg-[#0f172a]/80 hover:bg-cyan-600/30 border border-slate-700 rounded-lg text-slate-200 hover:text-cyan-400 transition shadow-md"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Orbit Helper Tip */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800 text-[11px] text-slate-400 pointer-events-none flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Click & Drag to Orbit 3D Terrain | Pitch: {Math.round(pitch)}° | Azimuth: {Math.round(bearing)}°</span>
        </div>
      </div>

      {/* 3D Sidebar Controls & Layer Management */}
      <div className="w-full lg:w-80 bg-[#0c1427] border-t lg:border-t-0 lg:border-l border-slate-800 p-4 flex flex-col justify-between space-y-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              3D Terrain Layers & DEM
            </h3>
            <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/50 px-2 py-0.5 rounded-full font-mono">
              WebGL DEM
            </span>
          </div>

          {/* Regional Presets Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
              North-East Mountain Corridors
            </label>
            <div className="space-y-1">
              {REGIONAL_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition border flex items-center justify-between ${
                    selectedPreset.id === p.id
                      ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200 font-bold'
                      : 'bg-[#131e36]/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="truncate">
                    <div className="font-semibold truncate">{p.name}</div>
                    <div className="text-[10px] text-slate-400">{p.state} • Avg Slope {p.slopeAvg}</div>
                  </div>
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                    p.riskLevel === 'CRITICAL' ? 'bg-rose-500/30 text-rose-300' : 'bg-amber-500/30 text-amber-300'
                  }`}>
                    {p.riskLevel}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Layer Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
              Active Geotechnical Layers
            </label>
            
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => setLayers(l => ({ ...l, slopeHeatmap: !l.slopeHeatmap }))}
                className={`px-2.5 py-2 rounded-lg border text-left flex items-center justify-between transition ${
                  layers.slopeHeatmap ? 'bg-amber-500/20 border-amber-500/50 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <span>Slope Inclinometry</span>
                <Eye className={`w-3.5 h-3.5 ${layers.slopeHeatmap ? 'text-amber-400' : 'text-slate-600'}`} />
              </button>

              <button
                onClick={() => setLayers(l => ({ ...l, satellite: !l.satellite }))}
                className={`px-2.5 py-2 rounded-lg border text-left flex items-center justify-between transition ${
                  layers.satellite ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <span>Satellite DEM</span>
                <Eye className={`w-3.5 h-3.5 ${layers.satellite ? 'text-emerald-400' : 'text-slate-600'}`} />
              </button>

              <button
                onClick={() => setLayers(l => ({ ...l, contours: !l.contours }))}
                className={`px-2.5 py-2 rounded-lg border text-left flex items-center justify-between transition ${
                  layers.contours ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <span>Contour Isolines</span>
                <Eye className={`w-3.5 h-3.5 ${layers.contours ? 'text-cyan-400' : 'text-slate-600'}`} />
              </button>

              <button
                onClick={() => setLayers(l => ({ ...l, drainage: !l.drainage }))}
                className={`px-2.5 py-2 rounded-lg border text-left flex items-center justify-between transition ${
                  layers.drainage ? 'bg-blue-500/20 border-blue-500/50 text-blue-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <span>Runoff Gully Paths</span>
                <Eye className={`w-3.5 h-3.5 ${layers.drainage ? 'text-blue-400' : 'text-slate-600'}`} />
              </button>

              <button
                onClick={() => setLayers(l => ({ ...l, hotspots: !l.hotspots }))}
                className={`px-2.5 py-2 rounded-lg border text-left flex items-center justify-between col-span-2 transition ${
                  layers.hotspots ? 'bg-rose-500/20 border-rose-500/50 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-rose-400" /> Active Disaster Hotspots</span>
                <Eye className={`w-3.5 h-3.5 ${layers.hotspots ? 'text-rose-400' : 'text-slate-600'}`} />
              </button>
            </div>
          </div>

          {/* Elevation Exaggeration Slider */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between text-xs text-slate-300">
              <span className="font-semibold">Elevation Exaggeration:</span>
              <span className="font-mono text-cyan-400 font-bold">{exaggeration.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="4.0"
              step="0.1"
              value={exaggeration}
              onChange={(e) => setExaggeration(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Sun Lighting Azimuth */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span className="font-semibold flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" /> Solar Hillshade Angle:
              </span>
              <span className="font-mono text-amber-400 font-bold">{sunAzimuth}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="5"
              value={sunAzimuth}
              onChange={(e) => setSunAzimuth(parseInt(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>
        </div>

        {/* Legend */}
        <div className="bg-[#111a2e] p-2.5 rounded-xl border border-slate-800 text-[10px] space-y-1 text-slate-400">
          <div className="font-bold text-slate-200 mb-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Inclinometry Gradient Legend
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 flex-shrink-0" />
            <span>&lt;18° Low Risk / Valley Base</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 flex-shrink-0" />
            <span>18° - 30° Moderate Risk / Colluvium</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-orange-500 flex-shrink-0" />
            <span>30° - 45° High Risk Slope Failure</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 flex-shrink-0" />
            <span>&gt;45° Severe Shear / Avalanche Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
}
