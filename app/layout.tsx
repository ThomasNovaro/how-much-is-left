import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

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
        className={`${outwardBlock.variable} ${outwardBorders.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
