import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import axiosInstance from '../../lib/axios';
import PageHero from '../../components/layout/PageHero';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nama_admin: '',
    role: 'ADMIN',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setToastMessage({
        type: 'error',
        text: 'Password dan konfirmasi password tidak cocok!',
      });
      return;
    }

    if (formData.password.length < 6) {
      setToastMessage({
        type: 'error',
        text: 'Password minimal 6 karakter!',
      });
      return;
    }

    setIsLoading(true);
    try {
      await axiosInstance.post('/admin/register', {
        username: formData.username,
        password: formData.password,
        nama_admin: formData.nama_admin,
        role: formData.role,
      });

      setToastMessage({
        type: 'success',
        text: 'Registrasi berhasil! Silakan login.',
      });

      setTimeout(() => {
        navigate('/admin/login');
      }, 1500);
    } catch (error) {
      setToastMessage({
        type: 'error',
        text: error.response?.data?.message || 'Registrasi gagal. Username mungkin sudah digunakan.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <PageHero
        badge="Registrasi Admin"
        title="Buat Akun Admin"
        subtitle="Daftar untuk mengelola pesanan dan layanan di D Studio."
      />

      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Icon icon="solar:user-bold" className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:border-primary-500 focus:bg-white focus:outline-none text-slate-800 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            {/* Nama Admin */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Icon icon="solar:user-circle-bold" className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="nama_admin"
                  value={formData.nama_admin}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:border-primary-500 focus:bg-white focus:outline-none text-slate-800 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Icon icon="solar:shield-bold" className="w-5 h-5" />
                </div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:border-primary-500 focus:bg-white focus:outline-none text-slate-800 dark:text-slate-100"
                  required
                >
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Icon icon="solar:lock-password-bold" className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password (minimal 6 karakter)"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:border-primary-500 focus:bg-white focus:outline-none text-slate-800 dark:text-slate-100"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Icon icon="solar:lock-password-bold" className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Konfirmasi password"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:border-primary-500 focus:bg-white focus:outline-none text-slate-800 dark:text-slate-100"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full py-3.5"
            >
              Daftar
            </Button>

            {/* Login Link */}
            <p className="text-center text-xs text-slate-400">
              Sudah punya akun?{' '}
              <Link to="/admin/login" className="text-primary-500 font-bold hover:underline">
                Login di sini
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
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

export default RegisterPage;
