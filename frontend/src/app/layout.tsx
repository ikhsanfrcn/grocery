import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/cart";
import { LocationProvider } from "../context/location";
import { NotificationProvider } from "../components/notification";
import Header from "../components/header";
import Navbar from "../components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Katalog Produk Grosir",
  description: "Aplikasi katalog produk grosir untuk distributor dan sales lapangan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 overflow-x-hidden`}
      >
          <LocationProvider>
            <CartProvider>
              <NotificationProvider>
                <div className="min-h-screen flex flex-col max-w-full overflow-x-hidden">
                  <Header />
                  <div className="flex-1 pt-20 p-4 pb-20">
                    {children}
                  </div>
                  <Navbar />
                </div>
              </NotificationProvider>
            </CartProvider>
          </LocationProvider>
      </body>
    </html>
  );
}
