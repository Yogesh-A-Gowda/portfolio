import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const WebGLFallback = ({ type = "general", icon, title, description }) => {
  if (type === "stars") {
    return (
      <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#100d25] to-[#050816] opacity-90" />
        <div className="absolute w-full h-full bg-[radial-gradient(#915eff_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>
    );
  }

  if (type === "computer") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative group w-full max-w-[420px] rounded-3xl p-6 bg-gradient-to-br from-[#1d1836]/90 via-[#151030]/80 to-[#0d0a21]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(145,94,255,0.15)] flex flex-col items-center"
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#915eff]/30 to-[#804dee]/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

          {/* Computer Illustration / Graphic */}
          <div className="relative w-44 h-36 mb-4 flex items-center justify-center">
            {/* Monitor */}
            <div className="w-36 h-24 rounded-xl border-2 border-[#915eff]/60 bg-[#050816] p-2 flex flex-col justify-between shadow-lg shadow-[#915eff]/20">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2 h-2 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="space-y-1 my-auto">
                <div className="h-1.5 w-3/4 bg-[#915eff]/70 rounded" />
                <div className="h-1.5 w-1/2 bg-[#804dee]/50 rounded" />
                <div className="h-1.5 w-2/3 bg-cyan-400/40 rounded" />
              </div>
              <div className="text-[9px] text-[#915eff] font-mono text-right">3D Workspace</div>
            </div>
            {/* Stand */}
            <div className="absolute bottom-4 w-6 h-4 border-l-2 border-r-2 border-[#915eff]/40" />
            <div className="absolute bottom-2 w-14 h-1.5 rounded-full bg-[#915eff]/50" />
          </div>

          <h3 className="text-white text-lg font-bold">Interactive 3D Workspace</h3>
          <p className="text-secondary text-xs mt-1 max-w-[280px]">
            {description || "High-performance rendering optimized for your device."}
          </p>
        </motion.div>
      </div>
    );
  }

  if (type === "earth") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-[#050816] via-[#1d1836] to-[#915eff] border border-[#915eff]/40 shadow-[0_0_50px_rgba(145,94,255,0.3)] flex items-center justify-center"
        >
          {/* Planet Rings */}
          <div className="absolute w-60 h-20 rounded-[50%] border-2 border-cyan-400/30 transform -rotate-12 pointer-events-none" />
          <div className="text-center text-white font-mono text-xs opacity-70">Earth Orbit</div>
        </motion.div>
        <p className="text-secondary text-xs mt-4">Interactive Globe View</p>
      </div>
    );
  }

  if (type === "ball") {
    return (
      <motion.div
        whileHover={{ scale: 1.08, rotateZ: 5 }}
        whileTap={{ scale: 0.95 }}
        className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#231e42] to-[#120d2b] border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-3 relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#915eff]/30 to-[#00cea8]/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
        {icon ? (
          <img src={icon} alt={title || "skill"} className="w-12 h-12 object-contain relative z-10 drop-shadow-md" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#915eff]/30 flex items-center justify-center relative z-10">
            <span className="text-white text-xs font-bold">{title?.charAt(0) || "•"}</span>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
      <div className="p-4 rounded-xl bg-[#1d1836]/60 border border-white/10 backdrop-blur-md">
        <p className="text-white text-sm font-semibold">{title || "3D View"}</p>
        <p className="text-secondary text-xs mt-1">
          {description || "Rendering optimized for your browser."}
        </p>
      </div>
    </div>
  );
};

WebGLFallback.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default WebGLFallback;
