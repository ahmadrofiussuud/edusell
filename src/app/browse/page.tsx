"use client";

import React, { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  Search, 
  SlidersHorizontal, 
  Star, 
  Heart, 
  Download, 
  BadgeCheck, 
  GraduationCap, 
  ArrowRight, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  RefreshCw,
  Loader2
} from "lucide-react";

// Mock Database of 9 Materials
const MOCK_DATABASE = [
  {
    id: 1,
    category: "SMP",
    subject: "Matematika",
    format: "PDF",
    pages: "24 hal",
    title: "Modul Ajar Matematika Kelas 7 - Bilangan Bulat & Operasi Hitung",
    seller: "Budi Santoso, S.Pd.",
    sellerAvatar: "BS",
    verified: true,
    price: 25000,
    rating: 4.9,
    reviews: 120,
    gradient: "from-teal-600 to-emerald-500",
    icon: "π",
    date: "2026-05-10"
  },
  {
    id: 2,
    category: "SMP",
    subject: "IPA",
    format: "PPT",
    pages: "35 slide",
    title: "Media Pembelajaran PPT Interaktif IPA - Tata Surya & Karakteristik Planet",
    seller: "Sri Wahyuni, M.Pd.",
    sellerAvatar: "SW",
    verified: true,
    price: 45000,
    rating: 4.8,
    reviews: 89,
    gradient: "from-cyan-600 to-teal-500",
    icon: "⚛",
    date: "2026-05-12"
  },
  {
    id: 3,
    category: "SD",
    subject: "Bahasa Indonesia",
    format: "Word",
    pages: "12 hal",
    title: "LKS Kreatif Bahasa Indonesia - Teks Deskripsi & Menulis Cerita",
    seller: "Maria Grace, S.Pd.",
    sellerAvatar: "MG",
    verified: false,
    price: 15000,
    rating: 4.6,
    reviews: 64,
    gradient: "from-rose-500 to-amber-500",
    icon: "A",
    date: "2026-04-20"
  },
  {
    id: 4,
    category: "SMA",
    subject: "Fisika",
    format: "PDF",
    pages: "18 hal",
    title: "Rencana Pelaksanaan Pembelajaran (RPP) Fisika - Kinematika Gerak Lurus",
    seller: "Ahmad Hidayat, S.S.",
    sellerAvatar: "AH",
    verified: true,
    price: 30000,
    rating: 5.0,
    reviews: 31,
    gradient: "from-indigo-600 to-blue-500",
    icon: "⚡",
    date: "2026-05-18"
  },
  {
    id: 5,
    category: "SMA",
    subject: "Bahasa Inggris",
    format: "PPT",
    pages: "40 slide",
    title: "Slide Interaktif Bahasa Inggris - Tenses, Grammar & Conversation Builder",
    seller: "Maria Grace, S.Pd.",
    sellerAvatar: "MG",
    verified: false,
    price: 50000,
    rating: 4.7,
    reviews: 75,
    gradient: "from-fuchsia-600 to-pink-500",
    icon: "🗣️",
    date: "2026-05-02"
  },
  {
    id: 6,
    category: "SMA",
    subject: "Kimia",
    format: "Video",
    pages: "15 mnt",
    title: "Video Pembelajaran Interaktif Kimia - Reaksi Redoks & Sel Elektrokimia",
    seller: "Dr. Joko Susilo, M.Si.",
    sellerAvatar: "JS",
    verified: true,
    price: 65000,
    rating: 4.9,
    reviews: 18,
    gradient: "from-amber-600 to-orange-500",
    icon: "🧪",
    date: "2026-05-15"
  },
  {
    id: 7,
    category: "SD",
    subject: "IPS",
    format: "PDF",
    pages: "30 hal",
    title: "Bahan Ajar Tematik SD Kelas 4 - Indahnya Kebersamaan & Keanekaragaman",
    seller: "Indah Sari, S.Pd.",
    sellerAvatar: "IS",
    verified: true,
    price: 20000,
    rating: 4.5,
    reviews: 52,
    gradient: "from-emerald-600 to-green-500",
    icon: "🌍",
    date: "2026-04-10"
  },
  {
    id: 8,
    category: "SMP",
    subject: "IPA",
    format: "PDF",
    pages: "15 hal",
    title: "Modul Pembelajaran Pemanasan Global & Dampak Ekologis - Kelas 8",
    seller: "Sri Wahyuni, M.Pd.",
    sellerAvatar: "SW",
    verified: true,
    price: 18000,
    rating: 4.7,
    reviews: 40,
    gradient: "from-teal-700 to-cyan-500",
    icon: "🌱",
    date: "2026-04-28"
  },
  {
    id: 9,
    category: "SMA",
    subject: "Matematika",
    format: "PDF",
    pages: "50 hal",
    title: "Bank Soal & Pembahasan Matematika Persiapan Ujian Sekolah & UTBK SNBT",
    seller: "Budi Santoso, S.Pd.",
    sellerAvatar: "BS",
    verified: true,
    price: 75000,
    rating: 4.9,
    reviews: 112,
    gradient: "from-violet-600 to-purple-500",
    icon: "∫",
    date: "2026-05-20"
  }
];

