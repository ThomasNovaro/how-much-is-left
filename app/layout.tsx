import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outwardBorders = localFont({
  src: "./outward-borders.woff2",
  display: "swap",
  variable: "--font-outwardBorders",
});

const outwardBlock = localFont({
  src: "./outward-block.woff2",
  display: "swap",
  variable: "--font-outwardBlock",
});

export const metadata: Metadata = {
  title: "How much is left?",
  description: "Countdown to the Irreversible Point for Global Warming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outwardBlock.variable} ${outwardBorders.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
