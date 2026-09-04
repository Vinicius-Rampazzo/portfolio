"use client";

import Image from "next/image";
import { pillars } from "@/data/pillars";
import { useSideReveal } from "@/hooks/useSideReveal";
import type { SectionProps } from "./types";

/** Uma imagem por pilar, na ordem de `pillars`. */
const IMAGES = [
  "/images/pillar-01.jpg",
  "/images/pillar-02.jpg",
  "/images/pillar-03.jpg",
  "/images/pillar-04.jpg",
];

export function Pillars({ sectionRef }: SectionProps) {
  useSideReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      data-section="value"
      id="value"
      className="relative py-28 md:py-40 bg-surface overflow-hidden"
    >
      <div className="absolute -top-32 right-0 w-[480px] h-[480px] bg-blue-500/[0.05] rounded-full blur-3xl pointer-events-none" />

      <header className="relative z-10 px-6 md:px-10 mb-20 md:mb-28 max-w-4xl">
        <p data-side-reveal className="type-label text-cyan-400 mb-6">
          Áreas de Atuação
        </p>
        <h2 data-side-reveal className="type-headline text-white mb-8">
          Engenharia
          <br />
          <span className="text-muted font-light">além do código</span>
        </h2>
        <p data-side-reveal className="type-lead text-muted max-w-xl">
          Minha atuação combina desenvolvimento de software, arquitetura,
          Inteligência Artificial, aplicações offline-first e segurança.
        </p>
      </header>

      <div className="relative z-10 px-6 md:px-10 space-y-20 md:space-y-28">
        {pillars.map((pillar, index) => {
          const flipped = index % 2 === 1;

          return (
            <article
              key={pillar.title}
              data-side-reveal={flipped ? "right" : undefined}
              className="group grid gap-8 md:grid-cols-2 md:gap-16 items-center"
            >
              {/* A imagem troca de lado a cada pilar, criando o ziguezague que
                  dá ritmo à seção sem precisar de nenhum elemento extra. */}
              <div
                className={`relative overflow-hidden aspect-[4/3] bg-base ${
                  flipped ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={IMAGES[index % IMAGES.length]}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={82}
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25" />

                <span className="absolute top-6 left-6 type-label text-white/70 tabular-nums">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(pillars.length).padStart(2, "0")}
                </span>
              </div>

              <div className={flipped ? "md:order-1" : ""}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 [&_svg]:w-7 [&_svg]:h-7 bg-white/[0.04]">
                  {pillar.icon}
                </div>

                <h3 className="type-title text-white mb-6 group-hover:text-cyan-400 transition-colors duration-500">
                  {pillar.title}
                </h3>

                <p className="text-muted leading-relaxed mb-8 max-w-lg">
                  {pillar.description}
                </p>

                <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
                  {pillar.items.map((item) => (
                    <li key={item} className="type-label text-muted/60">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
