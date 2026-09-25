import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import PropTypes from "prop-types";

import CanvasLoader from "../Loader";
import CanvasErrorBoundary from "./CanvasErrorBoundary";
import { defaultGLProps, getOptimalDPR } from "../../utils/webgl";

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {decal && (
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1}
            map={decal}
            flatShading
          />
        )}
      </mesh>
    </Float>
  );
};

Ball.propTypes = {
  imgUrl: PropTypes.string.isRequired,
};

const BallCanvas = ({ icon, name }) => {
  return (
    <div className="w-28 h-28 relative">
      <CanvasErrorBoundary type="ball" icon={icon} fallbackTitle={name}>
        <Canvas
          frameloop="demand"
          dpr={getOptimalDPR()}
          gl={defaultGLProps}
          style={{ touchAction: "pan-y" }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls enableZoom={false} enablePan={false} />
            <Ball imgUrl={icon} />
          </Suspense>
          <Preload all />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};

BallCanvas.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default BallCanvas;
