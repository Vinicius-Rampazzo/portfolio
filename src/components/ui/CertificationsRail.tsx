"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Certification } from "@/data/types";

/**
 * Esteira de certificados com navegação própria.
 *
 * Antes ela só andava presa ao scroll da página: quem quisesse ver o oitavo
 * certificado tinha de rolar o site inteiro até o ponto certo. Agora é uma
 * faixa autônoma — setas, arrastar com o ponteiro, teclado e barra de
 * progresso — e o scroll da página segue seu caminho normalmente.
 *
 * A rolagem usa `scroll-snap` nativo do CSS, então o comportamento continua
 * correto sem JavaScript e com qualquer forma de entrada.
 */
export function CertificationsRail({
  certifications,
  onSelect,
}: {
  certifications: Certification[];
  onSelect: (certification: Certification) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScroll, setCanScroll] = useState({ left: false, right: true });

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setProgress(max > 0 ? rail.scrollLeft / max : 0);
    setCanScroll({
      left: rail.scrollLeft > 8,
      right: rail.scrollLeft < max - 8,
    });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    sync();
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      rail.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  /** Avança um cartão por vez, medindo o primeiro item em vez de chutar. */
  const step = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-cert-card]");
    const amount = card ? card.offsetWidth + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  // Arrastar com o ponteiro, como se pega uma pilha de cartas na mesa.
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || event.pointerType === "touch") return; // toque já é nativo
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: rail.scrollLeft,
      moved: 0,
    };
    rail.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    drag.current.moved = Math.abs(delta);
    rail.scrollLeft = drag.current.startScroll - delta;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (rail?.hasPointerCapture(event.pointerId))
      rail.releasePointerCapture(event.pointerId);
    drag.current.active = false;
  };

  return (
    <div>
      <div
        ref={railRef}
        // O snap mantém o cartão enquadrado seja qual for a forma de navegar.
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-6 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {certifications.map((certification) => (
          <button
            key={certification.id}
            data-cert-card
            data-magnetic
            onClick={() => {
              // Um arrasto que termina sobre um cartão não deve abrir o modal.
              if (drag.current.moved > 6) return;
              onSelect(certification);
            }}
            className="group shrink-0 w-[78vw] sm:w-[44vw] lg:w-[27vw] xl:w-[22vw] snap-start text-left"
          >
            <div className="relative overflow-hidden rounded-sm bg-black/5 aspect-[16/11] mb-4">
              <Image
                src={certification.image}
                alt={certification.title}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 25vw"
                quality={88}
                className={`transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                  certification.padded
                    ? "object-contain bg-[#dce4ec] p-3"
                    : "object-cover"
                }`}
                draggable={false}
              />
            </div>
            <h4 className="font-semibold leading-snug mb-1">
              {certification.title}
            </h4>
            <p className="type-label" style={{ color: "var(--sec-muted)" }}>
              {certification.organization} · {certification.date}
            </p>
          </button>
        ))}
      </div>

      <div className="px-6 md:px-10 flex items-center gap-6 mt-2">
        <div className="flex gap-3">
          {([
            ["Anterior", -1, ArrowLeft, canScroll.left],
            ["Próximo", 1, ArrowRight, canScroll.right],
          ] as const).map(([label, direction, Icon, enabled]) => (
            <button
              key={label}
              data-magnetic
              onClick={() => step(direction)}
              disabled={!enabled}
              aria-label={label}
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed hover:border-cyan-700 hover:text-cyan-700"
              style={{ borderColor: "var(--sec-muted)" }}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Barra de progresso: mostra quanto da esteira ainda há pela frente,
            informação que setas sozinhas não dão. */}
        <div
          className="flex-1 h-px relative"
          style={{ backgroundColor: "var(--sec-muted)", opacity: 0.3 }}
          aria-hidden
        >
          <div
            className="absolute inset-y-0 left-0 bg-cyan-700 transition-[width] duration-200"
            style={{ width: `${Math.max(progress * 100, 4)}%` }}
          />
        </div>

        <span
          className="type-label tabular-nums"
          style={{ color: "var(--sec-muted)" }}
        >
          {certifications.length} certificados
        </span>
      </div>
    </div>
  );
}
