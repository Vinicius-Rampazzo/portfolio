'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, ExternalLink, Code, Server, Smartphone, ChevronDown, MapPin, Calendar, Award, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Definindo os tipos
type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  demo: string;
  github: string;
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
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    certifications: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null)
  };

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.getAttribute('data-section');
          if (entry.isIntersecting && section) {
            setVisibleSections(prev => ({
              ...prev,
              [section]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    // Observar todas as refs de forma mais estável
    const currentRefs = Object.values(sectionRefs);
    currentRefs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: 'Next.js', level: 95, color: 'from-lime-400 to-lime-600' },
    { name: 'React', level: 90, color: 'from-emerald-400 to-emerald-600' },
    { name: 'Node.js', level: 85, color: 'from-teal-400 to-teal-600' },
    { name: 'TypeScript', level: 90, color: 'from-green-400 to-green-600' },
    { name: 'JavaScript', level: 95, color: 'from-cyan-400 to-cyan-600' },
    { name: 'Python', level: 88, color: 'from-lime-400 to-lime-600' },
    { name: 'SQL', level: 82, color: 'from-cyan-400 to-cyan-600' },
    { name: 'HTML', level: 97, color: 'from-green-500 to-emerald-600' }
  ];

  const projects: Project[] = [
    {
      title: 'ImobiBotBrasil',
      description: 'Projeto que me levou ao primeiro lugar no Hackathon 2025 da ImobiBrasil, onde criei a Lois - uma IA integrada a chatbot com filtro inteligente que facilita a busca por imóveis através de conversas naturais, transformando a experiência no mercado imobiliário.',
      tech: ['Python', 'Javascript', 'HTML', 'CSS'],
      image: '/images/imobibotbrasil.png',
      demo: 'https://github.com/Vinicius-Rampazzo/ImobiBotBrasil',
      github: 'https://github.com/Vinicius-Rampazzo/ImobiBotBrasil'
    },
    {
      title: 'Tech Informe',
      description: 'Blog criado para compartilhar conhecimento através de artigos baseados em meus projetos e estudos sobre tecnologia, com a possibilidade de outros autores hospedarem e compartilharem seus artigos de forma organizada.',
      tech: ['Site informativo para amantes de Tecnologia'],
      image: '/images/techinforme.png',
      demo: 'https://techinforme.com.br/',
      github: 'https://techinforme.com.br/'
    },
    {
      title: 'Pixel Art',
      description: 'Meu primeiro projeto desenvolvido na Trybe utilizando HTML, CSS e JavaScript, focado em aprimorar os fundamentos e treinar a lógica de programação. Um projeto especial que marca o ponto de partida de toda essa jornada, o início de tudo.',
      tech: ['JavaScript', 'CSS', 'HTML'],
      image: '/images/pixelart.png',
      demo: 'https://pixel-art-blush.vercel.app/',
      github: 'https://github.com/Vinicius-Rampazzo/pixel-art'
    }
  ];

  const experiences: Experience[] = [
    {
      company: 'ImobiBrasil',
      role: 'Analista HelpDesk Nível 3',
      period: '2023 - Atualmente',
      description: 'Sou líder do setor de hospedagem de e-mails corporativos, arquitetando soluções escaláveis, automações e desenvolvimento.'
    },
    {
      company: 'Guardiões Segurança Eletrônica',
      role: 'Analista de rede',
      period: '2023',
      description: 'Pude aprender muito sobre redes e desenvolvimento de software, trabalhando em equipe com os demais colaboradores.'
    },
    {
      company: 'Trybe',
      role: 'Desenvolvedor FullStack',
      period: '2022',
      description: 'Formado pela Trybe em 2022 através de uma jornada intensa de desafios e diversos projetos práticos que consolidaram minha base em programação.'
    }
  ];

  const certifications: Certification[] = [
    {
      id: 1,
      title: 'Fundamentos do Desenvolvimento Web',
      image: '/images/cert-fundamentos.png',
      organization: 'Trybe',
      date: '2021'
    },
    {
      id: 2,
      title: 'Desenvolvimento Front-End',
      image: '/images/cert-frontend.png',
      organization: 'Trybe',
      date: '2022'
    },
    {
      id: 3,
      title: 'Desenvolvimento Back-End',
      image: '/images/cert-backend.png',
      organization: 'Trybe',
      date: '2022'
    },
    {
      id: 4,
      title: 'Ciência da Computação',
      image: '/images/cert-comp.png',
      organization: 'Trybe',
      date: '2023'
    },
    {
      id: 5,
      title: 'Gestão de Segurança da Informação',
      image: '/images/cert-gestao-risco.png',
      organization: 'Fiap',
      date: '2024'
    },
    {
      id: 6,
      title: 'Profissional em Cibersegurança',
      image: '/images/cert-pro-ciber.png',
      organization: 'Fiap',
      date: '2024'
    },
    {
      id: 7,
      title: 'Information Security Officer',
      image: '/images/cert-info-security.png',
      organization: 'Fiap',
      date: '2024'
    }
  ];

  const scrollToCertifications = () => {
  sectionRefs.certifications.current?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-green-900 text-white">
      {/* Hero Section */}
      <section 
        ref={sectionRefs.hero}
        data-section="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-green-500/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-teal-400/40 rounded-full animate-pulse delay-500"></div>
        </div>
        <div 
          className={`container mx-auto px-6 text-center z-10 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 p-1 shadow-2xl shadow-emerald-500/25">
              <div className="w-full h-full rounded-full overflow-hidden border border-emerald-500/20">
                <Image
                  src="/images/profile.jpg"
                  alt="Foto de perfil"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-full"
                  priority
                  quality={95}
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
            Vinicius Rampazzo
          </h1>
          
          <p className="text-lg md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Desenvolvedor <span className="text-emerald-400 font-semibold">Full Stack</span> apaixonado em tecnologia e segurança! 
            Compartilho experiências digitais para <span className="text-emerald-400 font-semibold">conectar</span> pessoas.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 backdrop-blur-sm">
              <Code className="inline w-4 h-4 mr-2" />
              Frontend
            </span>
            <span className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 backdrop-blur-sm">
              <Server className="inline w-4 h-4 mr-2" />
              Backend
            </span>
            <span className="px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-300 backdrop-blur-sm">
              <Smartphone className="inline w-4 h-4 mr-2" />
              Mobile
            </span>
          </div>
          
          <div className="flex gap-6 justify-center mb-12">
            <a href="https://github.com/Vinicius-Rampazzo" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-emerald-500/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/vinicius-rampazzo-web-developer/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-emerald-500/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:vinicius_rampazzo@hotmail.com" className="p-3 bg-white/10 hover:bg-emerald-500/20 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          
          <button className="group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
                  onClick={scrollToCertifications}>
            <span className="flex items-center">
              Ver Meus Projetos
              <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>
        </div>
        
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-emerald-400" />
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={sectionRefs.about}
        data-section="about"
        className="py-20 bg-black/30 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6">
          <div className={`max-w-4xl mx-auto transform transition-all duration-1000 delay-200 ${
            visibleSections.about ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Sobre Mim
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`transform transition-all duration-800 delay-300 ${
                visibleSections.about ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Sou um desenvolvedor full stack apaixonado por tecnologia e inovação. Há anos mergulhado neste universo, 
                  transformando ideias em interfaces elegantes e soluções funcionais que realmente fazem a diferença.
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Formado pela Trybe em programação, estou expandindo ainda mais meus horizontes: ao final de 2025, me formo 
                  em Defesa Cibernética através da FIAP. Porque acredito que não basta apenas criar, mas sim proteger cada 
                  linha de código construído.
                </p>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  É essa a visão que tenho, do desenvolvimento à segurança, que me move a entregar 
                  soluções web modernas, escaláveis e, acima de tudo, seguras.
                </p>
                
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-emerald-400" />
                    Presidente Prudente - SP, Brasil
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-emerald-400" />
                    Disponível para projetos
                  </div>
                </div>
              </div>
              
              <div className={`space-y-6 transform transition-all duration-800 delay-500 ${
                visibleSections.about ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}>
                {skills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2 backdrop-blur-sm">
                      <div 
                        className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 ease-out group-hover:scale-105 shadow-sm`}
                        style={{ 
                          width: visibleSections.about ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 100 + 600}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        ref={sectionRefs.projects}
        data-section="projects"
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent transform transition-all duration-800 ${
            visibleSections.projects ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Projetos em Destaque
          </h2>
          
          {/* Desktop Grid - Hidden on Mobile */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} isVisible={visibleSections.projects} />
            ))}
          </div>

          {/* Mobile Carousel - Hidden on Desktop */}
          <MobileProjectCarousel projects={projects} isVisible={visibleSections.projects} />
        </div>
      </section>

      {/* Experience Section */}
      <section 
        ref={sectionRefs.experience}
        data-section="experience"
        className="py-20 bg-black/30 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent transform transition-all duration-800 ${
            visibleSections.experience ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Experiência Profissional
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-green-600 shadow-sm shadow-emerald-500/20"></div>
              
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-start mb-12 transform transition-all duration-700 ${
                    visibleSections.experience 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 300}ms` }}
                >
                  <div className="absolute left-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="ml-16 bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 flex-1 hover:bg-slate-800/70 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-bold text-emerald-400">{exp.role}</h3>
                      <span className="text-sm text-gray-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full backdrop-blur-sm">{exp.period}</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-3 text-green-300">{exp.company}</h4>
                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section 
        ref={sectionRefs.certifications}
        data-section="certifications"
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent transform transition-all duration-800 ${
            visibleSections.certifications ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Award className="inline w-8 h-8 mr-3 text-emerald-400" />
            Certificações
          </h2>
          
          <CertificationsCarousel 
            certifications={certifications} 
            isVisible={visibleSections.certifications}
            onCertificationClick={setSelectedCertification}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={sectionRefs.contact}
        data-section="contact"
        className="py-20 bg-black/30 backdrop-blur-sm"
      >
        <div className={`container mx-auto px-6 text-center transform transition-all duration-800 ${
          visibleSections.contact ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            Vamos Trabalhar Juntos!
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Estou sempre aberto a novos desafios e oportunidades interessantes. 
            Entre em contato e vamos criar algo incrível!
          </p>
          
          <a 
            href="mailto:vinicius_rampazzo@hotmail.com"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
          >
            <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Entre em Contato
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-emerald-500/20 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2025 Vinicius Rampazzo. Aplicação desenvolvida utilizando Next.js e Tailwind CSS.</p>
        </div>
      </footer>

      {/* Certification Modal */}
      {selectedCertification && (
        <CertificationModal 
          certification={selectedCertification}
          onClose={() => setSelectedCertification(null)}
        />
      )}
    </div>
  );
}

// Componente do Card de Projeto
const ProjectCard = ({ project, index, isVisible }: { project: Project, index: number, isVisible: boolean }) => (
  <div 
    className={`group bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl overflow-hidden hover:bg-slate-800/70 hover:border-emerald-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
    }`}
    style={{ transitionDelay: `${index * 150 + 200}ms` }}
  >
    <div className="relative overflow-hidden">
      <Image 
        src={project.image} 
        alt={project.title}
        width={400}
        height={250}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech: string, techIndex: number) => (
          <span 
            key={techIndex}
            className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs text-emerald-300 backdrop-blur-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex gap-3">
        <a 
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg transition-colors text-sm group-hover:shadow-lg group-hover:shadow-emerald-500/20"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Demo
        </a>
        <a 
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
        >
          <Github className="w-4 h-4 mr-2" />
          Código
        </a>
      </div>
    </div>
  </div>
);

// Componente do Carrossel Mobile
const MobileProjectCarousel = ({ projects, isVisible }: { projects: Project[], isVisible: boolean }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className={`md:hidden transform transition-all duration-800 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
    }`}>
      {/* Carousel Container */}
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
          {projects.map((project, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl overflow-hidden shadow-2xl shadow-emerald-500/20">
                <div className="relative overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    width={400}
                    height={220}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-emerald-400">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech: string, techIndex: number) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs text-emerald-300 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg transition-colors text-sm shadow-lg shadow-emerald-500/20"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Código
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-emerald-500 scale-125 shadow-lg shadow-emerald-500/50' 
                : 'bg-emerald-500/30 hover:bg-emerald-500/50'
            }`}
          />
        ))}
      </div>

      {/* Swipe Indicator */}
      <p className="text-center text-gray-400 text-xs mt-4">
        Deslize para navegar entre os projetos
      </p>
    </div>
  );
};

