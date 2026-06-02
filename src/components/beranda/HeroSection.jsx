import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';
import afterImage from '../../assets/homepage/after.jpg';
import beforeImage from '../../assets/homepage/before.jpg';
import axiosInstance from '../../lib/axios';

const HeroSection = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);
  const [heroContent, setHeroContent] = useState({
    hero_title: 'Edit Pas Foto Online',
    hero_subtitle: 'Ubah Selfie Jadi Pas Foto Kilat!',
    about_text: 'Edit foto selfie Anda menjadi pas foto formal profesional untuk KTM, KTP, CPNS, Visa, atau Lamaran Kerja dalam hitungan jam. Hasil berkualitas tinggi, rapi, dan bergaransi resmi.',
  });

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await axiosInstance.get('/home');
        setHeroContent(response.data);
      } catch (error) {
        console.warn('Failed to fetch hero content:', error.message);
        // Keep default values if API fails
      }
    };
    fetchHeroContent();
  }, []);

  const handleMove = (clientX, rect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, rect);
    }
  };

  const handleMouseMove = (e) => {
    if (!isSliding && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white dark:bg-zinc-950">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl -z-10 dark:bg-primary-900/10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl -z-10 dark:bg-indigo-900/10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Columns - Text content */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-200/50 text-xs font-semibold text-primary-600 dark:bg-primary-950/20 dark:text-primary-400 dark:border-primary-800/30">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            Layanan Pas Foto Formal Tanpa ke Studio
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 leading-[1.1] tracking-tight">
            {heroContent.hero_title} <br className="hidden sm:inline" />
            Ubah Selfie Jadi <span className="text-primary-500">{heroContent.hero_subtitle}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            {heroContent.about_text}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Link to="/pesanan">
              <Button size="lg" className="shadow-lg shadow-primary-500/25">
                Pesan Sekarang
                <Icon icon="solar:arrow-right-linear" className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/layanan">
              <Button size="lg" variant="outline">
                Lihat Semua Layanan
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Columns - Interactive Before/After Comparison Slider */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[480px]">
            <h4 className="text-xs font-bold text-center text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <Icon icon="solar:double-alt-arrow-right-bold" className="text-primary-500" />
              Geser Slider Untuk Membandingkan
            </h4>
            
            <div 
              className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-slate-200/50 dark:border-zinc-800/50 cursor-ew-resize select-none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={() => setIsSliding(true)}
              onMouseUp={() => setIsSliding(false)}
              onMouseLeave={() => setIsSliding(false)}
            >
              {/* After Image (Full background) */}
              <div className="absolute inset-0 bg-[#e0f2fe]">
                <img 
                  src={afterImage} 
                  alt="Setelah diedit formal" 
                  className="w-full h-full object-cover"
                  draggable="false"
                />
                {/* Formal Suit overlay simulation */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white tracking-wide uppercase">
                  Setelah (Formal)
                </div>
              </div>

              {/* Before Image (Left clipped background) */}
              <div 
                className="absolute inset-y-0 left-0 right-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img 
                  src={beforeImage} 
                  alt="Sebelum diedit" 
                  className="w-full h-full object-cover grayscale brightness-95"
                  draggable="false"
                />
                <div className="absolute bottom-6 left-6 px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white tracking-wide uppercase">
                  Sebelum (Selfie)
                </div>
              </div>

              {/* Divider handle */}
              <div 
                className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-xl border border-slate-200 hover:scale-105 active:scale-95 transition-transform duration-200">
                  <Icon icon="solar:transfer-horizontal-bold-duotone" className="w-5 h-5 text-primary-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

