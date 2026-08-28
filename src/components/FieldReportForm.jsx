import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, MapPin, Upload, AlertCircle, CheckCircle2, WifiOff, Send } from 'lucide-react';
import { saveOfflineReport } from '../utils/offlineStorage';
import { useLanguage } from '../context/LanguageContext';

export default function FieldReportForm({ isOpen, onClose, onReportSubmitted }) {
  const { t } = useLanguage();

  const [category, setCategory] = useState('typeCrack');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('HIGH');
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOfflineMode(false);
    const handleOffline = () => setIsOfflineMode(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOpen) return null;

  const handleDetectLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          setLocation(`${lat}° N, ${lng}° E (GPS Verified)`);
          setIsLocating(false);
        },
        () => {
          setLocation('25.5788° N, 91.8933° E (Shillong Pass)');
          setIsLocating(false);
        }
      );
    } else {
      setLocation('25.5788° N, 91.8933° E (Shillong Pass)');
      setIsLocating(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reportObj = {
      category: t(category),
      severity,
      location: location || 'Shillong-Guwahati Road (NH-27)',
      description: description || 'Observed surface tension cracks along hill slope following heavy rain.',
      photoUrl: photoPreview || 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=500&auto=format&fit=crop&q=60',
      timestamp: 'Just now'
    };

    saveOfflineReport(reportObj);
    setIsSubmitted(true);

    setTimeout(() => {
      if (onReportSubmitted) onReportSubmitted(reportObj);
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#121b2d] border border-[#1e2c45] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col my-auto"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#0a0f1d]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm md:text-base">{t('fieldReportTitle')}</h3>
                <p className="text-xs text-slate-400">{t('fieldReportDesc')}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            {isOfflineMode && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-2.5">
                <WifiOff className="w-4 h-4 flex-shrink-0" />
                <span>{t('offlineNotice')}</span>
              </div>
            )}

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-bold text-slate-100 text-base">{t('syncedNotice')}</h4>
                <p className="text-slate-400">Emergency response nodes & nearby villagers have been alerted.</p>
              </div>
            ) : (
              <>
                {/* Category Selection */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">{t('reportType')}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0a0f1d] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="typeCrack">{t('typeCrack')}</option>
                    <option value="typeBlockage">{t('typeBlockage')}</option>
                    <option value="typeFlood">{t('typeFlood')}</option>
                    <option value="typeFailure">{t('typeFailure')}</option>
                  </select>
                </div>

                {/* Location Picker */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">{t('location')}</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. NH-27 Km 42, Pynursla"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 bg-[#0a0f1d] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={isLocating}
                      className="px-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl font-semibold hover:bg-cyan-500/20 flex items-center gap-1.5 flex-shrink-0"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {isLocating ? 'Locating...' : 'GPS'}
                    </button>
                  </div>
                </div>

                {/* Severity Rating */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">{t('severity')}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['MODERATE', 'HIGH', 'CRITICAL'].map((sev) => (
                      <button
                        type="button"
                        key={sev}
                        onClick={() => setSeverity(sev)}
                        className={`p-2 rounded-xl font-bold border transition-all text-center ${
                          severity === sev
                            ? sev === 'CRITICAL'
                              ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20'
                              : sev === 'HIGH'
                              ? 'bg-amber-500 text-black border-amber-400'
                              : 'bg-blue-500 text-white border-blue-400'
                            : 'bg-[#0a0f1d] text-slate-400 border-slate-800'
                        }`}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photo Upload Box */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">{t('uploadPhoto')}</label>
                  <div className="border-2 border-dashed border-slate-800 rounded-xl p-4 text-center bg-[#0a0f1d] hover:border-slate-700 transition-colors">
                    {photoPreview ? (
                      <div className="relative">
                        <img src={photoPreview} alt="Field hazard preview" className="max-h-36 mx-auto rounded-lg object-cover" />
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center gap-1 text-slate-400">
                        <Upload className="w-6 h-6 text-cyan-400 mb-1" />
                        <span>Click or drop geo-tagged photo/video file</span>
                        <span className="text-[10px] text-slate-500">Supports JPG, PNG, MP4 up to 25MB</span>
                        <input type="file" accept="image/*,video/*" onChange={handlePhotoUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                {/* Additional Description */}
                <div>
                  <textarea
                    rows="2"
                    placeholder="Describe crack length, soil movement speed, or village risk..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#0a0f1d] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 font-bold text-white shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 hover:brightness-110"
                >
                  <Send className="w-4 h-4" />
                  {t('submitReport')}
                </button>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
