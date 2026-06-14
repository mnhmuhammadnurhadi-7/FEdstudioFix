import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BerandaPage from './pages/BerandaPage';
import LayananPage from './pages/LayananPage';
import PesananPage from './pages/PesananPage';
import CekStatusPage from './pages/CekStatusPage';
import HubungiPage from './pages/HubungiPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/admin/LoginPage';
import RegisterPage from './pages/admin/RegisterPage';
import DashboardPage from './pages/admin/DashboardPage';
import PesananSelesaiPage from './pages/admin/PesananSelesaiPage';
import CrudLayananPage from './pages/admin/CrudLayananPage';
import CrudAdminPage from './pages/admin/CrudAdminPage';
import CmsPage from './pages/admin/CmsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { setupGlobalImageProtection } from './utils/imageProtection';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout wrapper to conditionally hide Navbar/Footer on admin pages
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  useEffect(() => {
    // Initialize global image protection on app load
    setupGlobalImageProtection();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <LayoutWrapper>
          <Routes>
          {/* Customer Facing Routes */}
          <Route path="/" element={<BerandaPage />} />
          <Route path="/layanan" element={<LayananPage />} />
          <Route path="/pesanan" element={<PesananPage />} />
          <Route path="/cek-status" element={<CekStatusPage />} />
          <Route path="/hubungi" element={<HubungiPage />} />
          <Route path="/hubungi-kami" element={<HubungiPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
              path="/admin/register"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <RegisterPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/completed"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
                  <PesananSelesaiPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/services"
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <CrudLayananPage />
                </ProtectedRoute>
              }
            />
            
            <Route 
              path="/admin/cms" 
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <CmsPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/admins" 
              element={
                <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                  <CrudAdminPage />
                </ProtectedRoute>
              } 
            />

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LayoutWrapper>
    </Router>
    </AuthProvider>
  );
}

export default App;
