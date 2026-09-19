const STORAGE_KEY = 'landslide_guard_offline_reports';

export function getOfflineReports() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading offline reports", e);
    return [];
  }
}

export function saveOfflineReport(report) {
  try {
    const existing = getOfflineReports();
    const newReport = {
      ...report,
      id: 'offline-' + Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      status: navigator.onLine ? 'SYNCED_CLOUD' : 'QUEUED_OFFLINE',
      isOfflineQueued: !navigator.onLine
    };
    existing.unshift(newReport);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    
    // Dispatch custom event for UI updates
    window.dispatchEvent(new CustomEvent('dhara_offline_reports_updated', { detail: existing }));
    return newReport;
  } catch (e) {
    console.error("Error saving report to localStorage", e);
    return report;
  }
}

export function getQueuedOfflineCount() {
  const reports = getOfflineReports();
  return reports.filter(r => r.status === 'QUEUED_OFFLINE' || r.isOfflineQueued).length;
}

export function syncOfflineReports() {
  try {
    const reports = getOfflineReports();
    const updated = reports.map(r => {
      if (r.status === 'QUEUED_OFFLINE' || r.isOfflineQueued) {
        return {
          ...r,
          status: 'SYNCED_CLOUD',
          isOfflineQueued: false,
          syncedAt: new Date().toLocaleTimeString()
        };
      }
      return r;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('dhara_offline_reports_updated', { detail: updated }));
    return updated;
  } catch (e) {
    console.error("Error syncing offline reports", e);
    return getOfflineReports();
  }
}

export function clearOfflineReports() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('dhara_offline_reports_updated', { detail: [] }));
  } catch (e) {
    console.error(e);
  }
}

