import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import TicketInput from '../components/cek-status/TicketInput';
import StatusProgress from '../components/cek-status/StatusProgress';
import OrderDetail from '../components/cek-status/OrderDetail';
import Toast from '../components/ui/Toast';
import Button from '../components/ui/Button';
import axiosInstance from '../lib/axios';

const CekStatusPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentTicket, setCurrentTicket] = useState('');

  const handleSearchTicket = async (ticketCode) => {
    setIsLoading(true);
    setOrder(null);
    setCurrentTicket(ticketCode);
    
    // Set query params so the URL updates
    setSearchParams({ ticket: ticketCode });

    // Try API call
    try {
      const response = await axiosInstance.post('/order/status', { ticket_id: ticketCode });
      // Map backend fields to frontend expected format
      const mappedOrder = {
        ticket_code: response.data.kode_tiket,
        customer_name: response.data.nama_pelanggan,
        whatsapp_number: response.data.no_wa,
        email: response.data.email || '-',
        service_name: response.data.layanan?.nama_layanan || 'Pas Foto',
        raw_photo_link: response.data.link_foto_mentah,
        finished_photo_link: response.data.link_foto_hasil,
        notes: response.data.catatan,
        total_bayar: response.data.total_bayar,
        status: (response.data.keterangan_status?.toLowerCase() === 'revisi' ? 'REVISI' : response.data.status_pesanan?.toUpperCase()) || 'PENDING',
        created_at: response.data.created_at,
        rating: response.data.rating?.nilai_rating || null,
        ulasan: response.data.rating?.ulasan || '',
      };
      setOrder(mappedOrder);
      setToastMessage({
        type: 'success',
        text: 'Data pesanan berhasil ditemukan dari server.',
      });
    } catch (error) {
      console.warn('API status query failed, running fallbacks: ', error.message);
      
      // Fallback 1: Local Storage search
      const localOrders = JSON.parse(localStorage.getItem('local_orders') || '[]');
      const localMatch = localOrders.find((o) => o.ticket_code === ticketCode);
      
      if (localMatch) {
        setOrder(localMatch);
        setToastMessage({
          type: 'info',
          text: 'Data ditemukan di penyimpanan lokal (Offline Mode).',
        });
        setCurrentTicket(ticketCode);
        setIsLoading(false);
        return;
      }

      // Fallback 2: Demo Mock Ticket codes
      const mockOrderTemplate = {
        ticket_code: ticketCode,
        customer_name: 'Rizky Pratama',
        whatsapp_number: '087766086204',
        email: 'rizky.pratama@student.ub.ac.id',
        service_name: 'Pas Foto KTM (Kartu Tanda Mahasiswa)',
        raw_photo_link: 'https://drive.google.com/file/d/demo-raw-file',
        finished_photo_link: 'https://drive.google.com/file/d/demo-finished-file',
        notes: 'Almamater Universitas Brawijaya warna biru laut. Latar belakang merah terang.',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
      };

      if (ticketCode === 'DST-DEMO-PENDING') {
        setOrder({ ...mockOrderTemplate, status: 'PENDING', rating: null, ulasan: '' });
      } else if (ticketCode === 'DST-DEMO-PROSES') {
        setOrder({ ...mockOrderTemplate, status: 'PROSES', rating: null, ulasan: '' });
      } else if (ticketCode === 'DST-DEMO-SELESAI') {
        setOrder({ ...mockOrderTemplate, status: 'SELESAI', rating: 4, ulasan: 'Hasil foto sangat rapi dan cepat.' });
      } else {
        // Not found at all
        setToastMessage({
          type: 'error',
          text: `Kode tiket "${ticketCode}" tidak terdaftar.`,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Autoload ticket code if present in URL query
  useEffect(() => {
    const ticketQuery = searchParams.get('ticket');
    if (ticketQuery) {
      handleSearchTicket(ticketQuery);
    }
  }, [searchParams]);

  // Handle download action without changing completed state
  const handleDownload = () => {
    if (order && ['SELESAI', 'REVISI', 'DIAMBIL'].includes(order.status?.toUpperCase())) {
      setToastMessage({
        type: 'success',
        text: 'Berkas berhasil diunduh. Status pesanan tetap menunjukkan hasil selesai.',
      });
    }
  };

  const initialTicketQuery = searchParams.get('ticket') || '';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      
      {/* Page Hero */}
      <PageHero
        badge="Lacak Progres"
        title="Lacak Status Pesanan Anda"
        subtitle="Masukkan kode tiket pelacakan Anda di bawah ini untuk melihat progres editing foto Anda secara real-time."
      />

      {/* Search Input */}
      <TicketInput
        initialValue={initialTicketQuery}
        isLoading={isLoading}
        onSearch={handleSearchTicket}
      />

      {order && (
        <div className="max-w-4xl mx-auto px-6 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Kode tiket: <span className="font-semibold text-slate-700 dark:text-slate-100">{order.ticket_code}</span>
          </div>
          <Button
            onClick={() => handleSearchTicket(currentTicket)}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            Perbarui Status
          </Button>
        </div>
      )}

      {/* Search Result display */}
      {order && (
        <div className="flex flex-col">
          <StatusProgress status={order.status} />
          <OrderDetail order={order} onDownload={handleDownload} onOrderUpdate={setOrder} />
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

export default CekStatusPage;
