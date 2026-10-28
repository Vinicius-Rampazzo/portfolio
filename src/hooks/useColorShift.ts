"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useMotionEnabled } from "./useMediaQuery";

type Theme = { bg: string; fg: string; muted: string };

export const DARK_THEME = { bg: "#080808", fg: "#ffffff", muted: "#8a8f98" };
export const LIGHT_THEME = { bg: "#f4f2ee", fg: "#0b0b0b", muted: "#5c5c5c" };

function applyTheme(section: HTMLElement, theme: Theme) {
  section.style.setProperty("--sec-bg", theme.bg);
  section.style.setProperty("--sec-fg", theme.fg);
  section.style.setProperty("--sec-muted", theme.muted);
}

/** Valores iniciais para o `style` da seção — o estado antes de qualquer scroll. */
export const shiftVars = (theme = DARK_THEME) =>
  ({
    "--sec-bg": theme.bg,
    "--sec-fg": theme.fg,
    "--sec-muted": theme.muted,
    backgroundColor: "var(--sec-bg)",
    color: "var(--sec-fg)",
  }) as React.CSSProperties;

/**
 * Vira a cor da seção durante o scroll, em vez de trocar de classe.
 *
 * As cores são misturadas à mão com `gsap.utils.interpolate` porque o GSAP
 * trata custom property como string opaca: pedir a ele para animar
 * `--sec-bg` de um hexadecimal a outro produz um salto no meio do caminho,
 * não um degradê.
 */
export function useColorShift(
  sectionRef: React.RefObject<HTMLElement | null>,
  { from = DARK_THEME, to = LIGHT_THEME } = {}
) {
  const motionEnabled = useMotionEnabled();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Sem animação, a seção assume direto a cor de destino: uma seção clara
      // precisa ser clara mesmo para quem desligou o movimento.
      if (!motionEnabled) {
        applyTheme(section, to);
        return;
      }

      // Enquanto a preferência de movimento não é lida, `motionEnabled` vale
      // false, e o ramo acima já pintou a seção com a cor de destino. O tween
      // só escreve quando o scroll alcança o gatilho: sem voltar à cor de
      // partida aqui, a seção aparecia clara e escurecia de repente bem quando
      // a transição começava.
      applyTheme(section, from);

      const mixBg = gsap.utils.interpolate(from.bg, to.bg);
      const mixFg = gsap.utils.interpolate(from.fg, to.fg);
      const mixMuted = gsap.utils.interpolate(from.muted, to.muted);
      const progress = { value: 0 };

      const tween = gsap.to(progress, {
        value: 1,
        ease: "none",
        onUpdate: () => {
          const t = progress.value;
          applyTheme(section, {
            bg: mixBg(t),
            fg: mixFg(t),
            muted: mixMuted(t),
          });
        },
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 35%",
          scrub: 0.8,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [motionEnabled], scope: sectionRef }
  );
}
