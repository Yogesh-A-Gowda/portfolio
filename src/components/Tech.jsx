import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { portfolioService } from "../services/portfolioService";
import { useIsMobile, checkWebGLSupport } from "../utils/webgl";

const Tech = () => {
  const [skills, setSkills] = useState([]);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const fetchSkills = async () => {
      const data = await portfolioService.getSkills();
      setSkills(data || []);
    };
    fetchSkills();

    const { supported } = checkWebGLSupport();
    setWebglAvailable(supported);
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-8 sm:gap-10">
      {skills.map((technology, index) => {
        const use3DCardFallback = isMobile || !webglAvailable;

        return (
          <div
            className="flex flex-col items-center justify-center"
            key={technology.name || index}
          >
            {use3DCardFallback ? (
              <motion.div
                whileHover={{ scale: 1.12, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#2a2450] via-[#1a1538] to-[#0f0b24] p-3 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-white/10 relative group"
              >
                {/* Ambient glow highlight */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#915eff]/20 to-[#00cea8]/10 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#915eff]/40 blur-sm group-hover:bg-[#915eff] transition-all" />

                <img
                  src={technology.icon}
                  alt={technology.name}
                  className="w-14 h-14 object-contain relative z-10 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                  loading="lazy"
                />
              </motion.div>
            ) : (
              <div className="w-28 h-28">
                <BallCanvas icon={technology.icon} name={technology.name} />
              </div>
            )}
            <h3 className="mt-2 text-center text-white text-xs sm:text-sm font-medium">
              {technology.name}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default SectionWrapper(Tech, "");
