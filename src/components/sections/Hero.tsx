"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useCanRender3D, useMotionEnabled } from "@/hooks/useMediaQuery";

const HeroObject = dynamic(
  () => import("@/components/three/HeroObject").then((m) => m.HeroObject),
  { ssr: false }
);

type HeroProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  onNavigate: (target: "projects" | "contact") => void;
};

export function Hero({ sectionRef, onNavigate }: HeroProps) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();
  const canRender3D = useCanRender3D();

  useGSAP(
    () => {
      if (!motionEnabled || !nameRef.current) return;

      const lines = nameRef.current.querySelectorAll("[data-name-line]");

      // Cada linha do nome vive dentro de um contêiner com overflow oculto,
      // então subir a partir de yPercent 105 produz a revelação por máscara —
      // o gesto mais característico das referências.
      const intro = gsap.timeline({ delay: 0.15 });

      intro
        .from(lines, {
          yPercent: 105,
          duration: 1.15,
          ease: "expo.out",
          stagger: 0.09,
        })
        .from(
          metaRef.current?.querySelectorAll("[data-hero-meta]") ?? [],
          {
            opacity: 0,
            y: 18,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.6"
        );

      // O nome sobe e desaparece antes da próxima seção chegar.
      const exit = gsap.to(nameRef.current, {
        yPercent: -18,
        opacity: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      return () => {
        intro.kill();
        exit.scrollTrigger?.kill();
        exit.kill();
      };
    },
    { dependencies: [motionEnabled], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-28 pb-10"
    >
      <div className="dot-grid absolute inset-0 opacity-60" />
      <div className="hero-glow absolute inset-0" />

      {/* Objeto 3D atrás do nome. No mobile e sob reduced motion a seção fica
          puramente tipográfica — um estado desenhado, não uma ausência. */}
      {canRender3D && <HeroObject className="absolute inset-0 z-0" />}

      <div className="relative z-10 w-full px-6 md:px-10 flex-1 flex flex-col justify-center pointer-events-none">
        <h1 className="type-display text-white w-full" ref={nameRef}>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-name-line className="block">
              Vinicius
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-name-line className="block text-gradient">
              Rampazzo
            </span>
          </span>
        </h1>
      </div>

      <div
        ref={metaRef}
        className="relative z-10 w-full px-6 md:px-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
      >
        <div className="max-w-xl">
          <p data-hero-meta className="type-label text-cyan-400 mb-4">
            Software Engineer · SaaS · AI · Offline&#8209;First
          </p>
          <p data-hero-meta className="type-lead text-muted">
            Construo produtos digitais escaláveis, plataformas SaaS, aplicações
            com Inteligência Artificial e soluções mobile offline-first.
          </p>
        </div>

        <div data-hero-meta className="flex items-center gap-5 flex-shrink-0">
          <button
            data-magnetic
            onClick={() => onNavigate("projects")}
            className="group flex items-center gap-3 type-label text-white border border-white/20 rounded-full px-6 py-4 hover:border-cyan-400/60 hover:text-cyan-400 transition-colors duration-300"
          >
            Ver projetos
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button
            data-magnetic
            onClick={() => onNavigate("contact")}
            className="type-label text-muted hover:text-white transition-colors duration-300 underline underline-offset-8 decoration-white/20 hover:decoration-cyan-400"
          >
            Contato
          </button>
        </div>
      </div>
    </section>
  );
}
