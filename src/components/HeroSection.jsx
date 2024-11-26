import heroimg from "../assets/heroimg.png";

const HeroSection = () => {
  return (
    <div className="bg-fourth-color w-full  2xl:h-1/4  min-h-56 max-h-fit flex md:flex-row flex-col gap-0 md:gap-32 2xl:gap-56 justify-center items-center">
      <div className="flex flex-col justify-center items-start gap-6">
        <h1 className="text-3xl font-semibold md:text-5xl 2xl:text-7xl text-third-color flex flex-col gap-2">
          <span>Grab Upto 50% Off On </span>
          <span>Selected Product</span>
        </h1>
        <button className="flex w-full md:w-32 text-xl items-center justify-center font-normal bg-third-color py-2 text-main-color rounded-full">
          Buy Now
        </button>
      </div>
      <div>
        <img
          src={heroimg}
          alt="hero image"
          className="h-56 md:h-64 xl:h-80 hidden md:flex overflow-hidden"
        />
      </div>
    </div>
  );
};

export default HeroSection;
