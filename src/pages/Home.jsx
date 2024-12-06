import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ProductList from "../components/ProductList";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../store/actions/ProductActions";
import { useDispatch } from "react-redux";

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

const Home = () => {
  const dispatch = useDispatch();
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

  return (
    <div className="flex flex-col w-full pt-20 gap-5 min-h-screen max-h-fit bg-second-color">
      <HeroSection />
      <div className="flex flex-col w-full gap-8  bg-second-color">
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
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Home;
