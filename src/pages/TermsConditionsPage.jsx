import React from 'react';
import PageHero from '../components/layout/PageHero';

const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <PageHero
        badge="Syarat dan Ketentuan"
        title="Syarat & Ketentuan Layanan"
        subtitle="Harap baca dan pahami ketentuan berikut sebelum menggunakan layanan D Studio." 
      />

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-8 shadow-sm">
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">1. Pendahuluan dan Penerimaan Syarat</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Dengan mengakses dan menggunakan website serta layanan jasa editing foto yang disediakan oleh D Studio ("Layanan"), Anda setuju untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan syarat ini, harap jangan menggunakan Layanan kami. D Studio berhak memodifikasi syarat ini kapan saja tanpa pemberitahuan sebelumnya. Penggunaan Layanan setelah modifikasi berarti Anda menerima syarat yang telah diubah.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">2. Definisi dan Deskripsi Layanan</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p>
                  D Studio menyediakan layanan jasa editing foto profesional online, khususnya untuk pembuatan dan penyempurnaan pas foto formal. Layanan kami mencakup namun tidak terbatas pada:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Editing foto selfie menjadi pas foto profesional</li>
                  <li>Penyesuaian latar belakang sesuai regulasi resmi (merah, biru, putih, dll)</li>
                  <li>Penambahan almamater atau atribut kampus/institusi digital</li>
                  <li>Penyesuaian pakaian dan penampilan digital</li>
                  <li>Penyempurnaan kualitas warna dan pencahayaan</li>
                  <li>Pengiriman file hasil dalam format digital</li>
                </ul>
                <p>
                  Layanan disediakan secara digital tanpa pertemuan tatap muka. Semua komunikasi dan pengiriman file dilakukan melalui internet.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">3. Hak dan Kewajiban Pelanggan</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p className="font-semibold">Hak Pelanggan:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Hak untuk menerima layanan editing sesuai dengan deskripsi yang telah disepakati</li>
                  <li>Hak untuk mengajukan revisi dalam batas yang telah ditentukan</li>
                  <li>Hak untuk memperoleh file hasil dalam kualitas yang dijanjikan</li>
                  <li>Hak untuk menggunakan hasil edit untuk keperluan pribadi dan profesional</li>
                  <li>Hak untuk meminta informasi tentang status pesanan</li>
                  <li>Hak untuk memberikan keluhan dan mendapatkan respons dari tim D Studio</li>
                </ul>
                <p className="font-semibold mt-4">Kewajiban Pelanggan:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Mengirimkan foto asli dengan kualitas yang jelas dan memadai</li>
                  <li>Menyediakan informasi yang akurat dan lengkap tentang permintaan editing</li>
                  <li>Melakukan pembayaran sesuai dengan nominal dan jadwal yang disepakati</li>
                  <li>Tidak menggunakan foto atau hasil edit untuk tujuan ilegal atau merugikan pihak lain</li>
                  <li>Menghormati hak cipta D Studio atas hasil pekerjaan editing</li>
                  <li>Tidak membagikan atau menjual hasil edit tanpa izin dari D Studio</li>
                  <li>Menerima hasil akhir sesuai dengan kemampuan dan standar industri yang berlaku</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">4. Penggunaan Foto dan Hak Cipta</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p>
                  <span className="font-semibold">Kepemilikan Foto:</span> Pelanggan memastikan bahwa foto yang dikirimkan adalah milik Anda atau Anda memiliki hak penuh untuk menggunakannya. Anda bertanggung jawab atas segala konsekuensi hukum jika foto tersebut melibatkan orang lain tanpa izin.
                </p>
                <p>
                  <span className="font-semibold">Lisensi Penggunaan:</span> Dengan mengirimkan foto ke D Studio, Anda memberikan lisensi kepada D Studio untuk memproses, mengedit, dan menyimpan foto sesuai dengan keperluan layanan. Lisensi ini berakhir setelah proses editing selesai dan file diserahkan kepada Anda.
                </p>
                <p>
                  <span className="font-semibold">Hak Cipta Hasil Editing:</span> Hak cipta atas hasil editing adalah milik D Studio, namun Anda memiliki hak untuk menggunakan hasil edit untuk keperluan pribadi dan profesional. Anda tidak boleh menjual, menyewakan, atau mendistribusikan hasil edit tanpa izin tertulis dari D Studio, kecuali untuk penggunaan pribadi.
                </p>
                <p>
                  <span className="font-semibold">Penggunaan Sebagai Portfolio:</span> D Studio berhak menggunakan hasil editing (tanpa identitas pelanggan yang terlihat) sebagai sampel portofolio atau contoh di media sosial dan website, kecuali pelanggan secara tertulis meminta untuk tidak digunakan.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">5. Proses Pemesanan dan Pembayaran</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p>
                  <span className="font-semibold">Cara Pemesanan:</span> Pelanggan dapat melakukan pemesanan melalui website D Studio dengan mengisi formulir pesanan dan memilih jenis layanan yang diinginkan.
                </p>
                <p>
                  <span className="font-semibold">Metode Pembayaran:</span> Pembayaran dapat dilakukan melalui transfer bank, e-wallet (GoPay, OVO, Dana, LinkAja), atau metode pembayaran digital lainnya yang tersedia di website. Nominal pembayaran harus sesuai dengan harga yang ditetapkan.
                </p>
                <p>
                  <span className="font-semibold">Konfirmasi Pembayaran:</span> Pelanggan wajib mengkonfirmasi pembayaran melalui tombol "Konfirmasi Sudah Bayar" di website setelah melakukan transfer. Jika konfirmasi tidak dilakukan, pesanan dapat tidak diproses.
                </p>
                <p>
                  <span className="font-semibold">Kode Tiket:</span> Setelah pembayaran dikonfirmasi, pelanggan akan menerima kode tiket unik melalui email dan WhatsApp. Kode tiket ini digunakan untuk melacak status pesanan dan komunikasi dengan tim D Studio.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">6. Jaminan Waktu dan Ketentuan Pengerjaan</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p>
                  <span className="font-semibold">Estimasi Waktu:</span> D Studio menjamin bahwa pengerjaan pesanan akan selesai dalam waktu maksimal 1x24 jam kerja (hari kerja Senin-Jumat, tidak termasuk hari libur nasional) dari saat pembayaran dikonfirmasi.
                </p>
                <p>
                  <span className="font-semibold">Keterlambatan:</span> Jika pengerjaan melebihi waktu yang dijanjikan tanpa alasan yang jelas, pelanggan berhak meminta penjelasan atau potongan harga. Namun, D Studio tidak bertanggung jawab atas keterlambatan yang disebabkan oleh masalah teknis di pihak pelanggan atau kurangnya informasi yang jelas.
                </p>
                <p>
                  <span className="font-semibold">Hari Libur:</span> Pesanan yang masuk pada hari libur nasional akan diproses pada hari kerja berikutnya. Estimasi waktu akan disesuaikan dengan kalender hari kerja.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">7. Kebijakan Revisi</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p>
                  <span className="font-semibold">Jumlah Revisi:</span> Setiap pemesanan mencakup hingga 2 kali revisi gratis. Revisi tambahan dikenakan biaya tambahan sesuai dengan tingkat kesulitan.
                </p>
                <p>
                  <span className="font-semibold">Jenis Revisi yang Diterima:</span>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Penyesuaian warna atau pencahayaan</li>
                  <li>Perbaikan detail atau koreksi kesalahan editor</li>
                  <li>Perubahan latar belakang atau almamater (dalam batasan yang masuk akal)</li>
                  <li>Penyesuaian ukuran atau proporsi wajah</li>
                </ul>
                <p>
                  <span className="font-semibold">Jenis Revisi yang Tidak Diterima:</span>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Perubahan total dari konsep awal yang telah disepakati</li>
                  <li>Pengerjaan ulang dari awal karena permintaan yang sangat berbeda</li>
                  <li>Revisi yang melebihi 2 kali tanpa biaya tambahan</li>
                </ul>
                <p>
                  <span className="font-semibold">Batas Waktu Revisi:</span> Permintaan revisi harus diajukan dalam waktu maksimal 3 hari kerja setelah hasil editing diterima. Revisi yang diajukan setelah periode ini akan dikenakan biaya tambahan.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">8. Kebijakan Pembatalan dan Pengembalian Dana</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p>
                  <span className="font-semibold">Pembatalan Sebelum Pengerjaan:</span> Jika pelanggan meminta pembatalan pesanan sebelum pengerjaan dimulai, D Studio akan mengembalikan 100% dari biaya pembayaran yang telah diterima.
                </p>
                <p>
                  <span className="font-semibold">Pembatalan Saat Pengerjaan:</span> Jika pesanan dibatalkan setelah pengerjaan dimulai namun sebelum selesai, D Studio akan mengembalikan 50% dari biaya pembayaran. Sisa 50% diperhitungkan sebagai biaya kompensasi dan kerja yang telah dilakukan.
                </p>
                <p>
                  <span className="font-semibold">Pembatalan Setelah Selesai:</span> Jika pesanan telah selesai dan hasil telah dikirimkan ke pelanggan, tidak ada pengembalian dana. Pelanggan hanya dapat mengajukan revisi sesuai kebijakan revisi yang berlaku.
                </p>
                <p>
                  <span className="font-semibold">Ketidakpuasan dengan Hasil:</span> Jika pelanggan tidak puas dengan hasil akhir, pelanggan dapat mengajukan revisi gratis sesuai kebijakan revisi yang berlaku. Jika setelah revisi pelanggan tetap tidak puas dan ingin pembatalan, maka pembayaran tidak dapat dikembalikan, namun pelanggan dapat meminta alternatif solusi dari tim D Studio.
                </p>
                <p>
                  <span className="font-semibold">Proses Pengembalian Dana:</span> Pengembalian dana akan diproses ke rekening atau metode pembayaran yang sama dengan yang digunakan pelanggan, dalam waktu 3-7 hari kerja.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">9. Format dan Kualitas File Hasil</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p>
                  <span className="font-semibold">Format File:</span> Hasil editing akan dikirimkan dalam format JPG atau PNG sesuai dengan preferensi pelanggan. Format lain dapat diminta dengan biaya tambahan.
                </p>
                <p>
                  <span className="font-semibold">Resolusi Gambar:</span> File hasil akan memiliki resolusi minimum 300 DPI (dots per inch) untuk keperluan cetak, dan 72 DPI untuk keperluan digital. Ukuran file akan disesuaikan dengan standar industri dan kebutuhan penggunaan.
                </p>
                <p>
                  <span className="font-semibold">Ukuran Foto:</span> Standar ukuran foto pas adalah 4x6 cm, 3x4 cm, atau ukuran khusus sesuai dengan persyaratan institusi yang dituju. Pelanggan harus menjelaskan ukuran yang dibutuhkan saat melakukan pemesanan.
                </p>
                <p>
                  <span className="font-semibold">Jaminan Kualitas:</span> D Studio menjamin bahwa hasil editing akan berkualitas profesional dan sesuai dengan standar industri jasa editing foto formal. Namun, hasil akhir juga tergantung pada kualitas foto asli yang dikirimkan oleh pelanggan.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">10. Batasan Tanggung Jawab</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p>
                  <span className="font-semibold">Kerusakan atau Hilangnya Data:</span> Meskipun D Studio menggunakan sistem penyimpanan yang aman, D Studio tidak bertanggung jawab atas kehilangan atau kerusakan data pelanggan karena masalah teknis, bencana alam, atau kesalahan sistem di luar kendali D Studio. Pelanggan disarankan untuk menyimpan salinan file mereka sendiri.
                </p>
                <p>
                  <span className="font-semibold">Tanggung Jawab Konten:</span> D Studio tidak bertanggung jawab atas penggunaan hasil edit oleh pelanggan yang melanggar hukum, etika, atau merugikan pihak ketiga. Pelanggan sepenuhnya bertanggung jawab atas penggunaan file hasil editing.
                </p>
                <p>
                  <span className="font-semibold">Keterbatasan Kompensasi:</span> Dalam hal terjadi kesalahan atau kerugian, kompensasi maksimal yang dapat diberikan D Studio adalah nilai pembayaran yang telah diterima untuk pesanan tersebut. D Studio tidak akan memberikan kompensasi tambahan di luar nilai tersebut.
                </p>
                <p>
                  <span className="font-semibold">Tidak Ada Jaminan Penerimaan Institusi:</span> D Studio tidak menjamin bahwa hasil editing akan diterima atau disetujui oleh institusi yang dituju (KTM, KTP, visa, dll). Persyaratan masing-masing institusi berbeda, dan pelanggan harus memastikan bahwa foto memenuhi kriteria sebelum mengajukan permohonan.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">11. Kebijakan Pengiriman dan Penyimpanan File</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p>
                  <span className="font-semibold">Metode Pengiriman:</span> File hasil editing akan dikirimkan melalui link Google Drive atau metode transfer file digital lainnya yang aman. Pelanggan akan menerima notifikasi via email dan WhatsApp ketika file siap diunduh.
                </p>
                <p>
                  <span className="font-semibold">Masa Berlaku Link:</span> Link pengunduhan file akan berlaku selama 7 hari dari tanggal pengiriman. Pelanggan harus mengunduh file dalam periode ini. D Studio tidak bertanggung jawab jika link telah expired karena keterlambatan pengunduhan oleh pelanggan.
                </p>
                <p>
                  <span className="font-semibold">Penyimpanan File di Server D Studio:</span> File hasil editing akan disimpan di server D Studio selama 30 hari. Setelah 30 hari, file akan dihapus secara otomatis untuk menjaga privasi dan menghemat ruang penyimpanan. Pelanggan harus menyimpan salinan file mereka sendiri.
                </p>
                <p>
                  <span className="font-semibold">Pengiriman Ulang:</span> Jika pelanggan meminta pengiriman ulang file setelah link expired, D Studio dapat menyediakannya dengan biaya tambahan Rp 25.000 untuk pembuatan link baru atau pengiriman via email/media lainnya.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">12. Komunikasi dan Support</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p>
                  <span className="font-semibold">Saluran Komunikasi:</span> Pelanggan dapat menghubungi D Studio melalui WhatsApp, email, atau fitur chat di website. Tim support kami siap membantu Senin-Jumat, 08:00-17:00 WIB.
                </p>
                <p>
                  <span className="font-semibold">Waktu Respons:</span> D Studio berkomitmen untuk merespons pertanyaan atau keluhan pelanggan dalam waktu maksimal 24 jam kerja. Pada hari libur atau luar jam kerja, respons akan diberikan pada hari kerja berikutnya.
                </p>
                <p>
                  <span className="font-semibold">Kode Tiket:</span> Setiap komunikasi terkait pesanan harus mencantumkan kode tiket untuk memudahkan tracking dan penanganan masalah.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">13. Larangan dan Pembatasan Penggunaan</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p>Pelanggan tidak boleh:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Menggunakan layanan untuk tujuan ilegal atau melanggar hukum</li>
                  <li>Mengirimkan foto yang berisi konten yang mengganggu, kasar, atau melanggar hukum</li>
                  <li>Menjual, menyewakan, atau mendistribusikan hasil editing tanpa izin dari D Studio</li>
                  <li>Menggunakan hasil editing untuk keperluan komersial tanpa perjanjian tertulis khusus</li>
                  <li>Melakukan manipulasi atau mengubah hasil editing kemudian mengakuinya sebagai karya D Studio</li>
                  <li>Menggunakan identitas palsu atau informasi yang tidak akurat saat melakukan pemesanan</li>
                  <li>Mengirimkan konten yang melecehkan, mendiskriminasi, atau membahayakan pihak lain</li>
                  <li>Mencoba untuk melewati sistem pembayaran atau melakukan transaksi ilegal</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">14. Penyelesaian Sengketa</h2>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
                <p>
                  <span className="font-semibold">Musyawarah:</span> Apabila terjadi sengketa atau perbedaan pendapat antara pelanggan dan D Studio, kedua belah pihak berkomitmen untuk menyelesaikannya melalui musyawarah baik-baik dalam waktu 7 hari kalender.
                </p>
                <p>
                  <span className="font-semibold">Mediasi:</span> Jika musyawarah tidak berhasil, kedua belah pihak dapat meminta bantuan pihak ketiga yang netral atau mediator untuk membantu mencapai kesepakatan.
                </p>
                <p>
                  <span className="font-semibold">Hukum yang Berlaku:</span> Syarat dan ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap sengketa yang tidak dapat diselesaikan melalui musyawarah atau mediasi akan diselesaikan melalui pengadilan yang berwenang di Indonesia.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">15. Modifikasi Syarat dan Ketentuan</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                D Studio berhak mengubah, menambah, atau mengurangi syarat dan ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Perubahan akan berlaku efektif sejak diumumkan di website. Penggunaan layanan setelah adanya perubahan berarti pelanggan menerima syarat dan ketentuan yang telah dimodifikasi. Pelanggan disarankan untuk secara berkala memeriksa halaman ini untuk mengetahui perubahan terbaru.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">16. Kontak dan Pertanyaan</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
                Jika Anda memiliki pertanyaan atau keberatan terhadap syarat dan ketentuan ini, silakan hubungi kami:
              </p>
              <ul className="list-disc list-inside text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-2">
                <li>Email: dstudiophotos@gmail.com</li>
                <li>WhatsApp: +62 877-8608-6204</li>
                <li>Lokasi: Universitas Brawijaya, Kota Malang, Jawa Timur</li>
              </ul>
            </div>

            <div className="mt-8 p-4 rounded-3xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950">
              <p className="text-xs text-slate-700 dark:text-slate-200">
                <span className="font-semibold">Pernyataan Penerimaan:</span> Dengan melakukan pemesanan dan menggunakan layanan D Studio, Anda menyatakan telah membaca, memahami, dan menerima semua syarat dan ketentuan yang tercantum di halaman ini. Anda juga menyatakan bahwa Anda berhak untuk mengikat diri dengan perjanjian ini dan tidak ada hambatan hukum yang mencegah Anda untuk melakukan hal tersebut.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
