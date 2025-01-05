import {
  mobile,
  backend,
  creator,
  web,
  javascript,
//  typescript,
  html,
  css,
  reactjs,
  //redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  //figma,
  //docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  //threejs,
} from "../assets";
import Postgresql from '../assets/tech/Postgresql.png'
import iManage from '../assets/company/iManage.jpg'
import softmantissa_logo from '../assets/company/softmantissa_logo.jpg'
import python from '../assets/tech/python.png'

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  // {
  //   title: "Web Developer",
  //   icon: web,
  // },
  {
    title: "FrontEnd Developer",
    icon: mobile,
  },
  {
    title: "BackEnd Developer",
    icon: backend,
  },
  {
    title: "Data Scientist, just a beginner",
    icon: creator,
  },
  // {
  //   title: "Content Creator",
  //   icon: creator,
  // },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  // {
  //   name: "TypeScript",
  //   icon: typescript,
  // },
  {
    name: "React JS",
    icon: reactjs,
  },
  // {
  //   name: "Redux Toolkit",
  //   icon: redux,
  // },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  // {
  //   name: "Three JS",
  //   icon: threejs,
  // },
  {
    name: "git",
    icon: git,
  },
  {
    name: "Postgresql",
    icon: Postgresql,
  },
  {
    name: "Python",
    icon: python,
  },
  // {
  //   name: "figma",
  //   icon: figma,
  // },
  // {
  //   name: "docker",
  //   icon: docker,
  // },
];


const experiences = [
  {
    title: "Web Development Intern",
    company_name: "Softmantissa",
    icon: softmantissa_logo,
    iconBg: "#E6DEDD",
    date: "Nov 2022 - Jan 2023",
    points: [
      "Utilized HTML, CSS, and JavaScript skills to develop the frontend of the company's website.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Created a polished and user-friendly interface, enhancing the website's overall user experience..",
    ],
  },
  {
    title: "Quality Assurance Engineer",
    company_name: "iManage",
    icon: iManage,
    iconBg: "#383E56",
    date: "September 2023 - Present",
    points: [
      "Developed and updated comprehensive test cases, enhanced the testing process, and utilized JIRA for efficient bug tracking and maintaining accurate documentation for future reference.",
      "Engineered Python scripts for a spectrum of automation tasks, including parsing XML to generate bulk data for Excel, maintaining YAML code for workspace creation, and facilitating the upload of extensive datasets into designated environments.",
      ' Automated the creation of 1000+ users and established mutual subscriptions using Postman to test edge-case scenarios for maximum user capacity in the Tree View feature. ',
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
