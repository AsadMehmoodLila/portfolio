"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowCounterClockwise,
  ArrowsHorizontal,
  Cube,
  Lightbulb,
  Pause,
  Play,
} from "@phosphor-icons/react";
import { useTheme } from "@/components/theme-controls";

export function CharacterStage() {
  const host = useRef<HTMLDivElement>(null);
  const engine = useRef<{ draw: () => void; start: () => void } | null>(null);
  const state = useRef({ playing: false, lit: true, yaw: -0.24, night: true });
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [lit, setLit] = useState(true);
  const { night } = useTheme();
  const help = useId();

  useEffect(() => {
    state.current.night = night;
    engine.current?.draw();
  }, [night]);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const update = () => {
      state.current.playing = !preference.matches && !connection?.saveData;
      setPlaying(state.current.playing);
      if (state.current.playing) engine.current?.start();
      else engine.current?.draw();
    };
    update();
    preference.addEventListener("change", update);
    const timeout = window.setTimeout(() => {
      if (
        !preference.matches &&
        !connection?.saveData &&
        window.matchMedia("(min-width:700px)").matches
      )
        setActive(true);
    }, 1400);
    return () => {
      clearTimeout(timeout);
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
      const { GLTFLoader } =
        await import("three/examples/jsm/loaders/GLTFLoader.js");
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
          plinthMaterial.color.set(dark ? 0x242b39 : 0xb7c4d5);
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
        dragging = true;
        startX = event.clientX;
        startYaw = state.current.yaw;
        element!.setPointerCapture(event.pointerId);
      };
      const move = (event: PointerEvent) => {
        if (dragging) {
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
        element!.removeEventListener("keydown", keys);
        mixer?.stopAllAction();
        disposeTree(scene);
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
        engine.current = null;
      };
      const gltf = await new GLTFLoader().loadAsync("/media/avatar-dance.glb");
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
    <div className="character-stage" data-ready={ready} data-lit={lit}>
      <div className="stage-header">
        <span>
          <Cube size={15} aria-hidden />
          Player profile
        </span>
        <strong>@scriptlilla</strong>
      </div>
      <div className="character-world">
        <span className="world-word" aria-hidden>
          PLAY
        </span>
        <div className="world-ring" aria-hidden />
        <div className="world-orbit" aria-hidden />
        <div className="world-spark spark-a" aria-hidden />
        <div className="world-spark spark-b" aria-hidden />
        <div className="world-spark spark-c" aria-hidden />
        <div
          ref={host}
          className="character-canvas"
          tabIndex={ready ? 0 : -1}
          role="img"
          aria-label="Interactive game-style character on a lit platform"
          aria-describedby={help}
          data-state={failed ? "fallback" : ready ? "ready" : "preview"}
        >
          {!ready && (
            <img
              src="/media/character-stage.webp"
              width={800}
              height={900}
              alt=""
              fetchPriority="high"
            />
          )}
        </div>
        {!active && (
          <button
            type="button"
            className="character-activate"
            onClick={() => setActive(true)}
          >
            Explore character <Play weight="fill" size={14} aria-hidden />
          </button>
        )}
        <div className="world-id">
          <span>CLASS</span>
          <strong>Roblox scripter</strong>
        </div>
      </div>
      <div className="character-toolbar">
        <span className="character-hint">
          <ArrowsHorizontal size={15} aria-hidden />
          Drag to rotate
        </span>
        <div className="character-controls">
          <button
            type="button"
            onClick={() => {
              state.current.lit = !lit;
              setLit(!lit);
              engine.current?.draw();
            }}
            disabled={!ready}
            aria-pressed={lit}
            aria-label={
              lit ? "Turn avatar lights off" : "Turn avatar lights on"
            }
            title="Stage lights"
          >
            <Lightbulb
              size={19}
              weight={lit ? "fill" : "regular"}
              aria-hidden
            />
          </button>
          <button
            type="button"
            onClick={() => {
              state.current.playing = !playing;
              setPlaying(!playing);
              engine.current?.draw();
            }}
            disabled={!ready}
            aria-pressed={playing}
            aria-label={playing ? "Pause dance" : "Play dance"}
            title="Character motion"
          >
            {playing ? (
              <Pause size={18} weight="fill" aria-hidden />
            ) : (
              <Play size={18} weight="fill" aria-hidden />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              state.current.yaw = -0.24;
              engine.current?.draw();
            }}
            disabled={!ready}
            aria-label="Reset avatar view"
            title="Reset view"
          >
            <ArrowCounterClockwise size={19} aria-hidden />
          </button>
        </div>
      </div>
      <p id={help} className="sr-only">
        Drag to rotate, or focus the character and use Left and Right arrow
        keys. Home resets the view. Lights and motion can be changed
        independently.
        {failed &&
          " Interactive rendering is unavailable; a still preview is shown."}
      </p>
    </div>
  );
}
