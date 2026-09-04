import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next build` e `next dev` compartilham o mesmo diretório por padrão, e
  // buildar com o dev server no ar corrompe o `.next` dele (ENOENT nos
  // manifests). Definir NEXT_DIST_DIR permite verificar o build de produção
  // sem derrubar quem estiver com o dev aberto.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    // A partir do Next 16 só os valores declarados aqui são aceitos; sem esta
    // lista, todo `quality` usado nos componentes vira aviso agora e erro
    // depois. São os valores efetivamente usados no site.
    qualities: [82, 85, 88, 90, 95],
  },
};

export default nextConfig;
