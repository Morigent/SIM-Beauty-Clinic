import React, { useEffect, useMemo, useState } from 'react';
import {
  doctors,
  faqs,
  featuredServices,
  packages,
  treatmentCategories,
  treatments,
} from '../data.js';
import doctorImage from '../doctor.jpg';
import heroImage from '../hero_woman.jpg';
import logoImage from '../logo.jpg';
import treatmentImage from '../treatment.jpg';

const bookingDoctors = [
  'Dr. Ahmad Santosa, Sp.KK',
  'Dr. Budi Hartono, Sp.BP-RE',
  'Dr. Candra Wijaya, Sp.KK',
  'Dr. Dian Pratama, Sp.KK',
];

const bookingTimes = [
  '09:30 - 11:00 (Sesi Pagi)',
  '11:00 - 12:30 (Sesi Siang 1)',
  '13:30 - 15:00 (Sesi Siang 2)',
  '15:30 - 17:00 (Sesi Sore)',
  '18:00 - 19:30 (Sesi Malam)',
];

const currency = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

function Header({ catalog, onBook }) {
  return (
    <header id="header">
      <a className="logo" href="/index.html" aria-label="Klinik - Beranda">
        <img className="logo-img" src={logoImage} alt="" />
        <span className="logo-text">Klinik</span>
      </a>

      <nav id="navbar" aria-label="Navigasi utama">
        <a className={`nav-link${!catalog ? ' active' : ''}`} href="/index.html#hero">
          Beranda
        </a>
        <a className="nav-link" href="/index.html#doctors">
          Dokter
        </a>
        <a className={`nav-link${catalog ? ' active' : ''}`} href="/service.html">
          Katalog Layanan
        </a>
        <a className="nav-link" href="/index.html#review">
          Ulasan
        </a>
      </nav>

      <button className="btn-login" type="button" onClick={() => onBook()}>
        Reservasi
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <img className="logo-img" src={logoImage} alt="Logo Klinik" />
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <a href="/index.html#hero" className="footer-link">Tentang Kami</a>
            <a href="/service.html" className="footer-link">Katalog Layanan</a>
            <a href="/index.html#doctors" className="footer-link">Tim Dokter</a>
            <a href="/index.html#review" className="footer-link">Ulasan Pasien</a>
          </div>
          <div className="footer-col">
            <p className="footer-contact-title">Hubungi Kami</p>
            <a href="mailto:info@klinik.com" className="footer-link">info@klinik.com</a>
            <a href="tel:+6212345678" className="footer-link">+62 123-456-78</a>
            <span className="footer-link">Jl. Kecantikan No. 1, Jakarta</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SIM Klinik Kecantikan. All rights reserved.</p>
      </div>
    </footer>
  );
}

function getTomorrowDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function BookingModal({ open, initialService, onClose }) {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');
  const selectedService =
    treatments.find((item) => item.title === initialService)?.title ||
    packages.find((item) => item.bookingTitle === initialService)?.bookingTitle ||
    treatments[0].title;

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setBooking(null);
      setError('');
    }
  }, [open, initialService]);

  if (!open) return null;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const record = Object.fromEntries(formData.entries());
    const code = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const bookingRecord = {
      ...record,
      code,
      timestamp: new Date().toISOString(),
    };

    try {
      const savedBookings = JSON.parse(localStorage.getItem('clinic_bookings') || '[]');
      if (!Array.isArray(savedBookings)) {
        throw new Error('Data reservasi tersimpan tidak valid.');
      }
      localStorage.setItem(
        'clinic_bookings',
        JSON.stringify([...savedBookings, bookingRecord]),
      );
      setBooking(bookingRecord);
      setError('');
    } catch (storageError) {
      setError(
        `Reservasi belum tersimpan. ${storageError instanceof Error ? storageError.message : 'Penyimpanan browser tidak tersedia.'}`,
      );
    }
  }

  return (
    <div
      className="modal-overlay active"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <div className="modal-header">
          <h2 className="modal-title" id="booking-modal-title">Reservasi Perawatan</h2>
          <button className="modal-close-btn" type="button" onClick={onClose} aria-label="Tutup">
            &times;
          </button>
        </div>

        <div className="modal-body">
          {booking ? (
            <div className="booking-success-box">
              <div className="success-icon-wrap" aria-hidden="true">&#10003;</div>
              <h3>Reservasi Berhasil Didaftarkan!</h3>
              <p>Jadwal Anda tercatat. Simpan kode reservasi berikut.</p>
              <div className="booking-code-badge">{booking.code}</div>
              <div className="booking-summary">
                <p><strong>Layanan:</strong> {booking.service}</p>
                <p><strong>Dokter:</strong> {booking.doctor}</p>
                <p><strong>Jadwal:</strong> {booking.date} &bull; {booking.time}</p>
                <p><strong>Pasien:</strong> {booking.name} ({booking.phone})</p>
              </div>
              <button className="btn-all-catalog" type="button" onClick={onClose}>
                Selesai &amp; Tutup
              </button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="booking-service">Pilih Jenis Layanan *</label>
                <select
                  className="form-select"
                  id="booking-service"
                  name="service"
                  defaultValue={selectedService}
                  required
                >
                  {treatments.map((treatment) => (
                    <option key={treatment.id} value={treatment.title}>
                      {treatment.title} — {currency.format(treatment.price)}
                    </option>
                  ))}
                  {packages.slice(1).map((item) => (
                    <option key={item.bookingTitle} value={item.bookingTitle}>
                      {item.bookingTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="booking-doctor">Pilih Dokter Spesialis *</label>
                <select className="form-select" id="booking-doctor" name="doctor" required>
                  {bookingDoctors.map((doctor) => <option key={doctor}>{doctor}</option>)}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="booking-date">Tanggal Kunjungan *</label>
                  <input
                    className="form-input"
                    id="booking-date"
                    name="date"
                    type="date"
                    min={getTomorrowDate()}
                    defaultValue={getTomorrowDate()}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="booking-time">Sesi Jam Praktik *</label>
                  <select className="form-select" id="booking-time" name="time" required>
                    {bookingTimes.map((time) => <option key={time}>{time}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="patient-name">Nama Lengkap Pasien *</label>
                  <input className="form-input" id="patient-name" name="name" autoComplete="name" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="patient-phone">Nomor WhatsApp *</label>
                  <input
                    className="form-input"
                    id="patient-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="patient-notes">Keluhan / Riwayat Kulit (Opsional)</label>
                <textarea className="form-textarea" id="patient-notes" name="notes" />
              </div>

              {error && <p className="booking-error" role="alert">{error}</p>}
              <button className="btn-daftar-cta" type="submit">
                Konfirmasi Reservasi &amp; Dapatkan Kode Antrean &rarr;
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <div className="section-underline" />
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

function HomePage({ onBook }) {
  const [selectedService, setSelectedService] = useState(0);
  const service = featuredServices[selectedService];

  return (
    <>
      <Header onBook={onBook} />
      <main>
        <section className="hero" id="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Perawatan terbaik<br />untuk kulit sehat</h1>
              <div className="hero-dots" aria-hidden="true">
                <span className="dot active" /><span className="dot" /><span className="dot" />
              </div>
            </div>
            <button className="btn-daftar" type="button" onClick={() => onBook()}>
              Daftar &rarr;
            </button>
          </div>
          <div className="hero-image-wrapper">
            <img className="hero-img" src={heroImage} alt="Perawatan kecantikan" />
          </div>
          <div className="hero-categories">
            {['Konsultasi', 'Perawatan', 'Obat'].map((category) => (
              <div className="category-item" key={category}>
                <div className="cat-icon" aria-hidden="true">&#10003;</div>
                <span>{category}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section doctors-section" id="doctors">
          <SectionHeading title="Dokter Kami" />
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <article className="doctor-card" key={doctor.name}>
                <div className="doctor-img-wrap">
                  <img className="doctor-img" src={doctorImage} alt={doctor.name} loading="lazy" />
                </div>
                <div className="doctor-info">
                  <p className="doctor-name">{doctor.name}</p>
                  <p className="doctor-spec">{doctor.specialty}</p>
                  <p className="doctor-stats">{doctor.patients} pasien</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section services-section" id="services">
          <SectionHeading
            title="Layanan Kami"
            subtitle="Solusi perawatan estetika & dermatologi terpadu berstandar medis untuk berbagai kebutuhan kulit."
          />
          <div className="services-layout">
            <aside className="services-sidebar" aria-label="Pilih layanan">
              {featuredServices.map((item, index) => (
                <button
                  className={`service-btn${selectedService === index ? ' active' : ''}`}
                  type="button"
                  key={item.title}
                  onClick={() => setSelectedService(index)}
                >
                  <span className="service-btn-content">
                    <span className="service-btn-title">{item.title}</span>
                    <span className="service-btn-sub">{item.categoryName}</span>
                  </span>
                  <span className="service-btn-arrow" aria-hidden="true">&rarr;</span>
                </button>
              ))}
            </aside>

            <article className="service-content" key={service.id}>
              <div className="service-img-wrap">
                <img className="service-img" src={treatmentImage} alt={service.title} loading="lazy" />
                <div className="service-img-overlay">
                  <span className="service-badge">
                    <span className="service-badge-pill" />
                    {service.category}
                  </span>
                </div>
              </div>
              <div className="service-desc-card">
                <div className="service-content-header">
                  <h3 className="service-main-title">{service.title}</h3>
                  <div className="service-rating">
                    <span className="star">&#9733;</span> {service.rating}
                    <span className="service-rating-note">(ulasan pasien)</span>
                  </div>
                </div>
                <div className="service-meta-chips">
                  <span className="meta-chip">{service.duration}</span>
                  <span className="meta-chip">{service.downtime}</span>
                  <span className="meta-chip">{service.doctor}</span>
                </div>
                <p className="service-desc">{service.description}</p>
                <div className="service-benefits-grid">
                  {service.benefits.map((benefit) => (
                    <div className="benefit-item" key={benefit}>
                      <span className="benefit-check">&#10003;</span><span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="service-footer-bar">
                  <div className="service-price-block">
                    <span className="price-label">Tarif Perawatan</span>
                    <span className="price-value">{currency.format(service.price)} <small>/ sesi</small></span>
                  </div>
                  <div className="service-actions-group">
                    <a className="btn-catalog-link" href="/service.html">Detail Lengkap &rarr;</a>
                    <button
                      className="btn-book-service"
                      type="button"
                      onClick={() => onBook(service.title)}
                    >
                      Booking Treatment
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="services-all-cta">
            <div className="services-all-cta-text">
              <h3>Ingin melihat seluruh daftar perawatan &amp; paket promo?</h3>
              <p>Jelajahi perawatan medis, perbandingan paket hemat, dan daftar layanan klinik.</p>
            </div>
            <a className="btn-all-catalog" href="/service.html">Buka Katalog Layanan Lengkap &rarr;</a>
          </div>
        </section>

        <section className="section review-section" id="review">
          <div className="review-bg">
            <article className="review-card">
              <div className="quote-icon" aria-hidden="true">“</div>
              <p className="review-text">
                Pelayanannya ramah dan perawatannya terasa nyaman. Dokternya juga menjelaskan kondisi kulit dengan jelas.
              </p>
              <div className="reviewer">
                <div className="reviewer-avatar" aria-hidden="true">F</div>
                <div>
                  <p className="reviewer-name">Fatima Al-Said</p>
                  <div className="stars" aria-label="5 dari 5 bintang">★★★★★</div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="cta-section" id="cta">
          <div className="cta-content">
            <button className="btn-daftar-cta" type="button" onClick={() => onBook()}>
              Buat Reservasi &rarr;
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function TreatmentCard({ treatment, onDetail, onBook }) {
  return (
    <article className="treatment-card">
      <div className="treatment-card-thumb">
        <img
          className="treatment-card-img"
          src={treatmentImage}
          alt={treatment.title}
          loading="lazy"
        />
        <span className={`treatment-tag ${treatment.tagClass}`}>{treatment.tag}</span>
      </div>
      <div className="treatment-card-body">
        <div className="treatment-card-top">
          <span className="treatment-category">{treatment.categoryName}</span>
          <span className="treatment-rating-text">★ {treatment.rating} ({treatment.reviewsCount})</span>
        </div>
        <h3 className="treatment-card-title">{treatment.title}</h3>
        <p className="treatment-card-excerpt">{treatment.excerpt}</p>
        <div className="treatment-meta-pills">
          <span className="treatment-meta-pill">{treatment.duration}</span>
          <span className="treatment-meta-pill">{treatment.downtime}</span>
          <span className="treatment-meta-pill">{treatment.doctor.split(',')[0]}</span>
        </div>
        <div className="treatment-card-footer">
          <div>
            <span className="treatment-price-unit">Mulai dari</span>
            <span className="treatment-price">{currency.format(treatment.price)}</span>
          </div>
          <div className="treatment-card-actions">
            <button className="btn-card-detail" type="button" onClick={() => onDetail(treatment)}>
              Detail
            </button>
            <button className="btn-card-book" type="button" onClick={() => onBook(treatment.title)}>
              Reservasi
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function CatalogPage({ onBook }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('popular');
  const [openFaq, setOpenFaq] = useState(0);
  const [detail, setDetail] = useState(null);

  const filteredTreatments = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('id');
    const filtered = treatments.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesSearch =
        !query ||
        [item.title, item.categoryName, item.excerpt, item.doctor]
          .some((value) => value.toLocaleLowerCase('id').includes(query));
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((first, second) => {
      if (sort === 'price-asc') return first.price - second.price;
      if (sort === 'price-desc') return second.price - first.price;
      if (sort === 'duration') return first.durationMinutes - second.durationMinutes;
      return second.reviewsCount - first.reviewsCount;
    });
  }, [category, search, sort]);

  return (
    <>
      <Header catalog onBook={onBook} />
      <main>
        <section className="service-page-hero">
          <div className="breadcrumb">
            <a href="/index.html">Beranda</a><span>/</span><span>Katalog Layanan &amp; Perawatan Medis</span>
          </div>
          <h1 className="service-page-title">Layanan &amp; Perawatan Medis</h1>
          <p className="service-page-desc">
            Solusi estetika dan dermatologi berstandar medis dengan teknologi modern, ditangani dokter spesialis.
          </p>
          <div className="service-stats-grid">
            {[
              ['15+', 'Jenis Treatment Medis'],
              ['4', 'Dokter Spesialis Kulit'],
              ['99.2%', 'Tingkat Kepuasan Pasien'],
              ['100%', 'Sertifikasi BPOM & FDA'],
            ].map(([number, label]) => (
              <div className="stat-item" key={label}>
                <div className="stat-number">{number}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="catalog-section" id="catalog-main">
          <div className="catalog-toolbar">
            <div className="toolbar-top-row">
              <label className="search-box">
                <span className="search-icon" aria-hidden="true">⌕</span>
                <input
                  className="search-input"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari facial, laser, acne, Botox..."
                  aria-label="Cari layanan"
                />
              </label>
              <label className="sort-box">
                Urutkan:
                <select className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="popular">Paling Populer</option>
                  <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                  <option value="price-desc">Harga: Tertinggi ke Terendah</option>
                  <option value="duration">Durasi Tercepat</option>
                </select>
              </label>
            </div>
            <div className="category-filter-pills" aria-label="Kategori layanan">
              {treatmentCategories.map((item) => (
                <button
                  className={`filter-pill${category === item.id ? ' active' : ''}`}
                  key={item.id}
                  data-category={item.id}
                  type="button"
                  aria-pressed={category === item.id}
                  onClick={() => setCategory(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {filteredTreatments.length ? (
            <div className="treatment-cards-grid">
              {filteredTreatments.map((treatment) => (
                <TreatmentCard
                  key={treatment.id}
                  treatment={treatment}
                  onDetail={setDetail}
                  onBook={onBook}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p aria-hidden="true">🔍</p>
              <h2>Layanan Tidak Ditemukan</h2>
              <p>Coba gunakan kata kunci lain atau ubah kategori pencarian.</p>
              <button
                className="filter-pill active"
                type="button"
                onClick={() => {
                  setSearch('');
                  setCategory('all');
                }}
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </section>

        <section className="package-program-section" id="packages">
          <SectionHeading
            title="Program Perawatan & Paket Hemat"
            subtitle="Pilih paket perawatan yang sesuai kebutuhan Anda."
          />
          <div className="package-cards-grid">
            {packages.map((item) => (
              <article className={`package-card${item.highlighted ? ' highlighted' : ''}`} key={item.title}>
                {item.highlighted && <span className="package-ribbon">Paling Diminati</span>}
                <h3 className="package-title">{item.title}</h3>
                <p className="package-desc">{item.description}</p>
                <div className="package-price-wrap">
                  <span className="package-price">{item.price}</span>
                  <span className="package-savings">{item.savings}</span>
                </div>
                <ul className="package-features">
                  {item.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
                </ul>
                <button
                  className={item.highlighted ? 'btn-card-book' : 'btn-card-detail'}
                  type="button"
                  onClick={() => onBook(item.bookingTitle)}
                >
                  {item.button}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="faq-section" id="faq">
          <SectionHeading
            title="Pertanyaan Seputar Layanan"
            subtitle="Informasi yang sering ditanyakan sebelum reservasi."
          />
          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <article className={`faq-item${openFaq === index ? ' active' : ''}`} key={faq.question}>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span>{faq.question}</span><span className="faq-toggle-icon">+</span>
                </button>
                <div className="faq-answer">{faq.answer}</div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {detail && (
        <div className="modal-overlay active" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setDetail(null);
        }}>
          <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <div className="modal-header">
              <h2 className="modal-title" id="detail-title">{detail.title}</h2>
              <button className="modal-close-btn" type="button" onClick={() => setDetail(null)} aria-label="Tutup">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <span className="service-badge">{detail.categoryName.toUpperCase()}</span>
              <strong className="detail-price">{currency.format(detail.price)}</strong>
              <p className="service-desc">{detail.fullDesc}</p>
              <div className="service-meta-chips">
                <span className="meta-chip">{detail.duration}</span>
                <span className="meta-chip">{detail.downtime}</span>
                <span className="meta-chip">{detail.doctor}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-card-detail" type="button" onClick={() => setDetail(null)}>Tutup</button>
              <button
                className="btn-card-book"
                type="button"
                onClick={() => {
                  setDetail(null);
                  onBook(detail.title);
                }}
              >
                Reservasi
              </button>
            </div>
          </section>
        </div>
      )}
      <Footer />
    </>
  );
}

export default function App() {
  const catalog = window.location.pathname.endsWith('/service.html');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState('');

  useEffect(() => {
    document.title = catalog
      ? 'Katalog Layanan — SIM Klinik Kecantikan'
      : 'Klinik Kecantikan — Perawatan Terbaik untuk Anda';

    const updateHeader = () => {
      document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, [catalog]);

  const openBooking = (service = '') => {
    setBookingService(service);
    setBookingOpen(true);
  };
  const closeBooking = () => setBookingOpen(false);

  return (
    <>
      {catalog
        ? <CatalogPage onBook={openBooking} />
        : <HomePage onBook={openBooking} />}
      <BookingModal
        open={bookingOpen}
        initialService={bookingService}
        onClose={closeBooking}
      />
    </>
  );
}
