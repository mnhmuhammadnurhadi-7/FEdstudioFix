import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Toast from '../../components/ui/Toast';
import axiosInstance from '../../lib/axios';

const CmsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [formData, setFormData] = useState({
    hero_title: '',
    hero_subtitle: '',
    about_text: '',
    nomor_wa_bisnis: '',
    qris_image_path: '',
    instagram_url: '',
  });

  const fetchCms = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/admin/cms');
      const contents = response.data.contents;
      
      setFormData({
        hero_title: contents.hero_title?.setting_value || '',
        hero_subtitle: contents.hero_subtitle?.setting_value || '',
        about_text: contents.about_text?.setting_value || '',
        nomor_wa_bisnis: contents.nomor_wa_bisnis?.setting_value || '',
        qris_image_path: contents.qris_image_path?.setting_value || '',
        instagram_url: contents.instagram_url?.setting_value || '',
      });
    } catch (error) {
      console.warn('API CMS fetch failed: ', error.message);
      setToastMessage({
        type: 'error',
        text: 'Gagal memuat data CMS',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCms();
  }, []);

  const handleFieldChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSaveCms = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await axiosInstance.post('/admin/cms', formData);
      
      setToastMessage({
        type: 'success',
        text: 'Konten CMS berhasil diperbarui!',
      });
    } catch (error) {
      console.warn('API Save CMS failed: ', error.message);
      setToastMessage({
        type: 'error',
        text: error.response?.data?.message || 'Gagal menyimpan konten CMS',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigation and Title Banner */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-6 md:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div>
            <Link to="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-500 hover:underline mb-2">
              <Icon icon="solar:arrow-left-linear" />
              Kembali ke Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">
              Kelola Konten Website
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Atur teks hero, subtitle, dan informasi tentang kami yang tampil di halaman depan.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <svg className="animate-spin h-8 w-8 text-primary-500 mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">Memuat konten...</span>
          </div>
        ) : (
          <form onSubmit={handleSaveCms} className="space-y-6">
            
            {/* Hero Section */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <Icon icon="solar:home-angle-bold-duotone" className="text-primary-500" />
                Bagian Hero
              </h2>
              
              <div className="space-y-4">
                <Input
                  label="Judul Hero"
                  placeholder="Edit Pas Foto Online Ubah Selfie Jadi"
                  value={formData.hero_title}
                  onChange={(e) => handleFieldChange('hero_title', e.target.value)}
                  required
                />

                <Input
                  label="Subjudul Hero"
                  placeholder="Pas Foto Kilat!"
                  value={formData.hero_subtitle}
                  onChange={(e) => handleFieldChange('hero_subtitle', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <Icon icon="solar:info-circle-bold-duotone" className="text-primary-500" />
                Tentang Kami
              </h2>
              
              <Textarea
                label="Teks Tentang Kami"
                placeholder="Edit foto selfie Anda menjadi pas foto formal profesional untuk KTM, KTP, CPNS, Visa, atau Lamaran Kerja dalam hitungan jam. Hasil berkualitas tinggi, rapi, dan bergaransi resmi."
                value={formData.about_text}
                onChange={(e) => handleFieldChange('about_text', e.target.value)}
                rows={4}
                required
              />
            </div>
              {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                isLoading={isSaving}
                className="shadow-md shadow-primary-500/10"
              >
                <Icon icon="solar:disk-bold" className="w-4 h-4 mr-2" />
                Simpan Perubahan
              </Button>
            </div>

          </form>
        )}

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

export default CmsPage;
