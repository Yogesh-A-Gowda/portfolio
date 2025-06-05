import { useNavigate } from "react-router-dom";
export const ProjectButton = () => {
    const navigate = useNavigate();
  return (
    <div className="mt-5 flex justify-center items-center w-full">
            <button
      onClick={() => navigate("/projects")}
      className={`w-full sm:w-auto py-3 px-6 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-all duration-300 cursor-pointer z-10 relative`}
    >
      Click here to have a look at my projects
    </button>
            
    </div>
  )
}
