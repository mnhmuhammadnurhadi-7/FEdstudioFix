import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Toast from '../../components/ui/Toast';
import { fallbackServices } from '../../data/services';
import { formatRupiah } from '../../lib/helpers';
import axiosInstance from '../../lib/axios';

const CrudLayananPage = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const [currentService, setCurrentService] = useState(null); // Null for Create, Object for Edit
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const [deleteId, setDeleteId] = useState(null);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/admin/services');
      // Map backend fields to frontend expected format
      const mappedServices = response.data.services.map(service => ({
        id: service.id_layanan,
        name: service.nama_layanan,
        price: service.harga,
        description: service.deskripsi || '',
        bgSpec: '', // Backend doesn't have this field
        duration: '1-24 Jam', // Backend doesn't have this field
        slug: '', // Backend doesn't have this field
        is_active: service.is_active,
      }));
      setServices(mappedServices);
    } catch (error) {
      console.warn('API Services fetch failed, loading localStorage fallback: ', error.message);
      
      let localServices = JSON.parse(localStorage.getItem('local_services') || '[]');
      if (localServices.length === 0) {
        localStorage.setItem('local_services', JSON.stringify(fallbackServices));
        localServices = fallbackServices;
      }
      setServices(localServices);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setCurrentService(null);
    setFormData({
      name: '',
      price: '',
      description: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setCurrentService(service);
    setFormData({
      name: service.name,
      price: service.price.toString(),
      description: service.description,
    });
    setIsModalOpen(true);
  };

  const handleFieldChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const priceNum = parseInt(formData.price.replace(/\D/g, '')) || 0;
    // Map frontend fields to backend API format
    const payload = {
      nama_layanan: formData.name,
      harga: priceNum,
      deskripsi: formData.description,
      is_active: true,
    };

    try {
      if (currentService) {
        // PUT /api/admin/services/${id}
        await axiosInstance.put(`/admin/services/${currentService.id}`, payload);
        setToastMessage({ type: 'success', text: 'Layanan berhasil diperbarui!' });
      } else {
        // POST /api/admin/services
        await axiosInstance.post('/admin/services', payload);
        setToastMessage({ type: 'success', text: 'Layanan baru berhasil ditambahkan!' });
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      console.warn('API Save Service failed, updating local storage: ', error.message);
      
      const localServices = JSON.parse(localStorage.getItem('local_services') || '[]');
      
      if (currentService) {
        // UPDATE fallback
        const index = localServices.findIndex((s) => s.id === currentService.id);
        if (index !== -1) {
          localServices[index] = {
            ...localServices[index],
            ...formData,
            price: priceNum,
          };
          localStorage.setItem('local_services', JSON.stringify(localServices));
          setToastMessage({ type: 'success', text: 'Offline: Layanan berhasil diperbarui!' });
        }
      } else {
        // CREATE fallback
        const newService = {
          id: `service-local-${Math.floor(Math.random() * 10000)}`,
          ...formData,
          price: priceNum,
          specs: ['Pemberian aksesoris pakaian digital rapi', 'Penyesuaian latar belakang solid', 'Retouching wajah alami'],
          sampleBefore: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
          sampleAfter: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
        };
        localServices.push(newService);
        localStorage.setItem('local_services', JSON.stringify(localServices));
        setToastMessage({ type: 'success', text: 'Offline: Layanan baru ditambahkan!' });
      }
      setIsModalOpen(false);
      fetchServices();
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteConfirm = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteService = async () => {
    setIsLoading(true);
    try {
      // DELETE /api/admin/services/${id}
      await axiosInstance.delete(`/admin/services/${deleteId}`);
      setToastMessage({ type: 'success', text: 'Layanan berhasil dihapus!' });
      setIsDeleteOpen(false);
      fetchServices();
    } catch (error) {
      console.warn('API Delete Service failed, deleting from local storage: ', error.message);
      
      const localServices = JSON.parse(localStorage.getItem('local_services') || '[]');
      const filtered = localServices.filter((s) => s.id !== deleteId);
      localStorage.setItem('local_services', JSON.stringify(filtered));
      
      setToastMessage({ type: 'success', text: 'Offline: Layanan berhasil dihapus!' });
      setIsDeleteOpen(false);
      fetchServices();
    } finally {
      setIsLoading(false);
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
              Kelola Katalog Layanan
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Tambahkan, ubah, atau hapus pilihan paket pas foto yang tampil di halaman depan customer.
            </p>
          </div>
          <Button onClick={openCreateModal} size="sm" className="flex items-center gap-2 shadow-md shadow-primary-500/10">
            <Icon icon="solar:add-circle-bold" />
            Tambah Layanan Baru
          </Button>
        </div>

        {/* Services Grid Catalog List */}
        {isLoading && services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <svg className="animate-spin h-8 w-8 text-primary-500 mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">Memuat katalog...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight">
                      {service.name}
                    </h3>
                    <span className="shrink-0 text-xs font-black text-primary-500 bg-primary-50 dark:bg-primary-950/20 px-2.5 py-1 rounded-xl">
                      {formatRupiah(service.price)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/60">
                  <Button 
                    onClick={() => openEditModal(service)}
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs"
                  >
                    <Icon icon="solar:pen-bold" className="w-4 h-4 mr-1.5" />
                    Ubah
                  </Button>
                  <Button 
                    onClick={() => openDeleteConfirm(service.id)}
                    variant="danger" 
                    size="sm" 
                    className="flex-1 text-xs bg-rose-50 hover:bg-rose-100 hover:text-rose-600 text-rose-500 border border-rose-150/40 shadow-none"
                  >
                    <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4 mr-1.5" />
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* FORM MODAL (Create & Update) with Fade-In + Scale-Up animations */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Container */}
          <div className="relative bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 rounded-[32px] p-6 md:p-8 max-w-lg w-full shadow-2xl animate-scale-up z-10 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-zinc-800 pb-3 mb-5">
              {currentService ? 'Edit Layanan Pas Foto' : 'Tambah Layanan Pas Foto Baru'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <Input
                label="Nama Layanan"
                placeholder="Contoh: Pas Foto KTM Kampus"
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                required
              />

              <Input
                label="Harga Layanan (Rp)"
                type="text"
                placeholder="Contoh: 15000"
                value={formData.price}
                onChange={(e) => handleFieldChange('price', e.target.value.replace(/\D/g, ''))}
                required
              />

              <Textarea
                label="Deskripsi Layanan"
                placeholder="Jelaskan detail cakupan edit pas foto ini..."
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                rows={3}
                required
              />

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <Button 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  disabled={isLoading}
                >
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  isLoading={isLoading}
                  className="shadow-md"
                >
                  Simpan Layanan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsDeleteOpen(false)}
          />
          <div className="relative bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 rounded-[32px] p-6 max-w-sm w-full shadow-2xl animate-scale-up z-10 text-center flex flex-col items-center">
            
            <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-center justify-center text-rose-500 mb-4 shadow-sm">
              <Icon icon="solar:trash-bin-trash-bold" className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
              Konfirmasi Hapus Layanan
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-400 mb-6">
              Apakah Anda yakin ingin menghapus layanan ini permanen? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex justify-center gap-2.5 w-full">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteOpen(false)}
                disabled={isLoading}
                className="flex-1"
              >
                Batal
              </Button>
              <Button 
                variant="danger"
                onClick={handleDeleteService}
                isLoading={isLoading}
                className="flex-1 shadow-md shadow-rose-500/10"
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}

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

export default CrudLayananPage;
