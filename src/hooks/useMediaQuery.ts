"use client";

import { useEffect, useState } from "react";

/**
 * Assina uma media query e reage a mudanças em tempo real.
 *
 * Começa sempre em `false` para que servidor e primeiro render do cliente
 * concordem — a hidratação quebraria se o valor inicial dependesse de window.
 * O valor real chega no efeito, logo após a montagem.
 */
export function useMediaQuery(query: string): boolean {
  return useMediaQueryState(query).matches;
}

/**
 * Igual ao anterior, mas informa também se a consulta já foi lida.
 *
 * Isso importa para animação: antes de `resolved`, `matches` é apenas o
 * palpite seguro para hidratação (`false`), não a preferência real. Uma
 * animação que dispare nesse intervalo daria justamente o lampejo de
 * movimento que quem ativou "reduzir movimento" pediu para não ver.
 */
export function useMediaQueryState(query: string): {
  matches: boolean;
  resolved: boolean;
} {
  const [state, setState] = useState({ matches: false, resolved: false });

  useEffect(() => {
    const mql = window.matchMedia(query);
    setState({ matches: mql.matches, resolved: true });

    const onChange = (event: MediaQueryListEvent) =>
      setState({ matches: event.matches, resolved: true });
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return state;
}

/**
 * Portão único para as animações JavaScript: só libera depois de saber a
 * preferência real do visitante, e só quando ela permite movimento.
 */
export function useMotionEnabled(): boolean {
  const { matches, resolved } = useMediaQueryState(
    "(prefers-reduced-motion: reduce)"
  );
  return resolved && !matches;
}

/**
 * `true` quando o visitante pediu menos movimento no sistema operacional.
 * Toda animação do site precisa consultar isto e ir direto ao estado final.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Portão das cenas 3D. Exige tela larga E ponteiro preciso: tablets grandes
 * com toque ficam de fora, que é o correto tanto para carga quanto para
 * interações que dependem de hover.
 */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px) and (pointer: fine)");
}

/**
 * Cenas 3D só montam quando o aparelho aguenta e o visitante não pediu
 * para reduzir movimento.
 */
export function useCanRender3D(): boolean {
  const isDesktop = useIsDesktop();
  const motionEnabled = useMotionEnabled();
  return isDesktop && motionEnabled;
}
