import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../components/HeroSection";
import { useEffect } from "react";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../store/actions/ProductActions";

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

  if (loading) {
    return (
      <div className="bg-main-color h-screen w-full flex justify-center items-center">
        <h1 className="text-4xl text-third-color">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pt-2 gap-8">
      <HeroSection />
      <div className="md:flex md:justify-between justify-end items-center">
        <h1 className="md:text-2xl text-xl font-bold">
          Exclusive Collections Just for You!
        </h1>
        <select
          onChange={handleClickCategory}
          className="bg-second-color p-3 w-full md:w-auto"
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

      <div className="product-list">
        {error && <p>Error: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h2 className="text-lg font-bold">{product.title}</h2>
              <p>${product.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
