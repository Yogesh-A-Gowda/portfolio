import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const email = "yogeshagowda.one1@gmail.com";

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl flex flex-col items-center justify-center"
      >
        <h3 className={`${styles.sectionHeadText} text-xl`}>Contact</h3>

        <div className="mt-12 flex flex-col items-center gap-6">
          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/yogesh-a-gowda-985436182/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex text-white text-3xl hover:text-blue-600 gap-x-2 items-center"
          >
            <FaLinkedin />
            <p>LinkedIn</p>
          </a>

          {/* GitHub Icon */}
          <a
            href="https://github.com/Yogesh-A-Gowda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex text-white text-3xl hover:text-gray-400 gap-x-2 items-center"
          >
            <FaGithub />
            <p>GitHub</p>
          </a>

          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/yogesh._._.gowda/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex text-white text-3xl hover:text-pink-500 gap-x-2 items-center"
          >
            <FaInstagram />
            <p>Instgram</p>
          </a>

          {/* Gmail Icon */}
          <a
            href={`mailto:${email}`}
            className="flex text-white text-2xl hover:text-red-500 gap-x-2 items-center"
          >
            <FaEnvelope />
            <p>yogeshagowda.one1@gmail.com</p>
          </a>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
