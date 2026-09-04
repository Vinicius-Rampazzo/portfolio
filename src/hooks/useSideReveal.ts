"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useMotionEnabled } from "./useMediaQuery";

/**
 * Revelação lateral: os elementos entram deslizando da margem, não de baixo.
 *
 * `data-side-reveal="right"` inverte a direção. O deslocamento é em `vw`,
 * então a distância percorrida acompanha a largura da tela.
 *
 * No mobile o percurso lateral é bem menor: em telas estreitas um elemento
 * vindo de fora da margem gera scroll horizontal e sensação de defeito.
 */
export function useSideReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  { selector = "[data-side-reveal]", stagger = 0.08 } = {}
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

      const media = gsap.matchMedia();

      media.add(
        { desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean };
          const distance = desktop ? 14 : 6;

          const tweens = targets.map((el, i) =>
            gsap.from(el, {
              xPercent: el.dataset.sideReveal === "right" ? distance * 4 : -distance * 4,
              opacity: 0,
              duration: 1,
              ease: "expo.out",
              delay: i * stagger,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            })
          );

          return () =>
            tweens.forEach((t) => {
              t.scrollTrigger?.kill();
              t.kill();
            });
        }
      );

      return () => media.revert();
    },
    { dependencies: [motionEnabled], scope: containerRef }
  );
}
