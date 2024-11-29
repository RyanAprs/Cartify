import HeroSection from "../components/HeroSection";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div className="flex flex-col w-full pt-20 gap-5 min-h-screen max-h-fit bg-second-color">
      <HeroSection />
      <ProductList />
    </div>
  );
};

export default Home;
