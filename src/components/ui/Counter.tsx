"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useMotionEnabled } from "@/hooks/useMediaQuery";

/**
 * Número que sobe de zero ao entrar em tela.
 *
 * Aceita "4+", "8" ou "1º": a parte numérica é animada e o sufixo preservado.
 * O valor final já está no HTML — a animação apenas o substitui durante o
 * percurso, então sem JavaScript ou sob reduced motion o número correto
 * continua lá.
 */
export function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionEnabled = useMotionEnabled();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !motionEnabled) return;

      const match = value.match(/^(\d+)(.*)$/);
      if (!match) return;

      const target = Number(match[1]);
      const suffix = match[2] ?? "";
      const state = { current: 0 };

      const tween = gsap.to(state, {
        current: target,
        duration: 1.6,
        ease: "expo.out",
        onUpdate: () => {
          el.textContent = `${Math.round(state.current)}${suffix}`;
        },
        // Assegura o valor exato do HTML no fim, sem depender do
        // arredondamento do último quadro.
        onComplete: () => {
          el.textContent = value;
        },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [motionEnabled, value] }
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
