"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, 
  UserCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  ArrowLeft,
  Sparkles,
  Search,
  BookOpen,
  ArrowLeftRight
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  
  // Dummy Form states
  const [email, setEmail] = useState("budi.santoso@guru.sch.id");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRole] = useState<"seller" | "buyer" | null>(null);

  const handleRoleLogin = (role: "seller" | "buyer") => {
    setIsLoading(true);
    setActiveRole(role);
    
    // Simulate premium dashboard login delay
    setTimeout(() => {
      if (role === "seller") {
        router.push("/seller");
      } else {
        router.push("/browse");
      }
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Default to Budi Santoso (Seller) if they submit the standard form
    setTimeout(() => {
      router.push("/seller");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col justify-between font-sans relative overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

      {/* TOP HEADER / BACK NAV */}
      <header className="px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <a 
          href="/" 
          className="flex items-center gap-2.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Beranda
        </a>
        
        <div className="flex items-center gap-2">
          <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center shadow-md">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="text-sm font-black text-white tracking-tight">
            Edu<span className="text-accent">Sell</span>
          </span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        <div className="max-w-4xl w-full flex flex-col lg:flex-row bg-slate-900/60 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl backdrop-blur-xl relative">
          
          {/* LEFT COLUMN: ROLE SELECTOR PANEL (Interactive cards) */}
          <div className="lg:w-1/2 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary-light font-bold text-[10px] uppercase tracking-wider mb-4 border border-primary/20">
                <Sparkles className="w-3.5 h-3.5 text-primary-light animate-pulse" />
                Akses Instan Demo
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
                Mau masuk sebagai apa?
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Silakan pilih salah satu peran demo di bawah untuk simulasi instan tanpa perlu mendaftar.
              </p>
            </div>

            {/* Role Options */}
            <div className="space-y-4">
              
              {/* Option 1: Seller / Guru Creator */}
              <button
                onClick={() => handleRoleLogin("seller")}
                disabled={isLoading}
                className={`w-full text-left p-4.5 rounded-2xl border transition-all relative overflow-hidden group cursor-pointer ${
                  activeRole === "seller"
                    ? "bg-primary/20 border-primary shadow-lg shadow-primary/10"
                    : "bg-slate-950/40 border-slate-800 hover:border-primary/50 hover:bg-slate-950/70"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-primary/15 rounded-xl border border-primary/20 text-primary-light group-hover:scale-110 transition-transform flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                      GURU / CREATOR (SELLER)
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-1">
                      Mengelola berkas ajar, RPP, LKS, memantau riwayat penjualan, & grafik pendapatan.
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-[10px] text-primary-light font-bold bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md w-fit">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Masuk sebagai: Budi Santoso, S.Pd.</span>
                    </div>
                  </div>
                </div>
                {isLoading && activeRole === "seller" ? (
                  <div className="absolute inset-0 bg-primary/5 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-primary-light border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-primary-light absolute right-4 top-1/2 -translate-y-1/2 group-hover:translate-x-1 transition-all" />
                )}
              </button>

              {/* Option 2: Buyer / Guru Pembeli */}
              <button
                onClick={() => handleRoleLogin("buyer")}
                disabled={isLoading}
                className={`w-full text-left p-4.5 rounded-2xl border transition-all relative overflow-hidden group cursor-pointer ${
                  activeRole === "buyer"
                    ? "bg-accent/20 border-accent shadow-lg shadow-accent/10"
                    : "bg-slate-950/40 border-slate-800 hover:border-accent/50 hover:bg-slate-950/70"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-accent/15 rounded-xl border border-accent/20 text-accent flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                      PEMBELI GURU (BUYER)
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-1">
                      Menjelajahi ribuan materi, menggunakan filter canggih, & unduh modul secara instan.
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-[10px] text-accent font-bold bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-md w-fit">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Masuk sebagai: Bu Indah Sari, S.Pd.</span>
                    </div>
                  </div>
                </div>
                {isLoading && activeRole === "buyer" ? (
                  <div className="absolute inset-0 bg-accent/5 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-accent absolute right-4 top-1/2 -translate-y-1/2 group-hover:translate-x-1 transition-all" />
                )}
              </button>

            </div>

            <div className="text-[10px] text-slate-500 font-bold text-center border-t border-slate-800/80 pt-4">
              🛡️ Semua data akun di atas merupakan dummy simulasi UI/UX EduSell.
            </div>
          </div>

          {/* RIGHT COLUMN: MANUAL SIGN-IN FORM */}
          <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-slate-950/40 relative">
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">Masuk Manual</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Formulir autentikasi SaaS formal untuk pengembangan.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Email Address */}
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Alamat Email</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 focus:border-primary rounded-xl text-xs focus:ring-1 focus:ring-primary focus:outline-none transition-all font-semibold text-slate-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Kata Sandi</label>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); alert("Fitur lupa kata sandi dinonaktifkan dalam mode demo!"); }}
                    className="text-[10px] font-bold text-primary-light hover:underline"
                  >
                    Lupa Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 focus:border-primary rounded-xl text-xs focus:ring-1 focus:ring-primary focus:outline-none transition-all font-semibold text-slate-200"
                  />
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    disabled={isLoading}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-950 bg-slate-900 cursor-pointer"
                  />
                  Ingat Saya
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-extrabold text-xs rounded-xl shadow-lg shadow-primary/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4 relative overflow-hidden"
              >
                {isLoading && activeRole === null ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Masuk Panel Utama</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-xs font-semibold text-slate-400 border-t border-slate-800/80 pt-4 mt-2">
              Belum punya akun?{" "}
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert("Pendaftaran baru saat ini diarahkan ke Autentikasi Demo. Silakan gunakan tombol Masuk Instan di sebelah kiri."); }}
                className="text-primary-light font-bold hover:underline"
              >
                Daftar Gratis
              </a>
            </div>

            {/* Loading Cover Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-[#0B0F19]/45 backdrop-blur-[2px] rounded-r-[32px] pointer-events-none transition-all duration-300" />
            )}
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-6 py-6 max-w-7xl mx-auto w-full border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500 z-10">
        <p>© 2026 EduSell. Hak Cipta Dilindungi Undang-Undang.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-400">Ketentuan Layanan</a>
          <span>·</span>
          <a href="#" className="hover:text-slate-400">Kebijakan Privasi</a>
        </div>
      </footer>

    </div>
  );
}
