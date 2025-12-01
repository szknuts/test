/**
 * ルートレイアウト
 * アプリケーション全体の共通レイアウト（HTML構造、フォント、ナビゲーション、フッター）を定義する。
 */
import type { Metadata, Viewport } from "next";

import { Noto_Sans_JP, Shippori_Mincho, Zen_Antique } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-shippori-mincho",
});

const zenAntique = Zen_Antique({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zen-antique",
});

export const metadata: Metadata = {
  title: "近畿大学体育会ボクシング部 | Kindai University Boxing Club",
  description:
    "近畿大学体育会ボクシング部の公式ウェブサイト。部員紹介、活動報告、最新情報をお届けします。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${shipporiMincho.variable} ${zenAntique.variable} antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
