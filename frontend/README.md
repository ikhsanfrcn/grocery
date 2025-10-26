# Katalog Produk Grosir - Take-Home Test

Aplikasi katalog produk grosir yang dibangun dengan Next.js untuk distributor dan sales lapangan yang ingin menampilkan produk serta melakukan pemesanan cepat via WhatsApp.

## Cara Menjalankan Proyek

### Prerequisites
- Node.js 18+ 
- npm

### Setup
1. Clone repository ini
2. Install dependencies:
```bash
npm install
```

3. Copy file environment:
```bash
cp .env.example
```

4. Sesuaikan konfigurasi di `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=628123456789   # Nomor WhatsApp tujuan
```

5. Jalankan development server:
```bash
npm run dev
```

6. Buka [http://localhost:3000]

## Arsitektur & Keputusan Teknis

### Tech Stack
- **Next.js 16** - React framework dengan App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling dengan mobile-first approach
- **Framer Motion** - Animasi smooth untuk UX
- **React Context** - State management untuk cart dan location

### Data Source
Menggunakan **Mock API dengan JSON Static** (`public/api/data/products.json`) karena:
- Platzi API tidak menyediakan struktur variant yang diperlukan
- Diimport langsung saat build sehingga npm run build dan deploy ke Vercel aman
- Tidak bergantung ke API eksternal atau localhost
- Mock data memberikan kontrol penuh atas struktur produk
- Mudah migrasi ke real API di masa depan

### Struktur Folder
```
src/
├── app/                   # Next.js App Router
│   ├── cart/              # Cart page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── productCatalog.tsx # Main product listing with search & filter
│   ├── productCard.tsx    # Individual product display
│   ├── productActions.tsx # Add to cart functionality
│   ├── productFilter.tsx  # Advanced filtering component
│   ├── notification.tsx   # Custom notification system
│   ├── cartIcon.tsx       # Cart indicator
│   ├── header.tsx         # App header
│   └── navbar.tsx         # Bottom navigation
├── context/               # React Context providers
│   ├── cart.tsx           # Shopping cart state
│   └── location.tsx       # User location state
├── interface/             # TypeScript type definitions
│   └── type.ts            # Type definitions
└── lib/                   # Utility functions (API, WhatsApp)
    ├── api.ts             # Data fetching functions
    └── whatsapp.ts        # WhatsApp integration

public/
└── api/data/
    └── products.json      # Static product data
```

## Desain & UX

### Mobile-First Design
- Grid responsif untuk katalog produk
- Touch-friendly buttons dan inputs
- Optimized untuk penggunaan satu tangan
- Fast loading dengan image optimization

### User Flow
1. **Browse** - Lihat katalog dengan search/filter
2. **Select** - Pilih produk dan variant
3. **Cart** - Review pesanan di keranjang
4. **Checkout** - Kirim via WhatsApp dengan 1 klik

## Keamanan

- Environment variables untuk sensitive data
- Input validation dan sanitization
- HTTPS enforcement di production

## Performance & Optimizations

- Server-side rendering untuk SEO
- Image optimization dengan Next.js Image
- Code splitting otomatis
- Lazy loading components

## Trade-offs & Improvements

### Current Limitations
1. **Real-time Inventory** - Stock management masih static
2. **Image Optimization** - Menggunakan external images, belum ada CDN
3. **Offline Support** - Belum ada PWA capabilities
4. **Payment Integration** - Hanya WhatsApp, belum ada payment gateway
5. **User Authentication** - Belum ada sistem login/register
6. **Accessibility (A11y)** - Belum ada optimasi untuk screen reader atau keyboard navigation

### Future Enhancements

Jika ada waktu lebih:
- Authentication
- Product detail page dengan gallery
- Wishlist functionality
- Order history tracking
- PWA dengan offline support
- Integration dengan payment gateway
- Admin dashboard untuk manage products
- Real-time inventory updates

## WhatsApp Integration

Format pesan otomatis mencakup:
- Detail produk (nama, variant, SKU)
- Quantity dan subtotal per item
- Total keseluruhan
- Alamat pengiriman
- Template yang professional untuk B2B

## Testing & Quality

- TypeScript untuk type safety
- ESLint untuk code quality
- Responsive testing di berbagai device
- Manual testing untuk WhatsApp flow

## Pembelajaran & Pengalaman

### Challenges
1. **State Management** - Memilih antara Context vs Redux, pilih Context untuk simplicity
2. **WhatsApp URL Encoding** - Handling special characters di pesan
3. **Mobile UX** - Balance antara information density dan usability
4. **UI/UX Design from Scratch** - Tidak ada Figma base, harus membuat sendiri flow, layout, dan komponen visual yang intuitif 

### Key Learnings
- Next.js App Router patterns dan best practices
- Mobile-first responsive design principles  
- B2B UX considerations untuk sales tools
- WhatsApp Business API integration patterns

## Deployment

Ready untuk deploy ke Vercel:
```bash
npm run build
```

Environment variables sudah dikonfigurasi untuk production deployment.

## Checklist Requirements

### Ketentuan Tugas yang Sudah Dipenuhi:

1. **Tampilan Katalog**
   - Mock data dengan struktur variant lengkap
   - Tampilan produk dengan gambar, nama, varian (warna, ukuran, harga)
   - Fitur pencarian dan filter advanced (kategori, harga, sorting)

2. **Keranjang & Pemesanan**
   - Tambah varian dan jumlah ke keranjang
   - Ringkasan pesanan (SKU, varian, jumlah, total item, subtotal)
   - Manajemen stock static dengan validasi input jumlah

3. **Checkout via WhatsApp**
   - Format pesan professional dengan detail lengkap
   - Support nomor WhatsApp dari environment variable
   - Encoding pesan otomatis

4. **Tampilan & Responsivitas**
   - Mobile-first design dengan Tailwind CSS
   - Touch-friendly interface
   - Loading states dan error handling

5. **Keamanan & Arsitektur**
   - Environment variables untuk sensitive data
   - File .env.example dan instruksi setup
   - Mock data sebagai alternatif API

6. **Dokumentasi**
   - README lengkap dengan cara menjalankan
   - Penjelasan arsitektur & keputusan teknis
   - Penjelasan desain & keamanan
   - Pengalaman dan pembelajaran
