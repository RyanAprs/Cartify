import { useEffect } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const { carts, loading, error } = useSelector((state) => state.carts);

  useEffect(() => {
    console.log(carts);
  }, [carts]);

  return <div>Cart</div>;
};

export default Cart;
