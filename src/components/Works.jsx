import Tilt from "react-parallax-tilt";
import { color, motion } from "framer-motion";
import { styles } from "../styles";
import whiteArrow from "../assets/tech/whiteArrow.png";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import PropTypes from 'prop-types';
import { ComputersCanvas } from "./canvas";

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  console.log("Rendering project:", { index, name, image });

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={`${name} preview`}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={whiteArrow}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <div
    className="mt-2 text-secondary text-[14px]"
    dangerouslySetInnerHTML={{ __html: description }}
  ></div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
       <section className={`relative w-full h-screen`}>
       <div>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
        <div>  Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
          <p>Checkout my <a href="https://github.com/Yogesh-A-Gowda" target="_blank" className="text-blue-400">GitHub</a></p></div>
        </div>
      {/* <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div>
      
 
        </div>
      
      </div> */}
      
      <ComputersCanvas />

    </section>
      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}

      </div>
    </>
  );
};

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string, // Assuming color might be optional
    })
  ).isRequired,
  image: PropTypes.string.isRequired,
  source_code_link: PropTypes.string, // Optional link
};


export default SectionWrapper(Works, "");
