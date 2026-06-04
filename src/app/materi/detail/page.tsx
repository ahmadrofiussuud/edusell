"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Download, 
  BadgeCheck, 
  GraduationCap, 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  Check, 
  HelpCircle,
  FileText, 
  BookOpen, 
  LockKeyhole,
  Smartphone,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";

// Mock Similar Materials
const SIMILAR_MATERIALS = [
  {
    id: 101,
    category: "SMP",
    subject: "Matematika",
    format: "PDF",
    pages: "20 hal",
    title: "Modul Ajar Matematika Kelas 8 - Sistem Persamaan Linear Dua Variabel (SPLDV)",
    seller: "Budi Santoso, S.Pd.",
    verified: true,
    price: 30000,
    rating: 4.9,
    reviews: 58,
    gradient: "from-teal-600 to-emerald-500",
    icon: "π"
  },
  {
    id: 102,
    category: "SMP",
    subject: "Matematika",
    format: "PPT",
    pages: "25 slide",
    title: "Media Slide Presentasi Kreatif Aljabar & Fungsi Kuadrat",
    seller: "Sri Wahyuni, M.Pd.",
    verified: true,
    price: 25000,
    rating: 4.7,
    reviews: 42,
    gradient: "from-cyan-600 to-teal-500",
    icon: "x²"
  },
  {
    id: 103,
    category: "SMP",
    subject: "IPA",
    format: "PDF",
    pages: "18 hal",
    title: "Modul IPA Terpadu Kelas 8 - Tekanan Zat Cair & Hukum Archimedes",
    seller: "Sri Wahyuni, M.Pd.",
    verified: true,
    price: 20000,
    rating: 4.8,
    reviews: 93,
    gradient: "from-indigo-600 to-blue-500",
    icon: "⚛"
  },
  {
    id: 104,
    category: "SMP",
    subject: "Matematika",
    format: "Word",
    pages: "10 hal",
    title: "Soal Latihan & Pembahasan Sumatif Tengah Semester Ganjil Matematika Kelas 8",
    seller: "Budi Santoso, S.Pd.",
    verified: true,
    price: 15000,
    rating: 5.0,
    reviews: 14,
    gradient: "from-rose-500 to-amber-500",
    icon: "±"
  }
];

