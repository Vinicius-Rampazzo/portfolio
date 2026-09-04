"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MapPin } from "lucide-react";
import { gsap, SplitText } from "@/lib/gsap";
import { useMotionEnabled } from "@/hooks/useMediaQuery";
import { useColorShift, shiftVars } from "@/hooks/useColorShift";
import { Counter } from "@/components/ui/Counter";
import { ParallaxGallery } from "@/components/ui/ParallaxGallery";
import { aboutGallery } from "@/data/gallery";
import type { SectionProps } from "./types";

const STATS = [
  { value: "4+", label: "Anos em tecnologia" },
  { value: "8", label: "Certificações" },
  { value: "3", label: "Projetos publicados" },
  { value: "2", label: "Premiações técnicas" },
];

export function About({ sectionRef }: SectionProps) {
  const proseRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();

  useColorShift(sectionRef);

  useGSAP(
    () => {
      if (!motionEnabled || !proseRef.current) return;

      const split = new SplitText(proseRef.current.querySelectorAll("p"), {
        type: "lines",
        mask: "lines",
      });

      const reveal = gsap.from(split.lines, {
        yPercent: 110,
        duration: 0.85,
        ease: "expo.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: proseRef.current,
          start: "top 82%",
          once: true,
        },
      });

      return () => {
        reveal.scrollTrigger?.kill();
        reveal.kill();
        split.revert();
      };
    },
    { dependencies: [motionEnabled], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-section="about"
      id="about"
      className="relative py-28 md:py-40 overflow-hidden"
      style={shiftVars()}
    >
      {/* Faixa 1 — texto. Sem coluna de imagem ao lado, não há alturas
          concorrentes e o desalinhamento das versões anteriores some. */}
      <div className="px-6 md:px-10">
        <header className="mb-16 md:mb-20 max-w-4xl">
          <p className="type-label text-cyan-600 mb-6">Sobre Mim</p>
          <h2 className="type-headline">
            Além
            <span style={{ color: "var(--sec-muted)" }} className="font-light">
              {" "}
              do código
            </span>
          </h2>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div ref={proseRef} className="space-y-6 leading-relaxed">
            <p className="type-lead" style={{ color: "var(--sec-fg)" }}>
              Sou Engenheiro de Software com foco na construção de aplicações
              escaláveis, plataformas SaaS, soluções com Inteligência Artificial
              e aplicações mobile offline-first.
            </p>
            <p style={{ color: "var(--sec-muted)" }}>
              Atuo no desenvolvimento e evolução de produtos digitais em
              diferentes contextos de negócio, com experiência em serviços
              financeiros, plataformas de crédito rural e soluções tecnológicas
              voltadas à assistência técnica no campo.
            </p>
            <p style={{ color: "var(--sec-muted)" }}>
              Trabalho principalmente com TypeScript, Node.js, Next.js, React,
              React Native, Python e PostgreSQL, participando de decisões
              relacionadas à arquitetura, modelagem de dados, APIs, integrações,
              sincronização de informações e evolução dos sistemas em produção.
            </p>
          </div>

          <div className="space-y-6 leading-relaxed">
            <p style={{ color: "var(--sec-muted)" }}>
              Minha experiência também envolve aplicações baseadas em
              Inteligência Artificial, incluindo arquiteturas RAG, busca
              semântica, integração com modelos de linguagem e soluções
              multi-tenant.
            </p>
            <p style={{ color: "var(--sec-muted)" }}>
              Minha formação em CyberSecurity complementa minha atuação em
              engenharia, trazendo uma visão voltada à segurança,
              infraestrutura, disponibilidade e confiabilidade das aplicações.
            </p>
            <p
              className="border-l-2 border-cyan-600/40 pl-5 italic"
              style={{ color: "var(--sec-fg)" }}
            >
              Mais do que implementar funcionalidades, busco compreender os
              objetivos de negócio e transformá-los em soluções técnicas
              sustentáveis, capazes de resolver problemas reais.
            </p>

            <div
              className="flex items-center gap-2 pt-4 type-label"
              style={{ color: "var(--sec-muted)" }}
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-600" />
              Presidente Prudente — SP, Brasil
            </div>
          </div>
        </div>
      </div>

      {/* Faixa 2 — imagens, largura total */}
      <div className="px-6 md:px-10 my-20 md:my-28">
        <ParallaxGallery images={aboutGallery} />
      </div>

      {/* Faixa 3 — métricas em linha */}
      <div className="px-6 md:px-10">
        <dl
          className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 border-t pt-12"
          style={{ borderColor: "var(--sec-muted)" }}
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt
                className="type-display leading-none mb-3"
                style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
              >
                <Counter value={stat.value} />
              </dt>
              <dd className="type-label" style={{ color: "var(--sec-muted)" }}>
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
