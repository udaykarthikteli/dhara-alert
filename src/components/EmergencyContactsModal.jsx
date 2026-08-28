import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PhoneCall, ShieldAlert, ExternalLink, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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

export default function EmergencyContactsModal({ isOpen, onClose }) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#121b2d] border border-[#1e2c45] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        >
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#0a0f1d]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-base">{t('emergencyContacts')}</h3>
                <p className="text-xs text-slate-400">Direct SDMA & NDRF Emergency Control Rooms</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto space-y-3">
            <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-xs text-rose-300 flex items-center justify-between">
              <span className="font-bold">National NDRF Emergency Toll-Free: 1078</span>
              <span className="font-mono bg-rose-500 text-white px-2 py-0.5 rounded font-bold">24x7</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nerHelplines.map((h) => (
                <div key={h.state} className="bg-[#0a0f1d] p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-cyan-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {h.state}
                    </span>
                    <span className="text-[10px] text-slate-500">{h.location}</span>
                  </div>
                  <div className="text-slate-200">SDMA: <a href={`tel:${h.sdma.split('/')[0]}`} className="text-cyan-300 font-mono font-bold hover:underline">{h.sdma}</a></div>
                  <div className="text-slate-400">NDRF Battalion: <span className="font-mono">{h.ndrf}</span></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
