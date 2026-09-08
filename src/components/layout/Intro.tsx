"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useScrollLock } from "@/hooks/useSmoothScroll";
import { Wordmark } from "@/components/ui/Wordmark";

/** Tempo com o nome parado na tela, entre a última letra e a saída. */
const HOLD = 0.7;

/**
 * Cortina de abertura em três tempos: a contagem e o fio na base marcam o
 * compasso, as letras de RAMPAZZO chegam uma a uma, e a cortina sai pela
 * lateral levando tudo junto.
 *
 * A cortina é renderizada sempre — no servidor e no primeiro render do
 * cliente — porque a alternativa (decidir aqui, com sessionStorage) só
 * consegue decidir depois da hidratação, e até lá a página já apareceu por
 * baixo. Quem decide é o script síncrono do <head> (ver layout.tsx), que
 * escreve data-intro no <html> antes do primeiro paint; o CSS esconde a
 * cortina na hora quando o valor é "skip".
 *
 * Toca em toda visita, inclusive a cada F5 — é a assinatura do site, e a
 * decisão é do dono dele. Sob reduced motion nem chega a existir.
 */
export function Intro({ onFinish }: { onFinish?: () => void }) {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useScrollLock(!done);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      // Libera o scroll travado pelo CSS: daqui em diante quem manda é o
      // useScrollLock acima.
      const release = () => {
        document.documentElement.dataset.intro = "skip";
      };

      // Movimento reduzido: o CSS já deixou a cortina invisível, então só
      // resta desmontá-la e avisar o resto da página.
      if (document.documentElement.dataset.intro !== "play") {
        release();
        setDone(true);
        onFinish?.();
        return;
      }

      // A abertura recomeça a cada visita, então a página também recomeça: um
      // F5 no meio do site não pode revelar a seção de Contato quando a
      // cortina sair. O <head> já zera o scroll antes do primeiro paint; aqui
      // é a segunda garantia, depois que as alturas assentaram.
      window.scrollTo(0, 0);

      const timeline = gsap.timeline({
        onComplete: () => {
          release();
          setDone(true);
        },
      });

      // Contagem: proxy numérico escrito direto no nó. É recurso visual, não
      // medida de carregamento — o navegador já cuida disso sozinho.
      const counter = { value: 0 };

      timeline
        .to(
          counter,
          {
            value: 100,
            duration: 0.9,
            ease: "power1.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(
                  Math.round(counter.value)
                ).padStart(2, "0");
              }
            },
          },
          0
        )
        .fromTo(
          "[data-intro-line]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power1.inOut" },
          0
        )
        // As letras: `y` em unidades do viewBox, não em porcentagem — o GSAP
        // escreve a transformação no espaço do SVG, então o deslocamento fica
        // idêntico em qualquer tamanho de renderização.
        .fromTo(
          "[data-intro-word] [data-letter]",
          { opacity: 0, y: 90 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.055,
          },
          0.15
        )
        // Saída, a partir daqui é a sequência que já estava boa.
        .to(
          ["[data-intro-count]", "[data-intro-line]"],
          { autoAlpha: 0, duration: 0.4, ease: "power2.in" },
          `+=${HOLD}`
        )
        .to(
          "[data-intro-word]",
          { yPercent: -115, duration: 0.6, ease: "expo.in" },
          "<"
        )
        // A camada varre da esquerda para a direita e leva a cortina junto:
        // é a saída lateral da referência, no lugar do deslize vertical.
        .fromTo(
          "[data-intro-sweep]",
          { xPercent: -100 },
          { xPercent: 0, duration: 0.55, ease: "expo.inOut" },
          "-=0.35"
        )
        // O aviso sai quando a cortina COMEÇA a deslizar, não quando termina:
        // a entrada do Hero acontece durante a saída, e o visitante vê o nome
        // subindo atrás da cortina que se retira. Avisar só no fim revelaria
        // uma tela parada por meio segundo antes de tudo recomeçar.
        .to(
          root,
          {
            xPercent: 100,
            duration: 0.7,
            ease: "expo.inOut",
            onStart: () => onFinish?.(),
          },
          "-=0.05"
        );

      return () => timeline.kill();
    },
    { scope: rootRef }
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      data-intro-root
      className="bg-base flex items-center justify-center px-6 overflow-hidden"
      aria-hidden
    >
      <div
        data-intro-sweep
        className="absolute inset-0 bg-cyan-400 pointer-events-none"
        style={{ transform: "translateX(-100%)" }}
      />

      <p className="relative overflow-hidden">
        {/* O seletor [data-intro-word] segue sendo o alvo da timeline; só o
            conteúdo mudou de texto para vetor. */}
        <span data-intro-word className="block text-white">
          <Wordmark className="w-[min(78vw,60rem)] h-auto" />
        </span>
      </p>

      <span
        data-intro-count
        className="absolute bottom-6 left-6 md:bottom-8 md:left-10 type-label text-white/50 tabular-nums"
      >
        <span ref={countRef}>00</span>
        <span className="text-white/25"> / 100</span>
      </span>

      {/* Fio na base acompanhando a contagem. A pose inicial vai inline, como
          a da varredura: entre o HTML chegar e o GSAP carregar existe um
          intervalo, e nele o elemento precisa já estar zerado. */}
      <span
        data-intro-line
        className="absolute bottom-0 left-0 right-0 h-px bg-cyan-400 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
