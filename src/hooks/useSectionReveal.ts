"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionEnabled } from "./useMediaQuery";

type RevealOptions = {
  /** Seletor dos filhos que entram em sequência. */
  selector?: string;
  /** Deslocamento vertical inicial, em pixels. */
  y?: number;
  /** Intervalo entre um filho e o próximo, em segundos. */
  stagger?: number;
  start?: string;
};

/**
 * Revelação padrão de uma seção ao entrar em viewport.
 *
 * O conteúdo nasce **visível** no HTML: é o GSAP que o esconde antes de
 * revelar. Isso mantém a página legível sem JavaScript, sob reduced motion e
 * caso a animação falhe — nunca há texto preso em `opacity: 0` esperando um
 * script que talvez não rode.
 */
export function useSectionReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  {
    selector = "[data-reveal]",
    y = 32,
    stagger = 0.09,
    start = "top 78%",
  }: RevealOptions = {}
) {
  const motionEnabled = useMotionEnabled();

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || !motionEnabled) return;

      const targets = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll(selector)
      );
      if (!targets.length) return;

      const tween = gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.75,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: container,
          start,
          once: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [motionEnabled], scope: containerRef }
  );
}

/** Recalcula posições depois que fontes e imagens mudam a altura do documento. */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
