import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full sm:w-auto py-3 px-6 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-all duration-300 cursor-pointer z-10 relative ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
