"use client";

import { useCallback } from "react";
import * as THREE from "three";
import { ThreeCanvas, type SceneFactory } from "./ThreeCanvas";

/**
 * O único momento WebGL do site.
 *
 * Um icosaedro em wireframe que respira, gira com o ponteiro e se deforma
 * conforme a página rola. Fica em primeiro plano, entre as linhas do nome —
 * ao contrário das camadas ambientes da versão anterior, que custavam GPU
 * escondidas atrás de texto e não eram percebidas por ninguém.
 *
 * A deformação é feita no vértice, em JavaScript, sobre uma geometria de
 * poucos polígonos: não exige shader próprio e roda folgado a 60 fps.
 */
export function HeroObject({ className }: { className?: string }) {
  const createScene = useCallback<SceneFactory>(({ scene, camera }) => {
    camera.position.z = 5.4;

    const group = new THREE.Group();
    scene.add(group);

    const detail = 3;
    const geometry = new THREE.IcosahedronGeometry(1.85, detail);
    const basePositions = Float32Array.from(
      geometry.getAttribute("position").array
    );

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x22d3ee),
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    // Casca interna sólida e escura, para o wireframe ler como volume e não
    // como emaranhado de linhas.
    const shellGeometry = new THREE.IcosahedronGeometry(1.78, detail);
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x080808),
      transparent: true,
      opacity: 0.82,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    group.add(shell);

    const pointer = new THREE.Vector2(0, 0);
    const smoothed = new THREE.Vector2(0, 0);
    const dragVelocity = new THREE.Vector2(0, 0);
    let isDragging = false;
    let lastPointer: { x: number; y: number } | null = null;
    let scrollProgress = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1)
      );
      if (isDragging && lastPointer) {
        dragVelocity.x += (event.clientY - lastPointer.y) * 0.00035;
        dragVelocity.y += (event.clientX - lastPointer.x) * 0.00035;
      }
      lastPointer = { x: event.clientX, y: event.clientY };
    };

    const onPointerDown = (event: PointerEvent) => {
      isDragging = true;
      lastPointer = { x: event.clientX, y: event.clientY };
    };
    const onPointerUp = () => {
      isDragging = false;
      lastPointer = null;
    };

    const onScroll = () => {
      const max = window.innerHeight;
      scrollProgress = Math.min(window.scrollY / max, 1);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const vertex = new THREE.Vector3();
    const count = attribute.count;

    return {
      update: (elapsed) => {
        smoothed.lerp(pointer, 0.05);

        // Deformação: ondas nos vértices, amplificadas conforme a página rola.
        const amplitude = 0.09 + scrollProgress * 0.22;
        for (let i = 0; i < count; i++) {
          vertex.set(
            basePositions[i * 3],
            basePositions[i * 3 + 1],
            basePositions[i * 3 + 2]
          );
          const noise =
            Math.sin(vertex.x * 2.1 + elapsed * 0.9) *
            Math.cos(vertex.y * 1.9 + elapsed * 0.7) *
            Math.sin(vertex.z * 2.3 + elapsed * 0.5);
          const scale = 1 + noise * amplitude;
          attribute.setXYZ(
            i,
            vertex.x * scale,
            vertex.y * scale,
            vertex.z * scale
          );
        }
        attribute.needsUpdate = true;

        // Inércia do arrasto: o objeto continua girando depois de solto.
        dragVelocity.multiplyScalar(0.94);
        group.rotation.x += dragVelocity.x + 0.0012;
        group.rotation.y += dragVelocity.y + 0.0022;

        // Acompanha o ponteiro de leve, mesmo sem arrasto.
        group.rotation.x += (smoothed.y * 0.25 - group.rotation.x % 0.25) * 0.004;
        group.position.y = Math.sin(elapsed * 0.5) * 0.09 - scrollProgress * 1.4;

        const shrink = 1 - scrollProgress * 0.25;
        group.scale.setScalar(shrink);
        material.opacity = 0.32 * (1 - scrollProgress * 0.85);
        shellMaterial.opacity = 0.82 * (1 - scrollProgress * 0.9);
      },
      dispose: () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("scroll", onScroll);
        shellGeometry.dispose();
        shellMaterial.dispose();
      },
    };
  }, []);

  return <ThreeCanvas createScene={createScene} className={className} />;
}
