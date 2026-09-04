export type SkillGroup = { label: string; headerClass: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Software Engineering",
    headerClass:
      "bg-cyan-400/[0.08] text-cyan-400 border border-cyan-400/20",
    items: [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Python",
      "REST APIs",
      "Arquitetura de Software",
      "Modelagem de Dados",
    ],
  },
  {
    label: "Web & Mobile",
    headerClass:
      "bg-blue-500/[0.08] text-blue-400 border border-blue-500/20",
    items: ["Next.js", "React", "React Native", "Expo", "Tailwind CSS"],
  },
  {
    label: "Data & Backend",
    headerClass:
      "bg-emerald-500/[0.08] text-emerald-400 border border-emerald-500/20",
    items: ["PostgreSQL", "Supabase", "SQLite", "MongoDB", "SQL"],
  },
  {
    label: "AI Engineering",
    headerClass:
      "bg-violet-500/[0.08] text-violet-400 border border-violet-500/20",
    items: [
      "RAG",
      "LLM Integration",
      "Semantic Search",
      "Embeddings",
      "Vector Search",
      "Prompt Engineering",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    headerClass:
      "bg-amber-500/[0.08] text-amber-400 border border-amber-500/20",
    items: ["Git & GitHub", "Docker", "Linux", "Vercel", "Cloudflare", "VPS"],
  },
  {
    label: "Security",
    headerClass:
      "bg-purple-500/[0.08] text-purple-400 border border-purple-500/20",
    items: [
      "Application Security",
      "Análise de Vulnerabilidades",
      "Gestão de Riscos",
      "Secure Development",
      "Nmap",
      "Forensics",
    ],
  },
];
