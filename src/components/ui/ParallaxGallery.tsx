"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionEnabled } from "@/hooks/useMediaQuery";
import type { GalleryImage } from "@/data/gallery";

type Caption = { label: string; lines: string[] };

/** Alturas das faixas. A largura de cada foto sai daqui, via `flex`. */
const BAND_A = "sm:h-[clamp(420px,72vh,760px)]";
const BAND_B = "sm:h-[clamp(340px,58vh,640px)]";

/**
 * Composição editorial em duas faixas, com revelação por máscara.
 *
 * O empacotamento automático (masonry) foi abandonado por deixar cela órfã com
 * quatro fotos; a grade de 12 colunas que veio depois resolvia o vão mas
 * dependia de margens negativas para escalonar, e uma delas acabou cobrindo a
 * legenda. Aqui a faixa tem altura fixa e as fotos são filhas flex: a largura
 * se distribui sozinha, a faixa fecha exata, e o degrau vem de altura menor
 * com ancoragem (`h-[94%] self-start`), que não tira ninguém do lugar.
 */
export function ParallaxGallery({
  images,
  caption,
}: {
  images: GalleryImage[];
  caption?: Caption;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !motionEnabled) return;

      const figures = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-figure]")
      );

      const tweens = figures.flatMap((figure, index) => {
        const speed = Number(figure.dataset.parallax ?? 1);
        const media = figure.querySelector("[data-media]");

        // Chegada: a moldura abre de baixo para cima enquanto a foto, que
        // começa ampliada e deslocada, assenta no lugar. Movimentos em
        // sentidos opostos ao mesmo tempo — é a tensão que dá peso.
        const enter = gsap
          .timeline({
            scrollTrigger: { trigger: figure, start: "top 92%", once: true },
          })
          .from(figure, {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.25,
            ease: "expo.out",
            delay: (index % 2) * 0.12,
          })
          .from(
            media,
            { scale: 1.25, yPercent: 8, duration: 1.5, ease: "expo.out" },
            "<"
          );

        // Deriva contínua enquanto a faixa atravessa a tela. A amplitude
        // maior é o que torna o desencontro entre as colunas perceptível —
        // no valor anterior o parallax existia mas não se via.
        const drift = gsap.fromTo(
          media,
          { yPercent: (speed - 1) * 24 },
          {
            yPercent: -(speed - 1) * 24,
            ease: "none",
            scrollTrigger: {
              trigger: figure,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );

        return [enter, drift];
      });

      // Saída no nível da galeria inteira, não de cada figura.
      // Ancorar em cada uma era o defeito anterior: numa foto de 1000px de
      // altura, o rodapé dela já passa do gatilho antes mesmo de ela ser
      // vista, e a imagem entrava na tela desbotada.
      const exit = gsap.to(root, {
        opacity: 0.55,
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "bottom 55%",
          end: "bottom top",
          scrub: 0.7,
        },
      });

      // Elasticidade: a galeria inclina de leve conforme a velocidade do
      // scroll e volta ao prumo quando ele para. É o que dá a sensação de
      // matéria com inércia, em vez de fotos coladas na página.
      const skewTo = gsap.quickTo(root, "skewY", {
        duration: 0.5,
        ease: "power3",
      });

      const velocity = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) =>
          skewTo(gsap.utils.clamp(-3, 3, self.getVelocity() / -700)),
      });

      // `onUpdate` não dispara com a página parada, então o retorno ao prumo
      // precisa deste gancho — senão a inclinação congela no último valor.
      const settle = () => skewTo(0);
      ScrollTrigger.addEventListener("scrollEnd", settle);

      return () => {
        ScrollTrigger.removeEventListener("scrollEnd", settle);
        velocity.kill();
        gsap.set(root, { skewY: 0 });
        [...tweens, exit].forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
      };
    },
    { dependencies: [motionEnabled], scope: rootRef }
  );

  const bandA = images.filter((image) => image.band === 1);
  const bandB = images.filter((image) => image.band === 2);

  const figure = (image: GalleryImage, index: number) => (
    <figure
      key={image.src}
      data-figure
      data-parallax={image.speed}
      data-cursor
      data-cursor-label="galeria"
      className={[
        "relative overflow-hidden bg-black/10 min-w-0",
        image.grow,
        image.step,
        // No celular a faixa some: a proporção volta a mandar na altura e as
        // larguras alternam para o empilhamento não virar uma coluna só.
        image.mobileRatio,
        "sm:aspect-auto",
        index % 2 === 1 ? "w-[88%] ml-auto sm:w-auto" : "w-full sm:w-auto",
      ].join(" ")}
    >
      {/* O bloco da foto é mais alto que a moldura: a deriva do parallax
          chega a 5% da altura, e sem essa sobra ela descolava da borda
          e deixava aparecer o fundo da moldura. */}
      <div data-media className="absolute inset-x-0 -inset-y-[10%]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 88vw, 45vw"
          quality={85}
          className="object-cover"
          style={
            image.objectPosition
              ? { objectPosition: image.objectPosition }
              : undefined
          }
        />
      </div>
    </figure>
  );

  return (
    <div ref={rootRef} className="max-w-[1500px] mx-auto">
      <div
        className={`flex flex-col gap-8 sm:flex-row sm:items-stretch sm:gap-6 ${BAND_A}`}
      >
        {figure(bandA[0], 0)}

        {caption && (
          // No celular ela cai naturalmente entre as duas fotos da faixa;
          // no desktop vira a coluna que ocupa o vão entre elas.
          <figcaption className="flex flex-col gap-3 pb-1 sm:w-[clamp(160px,18%,260px)] sm:shrink-0 sm:self-end">
            <span className="type-label text-cyan-600">{caption.label}</span>
            {caption.lines.map((line) => (
              <span
                key={line}
                className="type-label leading-relaxed"
                style={{ color: "var(--sec-muted)" }}
              >
                {line}
              </span>
            ))}
          </figcaption>
        )}

        {figure(bandA[1], 1)}
      </div>

      <div
        className={`flex flex-col gap-8 mt-8 sm:flex-row sm:items-stretch sm:gap-6 sm:mt-6 ${BAND_B}`}
      >
        {figure(bandB[0], 2)}
        {figure(bandB[1], 3)}
      </div>
    </div>
  );
}
