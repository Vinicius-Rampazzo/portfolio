import type React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type Project = {
  title: string;
  category?: string;
  description: string;
  tech: string[];
  image: string;
  demo: string;
  github?: string;
  award?: string;
  imagePosition?: string;
};

export type Experience = {
  /** Omitido quando o vínculo não pode ser identificado publicamente. */
  company?: string;
  role: string;
  period: string;
  /** Um parágrafo, ou vários quando a experiência precisa de mais contexto. */
  description: string | string[];
  tech?: string[];
  current?: boolean;
};

export type Education = {
  institution: string;
  course: string;
  period: string;
  description: string;
  /** Logo da instituição, exibido sobre placa branca na seção clara. */
  logo: string;
};

// "Award" já é o nome de um ícone do lucide-react — daí "Achievement".
export type Achievement = {
  place: string;
  title: string;
  event: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Recorte da imagem, quando o padrão centralizado corta mal. */
  imagePosition?: string;
  /** Tons pensados para o fundo claro da seção — daí os valores fechados. */
  accent: {
    text: string;
    bg: string;
  };
  icon: React.ReactNode;
};

export type Certification = {
  id: number;
  title: string;
  image: string;
  organization: string;
  date: string;
  padded?: boolean;
};
