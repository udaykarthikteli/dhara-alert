import React from 'react';
import ThreeDTerrain from '../components/ThreeDTerrain';

export default function ThreeDTerrainPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 text-slate-100">3D Terrain View</h2>
      <div className="h-[600px]">
        <ThreeDTerrain />
      </div>
    </div>
  );
}
