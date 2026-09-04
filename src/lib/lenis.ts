import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let instance: Lenis | null = null;
let rafCallback: ((time: number) => void) | null = null;

/**
 * Instância única do Lenis, casada com o relógio do GSAP.
 *
 * A ponte é o que separa "scroll suave" de "scroll suave com as animações
 * meio quadro atrasadas": o Lenis passa a ser dirigido pelo ticker do GSAP
 * em vez de manter o próprio `requestAnimationFrame`, e o ScrollTrigger
 * recalcula a cada passo do Lenis, não a cada evento de scroll nativo.
 *
 * `lagSmoothing(0)` desliga a compensação de quadros perdidos do GSAP — com
 * ela ligada, um travamento momentâneo faz o scroll dar um salto visível.
 */
export function initSmoothScroll(): Lenis {
  if (instance) return instance;

  instance = new Lenis({
    duration: 1.05,
    // Desaceleração longa: é ela que dá a sensação de peso.
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Toque segue nativo: impor inércia própria no celular briga com o
    // comportamento do sistema e piora a sensação em vez de melhorar.
    syncTouch: false,
  });

  instance.on("scroll", ScrollTrigger.update);

  rafCallback = (time: number) => instance?.raf(time * 1000);
  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);

  return instance;
}

export function destroySmoothScroll() {
  if (rafCallback) {
    gsap.ticker.remove(rafCallback);
    rafCallback = null;
  }
  gsap.ticker.lagSmoothing(500, 33);
  instance?.destroy();
  instance = null;
}

export function getSmoothScroll(): Lenis | null {
  return instance;
}
