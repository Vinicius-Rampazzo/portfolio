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
            id: "skills-rail",
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + overflow(),
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (skillGroups.length - 1),
              duration: { min: 0.15, max: 0.4 },
              delay: 0.04,
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
      data-section="skills"
      id="skills"
      className="relative bg-surface py-28 md:py-0 md:h-[100svh] md:flex md:flex-col md:justify-center overflow-hidden"
    >
      <header className="px-6 md:px-10 mb-14 md:mb-12 max-w-4xl">
        <p className="type-label text-cyan-400 mb-6">Stack Técnica</p>
        <h2 className="type-headline text-white">
          Competências
          <span className="text-muted font-light"> de engenharia</span>
        </h2>
      </header>

      <div ref={viewportRef} className="md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-8 px-6 md:px-10 md:flex-row md:gap-6 md:w-max md:pr-[calc(100vw-34vw-2.5rem)]"
        >
          {skillGroups.map((group, index) => (
            <article
              key={group.label}
              className="group relative md:w-[34vw] lg:w-[30vw] flex-shrink-0 overflow-hidden rounded-sm"
            >
              <div className="relative aspect-[3/4] md:aspect-[3/4.2]">
                <Image
                  src={IMAGES[index % IMAGES.length]}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  quality={82}
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                />
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
