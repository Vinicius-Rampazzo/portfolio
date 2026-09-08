"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery, useMotionEnabled } from "@/hooks/useMediaQuery";
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

/**
 * Onde o loop do vídeo começa, em segundos.
 *
 * Os primeiros ~13s do arquivo são quadros praticamente brancos — medindo a
 * cor média do quadro dá 255,255,255 aos 3s e ainda 234 aos 12s. Começar do
 * zero fazia o menu abrir com um retângulo branco vazio. Ponha 0 aqui para
 * tocar o arquivo inteiro.
 */
const LOOP_START = 14;

type NavProps = {
  activeSection: string;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (section: SectionKey) => void;
};

export function Nav({ activeSection, isOpen, onToggle, onNavigate }: NavProps) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const motionEnabled = useMotionEnabled();

  // O painel só existe onde cabe. Abaixo da lista de nove itens sobram, numa
  // tela de 768px de altura, uns 70px — vídeo nenhum vive nisso, e forçá-lo
  // ali só fazia o menu ganhar barra de rolagem. Largura mínima porque no
  // celular ele já não entra de qualquer forma.
  const showVideo = useMediaQuery("(min-width: 1024px) and (min-height: 880px)");

  useScrollLock(isOpen);

  // O vídeo vive dentro da cortina, que fica em `invisible` enquanto o menu
  // está fechado — e elemento em subárvore invisível não é renderizado, então
  // `autoPlay` simplesmente congela no primeiro quadro. Daí o play ser
  // imperativo, disparado na abertura, quando a cortina já está visível.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // O arquivo tem faixa de áudio, e o menu é decoração: som nunca.
    // O atributo `muted` do JSX nem sempre chega à propriedade do elemento —
    // é uma pega antiga do React —, então o silêncio é garantido aqui.
    video.muted = true;
    video.volume = 0;

    // Volta para o início do trecho útil, não para o zero do arquivo.
    const rebobinar = () => {
      video.currentTime = LOOP_START;
    };

    const tocar = () => {
      if (video.currentTime < LOOP_START) rebobinar();
      // A promise rejeita se o navegador recusar (aba em segundo plano, por
      // exemplo). Sem o catch, isso vira erro não tratado no console.
      video.play().catch(() => {});
    };

    // O `loop` nativo levaria de volta ao segundo zero, ou seja, ao branco.
    const aoTerminar = () => {
      rebobinar();
      video.play().catch(() => {});
    };
    video.addEventListener("ended", aoTerminar);

    if (isOpen && motionEnabled) {
      // Com `preload="metadata"` o arquivo pode ainda não ter duração na
      // primeira abertura, e aí um `currentTime =` não gruda.
      if (video.readyState >= 1) tocar();
      else video.addEventListener("loadedmetadata", tocar, { once: true });
    } else {
      video.pause();
      if (video.readyState >= 1) rebobinar();
    }

    return () => {
      video.removeEventListener("ended", aoTerminar);
      video.removeEventListener("loadedmetadata", tocar);
    };
  }, [isOpen, motionEnabled]);

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

        {/* Duas barras desenhadas à mão, não ícones prontos: só assim elas
            podem girar uma sobre a outra para virar o X, e cada uma ser
            trocada por uma cópia que entra pela esquerda no hover. */}
        <button
          data-magnetic
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          className="group pointer-events-auto relative w-14 h-14 rounded-full"
        >
          {/* O botão cresce PARA ALÉM da bola do cursor (84px): se ficasse nos
              56px, a bola cobriria o disco inteiro e ninguém veria o hover.
              Assim sobra um anel visível em volta dela, e é nele que a cor
              inverte — o cyan se expande e o branco entra logo atrás. */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-cyan-400 transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.85]"
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-white scale-0 transition-transform duration-[600ms] delay-[80ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.85]"
          />

          {[0, 1].map((bar) => {
            const aberto = isOpen
              ? bar === 0
                ? "-translate-y-1/2 rotate-45 w-6"
                : "-translate-y-1/2 -rotate-45 w-6"
              : bar === 0
                ? "-translate-y-[calc(50%+4px)] w-6"
                : "-translate-y-[calc(50%-4px)] w-4 group-hover:w-6";

            return (
              <span
                key={bar}
                aria-hidden
                className={`absolute left-1/2 top-1/2 z-10 h-[2px] -translate-x-1/2 overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] ${aberto}`}
              >
                {/* A barra sai pela direita e a cópia entra pela esquerda —
                    a troca é o que dá o gesto no hover, em vez de só mudar
                    de cor. A segunda barra sai um instante depois da
                    primeira, senão as duas parecem uma peça só. */}
                <span
                  className={`absolute inset-0 bg-black transition-transform duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-full ${
                    bar === 1 ? "delay-[70ms]" : ""
                  }`}
                />
                <span
                  className={`absolute inset-0 bg-black -translate-x-full transition-transform duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 ${
                    bar === 1 ? "delay-[140ms]" : "delay-[70ms]"
                  }`}
                />
              </span>
            );
          })}
        </button>
      </nav>

      <div
        ref={curtainRef}
        aria-hidden={!isOpen}
        className="fixed inset-0 z-[95] bg-base invisible opacity-0 overflow-hidden"
      >
        {/* Wordmark branco e inteiro no quadrante inferior direito. Fica à
            direita, e não à esquerda, porque a coluna da esquerda é a lista de
            links: com nove itens ela desce até perto do rodapé e o wordmark
            passava por cima de "Formação" e "Contato". Aqui o único vizinho é
            o painel do vídeo, que é opaco e se sobrepõe como camada. */}
        <span
          data-menu-mark
          aria-hidden
          className="pointer-events-none select-none absolute bottom-0 right-4 md:right-8 text-white block"
        >
          {/* Dimensionado sempre pela LARGURA, nunca pela altura: é o que
              mantém o wordmark dentro da tela no celular (26vh de altura num
              iPhone davam 475px de largura numa tela de 390px, e o "R" ficava
              cortado) e, no desktop, o prende à metade direita — longe do
              painel de vídeo, que agora ocupa a base da coluna esquerda. */}
          <Wordmark className="w-[calc(100vw-2rem)] h-auto md:w-[min(60vw,32rem)] lg:w-[min(46vw,900px)]" />
        </span>

        {/* O respiro embaixo no celular existe para o último bloco não parar
            debaixo do wordmark, que é posicionado sobre o rodapé da tela. */}
        <div className="relative z-10 h-full px-6 md:px-10 pt-28 pb-40 md:pb-8 lg:pb-4 flex flex-col justify-between overflow-y-auto">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
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

            {/* Painel de vídeo abaixo da lista.
                Quem manda é a ALTURA — o que sobra da janela abaixo dos links —,
                e a largura sai da proporção 16:9. Antes era o contrário, largura
                cheia da coluna com recorte, e o painel virava uma faixa larga
                demais. O teto de 230px de altura dá 409px de largura, abaixo dos
                640px nativos do arquivo, então a imagem não borra. */}
            {showVideo && (
              // O recuo tira o painel do prumo exato da lista: alinhado na
              // mesma vertical dos links ele lia como continuação da coluna,
              // e não como peça própria.
              <div data-menu-block className="mt-6 ml-[12%]">
                <a
                  data-cursor
                  data-cursor-label="clique"
                  href="https://www.youtube.com/watch?v=e9dZQelULDk"
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isOpen ? 0 : -1}
                  aria-label="Assistir ao vídeo no YouTube"
                  className="block w-fit"
                >
                  <video
                    ref={videoRef}
                    src="/video/corridadosratos.mp4"
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden
                    className="h-[clamp(180px,calc(100vh-42.5rem),300px)] w-auto aspect-video object-cover rounded-2xl border border-white/10"
                  />
                </a>
              </div>
            )}
            </div>

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
                  href="mailto:vinicius_rampazzo10@hotmail.com"
                  tabIndex={isOpen ? 0 : -1}
                  className="type-label text-white hover:text-cyan-400 transition-colors duration-300 break-all"
                >
                  vinicius_rampazzo10@hotmail.com
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
