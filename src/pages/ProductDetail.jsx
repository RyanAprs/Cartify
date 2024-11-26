import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProductById } from "../store/actions/ProductActions";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleProduct, loading, singleProductError } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log(singleProduct);
  }, [singleProduct]);

  return <div>ProductDetail</div>;
};

export default ProductDetail;
