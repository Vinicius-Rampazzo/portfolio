"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useMotionEnabled } from "@/hooks/useMediaQuery";
import { skillGroups } from "@/data/skills";
import type { SectionProps } from "./types";

/** Uma imagem por categoria, na ordem de skillGroups. */
const IMAGES = [
  "/images/skill-01.jpg",
  "/images/skill-02.jpg",
  "/images/skill-03.jpg",
  "/images/skill-04.jpg",
  "/images/skill-05.jpg",
  "/images/skill-06.jpg",
];

export function Skills({ sectionRef }: SectionProps) {
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

        // Inclinação por velocidade: o trilho estica um pouco no gesto rápido
        // e volta ao prumo sozinho. É o peso que a referência tem e que um
        // scrub puro não dá. Amplitude curta de propósito — num painel de
        // 700px de altura, qualquer grau a mais vira distorção.
        const skewTo = gsap.quickTo(track, "skewX", {
          duration: 0.4,
          ease: "power3",
        });

        const rail = gsap.to(track, {
          x: () => -overflow(),
          ease: "none",
          scrollTrigger: {
            id: "skills-rail",
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + overflow(),
            // Sem snap: o encaixe forçado a cada painel travava o gesto no
            // meio do caminho. Com scrub longo o trilho desacelera até parar,
            // que é a chegada da referência.
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              skewTo(gsap.utils.clamp(-2.5, 2.5, self.getVelocity() / -900));
              if (progressRef.current) {
                gsap.set(progressRef.current, { scaleX: self.progress });
              }
            },
            onScrubComplete: () => skewTo(0),
          },
        });

        // Efeitos por painel. `containerAnimation` é o que permite disparar
        // gatilhos pela posição HORIZONTAL do card dentro do trilho — sem
        // isso, todos os cards compartilhariam a posição vertical da seção e
        // nada distinguiria o que está entrando do que já passou.
        const cards = gsap.utils.toArray<HTMLElement>(
          track.querySelectorAll("[data-card]")
        );

        const cardTweens = cards.flatMap((card) => {
          const mediaBox = card.querySelector("[data-card-media]");
          if (!mediaBox) return [];

          // A foto corre dentro da moldura enquanto o card cruza a tela.
          const drift = gsap.fromTo(
            mediaBox,
            { xPercent: 6 },
            {
              xPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: rail,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );

          // Chegada pela direita: a moldura abre pela lateral e a foto assenta.
          const reveal = gsap.fromTo(
            card,
            { clipPath: "inset(0% 0% 0% 14%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: rail,
                start: "left right",
                end: "left 55%",
                scrub: true,
              },
            }
          );

          const settle = gsap.fromTo(
            mediaBox,
            { scale: 1.08 },
            {
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: rail,
                start: "left right",
                end: "left 55%",
                scrub: true,
              },
            }
          );

          return [drift, reveal, settle];
        });

        return () => {
          [rail, ...cardTweens].forEach((t) => {
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
      data-section="skills"
      id="skills"
      className="relative bg-surface py-28 md:py-0 md:h-[100svh] overflow-hidden"
    >
      {/* O padding superior é o que mantém título e cards fora da faixa da
          Nav (logo + botão ocupam ~112px no desktop). Enquanto a seção está
          presa, nada sobe para dentro dessa faixa — era ali que o wordmark
          se misturava com o título. */}
      <div
        ref={viewportRef}
        className="md:h-full md:overflow-hidden md:pt-[clamp(7.5rem,13vh,10rem)] md:pb-[clamp(3.5rem,7vh,5rem)]"
      >
        <div
          ref={trackRef}
          className="flex flex-col gap-10 px-6 md:px-10 md:h-full md:flex-row md:items-stretch md:gap-[3vw] md:w-max md:pr-[12vw]"
        >
          {/* O título é o primeiro painel do trilho: entra na composição
              horizontal em vez de disputar altura com os cards, que é o que
              estourava a tela e cortava o rodapé deles. */}
          <header className="flex-shrink-0 max-w-4xl md:h-full md:w-[min(42vw,30rem)] md:flex md:flex-col md:justify-center">
            <p className="type-label text-cyan-400 mb-6">Stack Técnica</p>
            {/* Um grau abaixo da escala das outras seções: aqui o título
                divide a linha do olho com os cards, e no tamanho cheio
                "Competências" transbordava o painel e ficava por baixo do
                primeiro card. */}
            <h2
              className="type-headline text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Competências
              <span className="text-muted font-light"> de engenharia</span>
            </h2>
            <p className="hidden md:block text-muted text-sm mt-8 max-w-xs leading-relaxed">
              Seis frentes de trabalho — role para o lado.
            </p>
          </header>

          {skillGroups.map((group, index) => (
            <article
              key={group.label}
              data-card
              // A altura manda e a largura sai da proporção: assim o card
              // nunca ultrapassa a tela presa, e o texto do rodapé sempre
              // aparece inteiro.
              className="group relative flex-shrink-0 overflow-hidden rounded-sm w-full aspect-[3/4] md:w-auto md:h-full md:aspect-[3/4.2]"
            >
              {/* A moldura corta; o bloco interno é mais largo que ela para
                  poder correr sem revelar borda. */}
              <div
                data-card-media
                className="absolute inset-y-0 -inset-x-[8%] overflow-hidden"
              >
                <Image
                  src={IMAGES[index % IMAGES.length]}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  quality={82}
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                />
              </div>

              {/* Aqui o texto ocupa mais altura do card (título + lista),
                  então o véu sobe mais que no de Projetos — mas ainda
                  deixa o topo limpo, onde só há o contador. */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.8) 22%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.25) 62%, rgba(0,0,0,0.08) 80%, rgba(0,0,0,0.02) 100%)",
                }}
              />

              <div className="absolute inset-0 p-7 md:p-8 flex flex-col justify-between">
                <span className="type-label text-cyan-400 tabular-nums">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(skillGroups.length).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="type-title text-white mb-6">{group.label}</h3>
                  <ul className="space-y-1.5 border-t border-white/20 pt-5">
                    {group.items.map((item) => (
                      <li key={item} className="text-white/70 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Leitura de percurso no trecho preso: sem ela, o visitante não tem
          como saber quanto do trilho falta. */}
      <div className="hidden md:block absolute bottom-[clamp(1.5rem,3.5vh,2.5rem)] left-10 right-10 h-px bg-white/10">
        <span
          ref={progressRef}
          className="block h-px bg-cyan-400 origin-left scale-x-0"
        />
      </div>
    </section>
  );
}
