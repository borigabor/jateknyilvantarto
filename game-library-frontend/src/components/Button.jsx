import { Heart } from "lucide-react";

const Button = ({ title, icon, floating, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`text-white p-2 border-1 border-dark-hover transform hover:scale-110 rounded-full bg-dark-sidebar hover:bg-yellow-500 shadow-md transition duration-200 ${
        floating ? "absolute top-3 right-3 bg-dark-sidebar/80 shadow" : ""
      } ${className || "bg-dark-sidebar"} `}
    >
      {icon}
    </button>
  );
};

export default Button;
