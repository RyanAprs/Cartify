import { Link } from "react-router-dom";
import logo from "../assets/cartify.png";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="w-full h-16 flex items-center justify-between px-4">
      <div className="flex items-center justify-start">
        <img src={logo} alt="cartify logo" className="h-16" />
        <h1 className="font-semibold text-3xl">Cartify</h1>
      </div>

      <div className="hidden md:flex justify-center items-center gap-6">
        <Link className="flex justify-center items-center gap-1">
          <User />
          Account
        </Link>
        <Link className="flex justify-center items-center gap-1">
          <ShoppingCart />
          Cart
        </Link>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-2xl">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className={`absolute top-16 left-0 right-0 bg-white shadow-md md:hidden flex flex-col items-start px-8 py-6 space-y-4 transition-transform transform ${
            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        >
          <Link
            className="flex justify-center items-center gap-1"
            onClick={toggleMenu}
          >
            <User />
            Account
          </Link>
          <Link
            className="flex justify-center items-center gap-1"
            onClick={toggleMenu}
          >
            <ShoppingCart />
            Cart
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;