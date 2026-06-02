import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import logoDstudio from '../../assets/logo/logo_dstudio.PNG';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-slate-200/60 dark:border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mb-12">
        {/* About column */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center group focus:outline-none">
            <img 
              src={logoDstudio} 
              alt="D Studio" 
              className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-105" 
            />
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
            Jasa edit pas foto digital profesional online. Hasil kilat, rapi, dan sesuai dengan regulasi resmi akademik maupun kedutaan.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a href="https://instagram.com/d_studiophot0graphy" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-primary-50 hover:text-primary-500 flex items-center justify-center text-slate-500 transition-colors">
              <Icon icon="bi:instagram" className="w-4 h-4" />
            </a>
            <a href="https://wa.me/6287786086204" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-500 flex items-center justify-center text-slate-500 transition-colors">
              <Icon icon="bi:whatsapp" className="w-4 h-4" />
            </a>
            <a href="mailto:dstudiophotos@gmail.com" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-500 flex items-center justify-center text-slate-500 transition-colors">
              <Icon icon="bi:envelope-fill" className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links Column 1: Navigation */}
        <div className="flex flex-col gap-3.5">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Navigasi</h4>
          <ul className="flex flex-col gap-2.5 text-sm font-medium text-slate-600 dark:text-slate-400">
            <li><Link to="/" className="hover:text-primary-500 transition-colors">Beranda</Link></li>
            <li><Link to="/layanan" className="hover:text-primary-500 transition-colors">Katalog Layanan</Link></li>
            <li><Link to="/cek-status" className="hover:text-primary-500 transition-colors">Cek Status Pesanan</Link></li>
            <li><Link to="/pesanan" className="hover:text-primary-500 transition-colors">Formulir Pesanan</Link></li>
          </ul>
        </div>

        {/* Links Column 2: Layanan Kami */}
        <div className="flex flex-col gap-3.5">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Layanan Terpopuler</h4>
          <ul className="flex flex-col gap-2.5 text-sm font-medium text-slate-600 dark:text-slate-400">
            <li><Link to="/layanan?slug=ktm" className="hover:text-primary-500 transition-colors">Pas Foto KTM Almamater</Link></li>
            <li><Link to="/layanan?slug=cpns" className="hover:text-primary-500 transition-colors">Pas Foto CPNS & BUMN</Link></li>
            <li><Link to="/layanan?slug=visa" className="hover:text-primary-500 transition-colors">Pas Foto Visa Resmi</Link></li>
            <li><Link to="/layanan?slug=ktp" className="hover:text-primary-500 transition-colors">Pas Foto KTP & ID Card</Link></li>
          </ul>
        </div>

        {/* Links Column 3: Contact */}
        <div className="flex flex-col gap-3.5">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Kontak & Lokasi</h4>
          <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-start gap-2.5">
              <Icon icon="solar:map-point-bold-duotone" className="w-5 h-5 text-slate-400 mt-0.5" />
              <p>Universitas Brawijaya, Kota Malang, Jawa Timur</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Icon icon="solar:phone-bold-duotone" className="w-5 h-5 text-slate-400" />
              <a href="https://wa.me/6287786086204" target="_blank" rel="noreferrer" className="hover:underline">+62 877-8608-6204</a>
            </div>
            <div className="flex items-center gap-2.5">
              <Icon icon="solar:letter-bold-duotone" className="w-5 h-5 text-slate-400" />
              <a href="mailto:dstudiophotos@gmail.com" className="hover:underline">dstudiophotos@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-100 dark:border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
        <p>© {currentYear} D Studio Photography. Semua hak dilindungi.</p>
        <div className="flex items-center gap-4">
          <Link to="/privacy-policy" className="hover:text-slate-600 transition-colors">Kebijakan Privasi</Link>
          <Link to="/terms-conditions" className="hover:text-slate-600 transition-colors">Syarat & Ketentuan</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
