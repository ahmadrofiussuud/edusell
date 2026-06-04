"use client";

import React, { useState } from "react";
import { 
  Home, 
  BookOpen, 
  UploadCloud, 
  Wallet, 
  Star, 
  Settings, 
  ArrowLeftRight, 
  LogOut, 
  Bell, 
  BadgeCheck, 
  ChevronUp, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Search, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Image as ImageIcon,
  Menu,
  X,
  GraduationCap
} from "lucide-react";

// Mock Database of uploaded materials
const INITIAL_MATERIALS = [
  {
    id: 1,
    title: "Modul Ajar Matematika Kelas 7 - Bilangan Bulat & Operasi Hitung",
    category: "SMP",
    subject: "Matematika",
    price: 25000,
    sales: 412,
    rating: 4.9,
    status: "Aktif", // Aktif | Pending Review | Ditolak
    gradient: "from-teal-650 to-emerald-500",
    icon: "π"
  },
  {
    id: 2,
    title: "Media Pembelajaran PPT Interaktif IPA - Tata Surya & Planet",
    category: "SMP",
    subject: "IPA",
    price: 45000,
    sales: 231,
    rating: 4.8,
    status: "Aktif",
    gradient: "from-cyan-650 to-teal-500",
    icon: "⚛"
  },
  {
    id: 3,
    title: "RPP Tematik Integrasi Karakter SD Kelas 4 - Peduli Lingkungan",
    category: "SD",
    subject: "IPS",
    price: 20000,
    sales: 119,
    rating: 4.5,
    status: "Aktif",
    gradient: "from-emerald-650 to-green-500",
    icon: "🌍"
  },
  {
    id: 4,
    title: "LKS Tematik Bahasa Inggris Kelas 3 - Vocabulary & Grammar Builder",
    category: "SD",
    subject: "Bahasa Inggris",
    price: 15000,
    sales: 130,
    rating: 4.7,
    status: "Pending Review",
    gradient: "from-rose-500 to-amber-500",
    icon: "A"
  },
  {
    id: 5,
    title: "Soal Latihan Ujian Sekolah & UTBK SNBT Matematika SMA (Paket Lengkap)",
    category: "SMA",
    subject: "Matematika",
    price: 75000,
    sales: 0,
    rating: 0.0,
    status: "Pending Review",
    gradient: "from-violet-650 to-purple-500",
    icon: "∫"
  }
];

// Mock Transactions
const INITIAL_TRANSACTIONS = [
  { id: 101, buyer: "Indah S.", item: "Modul Ajar Matematika Kls 7", date: "Hari ini, 14:32", amount: 25000, avatar: "IS" },
  { id: 102, buyer: "Hermawan P.", item: "PPT Interaktif IPA Tata Surya", date: "Hari ini, 11:15", amount: 45000, avatar: "HP" },
  { id: 103, buyer: "Sri W.", item: "RPP Integrasi Karakter SD", date: "Kemarin, 19:40", amount: 20000, avatar: "SW" },
  { id: 104, buyer: "Ahmad H.", item: "Modul Ajar Matematika Kls 7", date: "Kemarin, 08:24", amount: 25000, avatar: "AH" },
  { id: 105, buyer: "Maria G.", item: "PPT Interaktif IPA Tata Surya", date: "21 Mei 2026", amount: 45000, avatar: "MG" }
];

// Chart mock data points (Jan to Jun)
const CHART_DATA = [
  { month: "Jan", revenue: 850000, sales: 34 },
  { month: "Feb", revenue: 1200000, sales: 48 },
  { month: "Mar", revenue: 1650000, sales: 66 },
  { month: "Apr", revenue: 1950000, sales: 78 },
  { month: "Bei", revenue: 2150000, sales: 86 }, // 'Bei' is Mei in mock
  { month: "Jun", revenue: 2450000, sales: 98 }
];

