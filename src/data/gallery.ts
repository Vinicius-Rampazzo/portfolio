/**
 * Galeria do "Sobre".
 *
 * A primeira é o retrato; as demais são fotos legítimas do CTF Next Brasil,
 * que dizem mais sobre o trabalho do que imagens de banco de imagem.
 *
 * A composição é dado, não improviso do navegador. São quatro fotos em duas
 * faixas de altura fixa; dentro de cada faixa as larguras se distribuem por
 * `flex`, então a faixa fecha exatamente na largura do container — sem cela
 * órfã e sem margem negativa (a versão anterior puxava a foto do grupo para
 * cima com `-mt` e ela cobria a legenda).
 *
 *   faixa A │ retrato ·· legenda ·· CTF 01
 *   faixa B │ grupo (mais largo) ·· CTF 02
 *
 * As proporções finais saem da altura da faixa e sobram próximas das nativas:
 * ~0,82 nos retratos (nativo 0,75) e ~1,6 na foto de grupo (nativo 1,33), que
 * é o enquadramento em que ela já vinha aparecendo bem.
 */
export type GalleryImage = {
  src: string;
  alt: string;
  /** Velocidade no parallax. 1 acompanha a página; acima disso sobe antes. */
  speed: number;
  /** Faixa em que a foto vive. */
  band: 1 | 2;
  /** Peso na divisão de largura da faixa (só a partir de `sm`). */
  grow: string;
  /** Altura e ancoragem — é o que cria o degrau entre as fotos da faixa. */
  step: string;
  /** Proporção no empilhamento do celular, onde não existem faixas. */
  mobileRatio: string;
  /** Recorte vertical, quando o centro não é o melhor ponto. */
  objectPosition?: string;
};

export const aboutGallery: GalleryImage[] = [
  {
    src: "/images/profiles.jpg",
    alt: "Vinicius Rampazzo",
    speed: 1,
    band: 1,
    grow: "sm:flex-1",
    step: "sm:h-full",
    mobileRatio: "aspect-[3/4]",
    objectPosition: "center 35%",
  },
  {
    src: "/images/about-ctf-01.jpg",
    alt: "Vinicius durante a competição CTF, com terminal Kali Linux na tela",
    speed: 1.22,
    band: 1,
    grow: "sm:flex-1",
    step: "sm:h-[94%] sm:self-start",
    mobileRatio: "aspect-[3/4]",
  },
  {
    src: "/images/about-ctf-03.jpg",
    alt: "Equipe premiada no FIAP Next",
    speed: 0.9,
    band: 2,
    grow: "sm:flex-[1.7]",
    step: "sm:h-full",
    mobileRatio: "aspect-[4/3]",
  },
  {
    src: "/images/about-ctf-02.jpg",
    alt: "Mesa de competição durante o CTF",
    speed: 1.14,
    band: 2,
    grow: "sm:flex-1",
    step: "sm:h-[92%] sm:self-end",
    mobileRatio: "aspect-[3/4]",
  },
];

/** Ocupa a coluna entre as duas primeiras fotos — o vazio vira legenda. */
export const aboutGalleryCaption = {
  label: "Registros",
  // Linhas curtas: a coluna é estreita e a caixa-alta com entreletra larga do
  // type-label quebra qualquer linha maior que isso.
  lines: ["CTF Next Brasil", "FIAP Next", "São Paulo"],
};
