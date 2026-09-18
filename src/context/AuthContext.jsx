import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenFromStorage = localStorage.getItem('authToken');
  const [token, setToken] = useState(tokenFromStorage || null);

  const login = async (email, password) => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    setToken(data.token);
    localStorage.setItem('authToken', data.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  return (
    <AuthContext.Provider value={{ token, login, logout, authHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};
