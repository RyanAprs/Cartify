import HeroSection from "../components/HeroSection";

const ProductList = () => {
  return (
    <div className="flex flex-col w-full pt-2 gap-8">
      <HeroSection />
      <div className="md:flex md:justify-between justify-end items-center">
        <h1 className="md:text-2xl text-xl font-bold">
          Exclusive Collections Just for You!
        </h1>
        <select name="" id="" className="bg-second-color p-3 w-full md:w-auto">
          <option value="" selected>
            All Categories
          </option>
          <option value="">Electronics</option>
          <option value="">Jewelry</option>
          <option value="">Men's Clothing</option>
          <option value="">Women's Clothing</option>
        </select>
      </div>
    </div>
  );
};

export default ProductList;
