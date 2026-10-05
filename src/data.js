export const doctors = [
  { name: 'Dr. Ahmad Santosa', specialty: 'Spesialis Kulit', patients: '1.5k+' },
  { name: 'Dr. Budi Hartono', specialty: 'Sp. Kecantikan', patients: '1.2k+' },
  { name: 'Dr. Candra Wijaya', specialty: 'Sp. Estetika', patients: '1.8k+' },
  { name: 'Dr. Dian Pratama', specialty: 'Sp. Dermatologi', patients: '1.5k+' },
];

export const treatments = [
  {
    id: 1,
    title: 'Hydro Facial Glow & Deep Cleanse',
    category: 'facial',
    categoryName: 'Facial Treatment',
    tag: 'Favorit',
    tagClass: 'popular',
    price: 350000,
    duration: '50 Menit',
    durationMinutes: 50,
    doctor: 'Dr. Dian Pratama, Sp.KK',
    downtime: 'Tanpa Downtime',
    rating: 4.9,
    reviewsCount: 284,
    excerpt:
      'Vakum komedo bertekanan hydro-suction membersihkan pori hingga ke lapisan terdalam dan menutrisi kulit dengan serum Hyaluronic Acid.',
    fullDesc:
      'Hydro Facial Glow adalah perawatan pembersihan pori-pori wajah tingkat lanjut berstandar dermatologis. Teknologi spiral tip vakum air melunakkan sebum, mengekstraksi komedo tanpa perih, serta menginfus koktail serum antioksidan dan peptida untuk kulit bercahaya.',
  },
  {
    id: 2,
    title: 'Pico Laser Glow & Spot Removal',
    category: 'laser',
    categoryName: 'Laser Medis',
    tag: 'Teknologi Canggih',
    tagClass: 'popular',
    price: 850000,
    duration: '45 Menit',
    durationMinutes: 45,
    doctor: 'Dr. Candra Wijaya, Sp.KK',
    downtime: '1-2 Hari Kemerahan',
    rating: 5.0,
    reviewsCount: 312,
    excerpt:
      'Picosure laser memecah pigmen flek hitam, melasma, dan bekas jerawat kehitaman (PIH), serta meratakan rona kulit.',
    fullDesc:
      'Pico Laser menggunakan gelombang cahaya pikodetik untuk menghancurkan melanin menjadi partikel mikroskopis tanpa memanaskan jaringan sekitar berlebih. Perawatan ini membantu meregenerasi elastin dan kolagen baru pada kulit kusam atau berbintik hitam.',
  },
  {
    id: 3,
    title: 'Acne Clarifying Chemical Therapy',
    category: 'acne',
    categoryName: 'Acne Care',
    tag: 'Anti Jerawat',
    tagClass: '',
    price: 400000,
    duration: '50 Menit',
    durationMinutes: 50,
    doctor: 'Dr. Dian Pratama, Sp.KK',
    downtime: 'Tanpa Pengelupasan Kasar',
    rating: 4.8,
    reviewsCount: 195,
    excerpt:
      'Peeling Salicylic Acid dan Blue Light Phototherapy membantu merawat jerawat meradang dan menyeimbangkan minyak.',
    fullDesc:
      'Perawatan kulit berjerawat ini mengombinasikan ekstraksi komedo aseptik, medical chemical peel berkonsentrasi terukur, serum calming tea-tree & centella asiatica, serta Blue LED untuk membantu mensterilkan pori.',
  },
  {
    id: 4,
    title: 'Botox Allergan Wrinkle Eraser',
    category: 'antiaging',
    categoryName: 'Anti-Aging & Kontur',
    tag: 'FDA Approved',
    tagClass: 'popular',
    price: 1200000,
    duration: '30 Menit',
    durationMinutes: 30,
    doctor: 'Dr. Budi Hartono, Sp.BP-RE',
    downtime: '2-3 Jam Titik Suntik',
    rating: 4.9,
    reviewsCount: 168,
    excerpt:
      "Injeksi neuromodulator untuk menghaluskan kerutan dahi, crow's feet, dan otot rahang.",
    fullDesc:
      'Injeksi botulinum toxin tipe A dikerjakan oleh dokter spesialis untuk merelaksasi otot ekspresi wajah tanpa mengurangi keluwesan senyum alami. Hasil dapat bertahan 6 hingga 8 bulan.',
  },
  {
    id: 5,
    title: 'HIFU 7D Ultra Face Lifting',
    category: 'antiaging',
    categoryName: 'Anti-Aging & Kontur',
    tag: 'Pengencangan Non-Bedah',
    tagClass: '',
    price: 1500000,
    duration: '60 Menit',
    durationMinutes: 60,
    doctor: 'Dr. Candra Wijaya, Sp.KK',
    downtime: 'Tanpa Downtime',
    rating: 4.9,
    reviewsCount: 142,
    excerpt:
      'Ultrasound terfokus membantu mengencangkan kulit kendur, double chin, dan menstimulasi lapisan SMAS.',
    fullDesc:
      'High-Intensity Focused Ultrasound (HIFU) 7D menargetkan lapisan kulit hingga jaringan SMAS. Perawatan tanpa pisau bedah ini menstimulasi neokolagenesis sehingga wajah tampak lebih tirus dan elastis.',
  },
  {
    id: 6,
    title: 'Glutathione Radiance Body Infusion',
    category: 'body',
    categoryName: 'Body Care',
    tag: 'Infus Vitamin',
    tagClass: '',
    price: 550000,
    duration: '40 Menit',
    durationMinutes: 40,
    doctor: 'Dr. Ahmad Santosa, Sp.KK',
    downtime: 'Tanpa Downtime',
    rating: 4.8,
    reviewsCount: 236,
    excerpt:
      'Infus Vitamin C, Glutathione, dan Kolagen untuk mendukung kesehatan dan tampilan kulit.',
    fullDesc:
      'Infus terapi nutrisi dilakukan dengan pengawasan dokter. Perawatan ini membantu menangkal radikal bebas dan mendukung stamina serta kelembapan alami kulit.',
  },
  {
    id: 7,
    title: 'Microneedling Dermapen Scar Therapy',
    category: 'acne',
    categoryName: 'Acne & Bopeng',
    tag: 'Solusi Bopeng',
    tagClass: '',
    price: 750000,
    duration: '60 Menit',
    durationMinutes: 60,
    doctor: 'Dr. Ahmad Santosa, Sp.KK',
    downtime: '2-3 Hari Kemerahan',
    rating: 4.9,
    reviewsCount: 178,
    excerpt:
      'Teknologi jarum mikro dan Growth Factor membantu memperbaiki tekstur bopeng bekas jerawat.',
    fullDesc:
      'Dermapen 4 Microneedling menciptakan kanal mikro steril pada kulit untuk memicu proses penyembuhan alami. Serum PDRN Salmon DNA membantu memperbaiki cekungan bekas jerawat dan tampilan pori.',
  },
  {
    id: 8,
    title: 'Body Contouring & RF Slimming Tight',
    category: 'body',
    categoryName: 'Body Care',
    tag: 'Slimming & RF',
    tagClass: '',
    price: 650000,
    duration: '50 Menit',
    durationMinutes: 50,
    doctor: 'Dr. Budi Hartono, Sp.BP-RE',
    downtime: 'Tanpa Downtime',
    rating: 4.7,
    reviewsCount: 124,
    excerpt:
      'Radiofrequency multi-polar membantu meratakan selulit dan mengencangkan area tubuh terpilih.',
    fullDesc:
      'Frekuensi radio terkontrol menembus lapisan subkutan untuk membantu mengencangkan kulit tubuh dan melancarkan drainase limfatik.',
  },
  {
    id: 9,
    title: 'Aqua Infusion Brightening Facial',
    category: 'facial',
    categoryName: 'Facial Treatment',
    tag: 'Glow Instan',
    tagClass: 'popular',
    price: 450000,
    duration: '60 Menit',
    durationMinutes: 60,
    doctor: 'Dr. Dian Pratama, Sp.KK',
    downtime: 'Tanpa Downtime',
    rating: 4.9,
    reviewsCount: 215,
    excerpt:
      'Oxy-infusion dengan serum Vitamin C dan masker peel-off untuk membantu mengembalikan kilau wajah.',
    fullDesc:
      'Perawatan facial ini mengalirkan oksigen bertekanan tinggi bersama serum pencerah dan ditutup dengan Gold Peel-Off Mask untuk mengunci nutrisi serta memberikan efek dewy skin.',
  },
];

