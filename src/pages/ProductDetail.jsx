import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProductById } from "../store/actions/ProductActions";
import StarRating from "../components/StartRating";
import { ChevronLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleProduct, loading, singleProductNotFound } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

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
              <div className="md:hidden flex justify-starts gap-2 items-center text-lg">
                <StarRating rating={singleProduct.rating?.rate} />
                <p>({singleProduct.rating?.count})</p>
              </div>
              <div className="flex flex-col 2xl:text-3xl text-xl">
                <p className="font-semibold">Product description</p>
                <p className="text-justify">{singleProduct.description}</p>
              </div>
              <div className="md:flex hidden justify-starts gap-2 items-center 2xl:text-xl">
                <StarRating rating={singleProduct.rating?.rate} />
                <p>({singleProduct.rating?.count})</p>
              </div>
              <h2 className="text-xl font-semibold md:flex hidden 2xl:text-4xl">
                ${singleProduct.price}
              </h2>
              <button className="bg-third-color w-full md:w-1/2 py-3 2xl:py-5 2xl:text-2xl rounded-full text-main-color">
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
