import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import HeroSection from '../components/beranda/HeroSection';
import StatsSection from '../components/beranda/StatsSection';
import PortfolioMarquee from '../components/beranda/PortfolioMarquee';
import Button from '../components/ui/Button';
import tim1 from '../assets/tim/adit.jpeg';
import tim2 from '../assets/tim/amira.jpg';
import tim3 from '../assets/tim/hadi.jpg';
import tim4 from '../assets/tim/yasmin.jpg';
import tim5 from '../assets/tim/ali.JPG';

const BerandaPage = () => {
  const features = [
    {
      title: 'Kualitas Natural',
      desc: 'Hasil edit foto tetap terlihat asli, tekstur kulit terjaga alami, dan tidak terlihat kasar atau tempelan digital kaku.',
      badge: 'Premium Human Touch',
      icon: 'solar:magic-stick-bold-duotone',
    },
    {
      title: 'Harga Terjangkau',
      desc: 'Layanan profesional dengan harga yang sangat bersahabat untuk kantong mahasiswa, pelajar, maupun pencari kerja.',
      badge: 'Proses Cepat',
      icon: 'solar:wallet-money-bold-duotone',
    },
    {
      title: 'Pilihan Lengkap',
      desc: 'Tersedia berbagai pilihan almamater kampus nasional, kemeja putih jas, dan warna background sesuai regulasi resmi.',
      badge: 'Banyak Variasi',
      icon: 'bi:grid-1x2-fill',
    },
  ];

  const team = [
    {
      name: 'Adittia Dwi Kurniawan',
      role: 'Creative Director',
      avatar: tim1,
    },
    {
      name: 'Amira Salma Nafisa',
      role: 'Admin Specialist',
      avatar: tim2,
    },
    {
      name: 'Muhammad Nur Hadi',
      role: 'Studio Manager',
      avatar: tim3,
    },
    {
      name: 'Yasmine Shafira Ahmad',
      role: 'Social Media Marketing',
      avatar: tim4,
    },
    {
      name: 'Moh Ali Farda Al Ghifarri',
      role: 'Social Media Manager',
      avatar: tim5,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Stats Summary */}
      <StatsSection />

      {/* 3. Core Features / Values Grid */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold">
              Kenapa Memilih Kami?
            </span>
            <h1 className="text-3xl md:text-4xl font-semibold text-[#0D0D1A] tracking-tight">
              Solusi Edit Pas Foto Formal <br className="hidden sm:inline" />
              Tanpa Ke Studio
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between border border-slate-200/60 rounded-3xl p-8 bg-white shadow-sm hover:shadow-lg hover:shadow-[#2101FC]/5 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#2101FC]/8 flex items-center justify-center text-[#2101FC] group-hover:bg-[#2101FC] group-hover:text-white transition-all duration-300">
                    <Icon icon={feat.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0D0D1A]">{feat.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{feat.desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <span className="inline-block px-3.5 py-1.5 rounded-xl bg-[#2101FC]/8 text-[10px] font-bold text-[#2101FC]">
                    {feat.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Portfolio Marquee */}
      <PortfolioMarquee />
      {/* 5. Professional Team Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D0D1A] tracking-tight">
              Dikerjakan Oleh Team Profesional
            </h2>
            <p className="text-sm text-[#6B7280] mt-2">
              Orang-orang kreatif di balik layar yang siap menyesuaikan dan mempercantik momen penting Anda.
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-5 overflow-x-auto pb-6 md:pb-0 gap-6 scroll-smooth select-none">
            {team.map((t, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-64 md:w-auto bg-white border border-slate-200/50 rounded-3xl p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-[#2101FC]/15 ring-4 ring-[#2101FC]/5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-sm font-bold text-[#0D0D1A] truncate mb-1">{t.name}</h4>
                <p className="text-[10px] font-bold text-[#2101FC] uppercase tracking-widest">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default BerandaPage;
