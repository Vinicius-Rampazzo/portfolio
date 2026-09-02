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
  // Sem isto o Next resolve a imagem de Open Graph para localhost no build.
  metadataBase: new URL("https://devrampazzo.com.br"),
  title: "Vinicius Rampazzo | Software Engineer · AI · SaaS",
  description:
    "Software Engineer especializado em aplicações SaaS, Inteligência Artificial, sistemas web escaláveis e soluções mobile offline-first.",
  keywords: [
    "software engineer",
    "engenheiro de software",
    "saas",
    "inteligência artificial",
    "rag",
    "llm",
    "offline-first",
    "react native",
    "next.js",
    "typescript",
    "nodejs",
    "python",
    "postgresql",
    "arquitetura de software",
    "cibersegurança",
  ],
  authors: [{ name: "Vinicius Rampazzo" }],
  openGraph: {
    title: "Vinicius Rampazzo — Software Engineer",
    description:
      "Engenharia de software, SaaS, Inteligência Artificial, aplicações offline-first e desenvolvimento seguro.",
    url: "https://devrampazzo.com.br",
    siteName: "DevRampazzo Portfolio",
    images: [
      {
        url: "/images/preview.png",
        width: 1200,
        height: 630,
        alt: "Vinicius Rampazzo — Software Engineer · SaaS · AI · Offline-First",
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
