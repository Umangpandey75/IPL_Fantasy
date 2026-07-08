import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/ipl/auth";

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
  title: "IPL Fantasy — Build Your Dream Cricket Team",
  description: "The premium IPL Fantasy experience. Build your XI, compete on leaderboard, and play with real fixtures, real players, real points.",
  keywords: ["IPL", "Fantasy Cricket", "Cricket Fantasy", "IPL Fantasy", "RCB", "Bumrah", "Kohli", "Cricket"],
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
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