export default function DetailPage() {
  const [previewPage, setPreviewPage] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState("QRIS");

  // Toggle checkout bar helpers
  const handlePageNext = () => {
    if (previewPage < 5) setPreviewPage(previewPage + 1);
  };
  
  const handlePagePrev = () => {
    if (previewPage > 1) setPreviewPage(previewPage - 1);
  };

  const formatIDR = (num: number) => {
    return "Rp " + num.toLocaleString("id-ID");
  };

  return (
    <div className="min-h-screen bg-soft-gray flex flex-col font-sans relative">
      
      {/* CHECKOUT MODAL SIMULATION */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setCheckoutModalOpen(false)} />
          
          <div className="bg-white rounded-[32px] border border-slate-100 max-w-md w-full shadow-2xl p-6 sm:p-8 relative z-10 animate-scale-up">
            <button 
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <XIcon className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft text-primary font-bold text-xs mb-3 border border-primary/10">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Pembayaran Instan & Aman
              </div>
              <h3 className="text-xl font-black text-slate-900">Pembayaran EduSell</h3>
              <p className="text-xs text-slate-500 font-medium">Selesaikan transaksi untuk mengunduh materi instan</p>
            </div>

            {/* Price breakdown */}
            <div className="bg-soft-gray border border-slate-200/80 rounded-2xl p-4 mb-5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-2">
                <span>Modul Persamaan Linear Kls 8</span>
                <span>{formatIDR(35000)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-2">
                <span>Biaya Platform (QRIS)</span>
                <span className="text-emerald-600">Gratis</span>
              </div>
              <hr className="border-slate-200/80 my-2" />
              <div className="flex justify-between items-center text-sm font-black text-slate-900">
                <span>Total Bayar</span>
                <span className="text-primary text-base">{formatIDR(35000)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-6">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-3">Pilih E-Wallet / Bank</p>
              <div className="grid grid-cols-3 gap-2">
                {["QRIS", "GoPay", "Dana"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setActivePaymentMethod(method)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      activePaymentMethod === method
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-350"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* QRIS BARCODE IMITATION GRAPHIC */}
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-900 flex flex-col items-center justify-center text-center">
              <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-800 flex flex-col items-center gap-2 mb-3">
                {/* QR code vector simulator */}
                <div className="w-40 h-40 bg-grid-pattern relative border border-slate-100 flex items-center justify-center p-2">
                  {/* Mock QR boxes */}
                  <div className="absolute top-1 left-1 w-6 h-6 border-4 border-slate-900" />
                  <div className="absolute top-1 right-1 w-6 h-6 border-4 border-slate-900" />
                  <div className="absolute bottom-1 left-1 w-6 h-6 border-4 border-slate-900" />
                  <div className="w-24 h-24 border border-dashed border-slate-300 flex flex-col items-center justify-center">
                    <Smartphone className="w-6 h-6 text-slate-400 animate-pulse" />
                    <span className="text-[8px] font-black text-slate-400 tracking-widest uppercase mt-1">EDUSELL QR</span>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">PT EDUKASI KARYA INDONESIA</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                <Clock className="w-3.5 h-3.5 text-accent animate-spin-hover" />
                <span>Batas Waktu Scan: <strong className="text-white">14:59</strong></span>
              </div>
            </div>

            {/* Fake pay action trigger */}
            <button
              onClick={() => {
                alert("Transaksi Berhasil disimulasikan! Men-download file modul ajar...");
                setCheckoutModalOpen(false);
              }}
              className="w-full mt-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-xl shadow-md transition-all text-xs cursor-pointer"
            >
              Simulasikan Transaksi Berhasil
            </button>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <img src="/Logo Header edusell.png" alt="EduSell" className="h-11 sm:h-16 w-auto object-contain" />
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-slate-600 hover:text-primary font-medium transition-colors text-sm">Beranda</a>
              <a href="/browse" className="text-slate-600 hover:text-primary font-medium transition-colors text-sm">Jelajahi Materi</a>
              <a href="/#jadi-seller" className="text-slate-600 hover:text-primary font-medium transition-colors text-sm">Jadi Seller</a>
              <a href="/#tentang" className="text-slate-600 hover:text-primary font-medium transition-colors text-sm">Tentang Kami</a>
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href="/login"
                className="px-5 py-2 rounded-xl border border-primary/20 text-primary font-semibold hover:bg-primary-soft hover:border-primary text-sm cursor-pointer text-center"
              >
                Masuk
              </a>
              <a 
                href="/login"
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark shadow-md text-sm cursor-pointer text-center"
              >
                Daftar Gratis
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="flex-grow pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          
          {/* 2. BREADCRUMB */}
          <nav className="mb-6 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <a href="/" className="hover:text-primary transition-colors">Beranda</a>
            <span>/</span>
            <a href="/browse" className="hover:text-primary transition-colors">Jelajahi Materi</a>
            <span>/</span>
            <span className="text-slate-400">Matematika</span>
            <span>/</span>
            <span className="text-slate-700 font-bold line-clamp-1 max-w-[200px] sm:max-w-xs">
              Modul Ajar Matematika: Persamaan Linear
            </span>
          </nav>

          {/* 2-COLUMN MAIN CONTENT (65% LEFT / 35% RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 3. LEFT COLUMN — Content (65%) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* A. MATERIAL PREVIEW AREA */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-4 sm:p-6">
                
                {/* Simulated DRM Preview frame container */}
                <div className="bg-slate-950 rounded-2xl aspect-[4/3] w-full relative flex items-center justify-center p-6 border border-slate-900 overflow-hidden shadow-inner text-slate-900 select-none">
                  
                  {/* Decorative faint background mesh grids */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />

                  {/* Dynamic DRM Page Rendering content */}
                  {previewPage <= 2 ? (
                    /* Clear worksheet content for Page 1 & 2 */
                    <div className="bg-white w-full h-full rounded-xl shadow-lg p-6 sm:p-8 flex flex-col justify-between border border-slate-100 relative animate-fade-in">
                      {/* Tanda Air Watermark */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none transform -rotate-45">
                        <span className="text-5xl font-black font-mono text-slate-900">PRATINJAU EDUSELL</span>
                      </div>

                      {/* Worksheet Header info */}
                      <div className="border-b-2 border-primary/20 pb-4">
                        <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 mb-1.5 uppercase tracking-wider">
                          <span>LEMBAR KERJA SISWA K-12</span>
                          <span>MATEMATIKA SMP KELAS 8</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight flex items-center gap-1.5">
                          Bab 3: Persamaan & Pertidaksamaan Linear Satu Variabel
                          <span className="text-xs font-bold bg-primary-soft text-primary px-2 py-0.5 rounded-md">Fase D</span>
                        </h4>
                      </div>

                      {/* Worksheet content bodies */}
                      {previewPage === 1 ? (
                        /* Page 1 Details */
                        <div className="flex-grow py-4 flex flex-col gap-3 justify-center text-xs">
                          <div className="bg-primary-soft p-3 rounded-lg border border-primary/10">
                            <h5 className="font-bold text-primary mb-1">A. Pemahaman Konsep Pokok</h5>
                            <p className="text-slate-600 leading-relaxed font-medium">
                              Persamaan Linear Satu Variabel (PLSV) adalah kalimat terbuka yang dihubungkan oleh tanda sama dengan (=) dan hanya mempunyai satu variabel berpangkat satu.
                            </p>
                          </div>
                          
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                            <h5 className="font-bold text-slate-700 mb-1">Bentuk Umum PLSV:</h5>
                            <p className="font-mono text-center text-sm font-bold text-primary-dark my-1.5">
                              ax + b = c
                            </p>
                            <p className="text-[10px] text-slate-400 font-semibold text-center">Di mana: a, b, c merupakan Konstanta dan x merupakan Variabel.</p>
                          </div>
                        </div>
                      ) : (
                        /* Page 2 Details */
                        <div className="flex-grow py-4 flex flex-col gap-3 justify-center text-xs">
                          <div className="border-l-4 border-accent bg-accent/5 p-3 rounded-r-lg">
                            <h5 className="font-bold text-accent-dark mb-1">B. Contoh Penyelesaian Soal</h5>
                            <p className="text-slate-600 leading-relaxed font-medium">
                              Tentukan nilai x yang memenuhi persamaan berikut: <strong className="text-slate-800 font-bold">2x + 5 = 15</strong>
                            </p>
                          </div>
                          
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 font-mono text-[11px] leading-relaxed text-slate-700">
                            <p className="font-bold text-primary">Langkah 1: Kurangkan 5 dari kedua ruas</p>
                            <p className="pl-4">2x + 5 - 5 = 15 - 5</p>
                            <p className="pl-4">2x = 10</p>
                            
                            <p className="font-bold text-primary mt-2">Langkah 2: Bagi kedua ruas dengan 2</p>
                            <p className="pl-4">2x / 2 = 10 / 2</p>
                            <p className="pl-4 font-black text-accent-dark">x = 5</p>
                          </div>
                        </div>
                      )}

                      {/* Footer information */}
                      <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                        <span>Pembuat: Budi Santoso, S.Pd</span>
                        <span>Halaman {previewPage} dari 15</span>
                      </div>
                    </div>
                  ) : (
                    /* Heavily Blurred DRM Locked screen for Page 3, 4 & 5 */
                    <div className="w-full h-full relative flex items-center justify-center rounded-xl overflow-hidden bg-slate-900 border border-slate-800 animate-fade-in">
                      {/* Blurred background mockup representation */}
                      <div className="absolute inset-0 bg-white/5 opacity-20 filter blur-xl select-none flex flex-col justify-between p-6">
                        <div className="border-b border-white/20 pb-4">
                          <div className="h-4 bg-white/20 rounded w-1/4 mb-2" />
                          <div className="h-6 bg-white/20 rounded w-3/4" />
                        </div>
                        <div className="space-y-4">
                          <div className="h-10 bg-white/20 rounded w-full" />
                          <div className="h-20 bg-white/20 rounded w-full" />
                        </div>
                        <div className="border-t border-white/20 pt-4 h-4" />
                      </div>

                      {/* Frosted locked center card */}
                      <div className="relative z-10 max-w-sm mx-auto p-6 bg-slate-950/80 border border-slate-800 rounded-3xl text-center text-white backdrop-blur-md flex flex-col items-center">
                        <div className="w-12 h-12 bg-accent/20 border border-accent/30 rounded-2xl flex items-center justify-center text-accent mb-4 animate-bounce">
                          <Lock className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-black tracking-tight mb-2 flex items-center gap-1.5 justify-center">
                          Pratinjau Dilindungi DRM EduSell
                        </h4>
                        <p className="text-slate-350 text-[11px] font-semibold leading-relaxed mb-5">
                          Halaman {previewPage} sampai 15 dikunci demi hak cipta pembuat. Silakan beli materi ini seharga <strong className="text-accent">{formatIDR(35000)}</strong> untuk mendapatkan file PDF asli berkualitas penuh tanpa blur.
                        </p>
                        <button
                          onClick={() => setCheckoutModalOpen(true)}
                          className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-xs font-black rounded-xl shadow-lg shadow-accent/20 transition-all cursor-pointer"
                        >
                          Beli Sekarang & Buka Semua Halaman
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Flipbook controls row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePagePrev}
                      disabled={previewPage === 1}
                      className="p-2 border border-slate-200 hover:border-primary disabled:opacity-40 disabled:hover:border-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <span className="text-xs font-extrabold text-slate-500 bg-soft-gray border border-slate-200 px-4 py-2 rounded-xl">
                      Pratinjau: <span className="text-primary font-black">{previewPage}</span> dari 15 halaman
                    </span>

                    <button
                      onClick={handlePageNext}
                      disabled={previewPage === 5}
                      className="p-2 border border-slate-200 hover:border-primary disabled:opacity-40 disabled:hover:border-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      alert("Pratinjau DRM interaktif kami membatasi penayangan penuh sebelum pembelian guna menghargai orisinalitas pembuat. Membeli materi ini akan langsung memberi Anda link download PDF penuh 15 halaman.");
                    }}
                    className="text-xs text-primary font-bold hover:underline cursor-pointer"
                  >
                    Buka Pratinjau Penuh (Hanya Hal. 1-2)
                  </button>
                </div>

              </div>

              {/* B. MATERIAL INFO */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                
                {/* Dynamic tag pills */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wide">
                    SMP
                  </span>
                  <span className="bg-accent-soft border border-accent/20 text-accent-dark text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wide">
                    Kelas 8
                  </span>
                  <span className="bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wide">
                    Matematika
                  </span>
                  <span className="bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wide flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    PDF
                  </span>
                  <span className="bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wide">
                    15 Halaman
                  </span>
                </div>

                {/* Main page h1 title */}
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                  Modul Ajar Matematika: Persamaan Linear Kelas 8 — Kurikulum Merdeka
                </h1>

                {/* Rating line */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-6 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-slate-800 font-bold">4.8</span>
                    <span className="text-slate-400 font-medium">(124 ulasan)</span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                  <div>
                    <span className="text-slate-800 font-bold">890</span> unduhan/terjual
                  </div>
                </div>

                {/* Summary desc paragraph */}
                <div>
                  <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-widest mb-2.5">Deskripsi Singkat</h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    Modul ajar lengkap yang dirancang khusus untuk pembelajaran Persamaan Linear Satu Variabel (PLSV) untuk siswa Sekolah Menengah Pertama (SMP) Kelas VIII. Modul ini sepenuhnya disesuaikan dengan kurikulum Merdeka terbaru (Fase D), menyajikan konsep materi dasar secara mendalam, contoh pemecahan soal berurutan, latihan terbimbing, serta kuis penilaian formatif siap cetak. Cocok sebagai acuan utama guru di kelas maupun sebagai materi belajar mandiri siswa di rumah.
                  </p>
                </div>

              </div>

              {/* C. WHAT'S INCLUDED SECTION */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <h3 className="text-lg font-black text-slate-900 mb-5 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Materi yang Kamu Dapatkan
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "15 halaman modul lengkap pembelajaran (PDF siap cetak)",
                    "30 butir soal latihan mandiri lengkap dengan kunci jawaban",
                    "Rencana Pelaksanaan Pembelajaran (RPP) yang mudah disesuaikan",
                    "Kompatibilitas penuh dengan Kurikulum Merdeka (Fase D)",
                    "File teks orisinal, rapi, resolusi cetak ultra-tinggi",
                    "Hak penggunaan personal seumur hidup untuk kegiatan mengajar"
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-slate-600">
                      <div className="bg-emerald-500/10 text-emerald-600 p-1 rounded-lg flex-shrink-0 mt-0.5 border border-emerald-500/15">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* D. SELLER INFO CARD */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  {/* Creator Initial Circle */}
                  <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">
                    BS
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 flex items-center justify-center sm:justify-start gap-1">
                      Budi Santoso, S.Pd.
                      <BadgeCheck className="w-5 h-5 text-primary fill-primary/10" />
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">Guru Matematika SMP Pasundan 1 Bandung</p>
                    
                    {/* Stats pills */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-bold text-slate-500 mt-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        4.9
                      </span>
                      <span className="text-slate-200">|</span>
                      <span>234 materi ajar</span>
                      <span className="text-slate-200">|</span>
                      <span>5.200+ unduhan</span>
                    </div>
                  </div>
                </div>

                <button className="px-5 py-3 border border-slate-200 hover:border-primary hover:text-primary text-slate-600 text-xs font-bold rounded-xl transition-all whitespace-nowrap self-stretch sm:self-center text-center cursor-pointer">
                  Lihat Semua Materi Seller
                </button>
              </div>

              {/* E. REVIEWS SECTION */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <h3 className="text-lg font-black text-slate-900 mb-6">Ulasan & Rating Guru</h3>

                {/* Rating Summary bars breakdown grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-100 pb-8 mb-8">
                  {/* Big Number average */}
                  <div className="md:col-span-4 text-center">
                    <h4 className="text-5xl font-black text-primary tracking-tight">4.8</h4>
                    <div className="flex text-amber-400 justify-center my-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4.5 h-4.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-slate-400">Berdasarkan 124 ulasan pendidik</p>
                  </div>

                  {/* Distribution Bars */}
                  <div className="md:col-span-8 space-y-2">
                    {[
                      { stars: 5, pct: 80 },
                      { stars: 4, pct: 15 },
                      { stars: 3, pct: 3 },
                      { stars: 2, pct: 1 },
                      { stars: 1, pct: 1 }
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center text-xs font-semibold text-slate-500 gap-3">
                        <span className="w-3 text-right">{row.stars}</span>
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <div className="flex-grow bg-slate-150 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-amber-400 h-full rounded-full"
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-slate-400">{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 Review Cards list */}
                <div className="space-y-6">
                  
                  {/* Review 1 */}
                  <div className="border-b border-slate-100 pb-6">
                    <div className="flex items-center justify-between text-xs font-semibold mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-[10px]">
                          IS
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900">Bu Indah Sari, S.Pd</h5>
                          <p className="text-[10px] text-slate-400 font-medium">Guru Kelas SD, Bandung</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">14 Mei 2026</span>
                    </div>
                    {/* Rating stars */}
                    <div className="flex text-amber-400 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600 font-medium">
                      "Modul ajar ini benar-benar ringkas dan terstruktur dengan rapi. Soal-soal latihan yang ada di dalamnya sangat relevan dengan soal asesmen Kurikulum Merdeka. Membantu saya menghemat waktu mengajar kelas 8 minggu lalu!"
                    </p>
                  </div>

                  {/* Review 2 */}
                  <div className="border-b border-slate-100 pb-6">
                    <div className="flex items-center justify-between text-xs font-semibold mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent-dark font-black text-[10px]">
                          FW
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900">Bu Fitri Wijayanti</h5>
                          <p className="text-[10px] text-slate-400 font-medium">Guru Matematika, Medan</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">02 Mei 2026</span>
                    </div>
                    {/* Rating stars */}
                    <div className="flex text-amber-400 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600 font-medium">
                      "Materi sangat mudah dipahami siswa, terutama pada bab penyelesaian persamaan satu variabel dengan pengurangan/penambahan ruas. Ilustrasi penjelasannya runtut. Terima kasih Pak Budi!"
                    </p>
                  </div>

                  {/* Review 3 */}
                  <div className="pb-2">
                    <div className="flex items-center justify-between text-xs font-semibold mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600 font-black text-[10px]">
                          HP
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900">Pak Hermawan Prasetyo</h5>
                          <p className="text-[10px] text-slate-400 font-medium">Guru SMP, Surabaya</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">28 April 2026</span>
                    </div>
                    {/* Rating stars */}
                    <div className="flex text-amber-400 mb-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <Star className="w-3 h-3 text-slate-200" />
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600 font-medium">
                      "Secara keseluruhan isinya sudah luar biasa lengkap. Saya berikan 4 bintang karena ada 1 typo kecil rumus di halaman 9 bagian kuis mandiri, tapi selebihnya modul ini sangat presisi dan menghemat waktu saya."
                    </p>
                  </div>

                </div>

                <div className="text-center mt-6 pt-4 border-t border-slate-100">
                  <button className="text-xs font-bold text-primary hover:underline cursor-pointer">
                    Lihat Semua Ulasan
                  </button>
                </div>

              </div>

            </div>

            {/* 4. RIGHT COLUMN — Sticky Purchase Panel (35% on Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xl sticky top-24">
              
              {/* E-commerce Price block */}
              <div className="mb-5">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-black text-primary tracking-tight">
                    {formatIDR(35000)}
                  </span>
                  <span className="text-slate-400 text-sm line-through font-semibold">
                    {formatIDR(50000)}
                  </span>
                </div>
                {/* Discount Badge */}
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-accent-soft text-accent-dark font-extrabold text-[10px] mt-2 border border-accent/15">
                  HEMAT 30%
                </div>
              </div>

              {/* Call-to-actions */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-2xl shadow-lg shadow-primary/20 transition-all text-xs cursor-pointer active:scale-[0.98]"
                >
                  Beli Sekarang (Unduh Instan)
                </button>
                
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-full py-3.5 border rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isWishlisted
                      ? "border-red-500 bg-red-50 text-red-500"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
                  {isWishlisted ? "Tersimpan di Wishlist" : "Tambah ke Wishlist"}
                </button>
              </div>

              <hr className="border-slate-100 my-4" />

              {/* Trust Indicators lists */}
              <div className="space-y-3 mb-6 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-400 text-base">📄</span>
                  <span>Format Berkas: <strong className="text-slate-900 font-bold">PDF</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-400 text-base">📚</span>
                  <span>Panjang Modul: <strong className="text-slate-900 font-bold">15 Halaman</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-400 text-base">⬇️</span>
                  <span>Unduhan Instan <strong className="text-emerald-600 font-bold">setelah pembayaran</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-400 text-base">🔒</span>
                  <span>Dilindungi <strong className="text-slate-900 font-bold">DRM EduSell Legal</strong></span>
                </div>
              </div>

              {/* Secure Payment logos */}
              <div className="border-t border-slate-100 pt-5 mt-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Metode Pembayaran Instan</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[8px] font-black text-slate-700 tracking-wider">
                    QRIS
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[8px] font-black text-slate-600">
                    GoPay
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[8px] font-black text-slate-600">
                    OVO
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[8px] font-black text-slate-600">
                    DANA
                  </span>
                </div>
              </div>

              {/* Help Line link */}
              <div className="text-center mt-5">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-primary font-semibold transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  Butuh bantuan sebelum membeli?
                </a>
              </div>

            </aside>

          </div>

          {/* 5. RELATED MATERIALS SECTION (BELOW MAIN CONTENT) */}
          <section className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Materi Serupa yang Mungkin Kamu Suka
              </h2>
              <span className="text-xs text-primary font-bold hover:underline cursor-pointer flex items-center gap-1">
                Jelajahi Semua
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Horizontal Scroll list row */}
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin snap-x">
              {SIMILAR_MATERIALS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => alert(`Mengalihkan ke detail materi serupa: ${item.title}`)}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 min-w-[280px] sm:min-w-[320px] max-w-[320px] flex-shrink-0 snap-start flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  
                  {/* Card Thumbnail Top */}
                  <div className={`h-36 bg-gradient-to-br ${item.gradient} p-4 relative flex flex-col justify-between text-white`}>
                    <div className="flex items-center justify-between">
                      <span className="bg-white/25 backdrop-blur-md px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">
                        {item.category}
                      </span>
                      <span className="bg-white text-slate-900 px-2 py-0.5 rounded-md text-[9px] font-bold">
                        {item.subject}
                      </span>
                    </div>
                    <div className="text-3xl font-extrabold font-mono opacity-25 absolute bottom-3 right-3 select-none">
                      {item.icon}
                    </div>
                    <div className="text-[10px] font-bold">
                      {item.format} · {item.pages}
                    </div>
                  </div>

                  {/* Card Info Body */}
                  <div className="p-4 flex-grow flex flex-col justify-between h-[180px]">
                    <div>
                      <div className="flex items-center gap-1 mb-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-bold text-slate-800">{item.rating}</span>
                        <span className="text-[9px] text-slate-400">({item.reviews})</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                    </div>

                    {/* Card Price line */}
                    <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-600 truncate max-w-[150px]">
                        {item.seller}
                      </span>
                      <span className="text-sm font-black text-primary">
                        {formatIDR(item.price)}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* MOBILE STICKY FLOATING BOTTOM BAR (lg:hidden) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/90 shadow-2xl p-4 flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Harga Materi</span>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black text-primary">
              {formatIDR(35000)}
            </span>
            <span className="text-slate-400 text-xs line-through">
              {formatIDR(50000)}
            </span>
          </div>
        </div>

        <button
          onClick={() => setCheckoutModalOpen(true)}
          className="flex-grow py-3 bg-primary hover:bg-primary-dark text-white font-extrabold text-xs rounded-xl shadow-lg shadow-primary/20 text-center cursor-pointer whitespace-nowrap"
        >
          Beli Sekarang
        </button>
      </div>

    </div>
  );
}

// Simple Helper Local Component for Close/X icon
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
