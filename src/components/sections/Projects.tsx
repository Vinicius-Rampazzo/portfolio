"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Github, Trophy } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useMotionEnabled } from "@/hooks/useMediaQuery";
import { projects } from "@/data/projects";
import type { SectionProps } from "./types";

export function Projects({ sectionRef }: SectionProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();

  useGSAP(
    () => {
      const stack = stackRef.current;
      if (!stack || !motionEnabled) return;

      const panels = gsap.utils.toArray<HTMLElement>(
        stack.querySelectorAll("[data-panel]")
      );

      // Empilhamento: cada painel gruda e o próximo sobe por cima. O último
      // não gruda — não há nada para cobri-lo, e prender a tela ali seria só
      // fazer o visitante esperar.
      const timelines = panels.slice(0, -1).map((panel, index) =>
        gsap
          .timeline({
            scrollTrigger: {
              id: `project-panel-${index}`,
              trigger: panel,
              start: "top top",
              end: "bottom top",
              scrub: true,
              pin: true,
              pinSpacing: false,
            },
          })
          .to(panel, { scale: 0.93, opacity: 0.3, ease: "none" })
      );

      return () =>
        timelines.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
    },
    { dependencies: [motionEnabled], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-section="projects"
      id="projects"
      className="relative bg-base"
    >
      <header className="px-6 md:px-10 pt-28 md:pt-40 pb-16 md:pb-24 max-w-4xl">
        <p className="type-label text-cyan-400 mb-6">Trabalhos</p>
        <h2 className="type-headline text-white">
          Projetos
          <br />
          <span className="text-muted font-light">em destaque</span>
        </h2>
      </header>

      <div ref={stackRef}>
        {projects.map((project, index) => (
          <article
            key={project.title}
            data-panel
            className="relative min-h-[100svh] flex items-end bg-base border-t border-white/10 overflow-hidden"
          >
            {/* A imagem passa a ser o fundo do painel inteiro, não a miniatura
                de um card — é o que dá a escala das referências. */}
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: project.imagePosition ?? "center center",
              }}
              // Alta: são capturas de tela com texto fino, onde a compressão
              // aparece como sujeira nas letras muito antes que numa foto.
              quality={95}
            />
            {/* Véu só onde o texto está, não sobre a imagem inteira.
                O antigo escurecia 70% no meio e 20% no topo, apagando a
                imagem toda para dar contraste a um texto que vive apenas na
                faixa de baixo. Os cinco pontos abaixo aproximam uma curva
                suave: forte no rodapé, imperceptível a partir de 60% e
                totalmente transparente nos 20% superiores. */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.82) 14%, rgba(0,0,0,0.5) 32%, rgba(0,0,0,0.18) 52%, rgba(0,0,0,0.04) 68%, transparent 82%)",
              }}
            />

            <div className="relative z-10 w-full px-6 md:px-10 pb-16 md:pb-24 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-end">
              <div>
                <div className="flex items-center gap-5 mb-6">
                  <span className="type-label text-white/40 tabular-nums">
                    {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                  {project.category && (
                    <span className="type-label text-cyan-400">
                      {project.category}
                    </span>
                  )}
                </div>

                <h3 className="type-headline text-white mb-6">
                  {project.title}
                </h3>

                {project.award && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black type-label">
                    <Trophy className="w-3.5 h-3.5" />
                    {project.award}
                  </span>
                )}
              </div>

              <div>
                <p className="type-lead text-white/80 mb-8 max-w-xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                  {project.tech.map((tech) => (
                    <span key={tech} className="type-label text-white/50">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-8">
                  <a
                    data-magnetic
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 type-label text-white border-b border-white/30 pb-1.5 hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    Ver projeto
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                  {project.github && (
                    <a
                      data-magnetic
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 type-label text-white/60 hover:text-white transition-colors duration-300"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Código
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
