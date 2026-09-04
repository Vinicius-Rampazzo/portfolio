"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useMotionEnabled } from "@/hooks/useMediaQuery";
import type { GalleryImage } from "@/data/gallery";

/**
 * Mosaico em colunas com revelação por máscara.
 *
 * Usa colunas CSS (masonry) em vez de grid posicionado à mão: com fotos de
 * proporções diferentes, qualquer composição fixa acaba deixando uma cela
 * órfã — foi o vão enorme da versão anterior. O masonry empacota as alturas
 * sozinho e nunca abre buraco.
 */
export function ParallaxGallery({ images }: { images: GalleryImage[] }) {
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
        const media = figure.querySelector("img");

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
            delay: (index % 3) * 0.08,
          })
          .from(
            media,
            { scale: 1.4, yPercent: 8, duration: 1.5, ease: "expo.out" },
            "<"
          );

        // Deriva contínua enquanto a faixa atravessa a tela.
        const drift = gsap.fromTo(
          media,
          { yPercent: (speed - 1) * 12 },
          {
            yPercent: -(speed - 1) * 12,
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

      // Saída no nível da faixa inteira, não de cada figura.
      // Ancorar em cada uma era o defeito anterior: numa foto de 1000px de
      // altura, o rodapé dela já passa do gatilho antes mesmo de ela ser
      // vista, e a imagem entrava na tela desbotada.
      const exit = gsap.to(root, {
        opacity: 0.25,
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "bottom 55%",
          end: "bottom top",
          scrub: 0.7,
        },
      });

      return () => {
        [...tweens, exit].forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
      };
    },
    { dependencies: [motionEnabled], scope: rootRef }
  );

  return (
    // O teto de largura impede que as fotos virem blocos de 1000px numa tela
    // larga, que era o que abria os vãos.
    <div
      ref={rootRef}
      className="max-w-6xl mx-auto columns-2 lg:columns-3 gap-4 md:gap-6"
    >
      {images.map((image, index) => (
        <figure
          key={image.src}
          data-figure
          data-parallax={image.speed}
          // break-inside-avoid impede o masonry de fatiar uma foto ao meio.
          className={`relative overflow-hidden bg-black/10 mb-4 md:mb-6 break-inside-avoid ${
            image.orientation === "landscape"
              ? "aspect-[4/3]"
              : "aspect-[3/4]"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 30vw"
            quality={85}
            className="object-cover"
            style={index === 0 ? { objectPosition: "center 28%" } : undefined}
          />
        </figure>
      ))}
    </div>
  );
}
