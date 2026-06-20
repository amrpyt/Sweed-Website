"use client";

import { useEffect, useRef } from "react";
import styles from "./chess-3d-section.module.css";

export function Chess3DSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frame = 0;
    let disposed = false;
    let cleanupScene = () => {};

    const mountScene = async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { DRACOLoader } = await import("three/examples/jsm/loaders/DRACOLoader.js");

      if (disposed || !canvasRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas,
        powerPreference: "high-performance",
      });

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.65;

      scene.add(new THREE.AmbientLight(0xffffff, 2.2));

      const keyLight = new THREE.DirectionalLight(0xffffff, 3.6);
      keyLight.position.set(3, 4, 5);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xed2062, 1.1);
      rimLight.position.set(-4, 2, -3);
      scene.add(rimLight);

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      const gltf = await loader.loadAsync("/models/chess-3d.glb");

      if (disposed) return;

      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      model.position.sub(center);
      model.rotation.y = -0.35;

      model.traverse((node) => {
        if (!(node instanceof THREE.Mesh)) return;
        node.material = new THREE.MeshStandardMaterial({
          color: 0xe4e4ee,
          metalness: 0.62,
          roughness: 0.24,
        });
      });

      scene.add(model);

      const fitCamera = () => {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;

        const maxDim = Math.max(size.x, size.y, size.z);
        const distance = maxDim * (width < 520 ? 2.55 : width < 860 ? 2.35 : 2.1);
        camera.position.set(0, maxDim * 0.18, distance);
        camera.lookAt(0, maxDim * 0.06, 0);
        camera.updateProjectionMatrix();
      };

      const resizeObserver = new ResizeObserver(fitCamera);
      resizeObserver.observe(canvas);
      fitCamera();

      const render = () => {
        model.rotation.y += 0.008;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };

      render();

      cleanupScene = () => {
        resizeObserver.disconnect();
        cancelAnimationFrame(frame);
        scene.traverse((node) => {
          if (!(node instanceof THREE.Mesh)) return;
          node.geometry.dispose();
          if (Array.isArray(node.material)) {
            node.material.forEach((material) => material.dispose());
          } else {
            node.material.dispose();
          }
        });
        renderer.dispose();
        dracoLoader.dispose();
      };
    };

    mountScene().catch((error) => {
      console.error("Failed to render 3D chess model", error);
    });

    return () => {
      disposed = true;
      cleanupScene();
    };
  }, []);

  return (
    <section className={styles.section} aria-label="SWEED 3D strategy board">
      <div className={styles.inner}>
        <div className={styles.viewerShell}>
          <canvas ref={canvasRef} className={styles.viewer} aria-label="Rotating 3D chess horse" />
        </div>

        <div className={styles.copy}>
          <span className={styles.eyebrow}>SWEED STRATEGY</span>
          <h2 className={styles.title}>نحرك البراند بخطة واضحة</h2>
          <p className={styles.summary}>
            كل خطوة في التسويق والتصميم لها هدف. نبني لك نظام يربط الهوية، المحتوى، والإعلانات في اتجاه واحد.
          </p>
        </div>
      </div>
    </section>
  );
}
