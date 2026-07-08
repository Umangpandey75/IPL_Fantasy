import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "IPL Fantasy League 2026 — Build Your Dream Cricket Team",
  description: "The premium IPL Fantasy experience. Build your XI, track live scores, compete on leaderboard, and win in IPL 2026 season.",
  keywords: ["IPL", "Fantasy Cricket", "IPL 2026", "Cricket Fantasy", "IPL Fantasy League"],
  authors: [{ name: "IPL Fantasy" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-white text-slate-900 font-sans`}
        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
