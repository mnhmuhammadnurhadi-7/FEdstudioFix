import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import axiosInstance from '../../lib/axios';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleFieldChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/admin/login', {
        username: formData.username,
        password: formData.password,
      });

      if (response.data.success) {
        const admin = response.data.admin;
        
        // Use AuthContext login method
        login({
          id: admin.id,
          name: admin.name,
          role: admin.role,
        });
        
        setToastMessage({
          type: 'success',
          text: `Login sukses sebagai ${admin.role === 'superadmin' ? 'Super Admin' : 'Admin'}!`,
        });

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      } else {
        setToastMessage({
          type: 'error',
          text: response.data.message || 'Login gagal',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setToastMessage({
        type: 'error',
        text: error.response?.data?.message || 'Username atau password salah',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo */}
        <div className="inline-flex w-12 h-12 rounded-2xl bg-primary-500 items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-primary-500/20 mb-4">
          D
        </div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
          Admin Portal D Studio
        </h2>
        <p className="mt-2 text-xs text-slate-450 dark:text-slate-400">
          Silakan masuk ke akun pengelola Anda untuk memproses berkas pas foto.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-zinc-900 py-8 px-6 border border-slate-200/50 dark:border-zinc-800/50 shadow-md sm:rounded-[32px] sm:px-10">
          
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Username / Email"
              type="text"
              placeholder="Masukkan username admin"
              value={formData.username}
              onChange={(e) => handleFieldChange('username', e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-500 border-slate-300 rounded focus:ring-primary-500"
                  defaultChecked
                />
                <label htmlFor="remember-me" className="ml-2 text-slate-500 dark:text-slate-455">
                  Ingat saya
                </label>
              </div>

              <a href="#forgot" className="text-primary-500 hover:underline">
                Lupa sandi?
              </a>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full py-3 mt-2 shadow-lg shadow-primary-500/10"
                isLoading={isLoading}
              >
                Masuk Sistem
                <Icon icon="solar:login-bold" className="w-4.5 h-4.5 ml-2" />
              </Button>
            </div>
          </form>

        </div>
      </div>

      {/* Toast popup */}
      {toastMessage && (
        <Toast
          message={toastMessage.text}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}

    </div>
  );
};

export default LoginPage;