export default function BrowsePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minRating, setMinRating] = useState<number | null>(null);

  // Sorting and Display
  const [sortBy, setSortBy] = useState("Terpopuler");
  const [filteredMaterials, setFilteredMaterials] = useState(MOCK_DATABASE);
  const [wishlistedIds, setWishlistedIds] = useState<number[]>([1, 4]); // default preset likes
  
  // Loading and Pagination
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle scroll class
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter and Sort Processing Logic
  const handleApplyFilters = (isReset = false) => {
    setIsLoading(true);
    
    // Simulate loading/skeleton state for 800ms
    setTimeout(() => {
      let result = [...MOCK_DATABASE];

      if (isReset) {
        // Reset everything
        setSearchQuery("");
        setSelectedLevels([]);
        setSelectedSubjects([]);
        setSelectedFormats([]);
        setMaxPrice(100000);
        setMinRating(null);
        setSortBy("Terpopuler");
        setFilteredMaterials(MOCK_DATABASE);
        setIsLoading(false);
        return;
      }

      // 1. Text Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          (m) =>
            m.title.toLowerCase().includes(query) ||
            m.subject.toLowerCase().includes(query) ||
            m.seller.toLowerCase().includes(query)
        );
      }

      // 2. Levels Filter
      if (selectedLevels.length > 0) {
        result = result.filter((m) => selectedLevels.includes(m.category));
      }

      // 3. Subjects Filter
      if (selectedSubjects.length > 0) {
        result = result.filter((m) => selectedSubjects.includes(m.subject));
      }

      // 4. File Formats Filter
      if (selectedFormats.length > 0) {
        result = result.filter((m) => selectedFormats.includes(m.format));
      }

      // 5. Price range
      result = result.filter((m) => m.price <= maxPrice);

      // 6. Rating Filter
      if (minRating !== null) {
        result = result.filter((m) => m.rating >= minRating);
      }

      // 7. Sort Logic
      if (sortBy === "Terpopuler") {
        result.sort((a, b) => b.reviews - a.reviews);
      } else if (sortBy === "Terbaru") {
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else if (sortBy === "Harga Terendah") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === "Rating Tertinggi") {
        result.sort((a, b) => b.rating - a.rating);
      }

      setFilteredMaterials(result);
      setCurrentPage(1); // reset to page 1 on filter
      setIsLoading(false);
    }, 8500 * 0.1); // Fast 850ms feel
  };

  // Run filter logic when sorting selection changes
  useEffect(() => {
    handleApplyFilters();
  }, [sortBy]);

  // Wishlist toggle handler
  const toggleWishlist = (id: number) => {
    if (wishlistedIds.includes(id)) {
      setWishlistedIds(wishlistedIds.filter((item) => item !== id));
    } else {
      setWishlistedIds([...wishlistedIds, id]);
    }
  };

  // Multi-checkbox selectors helper
  const handleCheckboxChange = (
    item: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (state.includes(item)) {
      setState(state.filter((x) => x !== item));
    } else {
      setState([...state, item]);
    }
  };

  const formatIDR = (num: number) => {
    return "Rp " + num.toLocaleString("id-ID");
  };

  return (
    <div className="min-h-screen bg-soft-gray flex flex-col font-sans">
      
      {/* NAVBAR */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || mobileFiltersOpen
            ? "glass shadow-lg py-3" 
            : "bg-white border-b border-slate-200 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-primary text-white p-2 rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-primary tracking-tight">
                Edu<span className="text-accent">Sell</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="/" 
                className="text-slate-600 hover:text-primary font-medium transition-colors text-sm"
              >
                Beranda
              </a>
              <a 
                href="/browse" 
                className="text-primary font-bold transition-colors text-sm"
              >
                Jelajahi Materi
              </a>
              <a 
                href="/#jadi-seller" 
                className="text-slate-600 hover:text-primary font-medium transition-colors text-sm"
              >
                Jadi Seller
              </a>
              <a 
                href="/#tentang" 
                className="text-slate-600 hover:text-primary font-medium transition-colors text-sm"
              >
                Tentang Kami
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                id="btn-login-browse"
                href="/login"
                className="px-5 py-2 rounded-xl border border-primary/20 text-primary font-semibold hover:bg-primary-soft hover:border-primary transition-all duration-200 text-sm cursor-pointer text-center"
              >
                Masuk
              </a>
              <a 
                id="btn-register-browse"
                href="/login"
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 text-sm cursor-pointer text-center"
              >
                Daftar Gratis
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <button
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
          <div className="md:hidden glass border-t border-slate-200 py-4 px-6 absolute top-full left-0 right-0 shadow-xl">
            <nav className="flex flex-col gap-4">
              <a 
                href="/" 
                className="text-slate-700 hover:text-primary font-semibold transition-colors py-2"
              >
                Beranda
              </a>
              <a 
                href="/browse" 
                className="text-primary font-bold transition-colors py-2"
              >
                Jelajahi Materi
              </a>
              <a 
                href="/#jadi-seller" 
                className="text-slate-700 hover:text-primary font-semibold transition-colors py-2"
              >
                Jadi Seller
              </a>
              <a 
                href="/#tentang" 
                className="text-slate-700 hover:text-primary font-semibold transition-colors py-2"
              >
                Tentang Kami
              </a>
              <hr className="border-slate-200 my-1" />
              <div className="flex flex-col gap-3 pt-2">
                <a 
                  href="/login"
                  className="w-full py-2.5 rounded-xl border border-primary text-primary font-semibold text-center hover:bg-primary-soft cursor-pointer"
                >
                  Masuk
                </a>
                <a 
                  href="/login"
                  className="w-full py-2.5 rounded-xl bg-primary text-white font-semibold text-center hover:bg-primary-dark shadow-md cursor-pointer"
                >
                  Daftar Gratis
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          
          {/* 2. BREADCRUMBS & PAGE HEADER */}
          <nav className="mb-4 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <a href="/" className="hover:text-primary transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-slate-700 font-bold">Jelajahi Materi</span>
          </nav>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/85 shadow-sm mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  Jelajahi Materi Ajar
                </h1>
                <p className="text-slate-500 font-medium text-sm mt-1">
                  Temukan ribuan materi berkualitas, RPP Kurikulum Merdeka, slide presentasi, dan LKS buatan guru-guru terbaik di Indonesia.
                </p>
              </div>

              {/* Big Interactive Search Bar */}
              <div className="lg:col-span-5 relative">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                    placeholder="Cari materi, mata pelajaran, jenjang..."
                    className="w-full pl-11 pr-24 py-3.5 bg-soft-gray border border-slate-200 focus:border-primary rounded-2xl text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all font-medium text-slate-700"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <button
                    onClick={() => handleApplyFilters()}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Cari
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2-COLUMN MARKETPLACE LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 3. LEFT SIDEBAR — FILTERS (DESKTOP) */}
            <aside className="hidden lg:block lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h3 className="font-extrabold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  Filter Pencarian
                </h3>
                <button
                  onClick={() => handleApplyFilters(true)}
                  className="text-xs text-slate-400 hover:text-accent font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3 h-3 animate-spin-hover" />
                  Reset Filter
                </button>
              </div>

              {/* Sidebar filter content */}
              <div className="space-y-6">
                
                {/* Section: Jenjang */}
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-3">Jenjang Sekolah</h4>
                  <div className="space-y-2">
                    {["SD", "SMP", "SMA"].map((lvl) => (
                      <label key={lvl} className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={selectedLevels.includes(lvl)}
                          onChange={() => handleCheckboxChange(lvl, selectedLevels, setSelectedLevels)}
                          className="w-4.5 h-4.5 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                        />
                        Sekolah Dasar ({lvl})
                      </label>
                    ))}
                  </div>
                </div>

                {/* Section: Mata Pelajaran */}
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-3">Mata Pelajaran</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {["Matematika", "Bahasa Indonesia", "IPA", "IPS", "Bahasa Inggris", "Fisika", "Kimia"].map((sub) => (
                      <label key={sub} className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={selectedSubjects.includes(sub)}
                          onChange={() => handleCheckboxChange(sub, selectedSubjects, setSelectedSubjects)}
                          className="w-4.5 h-4.5 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                        />
                        {sub}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Section: Format File */}
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-3">Format File</h4>
                  <div className="space-y-2">
                    {["PDF", "PPT", "Word", "Video"].map((fmt) => (
                      <label key={fmt} className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={selectedFormats.includes(fmt)}
                          onChange={() => handleCheckboxChange(fmt, selectedFormats, setSelectedFormats)}
                          className="w-4.5 h-4.5 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                        />
                        {fmt === "Word" ? "Microsoft Word" : fmt}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Section: Rentang Harga */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">Rentang Harga</h4>
                    <span className="text-xs font-bold text-primary">{formatIDR(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                    <span>Rp 0</span>
                    <span>Rp 50.000</span>
                    <span>Rp 100.000</span>
                  </div>
                </div>

                {/* Section: Rating */}
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-3">Rating Minimal</h4>
                  <div className="space-y-2">
                    {[4, 3].map((rating) => (
                      <label key={rating} className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none">
                        <input
                          type="radio"
                          name="ratingFilter"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-4.5 h-4.5 border-slate-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                        />
                        <span className="flex items-center gap-1">
                          {rating}★ ke atas 
                          <span className="flex text-amber-400">
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar Actions bottom */}
              <div className="mt-8 pt-6 border-t border-slate-150 flex flex-col gap-3">
                <button
                  onClick={() => handleApplyFilters()}
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Filter className="w-3.5 h-3.5" />
                  Terapkan Filter
                </button>
              </div>
            </aside>

            {/* 4. RIGHT CONTENT AREA */}
            <div className="col-span-1 lg:col-span-9 flex flex-col">
              
              {/* TOP SORT AND COUNT BAR */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <p className="text-xs font-bold text-slate-500">
                  Menampilkan <span className="text-primary text-sm font-black">{filteredMaterials.length}</span> materi pembelajaran K-12
                </p>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Floating Mobile Filter Trigger */}
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:text-primary hover:bg-slate-50 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Filter ({selectedLevels.length + selectedSubjects.length + selectedFormats.length + (minRating ? 1 : 0)})
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Urutkan:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-soft-gray border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2 rounded-xl focus:border-primary focus:outline-none cursor-pointer"
                    >
                      <option value="Terpopuler">Terpopuler (Review)</option>
                      <option value="Terbaru">Materi Terbaru</option>
                      <option value="Harga Terendah">Harga Terendah</option>
                      <option value="Rating Tertinggi">Rating Tertinggi</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* DYNAMIC CARD GRID */}
              <div className="relative">
                {/* Real-time Loading Skeleton Grid Trigger overlay */}
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 3 Loading Skeleton Cards */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 animate-pulse flex flex-col h-[400px] justify-between"
                      >
                        <div>
                          {/* Skeleton Image */}
                          <div className="h-40 bg-slate-200 rounded-2xl mb-4" />
                          {/* Skeleton Level Badges */}
                          <div className="h-4 bg-slate-200 rounded-md w-1/4 mb-3" />
                          {/* Skeleton Title Lines */}
                          <div className="h-5 bg-slate-200 rounded-md w-full mb-2" />
                          <div className="h-5 bg-slate-200 rounded-md w-3/4 mb-4" />
                          {/* Skeleton Seller Row */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-slate-200 rounded-full" />
                            <div className="h-3 bg-slate-200 rounded-md w-1/3" />
                          </div>
                        </div>
                        {/* Skeleton footer */}
                        <div className="border-t border-slate-100 pt-4">
                          <div className="flex justify-between items-center mb-3">
                            <div className="h-4 bg-slate-200 rounded-md w-1/3" />
                            <div className="h-4 bg-slate-200 rounded-md w-1/5" />
                          </div>
                          <div className="h-10 bg-slate-200 rounded-xl w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredMaterials.length === 0 ? (
                  /* Empty state */
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm">
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-full inline-flex items-center justify-center mb-4 text-amber-500">
                      <Search className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-black text-slate-800">Materi Tidak Ditemukan</h3>
                    <p className="text-slate-400 text-xs font-semibold max-w-sm mx-auto mt-1.5">
                      Maaf, kami tidak menemukan materi yang sesuai dengan kombinasi filter Anda. Silakan reset filter atau gunakan keyword lain.
                    </p>
                    <button
                      onClick={() => handleApplyFilters(true)}
                      className="mt-5 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Reset Semua Filter
                    </button>
                  </div>
                ) : (
                  /* Standard 3-column Card Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMaterials.map((item) => {
                      const isLiked = wishlistedIds.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          className="group bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-primary/20 transition-all duration-300 flex flex-col h-[420px] justify-between overflow-hidden transform hover:-translate-y-1.5"
                        >
                          {/* Subject Header gradient art */}
                          <div className={`h-40 bg-gradient-to-br ${item.gradient} p-4 relative flex flex-col justify-between text-white`}>
                            {/* Decorative blur art */}
                            <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform" />
                            
                            {/* Top row elements */}
                            <div className="flex items-center justify-between z-10">
                              <span className="bg-white/25 backdrop-blur-md px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider">
                                {item.category}
                              </span>
                              
                              {/* Wishlist interactive heart */}
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleWishlist(item.id);
                                }}
                                className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/30 text-white cursor-pointer active:scale-95 transition-all"
                                aria-label="Simpan Favorit"
                              >
                                <Heart 
                                  className={`w-4 h-4 transition-colors ${
                                    isLiked 
                                      ? "fill-red-500 text-red-500" 
                                      : "text-white"
                                  }`} 
                                />
                              </button>
                            </div>

                            {/* Mid Icon Representation */}
                            <div className="text-4xl font-extrabold font-mono opacity-20 absolute bottom-3 right-3 select-none">
                              {item.icon}
                            </div>

                            {/* Format Pill and Length */}
                            <div className="z-10 flex items-center gap-1">
                              <span className="bg-slate-900/40 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                                <FileText className="w-2.5 h-2.5" />
                                {item.format}
                              </span>
                              <span className="bg-white/15 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-[9px] font-semibold">
                                {item.pages}
                              </span>
                            </div>
                          </div>

                          {/* Card Content Body */}
                          <div className="p-5 flex-grow flex flex-col justify-between">
                            <div>
                              {/* Rating & Review */}
                              <div className="flex items-center gap-1 mb-2">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span className="text-[11px] font-bold text-slate-800">{item.rating}</span>
                                <span className="text-[10px] text-slate-400 font-medium">({item.reviews} ulasan)</span>
                              </div>

                              {/* Title */}
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">
                                {item.title}
                              </h4>

                              {/* Seller metadata Row */}
                              <div className="flex items-center gap-2 mt-3">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-[9px] border border-primary/15">
                                  {item.sellerAvatar}
                                </div>
                                <span className="text-[11px] font-bold text-slate-600 truncate max-w-[140px] flex items-center gap-0.5">
                                  {item.seller}
                                  {item.verified && (
                                    <BadgeCheck className="w-3.5 h-3.5 text-primary fill-primary/10 flex-shrink-0" />
                                  )}
                                </span>
                              </div>
                            </div>

                            {/* Card Price & Purchase Button */}
                            <div className="border-t border-slate-100 pt-4 mt-3">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold text-slate-400">Harga Materi</span>
                                <span className="text-base font-black text-primary">{formatIDR(item.price)}</span>
                              </div>

                              <button className="w-full py-2.5 bg-primary hover:bg-accent hover:shadow-lg text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer">
                                Beli Sekarang
                              </button>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 5. PAGINATION ROW */}
              {filteredMaterials.length > 0 && (
                <div className="flex items-center justify-center gap-2.5 mt-12">
                  <button className="p-2 border border-slate-200 hover:border-primary hover:text-primary bg-white text-slate-400 rounded-xl transition-all cursor-pointer">
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button className="w-10 h-10 bg-primary text-white text-xs font-bold rounded-xl shadow-md">
                    1
                  </button>
                  <button className="w-10 h-10 bg-white hover:border-primary hover:text-primary text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-all">
                    2
                  </button>
                  <button className="w-10 h-10 bg-white hover:border-primary hover:text-primary text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-all">
                    3
                  </button>
                  <span className="text-slate-400 text-xs font-extrabold px-1">...</span>
                  <button className="w-10 h-10 bg-white hover:border-primary hover:text-primary text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-all">
                    14
                  </button>

                  <button className="p-2 border border-slate-200 hover:border-primary hover:text-primary bg-white text-slate-400 rounded-xl transition-all cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* MOBILE COLLAPSIBLE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay backdrop */}
          <div
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Sliding drawer container */}
          <div className="relative w-full max-w-sm bg-white h-full flex flex-col shadow-2xl p-6 overflow-y-auto animate-slide-left z-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h3 className="font-extrabold text-slate-900 flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4 text-primary" />
                Filter Materi
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile filters fields */}
            <div className="space-y-6 flex-grow">
              {/* Section: Jenjang */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-3">Jenjang Sekolah</h4>
                <div className="space-y-2">
                  {["SD", "SMP", "SMA"].map((lvl) => (
                    <label key={lvl} className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedLevels.includes(lvl)}
                        onChange={() => handleCheckboxChange(lvl, selectedLevels, setSelectedLevels)}
                        className="w-4.5 h-4.5 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                      />
                      Sekolah Dasar ({lvl})
                    </label>
                  ))}
                </div>
              </div>

              {/* Section: Mata Pelajaran */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-3">Mata Pelajaran</h4>
                <div className="space-y-2">
                  {["Matematika", "Bahasa Indonesia", "IPA", "IPS", "Bahasa Inggris", "Fisika", "Kimia"].map((sub) => (
                    <label key={sub} className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedSubjects.includes(sub)}
                        onChange={() => handleCheckboxChange(sub, selectedSubjects, setSelectedSubjects)}
                        className="w-4.5 h-4.5 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                      />
                      {sub}
                    </label>
                  ))}
                </div>
              </div>

              {/* Section: Format File */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-3">Format File</h4>
                <div className="space-y-2">
                  {["PDF", "PPT", "Word", "Video"].map((fmt) => (
                    <label key={fmt} className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedFormats.includes(fmt)}
                        onChange={() => handleCheckboxChange(fmt, selectedFormats, setSelectedFormats)}
                        className="w-4.5 h-4.5 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                      />
                      {fmt}
                    </label>
                  ))}
                </div>
              </div>

              {/* Section: Rentang Harga */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">Rentang Harga</h4>
                  <span className="text-xs font-bold text-primary">{formatIDR(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                  <span>Rp 0</span>
                  <span>Rp 100k</span>
                </div>
              </div>

              {/* Section: Rating */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-3">Rating Minimal</h4>
                <div className="space-y-2">
                  {[4, 3].map((rating) => (
                    <label key={rating} className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="mobileRatingFilter"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="w-4.5 h-4.5 border-slate-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                      />
                      <span className="flex items-center gap-1">
                        {rating}★ ke atas
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Actions Drawer bottom */}
            <div className="border-t border-slate-150 pt-4 mt-6 flex flex-col gap-2">
              <button
                onClick={() => {
                  handleApplyFilters();
                  setMobileFiltersOpen(false);
                }}
                className="w-full py-3 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-md"
              >
                Terapkan Filter
              </button>
              <button
                onClick={() => {
                  handleApplyFilters(true);
                  setMobileFiltersOpen(false);
                }}
                className="w-full py-3 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-bold rounded-xl"
              >
                Reset & Bersihkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-900 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="bg-primary text-white p-2 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Edu<span className="text-accent">Sell</span>
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              © {new Date().getFullYear()} EduSell (PT Edukasi Karya Indonesia). Hak Cipta Dilindungi.
            </p>
          </div>
          
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4 text-center">
            <p>Berbagi modul, mudahkan mengajar, sejahterakan guru Indonesia.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-400">Syarat</a>
              <a href="#" className="hover:text-slate-400">Privasi</a>
              <a href="#" className="hover:text-slate-400">Hubungi</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
