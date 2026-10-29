import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { Points } from "three";

/**
 * Partículas de luz (poeira dourada ao sol) com paralaxe leve pelo cursor.
 * Só é montada em desktop com mouse e sem "reduzir movimento" (ver Hero).
 */
function Motes({ count }: { count: number }) {
  const ref = useRef<Points>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 12;
      a[i * 3 + 1] = (Math.random() - 0.5) * 7;
      a[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return a;
  }, [count]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    pts.rotation.y += delta * 0.015;
    pts.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
    state.camera.position.x += (pointer.current.x * 0.5 - state.camera.position.x) * 0.03;
    state.camera.position.y += (pointer.current.y * 0.3 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#E8D8C3" transparent opacity={0.65} depthWrite={false} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      aria-hidden
      className="!pointer-events-none"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 55 }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <Motes count={140} />
    </Canvas>
  );
}
