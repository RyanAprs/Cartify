import heroimg from "../assets/heroimg.png";

const HeroSection = () => {
  return (
    <div className="bg-fourth-color w-full min-h-56 max-h-fit flex md:flex-row flex-col gap-0 md:gap-48 justify-center items-center ">
      <div className="flex flex-col justify-center items-start gap-6">
        <h1 className="text-3xl font-semibold md:text-4xl text-third-color flex flex-col gap-2">
          <span>Grab Upto 50% Off On </span>
          <span>Selected Product</span>
        </h1>
        <button className="flex w-full md:w-1/2 text-xl items-center justify-center font-normal bg-third-color py-2 px-4 text-main-color rounded-full">
          Buy Now
        </button>
      </div>
      <div>
        <img
          src={heroimg}
          alt="hero image"
          className="h-56 hidden md:flex overflow-hidden"
        />
      </div>
    </div>
  );
};

export default HeroSection;