export default function SellerDashboard() {
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(5); // Default hover on June

  // Upload Form states
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("SMP");
  const [formSubject, setFormSubject] = useState("Matematika");
  const [formFormat, setFormFormat] = useState("PDF");
  const [formPrice, setFormPrice] = useState("");
  const [formDesc, setFormDesc] = useState("");

  // Notification pane toggle
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Sri Wahyuni membeli 'PPT Interaktif IPA Tata Surya'", time: "3 mnt lalu" },
    { id: 2, text: "Ulasan baru 5★ dari Bu Indah Sari pada materi Matematika", time: "1 jam lalu" },
    { id: 3, text: "Pengajuan materi 'LKS Tematik B. Inggris' sedang di-review", time: "5 jam lalu" }
  ]);

  // Statistics Computations
  const totalEarnings = 2450000;
  const activeMaterialsCount = materials.filter(m => m.status === "Aktif").length;
  const pendingMaterialsCount = materials.filter(m => m.status === "Pending Review").length;
  const totalTransactionsCount = materials.reduce((acc, m) => acc + m.sales, 0);

  // Form submit handler
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formTitle.trim() === "" || formPrice.trim() === "") {
      alert("Harap isi semua field wajib!");
      return;
    }

    const newMaterial = {
      id: Date.now(),
      title: formTitle,
      category: formCategory,
      subject: formSubject,
      price: Number(formPrice),
      sales: 0,
      rating: 0.0,
      status: "Pending Review",
      gradient: "from-teal-600 to-cyan-500",
      icon: formSubject.charAt(0)
    };

    setMaterials([newMaterial, ...materials]);
    
    // Add fake transaction log or alert
    alert(`Sukses! Materi "${formTitle}" berhasil dikirim untuk proses review kurator.`);
    
    // Reset form fields
    setFormTitle("");
    setFormPrice("");
    setFormDesc("");
  };

  // Delete Row handler
  const handleDeleteRow = (id: number, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus materi "${title}"?`)) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  const formatIDR = (num: number) => {
    return "Rp " + num.toLocaleString("id-ID");
  };

  return (
    <div className="min-h-screen bg-soft-gray flex flex-col lg:flex-row font-sans relative">
      
      {/* MOBILE HEADER BAR (lg:hidden) */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between w-full sticky top-0 z-45">
        <a href="/" className="flex items-center gap-2">
          <img src="/Logo Header edusell.png" alt="EduSell" className="h-11 w-auto object-contain" />
          <span className="text-xs text-slate-400 font-bold">Seller</span>
        </a>
        
        <div className="flex items-center gap-3">
          {/* Mobile bell */}
          <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-1.5 text-slate-500">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-700 focus:outline-none"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 1. LEFT SIDEBAR (Desktop Fixed, Mobile slide-in Drawer) */}
      <aside 
        className={`w-64 bg-slate-950 text-slate-300 flex flex-col justify-between p-6 flex-shrink-0 z-40 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen 
            ? "translate-x-0 fixed inset-y-0 left-0 pt-16 lg:pt-6" 
            : "-translate-x-full lg:translate-x-0 fixed lg:relative inset-y-0"
        }`}
      >
        <div className="flex flex-col gap-8">
          
          {/* Logo brand */}
          <div className="hidden lg:flex items-center gap-2.5 pb-2 border-b border-slate-900">
            <a href="/" className="flex items-center gap-2.5">
              <img src="/Logo Header edusell.png" alt="EduSell Logo" className="h-14 w-auto object-contain brightness-0 invert" />
            </a>
          </div>

          {/* User profiling Card */}
          <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 border border-primary text-primary-light font-black rounded-xl flex items-center justify-center text-sm shadow-md">
              BS
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-black text-white truncate flex items-center gap-0.5">
                Budi Santoso
                <BadgeCheck className="w-3.5 h-3.5 text-primary-light fill-primary-light/10 flex-shrink-0" />
              </h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Verified Creator</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 text-xs font-extrabold">
            <a 
              href="#beranda" 
              className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl transition-all shadow-md"
            >
              <Home className="w-4 h-4" />
              Beranda
            </a>
            
            <a 
              href="#materi-saya" 
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900/60 rounded-xl transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Materi Saya
            </a>

            <a 
              href="#upload-form" 
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900/60 rounded-xl transition-all"
            >
              <UploadCloud className="w-4 h-4" />
              Upload Materi
            </a>

            <a 
              href="#pendapatan" 
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900/60 rounded-xl transition-all"
            >
              <Wallet className="w-4 h-4" />
              Pendapatan
            </a>

            <a 
              href="#ulasan" 
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900/60 rounded-xl transition-all"
            >
              <Star className="w-4 h-4" />
              Ulasan
            </a>

            <a 
              href="#pengaturan" 
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-900/60 rounded-xl transition-all"
            >
              <Settings className="w-4 h-4" />
              Pengaturan
            </a>
          </nav>

        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-4 border-t border-slate-900 pt-6 mt-6">
          {/* Switch to Buyer Mode Toggle */}
          <a 
            href="/browse"
            className="flex items-center justify-between px-3 py-2.5 bg-accent/10 border border-accent/20 text-accent font-bold rounded-xl text-[10px] uppercase tracking-wider hover:bg-accent/20 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Masuk Mode Pembeli
            </span>
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
          </a>

          <a 
            href="/login"
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar Panel
          </a>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA (Scrollable, Right) */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* TOP NAVBAR HEADER PANEL */}
        <div className="hidden lg:flex items-center justify-between bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm mb-8 relative">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Beranda Dashboard</h1>
            <p className="text-xs text-slate-400 font-medium">Selamat datang kembali, Pak Budi! Kelola berkas dan pantau penjualan Anda hari ini.</p>
          </div>

          <div className="flex items-center gap-6">
            
            {/* Notification bell button with simulated panel */}
            <div className="relative">
              <button 
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 text-slate-400 hover:text-slate-600 bg-soft-gray rounded-xl border border-slate-200 flex items-center justify-center transition-all cursor-pointer relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
              </button>
              
              {/* Notification dropdown floating */}
              {notifOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50 animate-scale-up">
                  <h5 className="text-xs font-black text-slate-700 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Notifikasi Terbaru</h5>
                  <div className="space-y-3">
                    {notifications.map((n) => (
                      <div key={n.id} className="text-xs border-b border-slate-50/80 pb-2 last:border-0 last:pb-0">
                        <p className="font-semibold text-slate-700 leading-snug">{n.text}</p>
                        <span className="text-[10px] text-slate-400 font-medium mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-slate-200" />

            {/* Profile trigger */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => alert("Mengalihkan ke pengaturan profil Budi Santoso...")}>
              <div className="text-right">
                <h4 className="text-xs font-black text-slate-900 leading-none">Budi Santoso, S.Pd.</h4>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">Akun Aktif</span>
              </div>
              <div className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xs">
                BS
              </div>
            </div>

          </div>
        </div>

        {/* 3. STATS OVERVIEW CARDS (4 cards in a row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" id="beranda">
          
          {/* Card 1: Total Pendapatan */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Pendapatan</span>
              <div className="bg-primary-soft text-primary p-2 rounded-xl border border-primary/10">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-black text-primary tracking-tight">{formatIDR(totalEarnings)}</h3>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-2">
                <ChevronUp className="w-3.5 h-3.5" />
                ↑ 12% bulan ini
              </p>
            </div>
          </div>

          {/* Card 2: Total Materi */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Materi Saya</span>
              <div className="bg-accent-soft text-accent-dark p-2 rounded-xl border border-accent/10">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{materials.length} Berkas</h3>
              <p className="text-[11px] text-accent-dark font-semibold flex items-center gap-0.5 mt-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                {pendingMaterialsCount} materi pending review
              </p>
            </div>
          </div>

          {/* Card 3: Total Terjual */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Terjual</span>
              <div className="bg-emerald-50/80 text-emerald-600 p-2 rounded-xl border border-emerald-100">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{totalTransactionsCount} Transaksi</h3>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-2">
                <ChevronUp className="w-3.5 h-3.5" />
                ↑ 8% minggu ini
              </p>
            </div>
          </div>

          {/* Card 4: Rating Rata-rata */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Rating Rata-rata</span>
              <div className="bg-amber-50 text-amber-400 p-2 rounded-xl border border-amber-100">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">4.8 ★</h3>
              <p className="text-[11px] text-slate-400 font-semibold mt-2">
                Berdasarkan 156 ulasan masuk
              </p>
            </div>
          </div>

        </div>

        {/* FINANCIAL REVENUE CHART & RECENT TRANSACTIONS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8" id="pendapatan">
          
          {/* 4. REVENUE AREA CHART (Interactive SVG) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-50">
              <div>
                <h3 className="font-extrabold text-slate-950 text-sm uppercase tracking-wider">Grafik Pendapatan 6 Bulan Terakhir</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Januari – Juni 2026</p>
              </div>

              {/* Chart legend tag indicators */}
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full" />
                  Pendapatan (Rupiah)
                </span>
              </div>
            </div>

            {/* Interactive SVG Area Chart */}
            <div className="relative w-full h-64 bg-slate-50 rounded-2xl p-4 flex flex-col justify-between border border-slate-100">
              
              {/* Tooltip Overlay displayed dynamically */}
              {hoveredMonth !== null && (
                <div 
                  className="absolute z-10 bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs shadow-2xl border border-slate-800 pointer-events-none transition-all duration-150"
                  style={{
                    left: `${15 + hoveredMonth * 14.5}%`,
                    top: "15%"
                  }}
                >
                  <p className="font-extrabold text-accent">{CHART_DATA[hoveredMonth].month}</p>
                  <p className="font-semibold mt-0.5">Pendapatan: <span className="text-white font-black">{formatIDR(CHART_DATA[hoveredMonth].revenue)}</span></p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Volume: {CHART_DATA[hoveredMonth].sales} penjualan</p>
                </div>
              )}

              {/* Main SVG Graph */}
              <svg className="w-full h-44 overflow-visible" viewBox="0 0 600 200">
                
                {/* Horizontal Gridlines */}
                <line x1="0" y1="200" x2="600" y2="200" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="140" x2="600" y2="140" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="600" y2="80" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="20" x2="600" y2="20" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* Area Gradient Definition */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F6E56" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0F6E56" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Filled Area Plot path */}
                <path 
                  d="M 50,150 L 150,120 L 250,90 L 350,60 L 450,45 L 550,20 L 550,200 L 50,200 Z" 
                  fill="url(#chartGradient)"
                />

                {/* Main Line Plot path */}
                <path 
                  d="M 50,150 L 150,120 L 250,90 L 350,60 L 450,45 L 550,20" 
                  fill="none" 
                  stroke="#0F6E56" 
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Active hover vertical lines */}
                {hoveredMonth !== null && (
                  <line 
                    x1={50 + hoveredMonth * 100} 
                    y1="20" 
                    x2={50 + hoveredMonth * 100} 
                    y2="200" 
                    stroke="#0F6E56" 
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Data Points circles */}
                {[
                  { x: 50, y: 150 },
                  { x: 150, y: 120 },
                  { x: 250, y: 90 },
                  { x: 350, y: 60 },
                  { x: 450, y: 45 },
                  { x: 550, y: 20 }
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredMonth === i ? "6" : "4.5"}
                    fill={hoveredMonth === i ? "#EF9F27" : "#0F6E56"}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredMonth(i)}
                  />
                ))}

              </svg>

              {/* Month label triggers */}
              <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-400 px-6 uppercase tracking-wider">
                {CHART_DATA.map((row, idx) => (
                  <span 
                    key={row.month} 
                    onMouseEnter={() => setHoveredMonth(idx)}
                    className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
                      hoveredMonth === idx 
                        ? "bg-primary text-white font-black" 
                        : "hover:bg-slate-200"
                    }`}
                  >
                    {row.month}
                  </span>
                ))}
              </div>

            </div>
          </div>

          {/* 7. RECENT TRANSACTIONS (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-4 pb-2 border-b border-slate-50">
                Aktivitas Penjualan Baru
              </h3>
              
              {/* Transactions rows */}
              <div className="space-y-3.5">
                {transactions.map((t) => (
                  <div key={t.id} className="flex items-center justify-between text-xs border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-[9px] border border-primary/15 flex-shrink-0">
                        {t.avatar}
                      </div>
                      <div className="overflow-hidden max-w-[120px] sm:max-w-none">
                        <h5 className="font-bold text-slate-900 truncate">{t.buyer}</h5>
                        <p className="text-[9px] text-slate-400 line-clamp-1">{t.item}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-slate-900 block">{formatIDR(t.amount)}</span>
                      <span className="text-[9px] text-slate-400 font-medium">{t.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-50 text-center">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert("Membuka detail riwayat semua transaksi..."); }}
                className="text-xs font-bold text-primary hover:underline cursor-pointer flex items-center justify-center gap-1"
              >
                Lihat Semua Transaksi
                <TrendingUp className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* 5. MY MATERIALS TABLE (Interactive state listings) */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-sm mb-8" id="materi-saya">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-50">
            <div>
              <h3 className="font-extrabold text-slate-950 text-sm uppercase tracking-wider">Daftar Materi Saya</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Kelola berkas, sesuaikan harga, and periksa hasil status peninjauan di sini.</p>
            </div>
            
            <a
              href="#upload-form"
              className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Upload Materi Baru
            </a>
          </div>

          {/* TABLE CONTAINER */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs font-semibold text-slate-600">
              
              {/* Columns headers */}
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-widest text-[9px]">
                  <th className="py-3 px-4">Thumbnail</th>
                  <th className="py-3 px-4">Judul Materi</th>
                  <th className="py-3 px-4">Jenjang</th>
                  <th className="py-3 px-4">Harga</th>
                  <th className="py-3 px-4">Terjual</th>
                  <th className="py-3 px-4 text-center">Rating</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>

              {/* Rows details */}
              <tbody className="divide-y divide-slate-100">
                {materials.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    
                    {/* Thumbnail placeholder */}
                    <td className="py-3.5 px-4">
                      <div className="w-10 h-7 bg-primary-soft border border-primary/25 rounded-md flex items-center justify-center font-bold text-primary text-[10px] font-mono shadow-inner select-none">
                        {m.icon}
                      </div>
                    </td>

                    {/* Judul materi */}
                    <td className="py-3.5 px-4 font-black text-slate-900 max-w-xs sm:max-w-sm truncate">
                      {m.title}
                    </td>

                    {/* Jenjang */}
                    <td className="py-3.5 px-4 font-bold">
                      <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                        {m.category}
                      </span>
                    </td>

                    {/* Harga */}
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">
                      {formatIDR(m.price)}
                    </td>

                    {/* Terjual count */}
                    <td className="py-3.5 px-4 font-bold text-slate-500">
                      {m.sales}x
                    </td>

                    {/* Rating stars */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 font-bold text-slate-800">
                        {m.rating > 0 ? (
                          <>
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{m.rating}</span>
                          </>
                        ) : (
                          <span className="text-slate-350 text-[10px]">-</span>
                        )}
                      </div>
                    </td>

                    {/* Status badge */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                        m.status === "Aktif"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : m.status === "Pending Review"
                          ? "bg-amber-50 text-amber-600 border-amber-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      }`}>
                        {m.status === "Aktif" ? <CheckCircle className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
                        {m.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        
                        {/* Edit trigger */}
                        <button 
                          onClick={() => alert(`Simulasi edit materi ID ${m.id} : "${m.title}"`)}
                          className="p-1 hover:bg-slate-100 hover:text-primary rounded text-slate-400 transition-colors cursor-pointer"
                          title="Ubah Berkas"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        
                        {/* Delete trigger */}
                        <button 
                          onClick={() => handleDeleteRow(m.id, m.title)}
                          className="p-1 hover:bg-red-50 hover:text-red-500 rounded text-slate-400 transition-colors cursor-pointer"
                          title="Hapus Materi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        {/* View details trigger */}
                        <a 
                          href="/materi/detail" 
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 hover:bg-slate-100 hover:text-primary rounded text-slate-400 transition-colors cursor-pointer"
                          title="Lihat Pratinjau Materi"
                        >
                          <Eye className="w-4 h-4" />
                        </a>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* 6. QUICK UPLOAD FORM (Adding data interactively) */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-8 shadow-sm" id="upload-form">
          <div className="mb-6 pb-4 border-b border-slate-50">
            <h3 className="font-extrabold text-slate-950 text-sm uppercase tracking-wider flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-primary" />
              Upload Materi Baru
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Tambahkan materi ajar Anda. Pengajuan baru akan langsung diproses kurasi dalam 1x24 jam.</p>
          </div>

          <form onSubmit={handleUploadSubmit} className="space-y-6">
            
            {/* Input Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Judul materi */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Judul Materi Ajar <strong className="text-red-500">*</strong></label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Modul Ajar Matematika Persamaan Linear Kls 8"
                  className="w-full bg-soft-gray border border-slate-200 focus:border-primary rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none transition-all font-semibold text-slate-700"
                />
              </div>

              {/* Price input */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Harga Jual Materi (Rupiah) <strong className="text-red-500">*</strong></label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">
                    Rp
                  </div>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="25000"
                    className="w-full pl-10 pr-4 py-2.5 bg-soft-gray border border-slate-200 focus:border-primary rounded-xl text-xs focus:ring-1 focus:ring-primary focus:outline-none transition-all font-semibold text-slate-700"
                  />
                </div>
              </div>

            </div>

            {/* Input Row 2: Select inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Jenjang */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Jenjang Sekolah</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-soft-gray border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 text-xs focus:outline-none transition-all font-semibold text-slate-700 cursor-pointer"
                >
                  <option value="SD">Sekolah Dasar (SD)</option>
                  <option value="SMP">Sekolah Menengah (SMP)</option>
                  <option value="SMA">Sekolah Menengah Atas (SMA/K)</option>
                </select>
              </div>

              {/* Mata Pelajaran */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Mata Pelajaran</label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full bg-soft-gray border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 text-xs focus:outline-none transition-all font-semibold text-slate-700 cursor-pointer"
                >
                  <option value="Matematika">Matematika</option>
                  <option value="IPA">IPA (Sains)</option>
                  <option value="IPS">IPS (Sosial)</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                </select>
              </div>

              {/* Format File */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Format Berkas Utama</label>
                <select
                  value={formFormat}
                  onChange={(e) => setFormFormat(e.target.value)}
                  className="w-full bg-soft-gray border border-slate-200 focus:border-primary rounded-xl px-3 py-2.5 text-xs focus:outline-none transition-all font-semibold text-slate-700 cursor-pointer"
                >
                  <option value="PDF">Dokumen PDF (.pdf)</option>
                  <option value="PPT">Media Slide PPT (.pptx)</option>
                  <option value="Word">Lembar Kerja Word (.docx)</option>
                  <option value="Video">Video Pembelajaran (.mp4)</option>
                </select>
              </div>

            </div>

            {/* Input Row 3: Description Textarea */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Deskripsi Lengkap Materi</label>
              <textarea
                rows={4}
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="Jelaskan mengenai isi modul ajar, kompetensi inti, RPP, daftar lembar latihan soal..."
                className="w-full bg-soft-gray border border-slate-200 focus:border-primary rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none transition-all font-semibold text-slate-700"
              />
            </div>

            {/* Input Row 4: Upload Drag and Drop zones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* File Drop zone */}
              <div 
                onClick={() => alert("Mengakses Explorer untuk memilih dokumen materi (.pdf/.zip)...")}
                className="border-2 border-dashed border-slate-250 bg-soft-gray hover:bg-slate-100/60 rounded-2xl p-6 text-center cursor-pointer flex flex-col items-center justify-center gap-2 group transition-all"
              >
                <div className="bg-primary-soft text-primary p-2.5 rounded-xl border border-primary/10 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <h5 className="text-xs font-bold text-slate-700 mt-1">Upload Berkas Materi Utama</h5>
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">Format berkas didukung: PDF, PPTX, DOCX, MP4. Maksimal 50MB.</p>
              </div>

              {/* Cover Drop zone */}
              <div 
                onClick={() => alert("Mengakses Explorer untuk memilih berkas gambar thumbnail/sampul...")}
                className="border-2 border-dashed border-slate-250 bg-soft-gray hover:bg-slate-100/60 rounded-2xl p-6 text-center cursor-pointer flex flex-col items-center justify-center gap-2 group transition-all"
              >
                <div className="bg-accent-soft text-accent-dark p-2.5 rounded-xl border border-accent/10 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h5 className="text-xs font-bold text-slate-700 mt-1">Upload Sampul / Gambar Depan</h5>
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">Rasio rekomendasi 4:3 format PNG atau JPG. Maksimal 5MB.</p>
              </div>

            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-extrabold text-xs rounded-xl shadow-lg shadow-primary/20 transition-all cursor-pointer text-center"
            >
              Upload & Kirim Review
            </button>

          </form>
        </div>

      </main>

    </div>
  );
}
