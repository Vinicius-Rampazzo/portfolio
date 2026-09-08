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
  const progressRef = useRef<HTMLSpanElement>(null);
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

        const skewTo = gsap.quickTo(track, "skewX", {
          duration: 0.4,
          ease: "power3",
        });

        // Sentido contrário ao da Stack Técnica: lá o trilho corre para a
        // esquerda e os painéis chegam pela direita; aqui ele corre para a
        // direita e a trajetória chega pela esquerda. O `flex-row-reverse`
        // é o que mantém a ordem de leitura — o título fica na ponta
        // direita, que é onde a seção começa, e cada experiência entra
        // depois dele pela borda esquerda.
        const rail = gsap.fromTo(
          track,
          { x: () => -overflow() },
          {
            x: 0,
            ease: "none",
            scrollTrigger: {
              id: "experience-rail",
              trigger: sectionRef.current,
              start: "top top",
              end: () => "+=" + overflow(),
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                skewTo(gsap.utils.clamp(-2.5, 2.5, self.getVelocity() / 900));
                if (progressRef.current) {
                  gsap.set(progressRef.current, { scaleX: self.progress });
                }
              },
              onScrubComplete: () => skewTo(0),
            },
          }
        );

        const panels = gsap.utils.toArray<HTMLElement>(
          track.querySelectorAll("[data-card]")
        );

        const panelTweens = panels.flatMap((panel) => {
          const body = panel.querySelector("[data-panel-body]");
          const year = panel.querySelector("[data-panel-year]");
          if (!body) return [];

          // O painel entra pela borda esquerda, então o gatilho é a borda
          // DIREITA dele cruzando a tela — é o lado que aparece primeiro.
          const enter = gsap.fromTo(
            body,
            { autoAlpha: 0.15, x: -40 },
            {
              autoAlpha: 1,
              x: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: rail,
                start: "right left",
                end: "right 55%",
                scrub: true,
              },
            }
          );

          // O ano gigante corre em velocidade própria: é o que dá
          // profundidade a um painel que é só tipografia.
          const drift = year
            ? gsap.fromTo(
                year,
                { xPercent: -8 },
                {
                  xPercent: 8,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: rail,
                    start: "right left",
                    end: "left right",
                    scrub: true,
                  },
                }
              )
            : null;

          return drift ? [enter, drift] : [enter];
        });

        return () => {
          [rail, ...panelTweens].forEach((t) => {
            t.scrollTrigger?.kill();
            t.kill();
          });
          gsap.set(track, { skewX: 0, x: 0 });
        };
      });

      media.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          track.querySelectorAll("[data-card]")
        );
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
      className="relative bg-base py-28 md:py-0 md:h-[100svh] overflow-hidden"
    >
      {/* Como na Stack Técnica: a faixa superior fica livre para a Nav, e
          nada do trilho sobe até a altura do wordmark. */}
      <div
        ref={viewportRef}
        className="md:h-full md:overflow-hidden md:pt-[clamp(7.5rem,13vh,10rem)] md:pb-[clamp(3.5rem,7vh,5rem)]"
      >
        <div
          ref={trackRef}
          className="flex flex-col gap-16 px-6 md:px-10 md:h-full md:flex-row-reverse md:gap-[4vw] md:w-max md:pl-[12vw]"
        >
          <header className="flex-shrink-0 max-w-4xl md:h-full md:w-[min(42vw,30rem)] md:flex md:flex-col md:justify-center">
            <p className="type-label text-cyan-400 mb-6">Trajetória</p>
            <h2
              className="type-headline text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Experiência
              <span className="text-muted font-light"> profissional</span>
            </h2>
            <p className="hidden md:block text-muted text-sm mt-8 max-w-xs leading-relaxed">
              Três frentes — role para o lado.
            </p>
          </header>

          {experiences.map((exp, index) => {
            const paragraphs = Array.isArray(exp.description)
              ? exp.description
              : [exp.description];

            return (
              <article
                key={index}
                data-card
                className="relative flex-shrink-0 border-t border-white/15 pt-8 md:h-full md:w-[52vw] lg:w-[44vw] md:flex md:flex-col md:justify-center md:border-t-0 md:pt-0"
              >
                {/* O ano em números gigantes vira a textura do painel — dá
                    escala sem introduzir nenhum elemento novo. */}
                <span
                  data-panel-year
                  aria-hidden
                  className="pointer-events-none select-none absolute -top-4 right-0 md:top-0 font-display font-extrabold leading-[0.75] text-white/[0.04] whitespace-nowrap"
                  style={{ fontSize: "clamp(5rem, 13vw, 13rem)" }}
                >
                  {exp.period.replace(/[^0-9]/g, "").slice(0, 4)}
                </span>

                <div data-panel-body className="relative z-10 md:border-t md:border-white/15 md:pt-8">
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

      {/* A barra cresce da direita para a esquerda, no mesmo sentido do
          trilho — se crescesse ao contrário, contradiria o movimento. */}
      <div className="hidden md:block absolute bottom-[clamp(1.5rem,3.5vh,2.5rem)] left-10 right-10 h-px bg-white/10">
        <span
          ref={progressRef}
          className="block h-px bg-cyan-400 origin-right scale-x-0"
        />
      </div>
    </section>
  );
}
