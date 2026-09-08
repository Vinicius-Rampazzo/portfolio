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

/**
 * Prepara a abertura ANTES do primeiro paint.
 *
 * A cortina é renderizada no HTML do servidor; este script roda de forma
 * síncrona no <head> — portanto antes de qualquer pixel do <body> — e marca o
 * <html>, de onde o CSS a esconde na hora quando ela não deve tocar. É o que
 * elimina o relance da página por baixo da cortina.
 *
 * Toca em toda visita, inclusive a cada F5: a única dispensa é `prefers-
 * reduced-motion`. E como a abertura recomeça, a página também recomeça —
 * `scrollRestoration = manual` impede o navegador de devolver o visitante ao
 * ponto em que ele estava antes de atualizar.
 */
const INTRO_GATE = `try{if('scrollRestoration' in history)history.scrollRestoration='manual';window.scrollTo(0,0);var r=matchMedia('(prefers-reduced-motion: reduce)').matches;document.documentElement.dataset.intro=r?'skip':'play'}catch(e){document.documentElement.dataset.intro='skip'}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // O script acima muta um atributo do <html>: sem isto o React reclama de
    // divergência entre o HTML do servidor e o do cliente.
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_GATE }} />
      </head>
      <body className={`${syne.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
