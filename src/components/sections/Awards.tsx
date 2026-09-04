"use client";

import Image from "next/image";
import { achievements } from "@/data/achievements";
import { useColorShift, shiftVars } from "@/hooks/useColorShift";
import { useSideReveal } from "@/hooks/useSideReveal";
import type { SectionProps } from "./types";

export function Awards({ sectionRef }: SectionProps) {
  useColorShift(sectionRef);
  useSideReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      data-section="awards"
      id="awards"
      className="relative py-28 md:py-40 overflow-hidden"
      style={shiftVars()}
    >
      <header className="px-6 md:px-10 mb-20 md:mb-28 max-w-4xl">
        <p data-side-reveal className="type-label text-cyan-700 mb-6">
          Conquistas
        </p>
        <h2 data-side-reveal className="type-headline">
          Premiações
        </h2>
      </header>

      <div className="px-6 md:px-10 space-y-24 md:space-y-36">
        {achievements.map((item, index) => {
          const flipped = index % 2 === 1;

          return (
            <article
              key={item.event}
              data-side-reveal={flipped ? "right" : undefined}
              className="group grid gap-10 md:grid-cols-2 md:gap-16 lg:gap-24 items-center"
            >
              <div className={`relative ${flipped ? "md:order-2" : ""}`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* Sem véu escuro: o texto vive ao lado, não sobre a foto,
                      então não há razão para degradar a imagem — foi a queixa
                      da rodada passada em Projetos. */}
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                    style={{ objectPosition: item.imagePosition ?? "center" }}
                  />
                </div>

                {/* A colocação encosta na quina da imagem e sangra para fora:
                    deixa de ser marca d'água apagada ao fundo e vira o
                    elemento gráfico que ancora a faixa. */}
                <span
                  aria-hidden
                  className={`pointer-events-none select-none absolute -bottom-6 md:-bottom-10 font-display font-extrabold leading-[0.7] ${
                    item.accent.text
                  } ${flipped ? "-right-3 md:-right-8" : "-left-3 md:-left-8"}`}
                  style={{ fontSize: "clamp(5rem, 12vw, 11rem)" }}
                >
                  {item.place}
                </span>
              </div>

              <div className={flipped ? "md:order-1" : ""}>
                <div
                  className={`inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 ${item.accent.bg} ${item.accent.text}`}
                >
                  {item.icon}
                  <span className="type-label">{item.event}</span>
                </div>

                <h3 className="type-headline mb-8">{item.title}</h3>

                <p className="type-lead" style={{ color: "var(--sec-muted)" }}>
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
