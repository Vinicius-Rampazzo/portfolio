"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { EyeOff } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useMotionEnabled } from "@/hooks/useMediaQuery";
import { experiences } from "@/data/experiences";
import type { SectionProps } from "./types";

export function Experience({ sectionRef }: SectionProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();

  useGSAP(
    () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport || !motionEnabled) return;

      const overflow = () => track.scrollWidth - viewport.clientWidth;
      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        if (overflow() <= 0) return;

        const tween = gsap.to(track, {
          x: () => -overflow(),
          ease: "none",
          scrollTrigger: {
            id: "experience-rail",
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + overflow(),
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Um ponto de parada por experiência: soltar o scroll assenta
            // sempre com um painel enquadrado, nunca no meio de dois.
            snap: {
              snapTo: 1 / (experiences.length - 1),
              duration: { min: 0.15, max: 0.45 },
              delay: 0.05,
              ease: "power2.inOut",
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      media.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(track.children);
        const tweens = cards.map((card) =>
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.85,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 86%", once: true },
          })
        );
        return () =>
          tweens.forEach((t) => {
            t.scrollTrigger?.kill();
            t.kill();
          });
      });

      return () => media.revert();
    },
    { dependencies: [motionEnabled], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-section="experience"
      id="experience"
      className="relative bg-base py-28 md:py-0 md:h-[100svh] md:flex md:flex-col md:justify-center overflow-hidden"
    >
      <header className="px-6 md:px-10 mb-16 md:mb-14 max-w-4xl">
        <p className="type-label text-cyan-400 mb-6">Trajetória</p>
        <h2 className="type-headline text-white">
          Experiência
          <span className="text-muted font-light"> profissional</span>
        </h2>
      </header>

      <div ref={viewportRef} className="md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-16 px-6 md:px-10 md:flex-row md:gap-[5vw] md:w-max md:pr-[calc(100vw-62vw-2.5rem)]"
        >
          {experiences.map((exp, index) => {
            const paragraphs = Array.isArray(exp.description)
              ? exp.description
              : [exp.description];

            return (
              <article
                key={index}
                className="relative md:w-[62vw] lg:w-[54vw] flex-shrink-0 border-t border-white/15 pt-8"
              >
                {/* O ano em números gigantes vira a textura do painel — dá
                    escala sem introduzir nenhum elemento novo. */}
                <span
                  aria-hidden
                  className="pointer-events-none select-none absolute -top-4 right-0 font-display font-extrabold leading-[0.75] text-white/[0.04] whitespace-nowrap"
                  style={{ fontSize: "clamp(5rem, 13vw, 13rem)" }}
                >
                  {exp.period.replace(/[^0-9]/g, "").slice(0, 4)}
                </span>

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-4 mb-7">
                    <span className="type-label text-muted/50 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {exp.current && (
                      <span className="flex items-center gap-2 type-label text-cyan-400 border border-cyan-400/30 bg-cyan-400/[0.08] px-3 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Atual
                      </span>
                    )}
                    <span className="type-label text-muted">{exp.period}</span>
                  </div>

                  <h3 className="type-title text-white mb-3">{exp.role}</h3>

                  {exp.company ? (
                    <p className="type-label text-cyan-400 mb-8">
                      {exp.company}
                    </p>
                  ) : (
                    <p className="type-label text-muted/60 italic flex items-center gap-2 mb-8">
                      <EyeOff className="w-3.5 h-3.5 flex-shrink-0" />
                      Empresa não divulgada
                    </p>
                  )}

                  <div className="space-y-4 text-muted leading-relaxed max-w-xl">
                    {paragraphs.map((paragraph, pi) => (
                      <p key={pi}>{paragraph}</p>
                    ))}
                  </div>

                  {exp.tech && (
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 pt-6 border-t border-white/10">
                      {exp.tech.map((tech) => (
                        <span key={tech} className="type-label text-muted/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
