"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionEnabled } from "@/hooks/useMediaQuery";

/**
 * Faixa de texto correndo em loop, com a velocidade modulada pelo scroll.
 *
 * O conteúdo é duplicado e a trilha anda exatamente a largura de uma cópia
 * antes de voltar a zero — daí o loop parecer infinito sem emenda visível.
 *
 * A animação **pausa fora da viewport**: um loop infinito de repaint em seis
 * faixas simultâneas queima bateria animando o que ninguém está vendo.
 */
export function Marquee({
  items,
  direction = "left",
  speed = 26,
  className = "",
  itemClassName = "",
}: {
  items: string[];
  direction?: "left" | "right";
  /** Segundos para percorrer uma cópia completa. Maior = mais lento. */
  speed?: number;
  className?: string;
  itemClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || !motionEnabled) return;

      const half = track.scrollWidth / 2;
      if (half <= 0) return;

      const sign = direction === "left" ? -1 : 1;
      gsap.set(track, { x: direction === "left" ? 0 : -half });

      const loop = gsap.to(track, {
        x: `+=${sign * half}`,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          // Traz o deslocamento de volta ao intervalo de uma cópia, o que
          // torna o retorno ao início imperceptível.
          x: (value) => `${(parseFloat(value) % half) - (sign < 0 ? 0 : half)}px`,
        },
      });

      const visibility = ScrollTrigger.create({
        trigger: track,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
      });

      // O scroll acelera a faixa e inverte a direção quando se sobe a página.
      const boost = ScrollTrigger.create({
        trigger: track,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          gsap.to(loop, {
            timeScale: gsap.utils.clamp(-4, 4, 1 + velocity / 900),
            duration: 0.4,
            overwrite: true,
          });
        },
      });

      return () => {
        visibility.kill();
        boost.kill();
        loop.kill();
      };
    },
    { dependencies: [motionEnabled, direction, speed] }
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {/* Duas cópias: a segunda é decorativa e não deve ser lida em voz alta. */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className={`flex items-center whitespace-nowrap ${itemClassName}`}
              >
                {item}
                <span
                  aria-hidden
                  className="mx-6 md:mx-10 text-cyan-400/50 text-[0.4em] align-middle"
                >
                  ●
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
