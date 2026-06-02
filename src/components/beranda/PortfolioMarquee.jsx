import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import jashitam1 from '../../assets/marquee/jashitam1.png';
import jashitam2 from '../../assets/marquee/jashitam2.png';
import jashitam3 from '../../assets/marquee/jashitam3.png';
import jashitam4 from '../../assets/marquee/jashitam4.png';
import jashitam5 from '../../assets/marquee/jashitam5.png';
import ubee1 from '../../assets/marquee/ub1.png';
import ubee3 from '../../assets/marquee/ub3.png';
import ubee4 from '../../assets/marquee/ub4.png';
import ubee5 from '../../assets/marquee/ub5.png';
import cpns1 from '../../assets/marquee/kemejaputih1.png';
import cpns2 from '../../assets/marquee/kemejaputih2.png';
import cpns3 from '../../assets/marquee/kemejaputih3.png';
import cpns5 from '../../assets/marquee/kemejaputih5.png';
import testi1 from '../../assets/marquee/testi1.png';
import testi2 from '../../assets/marquee/testi2.png';
import testi3 from '../../assets/marquee/testi3.png';
import testi4 from '../../assets/marquee/testi4.png';
import testi5 from '../../assets/marquee/testi5.png';

const PortfolioMarquee = () => {
  const [activeTab, setActiveTab] = useState('ktm'); // 'ktm' | 'cpns' | 'jashitam'

  const tabs = [
    { id: 'ktm', label: 'Pas Foto KTM', icon: 'solar:square-academic-cap-bold' },
    { id: 'cpns', label: 'Pas Foto CPNS', icon: 'solar:document-bold' },
    { id: 'jashitam', label: 'Pas Foto Jas Hitam', icon: 'solar:user-bold' },
    { id: 'testimoni', label: 'Testimoni', icon: 'mdi:star' },
  ];

  const portfolioData = {
    ktm: [
      { image: ubee1, label: 'KTM Univ Brawijaya' },
      { image: ubee3, label: 'KTM Univ Brawijaya' },
      { image: ubee4, label: 'KTM Univ Brawijaya' },
      { image: ubee5, label: 'KTM Univ Brawijaya' },
    ],
    cpns: [
      { image: cpns1, label: 'Kemeja Putih' },
      { image: cpns2, label: 'Kemeja Putih' },
      { image: cpns3, label: 'Kemeja Putih' },
      { image: cpns5, label: 'Kemeja Putih' },
    ],
    jashitam: [
      { image: jashitam1, label: 'Maba UB 2025' },
      { image: jashitam2, label: 'Jas Hitam' },
      { image: jashitam3, label: 'Jas Hitam' },
      { image: jashitam4, label: 'Foto Administrasi' },
      { image: jashitam5, label: 'Foto Karyawan' },
    ],
    testimoni: [
      { image: testi1, label: 'Testimoni Pelanggan' },
      { image: testi2, label: 'Testimoni Pelanggan' },
      { image: testi3, label: 'Testimoni Pelanggan' },
      { image: testi4, label: 'Testimoni Pelanggan' },
      { image: testi5, label: 'Testimoni Pelanggan' },
    ],
  };

  const activeItems = portfolioData[activeTab] || [];
  // Duplicate list to achieve infinite marquee scrolling effect
  const marqueeItems = [...activeItems, ...activeItems, ...activeItems, ...activeItems];

  return (
    <section className="bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight mb-4">
          Tetap Jadi Diri Sendiri, <br className="sm:hidden" />
          Pesan Pas Foto Anda Sekarang
        </h2>
        <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8">
          Hasil editing profesional kami terbukti rapi dan sesuai kebutuhan administrasi instansi terkait.
        </p>

        {/* Tab buttons */}
        <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-slate-200/70 dark:bg-zinc-800/80 rounded-full border border-slate-300/30">
          {tabs.map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 focus:outline-none ${
                  isTabActive
                    ? 'bg-white dark:bg-zinc-700 text-primary-600 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon icon={tab.icon} className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sliding Marquee - Strictly consistent image sizes (w-48 h-64 equivalent in tailwind: w-[190px] h-[260px]) */}
      <div className="relative w-full flex items-center justify-center overflow-hidden py-4 select-none">

        {/* Scrolling Inner Track */}
        <div className="flex gap-6 animate-marquee w-max py-2">
          {marqueeItems.map((item, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[225px] h-[487px] bg-white dark:bg-zinc-800 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200/40 dark:border-zinc-700/50 hover:-translate-y-1 transition-transform duration-300 relative group"
            >
              <img 
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">D Studio Edit</span>
                <h4 className="text-sm font-bold text-white truncate">{item.label}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center mt-12">
        <Link to="/pesanan">
          <Button className="shadow-lg shadow-primary-500/20">
            Pesan Pas Foto Sekarang
          </Button>
        </Link>
        <div></div>
      </div>
      
    </section>
  );
};

export default PortfolioMarquee;
