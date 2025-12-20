import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PlayerProvider } from "@/context/PlayerContext";
import localFont from "next/font/local";
import "./globals.css";
import Intro from "@/components/intro";
import GoogleAnalytics, { GoogleTagManagerNoscript } from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const marvio = localFont({
  src: "./fonts/marvio.otf",
  variable: "--font-marvio",
  display: "swap",
});

const maghfirea = localFont({
  src: "./fonts/maghfirea.otf",
  variable: "--font-maghfirea",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Get Lyrical - Meryl Edition",
  description: "Discover the lyrics of songs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${marvio.variable} ${maghfirea.variable} antialiased`}
      >
        <GoogleTagManagerNoscript />
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </body>
    </html>
  );
}
