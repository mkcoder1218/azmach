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
    let timer = 0;
    let idle = 0;
    let visibilityObserver;
    const connection = navigator.connection;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 900px), (pointer: coarse)');
    if (reduced.matches || compact.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '') || (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)) return;
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
    if (!gl) return;
    gl.getExtension('WEBGL_lose_context')?.loseContext();

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
      const highQuality = (navigator.hardwareConcurrency || 8) >= 8 && (navigator.deviceMemory || 8) >= 8;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, highQuality ? 1.5 : 1));
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
      sun.shadow.mapSize.set(highQuality ? 1024 : 512, highQuality ? 1024 : 512);
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
      let visible = true;
      const fallback = element.querySelector('[data-fallback]');
      const lost = (event) => { event.preventDefault(); renderer.domElement.hidden = true; if (fallback) fallback.hidden = false; };
      renderer.domElement.addEventListener('webglcontextlost', lost);
      function draw() {
        const width = element.clientWidth;
        const height = element.clientHeight;
        if (!visible || document.hidden || !width || !height || renderer.getContext().isContextLost()) return;
        camera.aspect = width / height;
        camera.fov = camera.aspect < 0.8 ? 47 : 36;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        renderer.render(scene, camera);
        if (fallback) fallback.hidden = true;
      }
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
      });
      observer.observe(element);
      const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) draw(); });
      intersection.observe(element);
      document.addEventListener('visibilitychange', draw);
      draw();

      cleanup = () => {
        observer.disconnect();
        intersection.disconnect();
        document.removeEventListener('visibilitychange', draw);
        renderer.domElement.removeEventListener('webglcontextlost', lost);
        if (fallback) fallback.hidden = false;
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
    const start = () => {
      if (cancelled) return;
      const run = () => { if (!cancelled) void mount().catch(() => {}); };
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(run, { timeout: 2500 });
      else timer = window.setTimeout(run, 1200);
    };
    visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { visibilityObserver.disconnect(); start(); }
    });
    visibilityObserver.observe(element);
    return () => { cancelled = true; visibilityObserver.disconnect(); window.clearTimeout(timer); if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle); cleanup(); };
  }, []);

  return (
    <div ref={host} className={styles.scene} aria-hidden="true">
      <svg data-fallback="" className={styles.fallback} viewBox="0 0 640 640" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="a-face" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ef2630"/><stop offset="1" stopColor="#b2000a"/></linearGradient>
          <linearGradient id="a-wall" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#faf9f6"/><stop offset="1" stopColor="#d9d5cf"/></linearGradient>
          <linearGradient id="a-floor" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#dedbd5"/><stop offset="1" stopColor="#f5f3ef"/></linearGradient>
        </defs>
        <path fill="url(#a-wall)" d="M0 0H640V510H0Z"/>
        <path stroke="#c9c6c0" strokeWidth="1" opacity=".7" d="M120 0V510M280 0V510M440 0V510M600 0V510M0 170H640M0 340H640"/>
        <path fill="url(#a-floor)" d="M0 510H640V640H0Z"/>
        <path fill="#88817b" opacity=".15" d="M120 510L540 510L620 555L230 550Z"/>
        <path fill="#7e0008" d="M300 68L350 45L550 486L500 510L310 95Z"/>
        <path fill="#96000b" d="M300 68L350 45L178 486L128 510Z"/>
        <path fill="#a1000a" d="M321 200L345 184L470 486H426L320 248L218 486H170Z"/>
        <path fill="url(#a-face)" d="M128 510L300 68H342L514 510H448L321 170L194 510Z"/>
        <path fill="#7d0008" d="M448 510L514 510L550 486L484 486Z"/>
      </svg>
    </div>
  );
}
