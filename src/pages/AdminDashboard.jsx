import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { usePush } from '../hooks/usePush';

export default function AdminDashboard() {
  const { token, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [loginError, setLoginError] = useState(null);
  const { subscribe, subscription } = usePush();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setLoginError(null);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const handleTestPush = async () => {
    await fetch('/api/alerts/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => console.log('Push test results', data))
      .catch(console.error);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      {!token ? (
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm">
          <div>
            <label className="block mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2" />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2" />
          </div>
          {loginError && <p className="text-red-600">{loginError}</p>}
          <button type="submit" className="bg-earth-emerald text-white px-4 py-2">Login</button>
        </form>
      ) : (
        <div>
          <p className="mb-2">Logged in as {email}</p>
          <button onClick={logout} className="bg-red-600 text-white px-3 py-1 mr-2">Logout</button>
          <button onClick={handleTestPush} className="bg-earth-river text-white px-3 py-1">Send Test Push</button>
          {subscription && <pre className="mt-4 text-sm">{JSON.stringify(subscription, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
}
