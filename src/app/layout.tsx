import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduSell | Marketplace Materi Ajar K-12 Terbesar di Indonesia",
  description: "Platform marketplace digital tempat guru K-12 di Indonesia untuk saling berbagi, menjual, dan membeli materi ajar berkualitas. Temukan modul ajar, RPP, slide presentasi, dan LKS dengan mudah.",
  keywords: ["EduSell", "Marketplace Guru", "Materi Ajar K-12", "Modul Ajar", "RPP Kurikulum Merdeka", "Lembar Kerja Siswa", "Media Pembelajaran", "Guru Indonesia"],
  authors: [{ name: "EduSell Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="font-sans antialiased text-slate-800 bg-white min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
