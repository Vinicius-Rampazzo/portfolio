import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    // Empresa omitida: trabalho sob demanda, sem divulgação pública do vínculo.
    role: "Software Engineer · PJ",
    period: "Jun 2026 — Atual",
    current: true,
    description: [
      "Desenvolvimento e evolução de plataformas voltadas ao setor rural, incluindo sistemas de crédito rural, assistência técnica e uma aplicação mobile utilizada diretamente em operações de campo.",
      "A arquitetura offline-first permite que as informações sejam registradas localmente durante as atividades em regiões com conectividade limitada e sincronizadas com a infraestrutura remota assim que houver conexão disponível.",
      "Atuo em arquitetura de software, modelagem de dados, integrações, persistência local, estratégias de sincronização e resolução de estados entre aplicação e servidor, mantendo a consistência dos dados entre os sistemas web e mobile.",
    ],
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "SQLite",
      "PostgreSQL",
      "Supabase",
    ],
  },
  {
    company: "ImobiBrasil",
    role: "Analista Nível 4",
    period: "Jun 2023 — Atual",
    current: true,
    description:
      "Atuação em ambiente SaaS de alta demanda, auxiliando na resolução de incidentes técnicos, análise de problemas em produção, infraestrutura, automações e continuidade de serviços utilizados por múltiplos clientes do mercado imobiliário. O trabalho envolve investigação de falhas, suporte técnico avançado e análise de integrações que afetam diretamente a disponibilidade dos serviços.",
  },
  {
    company: "Guardiões Segurança Eletrônica",
    role: "Analista de Rede",
    period: "2023",
    description:
      "Proteção de dados, gestão de redes e segurança corporativa. Trabalho direto com infraestrutura e integridade dos dados da empresa, em equipe.",
  },
];
