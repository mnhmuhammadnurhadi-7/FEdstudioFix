import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: '500+', label: 'Foto Selesai Diedit' },
    { value: '1x24 Jam', label: 'Proses Pengerjaan' },
    { value: '100%', label: 'Privasi Terjamin' },
    { value: '5.0 ★', label: 'Rating Rata-Rata' },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid responsif: 2 kolom di mobile, 4 kolom di layar besar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-gray-200">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center text-center p-4 ${
                idx > 1 ? 'pt-8 lg:pt-4' : 'pt-4'
              }`}
            >
              {/* Nilai utama */}
              <h3 className="text-3xl font-extrabold text-black mb-1">
                {stat.value}
              </h3>
              {/* Label */}
              <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
