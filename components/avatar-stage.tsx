"use client";

import { useEffect, useRef, useState } from "react";
import { avatar } from "@/data/avatar";
import { useTheme } from "@/components/theme-controls";
import { LightIcon, ResetViewIcon } from "@/components/ui/icons";

type StageControls = { paused: boolean; reduced: boolean; dragging: boolean; yaw: number; night: boolean; lit: boolean };

export function AvatarStage() {
  const host = useRef<HTMLDivElement>(null);
  const controls = useRef<StageControls>({ paused: true, reduced: false, dragging: false, yaw: -0.2, night: false, lit: true });
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [lit, setLit] = useState(true);
  const { night } = useTheme();
  useEffect(() => { controls.current.night = night; }, [night]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let frame = 0;
    let cleanup: (() => void) | undefined;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const changePreference = () => {
      controls.current.reduced = preference.matches;
      controls.current.paused = preference.matches;
      setPlaying(!preference.matches);
    };
    changePreference();
    preference.addEventListener("change", changePreference);

    async function start() {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      if (disposed || !element) return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 1.12, 3.5);
      camera.lookAt(0, 0.9, 0);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.22;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.setAttribute("aria-hidden", "true");
      element.appendChild(renderer.domElement);
      const hemi = new THREE.HemisphereLight(0xffffff, 0x777769, 2.3);
      scene.add(hemi);
      const key = new THREE.DirectionalLight(0xfffaf0, 3.6);
      key.position.set(-3, 5, 4);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -2; key.shadow.camera.right = 2;
      key.shadow.camera.top = 3; key.shadow.camera.bottom = -2;
      key.shadow.bias = -0.0005;
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xffffff, 2);
      rim.position.set(3, 2, -3); scene.add(rim);
      const lightColors = {
        day: new THREE.Color(0xfffaf0), night: new THREE.Color(0xffdcc5),
        rimDay: new THREE.Color(0xffffff), rimNight: new THREE.Color(0x91bbff),
        ambientDay: new THREE.Color(0xffffff), ambientNight: new THREE.Color(0xd1ddf2),
      };
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.ShadowMaterial({ opacity: 0.14 }));
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = 0.004;
      ground.receiveShadow = true;
      scene.add(ground);
      const pivot = new THREE.Group(); scene.add(pivot);
      let mixer: import("three").AnimationMixer | undefined;
      let visible = true;
      const resize = () => {
        const { width, height } = element.getBoundingClientRect();
        renderer.setSize(width, height);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
      };
      const observer = new ResizeObserver(resize); observer.observe(element); resize();
      const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 });
      intersection.observe(element);
      let startX = 0;
      let startYaw = 0;
      const down = (event: PointerEvent) => {
        controls.current.dragging = true; startX = event.clientX; startYaw = controls.current.yaw;
        element.setPointerCapture(event.pointerId);
      };
      const move = (event: PointerEvent) => {
        if (controls.current.dragging) controls.current.yaw = startYaw + (event.clientX - startX) * 0.012;
      };
      const up = () => { controls.current.dragging = false; };
      const keys = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault(); controls.current.yaw += event.key === "ArrowLeft" ? -0.2 : 0.2;
        }
        if (event.key === "Home") { event.preventDefault(); controls.current.yaw = -0.2; }
      };
      element.addEventListener("pointerdown", down);
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerup", up);
      element.addEventListener("pointercancel", up);
      element.addEventListener("keydown", keys);
      cleanup = () => {
        observer.disconnect(); intersection.disconnect();
        element.removeEventListener("pointerdown", down); element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerup", up); element.removeEventListener("pointercancel", up); element.removeEventListener("keydown", keys);
        scene.traverse(object => { if (object instanceof THREE.Mesh) { object.geometry.dispose(); const materials = Array.isArray(object.material) ? object.material : [object.material]; materials.forEach(material => { Object.values(material).forEach(value => { if (value instanceof THREE.Texture) value.dispose(); }); material.dispose(); }); } });
        mixer?.stopAllAction(); renderer.dispose(); renderer.domElement.remove();
      };
      const gltf = await new GLTFLoader().loadAsync(avatar.model);
      if (disposed) return;
      const model = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(model);
      const height = bounds.max.y - bounds.min.y;
      model.scale.multiplyScalar(1.7 / height);
      const adjusted = new THREE.Box3().setFromObject(model);
      model.position.x -= (adjusted.min.x + adjusted.max.x) / 2;
      model.position.z -= (adjusted.min.z + adjusted.max.z) / 2;
      model.position.y -= adjusted.min.y;
      model.traverse(object => { if (object instanceof THREE.Mesh) { object.castShadow = true; object.receiveShadow = true; } });
      pivot.add(model);
      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();
        mixer.setTime(0.8);
      }
      setReady(true);
      element.dataset.animation = "ready";
      let previous = performance.now();
      function render(now: number) {
        if (disposed) return;
        frame = requestAnimationFrame(render);
        const delta = Math.min((now - previous) / 1000, 0.05); previous = now;
        if (!visible || document.hidden) return;
        const { night: inNight, lit: lightsOn } = controls.current;
        const settle = controls.current.reduced ? 1 : 1 - Math.exp(-14 * delta);
        key.color.lerp(inNight ? lightColors.night : lightColors.day, settle);
        rim.color.lerp(inNight ? lightColors.rimNight : lightColors.rimDay, settle);
        hemi.color.lerp(inNight ? lightColors.ambientNight : lightColors.ambientDay, settle);
        key.intensity = THREE.MathUtils.lerp(key.intensity, lightsOn ? (inNight ? 3.9 : 3.6) : 0.35, settle);
        rim.intensity = THREE.MathUtils.lerp(rim.intensity, lightsOn ? (inNight ? 4.3 : 2) : 0.15, settle);
        hemi.intensity = THREE.MathUtils.lerp(hemi.intensity, lightsOn ? (inNight ? 1.2 : 2.3) : (inNight ? 0.8 : 1.8), settle);
        ground.material.opacity = inNight ? 0.32 : 0.14;
        if (!controls.current.paused) mixer?.update(delta);
        pivot.rotation.y = controls.current.paused || controls.current.reduced || controls.current.dragging ? controls.current.yaw : THREE.MathUtils.lerp(pivot.rotation.y, controls.current.yaw, 0.12);
        renderer.render(scene, camera);
      }
      frame = requestAnimationFrame(render);
    }
    start().catch(() => { if (!disposed) { setFailed(true); controls.current.paused = true; setPlaying(false); cleanup?.(); } });
    return () => { disposed = true; cancelAnimationFrame(frame); preference.removeEventListener("change", changePreference); cleanup?.(); };
  }, []);

  function toggle() {
    controls.current.paused = !controls.current.paused;
    setPlaying(!controls.current.paused);
  }
  function toggleLights() {
    controls.current.lit = !controls.current.lit;
    setLit(controls.current.lit);
  }
  return <figure className="avatar-stage" data-lit={lit}>
    <div className="avatar-canvas" ref={host} tabIndex={ready ? 0 : -1} role="img" aria-label="Dancing game avatar. Drag to rotate, or use left and right arrow keys. Home resets the view." aria-describedby="avatar-help" data-view-state={failed ? "fallback" : ready ? "ready" : "loading"}>
      {!ready && <img className="avatar-poster" src={avatar.poster} alt="" width="900" height="1000" fetchPriority="high" />}
    </div>
    <p id="avatar-help" className="sr-only">Drag to rotate. Left and right arrow keys rotate the view; Home resets it. {failed ? "The interactive view is unavailable; a still image is shown." : ""}</p>
    <div className="avatar-stage-bottom"><div className="avatar-controls">
      <button type="button" className="studio-control" onClick={toggleLights} disabled={!ready} aria-pressed={lit} aria-label={lit ? "Turn avatar lights off" : "Turn avatar lights on"}><LightIcon /><span>Lights</span></button>
      <button type="button" className="animation-control" onClick={toggle} disabled={!ready} aria-pressed={playing} aria-label={playing ? "Pause dance" : "Play dance"} title={playing ? "Pause dance" : "Play dance"}><svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">{playing ? <path d="M5 4h3v12H5zm7 0h3v12h-3z" /> : <path d="m6 3 10 7-10 7z" />}</svg></button>
      <button type="button" className="view-reset" onClick={() => { controls.current.yaw = -0.2; }} disabled={!ready} aria-label="Reset avatar view" title="Reset view"><ResetViewIcon /></button>
    </div></div>
  </figure>;
}