const featuredBenefits = [
  [
    'Pembersihan komedo tanpa iritasi',
    'Infus Hyaluronic Acid intensif',
    'Kulit tampak segar & glowing seketika',
    'Bisa langsung beraktivitas normal',
  ],
  [
    'Efektif memudarkan flek dan melasma',
    'Mengecilkan pori-pori & meratakan warna kulit',
    'Stimulasi kolagen mendalam',
    'Ditangani langsung dokter spesialis',
  ],
  [
    'Meredakan jerawat meradang',
    'Mengontrol minyak & pori tersumbat',
    'Mencegah timbulnya bopeng baru',
    'Termasuk konsultasi dokter',
  ],
  [
    'Hasil natural tanpa efek kaku',
    'Menyamarkan kerutan halus',
    'Hasil dapat bertahan 6-8 bulan',
    'Dikerjakan dokter spesialis',
  ],
  [
    'Mencerahkan rona kulit seluruh tubuh',
    'Nutrisi antioksidan',
    'Mendukung kesegaran fisik',
    'Dilakukan dengan pengawasan dokter',
  ],
];

export const featuredServices = [treatments[0], treatments[1], treatments[2], treatments[3], treatments[5]].map(
  (treatment, index) => ({
    ...treatment,
    category: treatment.categoryName.toUpperCase(),
    description: treatment.fullDesc,
    benefits: featuredBenefits[index],
  }),
);

