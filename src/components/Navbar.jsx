import { Link } from "react-router-dom";
import logo from "../assets/cartify.png";
import { ShoppingCart, User, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { checkToken } from "../store/actions/UserActions";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = checkToken();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="w-full h-20 flex fixed top-0 right-0 left-0 bg-second-color items-center justify-between px-4">
      <Link to="/" className="flex items-center justify-start">
        <img src={logo} alt="cartify logo" className="h-16" />
        <h1 className="font-semibold text-3xl">Cartify</h1>
      </Link>

      <div className="hidden md:flex justify-center items-center gap-6 text-xl font-semibold">
        <Link to="/" className="flex justify-center items-center gap-1">
          Home
        </Link>
        <Link to="/products" className="flex justify-center items-center gap-1">
          Products
        </Link>
      </div>

      <div className="hidden md:flex justify-center items-center gap-6">
        {token && (
          <Link to="/cart" className="flex justify-center items-center gap-1">
            <ShoppingCart />
            Cart
          </Link>
        )}

        {token ? (
          <Link
            to="/profile"
            className="flex justify-center items-center gap-1"
          >
            <User />
            Profile
          </Link>
        ) : (
          <Link to="/login" className="flex justify-center items-center gap-1">
            <LogIn />
            Login
          </Link>
        )}
      </div>

      <div className="md:hidden flex items-center justify-center gap-4">
        {token ? (
          <Link to="/cart" className="flex justify-center items-center gap-1">
            <ShoppingCart />
          </Link>
        ) : (
          <Link to="/login" className="flex justify-center items-center gap-1">
            <LogIn />
          </Link>
        )}

        <button onClick={toggleMenu} className="text-2xl">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className={`absolute top-16 left-0 right-0 bg-second-color shadow-md md:hidden flex text-xl font-semibold flex-col items-center w-full transition-transform transform ${
            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
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
            to="/products"
            className="flex justify-center items-center gap-1 w-full hover:bg-main-color transition-all py-3"
          >
            Products
          </Link>
          {token && (
            <Link
              to="/profile"
              className="flex justify-center items-center gap-1 w-full hover:bg-main-color transition-all py-3"
            >
              Profile
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
