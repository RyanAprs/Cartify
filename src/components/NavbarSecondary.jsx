import { Link } from "react-router-dom";
import logo from "../assets/cartify.png";
import { Menu, User, X } from "lucide-react";
import { useState } from "react";

const NavbarSecondary = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      <div className="w-full h-20 flex fixed top-[-1px] right-0 left-0 bg-second-color items-center justify-between px-4 md:px-10">
        <Link to="/" className="flex items-center justify-start">
          <img src={logo} alt="cartify logo" className="h-16" />
          <h1 className="font-semibold text-3xl">Cartify</h1>
        </Link>

        <div className="hidden md:flex justify-center items-center gap-6 text-xl font-semibold">
          <Link to="/" className="flex justify-center items-center gap-1">
            Home
          </Link>
          <Link to="/about" className="flex justify-center items-center gap-1">
            About
          </Link>
          <Link
            to="/contact"
            className="flex justify-center items-center gap-1"
          >
            Contact
          </Link>
        </div>

        <div className="hidden md:flex justify-center items-center gap-6">
          <Link
            to="/profile"
            className="flex justify-center items-center gap-1"
          >
            <User />
          </Link>
        </div>

        <div className="md:hidden flex items-center justify-center gap-4">
          <button onClick={toggleMenu} className="text-2xl">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className={`absolute top-16 left-0 right-0 bg-second-color shadow-md md:hidden flex text-xl font-semibold flex-col items-center w-full transition-transform transform ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              transition: "transform 0.3s ease, opacity 0.3s ease",
            }}
          >
            <Link
              to="/"
              className="flex justify-center items-center gap-1 w-full hover:bg-main-color transition-all py-3"
            >
              Home
            </Link>
            <Link
              to="/About"
              className="flex justify-center items-center gap-1 w-full hover:bg-main-color transition-all py-3"
            >
              About
            </Link>
            <Link
              to="/About"
              className="flex justify-center items-center gap-1 w-full hover:bg-main-color transition-all py-3"
            >
              Contact
            </Link>
            <Link
              to="/profile"
              className="flex justify-center items-center gap-1 w-full hover:bg-main-color transition-all py-3"
            >
              Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarSecondary;
