import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinicius Rampazzo | Full Stack Dev & Cybersecurity",
  description:
    "Desenvolvedor Full Stack com foco em aplicações seguras, escaláveis e orientadas a performance. Node.js, React, Next.js, Python e Defesa Cibernética.",
  keywords: [
    "desenvolvedor full stack",
    "cibersegurança",
    "react",
    "nodejs",
    "typescript",
    "ethical hacking",
    "segurança de aplicações",
    "next.js",
    "python",
  ],
  authors: [{ name: "Vinicius Rampazzo" }],
  openGraph: {
    title: "Vinicius Rampazzo | Full Stack Dev & Cybersecurity",
    description:
      "Full Stack Dev com foco em Segurança. Node.js, React, Next.js, Python, Defesa Cibernética.",
    url: "https://devrampazzo.com.br",
    siteName: "DevRampazzo Portfolio",
    images: [
      {
        url: "/images/preview.png",
        width: 1200,
        height: 630,
        alt: "Vinicius Rampazzo — Full Stack Developer & Cybersecurity",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/images/apple-icon.png", type: "image/png" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${syne.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
