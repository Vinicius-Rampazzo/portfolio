"use client";

import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
  <footer className="py-8 border-t border-white/[0.05] bg-surface">
    <div className="w-full px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-muted text-xs">
      <Image
        src="/images/logo.png"
        alt="VR Logo"
        width={40}
        height={40}
        className="h-10 w-auto"
        // style={{ filter: 'invert(1) hue-rotate(180deg) brightness(2.8)' }}
      />
      <p>© 2025 Vinicius Rampazzo. Desenvolvido com Next.js e Tailwind CSS.</p>
      <div className="flex gap-5">
        <a
          href="https://github.com/Vinicius-Rampazzo"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/vinicius-rampazzo-web-developer/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href="mailto:vinicius_rampazzo@hotmail.com"
          className="hover:text-white transition-colors"
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </div>
  </footer>
  );
}
