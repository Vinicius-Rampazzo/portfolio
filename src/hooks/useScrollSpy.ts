"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Descobre qual seção está sendo lida.
 *
 * Substitui o cálculo manual de `getBoundingClientRect().top <= 100`, que
 * quebra quando alguma seção é pinada: com pin, a posição do elemento na tela
 * deixa de corresponder à sua posição no documento. O ScrollTrigger conhece o
 * pin e reporta corretamente.
 */
export function useScrollSpy(
  sectionRefs: Record<string, React.RefObject<HTMLElement | null>>,
  initial: string
) {
  const [activeSection, setActiveSection] = useState(initial);

  useGSAP(() => {
    const triggers = Object.entries(sectionRefs).map(([key, ref]) =>
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 40%",
        end: "bottom 40%",
        // onToggle dispara nas duas direções, então descer e subir a página
        // acendem o mesmo item de menu.
        onToggle: (self) => {
          if (self.isActive) setActiveSection(key);
        },
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return activeSection;
}
