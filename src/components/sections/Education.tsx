"use client";

import Image from "next/image";
import { useColorShift, shiftVars } from "@/hooks/useColorShift";
import { useSideReveal } from "@/hooks/useSideReveal";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { CertificationsRail } from "@/components/ui/CertificationsRail";
import type { Certification } from "@/data/types";
import type { SectionProps } from "./types";

type EducationProps = SectionProps & {
  onCertificationClick: (certification: Certification) => void;
};

export function Education({ sectionRef, onCertificationClick }: EducationProps) {

  useColorShift(sectionRef);
  useSideReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      data-section="certifications"
      id="certifications"
      className="relative py-28 md:py-40 overflow-hidden"
      style={shiftVars()}
    >
      <header className="px-6 md:px-10 mb-16 md:mb-24 max-w-4xl">
        <p data-side-reveal className="type-label text-cyan-600 mb-6">
          Formação
        </p>
        <h2 data-side-reveal className="type-headline">
          Base
          <br />
          <span style={{ color: "var(--sec-muted)" }} className="font-light">
            acadêmica
          </span>
        </h2>
      </header>

      {/* Formação acadêmica em blocos tipográficos grandes */}
      {/* O px estava só no cabeçalho: sem ele aqui, o número da formação
          encostava na borda da tela. */}
      <div
        className="px-6 md:px-10 border-t mb-20 md:mb-28"
        style={{ borderColor: "var(--sec-muted)" }}
      >
        {education.map((item, index) => (
          <article
            key={item.institution}
            data-side-reveal={index % 2 === 1 ? "right" : undefined}
            className="grid gap-8 md:grid-cols-[4rem_14rem_1fr] md:gap-12 py-12 md:py-16 border-b items-start"
            style={{ borderColor: "var(--sec-muted)" }}
          >
            <span
              className="type-label tabular-nums"
              style={{ color: "var(--sec-muted)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* O logo da instituição fica numa placa branca própria: são
                marcas em cores chapadas, e sobre o creme da seção elas
                perderiam definição sem esse fundo. */}
            <div className="flex items-center justify-center bg-white rounded-sm p-6 h-28 w-full max-w-[14rem]">
              <Image
                src={item.logo}
                alt={item.institution}
                width={400}
                height={160}
                quality={90}
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <h3 className="type-title mb-3">{item.course}</h3>
              <p className="type-label text-cyan-700 mb-5">{item.institution}</p>
              <p className="type-label mb-4" style={{ color: "var(--sec-muted)" }}>
                {item.period}
              </p>
              <p className="leading-relaxed" style={{ color: "var(--sec-muted)" }}>
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <CertificationsRail
        certifications={certifications}
        onSelect={onCertificationClick}
      />
    </section>
  );
}
