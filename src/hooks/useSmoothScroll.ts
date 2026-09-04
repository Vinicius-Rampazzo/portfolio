"use client";

import { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import {
  destroySmoothScroll,
  getSmoothScroll,
  initSmoothScroll,
} from "@/lib/lenis";
import { useMotionEnabled } from "./useMediaQuery";

/**
 * Liga o scroll suave enquanto o visitante aceitar movimento.
 *
 * Sob `prefers-reduced-motion` o Lenis simplesmente não é instanciado — o
 * scroll nativo é o comportamento correto e esperado, não um fallback pobre.
 */
export function useSmoothScroll() {
  const motionEnabled = useMotionEnabled();

  useEffect(() => {
    if (!motionEnabled) return;

    initSmoothScroll();
    // As alturas mudam depois que fontes e imagens assentam; sem isto os
    // gatilhos de scroll ficam ancorados em posições desatualizadas.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      destroySmoothScroll();
    };
  }, [motionEnabled]);
}

/** Trava o scroll (intro, modal) sem que o fundo role por baixo. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    const lenis = getSmoothScroll();
    if (locked) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      getSmoothScroll()?.start();
      document.body.style.overflow = "";
    };
  }, [locked]);
}

/**
 * Navegação por âncora. Precisa passar pelo Lenis: `scrollIntoView` nativo
 * disputa o controle da posição com ele e o resultado é um solavanco.
 */
export function useScrollTo() {
  return useCallback((target: HTMLElement | null) => {
    if (!target) return;
    const lenis = getSmoothScroll();

    if (!lenis) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Um quadro de espera para o React aplicar o fechamento do menu antes do
    // salto: navegar com a cortina ainda aberta faria o fundo rolar por baixo
    // dela. É também o que dá tempo do useScrollLock reativar o Lenis.
    requestAnimationFrame(() => {
      // `start()` porque abrir o menu chamou `stop()`, e um Lenis parado
      // descarta scrollTo em silêncio — era exatamente por isso que o menu
      // não navegava. `force` cobre o caso do lock ainda não ter sido solto.
      lenis.start();

      // As seções pinadas (Projetos, Skills, Experiência) deslocam a posição
      // real dos elementos; sem recalcular, a âncora erra o alvo. O refresh
      // pode ele próprio ajustar o scroll, então o salto espera o quadro
      // seguinte para ler uma posição já estabilizada.
      ScrollTrigger.refresh();

      requestAnimationFrame(() => {
        lenis.scrollTo(target, { offset: 0, duration: 1.2, force: true });
      });
    });
  }, []);
}

/** `true` depois que o componente montou no cliente. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
