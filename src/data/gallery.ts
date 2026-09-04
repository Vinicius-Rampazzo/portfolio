/**
 * Galeria do "Sobre".
 *
 * A primeira é o retrato; as demais são fotos legítimas do CTF Next Brasil,
 * que dizem mais sobre o trabalho do que imagens de banco de imagem.
 */
export type GalleryImage = {
  src: string;
  alt: string;
  /** Velocidade no parallax. 1 acompanha a página; acima disso sobe antes. */
  speed: number;
  /**
   * Orientação real do arquivo. Uma foto paisagem numa cela retrato perde 44%
   * da largura no recorte — no caso da foto de grupo, isso decepava metade
   * das pessoas.
   */
  orientation?: "portrait" | "landscape";
};

export const aboutGallery: GalleryImage[] = [
  {
    src: "/images/profiles.jpg",
    alt: "Vinicius Rampazzo",
    speed: 1,
    orientation: "portrait",
  },
  {
    src: "/images/about-ctf-01.jpg",
    alt: "Vinicius durante a competição CTF, com terminal Kali Linux na tela",
    speed: 1.22,
    orientation: "portrait",
  },
  {
    src: "/images/about-ctf-02.jpg",
    alt: "Mesa de competição durante o CTF",
    speed: 0.86,
    orientation: "portrait",
  },
  {
    src: "/images/about-ctf-03.jpg",
    alt: "Equipe premiada no FIAP Next",
    speed: 1.14,
    orientation: "landscape",
  },
];
