import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fisher Waste Solutions - Professional Waste Management in Houston",
  description: "Reliable dumpster rentals, junk removal, and demolition services in Houston and surrounding areas. Same-day availability with transparent pricing. Licensed and insured.",
  keywords: "dumpster rental Houston, junk removal Houston, demolition services Houston, waste management, construction cleanup",
  openGraph: {
    title: "Fisher Waste Solutions - Professional Waste Management",
    description: "Reliable dumpster rentals, junk removal, and demolition services in Houston. Same-day availability.",
    url: "https://fisherwaste.com",
    siteName: "Fisher Waste Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fisher Waste Solutions - Professional Waste Management",
    description: "Reliable dumpster rentals, junk removal, and demolition services in Houston.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
