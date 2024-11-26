import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../components/HeroSection";
import { useEffect } from "react";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../store/actions/ProductActions";
import { Link } from "react-router-dom";
import StarRating from "../components/StartRating";

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  const handleClickCategory = (e) => {
    const selectedCategory = e.target.value;

    if (selectedCategory === "all categories") {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = () => {};

  if (loading) {
    return (
      <div className="bg-second-color h-screen w-full flex justify-center items-center">
        <h1 className="text-4xl text-third-color">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pt-2 gap-8 min-h-screen max-h-fit bg-second-color">
      <HeroSection />
      <div className="md:flex md:justify-between justify-end items-center">
        <h1 className="md:text-2xl text-xl font-bold">
          Exclusive Collections Just for You!
        </h1>
        <select
          onChange={handleClickCategory}
          className="bg-main-color p-3 w-full md:w-auto rounded-full"
        >
          <option value="all categories" defaultValue={true}>
            All Categories
          </option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>

      <div className="product-list h-full">
        {error && <p>Error: {error}</p>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="bg-main-color p-3 rounded-xl flex flex-col justify-between h-full"
            >
              <div className="flex justify-center items-center mb-4">
                <img
                  className="h-40 w-auto"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="flex flex-col gap-2 flex-grow mb-4">
                <h1 className="text-lg font-bold line-clamp-2">
                  {product.title}
                </h1>
                <p className="text-lg">${product.price}</p>
              </div>
              <div className="flex flex-col w-full items-end gap-4 justify-end">
                <div className="flex text-md w-full justify-start">
                  <StarRating rating={product.rating.rate} />
                  <p>{`(${product.rating.count})`}</p>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-third-color md:w-1/2 w-full py-2 font-semibold rounded-full text-main-color"
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
