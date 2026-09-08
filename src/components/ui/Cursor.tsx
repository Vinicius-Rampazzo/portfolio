"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery, useMotionEnabled } from "@/hooks/useMediaQuery";

/**
 * Alvo único: hoje só o vídeo do menu carrega `data-cursor`.
 *
 * Já foi mais amplo — títulos, fotos, cards e todo `[data-magnetic]` — e uma
 * bola de 84px aparecendo em cada link tomava conta da navegação inteira. O
 * cursor do site voltou a ser o par de setas em SVG do `globals.css`; a bola
 * ficou reservada ao vídeo, onde ela tem o que dizer.
 */
const TARGETS = "[data-cursor]";

/** Diâmetro da bola. */
const SIZE = 84;

/**
 * Bola que aparece ao entrar no alvo, como na referência.
 *
 * Fora dele não existe nada seguindo o ponteiro: ela nasce do centro no
 * `mouseover` e volta a zero no `mouseout`.
 *
 * A escuta é delegada no documento em vez de presa ao elemento: o vídeo vive
 * dentro do menu, que só monta depois, e um `addEventListener` direto perderia
 * justamente esse caso.
 */
export function Cursor() {
  const ballRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Sem ponteiro preciso não há hover, e com movimento reduzido um objeto
  // perseguindo o mouse é exatamente o que o visitante pediu para não ver.
  const finePointer = useMediaQuery("(pointer: fine)");
  const motionEnabled = useMotionEnabled();
  const enabled = finePointer && motionEnabled;

  useEffect(() => {
    const ball = ballRef.current;
    const label = labelRef.current;
    if (!enabled || !ball || !label) return;

    // Só agora o CSS pode esconder o cursor do sistema nos alvos: se a bola
    // não existe, esconder o ponteiro deixaria o elemento sem cursor nenhum.
    document.documentElement.dataset.cursorActive = "";

    gsap.set(ball, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });

    // O seguimento é rápido, mas não instantâneo: o pequeno atraso é o que
    // dá peso ao objeto. Enquanto está fora de um alvo a bola continua sendo
    // posicionada — só não é vista —, então ela nunca cresce vinda do lugar
    // errado.
    const xTo = gsap.quickTo(ball, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(ball, "y", { duration: 0.3, ease: "power3" });

    let entrada: gsap.core.Timeline | null = null;
    let visivel = false;

    const mostrar = (target: Element, x: number, y: number) => {
      visivel = true;
      label.textContent = target.getAttribute("data-cursor-label") ?? "";

      // Salto para a posição do ponteiro antes de crescer: sem isto a bola
      // nasceria no último ponto conhecido e viajaria até aqui já visível.
      gsap.set(ball, { x, y });

      entrada?.kill();
      entrada = gsap
        .timeline()
        .to(ball, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.55,
          ease: "expo.out",
          overwrite: "auto",
        })
        .fromTo(
          label,
          { yPercent: 60, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: "expo.out" },
          0.08
        );
    };

    const esconder = () => {
      if (!visivel) return;
      visivel = false;

      // Matar a entrada é o ponto todo: ela dura 0,55s e, ao sair do alvo
      // antes disso, continuava correndo por cima da saída e devolvia a bola
      // ao estado visível — era esse o cursor que ficava preso na tela.
      entrada?.kill();
      entrada = null;

      gsap.to(ball, {
        scale: 0,
        autoAlpha: 0,
        duration: 0.32,
        ease: "power3.in",
        overwrite: "auto",
      });
    };

    const alvoDe = (node: EventTarget | null) =>
      (node as Element | null)?.closest?.(TARGETS) ?? null;

    const onMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);

      // Rede de segurança: se a bola está visível mas o que está sob o
      // ponteiro não é mais um alvo — porque o `mouseout` se perdeu, ou
      // porque o elemento sumiu junto com o menu —, ela some aqui.
      if (visivel && !alvoDe(event.target)?.isConnected) esconder();
    };

    const onOver = (event: PointerEvent) => {
      const target = alvoDe(event.target);
      if (target) mostrar(target, event.clientX, event.clientY);
    };

    const onOut = (event: PointerEvent) => {
      const target = alvoDe(event.target);
      if (!target) return;

      // Trocar de filho dentro do mesmo alvo dispara `mouseout`; sem esta
      // guarda a bola piscaria ao atravessar o conteúdo de dentro dele.
      if (alvoDe(event.relatedTarget) === target) return;

      esconder();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver as EventListener);
    document.addEventListener("mouseout", onOut as EventListener);
    // O ponteiro saindo pela borda da janela não gera `mouseout` no alvo.
    document.addEventListener("mouseleave", esconder);
    window.addEventListener("blur", esconder);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver as EventListener);
      document.removeEventListener("mouseout", onOut as EventListener);
      document.removeEventListener("mouseleave", esconder);
      window.removeEventListener("blur", esconder);
      entrada?.kill();
      gsap.killTweensOf([ball, label]);
      delete document.documentElement.dataset.cursorActive;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ballRef}
      aria-hidden
      className="fixed top-0 left-0 z-[400] pointer-events-none rounded-full bg-cyan-400 text-black flex items-center justify-center overflow-hidden"
      style={{ width: SIZE, height: SIZE }}
    >
      <span ref={labelRef} className="type-label text-[0.625rem] block" />
    </div>
  );
}
