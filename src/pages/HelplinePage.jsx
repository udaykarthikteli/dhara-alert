import React from 'react';
import { PhoneCall, MapPin, ShieldAlert } from 'lucide-react';

const nerHelplines = [
  { state: "Meghalaya", sdma: "1070 / 0364-2226579", ndrf: "9436101078", location: "Shillong SDMA" },
  { state: "Assam", sdma: "1070 / 1079", ndrf: "0361-2840284", location: "Dispur Control Room" },
  { state: "Sikkim", sdma: "1070 / 03592-202892", ndrf: "03592-201078", location: "Gangtok Command" },
  { state: "Arunachal Pradesh", sdma: "1070 / 0360-2291136", ndrf: "0360-221078", location: "Itanagar Control" },
  { state: "Nagaland", sdma: "1070 / 0370-2291122", ndrf: "0370-221078", location: "Kohima SDMA" },
  { state: "Manipur", sdma: "1070 / 0385-2443441", ndrf: "0385-241078", location: "Imphal SDMA" },
  { state: "Mizoram", sdma: "1070 / 0389-2335872", ndrf: "0389-231078", location: "Aizawl Disaster Cell" },
  { state: "Tripura", sdma: "1070 / 0381-2416045", ndrf: "0381-241078", location: "Agartala Emergency" }
];

export default function HelplinePage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#121b2d]/90 p-4 rounded-2xl border border-[#1e2c45] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-rose-400" />
            Disaster Management & NDRF Helpline Directory
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Direct 24x7 control room contacts for all 8 North Eastern States
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-rose-500 text-white font-black text-xs">
          National Toll-Free: 1078
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {nerHelplines.map((h) => (
          <div key={h.state} className="bg-[#121b2d]/90 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-extrabold text-cyan-400 flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4 text-cyan-400" /> {h.state}
              </span>
              <span className="text-[10px] text-slate-500">{h.location}</span>
            </div>

            <div className="space-y-1 pt-1">
              <div className="text-slate-300">
                SDMA Emergency: <br />
                <a href={`tel:${h.sdma.split('/')[0]}`} className="text-cyan-300 font-mono font-bold text-sm hover:underline block mt-0.5">
                  📞 {h.sdma}
                </a>
              </div>
              <div className="text-slate-400 pt-1">
                NDRF Battalion: <span className="font-mono text-slate-200">{h.ndrf}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
