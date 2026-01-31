import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";
import Favicon from "@/assets/images/Favicon.png";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "NoveraFits | Premium Women's Wear & Fashion",
    template: "%s | NoveraFits",
  },
  description: "Discover NoveraFits - your destination for premium women's clothing. Shop timeless dresses, chic tops, comfortable activewear, and sustainable fashion designed for the modern woman.",
  keywords: [
    "Women's Clothing",
    "Online Fashion Store",
    "Premium Women's Wear",
    "Sustainable Fashion",
    "Minimalist Clothing",
    "Summer Dresses",
    "Chic Tops",
    "Activewear for Women",
    "NoveraFits",
    "Fashion Trends 2026"
  ],
  authors: [{ name: "NoveraFits" }],
  creator: "NoveraFits",
  publisher: "NoveraFits",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noverafits.com",
    title: "NoveraFits | Premium Women's Wear & Fashion",
    description: "Elevate your wardrobe with NoveraFits. Shop our curated collection of high-quality, sustainable, and timeless fashion staples.",
    siteName: "NoveraFits",
    images: [
      {
        url: "/og-image.jpg", // We should add an OG image ideally, but placeholder is fine for code structure
        width: 1200,
        height: 630,
        alt: "NoveraFits Fashion Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NoveraFits | Premium Women's Wear",
    description: "Frictionless shopping for minimalists. Discover our new arrivals today.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: Favicon.src,
    apple: Favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
