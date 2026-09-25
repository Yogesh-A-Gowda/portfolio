import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import CanvasErrorBoundary from "./CanvasErrorBoundary";
import { defaultGLProps, useIsMobile, checkWebGLSupport } from "../../utils/webgl";

const Stars = (props) => {
  const ref = useRef();
  const isMobile = useIsMobile(640);

  const [sphere] = useState(() => {
    // 1500 points (4500 coords) on mobile, 4000 points (12000 coords) on desktop
    const count = isMobile ? 4500 : 9000;
    const points = new Float32Array(count);
    random.inSphere(points, { radius: 1.2 });
    for (let i = 0; i < points.length; i++) {
      if (isNaN(points[i])) points[i] = 0;
    }
    return points;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={isMobile ? 0.003 : 0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const { supported } = checkWebGLSupport();
    setWebglSupported(supported);
  }, []);

  if (!webglSupported) {
    return <CanvasErrorBoundary type="stars" />;
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
      <CanvasErrorBoundary type="stars">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={[1, 1.25]}
          gl={{
            ...defaultGLProps,
            antialias: false,
            powerPreference: "low-power",
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <Stars />
          </Suspense>

          <Preload all />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

export default StarsCanvas;
