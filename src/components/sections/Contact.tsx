"use client";

import { ArrowUpRight } from "lucide-react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import type { SectionProps } from "./types";

const EMAIL = "vinicius_rampazzo10@hotmail.com";

// O endereço é uma palavra só de 29 caracteres: numa tela de celular ele não
// cabe numa linha, e a quebra automática partia no meio de "hotmail.com".
// Separado aqui, a única quebra possível é depois do "@".
const [EMAIL_USUARIO, EMAIL_DOMINIO] = EMAIL.split("@");

export function Contact({ sectionRef }: SectionProps) {
  useSectionReveal(sectionRef, { y: 48 });

  return (
    <section
      ref={sectionRef}
      data-section="contact"
      id="contact"
      className="relative min-h-[80svh] flex flex-col justify-center py-32 md:py-44 bg-base overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-cyan-400/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 md:px-10 w-full">
        <p data-reveal className="type-label text-cyan-400 mb-8">
          Contato
        </p>

        <h2 data-reveal className="type-headline text-white mb-12 max-w-3xl">
          Vamos construir
          <br />
          <span className="text-gradient">algo relevante?</span>
        </h2>

        {/* O e-mail é o elemento de maior peso da seção — nas referências o
            fechamento é sempre um bloco tipográfico, não um botão. */}
        <a
          data-reveal
          data-magnetic
          href={`mailto:${EMAIL}`}
          className="group inline-flex items-start gap-1 md:gap-4 mb-16 max-w-full"
        >
          {/* Sem sublinhado: o traço do bloco de baixo já fecha o e-mail, e os
              dois juntos viravam duas linhas quase coladas.
              A escala cai mais rápido que a do type-title no celular — ali o
              piso de 1,5rem daquela escala não deixava o endereço caber. */}
          <span className="type-title type-email text-white group-hover:text-cyan-400 transition-colors duration-500">
            {EMAIL_USUARIO}@<wbr />
            {EMAIL_DOMINIO}
          </span>
          <ArrowUpRight className="w-4 h-4 md:w-8 md:h-8 text-muted flex-shrink-0 mt-1 transition-all duration-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>

        <div
          data-reveal
          className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-10 border-t border-white/10"
        >
          <p className="type-lead text-muted max-w-lg mr-auto">
            Aberto a conversar sobre engenharia de software, produtos SaaS,
            aplicações com Inteligência Artificial e arquitetura de sistemas.
          </p>

          <a
            data-magnetic
            href="https://www.linkedin.com/in/vinicius-rampazzo-web-developer/"
            target="_blank"
            rel="noopener noreferrer"
            className="type-label text-white hover:text-cyan-400 transition-colors duration-300 border-b border-white/25 hover:border-cyan-400 pb-1.5"
          >
            LinkedIn
          </a>
          <a
            data-magnetic
            href="https://github.com/Vinicius-Rampazzo"
            target="_blank"
            rel="noopener noreferrer"
            className="type-label text-white hover:text-cyan-400 transition-colors duration-300 border-b border-white/25 hover:border-cyan-400 pb-1.5"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
