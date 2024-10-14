// src/components/canvas/Stars.jsx
import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

// Stars component inside Canvas context
const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame(() => {
    ref.current.rotation.y += 0.002; // Rotate stars
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Canvas wrapper for Stars
const StarsCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <Stars />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default StarsCanvas;
