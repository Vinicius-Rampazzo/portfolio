import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Vinicius Rampazzo | Desenvolvedor Full Stack',
  description: 'Desenvolvedor Full Stack especializado em Desenvolvimento Web e Segurança Cibernética. Criando soluções web modernas e seguras.',
  keywords: ['desenvolvedor full stack', 'react', 'nodejs', 'typescript', 'segurança cibernética'],
  authors: [{ name: 'Vinicius Rampazzo' }],
  openGraph: {
    title: 'Vinicius Rampazzo | Desenvolvedor Full Stack',
    description: 'Desenvolvedor Full Stack especializado em Desenvolvimento Web e Segurança Cibernética.',
    url: 'https://devrampazzo.com.br',
    siteName: 'DevRampazzo Portfolio',
    images: [
      {
        url: '/images/preview.png',
        width: 1200,
        height: 630,
        alt: 'Vinicius Rampazzo - Desenvolvedor Full Stack',
      }
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-icon.png', type: 'image/png' },
    ],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
