import { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "./Button"; // Import the new Button component

import "react-vertical-timeline-component/style.min.css";
import { textVariant } from "../utils/motion";
import { portfolioService } from "../services/portfolioService";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg || experience.icon_bg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points && Array.isArray(experience.points) && experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const maxVisible = 3; // Set max visible experiences

  useEffect(() => {
    const fetchExperiences = async () => {
      const data = await portfolioService.getExperiences();
      setExperiences(data);
    };
    fetchExperiences();
  }, []);

  const showMoreButton = experiences.length > maxVisible; // Check if more experiences exist
  const navigate = useNavigate(); // Use useNavigate for routing

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="text-lg text-center font-medium text-gray-500">
          What I have done so far
        </p>
        <h2 className="text-4xl font-bold text-center text-white">
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.slice(0, maxVisible).map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>

        {/* Show more button at the bottom of the timeline */}
        {showMoreButton && (
          <div className="mt-5 flex justify-center items-center w-full">
            <Button
              label="Click here to view all experiences"
              onClick={() => navigate("/experiences")} // Navigate when clicked
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Experience;
