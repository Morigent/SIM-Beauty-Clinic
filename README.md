# Klinik Kecantikan

Website klinik kecantikan berbasis HTML, Tailwind CSS, dan Vite. Halaman utama
berada di `src/index.html`; JavaScript ada di `src/script.js`, sedangkan styling
khusus ada di `src/clinic.css`.

`src/output.css` dibuat otomatis dari Tailwind setiap kali development server
dijalankan atau build produksi dibuat. Jangan mengedit file hasil generate itu
secara langsung; utility Tailwind ditulis pada HTML dan kustomisasi tema ada di
`tailwind.config.js`.

## Menjalankan secara lokal

```sh
npm install
npm run dev
```

Untuk membuat build produksi, jalankan `npm run build`; hasilnya berada di `dist/`.
