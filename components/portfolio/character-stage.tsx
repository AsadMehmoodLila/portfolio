"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "@/components/theme-controls";

export function CharacterStage() {
  const host = useRef<HTMLButtonElement>(null);
  const engine = useRef<{ draw: () => void; start: () => void } | null>(null);
  const state = useRef({ playing: false, lit: true, yaw: -0.24, night: true });
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [entered, setEntered] = useState(false);
  const { night } = useTheme();
  const help = useId();
  const dragged = useRef(false);
  useEffect(() => {
    const arrival = setTimeout(() => setEntered(true), 180);
    return () => clearTimeout(arrival);
  }, []);
  const triggerDance = () => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    state.current.playing = !state.current.playing;
    setPlaying(state.current.playing);
    setActive(true);
    engine.current?.draw();
  };

  useEffect(() => {
    state.current.night = night;
    engine.current?.draw();
  }, [night]);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (preference.matches) {
        state.current.playing = false;
        setPlaying(false);
        engine.current?.draw();
      }
    };
    preference.addEventListener("change", update);
    return () => {
      preference.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const element = host.current;
    if (!active || !element) return;
    let disposed = false,
      frame = 0,
      visible = true,
      dirty = true,
      previous = 0;
    let cleanup = () => {};
    async function initialise() {
      const THREE = await import("three");
      const { GLTFLoader } = await import(
        "three/examples/jsm/loaders/GLTFLoader.js"
      );
      if (disposed) return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 30);
      camera.position.set(0, 1.7, 4.6);
      camera.lookAt(0, 0.85, 0);
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
        preserveDrawingBuffer: new URLSearchParams(location.search).has(
          "render-character",
        ),
      });
      renderer.setPixelRatio(
        Math.min(devicePixelRatio, innerWidth < 700 ? 1.25 : 1.5),
      );
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.setAttribute("aria-hidden", "true");
      element!.appendChild(renderer.domElement);
      const pivot = new THREE.Group();
      scene.add(pivot);
      const ambient = new THREE.HemisphereLight(0xd4e9ff, 0x252933, 2);
      scene.add(ambient);
      const key = new THREE.DirectionalLight(0xffddba, 4.1);
      key.position.set(-3, 5, 4);
      key.castShadow = true;
      key.shadow.mapSize.set(512, 512);
      key.shadow.camera.left = -2;
      key.shadow.camera.right = 2;
      key.shadow.camera.top = 3;
      key.shadow.camera.bottom = -2;
      key.shadow.bias = -0.0007;
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x89bbff, 4.5);
      rim.position.set(3, 2, -2);
      scene.add(rim);
      const plinthMaterial = new THREE.MeshStandardMaterial({
        color: 0x242b39,
        roughness: 0.7,
        metalness: 0.25,
      });
      const plinth = new THREE.Mesh(
        new THREE.CylinderGeometry(0.81, 0.94, 0.13, 6),
        plinthMaterial,
      );
      plinth.position.y = -0.07;
      plinth.receiveShadow = true;
      scene.add(plinth);
      const edgeMaterial = new THREE.MeshBasicMaterial({ color: 0xffa357 });
      const edge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 0.95, 0.022, 6),
        edgeMaterial,
      );
      edge.position.y = -0.135;
      scene.add(edge);
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 8),
        new THREE.ShadowMaterial({ opacity: 0.22 }),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.15;
      floor.receiveShadow = true;
      scene.add(floor);
      const disposeTree = (root: import("three").Object3D) => {
        const textures = new Set<import("three").Texture>();
        const materials = new Set<import("three").Material>();
        const geometries = new Set<import("three").BufferGeometry>();
        root.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            geometries.add(object.geometry);
            (Array.isArray(object.material)
              ? object.material
              : [object.material]
            ).forEach((material) => {
              materials.add(material);
              Object.values(material).forEach((value) => {
                if (value instanceof THREE.Texture) textures.add(value);
              });
            });
          }
        });
        textures.forEach((texture) => texture.dispose());
        materials.forEach((material) => material.dispose());
        geometries.forEach((geometry) => geometry.dispose());
      };
      let mixer: import("three").AnimationMixer | undefined;
      const tick = (now: number) => {
        frame = 0;
        if (disposed || !visible || document.hidden) return;
        const moving = state.current.playing;
        if (moving && now - previous < 1000 / 30) {
          schedule();
          return;
        }
        const delta = Math.min((now - previous) / 1000, 0.05);
        previous = now;
        if (moving || dirty) {
          const { night: dark, lit: lights } = state.current;
          ambient.intensity = lights ? (dark ? 1.5 : 2.4) : 0.5;
          key.intensity = lights ? 4.1 : 0.45;
          rim.intensity = lights ? (dark ? 4.5 : 2.3) : 0.1;
          plinthMaterial.color.set(dark ? 0x242b39 : 0x9c8059);
          edgeMaterial.color.set(lights ? 0xffa357 : 0x596572);
          if (moving) mixer?.update(delta);
          pivot.rotation.y = state.current.yaw;
          renderer.render(scene, camera);
          dirty = false;
        }
        if (moving) schedule();
      };
      function schedule() {
        if (!frame && !disposed && visible && !document.hidden)
          frame = requestAnimationFrame(tick);
      }
      const draw = () => {
        dirty = true;
        schedule();
      };
      const resize = () => {
        const { width, height } = element!.getBoundingClientRect();
        renderer.setSize(width, height);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        draw();
      };
      const sizeObserver = new ResizeObserver(resize);
      sizeObserver.observe(element!);
      resize();
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          previous = performance.now();
          draw();
        } else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      });
      intersection.observe(element!);
      const visibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(frame);
          frame = 0;
        } else {
          previous = performance.now();
          draw();
        }
      };
      document.addEventListener("visibilitychange", visibility);
      let startX = 0,
        startYaw = 0,
        dragging = false;
      const down = (event: PointerEvent) => {
        dragged.current = false;
        if (event.pointerType !== "mouse") return;
        dragging = true;
        startX = event.clientX;
        startYaw = state.current.yaw;
      };
      const move = (event: PointerEvent) => {
        if (dragging && Math.abs(event.clientX - startX) > 5) {
          dragged.current = true;
          state.current.yaw = startYaw + (event.clientX - startX) * 0.012;
          draw();
        }
      };
      const up = () => {
        dragging = false;
      };
      const keys = (event: KeyboardEvent) => {
        if (["ArrowLeft", "ArrowRight", "Home"].includes(event.key)) {
          event.preventDefault();
          state.current.yaw =
            event.key === "Home"
              ? -0.24
              : state.current.yaw + (event.key === "ArrowLeft" ? -0.2 : 0.2);
          draw();
        }
      };
      element!.addEventListener("pointerdown", down);
      element!.addEventListener("pointermove", move);
      element!.addEventListener("pointerup", up);
      element!.addEventListener("pointercancel", up);
      element!.addEventListener("pointerleave", up);
      element!.addEventListener("keydown", keys);
      engine.current = { draw, start: schedule };
      cleanup = () => {
        cancelAnimationFrame(frame);
        sizeObserver.disconnect();
        intersection.disconnect();
        document.removeEventListener("visibilitychange", visibility);
        element!.removeEventListener("pointerdown", down);
        element!.removeEventListener("pointermove", move);
        element!.removeEventListener("pointerup", up);
        element!.removeEventListener("pointercancel", up);
        element!.removeEventListener("pointerleave", up);
        element!.removeEventListener("keydown", keys);
        mixer?.stopAllAction();
        disposeTree(scene);
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
        engine.current = null;
      };
      const gltf = await new GLTFLoader().loadAsync(
        "/media/scriptlilla-dance.glb",
      );
      if (disposed) {
        disposeTree(gltf.scene);
        return;
      }
      const model = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(model);
      model.scale.multiplyScalar(1.7 / (bounds.max.y - bounds.min.y));
      const adjusted = new THREE.Box3().setFromObject(model);
      model.position.x -= (adjusted.min.x + adjusted.max.x) / 2;
      model.position.z -= (adjusted.min.z + adjusted.max.z) / 2;
      model.position.y -= adjusted.min.y;
      model.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
        }
      });
      pivot.add(model);
      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();
        mixer.setTime(0.8);
      }
      setReady(true);
      previous = performance.now();
      draw();
    }
    initialise().catch(() => {
      if (!disposed) {
        setFailed(true);
        setPlaying(false);
        state.current.playing = false;
        cleanup();
      }
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [active]);

  return (
    <div
      className="character-stage"
      data-ready={ready}
      data-dancing={playing}
      data-entered={entered}
    >
      <div className="character-world">
        <div className="world-ring" aria-hidden />
        <span className="spawn-ripple" aria-hidden />
        <noscript>
          <img className="character-static" src="/media/character-scriptlilla.webp" width={700} height={1050} alt="ScriptLilla's game avatar wearing a green plaid cap and charcoal outfit" />
        </noscript>
        <button
          type="button"
          ref={host}
          className="character-canvas"
          onClick={triggerDance}
          aria-label={
            playing ? "Stop ScriptLilla dancing" : "Make ScriptLilla dance"
          }
          aria-pressed={playing}
          aria-describedby={help}
          data-state={failed ? "fallback" : ready ? "ready" : "preview"}
        >
          {!ready && (
            <img
              src="/media/character-scriptlilla.webp"
              width={800}
              height={900}
              alt=""
              fetchPriority="high"
            />
          )}
        </button>
      </div>
      <p id={help} className="sr-only">
        Click or press Enter or Space on the character to start or stop its
        dance. Drag with a mouse, or use Left and Right arrow keys to turn. Home
        resets the view.
        {failed &&
          " Interactive rendering is unavailable; a still preview is shown."}
      </p>
    </div>
  );
}
