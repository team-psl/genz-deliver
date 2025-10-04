import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { I18nProvider } from "@/lib/i18n-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Genz Deliver - Fast & Reliable Parcel Delivery",
  description:
    "Send parcels anywhere with our delivery service. Fast, reliable, and affordable delivery service with real-time tracking.",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} ${GeistMono.variable}`}>
        {/* <ThemeProvider defaultTheme="system" > */}
        <I18nProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </I18nProvider>
        {/* </ThemeProvider> */}
        <Analytics />
      </body>
    </html>
  );
}