export const treatmentCategories = [
  { id: 'all', label: `Semua Layanan (${treatments.length})` },
  { id: 'facial', label: 'Facial & Peeling' },
  { id: 'laser', label: 'Laser & Flek' },
  { id: 'acne', label: 'Acne & Bopeng' },
  { id: 'antiaging', label: 'Anti-Aging & Kontur' },
  { id: 'body', label: 'Body & Infusion' },
];

export const packages = [
  {
    title: 'Single Treatment',
    description:
      'Pilihan fleksibel untuk mencoba perawatan pilihan tanpa komitmen sesi panjang.',
    price: 'Mulai Rp 350k',
    savings: 'Harga Sesi Reguler',
    bookingTitle: treatments[0].title,
    features: [
      '1x Sesi Tindakan Medis Pilihan',
      'Skin Analyzer & Konsultasi Dokter',
      'Masker Calming Pasca Tindakan',
    ],
    button: 'Pilih Single Session',
  },
  {
    title: 'Glowing Series (3x)',
    description:
      'Program intensif 3 sesi untuk pemulihan tekstur kulit dan pencerahan tahan lama.',
    price: 'Rp 890.000',
    savings: 'Hemat 15% dari harga normal',
    bookingTitle: 'Paket Glowing Series 3x Sesi',
    features: [
      '3x Sesi Treatment Medis',
      'Gratis Starter Homecare Skincare Kit',
      'Evaluasi Hasil Kulit Setiap Sesi',
      'Prioritas Jadwal Kunjungan Dokter',
    ],
    button: 'Ambil Paket Glowing (Hemat 15%)',
    highlighted: true,
  },
  {
    title: 'VIP Complete Care (6x)',
    description:
      'Transformasi kulit menyeluruh termasuk kombinasi laser, facial, dan infus vitamin.',
    price: 'Rp 2.450.000',
    savings: 'Hemat 25% dari harga normal',
    bookingTitle: 'Paket VIP Complete Care 6x Sesi',
    features: [
      '6x Sesi Kombinasi (Laser + Facial + Infus)',
      'Konsultasi Dokter Spesialis Unlimited',
      'Full Set Medical Skincare Resep Dokter',
      'Akses VIP Lounge & Welcome Drink',
    ],
    button: 'Daftar VIP Complete',
  },
];

export const faqs = [
  {
    question: 'Apakah saya harus konsultasi dokter terlebih dahulu sebelum tindakan?',
    answer:
      'Ya, sangat disarankan. Setiap pasien baru akan mendapatkan analisis kondisi kulit gratis (Skin Analyzer) bersama dokter spesialis agar perawatan yang dipilih tepat sasaran dan aman bagi tipe kulit Anda.',
  },
  {
    question: 'Apakah tindakan Laser atau Peeling menimbulkan rasa sakit atau downtime?',
    answer:
      'Sebagian besar perawatan kami seperti Hydro Facial dan Laser Pico minim rasa sakit. Kami juga menyediakan krim anestesi topikal sebelum tindakan tertentu. Downtime umumnya ringan.',
  },
  {
    question: 'Berapa lama jeda waktu yang disarankan antar sesi perawatan?',
    answer:
      'Untuk facial pembersihan pori disarankan setiap 3 - 4 minggu sekali. Untuk laser flek atau jerawat disarankan jeda 2 - 4 minggu sesuai siklus regenerasi alami sel kulit.',
  },
  {
    question: 'Bagaimana jika saya perlu menjadwal ulang waktu booking?',
    answer:
      'Anda dapat melakukan reschedule dengan menghubungi WhatsApp Customer Care klinik minimal 6 jam sebelum jadwal dan menyebutkan kode reservasi.',
  },
];
