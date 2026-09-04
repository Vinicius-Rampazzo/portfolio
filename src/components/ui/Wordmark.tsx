/**
 * Wordmark "RAMPAZZO" em vetor.
 *
 * Os paths originais vinham com `fill="#FFFFFF"` fixo; aqui o preenchimento é
 * `currentColor`, então a mesma peça serve a qualquer contexto herdando a cor
 * do pai — branco no menu, cyan no hover do header — sem duplicar arquivo.
 *
 * Inline em vez de <img src="...svg"> por dois motivos: a cor passa a ser
 * controlável por CSS, e não há uma segunda requisição de rede.
 *
 * Proporção do viewBox: 2161 × 728 (≈ 2,97:1). Dimensione pela altura ou pela
 * largura, nunca pelos dois, para não distorcer.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 2161 728"
      className={className}
      // Um wordmark é conteúdo textual: sem isto o nome simplesmente some
      // para quem navega por leitor de tela.
      role="img"
      aria-label="Rampazzo"
      fill="currentColor"
      fillRule="evenodd"
    >
      <path d="M 1649 46 L 1649 134 L 1718 134 L 1719 142 L 1648 576 L 1648 681 L 1843 681 L 1843 588 L 1772 587 L 1843 156 L 1843 46 Z " />
      <path d="M 1440 46 L 1440 134 L 1510 134 L 1511 142 L 1439 579 L 1439 681 L 1634 681 L 1634 588 L 1565 588 L 1635 153 L 1635 46 Z " />
      <path d="M 88 48 L 63 66 L 53 92 L 53 681 L 173 681 L 174 382 L 187 390 L 193 405 L 194 681 L 317 681 L 317 388 L 312 372 L 299 358 L 317 323 L 316 93 L 312 79 L 295 57 L 271 46 Z M 174 101 L 184 102 L 189 107 L 192 113 L 192 118 L 193 119 L 193 310 L 192 311 L 191 319 L 189 323 L 183 330 L 178 333 L 174 333 L 173 332 L 173 102 Z " />
      <path d="M 1897 47 L 1879 56 L 1868 67 L 1858 96 L 1860 641 L 1865 654 L 1879 670 L 1904 681 L 2067 679 L 2085 670 L 2095 660 L 2106 632 L 2104 83 L 2091 61 L 2062 46 Z M 1970 106 L 1981 107 L 1986 112 L 1989 122 L 1989 617 L 1980 627 L 1975 627 L 1970 622 L 1969 582 Z " />
      <path d="M 1228 46 L 1204 62 L 1194 97 L 1195 681 L 1301 681 L 1302 398 L 1313 400 L 1321 415 L 1321 681 L 1424 681 L 1422 78 L 1406 53 L 1384 45 Z M 1309 102 L 1315 106 L 1319 115 L 1320 303 L 1319 304 L 1319 333 L 1318 336 L 1312 343 L 1306 346 L 1302 346 L 1300 342 L 1300 333 L 1301 332 L 1301 323 L 1300 322 L 1300 285 L 1301 284 L 1301 105 L 1304 102 Z " />
      <path d="M 936 45 L 936 681 L 1042 681 L 1042 401 L 1137 397 L 1155 388 L 1173 364 L 1177 338 L 1176 92 L 1166 67 L 1150 53 L 1131 46 Z M 1044 102 L 1054 103 L 1060 108 L 1063 114 L 1063 332 L 1062 336 L 1056 343 L 1047 346 L 1043 345 L 1043 103 Z " />
      <path d="M 588 45 L 587 681 L 662 681 L 663 281 L 681 681 L 810 681 L 828 275 L 832 680 L 919 681 L 919 45 L 765 46 L 755 339 L 746 352 L 734 45 Z " />
      <path d="M 373 46 L 346 64 L 335 95 L 335 681 L 447 681 L 448 398 L 458 400 L 466 412 L 466 681 L 570 681 L 568 79 L 560 62 L 536 46 Z M 455 102 L 462 108 L 465 119 L 465 325 L 464 326 L 464 335 L 462 339 L 457 344 L 450 347 L 447 347 L 446 346 L 446 106 L 450 102 Z " />
    </svg>
  );
}
