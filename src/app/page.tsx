"use client";

import React, { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  UserPlus, 
  Upload, 
  Search, 
  CreditCard, 
  Users, 
  SlidersHorizontal, 
  Smartphone, 
  BadgeCheck, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  Download, 
  GraduationCap, 
  Award,
  Filter,
  CheckCircle,
  HelpCircle,
  Play
} from "lucide-react";

// Mock Data for Featured Materials
const INITIAL_MATERIALS = [
  {
    id: 1,
    category: "SMP",
    subject: "Matematika",
    grade: "Kelas 7",
    title: "Modul Ajar Matematika Kurikulum Merdeka - Fase D",
    seller: "Budi Santoso, S.Pd.",
    sellerAvatar: "BS",
    verified: true,
    price: 25000,
    rating: 4.9,
    reviews: 124,
    downloads: 412,
    gradient: "from-teal-600 to-emerald-500",
    icon: "π"
  },
  {
    id: 2,
    category: "SMP",
    subject: "IPA",
    grade: "Kelas 8",
    title: "Rencana Pelaksanaan Pembelajaran (RPP) Terpadu Sistem Pencernaan",
    seller: "Sri Wahyuni, M.Pd.",
    sellerAvatar: "SW",
    verified: true,
    price: 35000,
    rating: 4.8,
    reviews: 89,
    downloads: 231,
    gradient: "from-cyan-600 to-teal-500",
    icon: "⚛"
  },
  {
    id: 3,
    category: "SMA",
    subject: "Sejarah",
    grade: "Kelas 10",
    title: "Slide Presentasi Interaktif Sejarah Kolonialisme di Indonesia",
    seller: "Ahmad Hidayat, S.S.",
    sellerAvatar: "AH",
    verified: true,
    price: 45000,
    rating: 5.0,
    reviews: 42,
    downloads: 115,
    gradient: "from-amber-600 to-orange-500",
    icon: "📖"
  },
  {
    id: 4,
    category: "SD",
    subject: "Bahasa Inggris",
    grade: "Kelas 3",
    title: "Lembar Kerja Siswa (LKS) Tematik Vocabulary & Grammar Builder",
    seller: "Maria Grace, S.Pd.",
    sellerAvatar: "MG",
    verified: false,
    price: 15000,
    rating: 4.7,
    reviews: 75,
    downloads: 504,
    gradient: "from-rose-500 to-amber-500",
    icon: "A"
  }
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Semua");
  const [scrolled, setScrolled] = useState(false);
  
  // Calculator States
  const [pricePerMaterial, setPricePerMaterial] = useState(25000);
  const [estimatedSales, setEstimatedSales] = useState(150);

  // Live Buyer Alert Simulator
  const [buyerAlert, setBuyerAlert] = useState<{name: string, item: string} | null>(null);
  
  const buyers = [
    { name: "Bu Rahmawati", item: "Modul Ajar Matematika" },
    { name: "Pak Hartono", item: "RPP Terpadu IPA Kelas 8" },
    { name: "Bu Indah Sari", item: "LKS Tematik Bahasa Inggris" },
    { name: "Pak Dian Wijaya", item: "Slide Presentasi Sejarah" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    
    // Simulate active buyers purchasing items every 7 seconds
    const interval = setInterval(() => {
      const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
      setBuyerAlert(randomBuyer);
      const timer = setTimeout(() => {
        setBuyerAlert(null);
      }, 4000);
      return () => clearTimeout(timer);
    }, 8500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const filteredMaterials = activeTab === "Semua" 
    ? INITIAL_MATERIALS 
    : INITIAL_MATERIALS.filter(m => m.category === activeTab);

  // Formatting utility for Indonesian Rupiah
  const formatIDR = (num: number) => {
    return "Rp " + num.toLocaleString("id-ID");
  };

  return (
    <div className="min-h-screen bg-white relative flex flex-col font-sans">
      
      {/* LIVE BUYER NOTIFICATION ALERT PANEL */}
      {buyerAlert && (
        <div className="fixed bottom-6 left-6 z-50 animate-bounce duration-500 max-w-sm">
          <div className="bg-slate-900/95 text-white border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-full border border-primary/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Transaksi Baru</p>
              <p className="text-sm font-semibold text-white">{buyerAlert.name}</p>
              <p className="text-xs text-slate-300">Baru saja membeli <span className="text-accent font-medium">"{buyerAlert.item}"</span></p>
            </div>
          </div>
        </div>
      )}

      {/* 1. NAVBAR SECTION */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? "glass shadow-lg py-3" 
            : "bg-transparent py-5"
        }`}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <img src="/Logo Header edusell.png" alt="EduSell" className="h-11 sm:h-16 w-auto object-contain" />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="#materi" 
                className="text-slate-600 hover:text-primary font-medium transition-colors text-sm"
              >
                Jelajahi Materi
              </a>
              <a 
                href="#jadi-seller" 
                className="text-slate-600 hover:text-primary font-medium transition-colors text-sm"
              >
                Jadi Seller
              </a>
              <a 
                href="#tentang" 
                className="text-slate-600 hover:text-primary font-medium transition-colors text-sm"
              >
                Tentang Kami
              </a>
            </nav>

            {/* Desktop Auth CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                id="btn-login-desktop"
                href="/login"
                className="px-5 py-2 rounded-xl border border-primary/20 text-primary font-semibold hover:bg-primary-soft hover:border-primary transition-all duration-200 text-sm cursor-pointer text-center"
              >
                Masuk
              </a>
              <a 
                id="btn-register-desktop"
                href="/login"
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 text-sm cursor-pointer text-center"
              >
                Daftar Gratis
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <button
                id="btn-mobile-menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-primary focus:outline-none transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass border-t border-slate-200 py-4 px-6 absolute top-full left-0 right-0 shadow-xl animate-fade-in">
            <nav className="flex flex-col gap-4">
              <a 
                href="#materi" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-primary font-semibold transition-colors py-2"
              >
                Jelajahi Materi
              </a>
              <a 
                href="#jadi-seller" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-primary font-semibold transition-colors py-2"
              >
                Jadi Seller
              </a>
              <a 
                href="#tentang" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-primary font-semibold transition-colors py-2"
              >
                Tentang Kami
              </a>
              <hr className="border-slate-200 my-1" />
              <div className="flex flex-col gap-3 pt-2">
                <a 
                  id="btn-login-mobile"
                  href="/login"
                  className="w-full py-2.5 rounded-xl border border-primary text-primary font-semibold hover:bg-primary-soft text-center cursor-pointer"
                >
                  Masuk
                </a>
                <a 
                  id="btn-register-mobile"
                  href="/login"
                  className="w-full py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark shadow-md text-center cursor-pointer"
                >
                  Daftar Gratis
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow pt-24">
        
        {/* 2. HERO SECTION */}
        <section 
          className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-white pb-16 pt-8 md:pb-24 md:pt-16"
          id="hero"
        >
          {/* Background Ambient Shapes */}
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-soft -z-10" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-soft -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Hero Copywriting */}
              <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
                {/* Micro-badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs self-center lg:self-start mb-6 border border-primary/15 tracking-wide uppercase">
                  <Award className="w-3.5 h-3.5 text-accent" />
                  Marketplace Materi K-12 Terlengkap di Indonesia
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                  Jual & Beli Materi Ajar Digital, <span className="text-primary relative inline-block">Mudah <span className="absolute bottom-1 left-0 right-0 h-2 bg-accent/25 rounded-md -z-10"></span></span> dan <span className="text-accent">Terpercaya</span>
                </h1>
                
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium">
                  Platform marketplace khusus guru K-12 Indonesia. Bagikan karyamu, bantu sesama guru mengajar dengan efektif, dan raih pendapatan pasif berlipat.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#jadi-seller"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5"
                  >
                    Mulai Jual Materi
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="#materi"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                  >
                    Cari Materi Ajar
                  </a>
                </div>

                {/* Secure Trust indicators */}
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium border-t border-slate-200/60 pt-6">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Pembayaran Instan & Aman
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Kurikulum Nasional Terupdate
                  </div>
                </div>
              </div>

              {/* Hero Interactive App Dashboard Mockup */}
              <div className="lg:col-span-6 animate-float">
                <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-2xl overflow-hidden text-slate-100">
                  {/* Dashboard header glow */}
                  <div className="absolute top-0 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
                  
                  {/* Top Bar Mockup */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div className="bg-slate-800 text-xs px-6 py-1 rounded-full text-slate-400 border border-slate-700 font-mono">
                      dashboard.edusell.id/seller
                    </div>
                    <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-xs text-slate-300">
                      🔔
                    </div>
                  </div>

                  {/* Seller Profiling Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 border border-primary rounded-full flex items-center justify-center text-primary font-bold text-sm">
                        BS
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold flex items-center gap-1">
                          Budi Santoso, S.Pd.
                          <BadgeCheck className="w-4 h-4 text-primary-light fill-primary-light/10" />
                        </h4>
                        <p className="text-xs text-slate-400">Guru Matematika Kls 7-9</p>
                      </div>
                    </div>
                    <div className="bg-emerald-950/80 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-xl text-xs font-semibold">
                      Seller Level 2
                    </div>
                  </div>

                  {/* Main Grid Metrics inside Mockup */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Earning Card */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
                      <p className="text-xs text-slate-400 mb-1">Total Pendapatan</p>
                      <h3 className="text-xl font-bold text-slate-50">{formatIDR(8450000)}</h3>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2">
                        <TrendingUp className="w-3.5 h-3.5" />
                        +18.4% bulan ini
                      </div>
                    </div>

                    {/* Download Card */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
                      <p className="text-xs text-slate-400 mb-1">Materi Terunduh</p>
                      <h3 className="text-xl font-bold text-slate-50">412 kali</h3>
                      <div className="flex items-center gap-1 text-[11px] text-primary-light mt-2">
                        <Download className="w-3.5 h-3.5" />
                        24 unduhan hari ini
                      </div>
                    </div>
                  </div>

                  {/* Sold Items Tracker */}
                  <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-4">
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Penjualan Terpopuler</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-primary/20 text-primary-light p-1.5 rounded-lg font-bold text-[10px]">Matematika</span>
                          <span className="font-semibold text-slate-100 line-clamp-1 max-w-[150px] sm:max-w-[200px]">Modul Ajar Matematika Kls 7</span>
                        </div>
                        <span className="font-bold text-accent">+Rp 3.550.000</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-primary/20 text-primary-light p-1.5 rounded-lg font-bold text-[10px]">Matematika</span>
                          <span className="font-semibold text-slate-100 line-clamp-1 max-w-[150px] sm:max-w-[200px]">LKS Geometri & Bangun Ruang</span>
                        </div>
                        <span className="font-bold text-accent">+Rp 2.115.000</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="bg-accent/20 text-accent p-1.5 rounded-lg font-bold text-[10px]">IPA</span>
                          <span className="font-semibold text-slate-100 line-clamp-1 max-w-[150px] sm:max-w-[200px]">Modul Ajar Ekosistem Fase D</span>
                        </div>
                        <span className="font-bold text-accent">+Rp 1.785.000</span>
                      </div>
                    </div>
                  </div>

                  {/* Realtime Action Micro-Pulse */}
                  <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                      Sistem Otomatis Pembayaran Aktif
                    </span>
                    <span className="text-slate-500">Update 1s ago</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. STATS BAR SECTION */}
        <section 
          className="relative z-10 -mt-8 max-w-5xl mx-auto px-4 sm:px-6"
          id="stats"
        >
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              
              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center text-center p-2">
                <div className="bg-primary/10 p-3 rounded-full mb-3 text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black text-primary tracking-tight">3.300+</h3>
                <p className="text-sm font-semibold text-slate-500 mt-1">Guru Terdaftar</p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center text-center p-2">
                <div className="bg-accent/10 p-3 rounded-full mb-3 text-accent">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black text-primary tracking-tight">12.000+</h3>
                <p className="text-sm font-semibold text-slate-500 mt-1">Materi Tersedia</p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center text-center p-2">
                <div className="bg-emerald-500/10 p-3 rounded-full mb-3 text-emerald-600">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black text-primary tracking-tight">Rp 500 Juta+</h3>
                <p className="text-sm font-semibold text-slate-500 mt-1">Komisi Dibayarkan</p>
              </div>

            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS SECTION */}
        <section 
          className="py-16 md:py-24 bg-white" 
          id="cara-kerja"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">Cara Kerja Platform</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Langkah Mudah Mulai Berbagi dan Menghasilkan
              </h3>
              <p className="text-slate-500 font-medium mt-4">
                Kami merancang sistem yang super mudah dipahami baik oleh guru pembeli maupun guru penjual materi digital.
              </p>
            </div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Step 1 */}
              <div className="relative group bg-soft-gray rounded-3xl p-8 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 transform hover:-translate-y-1">
                {/* Step badge */}
                <div className="absolute top-6 right-8 text-6xl font-black text-slate-200/80 group-hover:text-primary/10 transition-colors select-none font-mono">
                  01
                </div>
                
                <div className="bg-primary text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform mb-6">
                  <UserPlus className="w-6 h-6" />
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  Daftar & Buat Akun
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Buat akun EduSell dalam 1 menit secara gratis. Lengkapi profil Anda sebagai pendidik untuk membangun kredibilitas di komunitas.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative group bg-soft-gray rounded-3xl p-8 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 transform hover:-translate-y-1">
                {/* Step badge */}
                <div className="absolute top-6 right-8 text-6xl font-black text-slate-200/80 group-hover:text-primary/10 transition-colors select-none font-mono">
                  02
                </div>
                
                <div className="bg-accent text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform mb-6">
                  <Upload className="w-6 h-6" />
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  Upload atau Cari Materi
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Upload modul ajar buatan Anda dengan menentukan harga sendiri, atau gunakan filter cerdas untuk mencari dan mengunduh materi ajar berkualitas.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative group bg-soft-gray rounded-3xl p-8 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 transform hover:-translate-y-1">
                {/* Step badge */}
                <div className="absolute top-6 right-8 text-6xl font-black text-slate-200/80 group-hover:text-primary/10 transition-colors select-none font-mono">
                  03
                </div>
                
                <div className="bg-emerald-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform mb-6">
                  <CreditCard className="w-6 h-6" />
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  Transaksi Otomatis
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Pembayaran diproses instan melalui QRIS/E-Wallet. File langsung terunduh secara otomatis, dan komisi ditransfer langsung ke rekening seller.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* INTERACTIVE EARNINGS CALCULATOR - Premium Addition */}
        <section 
          className="py-16 bg-soft-gray border-y border-slate-200/60"
          id="kalkulator"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent-dark font-bold text-xs mb-3 border border-accent/15">
                  💵 Simulasi Passive Income Guru
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Hitung Potensi Penghasilan Anda</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">Sesuaikan harga materi dan target unduhan untuk melihat simulasinya</p>
              </div>

              {/* Calculator sliders */}
              <div className="space-y-6">
                
                {/* Slider 1: Price */}
                <div>
                  <div className="flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                    <span>Harga per Materi Ajar</span>
                    <span className="text-primary text-base font-extrabold">{formatIDR(pricePerMaterial)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="100000" 
                    step="5000"
                    value={pricePerMaterial}
                    onChange={(e) => setPricePerMaterial(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                    <span>Rp 10.000</span>
                    <span>Rp 50.000</span>
                    <span>Rp 100.000</span>
                  </div>
                </div>

                {/* Slider 2: Sales */}
                <div>
                  <div className="flex items-center justify-between text-sm font-bold text-slate-700 mb-2">
                    <span>Target Jumlah Guru yang Mengunduh</span>
                    <span className="text-accent-dark text-base font-extrabold">{estimatedSales} Guru</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    step="10"
                    value={estimatedSales}
                    onChange={(e) => setEstimatedSales(Number(e.target.value))}
                    className="w-full accent-accent h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                    <span>10 Unduhan</span>
                    <span>500 Unduhan</span>
                    <span>1.000 Unduhan</span>
                  </div>
                </div>

              </div>

              {/* Calculation Result */}
              <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 bg-primary-soft p-6 rounded-2xl border border-primary/10">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-primary-dark uppercase tracking-wider mb-1">Total Pendapatan Tambahan Anda</p>
                  <h4 className="text-3xl font-black text-primary tracking-tight">
                    {formatIDR(pricePerMaterial * estimatedSales)}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    *Estimasi pendapatan kotor sebelum potongan administrasi platform yang minimal.
                  </p>
                </div>
                <a 
                  href="#jadi-seller"
                  className="px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-md transition-all duration-200 text-sm whitespace-nowrap self-stretch sm:self-center text-center cursor-pointer"
                >
                  Mulai Upload Karya Sekarang
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* 5. FEATURED MATERIALS SECTION */}
        <section 
          className="py-16 md:py-24 bg-white" 
          id="materi"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-xl">
                <h2 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">Materi Pilihan</h2>
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Materi Terpopuler Siap Pakai untuk Pembelajaran Anda
                </h3>
              </div>

              {/* Real-time Category Tabs */}
              <div className="flex flex-wrap items-center gap-2 bg-soft-gray p-1.5 rounded-2xl border border-slate-100">
                {["Semua", "SD", "SMP", "SMA"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === tab
                        ? "bg-primary text-white shadow-md"
                        : "text-slate-600 hover:text-primary hover:bg-slate-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Materials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {filteredMaterials.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-primary/20 transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1.5"
                >
                  
                  {/* Subject Thumbnail Placeholder (Sleek vector/gradient art) */}
                  <div className={`h-48 bg-gradient-to-br ${item.gradient} p-6 relative flex flex-col justify-between text-white overflow-hidden`}>
                    {/* Decorative abstract circle */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
                    
                    {/* Top Tag Row */}
                    <div className="flex items-center justify-between z-10">
                      <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase">
                        {item.category}
                      </span>
                      <span className="bg-white text-slate-900 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">
                        {item.subject}
                      </span>
                    </div>

                    {/* Mid Big Icon Graphic representation */}
                    <div className="text-5xl font-extrabold font-mono opacity-20 absolute bottom-4 right-4 select-none">
                      {item.icon}
                    </div>

                    {/* Bottom Label Tag */}
                    <div className="z-10">
                      <p className="text-xs text-white/80 font-semibold">{item.grade}</p>
                      <h4 className="text-sm font-bold truncate mt-0.5">{item.subject} K-12</h4>
                    </div>
                  </div>

                  {/* Card Content body */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Rating bar */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(item.rating) ? "fill-amber-400" : "text-slate-300"
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">{item.rating}</span>
                        <span className="text-[10px] text-slate-400 font-medium">({item.reviews} ulasan)</span>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm font-bold text-slate-900 leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[40px]">
                        {item.title}
                      </h4>
                    </div>

                    {/* Seller details & Price Footer */}
                    <div className="border-t border-slate-100 pt-4 mt-2">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-[9px] border border-primary/15">
                            {item.sellerAvatar}
                          </div>
                          <span className="text-[11px] font-bold text-slate-600 truncate max-w-[100px] flex items-center gap-0.5">
                            {item.seller}
                            {item.verified && (
                              <BadgeCheck className="w-3.5 h-3.5 text-primary fill-primary/10 flex-shrink-0" />
                            )}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-0.5">
                          <Download className="w-3 h-3" />
                          {item.downloads}x
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-slate-900">{formatIDR(item.price)}</span>
                        <button className="text-[11px] font-bold text-primary bg-primary-soft hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                          Beli
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* Button Below */}
            <div className="text-center">
              <button 
                id="btn-lihat-semua"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white font-bold transition-all duration-200 text-sm shadow-md cursor-pointer"
              >
                Lihat Semua Materi
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </section>

        {/* 6. WHY EDUSELL SECTION */}
        <section 
          className="py-16 md:py-24 bg-soft-gray border-y border-slate-150" 
          id="tentang"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">Mengapa EduSell?</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Dirancang Khusus untuk Memajukan Ekosistem Pendidikan Indonesia
              </h3>
              <p className="text-slate-500 font-medium mt-4">
                Kami menyediakan fitur premium untuk mempermudah transaksi materi ajar digital dengan aman, transparan, dan legal.
              </p>
            </div>

            {/* Grid 2x2 with rich layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Feature 1 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-150/80 shadow-md hover:shadow-xl transition-all duration-300 flex gap-6">
                <div className="bg-primary-soft text-primary w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center border border-primary/10">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Dual-Role Account</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    Satu akun untuk dua peran. Anda bisa menjual modul ajar kreatif buatan Anda sekaligus membeli materi referensi mata pelajaran lain secara bergantian tanpa perlu mendaftar ulang.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-150/80 shadow-md hover:shadow-xl transition-all duration-300 flex gap-6">
                <div className="bg-accent-soft text-accent-dark w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center border border-accent/10">
                  <Filter className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Smart Educational Filter</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    Hemat waktu mencari materi. Sistem pencarian kami dirancang khusus berdasarkan standar nasional: Kurikulum Merdeka/K13, jenjang kelas SD/SMP/SMA, serta kategori topik materi spesifik.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-150/80 shadow-md hover:shadow-xl transition-all duration-300 flex gap-6">
                <div className="bg-emerald-500/10 text-emerald-600 w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center border border-emerald-500/10">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Pembayaran Otomatis (QRIS/E-Wallet)</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    Transaksi instan tanpa ribet verifikasi manual. Scan QRIS melalui GoPay, OVO, Dana, LinkAja atau bayar via Virtual Account bank terkemuka di Indonesia. Sistem langsung memproses hak download seketika.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-150/80 shadow-md hover:shadow-xl transition-all duration-300 flex gap-6">
                <div className="bg-primary-soft text-primary w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center border border-primary/10">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Verified Creator Badge</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    Setiap materi yang di-upload melewati proses peninjauan standar oleh kurator ahli EduSell. Keberadaan badge terverifikasi menjamin materi relevan, bebas plagiarisme, dan berkualitas tinggi.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. TESTIMONIAL SECTION */}
        <section 
          className="py-16 md:py-24 bg-white" 
          id="testimoni"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">Apa Kata Guru</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Ribuan Pendidik Telah Merasakan Manfaat EduSell
              </h3>
              <p className="text-slate-500 font-medium mt-4">
                Dengarkan langsung cerita bagaimana sesama guru saling menginspirasi dan meningkatkan produktivitas serta kesejahteraannya.
              </p>
            </div>

            {/* Testimonials grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Testimonial 1 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  {/* Stars */}
                  <div className="flex text-amber-400 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {/* Quote */}
                  <blockquote className="text-slate-600 text-sm leading-relaxed font-medium italic mb-6">
                    "Sebagai guru SD, membuat modul ajar tematik dan RPP dari nol setiap semester sangat menyita waktu saya di rumah. Berkat materi referensi siap pakai di EduSell, saya bisa menghemat puluhan jam kerja dan fokus mendampingi murid belajar!"
                  </blockquote>
                </div>
                {/* Author */}
                <div className="flex items-center gap-3.5 border-t border-slate-100 pt-5">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    IS
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Indah Sari, S.Pd.</h5>
                    <p className="text-xs text-slate-400">Guru Kelas SD, Bandung</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  {/* Stars */}
                  <div className="flex text-amber-400 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {/* Quote */}
                  <blockquote className="text-slate-600 text-sm leading-relaxed font-medium italic mb-6">
                    "Luar biasa! Awalnya saya iseng upload modul Matematika Kls 7 hasil kurasi pribadi. Ternyata responnya sangat tinggi dan sudah diunduh ratusan kali. Ini memberikan penghasilan pasif tambahan yang sangat membantu kesejahteraan saya."
                  </blockquote>
                </div>
                {/* Author */}
                <div className="flex items-center gap-3.5 border-t border-slate-100 pt-5">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm">
                    HP
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Hermawan Prasetyo, M.Pd.</h5>
                    <p className="text-xs text-slate-400">Guru Matematika SMA, Surabaya</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  {/* Stars */}
                  <div className="flex text-amber-400 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {/* Quote */}
                  <blockquote className="text-slate-600 text-sm leading-relaxed font-medium italic mb-6">
                    "Sistem pembayaran otomatis menggunakan QRIS di EduSell lancar tanpa hambatan. Cukup scan, bayar, file langsung terunduh. Verifikasinya real-time. Sebagai pembeli, saya merasa sangat aman bertransaksi di sini."
                  </blockquote>
                </div>
                {/* Author */}
                <div className="flex items-center gap-3.5 border-t border-slate-100 pt-5">
                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    FW
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Fitri Wijayanti, S.Pd.</h5>
                    <p className="text-xs text-slate-400">Guru IPA SMP, Medan</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 8. FINAL CTA BANNER */}
        <section 
          className="py-16 md:py-24 bg-white" 
          id="jadi-seller"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[40px] bg-primary text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl shadow-primary/20 border border-primary-light/10">
              
              {/* Graphic Ambient Circles */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse-soft -z-10" />
              <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-primary-light/40 rounded-full blur-3xl -z-10" />
              
              {/* Content */}
              <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
                
                {/* Icon */}
                <div className="bg-accent/20 border border-accent/30 p-3 rounded-2xl text-accent mb-6 inline-flex items-center justify-center">
                  <GraduationCap className="w-8 h-8" />
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                  Siap Mulai Menghasilkan dari Materi Ajarmu?
                </h3>
                
                <p className="text-slate-200 text-base sm:text-lg mb-10 max-w-2xl font-medium leading-relaxed">
                  Gabung sekarang bersama ribuan guru Indonesia yang telah membagikan modul, presentasi, dan media pembelajaran kreatif. Gratis pendaftaran, pembayaran instan!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 self-stretch sm:self-auto justify-center">
                  <button 
                    id="btn-cta-register"
                    className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-extrabold rounded-xl transition-all duration-200 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 transform hover:-translate-y-0.5 text-sm cursor-pointer whitespace-nowrap"
                  >
                    Daftar Gratis Sekarang
                  </button>
                  <button 
                    id="btn-cta-how"
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-xl border border-white/25 transition-all duration-200 text-sm cursor-pointer whitespace-nowrap"
                  >
                    Pelajari Selengkapnya
                  </button>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    Tanpa biaya bulanan
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    Bagi hasil transparan
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    Penarikan dana cepat
                  </span>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 9. FOOTER SECTION */}
      <footer 
        className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12"
        id="footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main links columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
            
            {/* Logo + Tagline Column */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary text-white p-2 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Edu<span className="text-accent">Sell</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm text-slate-400 font-medium">
                Membantu Guru Indonesia saling berbagi media pembelajaran kreatif, menginspirasi proses belajar mengajar, serta meningkatkan tingkat kesejahteraan pendidik.
              </p>
            </div>

            {/* Links Column 1: Tentang */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <h5 className="text-xs uppercase tracking-widest text-white font-extrabold mb-1">Perusahaan</h5>
              <a href="#tentang" className="text-sm hover:text-white transition-colors">Tentang Kami</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Karir</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Blog Edukasi</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Press Kit</a>
            </div>

            {/* Links Column 2: Layanan */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <h5 className="text-xs uppercase tracking-widest text-white font-extrabold mb-1">Materi</h5>
              <a href="#materi" className="text-sm hover:text-white transition-colors">Sekolah Dasar (SD)</a>
              <a href="#materi" className="text-sm hover:text-white transition-colors">Sekolah Menengah (SMP)</a>
              <a href="#materi" className="text-sm hover:text-white transition-colors">Sekolah Atas (SMA/K)</a>
              <a href="#materi" className="text-sm hover:text-white transition-colors">Bahan Presentasi</a>
            </div>

            {/* Links Column 3: Bantuan */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <h5 className="text-xs uppercase tracking-widest text-white font-extrabold mb-1">Dukungan & Legal</h5>
              <a href="#" className="text-sm hover:text-white transition-colors">Pusat Bantuan</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Kebijakan Privasi</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Hubungi Kami</a>
            </div>

          </div>

          {/* Secure Payment logos Row */}
          <div className="border-t border-slate-900 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 text-center md:text-left">
                Metode Pembayaran Instan & Terpercaya
              </p>
              
              {/* Payment badges row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <span className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-black text-white tracking-widest uppercase">
                  QRIS
                </span>
                <span className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-black text-slate-300 tracking-wider">
                  GoPay
                </span>
                <span className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-black text-slate-300 tracking-wider">
                  OVO
                </span>
                <span className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-black text-slate-300 tracking-wider">
                  DANA
                </span>
                <span className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-black text-slate-300 tracking-wider">
                  BCA VA
                </span>
                <span className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-black text-slate-300 tracking-wider">
                  MANDIRI VA
                </span>
              </div>
            </div>

            {/* Certifications / Trust logos */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span>Keamanan Terjamin 256-bit SSL</span>
              <span className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
              <span>Didukung Bank Indonesia</span>
            </div>
          </div>

          {/* Copyright bar */}
          <div className="border-t border-slate-900 pt-8 text-center flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 font-semibold gap-4">
            <p>© {new Date().getFullYear()} EduSell (PT Edukasi Karya Indonesia). Hak Cipta Dilindungi.</p>
            <p className="flex items-center gap-1">
              Dibuat dengan ❤️ untuk Guru Hebat Indonesia
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
