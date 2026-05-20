import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Washee - Doorstep Car Wash",
  description: "Premium car wash at your door in Guwahati.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Yahan AuthProvider add kiya hai */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}