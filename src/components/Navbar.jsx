import { Link } from "react-router-dom";
import logo from "../assets/cartify.png";
import { ShoppingCart, User, X, LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import {
  checkToken,
  fetchUserById,
  getIdUser,
  userLogout,
} from "../store/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [itemCart, setItemCart] = useState();
  const { carts } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [profile, setProfile] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const token = checkToken();
  let id;

  if (token) {
    id = getIdUser(token);
  }

  useEffect(() => {
    if (id) {
      const userCart = carts.find((cart) => cart.userId === id);

      const totalItemOnCart = userCart?.products?.length || 0;

      setItemCart(totalItemOnCart);
    }
  }, [carts, id]);

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

  const handleModalLogout = () => {
    setProfile(false);
    setConfirmLogout(true);
  };

  const handleLogout = () => {
    setConfirmLogout(false);
    userLogout();
  };

  return (
    <div className="w-full h-20 flex fixed top-[-1px] right-0 left-0 bg-transparent backdrop-blur-sm items-center justify-between px-6 md:px-16">
      <Link to="/" className="flex items-center justify-start">
        <img src={logo} alt="cartify logo" className="h-16" />
        <h1 className="font-semibold text-3xl">Cartify</h1>
      </Link>

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
            <LogIn size={30} />
          </Link>
        )}
      </div>

      <div className="md:hidden flex items-center justify-center gap-6">
        {token ? (
          <div className="flex justify-center items-center gap-6">
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
            <button onClick={handleModalLogout} className="text-2xl">
              <LogOut />
            </button>
          </div>
        ) : (
          <Link to="/login" className="flex justify-center items-center gap-1">
            <LogIn />
          </Link>
        )}
      </div>

      {confirmLogout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">
              Are you sure want to logout?
            </h2>

            <div className="flex gap-4 justify-center items-center">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmLogout(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {profile && (
        <div className="fixed inset-0 top-14 right-10  hidden md:flex justify-end items-start">
          <div className="bg-white  p-4 rounded-lg shadow-lg flex justify-between w-1/4">
            <div className="w-full gap-4 flex flex-col">
              <h2 className="text-xl font-semibold">{name}</h2>
              <button
                onClick={handleModalLogout}
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
