import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
import CanvasErrorBoundary from "./CanvasErrorBoundary";
import { defaultGLProps, getOptimalDPR, useIsMobile, checkWebGLSupport } from "../../utils/webgl";

const Earth = ({ isMobile }) => {
  const earth = useGLTF("/planet/scene.gltf");

  return (
    <primitive
      object={earth.scene}
      scale={isMobile ? 2.2 : 2.5}
      position-y={0}
      rotation-y={0}
    />
  );
};

const EarthCanvas = () => {
  const isMobile = useIsMobile(640);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const { supported } = checkWebGLSupport();
    setWebglSupported(supported);
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-[350px] md:h-[550px] flex items-center justify-center">
        <CanvasErrorBoundary type="earth" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[320px] md:min-h-[500px] relative">
      <CanvasErrorBoundary type="earth">
        <Canvas
          shadows={!isMobile}
          frameloop="demand"
          dpr={getOptimalDPR()}
          gl={defaultGLProps}
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
          }}
          style={{ width: "100%", height: "100%", touchAction: "pan-y" }}
          onCreated={({ gl }) => {
            const handleContextLost = (e) => {
              e.preventDefault();
              console.warn("WebGL Context Lost on EarthCanvas. Attempting graceful recovery...");
            };
            const canvasEl = gl.domElement;
            canvasEl.addEventListener("webglcontextlost", handleContextLost, false);
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              autoRotate
              autoRotateSpeed={1.5}
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Earth isMobile={isMobile} />
            <Preload all />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

// Safe asset preloading
try {
  useGLTF.preload("/planet/scene.gltf");
} catch (err) {
  console.warn("Failed to preload planet GLTF:", err);
}

export default EarthCanvas;
