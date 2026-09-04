"use client";

import { NAV_LINKS } from "./Nav";
import { useMotionEnabled } from "@/hooks/useMediaQuery";

/**
 * Contador fixo no canto (01 / 09), como o das referências.
 *
 * É a única pista permanente de onde o visitante está numa página sem barra
 * de navegação visível — o menu virou cortina, então algo precisa ancorar.
 */
export function SectionCounter({ activeSection }: { activeSection: string }) {
  const motionEnabled = useMotionEnabled();
  const index = NAV_LINKS.findIndex((link) => link.section === activeSection);
  if (index < 0) return null;

  return (
    <div
      aria-hidden
      className="fixed left-6 md:left-10 bottom-6 z-[70] pointer-events-none hidden sm:flex items-baseline gap-2 mix-blend-difference"
    >
      <span
        className="type-label text-white tabular-nums"
        style={{
          transition: motionEnabled ? "opacity .3s ease" : undefined,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="type-label text-white/40">
        / {String(NAV_LINKS.length).padStart(2, "0")}
      </span>
    </div>
  );
}
