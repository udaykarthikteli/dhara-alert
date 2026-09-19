import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import { getQueuedOfflineCount, syncOfflineReports } from '../utils/offlineStorage';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedCount, setQueuedCount] = useState(getQueuedOfflineCount());
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      const count = getQueuedOfflineCount();
      if (count > 0) {
        setIsSyncing(true);
        setTimeout(() => {
          syncOfflineReports();
          setIsSyncing(false);
          setShowSyncSuccess(true);
          setQueuedCount(0);
          setTimeout(() => setShowSyncSuccess(false), 4000);
        }, 1200);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setQueuedCount(getQueuedOfflineCount());
    };

    const handleReportsUpdate = () => {
      setQueuedCount(getQueuedOfflineCount());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('dhara_offline_reports_updated', handleReportsUpdate);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('dhara_offline_reports_updated', handleReportsUpdate);
    };
  }, []);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      syncOfflineReports();
      setIsSyncing(false);
      setShowSyncSuccess(true);
      setQueuedCount(0);
      setTimeout(() => setShowSyncSuccess(false), 4000);
    }, 1000);
  };

  // If online and no notification, don't take screen space
  if (isOnline && !showSyncSuccess && queuedCount === 0) {
    return null;
  }

  return (
    <div className="w-full z-40 transition-all duration-300">
      {!isOnline && (
        <div className="bg-gradient-to-r from-amber-600/90 via-amber-700/95 to-orange-700/90 backdrop-blur-md text-amber-50 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-lg border-b border-amber-500/40">
          <div className="flex items-center gap-2 font-medium">
            <WifiOff className="w-4 h-4 text-amber-200 animate-pulse flex-shrink-0" />
            <span>
              <strong>Offline Mode Active:</strong> You are currently disconnected. All GIS maps, AI predictors, and guides are running from local offline cache.
            </span>
          </div>

          {queuedCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="bg-black/30 px-2 py-0.5 rounded-full text-[11px] font-mono text-amber-200">
                {queuedCount} Report{queuedCount > 1 ? 's' : ''} queued locally
              </span>
            </div>
          )}
        </div>
      )}

      {isOnline && showSyncSuccess && (
        <div className="bg-gradient-to-r from-emerald-600/90 via-teal-700/95 to-emerald-700/90 backdrop-blur-md text-emerald-50 px-4 py-2 text-xs flex items-center justify-between gap-2 shadow-lg border-b border-emerald-500/40 animate-fade-in">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-200 flex-shrink-0" />
            <span>
              <strong>Online Connection Restored:</strong> All queued offline hazard reports and telemetry have been synced successfully!
            </span>
          </div>
          <button
            onClick={() => setShowSyncSuccess(false)}
            className="text-[10px] bg-black/20 hover:bg-black/40 px-2 py-0.5 rounded text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {isOnline && queuedCount > 0 && !showSyncSuccess && (
        <div className="bg-[#121b2d]/95 backdrop-blur-md border-b border-cyan-500/30 text-cyan-200 px-4 py-1.5 text-xs flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-cyan-400" />
            {queuedCount} field report(s) pending sync from offline session
          </span>
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
      )}
    </div>
  );
}
