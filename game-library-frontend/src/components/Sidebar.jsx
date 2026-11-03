import { navLinks } from "../constants/navigation";
import { NavLink } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const token = localStorage.getItem("token");
const userRole = getUserRole();

const visibleLinks = navLinks.filter((link) => {
  if (link.path === "/") {
    return true;
  }

  if (!token) {
    return false;
  }

  if (link.path === "/edit") {
    return userRole === "ADMIN";
  }

  return true;
});
  return (
    <div
      className={`fixed padding-y top-0 left-0 h-full z-50 bg-dark-sidebar transition-transform duration-300 ease-in-out
    w-[300px] max-lg:w-[250px] max-sm:w-full
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    sm:translate-x-0 max-sm:max-sidebar
  `}
    >
      <ul className="flex flex-col items-center max-sm:w-full">
        {visibleLinks.map((link) => (
          <li key={link.name} className="w-full">
            <NavLink
              to={link.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `text-lg max-lg:text-base flex items-center gap-3 w-full hover:bg-dark-hover rounded-[5px] py-4 px-2 duration-200 ${
                  isActive ? "bg-dark-hover" : ""
                }`
              }
            >
              <link.icon className="w-6 h-6" />
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
