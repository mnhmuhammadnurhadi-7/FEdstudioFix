import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';
import logoDstudio from '../../assets/logo/logo_dstudio.PNG';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setIsExpanded(false);
  }, [location]);

  const navItems = [
    {
      label: 'Jelajahi',
      bgColor: '#3b82f6',
      textColor: '#fff',
      links: [
        { label: 'Beranda', path: '/', ariaLabel: 'Beranda' },
        { label: 'Layanan', path: '/layanan', ariaLabel: 'Layanan Kami' },
      ],
    },
    {
      label: 'Lainnya',
      bgColor: '#1e293b',
      textColor: '#fff',
      links: [
        { label: 'Cek Status', path: '/cek-status', ariaLabel: 'Cek Status Pesanan' },
        { label: 'Hubungi Kami', path: '/hubungi', ariaLabel: 'Hubungi Kami' },
      ],
    },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
      ? 'bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-zinc-800/50 shadow-sm'
      : 'bg-transparent'
      }`}>
      {/* Desktop Card Nav */}
      <nav
        ref={navRef}
        className="hidden lg:block max-w-6xl mx-auto px-3 py-2"
      >
        <div className="relative">
          {/* Top Bar - Logo and CTA */}
          <div className="flex items-center justify-between mb-4">
            {/* Left Side - Menu Cards Indicator */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
                aria-label={isExpanded ? 'Tutup menu' : 'Buka menu'}
              >
                <Icon icon={isExpanded ? "solar:close-circle-bold" : "solar:menu-dots-bold"} className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {isExpanded ? 'Menu' : 'Tampilkan'}
              </span>
            </div>

            {/* Center - Logo */}
            <Link to="/" className="flex items-center group focus:outline-none">
              <img
                src={logoDstudio}
                alt="D Studio"
                className="h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Right Side - CTA Button */}
            <Link to="/pesanan" className="flex items-center gap-2 group">
              <Button
                size="sm"
                className="shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow"
              >
                Pesan Sekarang
                <Icon icon="solar:arrow-right-up-bold" className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Expandable Cards */}
          {isExpanded && (
            <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              {navItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-4 text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <h3 className="font-bold text-sm mb-3 opacity-90">{item.label}</h3>
                  <div className="flex flex-col gap-2">
                    {item.links.map((link, linkIdx) => (
                      <Link
                        key={linkIdx}
                        to={link.path}
                        className="text-xs font-medium py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-between group"
                      >
                        <span>{link.label}</span>
                        <Icon icon="solar:arrow-right-up-bold" className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group focus:outline-none">
          <img
            src={logoDstudio}
            alt="D Studio"
            className="h-20 w-auto object-contain"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-lg bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-all duration-300 ease-in-out transform ${isOpen ? 'scale-105' : ''}`}
          aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
        >
          <Icon icon={isOpen ? "solar:close-circle-bold" : "solar:menu-dots-bold"} className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] z-30 bg-white dark:bg-zinc-950 flex flex-col p-6 animate-in fade-in duration-300 ease-out transform-gpu shadow-xl shadow-slate-900/10 overflow-y-auto">
          {/* Mobile Card Menu */}
          <nav className="flex flex-col gap-3 mb-8">
            {navItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl p-4 text-white transition-all duration-300 ease-out shadow-lg shadow-black/10"
                style={{ backgroundColor: item.bgColor }}
              >
                <h3 className="font-bold text-sm mb-3 opacity-90">{item.label}</h3>
                <div className="flex flex-col gap-2">
                  {item.links.map((link, linkIdx) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={linkIdx}
                        to={link.path}
                        className={`text-xs font-medium py-3 px-3 rounded-2xl transition-all duration-300 ease-in-out flex items-center justify-between gap-3 group ${isActive
                          ? 'bg-white/30 font-bold'
                          : 'bg-white/10 hover:bg-white/20'
                          }`}
                      >
                        <span className="inline-flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-white/90 shadow-sm" />
                          {link.label}
                        </span>
                        <Icon icon="solar:arrow-right-up-bold" className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Divider */}
          <div className="h-px bg-slate-200 dark:bg-zinc-800 my-4" />

          {/* Additional Actions */}
          <div className="space-y-3">
            <Link to="/hubungi" className="flex items-center gap-3 p-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors">
              <Icon icon="solar:phone-bold" className="w-5 h-5" />
              <span className="font-medium">Hubungi Kami</span>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="mt-auto pt-6">
            <Link to="/pesanan" className="w-full">
              <Button className="w-full py-3.5 flex items-center justify-center gap-2">
                Pesan Sekarang
                <Icon icon="solar:arrow-right-up-bold" className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
