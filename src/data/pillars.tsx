import type React from "react";
import { Code2, Shield, Sparkles, Smartphone } from "lucide-react";

export type Pillar = {
  icon: React.ReactNode;
  iconBg: string;
  border: string;
  title: string;
  description: string;
  items: string[];
};

export const pillars: Pillar[] = [
  {
    icon: <Code2 className="w-6 h-6 text-cyan-400" />,
    iconBg: "bg-cyan-400/10",
    border: "border-white/[0.06] hover:border-cyan-400/30",
    title: "Produto & Arquitetura",
    description:
      "Desenvolvimento de sistemas pensando além da implementação: arquitetura, modelagem de dados, APIs, integrações, manutenção e evolução do produto em produção.",
    items: [
      "Arquitetura de Software",
      "Modelagem de Dados",
      "APIs & Integrações",
      "Evolução em Produção",
    ],
  },
  {
    icon: <Sparkles className="w-6 h-6 text-violet-400" />,
    iconBg: "bg-violet-500/10",
    border: "border-white/[0.06] hover:border-violet-500/30",
    title: "Inteligência Artificial",
    description:
      "Construção de aplicações com LLMs, arquiteturas RAG, busca semântica e recuperação de informações integradas a produtos e fluxos reais de negócio.",
    items: [
      "RAG & LLMs",
      "Busca Semântica",
      "Embeddings & Vector Search",
      "IA em Fluxos de Negócio",
    ],
  },
  {
    icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
    iconBg: "bg-emerald-500/10",
    border: "border-white/[0.06] hover:border-emerald-500/30",
    title: "Offline-First",
    description:
      "Aplicações mobile projetadas para ambientes com conectividade limitada, com persistência local, sincronização remota e consistência dos dados.",
    items: [
      "React Native & Expo",
      "Persistência Local",
      "Sincronização de Dados",
      "Consistência entre Estados",
    ],
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    iconBg: "bg-blue-500/10",
    border: "border-white/[0.06] hover:border-blue-500/30",
    title: "Security by Design",
    description:
      "Formação em CyberSecurity que complementa a engenharia, com visão voltada à segurança das aplicações, infraestrutura, análise de riscos e confiabilidade.",
    items: [
      "Application Security",
      "Análise de Vulnerabilidades",
      "Gestão de Riscos",
      "Defesa Cibernética — FIAP",
    ],
  },
];
