import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts } from "../store/actions/ProductActions";
import StarRating from "../components/StartRating";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { checkToken, getIdUser } from "../store/actions/UserActions";
import { addToCart } from "../store/actions/CartActions";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = checkToken();
  const [quantity, setQuantity] = useState(1);

  const { singleProduct, loading, singleProductNotFound } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(id));
  }, [dispatch, id]);

  const handleMinus = () => {
    setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = (productId) => {
    if (!token) {
      navigate("/login");
    } else {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      const userId = getIdUser(token);
      const productDataToCart = {
        productId,
        quantity,
      };

      // Tambahkan produk ke keranjang
      dispatch(addToCart(userId, formattedDate, [productDataToCart]));
    }
  };

  if (loading) {
    return (
      <div className="bg-second-color h-screen w-full flex justify-center items-center">
        <h1 className="text-4xl text-third-color">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen  flex flex-col max-h-fit bg-second-color 2xl:gap-10 gap-6 pt-20">
        <Link
          to="/"
          className="flex justify-start items-center text-xl 2xl:text-2xl"
        >
          <ChevronLeft size={30} />
          Back
        </Link>
        {singleProductNotFound ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-third-color mb-4">404</h1>
              <p className="text-2xl text-gray-600 mb-8 ">Product Not Found</p>
            </div>
          </div>
        ) : (
          <div className="flex md:flex-row flex-col px-2 gap-4 md:gap-10">
            <div className="flex md:w-1/2 w-full justify-center px-10 py-2 bg-main-color items-center rounded-xl">
              <img
                className="md:h-96 2xl:h-3/4 w-full md:w-auto object-contain"
                src={singleProduct.image}
                alt={singleProduct.title}
              />
            </div>
            <div className="md:w-1/2 w-full flex flex-col md:gap-5 gap-3 2xl:gap-8 justify-evenly">
              <h2 className="text-xl font-bold md:hidden flex">
                ${singleProduct.price}
              </h2>
              <h1 className="text-4xl font-semibold md:font-bold 2xl:text-8xl">
                {singleProduct.title}
              </h1>
              <div className=" flex justify-starts gap-2 items-center text-lg">
                <StarRating rating={singleProduct.rating?.rate} />
                <p>({singleProduct.rating?.count})</p>
              </div>
              <div className="flex items-center justify-start gap-4 text-lg">
                <p>Stock:</p>
                <p>{singleProduct.quantity}</p>
              </div>
              <div className="flex flex-col 2xl:text-3xl text-xl">
                <p className="font-semibold">Product description</p>
                <p className="text-justify">{singleProduct.description}</p>
              </div>
              <h2 className="text-2xl font-semibold md:flex hidden 2xl:text-4xl">
                ${singleProduct.price}
              </h2>

              <div className="flex md:gap-5 gap-3 md:flex-row flex-col">
                <div className="flex bg-main-color py-3 rounded-full justify-center gap-8 items-center w-full md:w-1/2 ">
                  <button onClick={handleMinus} disabled={quantity === 1}>
                    <Minus />
                  </button>
                  <h1 className="text-xl">{quantity}</h1>
                  <button onClick={handlePlus}>
                    <Plus />
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(singleProduct.id)}
                  className="bg-third-color w-full md:w-1/2 py-3 2xl:py-5 2xl:text-2xl rounded-full text-main-color"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
