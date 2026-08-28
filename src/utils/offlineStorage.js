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
      status: 'QUEUED_LOCAL'
    };
    existing.unshift(newReport);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return newReport;
  } catch (e) {
    console.error("Error saving report to localStorage", e);
    return report;
  }
}

export function clearOfflineReports() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error(e);
  }
}
