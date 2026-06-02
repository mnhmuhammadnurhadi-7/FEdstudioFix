import React from 'react';
import { Icon } from '@iconify/react';

const StatusProgress = ({ status }) => {
  const steps = [
    { id: 'PENDING', label: 'Diterima (Pending)', icon: 'solar:square-share-line-bold-duotone', desc: 'Pesanan masuk & antre verifikasi' },
    { id: 'PROSES', label: 'Diproses', icon: 'solar:pen-new-square-bold-duotone', desc: 'Editor sedang mengedit foto Anda' },
    { id: 'SELESAI', label: 'Selesai / Revisi', icon: 'solar:file-check-bold-duotone', desc: 'Hasil edit siap diunduh & ditinjau' },
  ];

  const getStepNumber = (statusName) => {
    switch (statusName?.toUpperCase()) {
      case 'PENDING':
      case 'TERKIRIM':
        return 1;
      case 'PROSES':
      case 'DIPROSES':
      case 'VALIDASI':
      case 'DIVALIDASI':
      case 'VERIFIKASI':
        return 2;
      case 'SELESAI':
      case 'REVISI':
      case 'DIAMBIL':
      case 'SELESAI/REVISI':
        return 3;
      default:
        return 1;
    }
  };

  const activeStepNumber = getStepNumber(status);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8 bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] shadow-sm mb-8 animate-fade-in">
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
        <Icon icon="solar:history-bold-duotone" className="text-primary-500 w-5 h-5" />
        Status Pengerjaan Foto
      </h3>
      
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4 pl-6 md:pl-0">
        
        {/* Vertical line (Mobile) / Horizontal line (Desktop) */}
        <div className="absolute top-0 bottom-0 left-[2.2rem] md:left-0 md:right-0 md:top-6 md:bottom-auto w-0.5 md:w-auto md:h-0.5 bg-slate-200 dark:bg-zinc-800 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 -z-10" />

        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = activeStepNumber > stepNum;
          const isActive = activeStepNumber === stepNum;
          
          return (
            <div key={step.id} className="flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-3 flex-1 relative w-full">
              {/* Circle node */}
              <div 
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                    : isActive
                      ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/25 scale-105'
                      : 'bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <Icon icon="solar:check-circle-bold" className="w-6 h-6" />
                ) : (
                  <Icon icon={step.icon} className="w-6 h-6" />
                )}
              </div>

              {/* Text content details */}
              <div className="flex flex-col md:items-center text-left md:text-center">
                <span 
                  className={`text-sm font-bold ${
                    isActive 
                      ? 'text-primary-600 dark:text-primary-400 font-extrabold' 
                      : isCompleted 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 max-w-[150px]">
                  {step.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusProgress;
