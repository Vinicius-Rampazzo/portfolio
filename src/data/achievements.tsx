import { Trophy, Award } from "lucide-react";
import type { Achievement } from "./types";

export const achievements: Achievement[] = [
  {
    place: "1º",
    title: "Primeiro lugar",
    event: "Hackathon ImobiBrasil 2025",
    description:
      "Projeto vencedor com o ImobiBotBrasil, solução de Inteligência Artificial que interpreta linguagem natural para tornar a busca por imóveis mais próxima de uma conversa do que de um formulário de filtros.",
    image: "/images/award-trophy.png",
    imageAlt: "Troféu de premiação",
    accent: {
      text: "text-amber-800",
      bg: "bg-amber-800/10",
    },
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    place: "2º",
    title: "Vice-campeão",
    event: "CTF Next Brasil 2025",
    description:
      "Competição nacional de cibersegurança de alto nível, com participação após seleção por projeto acadêmico. O desafio envolveu análise, exploração e resolução de problemas de segurança sob tempo limitado.",
    image: "/images/profiles.jpg",
    imageAlt: "Vinicius Rampazzo",
    // O retrato é 1200×1600: sem deslocar o foco para cima, o recorte em 4:5
    // corta a cabeça.
    imagePosition: "center 25%",
    accent: {
      text: "text-violet-700",
      bg: "bg-violet-700/10",
    },
    icon: <Award className="w-5 h-5" />,
  },
];
