import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styles } from "../styles";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (hash) => {
    if (location.pathname !== "/") {
      // Redirect to the root route with the hash
      window.location.href = `/${hash}`;
    } else {
      // Scroll to the section on the same page
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setActive(hash.replace("#", ""));
  };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Yogesh Gowda &nbsp;
            <span className="sm:block hidden"> | Developer </span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          <li
            className={`${
              active === "about" ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => handleNavigate("#about")}
          >
            About
          </li>
          <li
            className={`${
              active === "contact" ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => handleNavigate("#contact")}
          >
            Contact
          </li>
          <li
            className={`${
              active === "projects" ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("projects")}
          >
            <Link to="/projects">Projects</Link>
          </li>
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              <li
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === "about" ? "text-white" : "text-secondary"
                }`}
                onClick={() => {
                  handleNavigate("#about");
                  setToggle(!toggle);
                }}
              >
                About
              </li>
              <li
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === "contact" ? "text-white" : "text-secondary"
                }`}
                onClick={() => {
                  handleNavigate("#contact");
                  setToggle(!toggle);
                }}
              >
                Contact
              </li>
              <li
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === "projects" ? "text-white" : "text-secondary"
                }`}
                onClick={() => {
                  setToggle(!toggle);
                  setActive("projects");
                }}
              >
                <Link to="/projects">Projects</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
