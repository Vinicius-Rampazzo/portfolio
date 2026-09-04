import type React from "react";

/** Cada seção recebe seu ref — usado pelo scroll-spy, pela navegação por
 *  âncora e como escopo das animações GSAP daquela seção. A revelação de
 *  entrada é responsabilidade da própria seção (useSectionReveal). */
export type SectionProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
};
