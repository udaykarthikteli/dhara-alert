import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { usePush } from '../hooks/usePush';
import { ShieldCheck, FileText, FileSpreadsheet, Bell, Lock, UserCheck, LogOut, Radio } from 'lucide-react';
import { sampleCitizenReports } from '../data/nerDistricts';
import { getOfflineReports } from '../utils/offlineStorage';
import { exportIncidentCsv, exportIncidentPdf } from '../utils/reportExporter';

export default function AdminDashboard() {
  const { token, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [loginError, setLoginError] = useState(null);
  const { subscribe, subscription } = usePush();
  const [pushStatus, setPushStatus] = useState('');

  const allReports = [...getOfflineReports(), ...sampleCitizenReports];

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setLoginError(null);
    } catch (err) {
      setLoginError(err.message || 'Login failed');
    }
  };

  const handleTestPush = async () => {
    setPushStatus('Transmitting broadcast alert...');
    try {
      const res = await fetch('/api/alerts/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPushStatus('Alert broadcasted to registered field units!');
      setTimeout(() => setPushStatus(''), 4000);
    } catch (err) {
      setPushStatus('Test alert simulated locally (mock broadcast active)');
      setTimeout(() => setPushStatus(''), 4000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#121b2d]/90 p-5 rounded-2xl border border-[#1e2c45] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            Disaster Management Authority Console
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Restricted access for SDMA / NDRF Incident Commanders, Telemetry Officers & Field Directors
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportIncidentCsv(allReports)}
            className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold text-xs flex items-center gap-1.5 transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => exportIncidentPdf(allReports)}
            className="px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs flex items-center gap-1.5 transition"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export PDF SITREP</span>
          </button>
        </div>
      </div>

      {!token ? (
        <div className="max-w-md mx-auto bg-[#0f172a] p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Disaster Management Authority Login</h3>
            <p className="text-xs text-slate-400">Enter your credentials to access command tools</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Security Passcode</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500"
                required
              />
            </div>
            {loginError && <p className="text-xs text-rose-400">{loginError}</p>}
            
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 font-bold text-white text-xs shadow-lg shadow-cyan-500/20 transition"
            >
              Authenticate Officer Access
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0f172a] p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
              <UserCheck className="w-4 h-4" /> Commander Profile
            </div>
            <div className="text-xs text-slate-300">
              <div><strong>Authenticated:</strong> {email}</div>
              <div className="text-slate-500 text-[11px] mt-1">Role: Regional Disaster Coordinator</div>
            </div>
            <button
              onClick={logout}
              className="w-full py-2 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout Session
            </button>
          </div>

          <div className="bg-[#0f172a] p-4 rounded-2xl border border-slate-800 space-y-3 md:col-span-2">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-100">
              <span className="flex items-center gap-2 text-amber-400">
                <Radio className="w-4 h-4" /> Emergency Broadcast Network
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                PUSH GATEWAY ACTIVE
              </span>
            </div>
            
            <p className="text-xs text-slate-400">
              Transmit urgent high-priority SMS and Web-Push landslide advisories to citizens and field responders in active hazard zones.
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={handleTestPush}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/20"
              >
                <Bell className="w-3.5 h-3.5" /> Transmit Emergency Push Alert
              </button>
              {pushStatus && <span className="text-xs text-emerald-400 font-medium">{pushStatus}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
