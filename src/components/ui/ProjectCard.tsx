"use client";

import Image from "next/image";
import { ArrowUpRight, Github, Trophy } from "lucide-react";
import type { Project } from "@/data/types";

/**
 * Projeto em escala editorial: imagem grande, título em display sobreposto e
 * metadados discretos. Sem moldura de card — a imagem e o tipo sustentam a
 * composição sozinhos, que é o que separa "portfólio de agência" de "grade
 * de cards".
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="group flex flex-col h-full">
      <div className="relative overflow-hidden rounded-sm bg-surface flex-shrink-0">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={750}
          className="w-full aspect-[4/3] object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
          style={{ objectPosition: project.imagePosition ?? "center center" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {project.award && (
          <span className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black type-label">
            <Trophy className="w-3.5 h-3.5" />
            {project.award}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="type-label text-white/50 tabular-nums block mb-3">
            {String(index + 1).padStart(2, "0")}
            {project.category ? ` — ${project.category}` : ""}
          </span>
          <h3 className="type-title text-white">{project.title}</h3>
        </div>
      </div>

      <div className="pt-6 flex flex-col flex-1">
        <p className="text-muted leading-relaxed mb-6 max-w-lg">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7">
          {project.tech.map((tech) => (
            <span key={tech} className="type-label text-muted/50">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 mt-auto">
          <a
            data-magnetic
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2 type-label text-white border-b border-white/25 pb-1.5 hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-300"
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
              className="flex items-center gap-2 type-label text-muted hover:text-white transition-colors duration-300"
            >
              <Github className="w-3.5 h-3.5" />
              Código
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
