'use client';

import { useEffect, useRef } from 'react';
import styles from './architectural-a.module.css';

export default function ArchitecturalA() {
  const host = useRef(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    let cleanup = () => {};

    async function mount() {
      const T = await import('three');
      if (cancelled) return;
      let renderer;
      try {
        renderer = new T.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
      } catch {
        return;
      }

      const scene = new T.Scene();
      scene.background = new T.Color('#f5f3ef');
      const camera = new T.PerspectiveCamera(36, 1, 0.1, 100);
      camera.position.set(9, 4.1, 15);
      camera.lookAt(0.1, 4.15, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = T.PCFShadowMap;
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      element.appendChild(renderer.domElement);

      const red = new T.MeshPhysicalMaterial({ color: '#d40009', roughness: 0.29, metalness: 0.12, clearcoat: 0.35, clearcoatRoughness: 0.27 });
      const concrete = new T.MeshStandardMaterial({ color: '#e7e5e0', roughness: 0.88 });
      const floorMaterial = new T.MeshStandardMaterial({ color: '#e3e0db', roughness: 0.45 });
      const floor = new T.Mesh(new T.PlaneGeometry(60, 60), floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);

      function block(w, h, d, x, y, z, material) {
        const mesh = new T.Mesh(new T.BoxGeometry(w, h, d), material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        return mesh;
      }

      // Large concrete facade panels with narrow construction joints.
      for (let col = -4; col <= 4; col++) {
        for (let row = 0; row < 4; row++) {
          block(2.38, 2.68, 0.55, col * 2.4, row * 2.7 + 1.35, -2.4, concrete);
        }
      }
      // The monument is a single extruded architectural profile, not flat text.
      const shape = new T.Shape();
      shape.moveTo(-3.75, 0);
      shape.lineTo(-0.65, 8.8);
      shape.lineTo(0.65, 8.8);
      shape.lineTo(3.75, 0);
      shape.lineTo(2.35, 0);
      shape.lineTo(0, 6.65);
      shape.lineTo(-2.35, 0);
      shape.closePath();

      const geometry = new T.ExtrudeGeometry(shape, {
        depth: 1.65, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025, bevelSegments: 2, steps: 1,
      });
      const monument = new T.Mesh(geometry, red);
      monument.position.set(0, 0.03, -0.55);
      monument.castShadow = true;
      monument.receiveShadow = true;
      scene.add(monument);

      // The reference uses nested, angular portals instead of a conventional crossbar.
      const inset = new T.Mesh(geometry, red);
      inset.scale.set(0.73, 0.73, 0.78);
      inset.position.set(0.05, 0.03, -1.32);
      inset.castShadow = true;
      inset.receiveShadow = true;
      scene.add(inset);

      scene.add(new T.HemisphereLight('#ffffff', '#8c8278', 1.65));
      const sun = new T.DirectionalLight('#fff9f3', 3.2);
      sun.position.set(-7, 12, 6);
      sun.castShadow = true;
      sun.shadow.mapSize.set(1024, 1024);
      sun.shadow.camera.left = -10;
      sun.shadow.camera.right = 10;
      sun.shadow.camera.top = 12;
      sun.shadow.camera.bottom = -9;
      sun.shadow.normalBias = 0.035;
      sun.target.position.set(0, 3.8, 0);
      scene.add(sun, sun.target);
      const fill = new T.DirectionalLight('#ffffff', 0.75);
      fill.position.set(7, 5, 3);
      scene.add(fill);

      let frame = 0;
      function draw() {
        const width = element.clientWidth;
        const height = element.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.fov = camera.aspect < 0.8 ? 47 : 36;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
      });
      observer.observe(element);
      draw();

      cleanup = () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        const geometries = new Set();
        const materials = new Set();
        scene.traverse((object) => {
          if (object.geometry) geometries.add(object.geometry);
          if (object.material) materials.add(object.material);
        });
        geometries.forEach((item) => item.dispose());
        materials.forEach((item) => item.dispose());
        sun.shadow.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }
    void mount().catch(() => { /* The hero remains readable without WebGL. */ });
    return () => { cancelled = true; cleanup(); };
  }, []);

  return <div ref={host} className={styles.scene} aria-hidden="true" />;
}
