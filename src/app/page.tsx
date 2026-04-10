"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  MapPin,
  Award,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Code2,
  ArrowRight,
  Trophy,
  Building2,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  demo: string;
  github: string;
  award?: string;
};

type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
};

type Certification = {
  id: number;
  title: string;
  image: string;
  organization: string;
  date: string;
  padded?: boolean;
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    value: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    certifications: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);

    // Rastreia seção ativa pelo scroll
    const handleScroll = () => {
      const entries = Object.entries(sectionRefs) as [
        string,
        React.RefObject<HTMLElement | null>
      ][];
      let current = "hero";
      for (const [key, ref] of entries) {
        if (
          ref.current &&
          ref.current.getBoundingClientRect().top <= 100
        ) {
          current = key;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.getAttribute("data-section");
          if (entry.isIntersecting && section) {
            setVisibleSections((prev) => ({ ...prev, [section]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    const currentRefs = Object.values(sectionRefs);
    currentRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Data ────────────────────────────────────────────────────────────────────
  const skillGroups = [
    {
      label: "Frontend",
      headerClass:
        "bg-cyan-400/[0.08] text-cyan-400 border border-cyan-400/20",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "HTML & CSS",
        "Tailwind CSS",
      ],
    },
    {
      label: "Backend",
      headerClass:
        "bg-blue-500/[0.08] text-blue-400 border border-blue-500/20",
      items: [
        "Node.js",
        "Python",
        "SQL",
        "REST APIs",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    {
      label: "Segurança",
      headerClass:
        "bg-purple-500/[0.08] text-purple-400 border border-purple-500/20",
      items: [
        "Análise de Vulnerabilidades",
        "Nmap",
        "SIEM",
        "Ethical Hacking",
        "Gestão de Riscos",
        "Forensics",
      ],
    },
    {
      label: "Ferramentas",
      headerClass:
        "bg-emerald-500/[0.08] text-emerald-400 border border-emerald-500/20",
      items: ["Git & GitHub", "Docker", "Linux", "Vercel", "CloudFlare", "PaaS (Platform as a Service)"],
    },
  ];

  const projects: Project[] = [
    {
      title: "ImobiBotBrasil",
      description:
        "IA integrada com chatbot e filtro inteligente que facilita a busca por imóveis via conversas naturais. Projeto vencedor do Hackathon ImobiBrasil 2025.",
      tech: ["Python", "JavaScript", "HTML", "CSS"],
      image: "/images/imobibotbrasil.png",
      demo: "https://github.com/Vinicius-Rampazzo/ImobiBotBrasil",
      github: "https://github.com/Vinicius-Rampazzo/ImobiBotBrasil",
      award: "1º Lugar Hackathon 2025",
    },
    {
      title: "Tech Informe",
      description:
        "Blog colaborativo para compartilhar conhecimento técnico. Múltiplos autores podem hospedar e publicar artigos sobre tecnologia de forma organizada.",
      tech: ["Blog", "Artigos", "Tecnologia"],
      image: "/images/techinforme.png",
      demo: "https://techinforme.com.br/",
      github: "https://techinforme.com.br/",
    },
    {
      title: "Pixel Art",
      description:
        "Primeiro projeto desenvolvido na Trybe — onde tudo começou. HTML, CSS e JavaScript aplicados numa interface interativa de pixel art.",
      tech: ["JavaScript", "CSS", "HTML"],
      image: "/images/pixelart.png",
      demo: "https://pixel-art-blush.vercel.app/",
      github: "https://github.com/Vinicius-Rampazzo/pixel-art",
    },
  ];

  const experiences: Experience[] = [
    {
      company: "ImobiBrasil",
      role: "Analista Nível 4",
      period: "Atualmente",
      description:
        "Líder do setor de hospedagem num dos maiores CRMs imobiliários do Brasil. Arquiteto soluções escaláveis, automações críticas e garanto continuidade de serviços para múltiplos clientes em ambiente de alta demanda.",
    },
    {
      company: "FIAP",
      role: "Defesa Cibernética",
      period: "Formado em 2025",
      description:
        "Formação intensiva com Challenges práticos e base sólida em Ethical Hacking. Vice-campeão do CTF no Next Brasil 2025, uma competição nacional de cibersegurança de alto nível, após seleção por projeto acadêmico.",
    },
    {
      company: "Guardiões Segurança Eletrônica",
      role: "Analista de Rede",
      period: "2023",
      description:
        "Proteção de dados, gestão de redes e segurança corporativa. Trabalho direto com infraestrutura e integridade dos dados da empresa, em equipe.",
    },
    {
      company: "Trybe",
      role: "Desenvolvedor FullStack",
      period: "Formado em 2022",
      description:
        "Jornada prática e intensa de projetos que solidificaram a base full stack, do HTML ao Node.js, do banco de dados ao deploy em produção.",
    },
  ];

  const certifications: Certification[] = [
    {
      id: 1,
      title: "Fundamentos do Desenvolvimento Web",
      image: "/images/cert-fundamentos.png",
      organization: "Trybe",
      date: "2021",
    },
    {
      id: 2,
      title: "Desenvolvimento Front-End",
      image: "/images/cert-frontend.png",
      organization: "Trybe",
      date: "2022",
    },
    {
      id: 3,
      title: "Desenvolvimento Back-End",
      image: "/images/cert-backend.png",
      organization: "Trybe",
      date: "2022",
    },
    {
      id: 4,
      title: "Ciência da Computação",
      image: "/images/cert-comp.png",
      organization: "Trybe",
      date: "2023",
    },
    {
      id: 5,
      title: "Gestão de Segurança da Informação",
      image: "/images/cert-gestao-risco.png",
      organization: "Fiap",
      date: "2024",
    },
    {
      id: 6,
      title: "Profissional em Cibersegurança",
      image: "/images/cert-pro-ciber.png",
      organization: "Fiap",
      date: "2024",
    },
    {
      id: 7,
      title: "Information Security Officer",
      image: "/images/cert-info-security.png",
      organization: "Fiap",
      date: "2024",
    },
    {
      id: 8,
      title: "Profissional em Forensics",
      image: "/images/cert-pro-forensics.png",
      organization: "Fiap",
      date: "2025",
      padded: true,
    },
  ];

  // ─── Scroll helpers ────────────────────────────────────────────────────────
  const scrollTo = (ref: React.RefObject<HTMLElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // ─── Value Prop Data ───────────────────────────────────────────────────────
  const valueCards = [
    {
      icon: <Code2 className="w-6 h-6 text-cyan-400" />,
      iconBg: "bg-cyan-400/10",
      border: "border-white/[0.06] hover:border-cyan-400/30",
      title: "Desenvolvimento",
      description:
        "Node.js, React, Next.js e Python em produção real. Integração de sistemas, APIs REST, banco de dados. Código que aguenta carga, não só demos.",
      items: [
        "Next.js & React",
        "Node.js & Python",
        "APIs & Integrações",
        "Performance em Produção - TRYBE",
      ],
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      iconBg: "bg-blue-500/10",
      border: "border-white/[0.06] hover:border-blue-500/30",
      title: "Segurança",
      description:
        "Análise de vulnerabilidades, gestão de riscos, Nmap e SIEM. Formado em Defesa Cibernética pela FIAP, com base prática em Ethical Hacking.",
      items: [
        "Análise de Vulnerabilidades",
        "Forensics",
        "Gestão de Riscos",
        "Ethical Hacking — FIAP",
      ],
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      iconBg: "bg-yellow-400/10",
      border: "border-white/[0.06] hover:border-yellow-500/30",
      title: "Ambiente Real",
      description:
        "Liderança técnica em ambiente corporativo de alta demanda. Resolução de incidentes críticos e garantia de continuidade para múltiplos clientes.",
      items: [
        "Liderança Técnica",
        "Incidentes Críticos",
        "Multi-clientes",
        "Alta Demanda Corporativa",
      ],
    },
  ];

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-base text-white overflow-x-hidden">
      {/* ── Navigation ──────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-[70] nav-blur border-b border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image
            src="/images/logo.png"
            alt="VR Logo"
            width={48}
            height={48}
            className="h-20 w-auto"
            // style={{ filter: 'invert(1) hue-rotate(180deg) brightness(6)' }}
            priority
          />
          <div className="hidden md:flex items-center gap-7 text-sm">
            {([
              { href: "#hero", label: "Início", section: "hero" },
              { href: "#value", label: "Diferencial", section: "value" },
              { href: "#about", label: "Sobre", section: "about" },
              { href: "#skills", label: "Skills", section: "skills" },
              { href: "#projects", label: "Projetos", section: "projects" },
              { href: "#experience", label: "Experiência", section: "experience" },
            ] as { href: string; label: string; section: string }[]).map(
              ({ href, label, section }) => (
                <a
                  key={href}
                  href={href}
                  className={`relative pb-0.5 transition-colors duration-200 ${
                    activeSection === section
                      ? "text-white"
                      : "text-muted hover:text-white"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-cyan-400 rounded-full transition-all duration-300 ease-out ${
                      activeSection === section
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    }`}
                  />
                </a>
              )
            )}
            <button
              onClick={() => scrollTo(sectionRefs.contact)}
              className={`px-4 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 ${
                activeSection === "contact"
                  ? "border-cyan-400/60 text-cyan-400 bg-cyan-400/10"
                  : "border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/60"
              }`}
            >
              Contato
            </button>
          </div>

          {/* Toggle Mobile Menu - Hamburger Animado */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] z-[70]"
            aria-label="Toggle Menu"
          >
            <span className={`block w-6 h-px bg-white transition-all duration-300 ease-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ease-out ${isMobileMenuOpen ? 'opacity-0 translate-x-2' : 'opacity-100'}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ease-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay (Full Screen) ── */}
      <div 
        className={`fixed inset-0 z-[60] bg-base/98 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center md:hidden ${
          isMobileMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`w-full max-w-sm px-8 flex flex-col items-center gap-8 transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center gap-8 w-full">
            {([
              { href: "#hero", label: "Início", section: "hero" },
              { href: "#value", label: "Diferencial", section: "value" },
              { href: "#about", label: "Sobre", section: "about" },
              { href: "#skills", label: "Skills", section: "skills" },
              { href: "#projects", label: "Projetos", section: "projects" },
              { href: "#experience", label: "Experiência", section: "experience" },
            ] as { href: string; label: string; section: string }[]).map(({ href, label, section }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  scrollTo(sectionRefs[section as keyof typeof sectionRefs]);
                }}
                className={`text-2xl font-semibold tracking-tight transition-all duration-300 ${
                  activeSection === section ? "text-cyan-400" : "text-white/80 hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
            <div className="w-12 h-px bg-white/[0.1] my-2" />
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollTo(sectionRefs.contact);
              }}
              className="mt-4 px-8 py-3.5 w-full max-w-[200px] rounded-full bg-cyan-400 text-black font-semibold text-sm hover:bg-cyan-300 transition-all duration-300 shadow-glow-cyan"
            >
              Falar comigo
            </button>
          </div>
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        ref={sectionRefs.hero}
        data-section="hero"
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden pt-16"
      >
        <div className="dot-grid absolute inset-0" />
        <div className="hero-glow absolute inset-0" />

        <div className="max-w-6xl mx-auto px-6 w-full relative z-10 py-16">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_460px] gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left — text */}
            <div
              className={`flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-700 ease-out w-full max-w-[100vw] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] text-cyan-400 text-xs font-medium mb-8 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Disponível para novos projetos
              </div>

              <h1 className="flex flex-col items-center lg:items-start font-display font-extrabold text-[clamp(1rem,9.5vw,4.5rem)] md:text-7xl xl:text-[86px] leading-[1.05] md:leading-[0.94] tracking-tight mb-6 w-full">
                <span className="w-full text-center lg:text-left">Vinicius</span>
                <span className="w-full text-center lg:text-left text-gradient whitespace-nowrap">Rampazzo</span>
              </h1>

              <p className="flex items-center justify-center lg:justify-start text-[1rem] min-[400px]:text-[1.125rem] sm:text-lg md:text-2xl font-light text-muted tracking-wide mb-5 whitespace-nowrap">
                Dev FullStack
                <span className="text-cyan-400 mx-2 sm:mx-3 font-normal">·</span>
                CyberSecurity&#8209;first
              </p>

              <p className="text-center lg:text-left text-muted/80 text-[15px] max-w-[480px] leading-relaxed mb-10 mx-auto lg:mx-0">
                Construo aplicações seguras, escaláveis e orientadas a
                performance. A combinação entre desenvolvimento e segurança é o
                que me diferencia. Não é só código limpo, é código que aguenta
                o mundo real.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10 w-full">
                {[
                  "Node.js",
                  "React",
                  "Next.js",
                  "Python",
                  "TypeScript",
                  "CyberSec",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-md bg-surface border border-white/[0.08] text-muted font-medium hover:border-cyan-400/30 hover:text-white/80 transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-row flex-nowrap justify-center lg:justify-start gap-2 sm:gap-3 items-center mb-10 w-full">
                <button
                  onClick={() => scrollTo(sectionRefs.projects)}
                  className="group flex-1 sm:flex-none sm:w-[160px] flex items-center justify-center gap-2 px-4 py-3 sm:px-6 rounded-full border border-transparent bg-cyan-400 text-black font-semibold text-xs sm:text-sm hover:bg-cyan-300 transition-all duration-300 hover:scale-105 shadow-glow-cyan"
                >
                  Projetos
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo(sectionRefs.contact)}
                  className="flex-1 sm:flex-none sm:w-[160px] flex items-center justify-center gap-2 px-4 py-3 sm:px-6 rounded-full border border-white/15 text-white font-semibold text-xs sm:text-sm hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                  Contato
                </button>
              </div>

              <div className="flex gap-5 justify-center lg:justify-start">
                {[
                  {
                    href: "https://github.com/Vinicius-Rampazzo",
                    icon: <Github className="w-5 h-5" />,
                    label: "GitHub",
                  },
                  {
                    href: "https://www.linkedin.com/in/vinicius-rampazzo-web-developer/",
                    icon: <Linkedin className="w-5 h-5" />,
                    label: "LinkedIn",
                  },
                  {
                    href: "mailto:vinicius_rampazzo@hotmail.com",
                    icon: <Mail className="w-[23px] h-[23px]" />,
                    label: "Email",
                  },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={
                      href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    aria-label={label}
                    className="text-muted hover:text-cyan-400 transition-all duration-300 hover:scale-110 transform"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — photo + orbital rings */}
            <div className={`relative flex items-center justify-center w-full min-h-[340px] sm:min-h-[400px] lg:min-h-[480px] transition-all duration-1000 delay-300 mb-6 lg:mb-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              
              {/* Box estrito e fluido que abraça os elementos sem usar 'scale' */}
              <div className="relative w-[280px] min-[380px]:w-[340px] sm:w-[400px] lg:w-[460px] h-[280px] min-[380px]:h-[340px] sm:h-[400px] lg:h-[460px] flex items-center justify-center shrink-0">
                
                {/* Orbital rings size explicitly fixed to responsive bounds instead of CSS scale bugs */}
                <div className="ring-outer !w-[270px] !h-[270px] min-[380px]:!w-[340px] min-[380px]:!h-[340px] sm:!w-[380px] sm:!h-[380px] lg:!w-[420px] lg:!h-[420px]" />
                <div className="ring-inner !w-[210px] !h-[210px] min-[380px]:!w-[280px] min-[380px]:!h-[280px] sm:!w-[300px] sm:!h-[300px] lg:!w-[340px] lg:!h-[340px]" />

                {/* Profile photo */}
                <div className="relative z-10 w-44 h-44 min-[380px]:w-52 min-[380px]:h-52 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.15)] border-[0.5px] border-white/10 bg-base pointer-events-auto">
                  <Image
                    src="/images/profiles.jpg"
                    alt="Vinicius Rampazzo"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: "center center",
                      transform: "scale(1.45)",
                      transformOrigin: "center 52%",
                    }}
                    priority
                    quality={95}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base/30 to-transparent" />
                </div>

                {/* Badges limitadas ao retângulo fixo flexível, garantindo alinhamento constante com a foto! */}
                <div className="float-1 absolute left-[-10px] sm:left-[5%] lg:left-[5%] top-[10%] lg:top-[12%] z-20 pointer-events-auto">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-surface border border-cyan-400/15 text-[10px] sm:text-xs text-cyan-400 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm whitespace-nowrap">
                    <Shield className="w-3.5 h-3.5" />
                    CyberSecurity
                  </div>
                </div>

                <div className="float-2 absolute right-[-10px] sm:right-[5%] lg:right-[10%] top-[25%] lg:top-[28%] z-20 pointer-events-auto">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-surface border border-blue-500/15 text-[10px] sm:text-xs text-blue-400 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm whitespace-nowrap">
                    <Code2 className="w-3.5 h-3.5" />
                    Full Stack
                  </div>
                </div>

                <div className="float-3 absolute left-[0%] sm:left-[15%] lg:left-[15%] bottom-[12%] lg:bottom-[15%] z-20 pointer-events-auto">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-surface border border-yellow-500/15 text-[10px] sm:text-xs text-yellow-400 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm whitespace-nowrap">
                    <Trophy className="w-3.5 h-3.5" />
                    1º Hackathon &apos;25
                  </div>
                </div>

                <div className="float-4 absolute right-[-5px] sm:right-[10%] lg:right-[12%] bottom-[5%] lg:bottom-[8%] z-20 pointer-events-auto">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-surface border border-purple-500/15 text-[10px] sm:text-xs text-purple-400 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm whitespace-nowrap">
                    <Award className="w-3.5 h-3.5" />
                    CTF Vice
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-5 h-5 text-muted/40" />
        </div>
      </section>

      {/* ── Value Proposition ───────────────────────────────────────────────── */}
      <section
        ref={sectionRefs.value}
        data-section="value"
        id="value"
        className="py-24 bg-surface relative overflow-hidden"
      >
        {/* Animated ambient orbs */}
        <div className="absolute -top-32 right-0 w-[480px] h-[480px] bg-blue-500/[0.05] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-400/[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* Circuit board SVG decoration */}
        <svg
          className="absolute bottom-6 right-6 pointer-events-none select-none hidden xl:block"
          width="260" height="180" viewBox="0 0 260 180" fill="none"
          opacity="0.13"
        >
          <path d="M0 40 H70 L90 20 H160 L180 40 H260" stroke="rgba(34,211,238,0.7)" strokeWidth="0.6"/>
          <path d="M0 100 H50 L70 80 H200 L220 100 H260" stroke="rgba(34,211,238,0.4)" strokeWidth="0.6"/>
          <path d="M0 150 H30 L55 130 H130 L155 150 H260" stroke="rgba(59,130,246,0.5)" strokeWidth="0.6"/>
          <path d="M90 0 V20" stroke="rgba(34,211,238,0.5)" strokeWidth="0.6"/>
          <path d="M180 40 V80" stroke="rgba(34,211,238,0.4)" strokeWidth="0.6"/>
          <path d="M70 80 V180" stroke="rgba(59,130,246,0.4)" strokeWidth="0.6"/>
          <path d="M155 150 V180" stroke="rgba(59,130,246,0.3)" strokeWidth="0.6"/>
          <circle cx="90" cy="20" r="3.5" fill="rgba(34,211,238,0.9)" className="node-pulse"/>
          <circle cx="180" cy="40" r="3" fill="rgba(34,211,238,0.7)" className="node-pulse-2"/>
          <circle cx="70" cy="80" r="3.5" fill="rgba(59,130,246,0.9)" className="node-pulse-3"/>
          <circle cx="155" cy="150" r="3" fill="rgba(59,130,246,0.7)" className="node-pulse-4"/>
          {/* Animated data packet */}
          <circle r="2.5" fill="rgba(34,211,238,1)">
            <animateMotion dur="3.5s" repeatCount="indefinite">
              <mpath href="#vp-path"/>
            </animateMotion>
          </circle>
          <path id="vp-path" d="M0 40 H70 L90 20 H160 L180 40 H260" />
          <circle r="2" fill="rgba(59,130,246,0.9)">
            <animateMotion dur="5s" repeatCount="indefinite" begin="2s">
              <mpath href="#vp-path2"/>
            </animateMotion>
          </circle>
          <path id="vp-path2" d="M0 100 H50 L70 80 H200 L220 100 H260" />
        </svg>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              visibleSections.value
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4">
              O Diferencial
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5 leading-tight">
              Dev que entende de segurança
              <br />
              <span className="text-muted font-light">Destaque</span>
            </h2>
            <p className="text-muted text-sm max-w-lg mx-auto leading-relaxed">
              A maioria entrega código que funciona. Eu entrego código que
              funciona, resiste a ataques e se mantém de pé em produção.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {valueCards.map((card, i) => (
              <div
                key={i}
                className={`bg-base border ${card.border} rounded-2xl p-8 transition-all duration-700 hover:-translate-y-1.5 ${
                  visibleSections.value
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 120 + 150}ms` }}
              >
                <div
                  className={`${card.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}
                >
                  {card.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {card.description}
                </p>
                <ul className="space-y-2">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs text-muted/70"
                    >
                      <span className="w-1 h-1 rounded-full bg-cyan-400/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────────── */}
      <section
        ref={sectionRefs.about}
        data-section="about"
        id="about"
        className="py-24 bg-base relative overflow-hidden"
      >
        {/* Floating code block decoration */}
        <div className="code-float absolute -right-2 top-16 opacity-[0.09] font-mono text-[11px] text-cyan-400 border border-cyan-400/[0.12] rounded-2xl p-5 bg-black/40 backdrop-blur-sm select-none pointer-events-none hidden xl:block" style={{lineHeight:'1.7'}}>
          <div className="text-muted/40 text-[9px] mb-2 tracking-widest uppercase">{"// security_layer.ts"}</div>
          <div><span className="text-blue-400/80">const</span> <span className="text-white/50">auditApp</span> = (target) =&gt; {'{'}</div>
          <div>&nbsp;&nbsp;analyze(target.endpoints);</div>
          <div>&nbsp;&nbsp;<span className="text-cyan-400/90">patch</span>(vulnerabilities);</div>
          <div>&nbsp;&nbsp;<span className="text-blue-400/80">return</span> <span className="text-emerald-400/70">secured</span>(target);</div>
          <div className="text-white/40">{'}'}</div>
          <div className="mt-2 text-muted/30 text-[9px]">✓ 0 vulnerabilities detected</div>
        </div>
        <div className="max-w-6xl mx-auto px-6">
          {/* Centered section header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              visibleSections.about
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4">
              Sobre Mim
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
              Além do código
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-16 items-start">
            {/* Text */}
            <div
              className={`transition-all duration-700 delay-100 ${
                visibleSections.about
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >

              <div className="space-y-5 text-muted leading-relaxed text-[15px]">
                <p>
                  Sou desenvolvedor Full Stack com foco em aplicações seguras,
                  escaláveis e orientadas a performance. Trabalho com Node.js,
                  React, Next.js e Python, tecnologias que escolho porque
                  resolvem problemas reais, não porque estão na moda.
                </p>
                <p>
                  Tenho experiência prática com infraestrutura e segurança de
                  aplicações: análise de vulnerabilidades, gestão de riscos,
                  Nmap e SIEM. Isso me permite desenvolver com uma visão que vai
                  além do código, porque proteger uma aplicação começa antes do
                  deploy.
                </p>
                <p>
                  Atualmente lidero a resolução de incidentes críticos em
                  ambiente corporativo de alta demanda, garantindo continuidade
                  de serviços para múltiplos clientes. Primeiro lugar no
                  Hackathon ImobiBrasil 2025. Vice-campeão do CTF no Next Brasil
                  2025.
                </p>
                <p className="text-white/60 border-l-2 border-cyan-400/30 pl-4 italic">
                  Se precisar de alguém que escreve bons códigos e sabe o que um
                  atacante faria com ele, é aqui.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-8 text-xs text-muted/60">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Presidente Prudente — SP, Brasil
              </div>
            </div>

            {/* Stats */}
            <div
              className={`transition-all duration-700 delay-300 ${
                visibleSections.about
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "4+", label: "Anos de\nExperiência" },
                  { value: "8", label: "Certificações\nObtidas" },
                  { value: "1º", label: "Hackathon\nImobiBrasil 2025" },
                  { value: "2º", label: "CTF Next\nBrasil 2025" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-surface border border-white/[0.06] rounded-2xl p-6 text-center hover:border-cyan-400/20 transition-all duration-300 group"
                  >
                    <div className="font-display font-extrabold text-4xl text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted leading-snug whitespace-pre-line">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ──────────────────────────────────────────────────────────── */}
      <section
        ref={sectionRefs.skills}
        data-section="skills"
        id="skills"
        className="py-24 bg-surface relative overflow-hidden"
      >
        {/* Subtle dot grid overlay */}
        <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" />
        {/* Ambient orbs */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-32 w-80 h-80 bg-cyan-400/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              visibleSections.skills
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4">
              Stack Técnica
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
              O que uso
              <br />
              <span className="text-muted font-light">Atualmente</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {skillGroups.map((col, i) => (
              <div
                key={col.label}
                className={`transition-all duration-700 ${
                  visibleSections.skills
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 80 + 200}ms` }}
              >
                <div
                  className={`${col.headerClass} px-4 py-2.5 rounded-t-xl text-xs font-semibold tracking-widest uppercase text-center`}
                >
                  {col.label}
                </div>
                <div className="bg-base border border-t-0 border-white/[0.06] rounded-b-xl p-3 space-y-0.5 min-h-[220px]">
                  {col.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted hover:bg-white/[0.04] hover:text-white/80 transition-all duration-200 group cursor-default"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors duration-200 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ────────────────────────────────────────────────────────── */}
      <section
        ref={sectionRefs.projects}
        data-section="projects"
        id="projects"
        className="py-24 bg-base relative overflow-hidden"
      >
        {/* Horizontal scan line sweep */}
        <div className="scan-v absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" style={{boxShadow:'0 0 12px rgba(34,211,238,0.25)'}} />
        {/* Corner grid accent */}
        <svg className="absolute top-0 right-0 w-64 h-64 pointer-events-none select-none opacity-[0.04]" viewBox="0 0 200 200" fill="none">
          {Array.from({length:10}).map((_,i)=>(
            <line key={i} x1={i*22} y1="0" x2={i*22} y2="200" stroke="rgba(34,211,238,1)" strokeWidth="0.5"/>
          ))}
          {Array.from({length:10}).map((_,i)=>(
            <line key={i+10} x1="0" y1={i*22} x2="200" y2={i*22} stroke="rgba(34,211,238,1)" strokeWidth="0.5"/>
          ))}
        </svg>
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              visibleSections.projects
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4">
              Trabalhos
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
              Projetos em Destaque
            </h2>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isVisible={visibleSections.projects}
              />
            ))}
          </div>

          {/* Mobile carousel */}
          <MobileProjectCarousel
            projects={projects}
            isVisible={visibleSections.projects}
          />
        </div>
      </section>

      {/* ── Experience ──────────────────────────────────────────────────────── */}
      <section
        ref={sectionRefs.experience}
        data-section="experience"
        id="experience"
        className="py-24 bg-surface relative overflow-hidden"
      >
        {/* Circuit lines decoration top-right */}
        <svg className="absolute top-0 right-0 w-80 h-80 pointer-events-none select-none" viewBox="0 0 300 300" fill="none" opacity="0.07">
          <path d="M300 0 L220 0 L200 20 L200 80 L180 100 L180 200 L200 220 L300 220" stroke="rgba(34,211,238,0.8)" strokeWidth="0.7"/>
          <path d="M300 60 L260 60 L240 80 L240 140" stroke="rgba(59,130,246,0.6)" strokeWidth="0.7"/>
          <circle cx="200" cy="20" r="4" fill="rgba(34,211,238,0.8)" className="node-pulse"/>
          <circle cx="240" cy="80" r="3" fill="rgba(59,130,246,0.8)" className="node-pulse-3"/>
          <circle r="2.5" fill="rgba(34,211,238,1)">
            <animateMotion dur="4s" repeatCount="indefinite">
              <mpath href="#exp-path"/>
            </animateMotion>
          </circle>
          <path id="exp-path" d="M300 0 L220 0 L200 20 L200 80 L180 100 L180 200 L200 220 L300 220"/>
        </svg>
        <div className="max-w-4xl mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              visibleSections.experience
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4">
              Trajetória
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
              Desenvolvimento Profissional
            </h2>
          </div>

          <div>
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex gap-6 transition-all duration-700 ${
                  visibleSections.experience
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 120 + 200}ms` }}
              >
                {/* Timeline dot + line */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-base border-2 border-cyan-400/25 flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(34,211,238,0.08)]">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  {index < experiences.length - 1 && (
                    <div className="relative flex-1 mt-2" style={{ minHeight: "32px" }}>
                      <div className="w-px h-full bg-gradient-to-b from-cyan-400/20 to-transparent" />
                      {index === 0 && (
                        <div className="timeline-travel absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                      )}
                    </div>
                  )}
                </div>

                {/* Card */}
                <div className="flex-1 bg-base border border-white/[0.06] rounded-xl p-6 hover:border-cyan-400/20 transition-all duration-300 mb-5 last:mb-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{exp.role}</h3>
                      <p className="text-cyan-400 text-sm font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs text-muted border border-white/[0.08] bg-white/[0.03] px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed mt-3">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ──────────────────────────────────────────────────── */}
      <section
        ref={sectionRefs.certifications}
        data-section="certifications"
        id="certifications"
        className="py-24 bg-base relative overflow-hidden"
      >
        {/* Rotating hex decoration */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <svg className="hex-spin w-[600px] h-[600px] opacity-[0.025]" viewBox="0 0 200 200" fill="none">
            <polygon points="100,10 168,55 168,145 100,190 32,145 32,55" stroke="rgba(34,211,238,1)" strokeWidth="0.5"/>
          </svg>
          <svg className="hex-spin-reverse w-[420px] h-[420px] opacity-[0.035] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 200 200" fill="none">
            <polygon points="100,10 168,55 168,145 100,190 32,145 32,55" stroke="rgba(59,130,246,1)" strokeWidth="0.5"/>
          </svg>
          <svg className="hex-spin w-[240px] h-[240px] opacity-[0.05] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 200 200" fill="none">
            <polygon points="100,10 168,55 168,145 100,190 32,145 32,55" stroke="rgba(34,211,238,1)" strokeWidth="1"/>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              visibleSections.certifications
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4">
              Formação
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white flex items-center justify-center gap-3">
              <Award className="w-9 h-9 text-cyan-400" />
              Certificações
            </h2>
          </div>

          <CertificationsCarousel
            certifications={certifications}
            isVisible={visibleSections.certifications}
            onCertificationClick={setSelectedCertification}
          />
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────────── */}
      <section
        ref={sectionRefs.contact}
        data-section="contact"
        id="contact"
        className="py-24 bg-surface relative overflow-hidden"
      >
        {/* Pulsing decorative rings */}
        <div
          className="contact-ring"
          style={{ width: "480px", height: "480px" }}
        />
        <div
          className="contact-ring contact-ring-2"
          style={{ width: "700px", height: "700px" }}
        />
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* Radar scanner decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <svg className="w-[340px] h-[340px] opacity-[0.06]" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="rgba(34,211,238,0.6)" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="60" stroke="rgba(34,211,238,0.4)" strokeWidth="0.5"/>
            <circle cx="100" cy="100" r="30" stroke="rgba(34,211,238,0.4)" strokeWidth="0.5"/>
            <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5"/>
            <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5"/>
            {/* Radar sweep line */}
            <line x1="100" y1="100" x2="100" y2="10" stroke="rgba(34,211,238,0.8)" strokeWidth="1" className="radar-sweep"/>
          </svg>
        </div>


        <div
          className={`max-w-3xl mx-auto px-6 text-center transition-all duration-700 relative z-10 ${
            visibleSections.contact
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-6">
            Contato
          </p>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-white leading-tight mb-6">
            Vamos trabalhar
            <br />
            <span className="text-gradient">juntos?</span>
          </h2>
          <p className="text-muted mb-12 max-w-md mx-auto text-sm leading-relaxed">
            Aberto a oportunidades, projetos e conversas sobre tecnologia e
            segurança.
          </p>

          <div className="flex flex-row flex-nowrap w-full sm:w-auto gap-2 sm:gap-4 justify-center">
            <a
              href="mailto:vinicius_rampazzo@hotmail.com"
              className="flex-1 sm:flex-none sm:w-[170px] flex items-center justify-center gap-2 px-4 sm:px-2 py-3 sm:py-3.5 rounded-full border border-transparent bg-cyan-400 text-black font-semibold text-xs sm:text-sm hover:bg-cyan-300 transition-all duration-300 hover:scale-105 shadow-glow-cyan"
            >
              <Mail className="w-[1.1rem] h-[1.1rem] shrink-0" />
              <span>Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/vinicius-rampazzo-web-developer/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none sm:w-[170px] flex items-center justify-center gap-2 px-4 sm:px-2 py-3 sm:py-3.5 rounded-full border border-white/15 text-white font-semibold text-xs sm:text-sm hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 whitespace-nowrap"
            >
              <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="py-8 border-t border-white/[0.05] bg-base">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-muted text-xs">
          <Image
            src="/images/logo.png"
            alt="VR Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
            // style={{ filter: 'invert(1) hue-rotate(180deg) brightness(2.8)' }}
          />
          <p>© 2025 Vinicius Rampazzo. Desenvolvido com Next.js e Tailwind CSS.</p>
          <div className="flex gap-5">
            <a
              href="https://github.com/Vinicius-Rampazzo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/vinicius-rampazzo-web-developer/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:vinicius_rampazzo@hotmail.com"
              className="hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* ── Certification Modal ──────────────────────────────────────────────── */}
      {selectedCertification && (
        <CertificationModal
          certification={selectedCertification}
          onClose={() => setSelectedCertification(null)}
        />
      )}
    </div>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
const ProjectCard = ({
  project,
  index,
  isVisible,
}: {
  project: Project;
  index: number;
  isVisible: boolean;
}) => (
  <div
    className={`group relative bg-surface border border-white/[0.06] rounded-2xl overflow-visible hover:border-cyan-400/25 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)] ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
    style={{ transitionDelay: `${index * 120 + 200}ms` }}
  >
    {/* Award badge — floating above card, outside overflow */}
    {project.award && (
      <div className="absolute -top-4 left-4 z-20">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-400 text-black text-xs font-bold shadow-[0_4px_20px_rgba(250,204,21,0.35)]">
          <Trophy className="w-3.5 h-3.5" />
          {project.award}
        </span>
      </div>
    )}

    {/* Image */}
    <div className="relative overflow-hidden h-48 rounded-t-2xl">
      <Image
        src={project.image}
        alt={project.title}
        width={400}
        height={250}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((tech, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-white/[0.04] border border-white/[0.06] rounded text-xs text-muted/70"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-2.5">
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium hover:bg-cyan-400/20 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Demo
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-muted text-xs font-medium hover:bg-white/[0.08] hover:text-white transition-all"
        >
          <Github className="w-3.5 h-3.5" />
          Código
        </a>
      </div>
    </div>
  </div>
);

// ─── MobileProjectCarousel ────────────────────────────────────────────────────
const MobileProjectCarousel = ({
  projects,
  isVisible,
}: {
  projects: Project[];
  isVisible: boolean;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  const goToSlide = (i: number) => setCurrentSlide(i);

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > 50) nextSlide();
    else if (dist < -50) prevSlide();
  };

  return (
    <div
      className={`md:hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {projects.map((project, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <div className="bg-surface border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={220}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                  {project.award && (
                    <div className="absolute top-3 left-3">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-400/15 border border-yellow-400/25 text-yellow-400 text-xs backdrop-blur-sm">
                        <Trophy className="w-3 h-3" />
                        {project.award}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((tech, ti) => (
                      <span
                        key={ti}
                        className="px-2 py-1 bg-white/[0.04] border border-white/[0.06] rounded text-xs text-muted/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-muted text-xs font-medium"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Código
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentSlide
                ? "w-6 h-1.5 bg-cyan-400"
                : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
      <p className="text-center text-muted/50 text-xs mt-4">
        Deslize para navegar
      </p>
    </div>
  );
};

// ─── CertificationsCarousel ───────────────────────────────────────────────────
const CertificationsCarousel = ({
  certifications,
  isVisible,
  onCertificationClick,
}: {
  certifications: Certification[];
  isVisible: boolean;
  onCertificationClick: (cert: Certification) => void;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setItemsPerSlide(1);
      else if (window.innerWidth < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxSlide = Math.max(0, certifications.length - itemsPerSlide);
  const nextSlide = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  const prevSlide = () =>
    setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="relative">
        {/* Prev button */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-surface border border-white/[0.08] text-muted hover:text-white hover:border-cyan-400/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Next button */}
        <button
          onClick={nextSlide}
          disabled={currentSlide >= maxSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-surface border border-white/[0.08] text-muted hover:text-white hover:border-cyan-400/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="overflow-hidden mx-12">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${
                currentSlide * (100 / itemsPerSlide)
              }%)`,
            }}
          >
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="flex-shrink-0 px-2.5"
                style={{ width: `${100 / itemsPerSlide}%` }}
              >
                <CertificationCard
                  certification={cert}
                  index={index}
                  onClick={() => onCertificationClick(cert)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-1.5">
          {Array.from({ length: maxSlide + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "w-6 h-1.5 bg-cyan-400"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── CertificationCard ────────────────────────────────────────────────────────
const CertificationCard = ({
  certification,
  index,
  onClick,
}: {
  certification: Certification;
  index: number;
  onClick: () => void;
}) => (
  <div
    className="group cursor-pointer"
    onClick={onClick}
    style={{ transitionDelay: `${index * 60}ms` }}
  >
    <div className="bg-surface border border-white/[0.06] rounded-xl overflow-hidden hover:border-cyan-400/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative">
      {/* Star badge */}
      <div className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-yellow-400/10 border border-yellow-400/20">
        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
      </div>

      {/* Image */}
      <div className={`relative h-44 overflow-hidden ${certification.padded ? "bg-[#dce4ec]" : ""}`}>
        <Image
          src={certification.image}
          alt={certification.title}
          width={400}
          height={300}
          className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
            certification.padded ? "object-contain p-3" : "object-cover"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
        <div className="absolute inset-0 bg-cyan-400/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 leading-snug">
          {certification.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted">{certification.organization}</span>
          <span className="text-xs text-muted/50 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded">
            {certification.date}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// ─── CertificationModal ───────────────────────────────────────────────────────
const CertificationModal = ({
  certification,
  onClose,
}: {
  certification: Certification;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/88 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative bg-surface border border-white/[0.08] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-colors"
        >
          <X className="w-4 h-4 text-muted" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <h2 className="font-display font-bold text-white text-lg leading-tight">
                {certification.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-muted mt-0.5">
                <span>{certification.organization}</span>
                <span className="w-1 h-1 rounded-full bg-muted/40" />
                <span>{certification.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="overflow-auto max-h-[calc(90vh-140px)]">
          <Image
            src={certification.image}
            alt={certification.title}
            width={800}
            height={600}
            className="w-full h-auto object-contain bg-base/50"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.06] flex items-center justify-between">
          <p className="text-xs text-muted/50">
            Pressione ESC ou clique fora para fechar
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium hover:bg-cyan-400/20 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
