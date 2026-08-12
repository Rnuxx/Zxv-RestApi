# Traktir

REST API + web app donasi ala Saweria. Dibangun pakai Next.js App Router jadi tinggal push ke Vercel udah langsung jalan.

## Jalanin di lokal

```
npm install
npm run dev
```

Buka http://localhost:3000

## Deploy ke Vercel

1. Push folder ini ke repo GitHub kamu
2. Buka vercel.com, klik New Project, pilih repo tadi
3. Framework Preset otomatis kedetect "Next.js", langsung klik Deploy
4. Selesai, API dan web app kamu udah live

Atau kalau udah install Vercel CLI:

```
npm i -g vercel
vercel
```

## Penting soal penyimpanan data

Project ini pakai in-memory store (`lib/store.js`) biar gampang dicoba tanpa setup database dulu. Enaknya, gampang dan langsung jalan. Kurangnya, di Vercel serverless, data bisa hilang kalau function-nya di-restart karena tiap invocation bisa dapet instance baru.

Buat production beneran, tinggal ganti isi `lib/store.js` dan `lib/auth.js` ke database asli, misalnya:

- Vercel Postgres atau Neon buat data relasional
- Vercel KV (Redis) buat nyimpen API key dan cache cepat
- Supabase kalau mau sekalian auth dan storage

Struktur kodenya udah dipisah biar gampang, tinggal ganti isi fungsi di dua file itu tanpa ubah apapun di route API.

## Cara pakai API

### 1. Daftar jadi creator

```
POST /api/creators
Content-Type: application/json

{ "username": "kopi_senja", "name": "Kopi Senja" }
```

Response bakal ngasih `apiKey`, simpen baik baik soalnya cuma muncul sekali.

### 2. Terima donasi (publik, siapa aja bisa hit)

```
POST /api/creators/kopi_senja/donate
Content-Type: application/json

{ "supporterName": "Budi", "amount": 20000, "message": "buat kopi ya" }
```

### 3. Lihat profil publik

```
GET /api/creators/kopi_senja
```

### 4. Cek akun sendiri (butuh API key)

```
GET /api/me
x-api-key: trk_xxxxxxxxxxxxxxxxxxxxxxxx
```

### 5. Lihat semua donasi masuk lengkap pesannya (butuh API key)

```
GET /api/me/donations
x-api-key: trk_xxxxxxxxxxxxxxxxxxxxxxxx
```

### 6. Regenerate API key kalau kebocor

```
POST /api/me/regenerate-key
x-api-key: trk_xxxxxxxxxxxxxxxxxxxxxxxx
```

## Ide pengembangan lanjut

- Halaman publik `/[username]` yang nampilin profil creator plus form donasi langsung dari browser
- Widget alert buat OBS, endpoint SSE atau websocket biar donasi masuk realtime ke overlay stream
- Integrasi payment gateway beneran (Midtrans atau Xendit) biar donasi bukan cuma dicatat tapi beneran transfer duit
- Rate limiting per API key biar nggak disalahgunakan
- Webhook, jadi creator bisa daftarin URL yang bakal dipanggil tiap ada donasi baru
- Dashboard React buat creator kelola donasi tanpa harus mainan curl
