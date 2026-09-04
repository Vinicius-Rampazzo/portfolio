"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useMotionEnabled } from "@/hooks/useMediaQuery";
import { useScrollLock } from "@/hooks/useSmoothScroll";
import { Wordmark } from "@/components/ui/Wordmark";

const SEEN_KEY = "vr:intro-seen";

/**
 * Cortina de abertura: o nome entra por máscara e uma camada varre a tela
 * pela lateral para encerrar, como na referência.
 *
 * Só na primeira visita da sessão — uma abertura que se repete a cada
 * navegação vira pedágio. Sob reduced motion nem chega a existir.
 */
export function Intro({ onFinish }: { onFinish?: () => void }) {
  const motionEnabled = useMotionEnabled();

  // Decisão preguiçosa e só no cliente: sessionStorage não existe no
  // servidor, e ler no corpo do componente quebraria a hidratação.
  const [shouldPlay] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(SEEN_KEY) === null;
    } catch {
      return false;
    }
  });

  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const active = shouldPlay && motionEnabled && !done;
  useScrollLock(active);

  useGSAP(
    () => {
      if (!active || !rootRef.current) return;

      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* modo privado: a intro simplesmente volta a tocar na próxima visita */
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          setDone(true);
          onFinish?.();
        },
      });

      timeline
        .from("[data-intro-word]", {
          yPercent: 115,
          duration: 0.95,
          ease: "expo.out",
        })
        .to("[data-intro-word]", {
          yPercent: -115,
          duration: 0.6,
          ease: "expo.in",
          delay: 0.35,
        })
        // A camada varre da esquerda para a direita e leva a cortina junto:
        // é a saída lateral da referência, no lugar do deslize vertical.
        .fromTo(
          "[data-intro-sweep]",
          { xPercent: -100 },
          { xPercent: 0, duration: 0.55, ease: "expo.inOut" },
          "-=0.35"
        )
        .to(
          rootRef.current,
          { xPercent: 100, duration: 0.7, ease: "expo.inOut" },
          "-=0.05"
        );

      return () => timeline.kill();
    },
    { dependencies: [active], scope: rootRef }
  );

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300] bg-base flex items-center justify-center px-6 overflow-hidden"
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
    </div>
  );
}
