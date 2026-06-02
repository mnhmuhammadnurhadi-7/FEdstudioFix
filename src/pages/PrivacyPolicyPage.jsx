import React from 'react';
import PageHero from '../components/layout/PageHero';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <PageHero
        badge="Kebijakan Privasi"
        title="Privasi Anda adalah prioritas kami"
        subtitle="Pelajari bagaimana D Studio mengumpulkan, menggunakan, dan melindungi data dan foto yang Anda kirimkan." 
      />

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-8 shadow-sm">
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">1. Pendahuluan</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                D Studio berkomitmen melindungi privasi dan keamanan informasi pelanggan.
                Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menyimpan, memproses, dan menggunakan data pribadi Anda saat menggunakan layanan edit foto kami.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">2. Data yang Dikumpulkan</h2>
              <ul className="list-disc list-inside text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-2">
                <li>Data identitas: nama lengkap dan alamat email.</li>
                <li>Data kontak: nomor WhatsApp untuk konfirmasi pesanan dan pemberitahuan.</li>
                <li>Data pesanan: kode tiket, layanan yang dipesan, total pembayaran, catatan tambahan, dan status pesanan.</li>
                <li>Foto atau berkas yang dikirimkan: file foto mentah yang akan kami edit sesuai permintaan Anda.</li>
                <li>Data teknis: alamat IP, jenis perangkat, browser, dan aktivitas penggunaan laman.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">3. Tujuan Penggunaan Data</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Data yang kami kumpulkan digunakan untuk:
              </p>
              <ul className="list-disc list-inside text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-2">
                <li>Memproses dan menyelesaikan pesanan editing foto Anda.</li>
                <li>Memberikan informasi status pesanan secara real-time.</li>
                <li>Mengirimkan pemberitahuan tentang revisi, pengiriman, atau klarifikasi pesanan.</li>
                <li>Meningkatkan kualitas layanan dan antarmuka website kami.</li>
                <li>Mencegah penyalahgunaan layanan dan memastikan keamanan data.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">4. Persetujuan Pengguna</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Dengan mengirimkan foto dan data melalui situs D Studio, Anda menyatakan bahwa:
              </p>
              <ul className="list-disc list-inside text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-2">
                <li>Foto yang dikirim adalah milik Anda atau Anda memiliki hak untuk mengirimkannya.</li>
                <li>Anda setuju foto tersebut akan diedit oleh tim editor kami sesuai ketentuan layanan.</li>
                <li>Data pribadi Anda akan digunakan untuk pemrosesan pesanan, komunikasi layanan, dan dukungan pelanggan.</li>
                <li>Foto tidak akan digunakan untuk tujuan promosi atau publikasi tanpa izin terpisah.</li>
              </ul>
              <div className="mt-4 p-4 rounded-3xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-sm text-slate-700 dark:text-slate-200">
                <p className="font-semibold mb-2">Pernyataan Persetujuan</p>
                <p>
                  "Saya bersedia mengirim foto untuk diedit sesuai ketentuan. Saya memahami bahwa foto akan diproses oleh tim D Studio untuk kebutuhan pembuatan pas foto formal, dan data saya akan digunakan hanya untuk tujuan pemrosesan pesanan, notifikasi, dan layanan terkait."
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">5. Penggunaan Foto dan Konten</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Foto dan berkas yang Anda kirimkan hanya digunakan untuk keperluan editing dan pengembalian hasil kepada Anda. Kami tidak akan menggunakan foto untuk aktivitas komersial, promosi, atau publikasi tanpa persetujuan tambahan.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">6. Penyimpanan dan Keamanan</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Kami menyimpan data dengan aman menggunakan praktik standar untuk melindungi dari akses tidak sah, kebocoran, dan penyalahgunaan. Hanya personel yang berwenang yang dapat mengakses data pesanan dan foto pelanggan.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">7. Pembagian Data dengan Pihak Ketiga</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Data tidak akan dibagikan ke pihak ketiga kecuali diperlukan untuk operasional layanan, misalnya penyedia email atau penyimpanan file. Kami tidak menjual data pribadi Anda kepada pihak lain.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">8. Hak Pengguna</h2>
              <ul className="list-disc list-inside text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-2">
                <li>Meminta akses atau salinan data pribadi Anda.</li>
                <li>Meminta koreksi data yang tidak akurat.</li>
                <li>Meminta penghapusan data jika tidak lagi diperlukan.</li>
                <li>Menarik persetujuan komunikasi terkait pemasaran kapan saja.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">9. Perubahan Kebijakan</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Kebijakan ini dapat diperbarui dari waktu ke waktu. Setiap perubahan akan diumumkan melalui situs web atau notifikasi resmi.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">10. Kontak</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi kami, silakan hubungi kami melalui:
              </p>
              <ul className="list-disc list-inside text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-2">
                <li>Email: dstudiophotos@gmail.com</li>
                <li>WhatsApp: +62 877-8608-6204</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
