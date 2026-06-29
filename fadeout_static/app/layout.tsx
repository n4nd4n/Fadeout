import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FadeOut | Moments Fade. Memories Stay.",
  description: "Create private event spaces where conversations fade and memories stay.",
  openGraph: {
    title: "FadeOut | Moments Fade. Memories Stay.",
    description: "Create private event spaces where conversations fade and memories stay.",
    type: "website",
    siteName: "FadeOut",
  },
  twitter: {
    card: "summary_large_image",
    title: "FadeOut | Moments Fade. Memories Stay.",
    description: "Create private event spaces where conversations fade and memories stay.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white">
        {children}
      </body>
    </html>
  );
}
