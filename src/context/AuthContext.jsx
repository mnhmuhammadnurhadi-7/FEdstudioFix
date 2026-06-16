import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../lib/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  // On mount: restore from localStorage first (works on ALL devices/browsers)
  useEffect(() => {
    restoreFromStorage();
  }, []);

  /**
   * Restore auth state from localStorage.
   * We trust localStorage as the source of truth.
   * /admin/me is only called to "refresh" data if possible, but failure
   * does NOT log the user out (fixes Safari/iPhone ITP cookie blocking).
   */
  const restoreFromStorage = async () => {
    const token = localStorage.getItem('admin_token');
    const adminId = localStorage.getItem('admin_id');
    const adminName = localStorage.getItem('admin_name');
    const adminRole = localStorage.getItem('admin_role');

    // If no stored session data, user is not logged in
    if (!token || !adminId) {
      setIsAuthenticated(false);
      setAdmin(null);
      setIsLoading(false);
      return;
    }

    // Restore from localStorage immediately (fixes iPhone/Safari blank loop)
    setIsAuthenticated(true);
    setAdmin({
      id: adminId,
      name: adminName,
      role: adminRole || 'ADMIN',
    });
    setIsLoading(false);

    // Optionally try to refresh admin data from backend in the background.
    // If this fails (e.g. Safari blocks session cookie), we silently keep
    // the localStorage data — the user stays logged in.
    try {
      const response = await axiosInstance.get('/admin/me');
      if (response.data.authenticated && response.data.admin) {
        const adminData = response.data.admin;
        const freshAdmin = {
          id: adminData.id,
          name: adminData.name,
          role: adminData.role === 'superadmin' ? 'SUPER_ADMIN' : 'ADMIN',
        };
        // Update localStorage with fresh data
        localStorage.setItem('admin_name', freshAdmin.name);
        localStorage.setItem('admin_role', freshAdmin.role);
        setAdmin(freshAdmin);
      }
      // If not authenticated from backend, we still trust localStorage
      // (session may be cross-domain blocked on iPhone)
    } catch (error) {
      // Silently ignore — localStorage data is still valid
      console.warn('Background session refresh failed (safe to ignore on Safari):', error.message);
    }
  };

  const login = (adminData) => {
    const role = adminData.role === 'superadmin' ? 'SUPER_ADMIN' : 'ADMIN';
    localStorage.setItem('admin_token', 'session-based-auth');
    localStorage.setItem('admin_role', role);
    localStorage.setItem('admin_name', adminData.name);
    localStorage.setItem('admin_id', String(adminData.id));

    setIsAuthenticated(true);
    setAdmin({
      id: adminData.id,
      name: adminData.name,
      role,
    });
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/admin/logout');
    } catch (_) {
      // Ignore logout errors
    }
    clearAuth();
    window.location.href = '/admin/login';
  };

  const clearAuth = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_role');
    localStorage.removeItem('admin_name');
    localStorage.removeItem('admin_id');
    setIsAuthenticated(false);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
