import React from 'react';
import { Icon } from '@iconify/react';
import Button from '../ui/Button';
import { formatRupiah } from '../../lib/helpers';

const BeforeAfterSlider = ({ services, onServiceChange }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-500">
            Contoh Hasil Layanan
          </span>
          <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Beberapa hasil edit pas foto dalam tampilan yang ringkas.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Lihat contoh foto sebelum dan sesudah untuk layanan KTM, CPNS, Visa, dan KTP tanpa menggunakan area gambar yang terlalu besar.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.id}
            className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800/70 dark:bg-zinc-950"
          >
            <div className="grid aspect-[4/3] grid-cols-2 overflow-hidden bg-slate-100">
              <div className="relative overflow-hidden">
                <img
                  src={service.sampleBefore}
                  alt={`Sebelum ${service.name}`}
                  className="h-full w-full object-cover grayscale brightness-95"
                  draggable="false"
                />
                <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white">
                  Sebelum
                </div>
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={service.sampleAfter}
                  alt={`Sesudah ${service.name}`}
                  className="h-full w-full object-cover"
                  draggable="false"
                />
                <div className="absolute bottom-3 left-3 rounded-full bg-primary-500/90 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white">
                  Setelah
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                    {service.slug.toUpperCase()}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {service.name}
                  </h3>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-600 dark:bg-zinc-900 dark:text-slate-300">
                  {service.duration}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {service.description}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Harga</p>
                  <p className="mt-1 text-lg font-black text-primary-600 dark:text-primary-400">
                    {formatRupiah(service.price)}
                  </p>
                </div>
                <Button size="md" onClick={() => onServiceChange(service)} className="shadow-lg shadow-primary-500/10">
                  Pilih Layanan
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
