import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "LindaBen Foundation — Servants of Those in Need & The Invisible",
  description:
    "The LindaBen Foundation provides nutritious food, promotes wellness, reduces food waste, and offers nutrition education to help children and empower families overcome food insecurity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
