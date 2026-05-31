import 
{
mobile,
backend,
creator
} from "../assets"

export const navLinks = [
  { id: "about", title: "About", path: "/about" },
  { id: "projects", title: "Projects", path: "/projects" },
  { id: "contact", title: "Contact", path: "/contact" },
];


const services = [
  {
    title: "FrontEnd Developer",
    icon: mobile,
  },
  {
    title: "BackEnd Developer",
    icon: backend,
  },
  {
    title: "Data Science and Artificial Intelligence",
    icon: creator,
  },
];

// const technologies = [
//   {
//     name: "HTML 5",
//     icon: html,
//   },
//   {
//     name: "CSS 3",
//     icon: css,
//   },
//   {
//     name: "JavaScript",
//     icon: javascript,
//   },
//   // {
//   //   name: "TypeScript",
//   //   icon: typescript,
//   // },
//   {
//     name: "React JS",
//     icon: reactjs,
//   },
//   // {
//   //   name: "Redux Toolkit",
//   //   icon: redux,
//   // },
//   {
//     name: "Tailwind CSS",
//     icon: tailwind,
//   },
//   {
//     name: "Node JS",
//     icon: nodejs,
//   },
//   {
//     name: "MongoDB",
//     icon: mongodb,
//   },
//   // {
//   //   name: "Three JS",
//   //   icon: threejs,
//   // },
//   {
//     name: "git",
//     icon: git,
//   },
//   {
//     name: "Postgresql",
//     icon: Postgresql,
//   },
//   {
//     name: "Python",
//     icon: python,
//   },
//   // {
//   //   name: "figma",
//   //   icon: figma,
//   // },
//   // {
//   //   name: "docker",
//   //   icon: docker,
//   // },
// ];


// const experiences = [
//   {
//     title: "Quality Assurance Engineer",
//     company_name: "iManage",
//     icon: iManage,
//     iconBg: "#383E56",
//     date: "September 2023 - Present",
//     points: [
//       "Developed and updated comprehensive test cases, enhanced the testing process, and utilized JIRA for efficient bug tracking and maintaining accurate documentation for future reference.",
//       "Engineered Python scripts for a spectrum of automation tasks, including parsing XML to generate bulk data for Excel, maintaining YAML code for workspace creation, and facilitating the upload of extensive datasets into designated environments.",
//       ' Automated the creation of 1000+ users and established mutual subscriptions using Postman to test edge-case scenarios for maximum user capacity in the Tree View feature. ',
//     ],
//   },
//   {
//     title: "Web Development Intern",
//     company_name: "Softmantissa",
//     icon: softmantissa_logo,
//     iconBg: "#E6DEDD",
//     date: "Nov 2022 - Jan 2023",
//     points: [
//       "Utilized HTML, CSS, and JavaScript skills to develop the frontend of the company's website.",
//       "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
//       "Created a polished and user-friendly interface, enhancing the website's overall user experience..",
//     ],
//   },

// ];

// // const testimonials = [
// //   {
// //     testimonial:
// //       "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
// //     name: "Sara Lee",
// //     designation: "CFO",
// //     company: "Acme Co",
// //     image: "https://randomuser.me/api/portraits/women/4.jpg",
// //   },
// //   {
// //     testimonial:
// //       "I've never met a web developer who truly cares about their clients' success like Rick does.",
// //     name: "Chris Brown",
// //     designation: "COO",
// //     company: "DEF Corp",
// //     image: "https://randomuser.me/api/portraits/men/5.jpg",
// //   },
// //   {
// //     testimonial:
// //       "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
// //     name: "Lisa Wang",
// //     designation: "CTO",
// //     company: "456 Enterprises",
// //     image: "https://randomuser.me/api/portraits/women/6.jpg",
// //   },
// // ];

// const projects = [
//   {
//     name: "EduSiksha",
//     description:
//       "Parental monitoring app for helping kids understand concepts using AI",
//     tags: [
//       {
//         name: "python",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "Gen-AI",
//         color: "green-text-gradient",
//       },
//       {
//         name: "NextJS",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: EDU,
//     source_code_link: "https://github.com/Yogesh-A-Gowda/EduSiksha",
//   },