// Componente do Carrossel de Certificações
const CertificationsCarousel = ({ certifications, isVisible, onCertificationClick }: { 
  certifications: Certification[], 
  isVisible: boolean,
  onCertificationClick: (cert: Certification) => void 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const maxSlide = Math.max(0, certifications.length - itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className={`transform transition-all duration-800 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
    }`}>
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-emerald-500/20 hover:bg-emerald-500/30 disabled:opacity-30 disabled:cursor-not-allowed rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-emerald-400" />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentSlide >= maxSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-emerald-500/20 hover:bg-emerald-500/30 disabled:opacity-30 disabled:cursor-not-allowed rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-emerald-400" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden mx-12">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)` }}
          >
            {certifications.map((cert, index) => (
              <div 
                key={cert.id} 
                className="flex-shrink-0 px-4"
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

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-emerald-500 scale-125 shadow-lg shadow-emerald-500/50' 
                  : 'bg-emerald-500/30 hover:bg-emerald-500/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente do Card de Certificação
const CertificationCard = ({ certification, index, onClick }: { 
  certification: Certification, 
  index: number,
  onClick: () => void 
}) => (
  <div 
    className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
    onClick={onClick}
  >
    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl overflow-hidden hover:bg-slate-800/70 hover:border-emerald-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
      {/* Certification Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-full shadow-lg">
          <Star className="w-4 h-4 text-yellow-900 fill-current" />
        </div>
      </div>

      {/* Sparkle Effects */}
      <div className="absolute top-6 left-6 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
      <div className="absolute bottom-8 right-8 w-1 h-1 bg-teal-400 rounded-full animate-pulse delay-1000"></div>

      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <Image 
          src={certification.image} 
          alt=""
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-emerald-500/20 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <ExternalLink className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2">
          {certification.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span className="font-medium">{certification.organization}</span>
          <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-emerald-300">
            {certification.date}
          </span>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-emerald-500/5 via-transparent to-green-500/5"></div>
    </div>
  </div>
);

// Componente do Modal de Certificação
const CertificationModal = ({ certification, onClose }: { 
  certification: Certification, 
  onClose: () => void 
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative bg-slate-800/90 backdrop-blur-md border border-emerald-500/20 rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl shadow-emerald-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-full transition-colors duration-300"
        >
          <X className="w-6 h-6 text-gray-300 hover:text-white" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-full">
              <Award className="w-6 h-6 text-yellow-900" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-400 mb-1">
                {certification.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{certification.organization}</span>
                <span>•</span>
                <span>{certification.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <Image 
            src={certification.image} 
            alt={certification.title}
            width={800}
            height={600}
            className="w-full h-auto max-h-[60vh] object-contain bg-slate-900/50"
          />
        </div>

        {/* Footer */}
        <div className="p-6 text-center">
          <p className="text-gray-300 mb-4">
            <strong> Clique fora da imagem ou pressione ESC para fechar </strong>
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-full transition-all duration-300 hover:scale-105"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};