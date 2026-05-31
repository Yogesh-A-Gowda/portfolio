import { useState, useEffect } from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { portfolioService } from "../services/portfolioService";

const Tech = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const data = await portfolioService.getSkills();
      setSkills(data);
    };
    fetchSkills();
  }, []);

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {skills.map((technology) => (
        <div
          className='w-28 h-28 flex flex-col items-center justify-center'
          key={technology.name}
        >
          <BallCanvas icon={technology.icon} />
          <h3 className='mt-2 text-center text-white'>{technology.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
