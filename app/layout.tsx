import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gilang Happy Dwinugroho | Fullstack Developer",
  description:
    "Portfolio of Gilang Happy Dwinugroho - Informatics undergraduate specializing in scalable web systems, clean architecture, and modern UI development.",
  keywords: [
    "Gilang Happy Dwinugroho",
    "Fullstack Developer",
    "Web Developer",
    "Next.js",
    "Laravel",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Gilang Happy Dwinugroho" }],
  openGraph: {
    title: "Gilang Happy Dwinugroho | Fullstack Developer",
    description:
      "Portfolio showcasing scalable web systems and modern UI development.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gilang Happy Dwinugroho | Fullstack Developer",
    description:
      "Portfolio showcasing scalable web systems and modern UI development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
