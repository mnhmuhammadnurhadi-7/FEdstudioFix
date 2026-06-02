import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Toast from '../../components/ui/Toast';
import { formatDate } from '../../lib/helpers';
import axiosInstance from '../../lib/axios';
import PageHero from '../../components/layout/PageHero';
import { useAuth } from '../../context/AuthContext';

const PesananSelesaiPage = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const adminName = admin?.name || 'Administrator';
  const adminRole = admin?.role || 'ADMIN';

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on search query
    const result = orders.filter((ord) => {
      const matchesSearch =
        ord.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.ticket_code?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });

    // Sort: newest first
    result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setFilteredOrders(result);
  }, [orders, searchQuery]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/admin/orders/completed');
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
      console.warn('API fetch failed:', error.message);
      setToastMessage({
        type: 'error',
        text: 'Gagal memuat data pesanan selesai.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

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

  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            icon="solar:star-bold"
            className={`w-3.5 h-3.5 ${star <= rating ? 'text-amber-400' : 'text-slate-200'}`}
          />
        ))}
      </div>
    );
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
              Pesanan Selesai
            </h1>
            <p className="text-xs text-slate-400">
              Daftar pesanan yang sudah selesai dan diberi rating oleh pelanggan.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/admin/dashboard">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Icon icon="solar:arrow-left-linear" />
                Kembali ke Dashboard
              </Button>
            </Link>
            <Button variant="danger" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <Icon icon="solar:logout-bold" />
              Keluar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Selesai</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{orders.length}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Icon icon="solar:check-circle-bold" className="text-emerald-500 w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sudah Rating</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{orders.filter(o => o.rating).length}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Icon icon="solar:star-bold" className="text-amber-500 w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Rata-rata Rating</p>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100">
                  {orders.filter(o => o.rating).length > 0
                    ? (orders.filter(o => o.rating).reduce((acc, o) => acc + o.rating, 0) / orders.filter(o => o.rating).length).toFixed(1)
                    : '0.0'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                <Icon icon="solar:chart-bold" className="text-primary-500 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Icon icon="solar:document-list-bold" className="text-primary-500 w-5 h-5" />
              Daftar Pesanan Selesai
            </h3>
            <div className="relative flex-1 w-full md:w-96">
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
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-450">
              <svg className="animate-spin h-8 w-8 text-primary-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs font-semibold uppercase tracking-wider">Memuat data order...</span>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16 text-slate-450">
              <Icon icon="solar:folder-error-bold" className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">Tidak Ada Pesanan Selesai</h4>
              <p className="text-xs text-slate-400">Belum ada pesanan yang selesai dan diberi rating.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-zinc-850 border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4.5">ID Tiket</th>
                  <th className="px-6 py-4.5">Customer / Kontak</th>
                  <th className="px-6 py-4.5">Jenis Layanan</th>
                  <th className="px-6 py-4.5">Admin</th>
                  <th className="px-6 py-4.5">Rating</th>
                  <th className="px-6 py-4.5">Ulasan</th>
                  <th className="px-6 py-4.5">Status</th>
                  <th className="px-6 py-4.5">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80 text-xs">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id || ord.ticket_code} className="hover:bg-slate-50/40 dark:hover:bg-zinc-850/20 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-800 dark:text-slate-100 select-all">
                      #{ord.ticket_code}
                    </td>
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
                    <td className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-350">
                      {ord.service_name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-600 dark:text-slate-350">
                        {ord.admin_name || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {ord.rating ? (
                        <div className="flex items-center gap-1">
                          {renderStars(ord.rating)}
                          <span className="font-bold text-slate-800 dark:text-slate-200 ml-1">{ord.rating}/5</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[10px]">Belum rating</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600 dark:text-slate-350 max-w-[200px] truncate block" title={ord.ulasan}>
                        {ord.ulasan || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusBadgeVariant(ord.status)}>
                        {ord.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {formatDate(ord.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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

export default PesananSelesaiPage;
