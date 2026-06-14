# 📷 Sistem Perlindungan Gambar (Image Protection System)

## Deskripsi
Sistem perlindungan gambar mencegah user melakukan:
- ❌ Klik kanan pada gambar (context menu)
- ❌ Drag & drop gambar
- ❌ Menyimpan gambar
- ❌ Inspect element pada gambar
- ❌ Memilih/select gambar

## Komponen & File Utama

### 1. **Global Protection Setup** (`src/utils/imageProtection.js`)
- `setupGlobalImageProtection()` - Inisialisasi perlindungan global untuk semua gambar
- `ProtectedImage` - Komponen wrapper untuk gambar yang dilindungi

### 2. **Hook untuk Protection** (`src/hooks/useImageProtection.js`)
- `useImageProtection(ref)` - Hook untuk melindungi elemen gambar tertentu

### 3. **CSS Protection** (`src/styles/imageProtection.css`)
- Styling tambahan untuk mencegah selection dan drag

### 4. **CSS Classes & Attributes**
- Class: `protected-image`
- Attribute: `data-protected-image`
- Handler: `onContextMenu={(e) => e.preventDefault()}`

## Cara Menggunakan

### Metode 1: Automatic Global Protection ✅ (Sudah Diterapkan)
Perlindungan otomatis sudah aktif untuk semua gambar yang memiliki:
```jsx
className="protected-image"
data-protected-image
draggable="false"
onContextMenu={(e) => e.preventDefault()}
```

### Metode 2: Manual Protection pada Component Tertentu
```jsx
import useImageProtection from '../../hooks/useImageProtection';

const MyComponent = () => {
  const imageRef = useRef(null);
  useImageProtection(imageRef);

  return (
    <div ref={imageRef} data-protected-image>
      <img
        src="path/to/image.jpg"
        alt="Protected"
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
        className="protected-image"
      />
    </div>
  );
};
```

### Metode 3: Menggunakan Komponen ProtectedImage
```jsx
import { ProtectedImage } from '../../utils/imageProtection';

export default function MyPage() {
  return (
    <ProtectedImage
      src="path/to/image.jpg"
      alt="My Image"
      className="rounded-lg"
    />
  );
}
```

## File yang Sudah Dimodifikasi

✅ `src/App.jsx` - Inisialisasi setupGlobalImageProtection
✅ `src/index.jsx` - Import CSS protection
✅ `src/components/layanan/BeforeAfterCard.jsx` - Protection pada before/after images
✅ `src/components/layanan/BeforeAfterSlider.jsx` - Protection pada sample images
✅ `src/components/beranda/PortfolioMarquee.jsx` - Protection pada portfolio images

## Fitur Perlindungan

| Fitur | Status |
|-------|--------|
| Right-click disabled | ✅ |
| Drag & drop disabled | ✅ |
| Save image disabled | ✅ |
| Selection prevented | ✅ |
| CSS user-select none | ✅ |
| Touch callout disabled | ✅ |
| Global scope | ✅ |

## Testing

Untuk menguji perlindungan:
1. Buka aplikasi di browser
2. Coba klik kanan pada gambar → tidak ada context menu
3. Coba drag gambar → tidak bisa di-drag
4. Coba select gambar → tidak bisa di-select
5. Buka DevTools → gambar tetap terlindungi

## Catatan Keamanan

⚠️ **PENTING**: Sistem ini merupakan proteksi UI level browser saja. 
- User dengan pengetahuan teknis masih bisa mengambil gambar melalui Network tab di DevTools
- Untuk proteksi maksimal, pertimbangkan watermark atau lazy loading dengan encryption
- Hash/obfuscate URL gambar di production jika diperlukan

## Penambahan untuk Komponen Baru

Saat menambah komponen baru dengan gambar, tambahkan:

```jsx
<img
  src={image}
  alt="description"
  className="protected-image"
  draggable="false"
  onContextMenu={(e) => e.preventDefault()}
  data-protected-image
/>
```

Atau gunakan komponen `ProtectedImage`:
```jsx
import { ProtectedImage } from '../utils/imageProtection';

<ProtectedImage src={image} alt="description" />
```

## Troubleshooting

**Q: Perlindungan tidak bekerja?**
A: Pastikan:
- ✅ CSS `imageProtection.css` sudah di-import di `index.jsx`
- ✅ `setupGlobalImageProtection()` sudah dipanggil di `App.jsx`
- ✅ Gambar memiliki class `protected-image` atau `data-protected-image`

**Q: Ingin disable perlindungan untuk gambar tertentu?**
A: Jangan tambahkan class `protected-image` atau attribute `data-protected-image` pada img tersebut.

---
*Dokumentasi dibuat: 2026-06-15*
