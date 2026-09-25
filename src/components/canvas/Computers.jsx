import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";

import CanvasLoader from "../Loader";
import CanvasErrorBoundary from "./CanvasErrorBoundary";
import { defaultGLProps, getOptimalDPR, useIsMobile, checkWebGLSupport } from "../../utils/webgl";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.2} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1.2}
        castShadow={!isMobile}
        shadow-mapSize={isMobile ? 512 : 1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.65 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

Computers.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

const ComputersCanvas = () => {
  const isMobile = useIsMobile(640);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const { supported } = checkWebGLSupport();
    setWebglSupported(supported);
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-[380px] sm:h-[450px] flex items-center justify-center">
        <CanvasErrorBoundary type="computer" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[350px] sm:min-h-[450px] relative">
      <CanvasErrorBoundary type="computer">
        <Canvas
          frameloop="demand"
          shadows={!isMobile}
          dpr={getOptimalDPR()}
          camera={{ position: [20, 3, 5], fov: 25 }}
          gl={defaultGLProps}
          style={{ width: "100%", height: "100%", touchAction: "pan-y" }}
          onCreated={({ gl }) => {
            // Mobile GPU power & context protection
            const handleContextLost = (event) => {
              event.preventDefault();
              console.warn("WebGL Context Lost on ComputersCanvas. Attempting graceful recovery...");
            };
            const handleContextRestored = () => {
              console.log("WebGL Context Restored on ComputersCanvas.");
            };
            const canvasEl = gl.domElement;
            canvasEl.addEventListener("webglcontextlost", handleContextLost, false);
            canvasEl.addEventListener("webglcontextrestored", handleContextRestored, false);
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
              autoRotate={isMobile}
              autoRotateSpeed={0.5}
            />
            <Computers isMobile={isMobile} />
          </Suspense>

          <Preload all />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

// Safe asset preloading
try {
  useGLTF.preload("/desktop_pc/scene.gltf");
} catch (err) {
  console.warn("Failed to preload desktop_pc GLTF:", err);
}

export default ComputersCanvas;
