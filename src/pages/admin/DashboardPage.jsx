import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Toast from '../../components/ui/Toast';
import { formatDate } from '../../lib/helpers';
import axiosInstance from '../../lib/axios';
import { useAuth } from '../../context/AuthContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const adminName = admin?.name || 'Administrator';
  const adminRole = admin?.role || 'ADMIN';
  
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [pendingOrderId, setPendingOrderId] = useState(null);
  const [pendingTargetStatus, setPendingTargetStatus] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  // Mock seed data for offline dashboard fallback
  const mockSeedOrders = [
    {
      id: 101,
      ticket_code: 'DST1716912345089',
      customer_name: 'Faisal Ahmad',
      whatsapp_number: '08123456789',
      email: 'faisal@student.ub.ac.id',
      service_name: 'Pas Foto KTM (Kartu Tanda Mahasiswa)',
      raw_photo_link: 'https://drive.google.com/file/d/raw-faisal',
      finished_photo_link: 'https://drive.google.com/file/d/finished-faisal',
      notes: 'Almamater Universitas Brawijaya, Fakultas Ilmu Komputer. Background biru.',
      status: 'PENDING',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hrs ago
    },
    {
      id: 102,
      ticket_code: 'DST1716912388112',
      customer_name: 'Nabila Putri',
      whatsapp_number: '087788990011',
      email: 'nabila@gmail.com',
      service_name: 'Pas Foto CPNS & BUMN',
      raw_photo_link: 'https://drive.google.com/file/d/raw-nabila',
      finished_photo_link: 'https://drive.google.com/file/d/finished-nabila',
      notes: 'Pakai kemeja putih + dasi hitam digital. Latar belakang merah SSCASN.',
      status: 'PROSES',
      created_at: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hrs ago
    },
    {
      id: 103,
      ticket_code: 'DST1716912499554',
      customer_name: 'Rian Hidayat',
      whatsapp_number: '085522334455',
      email: 'rian@outlook.com',
      service_name: 'Pas Foto KTP & Kartu Identitas',
      raw_photo_link: 'https://drive.google.com/file/d/raw-rian',
      finished_photo_link: 'https://drive.google.com/file/d/finished-rian',
      notes: 'Lahir ganjil (background merah). Harap hilangkan noda jerawat di dahi.',
      status: 'SELESAI',
      created_at: new Date(Date.now() - 3600000 * 26).toISOString(), // 26 hrs ago
    },
    {
      id: 104,
      ticket_code: 'DST1716912999002',
      customer_name: 'Jessica Chelsea',
      whatsapp_number: '082211443366',
      email: 'jessica@visa-docs.com',
      service_name: 'Pas Foto Visa & Paspor Resmi',
      raw_photo_link: 'https://drive.google.com/file/d/raw-jessica',
      finished_photo_link: 'https://drive.google.com/file/d/finished-jessica',
      notes: 'Ukuran 5x5 cm untuk Visa US. Background putih bersih tanpa bayangan.',
      status: 'DIAMBIL',
      created_at: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    }
  ];

  // Fetch orders from API or local storage fallback
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/admin/orders');
      // Map backend fields to frontend expected format
      const mappedOrders = response.data.orders.map(order => ({
        id: order.id_pesanan,
        ticket_code: order.kode_tiket,
        customer_name: order.nama_pelanggan,
        whatsapp_number: order.no_wa || '-',
        email: order.email || '-',
        service_name: order.layanan?.nama_layanan || 'Unknown',
        raw_photo_link: order.link_foto_mentah || '#',
        finished_photo_link: order.link_foto_hasil || '#',
        notes: order.catatan || '',
        total_bayar: order.total_bayar || 0,
        status: (order.keterangan_status?.toLowerCase() === 'revisi' ? 'REVISI' : order.status_pesanan?.toUpperCase()) || 'PENDING',
        keterangan_status: order.keterangan_status,
        admin_name: order.admin?.nama_admin || order.adminUpdatedBy?.nama_admin || '-',
        rating: order.rating?.nilai_rating || null,
        ulasan: order.rating?.ulasan || null,
        created_at: order.created_at,
      }));
      setOrders(mappedOrders);
    } catch (error) {
      console.warn('Admin API fetch failed, loading localStorage fallback: ', error.message);
      
      // Load local orders. If empty, seed it first.
      let localOrders = JSON.parse(localStorage.getItem('local_orders') || '[]');
      if (localOrders.length === 0) {
        localStorage.setItem('local_orders', JSON.stringify(mockSeedOrders));
        localOrders = mockSeedOrders;
      }
      setOrders(localOrders);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = [...orders];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.customer_name.toLowerCase().includes(query) ||
          o.ticket_code.toLowerCase().includes(query) ||
          o.whatsapp_number.includes(query)
      );
    }

    if (statusFilter !== 'ALL') {
      // Map frontend filter to backend status
      const statusMap = {
        'PENDING': 'TERKIRIM',
        'PROSES': 'DIPROSES',
        'SELESAI': 'SELESAI',
        'REVISI': 'REVISI',
        'DIAMBIL': 'SELESAI',
      };
      result = result.filter((o) => o.status === statusMap[statusFilter] || o.status === statusFilter);
    }

    // Sort: newest first
    result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setFilteredOrders(result);
  }, [orders, searchQuery, statusFilter]);

  // Update status (Pending -> Proses -> Selesai/Revisi)
  const handleUpdateStatus = async (orderId, currentStatus, targetStatus) => {
    // If target is 'selesai', show URL input modal
    if (targetStatus === 'selesai') {
      setPendingOrderId(orderId);
      setPendingTargetStatus(targetStatus);
      setUrlInput('');
      setShowUrlModal(true);
      return;
    }

    let nextStatus = targetStatus;
    let nextFrontendStatus = targetStatus.toUpperCase();

    setActionLoadingId(orderId);

    try {
      // PATCH /api/admin/orders/${id}/status
      await axiosInstance.patch(`/admin/orders/${orderId}/status`, { status: nextStatus });

      setToastMessage({
        type: 'success',
        text: `Status order #${orderId} sukses diubah ke ${nextFrontendStatus}!`,
      });
      fetchOrders();
    } catch (error) {
      console.warn('API PATCH status failed, running offline update: ', error.message);

      // Local storage update fallback
      const localOrders = JSON.parse(localStorage.getItem('local_orders') || '[]');
      const index = localOrders.findIndex((o) => o.id === orderId || o.ticket_code === orderId);
      if (index !== -1) {
        localOrders[index].status = nextFrontendStatus;
        // Seed finished drive url if completed
        if (nextStatus === 'selesai' || nextStatus === 'revisi') {
          localOrders[index].finished_photo_link = 'https://drive.google.com/file/d/finished-demo';
        }
        localStorage.setItem('local_orders', JSON.stringify(localOrders));

        setToastMessage({
          type: 'success',
          text: `Offline update: Status order #${orderId} sukses diubah!`,
        });
        fetchOrders();
      }
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleConfirmUrlSubmit = async () => {
    if (!urlInput.trim()) {
      setToastMessage({
        type: 'error',
        text: 'URL Drive hasil tidak boleh kosong!',
      });
      return;
    }

    setActionLoadingId(pendingOrderId);

    try {
      // PATCH /api/admin/orders/${id}/status with finished_photo_link
      await axiosInstance.patch(`/admin/orders/${pendingOrderId}/status`, {
        status: pendingTargetStatus,
        finished_photo_link: urlInput.trim(),
      });

      setToastMessage({
        type: 'success',
        text: `Status order #${pendingOrderId} sukses diubah ke SELESAI!`,
      });
      setShowUrlModal(false);
      setUrlInput('');
      setPendingOrderId(null);
      setPendingTargetStatus(null);
      fetchOrders();
    } catch (error) {
      console.warn('API PATCH status failed, running offline update: ', error.message);

      // Local storage update fallback
      const localOrders = JSON.parse(localStorage.getItem('local_orders') || '[]');
      const index = localOrders.findIndex((o) => o.id === pendingOrderId || o.ticket_code === pendingOrderId);
      if (index !== -1) {
        localOrders[index].status = 'SELESAI';
        localOrders[index].finished_photo_link = urlInput.trim();
        localStorage.setItem('local_orders', JSON.stringify(localOrders));

        setToastMessage({
          type: 'success',
          text: `Offline update: Status order #${pendingOrderId} sukses diubah!`,
        });
        setShowUrlModal(false);
        setUrlInput('');
        setPendingOrderId(null);
        setPendingTargetStatus(null);
        fetchOrders();
      }
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const openDeleteConfirm = (orderId) => {
    setDeleteOrderId(orderId);
    setShowDeleteModal(true);
  };

  const handleDeleteOrder = async () => {
    setActionLoadingId(deleteOrderId);
    try {
      await axiosInstance.delete(`/admin/orders/${deleteOrderId}`);
      setToastMessage({
        type: 'success',
        text: `Order #${deleteOrderId} berhasil dihapus!`,
      });
      setShowDeleteModal(false);
      setDeleteOrderId(null);
      fetchOrders();
    } catch (error) {
      console.warn('API DELETE order failed, deleting from local storage: ', error.message);
      
      const localOrders = JSON.parse(localStorage.getItem('local_orders') || '[]');
      const filtered = localOrders.filter((o) => o.id !== deleteOrderId && o.ticket_code !== deleteOrderId);
      localStorage.setItem('local_orders', JSON.stringify(filtered));
      
      setToastMessage({
        type: 'success',
        text: `Offline: Order #${deleteOrderId} berhasil dihapus!`,
      });
      setShowDeleteModal(false);
      setDeleteOrderId(null);
      fetchOrders();
    } finally {
      setActionLoadingId(null);
    }
  };

  // Compute metrics dynamically
  const totalCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === 'PENDING' || o.status === 'TERKIRIM').length;
  const prosesCount = orders.filter((o) => o.status === 'PROSES' || o.status === 'DIPROSES').length;
  const selesaiCount = orders.filter((o) => o.status === 'SELESAI').length;
  const revisiCount = orders.filter((o) => o.status === 'REVISI').length;

  const getStatusBadgeVariant = (status) => {
    const statusUpper = status?.toUpperCase();
    switch (statusUpper) {
      case 'PENDING':
      case 'TERKIRIM': return 'warning';
      case 'PROSES':
      case 'DIPROSES': return 'info';
      case 'SELESAI': return 'success';
      case 'REVISI': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Dashboard Header Banner */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sistem Aktif • Otoritas {adminRole}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none mb-1">
              Selamat Datang, {adminName}
            </h1>
            <p className="text-xs text-slate-400">
              Kelola verifikasi, proses retouching, dan serah terima file edit foto pelanggan.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/admin/completed">
              <Button variant="primary" size="sm" className="flex items-center gap-2">
                <Icon icon="solar:check-circle-bold" className="text-white" />
                Pesanan Selesai
              </Button>
            </Link>
            {adminRole === 'SUPER_ADMIN' && (
              <>
                <Link to="/admin/services">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Icon icon="solar:suitcase-tag-bold" className="text-primary-500" />
                    Kelola Layanan
                  </Button>
                </Link>
                <Link to="/admin/admins">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Icon icon="solar:users-group-rounded-bold" className="text-primary-500" />
                    Kelola Admin
                  </Button>
                </Link>
                <Link to="/admin/cms">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Icon icon="solar:document-text-bold" className="text-primary-500" />
                    Kelola CMS
                  </Button>
                </Link>
              </>
            )}
            <Button variant="danger" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <Icon icon="solar:logout-bold" />
              Keluar
            </Button>
          </div>
        </div>

        {/* 4 Summary Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Order', value: totalCount, icon: 'solar:box-bold-duotone', color: 'text-slate-500 bg-slate-100' },
            { label: 'Pending (Antrean)', value: pendingCount, icon: 'solar:hourglass-bold-duotone', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
            { label: 'Sedang Proses', value: prosesCount, icon: 'solar:magic-stick-bold-duotone', color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/20' },
            { label: 'Selesai & Diambil', value: selesaiCount, icon: 'solar:file-check-bold-duotone', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' },
          ].map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-3xl p-5 shadow-sm flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {card.label}
                </span>
                <span className="text-3xl font-black text-slate-800 dark:text-slate-100 leading-none">
                  {card.value}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.color}`}>
                <Icon icon={card.icon} className="w-6 h-6 text-current" />
              </div>
            </div>
          ))}
        </div>

        {/* Table Filters and Search Section */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-6 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Icon icon="solar:magnifer-bold" className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Cari berdasarkan nama customer atau kode tiket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 focus:border-primary-500 focus:bg-white rounded-full focus:outline-none transition-colors text-slate-800 dark:text-slate-100 placeholder-slate-400"
            />
          </div>
          {/* Filter Status select */}
          <div className="w-full md:w-56 flex items-center gap-2">
            <label htmlFor="filter-select" className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0">Status:</label>
            <select
              id="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 text-xs bg-slate-50 dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 rounded-full focus:outline-none focus:border-primary-500 text-slate-800 dark:text-slate-150 font-bold"
            >
              <option value="ALL">Semua Status</option>
              <option value="PENDING">Pending (Antrean)</option>
              <option value="PROSES">Sedang Proses</option>
              <option value="SELESAI">Selesai</option>
              <option value="REVISI">Revisi</option>
              <option value="DIAMBIL">Sudah Diambil</option>
            </select>
          </div>
        </div>

        {/* Responsive Orders Table */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] shadow-sm overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                <svg className="animate-spin h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wider">Memuat data order...</span>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-16 text-slate-450">
                <Icon icon="solar:folder-error-bold" className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">Tidak Ada Pesanan</h4>
                <p className="text-xs text-slate-400">Tidak ada data order yang cocok dengan pencarian.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 dark:bg-zinc-850 border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4.5">ID Tiket</th>
                    <th className="px-6 py-4.5">Customer / Kontak</th>
                    <th className="px-6 py-4.5">Jenis Layanan</th>
                    <th className="px-6 py-4.5">Mentah (GDrive)</th>
                    <th className="px-6 py-4.5">Admin</th>
                    <th className="px-6 py-4.5">Rating</th>
                    <th className="px-6 py-4.5">Status</th>
                    <th className="px-6 py-4.5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80 text-xs">
                  {filteredOrders.map((ord) => {
                    const isActionLoading = actionLoadingId === ord.id || actionLoadingId === ord.ticket_code;
                    const canProses = ord.status === 'PENDING' || ord.status === 'TERKIRIM';
                    const canSelesai = ord.status === 'PROSES' || ord.status === 'DIPROSES';
                    const canRevisi = ord.status === 'SELESAI' || ord.status === 'REVISI';
                    const isSelesaiFix = ord.status === 'SELESAI';
                    
                    return (
                      <tr key={ord.id || ord.ticket_code} className="hover:bg-slate-50/40 dark:hover:bg-zinc-850/20 transition-colors">
                        {/* Ticket Code */}
                        <td className="px-6 py-4 font-black text-slate-800 dark:text-slate-100 select-all">
                          #{ord.ticket_code}
                          <span className="block text-[9px] font-semibold text-slate-400 mt-1">
                            {formatDate(ord.created_at)}
                          </span>
                        </td>
                        
                        {/* Customer & Whatsapp */}
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-800 dark:text-slate-200 block">{ord.customer_name}</span>
                          <a 
                            href={`https://wa.me/${ord.whatsapp_number.replace(/\D/g, '')}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[10px] font-semibold text-primary-500 hover:underline inline-flex items-center gap-1 mt-0.5"
                          >
                            <Icon icon="bi:whatsapp" />
                            {ord.whatsapp_number}
                          </a>
                        </td>
                        
                        {/* Service Type */}
                        <td className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-350">
                          {ord.service_name}
                        </td>
                        
                        {/* Link Google Drive */}
                        <td className="px-6 py-4">
                          <a 
                            href={ord.raw_photo_link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="inline-flex items-center gap-1 text-primary-500 font-bold hover:underline"
                          >
                            <Icon icon="logos:google-drive" className="w-4 h-4" />
                            Buka Drive
                          </a>
                        </td>

                        {/* Admin */}
                        <td className="px-6 py-4">
                          <span className="font-semibold text-slate-600 dark:text-slate-350">
                            {ord.admin_name || '-'}
                          </span>
                        </td>

                        {/* Rating */}
                        <td className="px-6 py-4">
                          {ord.rating ? (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                <Icon icon="solar:star-bold" className="w-4 h-4 text-amber-400" />
                                <span className="font-bold text-slate-800 dark:text-slate-200">{ord.rating}/5</span>
                              </div>
                              {ord.ulasan && (
                                <span className="text-[9px] text-slate-400 truncate max-w-[150px]" title={ord.ulasan}>
                                  {ord.ulasan}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[10px]">Belum rating</span>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td className="px-6 py-4">
                          <Badge variant={getStatusBadgeVariant(ord.status)}>
                            {ord.status}
                          </Badge>
                        </td>
                        
                        {/* Actions Quick buttons */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {canProses && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="primary" 
                                  className="bg-sky-500 hover:bg-sky-600 text-xs px-3.5 py-1.5 focus:ring-sky-500"
                                  onClick={() => handleUpdateStatus(ord.id || ord.ticket_code, ord.status, 'diproses')}
                                  isLoading={isActionLoading}
                                >
                                  Proses Foto
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="danger" 
                                  className="bg-rose-50 hover:bg-rose-100 hover:text-rose-600 text-rose-500 border border-rose-150/40 text-xs px-2.5 py-1.5 shadow-none"
                                  onClick={() => openDeleteConfirm(ord.id || ord.ticket_code)}
                                  isLoading={isActionLoading}
                                >
                                  <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            {canSelesai && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="primary" 
                                  className="bg-emerald-500 hover:bg-emerald-600 text-xs px-3.5 py-1.5 focus:ring-emerald-500"
                                  onClick={() => handleUpdateStatus(ord.id || ord.ticket_code, ord.status, 'selesai')}
                                  isLoading={isActionLoading}
                                >
                                  Tandai Selesai
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="warning" 
                                  className="bg-amber-500 hover:bg-amber-600 text-xs px-3.5 py-1.5 focus:ring-amber-500"
                                  onClick={() => handleUpdateStatus(ord.id || ord.ticket_code, ord.status, 'revisi')}
                                  isLoading={isActionLoading}
                                >
                                  Revisi
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="danger" 
                                  className="bg-rose-50 hover:bg-rose-100 hover:text-rose-600 text-rose-500 border border-rose-150/40 text-xs px-2.5 py-1.5 shadow-none"
                                  onClick={() => openDeleteConfirm(ord.id || ord.ticket_code)}
                                  isLoading={isActionLoading}
                                >
                                  <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            {canRevisi && (
                              <>
                                {isSelesaiFix && (
                                  <Button 
                                    size="sm" 
                                    variant="warning" 
                                    className="bg-amber-500 hover:bg-amber-600 text-xs px-3.5 py-1.5 focus:ring-amber-500"
                                    onClick={() => handleUpdateStatus(ord.id || ord.ticket_code, ord.status, 'revisi')}
                                    isLoading={isActionLoading}
                                  >
                                    Revisi
                                  </Button>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="primary" 
                                  className="bg-emerald-500 hover:bg-emerald-600 text-xs px-3.5 py-1.5 focus:ring-emerald-500"
                                  onClick={() => handleUpdateStatus(ord.id || ord.ticket_code, ord.status, 'selesai')}
                                  isLoading={isActionLoading}
                                >
                                  Tandai Selesai
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="danger" 
                                  className="bg-rose-50 hover:bg-rose-100 hover:text-rose-600 text-rose-500 border border-rose-150/40 text-xs px-2.5 py-1.5 shadow-none"
                                  onClick={() => openDeleteConfirm(ord.id || ord.ticket_code)}
                                  isLoading={isActionLoading}
                                >
                                  <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            {!canProses && !canSelesai && !canRevisi && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="danger" 
                                  className="bg-rose-50 hover:bg-rose-100 hover:text-rose-600 text-rose-500 border border-rose-150/40 text-xs px-2.5 py-1.5 shadow-none"
                                  onClick={() => openDeleteConfirm(ord.id || ord.ticket_code)}
                                  isLoading={isActionLoading}
                                >
                                  <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
                                </Button>
                                
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-sm shadow-xl text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-center justify-center text-rose-500 mb-4 shadow-sm">
              <Icon icon="solar:trash-bin-trash-bold" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
              Konfirmasi Hapus Order
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Apakah Anda yakin ingin menghapus order #{deleteOrderId} permanen? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteOrderId(null);
                }}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteOrder}
                isLoading={actionLoadingId !== null}
                className="flex-1 shadow-md shadow-rose-500/10"
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* URL Input Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
              Masukkan URL Drive Hasil
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Silakan masukkan link Google Drive berkas foto hasil edit untuk menyelesaikan pesanan ini.
            </p>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:border-primary-500 focus:outline-none text-slate-800 dark:text-slate-100 mb-4"
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowUrlModal(false);
                  setUrlInput('');
                  setPendingOrderId(null);
                  setPendingTargetStatus(null);
                }}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                onClick={handleConfirmUrlSubmit}
                isLoading={actionLoadingId !== null}
                className="flex-1"
              >
                Konfirmasi
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

export default DashboardPage;
