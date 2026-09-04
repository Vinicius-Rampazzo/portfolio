import type { Project } from "./types";

export const projects: Project[] = [
  // {
  //   title: "Doc Work",
  //   category: "AI · SaaS · RAG",
  //   description:
  //     "Plataforma SaaS multi-tenant baseada em RAG que transforma documentos e bases internas de conhecimento em uma interface inteligente de consulta, usando embeddings, busca semântica e modelos de linguagem para responder com o conhecimento de cada organização.",
  //   tech: ["Next.js", "Tailwind CSS", "Python", "PostgreSQL"],
  //   image: "/images/docwork.png",
  //   demo: "https://www.docwork.com.br/",
  //   github: "https://github.com/Vinicius-Rampazzo/support-service",
  //   imagePosition: "top center",
  // },
  {
    title: "ImobiBotBrasil",
    category: "AI · Real Estate",
    description:
      "Solução que torna a busca por imóveis mais natural através de Inteligência Artificial: o usuário expressa o que precisa em linguagem natural em vez de depender apenas de filtros tradicionais, e a aplicação interpreta essa intenção para ajudar na descoberta de imóveis compatíveis.",
    tech: ["Python", "JavaScript", "HTML", "CSS"],
    image: "/images/imobibotbrasil.png",
    demo: "https://github.com/Vinicius-Rampazzo/ImobiBotBrasil",
    github: "https://github.com/Vinicius-Rampazzo/ImobiBotBrasil",
    award: "1º Lugar Hackathon 2025",
  },
  {
    title: "Tech Informe",
    category: "Blog · Conteúdo Técnico",
    description:
      "Blog colaborativo para compartilhar conhecimento técnico. Múltiplos autores podem hospedar e publicar artigos sobre tecnologia de forma organizada.",
    tech: ["Next.js", "Tailwind CSS"],
    image: "/images/techinforme.png",
    demo: "https://techinforme.com.br/",
  },
];
