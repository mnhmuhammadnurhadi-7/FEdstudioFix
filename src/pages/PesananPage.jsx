import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import OrderStepper from '../components/pesanan/OrderStepper';
import StepDataFoto from '../components/pesanan/StepDataFoto';
import StepKonfirmasi from '../components/pesanan/StepKonfirmasi';
import StepPembayaran from '../components/pesanan/StepPembayaran';
import StepSelesai from '../components/pesanan/StepSelesai';
import Toast from '../components/ui/Toast';
import { fallbackServices } from '../data/services';
import { generateTicketCode } from '../lib/helpers';
import axiosInstance from '../lib/axios';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE = 'service_ywl4yys';
const EMAILJS_TEMPLATE = 'template_w2k2iba';
const EMAILJS_PUBLIC_KEY = 'rHQIx6xCzj5EtCU8c';

const PesananPage = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketCode, setTicketCode] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [services, setServices] = useState(fallbackServices);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    service_id: '',
    photo_link: '',
    notes: '',
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const sendTicketEmail = async (ticketCode) => {
    const selectedServiceForEmail = services.find((s) => String(s.id) === String(formData.service_id)) || fallbackServices.find((s) => String(s.id) === String(formData.service_id));
    return emailjs.send(
      EMAILJS_SERVICE,
      EMAILJS_TEMPLATE,
      {
        to_email: formData.email,
        reply_to: formData.email,
        customer_email: formData.email,
        customer_name: formData.name,
        ticket_code: ticketCode,
        whatsapp_number: formData.whatsapp,
        service_name: selectedServiceForEmail?.name || '',
        photo_link: formData.photo_link,
        notes: formData.notes || '',
        order_summary: `Layanan: ${selectedServiceForEmail?.name || 'Pas Foto Custom'}\nNomor WA: ${formData.whatsapp}\nLink foto: ${formData.photo_link}`,
      },
      EMAILJS_PUBLIC_KEY
    );
  };

  // Fetch services from backend API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get('/services');
        // Map backend fields to frontend expected format
        const mappedServices = response.data.map(service => ({
          id: service.id_layanan,
          name: service.nama_layanan,
          price: service.harga,
          description: service.deskripsi || '',
          bgSpec: 'Latar Belakang Solid',
          duration: '1-24 Jam',
          slug: service.nama_layanan.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
          specs: ['Pemberian aksesoris pakaian digital rapi', 'Penyesuaian latar belakang solid', 'Retouching wajah alami'],
          sampleBefore: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
          sampleAfter: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
        }));
        setServices(mappedServices);
      } catch (error) {
        console.warn('API Services fetch failed, using fallback: ', error.message);
        // Keep fallback services if API fails
      }
    };
    fetchServices();
  }, []);

  // Pre-select service from URL param if available
  useEffect(() => {
    const serviceId = searchParams.get('serviceId');
    if (serviceId) {
      const match = services.find((s) => s.id === serviceId);
      if (match) {
        setFormData((prev) => ({ ...prev, service_id: match.id }));
      }
    }
  }, [searchParams, services]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Validasi Google Drive / Dropbox link
  const isValidPhotoLink = (url) => {
    try {
      const parsed = new URL(url);
      const validHosts = [
        'drive.google.com',
        'docs.google.com',
        'photos.google.com',
        'drive.usercontent.google.com',
        'www.dropbox.com',
        'dropbox.com',
      ];
      return validHosts.some(h => parsed.hostname === h || parsed.hostname.endsWith('.' + h));
    } catch {
      return false;
    }
  };

  // Validasi nomor telepon Indonesia
  const isValidPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    // Harus mulai dengan 08, 62, atau +62, dan panjang 9-13 digit
    return /^(08|628|62)\d{7,11}$/.test(cleaned) || /^\+?628\d{7,11}$/.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else if (!isValidPhoneNumber(formData.whatsapp)) {
      newErrors.whatsapp = 'Nomor WhatsApp tidak valid. Contoh: 08123456789 atau +628123456789';
    }
    if (!formData.service_id) newErrors.service_id = 'Pilih jenis pas foto';
    if (!formData.photo_link.trim()) {
      newErrors.photo_link = 'Link foto Google Drive wajib diisi';
    } else if (!isValidPhotoLink(formData.photo_link)) {
      newErrors.photo_link = 'Hanya link Google Drive / Google Photos / Dropbox yang diterima';
    }
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'Anda harus menyetujui kebijakan privasi untuk melanjutkan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setToastMessage({
        type: 'error',
        text: 'Silakan lengkapi formulir dengan benar.',
      });
    }
  };

  const handleBackStep = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 → 3 (ke halaman pembayaran)
  const handleGoToPayment = () => {
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3 → 4 (konfirmasi bayar & submit order)
  const handleSubmitOrder = async () => {
    setIsLoading(true);

    const payload = {
      name: formData.name,
      phone: formData.whatsapp,
      service_id: formData.service_id,
      notes: formData.notes,
      photo_link: formData.photo_link,
    };

    try {
      const response = await axiosInstance.post('/order/step-3', payload);
      const ticketId = response.data.ticket_id;
      setTicketCode(ticketId);

      try {
        await sendTicketEmail(ticketId);
        setToastMessage({
          type: 'success',
          text: 'Pesanan berhasil terdaftar dan email tiket terkirim.',
        });
      } catch (emailError) {
        console.warn('EmailJS send failed: ', emailError.message);
        setToastMessage({
          type: 'warning',
          text: 'Pesanan berhasil, tetapi email tiket gagal dikirim.',
        });
      }

      setStep(4);
    } catch (error) {
      console.warn('API POST failed, running offline fallback mode: ', error.message);
      const generatedTicket = generateTicketCode(formData.whatsapp);
      setTicketCode(generatedTicket);

      const currentOrders = JSON.parse(localStorage.getItem('local_orders') || '[]');
      const selectedService = services.find(s => s.id === formData.service_id);
      currentOrders.push({
        id: Math.floor(Math.random() * 10000),
        ticket_code: generatedTicket,
        customer_name: formData.name,
        email: formData.email,
        whatsapp_number: formData.whatsapp,
        service_id: formData.service_id,
        service_name: selectedService?.name || 'Pas Foto Custom',
        raw_photo_link: formData.photo_link,
        notes: formData.notes,
        total_bayar: selectedService?.price || 0,
        status: 'PENDING_PAYMENT',
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('local_orders', JSON.stringify(currentOrders));

      try {
        await sendTicketEmail(generatedTicket);
        setToastMessage({
          type: 'success',
          text: 'Pesanan berhasil disimpan lokal dan email tiket terkirim.',
        });
      } catch (emailError) {
        console.warn('EmailJS send failed in fallback mode: ', emailError.message);
        setToastMessage({
          type: 'warning',
          text: 'Pesanan disimpan lokal, tetapi email tiket gagal dikirim.',
        });
      }

      setStep(4);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedService = services.find((s) => String(s.id) === String(formData.service_id)) || fallbackServices.find((s) => String(s.id) === String(formData.service_id));

  return (
    <div className="min-h-screen bg-white">
      {/* Page Hero */}
      <PageHero
        badge="Buat Pesanan"
        title="Upload Foto, Kami yang Urus Sisanya"
        subtitle="Isi formulir pesanan di bawah ini. Proses edit pas foto Anda selesai dalam waktu kurang dari 24 jam!"
      />

      {/* Stepper indicator */}
      <OrderStepper currentStep={step} />

      {/* Render Steps */}
      {step === 1 && (
        <StepDataFoto
          formData={formData}
          errors={errors}
          services={services}
          onChange={handleFieldChange}
          onNext={handleNextStep}
        />
      )}

      {step === 2 && (
        <StepKonfirmasi
          formData={formData}
          selectedService={selectedService}
          isLoading={isLoading}
          onBack={handleBackStep}
          onSubmit={handleGoToPayment}
        />
      )}

      {step === 3 && (
        <StepPembayaran
          selectedService={selectedService}
          isLoading={isLoading}
          onBack={handleBackStep}
          onPaid={handleSubmitOrder}
        />
      )}

      {step === 4 && (
        <StepSelesai
          ticketCode={ticketCode}
          whatsapp={formData.whatsapp}
        />
      )}

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

export default PesananPage;
