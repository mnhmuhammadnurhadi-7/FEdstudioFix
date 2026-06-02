import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import Button from '../components/ui/Button';
import BeforeAfterCard from '../components/layanan/BeforeAfterCard';
import { fallbackServices } from '../data/services';
import { formatRupiah } from '../lib/helpers';
import axiosInstance from '../lib/axios';
import ktm1 from '../assets/before-after/ktm1.png';
import ktm2 from '../assets/before-after/ktm2.png';
import jas1 from '../assets/before-after/jas1.png';
import jas2 from '../assets/before-after/jas2.png';
import visa1 from '../assets/before-after/visa1.png';
import visa2 from '../assets/before-after/visa2.png';

const LayananPage = () => {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState(fallbackServices);
  const [selectedService, setSelectedService] = useState(fallbackServices[0]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/services');
      // Map backend fields to frontend expected format
      const mappedServices = response.data.map(service => ({
        id: service.id_layanan,
        name: service.nama_layanan,
        price: service.harga,
        description: service.deskripsi || '',
        bgSpec: 'Latar Belakang Solid', // Default value since backend doesn't have this
        duration: '1-24 Jam', // Default value since backend doesn't have this
        slug: service.nama_layanan.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        specs: ['Pemberian aksesoris pakaian digital rapi', 'Penyesuaian latar belakang solid', 'Retouching wajah alami'],
        sampleBefore: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
        sampleAfter: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
      }));
      setServices(mappedServices);
      if (!selectedService || mappedServices.length > 0) {
        setSelectedService(mappedServices[0]);
      }
    } catch (error) {
      console.warn('API Services fetch failed, using fallback: ', error.message);
      // Keep fallback services if API fails
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const slug = searchParams.get('slug');
    if (slug) {
      const match = services.find((s) => s.slug === slug);
      if (match) {
        setSelectedService(match);
      }
    }
  }, [searchParams, services]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <PageHero
        badge="Katalog Layanan"
        title="Semua Kebutuhan Pas Foto Formal Anda, Kami Sediakan"
        subtitle="Dapatkan pas foto berkualitas tinggi dengan proses cepat. Siap digunakan untuk cetak maupun kebutuhan digital."
      />

      <main className="max-w-7xl mx-auto px-6 pb-20 space-y-14">
        <section>
          <div className="space-y-8">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-500">
                Contoh Hasil Layanan
              </span>
              <h2 className="mt-4 text-3xl font-black text-slate-900 dark:text-slate-100">
                Contoh Berapa Hasil Layanan Kami
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <BeforeAfterCard
                beforeImage={ktm1}
                afterImage={ktm2}
                label="PAS FOTO KTM"
              />
              <BeforeAfterCard
                beforeImage={jas1}
                afterImage={jas2}
                label="PAS FOTO JAS HITAM"
              />
              <BeforeAfterCard
                beforeImage={visa1}
                afterImage={visa2}
                label="PAS FOTO VISA"
              />
              <BeforeAfterCard
                beforeImage={ktm1}
                afterImage={ktm2}
                label="PAS FOTO KTP"
              />
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-500">
              Menu Layanan
            </span>
            <h2 className="mt-4 text-3xl font-black text-slate-900 dark:text-slate-100">
              Pilih Layanan Foto yang Kamu Butuhkan
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.id}
                className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800/70 dark:bg-zinc-950"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                    {service.name}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {service.description}
                  </p>

                  <div className="pt-4 border-t border-slate-200 dark:border-zinc-800">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400 mb-2">
                      Harga
                    </p>
                    <p className="text-2xl font-black text-primary-600 dark:text-primary-400 mb-4">
                      {formatRupiah(service.price)}
                    </p>
                    <Link to={`/pesanan?serviceId=${service.id}`}>
                      <Button size="md" className="w-full shadow-lg shadow-primary-500/10">
                        Pesan Sekarang
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LayananPage;