//   {
//     name: "NASA",
//     description:
//       "Used free APIs provided by NASA and developed frontend application using typescript+nextjs",
//     tags: [
//       {
//         name: "nextjs",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "nasa-api",
//         color: "green-text-gradient",
//       },
//       {
//         name: "css",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: nasa,
//     source_code_link: "https://nasa-pfrr.onrender.com/",
//   },
//   {
//     name: "Drug Analysis",
//     description:
//       "Patients, Doctors and Pharmacists can use this portal to be informed on trust-score among patients to further recommend or use the Drug",
//     tags: [
//       {
//         name: "python",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "NLP",
//         color: "green-text-gradient",
//       },
//       {
//         name: "BERT-Classifier",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: DrugAnalysis,
//     source_code_link: "https://druganalysis-y0wn.onrender.com/",
//   },

//   {
//     name: "Expense Manager",
//     description:
//       "Web-based platform that allows users to track and visualize their expenses. Please use <b class='text-green-500 font-bold'>yogesh@yogesh.com : password1</b> as the database offers limited free storage",
//     tags: [
//       {
//         name: "react",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "postgreSQL",
//         color: "green-text-gradient",
//       },
//       {
//         name: "tailwind",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: Expense,
//     source_code_link: "https://expense-manager-3vir.vercel.app/sign-in",
//   },

//   {
//     name: "Voice Assistant",
//     description:
//       "A simple python voice assistant whic is ready for your help, anytime! anywhere",
//     tags: [
//       {
//         name: "python",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "wikipedia",
//         color: "green-text-gradient",
//       },
//       {
//         name: "PyAudio",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: Driver,
//     source_code_link: "https://github.com/Yogesh-A-Gowda/Drivers-Virtual-Assistant.git",
//   },
//   {
//     name: "College Website",
//     description:
//       "Static website , built in college while exploring web development",
//     tags: [
//       {
//         name: "HTML",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "ChatJS",
//         color: "green-text-gradient",
//       },
//       {
//         name: "css",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: college,
//     source_code_link: "https://yogesh-a-gowda.github.io/GA/HOME.html",
//   },
//   {
//     name: "Ecommerce Web App",
//     description:
//       `Web application that allows users to shop the latest cloths and accessories,Please use <b class="text-green-500 font-bold">Admin yogesh@yogesh.com : password</b> and <b class="text-green-500 font-bold">Customer yogesh2@yogesh.com:password</b> as the database offers limited free storage.`,
//     tags: [
//       {
//         name: "react",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "mongodb",
//         color: "green-text-gradient",
//       },
//       {
//         name: "stripe",
//         color: "yellow-text-gradient",
//       },
//       {
//         name: "redis",
//         color: "orange-text-gradient",
//       },
//       {
//         name: "scss",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: Ecommerce,
//     source_code_link: "https://benevolent-belekoy-c4f0aa.netlify.app/",
//   },
//   {
//     name: "AI-CHAT-GEMINI",
//     description:
//       "A weekend project where I tried replicating Generative AI. Irony is that I'm using gemini AI to crete my AI xD",
//     tags: [
//       {
//         name: "UV",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "Python",
//         color: "green-text-gradient",
//       },
//       {
//         name: "gemini-api",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: GEMINI,
//     source_code_link: "https://github.com/Yogesh-A-Gowda/AI-CHAT-GEMINI",
//   },

//   {
//     name: "Book Store",
//     description:
//       "A simple Book store where you can store a list of your fav books. A weekend project just for fun",
//     tags: [
//       {
//         name: "reactjs",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "mongodb",
//         color: "green-text-gradient",
//       },
//       {
//         name: "css",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: BookStore,
//     source_code_link: "https://book-store-zeta-sable.vercel.app/",
//   },
//   {
//     name: "TODO",
//     description:
//       "What Better than to kick start the learning process by creating a TODO LIST",
//     tags: [
//       {
//         name: "reactjs",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "mongodb",
//         color: "green-text-gradient",
//       },
//       {
//         name: "css",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: TODO,
//     source_code_link: "https://to-do-simple-zn3b.vercel.app/",
//   },
// ];

// export { services, technologies, experiences, /*testimonials,*/ projects };
export {services}