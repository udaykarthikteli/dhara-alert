import React from 'react';
import ThreeDTerrain from '../components/ThreeDTerrain';
import { Mountain, Layers, ShieldAlert, Compass } from 'lucide-react';

export default function ThreeDTerrainPage() {
  return (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="bg-[#121b2d]/90 p-4 rounded-2xl border border-[#1e2c45] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Mountain className="w-6 h-6 text-cyan-400" />
            Interactive 3D Digital Elevation & Slope Terrain Layers
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            High-resolution WebGL terrain mesh with dynamic slope inclinometry, contour isolines, runoff channels, and North-East hotspot inspection.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs flex-shrink-0">
          <div className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-xl text-cyan-300 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>360° Orbit Perspective</span>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-300 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>5 Dynamic Geotechnical Layers</span>
          </div>
        </div>
      </div>

      {/* 3D Visualizer Container */}
      <div className="h-[680px]">
        <ThreeDTerrain />
      </div>
    </div>
  );
}

