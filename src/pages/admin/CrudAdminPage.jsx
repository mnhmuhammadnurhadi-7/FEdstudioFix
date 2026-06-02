import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import Toast from '../../components/ui/Toast';
import axiosInstance from '../../lib/axios';
import { useAuth } from '../../context/AuthContext';

const CrudAdminPage = () => {
  const { admin } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const [currentAdmin, setCurrentAdmin] = useState(null); // Null for Create, Object for Edit
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'admin',
  });

  const [deleteId, setDeleteId] = useState(null);
  const currentAdminId = admin?.id;

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/admin/admins');
      // Map backend fields to frontend expected format
      const mappedAdmins = response.data.admins.map(admin => ({
        id: admin.id_admin,
        name: admin.nama_admin,
        username: admin.username,
        role: admin.role === 'superadmin' ? 'SUPER_ADMIN' : 'ADMIN',
      }));
      setAdmins(mappedAdmins);
    } catch (error) {
      console.warn('API Admins fetch failed: ', error.message);
      setToastMessage({
        type: 'error',
        text: 'Gagal memuat data admin',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const openCreateModal = () => {
    setCurrentAdmin(null);
    setFormData({
      name: '',
      username: '',
      password: '',
      role: 'admin',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (admin) => {
    setCurrentAdmin(admin);
    setFormData({
      name: admin.name,
      username: admin.username,
      password: '',
      role: admin.role === 'SUPER_ADMIN' ? 'superadmin' : 'admin',
    });
    setIsModalOpen(true);
  };

  const handleFieldChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSaveAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Map frontend fields to backend API format
    const payload = {
      nama_admin: formData.name,
      username: formData.username,
      role: formData.role,
    };

    // Only include password if it's provided (for updates, password is optional)
    if (formData.password) {
      payload.password = formData.password;
    } else if (!currentAdmin) {
      // Password is required for new admin
      setToastMessage({
        type: 'error',
        text: 'Password wajib diisi untuk admin baru',
      });
      setIsLoading(false);
      return;
    }

    try {
      if (currentAdmin) {
        // PUT /api/admin/admins/${id}
        await axiosInstance.put(`/admin/admins/${currentAdmin.id}`, payload);
        setToastMessage({ type: 'success', text: 'Admin berhasil diperbarui!' });
      } else {
        // POST /api/admin/admins
        await axiosInstance.post('/admin/admins', payload);
        setToastMessage({ type: 'success', text: 'Admin baru berhasil ditambahkan!' });
      }
      setIsModalOpen(false);
      fetchAdmins();
    } catch (error) {
      console.warn('API Save Admin failed: ', error.message);
      setToastMessage({
        type: 'error',
        text: error.response?.data?.message || 'Gagal menyimpan data admin',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteConfirm = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteAdmin = async () => {
    setIsLoading(true);
    try {
      // DELETE /api/admin/admins/${id}
      await axiosInstance.delete(`/admin/admins/${deleteId}`);
      setToastMessage({ type: 'success', text: 'Admin berhasil dihapus!' });
      setIsDeleteOpen(false);
      fetchAdmins();
    } catch (error) {
      console.warn('API Delete Admin failed: ', error.message);
      setToastMessage({
        type: 'error',
        text: error.response?.data?.message || 'Gagal menghapus admin',
      });
      setIsDeleteOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleBadgeVariant = (role) => {
    return role === 'SUPER_ADMIN' ? 'primary' : 'neutral';
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
              Kelola Admin
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Tambahkan, ubah, atau hapus akun admin yang dapat mengakses sistem.
            </p>
          </div>
          <Button onClick={openCreateModal} size="sm" className="flex items-center gap-2 shadow-md shadow-primary-500/10">
            <Icon icon="solar:add-circle-bold" />
            Tambah Admin Baru
          </Button>
        </div>

        {/* Admins Table */}
        {isLoading && admins.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <svg className="animate-spin h-8 w-8 text-primary-500 mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">Memuat data admin...</span>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] shadow-sm overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 dark:bg-zinc-850 border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4.5">Nama Admin</th>
                    <th className="px-6 py-4.5">Username</th>
                    <th className="px-6 py-4.5">Role</th>
                    <th className="px-6 py-4.5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80 text-xs">
                  {admins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-slate-50/40 dark:hover:bg-zinc-850/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">
                        {admin.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-350">
                        {admin.username}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={getRoleBadgeVariant(admin.role)}>
                          {admin.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            onClick={() => openEditModal(admin)}
                            variant="outline" 
                            size="sm" 
                            className="text-xs"
                            disabled={admin.id === parseInt(currentAdminId)}
                          >
                            <Icon icon="solar:pen-bold" className="w-4 h-4 mr-1.5" />
                            Ubah
                          </Button>
                          <Button 
                            onClick={() => openDeleteConfirm(admin.id)}
                            variant="danger" 
                            size="sm" 
                            className="text-xs bg-rose-50 hover:bg-rose-100 hover:text-rose-600 text-rose-500 border border-rose-150/40 shadow-none"
                            disabled={admin.id === parseInt(currentAdminId)}
                          >
                            <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4 mr-1.5" />
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* FORM MODAL (Create & Update) */}
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
              {currentAdmin ? 'Edit Admin' : 'Tambah Admin Baru'}
            </h3>

            <form onSubmit={handleSaveAdmin} className="space-y-4">
              <Input
                label="Nama Admin"
                placeholder="Contoh: John Doe"
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                required
              />

              <Input
                label="Username"
                placeholder="Contoh: johndoe"
                value={formData.username}
                onChange={(e) => handleFieldChange('username', e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder={currentAdmin ? 'Biarkan kosong jika tidak ingin mengubah password' : 'Masukkan password'}
                value={formData.password}
                onChange={(e) => handleFieldChange('password', e.target.value)}
                required={!currentAdmin}
              />

              <Select
                label="Role"
                options={[
                  { value: 'admin', label: 'Admin (Akses Dashboard & Verifikasi)' },
                  { value: 'superadmin', label: 'Super Admin (Akses Penuh + CRUD)' }
                ]}
                value={formData.role}
                onChange={(e) => handleFieldChange('role', e.target.value)}
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
                  Simpan Admin
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
              Konfirmasi Hapus Admin
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-400 mb-6">
              Apakah Anda yakin ingin menghapus admin ini permanen? Tindakan ini tidak dapat dibatalkan.
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
                onClick={handleDeleteAdmin}
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

export default CrudAdminPage;
