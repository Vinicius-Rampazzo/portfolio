"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { X, Menu as MenuIcon, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useMotionEnabled } from "@/hooks/useMediaQuery";
import { useScrollLock } from "@/hooks/useSmoothScroll";
import { Wordmark } from "@/components/ui/Wordmark";

export type SectionKey =
  | "hero"
  | "value"
  | "projects"
  | "awards"
  | "about"
  | "skills"
  | "experience"
  | "certifications"
  | "contact";

export const NAV_LINKS: { label: string; section: SectionKey }[] = [
  { label: "Início", section: "hero" },
  { label: "Engenharia", section: "value" },
  { label: "Projetos", section: "projects" },
  { label: "Premiações", section: "awards" },
  { label: "Sobre", section: "about" },
  { label: "Skills", section: "skills" },
  { label: "Experiência", section: "experience" },
  { label: "Formação", section: "certifications" },
  { label: "Contato", section: "contact" },
];

type NavProps = {
  activeSection: string;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (section: SectionKey) => void;
};

export function Nav({ activeSection, isOpen, onToggle, onNavigate }: NavProps) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();

  useScrollLock(isOpen);

  useGSAP(
    () => {
      const curtain = curtainRef.current;
      if (!curtain) return;

      const lines = curtain.querySelectorAll("[data-menu-line]");
      const blocks = curtain.querySelectorAll("[data-menu-block]");
      const mark = curtain.querySelector("[data-menu-mark]");

      if (!motionEnabled) {
        gsap.set(curtain, { autoAlpha: isOpen ? 1 : 0, clipPath: "none" });
        gsap.set([lines, blocks, mark], { yPercent: 0, autoAlpha: 1 });
        return;
      }

      if (isOpen) {
        gsap.set(curtain, { autoAlpha: 1, clipPath: "inset(0 0 100% 0)" });
        gsap
          .timeline()
          .to(curtain, {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.7,
            ease: "expo.inOut",
          })
          .from(
            lines,
            { yPercent: 110, duration: 0.65, ease: "expo.out", stagger: 0.045 },
            "-=0.28",
          )
          .from(
            blocks,
            {
              autoAlpha: 0,
              y: 14,
              duration: 0.5,
              ease: "power3.out",
              stagger: 0.05,
            },
            "-=0.4",
          )
          .from(
            mark,
            { yPercent: 30, autoAlpha: 0, duration: 0.9, ease: "expo.out" },
            "-=0.65",
          );
      } else {
        gsap.to(curtain, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.5,
          ease: "expo.inOut",
          onComplete: () => gsap.set(curtain, { autoAlpha: 0 }),
        });
      }
    },
    { dependencies: [isOpen, motionEnabled] },
  );

  return (
    <>
      {/* Só dois elementos, como na referência: wordmark e botão. Sem borda,
          sem blur, sem barra de progresso riscando o topo. */}
      {/* items-center, não items-start: o logo e o botão têm alturas
          diferentes (40px contra 56px no mobile), então alinhar pelo topo
          deixava os centros fora de eixo. */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-10 py-6 flex items-center justify-between pointer-events-none">
        <button
          data-magnetic
          onClick={() => onNavigate("hero")}
          aria-label="Voltar ao início"
          className="pointer-events-auto text-white hover:text-cyan-400 transition-colors duration-300"
        >
          {/* Altura fixa, largura livre: o SVG tem proporção 2,97:1 e travar
              as duas dimensões o distorceria. */}
          <Wordmark className="h-10 md:h-16 w-auto" />
        </button>

        <button
          data-magnetic
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          className="pointer-events-auto w-14 h-14 rounded-full bg-cyan-400 text-black flex items-center justify-center hover:bg-cyan-300 transition-colors duration-300"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <MenuIcon className="w-5 h-5" />
          )}
        </button>
      </nav>

      <div
        ref={curtainRef}
        aria-hidden={!isOpen}
        className="fixed inset-0 z-[95] bg-base invisible opacity-0 overflow-hidden"
      >
        {/* Wordmark branco e inteiro no quadrante inferior direito. Antes
            estava cinza a 7% e sangrando para fora da tela — ilegível. */}
        <span
          data-menu-mark
          aria-hidden
          className="pointer-events-none select-none absolute bottom-0 right-4 md:right-8 text-white block"
        >
          {/* Dimensionado pela ALTURA, não pela largura: o risco real é o
              wordmark subir e encostar nos itens do menu, e limitar a altura
              o prende ao terço inferior em qualquer proporção de tela. A
              largura sai da proporção 2,97:1 sozinha. */}
          <Wordmark className="h-[min(26vh,10rem)] lg:h-[min(34vh,22rem)] w-auto" />
        </span>

        <div className="relative z-10 h-full px-6 md:px-10 pt-28 pb-8 flex flex-col justify-between overflow-y-auto">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <ul>
              {NAV_LINKS.map(({ label, section }, index) => (
                <li key={section} className="overflow-hidden">
                  <button
                    data-menu-line
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => {
                      onToggle();
                      onNavigate(section);
                    }}
                    className={`group flex items-center gap-4 py-1 w-full text-left font-light leading-[1.2] transition-colors duration-300 ${
                      activeSection === section
                        ? "text-cyan-400"
                        : "text-white hover:text-cyan-400"
                    }`}
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.6rem)" }}
                  >
                    <span className="type-label text-muted/40 tabular-nums w-6 flex-shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Seta indicando o item sob o ponteiro, como na
                        referência. Ocupa espaço fixo para o texto não pular. */}
                    <ArrowUpRight className="w-5 h-5 flex-shrink-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-8 sm:gap-12 self-start lg:pt-2">
              <div data-menu-block>
                <p className="type-label text-muted/40 mb-4">Localização</p>
                <p className="type-label text-white leading-relaxed">
                  Presidente Prudente
                  <br />
                  São Paulo
                  <br />
                  Brasil
                </p>
              </div>

              <div data-menu-block>
                <p className="type-label text-muted/40 mb-4">Redes</p>
                <div className="flex flex-col gap-2 items-start">
                  <a
                    data-magnetic
                    href="https://github.com/Vinicius-Rampazzo"
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isOpen ? 0 : -1}
                    className="type-label text-white hover:text-cyan-400 transition-colors duration-300"
                  >
                    GitHub
                  </a>
                  <a
                    data-magnetic
                    href="https://www.linkedin.com/in/vinicius-rampazzo-web-developer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isOpen ? 0 : -1}
                    className="type-label text-white hover:text-cyan-400 transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <div data-menu-block className="col-span-2">
                <p className="type-label text-muted/40 mb-4">Contato</p>
                <a
                  data-magnetic
                  href="mailto:vinicius_rampazzo@hotmail.com"
                  tabIndex={isOpen ? 0 : -1}
                  className="type-label text-white hover:text-cyan-400 transition-colors duration-300 break-all"
                >
                  vinicius_rampazzo@hotmail.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
