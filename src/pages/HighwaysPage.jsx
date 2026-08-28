import React from 'react';
import RoadStatusBoard from '../components/RoadStatusBoard';
import { Truck, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function HighwaysPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#121b2d]/90 p-4 rounded-2xl border border-[#1e2c45] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Truck className="w-6 h-6 text-amber-400" />
            National Highway Connectivity & Corridor Monitor
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time arterial highway blockage tracking, debris clearance priority, and diversion routes
          </p>
        </div>
      </div>

      <RoadStatusBoard />
    </div>
  );
}
