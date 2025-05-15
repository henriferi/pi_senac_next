"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {!isLoginPage && <Header />}
        <div className="flex pt-16">
          {!isLoginPage && <Sidebar />}
          <main className={`flex-1 ${!isLoginPage ? 'ml-48' : ''} min-h-[calc(100vh-64px)]`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}