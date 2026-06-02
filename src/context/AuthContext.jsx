import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../lib/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  // Validate token with backend on mount
  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setIsAuthenticated(false);
      setAdmin(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get('/admin/me');
      if (response.data.success) {
        const adminData = response.data.admin;
        setIsAuthenticated(true);
        setAdmin({
          id: adminData.id_admin,
          name: adminData.nama_admin,
          role: adminData.role === 'superadmin' ? 'SUPER_ADMIN' : 'ADMIN',
        });
      } else {
        clearAuth();
      }
    } catch (error) {
      console.warn('Token validation failed:', error.message);
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const login = (adminData) => {
    localStorage.setItem('admin_token', 'session-based-auth');
    localStorage.setItem('admin_role', adminData.role === 'superadmin' ? 'SUPER_ADMIN' : 'ADMIN');
    localStorage.setItem('admin_name', adminData.name);
    localStorage.setItem('admin_id', adminData.id);
    
    setIsAuthenticated(true);
    setAdmin({
      id: adminData.id,
      name: adminData.name,
      role: adminData.role === 'superadmin' ? 'SUPER_ADMIN' : 'ADMIN',
    });
  };

  const logout = () => {
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
    <AuthContext.Provider value={{ isAuthenticated, isLoading, admin, login, logout, validateToken }}>
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
