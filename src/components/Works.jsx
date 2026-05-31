import { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { styles } from "../styles";
import whiteArrow from "../assets/tech/whiteArrow.png";
import { portfolioService } from "../services/portfolioService";
import PropTypes from 'prop-types';

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  console.log("Rendering project card:", { index, name, image });

  return (
    <div className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-white-100/5 shadow-card hover:shadow-purple-500/10 transition-all duration-300">
      <Tilt
        options={{
          max: 25,
          scale: 1.02,
          speed: 450,
        }}
        className="w-full h-full"
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
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-all"
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
            dangerouslySetInnerHTML={{ __html: description || "" }}
          ></div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags && Array.isArray(tags) && tags.map((tag) => (
            <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await portfolioService.getProjects();
      console.log("Fetched projects in Works component:", data);
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <div className="pt-24">
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
        <div className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
          <p className="mt-2">Checkout my <a href="https://github.com/Yogesh-A-Gowda" target="_blank" className="text-blue-400 font-bold hover:underline">GitHub</a></p>
        </div>
      </div>
      <div className='mt-12 flex flex-wrap gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  image: PropTypes.string.isRequired,
  source_code_link: PropTypes.string,
};

export default Works;
