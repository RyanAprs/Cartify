import { useEffect } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const { carts, loading, error } = useSelector((state) => state.carts);

  useEffect(() => {
    console.log(carts);
  }, [carts]);

  if (loading) {
    return (
      <div className="bg-second-color h-screen w-full flex justify-center items-center">
        <h1 className="text-4xl text-third-color">Loading...</h1>
      </div>
    );
  }

  return <div>Cart</div>;
};

export default Cart;
