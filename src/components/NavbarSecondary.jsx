import { Link } from "react-router-dom";
import logo from "../assets/cartify.png";

const NavbarSecondary = () => {
  return (
    <div>
      <div className="w-full h-20 flex fixed top-[-1px] right-0 left-0 bg-second-color items-center justify-between px-4 md:px-10">
        <Link to="/" className="flex items-center justify-start">
          <img src={logo} alt="cartify logo" className="h-16" />
          <h1 className="font-semibold text-3xl">Cartify</h1>
        </Link>
      </div>
    </div>
  );
};

export default NavbarSecondary;
