import { Link } from "react-router-dom";
import logo from "../assets/cartify.png";
import { ShoppingCart, User, Menu, X, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import {
  checkToken,
  fetchUserById,
  getIdUser,
  userLogout,
} from "../store/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [itemCart, setItemCart] = useState();
  const { carts } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    const getProducts = carts.map((item) => item.products);
    const totalItemOnCart = getProducts[0]?.length;
    setItemCart(totalItemOnCart);
  }, [carts]);

  const token = checkToken();
  let id;

  if (token) {
    id = getIdUser(token);
  }

  const fetchData = async () => {
    try {
      if (id) {
        const res = await dispatch(fetchUserById(id));
        setName(res.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const handleShowProfile = () => {
    setProfile(true);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    setProfile(false);
    userLogout();
  };

  return (
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
        <Link to="/contact" className="flex justify-center items-center gap-1">
          Contact
        </Link>
      </div>

      <div className="hidden md:flex justify-center items-center gap-6">
        {token && (
          <Link to="/cart" className="flex relative">
            <div className="flex justify-center items-center gap-1 relative">
              <ShoppingCart />
              {itemCart > 0 && (
                <span className="absolute bottom-3 left-4 bg-third-color text-main-color text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCart}
                </span>
              )}
            </div>
          </Link>
        )}

        {token ? (
          <div
            onClick={handleShowProfile}
            className="flex justify-center items-center gap-1 cursor-pointer"
          >
            <User />
          </div>
        ) : (
          <Link to="/login" className="flex justify-center items-center gap-1">
            <LogIn />
          </Link>
        )}
      </div>

      <div className="md:hidden flex items-center justify-center gap-4">
        {token ? (
          <Link to="/cart" className="flex relative">
            <div className="flex justify-center items-center gap-1 relative">
              <ShoppingCart />
              {itemCart > 0 && (
                <span className="absolute bottom-3 left-4 bg-third-color text-main-color text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCart}
                </span>
              )}
            </div>
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
          <div
            onClick={handleLogout}
            className="flex justify-center items-center gap-1 w-full hover:bg-main-color transition-all py-3"
          >
            Logout
          </div>
          {/* {token && (
            <Link
              to="/profile"
              className="flex justify-center items-center gap-1 w-full hover:bg-main-color transition-all py-3"
            >
              Profile
            </Link>
          )} */}
        </div>
      )}

      {profile && (
        <div className="fixed inset-0 top-20  hidden md:flex justify-end items-start">
          <div className="bg-white  p-4 rounded-lg shadow-lg flex justify-between w-1/4">
            <div className="w-full gap-4 flex flex-col">
              <h2 className="text-xl font-semibold">{name}</h2>
              <button
                onClick={handleLogout}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Logout
              </button>{" "}
            </div>
            <div
              onClick={() => setProfile(false)}
              className="flex cursor-pointer"
            >
              <X />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
