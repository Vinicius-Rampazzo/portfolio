"use client";

import { useState, useRef } from "react";

import { Nav, type SectionKey } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SectionCounter } from "@/components/layout/SectionCounter";
import { Intro } from "@/components/layout/Intro";

import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Projects } from "@/components/sections/Projects";
import { Awards } from "@/components/sections/Awards";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

import { CertificationModal } from "@/components/ui/CertificationModal";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import {
  useScrollLock,
  useScrollTo,
  useSmoothScroll,
} from "@/hooks/useSmoothScroll";
import { ScrollTrigger } from "@/lib/gsap";
import type { Certification } from "@/data/types";

export default function Home() {
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // A ordem das chaves espelha a ordem visual das seções — o scroll-spy e a
  // navegação por âncora dependem dela.
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    value: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    awards: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    certifications: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  useSmoothScroll();
  // O modal cobre a tela inteira; sem travar, o fundo rola por baixo dele.
  useScrollLock(selectedCertification !== null);

  const activeSection = useScrollSpy(sectionRefs, "hero");
  const scrollTo = useScrollTo();

  const scrollToSection = (section: SectionKey) =>
    scrollTo(sectionRefs[section].current);

  return (
    <div className="min-h-screen bg-base text-white overflow-x-hidden">
      {/* Depois da intro as alturas mudaram: sem este refresh os gatilhos de
          scroll ficam ancorados nas posições de antes. */}
      <Intro onFinish={() => ScrollTrigger.refresh()} />

      <SectionCounter activeSection={activeSection} />

      <Nav
        activeSection={activeSection}
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen((open) => !open)}
        onNavigate={scrollToSection}
      />

      <Hero sectionRef={sectionRefs.hero} onNavigate={scrollToSection} />
      <Pillars sectionRef={sectionRefs.value} />
      <Projects sectionRef={sectionRefs.projects} />
      <Awards sectionRef={sectionRefs.awards} />
      <About sectionRef={sectionRefs.about} />
      <Skills sectionRef={sectionRefs.skills} />
      <Experience sectionRef={sectionRefs.experience} />
      <Education
        sectionRef={sectionRefs.certifications}
        onCertificationClick={setSelectedCertification}
      />
      <Contact sectionRef={sectionRefs.contact} />

      <Footer />

      {selectedCertification && (
        <CertificationModal
          certification={selectedCertification}
          onClose={() => setSelectedCertification(null)}
        />
      )}
    </div>
  );
}
