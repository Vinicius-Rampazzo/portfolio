"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type SceneHandle = {
  /** Chamado a cada frame enquanto a cena está visível. */
  update?: (elapsed: number, delta: number) => void;
  /** Chamado quando o contêiner muda de tamanho. */
  resize?: (width: number, height: number) => void;
  /** Libera geometrias, materiais e texturas criados pela cena. */
  dispose?: () => void;
};

export type SceneFactory = (context: {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  width: number;
  height: number;
}) => SceneHandle;

/**
 * Casca compartilhada das cenas 3D.
 *
 * Concentra o que é fácil errar em WebGL dentro de uma SPA:
 *
 * - o loop de render **pausa** quando a seção sai da tela, para não gastar
 *   GPU animando o que ninguém vê;
 * - geometrias, materiais e o próprio renderer são descartados no unmount —
 *   sem isso cada remontagem vaza memória de vídeo até o contexto WebGL cair;
 * - `devicePixelRatio` é limitado a 2, porque acima disso o custo cresce sem
 *   ganho visual perceptível.
 *
 * Quem decide *se* deve montar é quem usa (useCanRender3D): aqui já se
 * assume que a decisão foi tomada.
 */
export function ThreeCanvas({
  createScene,
  className,
  ariaLabel,
}: {
  createScene: SceneFactory;
  className?: string;
  ariaLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    if (width === 0 || height === 0) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 6;

    const handle = createScene({ scene, camera, renderer, width, height });

    const clock = new THREE.Clock();
    let frameId = 0;
    let visible = true;

    const renderFrame = () => {
      frameId = requestAnimationFrame(renderFrame);
      const delta = clock.getDelta();
      handle.update?.(clock.elapsedTime, delta);
      renderer.render(scene, camera);
    };

    const start = () => {
      if (frameId) return;
      clock.getDelta(); // descarta o intervalo acumulado durante a pausa
      frameId = requestAnimationFrame(renderFrame);
    };
    const stop = () => {
      if (!frameId) return;
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    // Só roda enquanto a seção estiver em tela.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      handle.resize?.(width, height);
    });
    resizeObserver.observe(container);

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);

      handle.dispose?.();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry?.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material?.dispose();
        }
      });
      scene.clear();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [createScene]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    />
  );
}
