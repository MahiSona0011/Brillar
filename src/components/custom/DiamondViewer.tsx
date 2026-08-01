"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import type { Mesh, Group } from "three";

const METAL_COLORS: Record<string, string> = {
  "18k White Gold": "#dcdce8",
  "18k Yellow Gold": "#D4AF37",
  "18k Rose Gold": "#d4907a",
  Platinum: "#e0e0e4",
};

const CARAT_SCALE: Record<string, number> = {
  "0.5ct": 0.72,
  "0.75ct": 0.84,
  "1.0ct": 1.0,
  "1.5ct": 1.14,
  "2.0ct": 1.28,
  "3.0ct": 1.5,
};

function DiamondMesh() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.42;
  });
  return (
    <mesh ref={ref} scale={[1, 0.6, 1]}>
      <octahedronGeometry args={[1.1, 0]} />
      <meshPhysicalMaterial
        color="#f4f4ff"
        transmission={0.92}
        thickness={2.2}
        roughness={0}
        metalness={0}
        ior={2.42}
        envMapIntensity={4}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </mesh>
  );
}

function Band({ color }: { color: string }) {
  return (
    <mesh position={[0, -0.68, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.54, 0.052, 16, 100]} />
      <meshStandardMaterial color={color} metalness={0.95} roughness={0.12} />
    </mesh>
  );
}

function Scene({ metal, carat }: { metal: string; carat: string }) {
  const groupRef = useRef<Group>(null);
  const scale = CARAT_SCALE[carat] ?? 1.0;
  const bandColor = METAL_COLORS[metal] ?? "#D4AF37";
  return (
    <group ref={groupRef} scale={scale}>
      <DiamondMesh />
      <Band color={bandColor} />
    </group>
  );
}

interface DiamondViewerProps {
  metal?: string;
  carat?: string;
}

export default function DiamondViewer({
  metal = "18k White Gold",
  carat = "1.0ct",
}: DiamondViewerProps) {
  return (
    <Canvas
      frameloop="always"
      camera={{ position: [0, 0.6, 4.4], fov: 42 }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#0d0d0d"]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 6, 4]} intensity={3} color="#ffffff" />
        <pointLight position={[-4, -2, 3]} intensity={1.5} color="#D4AF37" />
        <spotLight
          position={[0, 8, 2]}
          intensity={2.5}
          angle={0.35}
          penumbra={0.6}
          color="#ffffff"
        />
        <Environment preset="studio" />
        <Scene metal={metal} carat={carat} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={(Math.PI * 3) / 4}
        />
      </Suspense>
    </Canvas>
  );
}
