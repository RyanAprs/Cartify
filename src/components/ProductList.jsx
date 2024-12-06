import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../store/actions/ProductActions";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../components/StartRating";
import { checkToken, getIdUser } from "../store/actions/UserActions";
import { addToCart } from "../store/actions/CartActions";

const categories = [
  {
    value: "all categories",
    txt: "All Categories",
  },
  {
    value: "electronics",
    txt: "Electronics",
  },
  {
    value: "jewelery",
    txt: "Jewelery",
  },
  {
    value: "men's clothing",
    txt: "Men's Clothing",
  },
  {
    value: "women's clothing",
    txt: "Women's Clothing",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products);
  const token = checkToken();

  const [selectedCategory, setSelectedCategory] = useState("all categories");

  const handleClickCategory = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "all categories") {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(category));
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (productId, quantity) => {
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
    <div className="flex flex-col w-full gap-8 min-h-screen max-h-fit bg-second-color">
      <div className="md:flex md:justify-between justify-end items-center">
        <h1 className="md:text-2xl text-xl font-bold">
          Exclusive Collections Just for You!
        </h1>
        <select
          value={selectedCategory}
          onChange={handleClickCategory}
          className="bg-main-color p-3 w-full md:w-auto rounded-full"
        >
          {categories.map((ct, id) => (
            <option key={id} value={ct.value}>
              {ct.txt}
            </option>
          ))}
        </select>
      </div>

      <div className="product-list h-full">
        {error && (
          <p className="text-red-500 text-center font-semibold">
            Error: {error}
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 sm:gap-6 gap-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between h-full bg-main-color p-3 rounded-xl"
            >
              <Link
                to={`/product/${product.id}`}
                className="flex flex-col justify-between h-full"
              >
                <div className="flex justify-center items-center mb-4">
                  <img
                    className="sm:h-40 h-20 w-auto object-contain"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-grow mb-4">
                  <h1 className="sm:text-lg text-sm font-bold line-clamp-2">
                    {product.title}
                  </h1>
                  <p className="sm:text-lg text-sm font-semibold">
                    ${product.price}
                  </p>
                </div>
                <div className="flex flex-col w-full items-end gap-2">
                  <div className="flex text-md w-full justify-start items-center gap-1">
                    <StarRating rating={product.rating.rate} />
                    <p className="sm:text-lg text-sm sm:font-normal font-light">{`(${product.rating.count})`}</p>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => handleAddToCart(product.id, 1)}
                className="bg-third-color w-full sm:py-3 py-2 text-sm rounded-full text-main-color mt-4 md:w-1/2 2xl:w-1/4"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
