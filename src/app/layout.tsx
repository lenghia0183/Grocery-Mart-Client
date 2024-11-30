import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grocery Mart | Premium Coffee, Tea, and Cacao",
  description:
    "Shop the finest selection of coffee, tea, and cacao at Grocery Mart. Discover high-quality products sourced from the best growers and roasters worldwide.",

  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    other: [
      { rel: "icon", url: "/favicon/favicon-32x32.png", sizes: "32x32" },
      {
        rel: "icon",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-950">{children}</body>
    </html>
  );
}
