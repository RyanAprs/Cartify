import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "../store/actions/UserActions";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  fetchProducts,
  updateProductQuantity,
} from "../store/actions/ProductActions";
import { Minus, Plus } from "lucide-react";
import { updateCart } from "../store/actions/CartActions";

const Cart = () => {
  const { carts, loading, error } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();

  const [productsDetails, setProductsDetails] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCheckoutError, setShowCheckoutError] = useState(false);
  const [showCheckoutSucccess, setShowCheckoutSucccess] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  useEffect(() => {
    const fetchProductsDetails = async () => {
      if (carts?.[0]?.products?.length) {
        try {
          const products = carts[0].products;
          let arr = [];

          await Promise.all(
            products.map(async (item) => {
              const response = await dispatch(fetchProducts(item.productId));
              arr.push(response);
            })
          );
          setProductsDetails(arr);
          let initialQuantities = {};
          carts[0].products.forEach((item) => {
            initialQuantities[item.productId] = item.quantity;
          });
          setQuantities(initialQuantities);
        } catch (err) {
          console.error("Error fetching product details:", err);
        }
      }
    };

    fetchProductsDetails();
  }, [carts, dispatch]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const handleQuantityChange = (productId, type) => {
    setQuantities((prevQuantities) => {
      let newQuantity =
        type === "increase"
          ? prevQuantities[productId] + 1
          : prevQuantities[productId] - 1;

      if (newQuantity < 1) {
        setProductToRemove(productId);
        setShowConfirmModal(true);
        newQuantity = 1;
      }

      const updatedQuantities = {
        ...prevQuantities,
        [productId]: Math.max(newQuantity, 1),
      };

      setSelectedProducts((prevSelected) => {
        if (prevSelected[productId]) {
          return {
            ...prevSelected,
            [productId]: { quantity: updatedQuantities[productId] },
          };
        }
        return prevSelected;
      });

      return updatedQuantities;
    });
  };

  const handleConfirmRemove = () => {
    const updatedCartProducts = carts[0].products.filter(
      (item) => item.productId !== productToRemove
    );

    const updatedCart = { ...carts[0], products: updatedCartProducts };
    dispatch(updateCart(updatedCart));
    setShowConfirmModal(false);
    window.location.reload();
  };

  const handleCancelRemove = () => {
    setShowConfirmModal(false);
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = { ...prevSelected };

      if (newSelected[productId]) {
        delete newSelected[productId];
      } else {
        newSelected[productId] = {
          quantity: quantities[productId] || 1,
        };
      }

      return newSelected;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    productsDetails.forEach((product) => {
      if (selectedProducts[product.id]) {
        const quantity = quantities[product.id] || 1;
        total += product.price * quantity;
      }
    });
    return total;
  };

  const handleCheckOut = () => {
    let hasError = false;

    Object.entries(selectedProducts).forEach(([productId, productDetails]) => {
      if (hasError) return;

      const product = productsDetails.find((p) => p.id === parseInt(productId));
      const quantity = productDetails.quantity;

      if (quantity > product.quantity) {
        hasError = true;
        setShowCheckoutError(true);
        return;
      }
    });

    if (hasError) {
      return;
    }

    Object.entries(selectedProducts).forEach(([productId, productDetails]) => {
      const quantity = productDetails.quantity;

      dispatch(
        updateProductQuantity({ productId: parseInt(productId), quantity })
      );

      const updatedCartProducts = carts[0].products.filter(
        (item) => !selectedProducts[item.productId]
      );

      const updatedCart = { ...carts[0], products: updatedCartProducts };
      dispatch(updateCart(updatedCart));
    });

    setShowCheckoutSucccess(true);
  };

  const handleCloseSuccess = () => {
    setShowCheckoutSucccess(false);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  if (loading) {
    return (
      <div className="bg-second-color h-screen w-full flex justify-center items-center">
        <h1 className="text-4xl text-third-color">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-second-color h-screen w-full flex justify-center items-center">
        <h1 className="text-4xl text-red-600">Error loading cart</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-h-fit bg-second-color 2xl:gap-10 gap-6 pt-20">
      <div className="flex items-center justify-between gap-4 md:w-1/2 w-full">
        <Link to="/" className="flex justify-center items-center gap-1  p-1">
          <ChevronLeft size={20} />
          <h1 className="text-xl">Back</h1>
        </Link>
        <h1 className=" text-3xl font-semibold">My Cart</h1>
      </div>

      {/* Cart list for desktop */}
      <div className="overflow-x-auto md:flex hidden">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="border-b">
              <th className="text-center p-4">Products</th>
              <th className="text-center p-4">Price</th>
              <th className="text-center p-4">Quantity</th>
              <th className="text-center p-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {productsDetails.length > 0 ? (
              productsDetails.map((product, index) => {
                const cartProduct = carts[0].products.find(
                  (item) => item.productId === product.id
                );
                const quantity =
                  quantities[product.id] || cartProduct?.quantity || 0;

                return (
                  <tr key={index} className="border-b">
                    <td className="flex justify-start p-4 items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts[product.id] ? true : false}
                        onChange={() => handleCheckboxChange(product.id)}
                      />
                      <Link
                        to={`/product/${product.id}`}
                        className="flex items-center gap-4"
                      >
                        <div className="bg-main-color p-4">
                          <img
                            src={product.image}
                            className="h-32 w-auto object-contain"
                            alt={product.title}
                          />
                        </div>
                        <div className="w-60 flex flex-col gap-3">
                          <p>{product.title}</p>
                          <p>Stock: {product.quantity}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="text-center p-4">${product.price}</td>
                    <td className="text-center p-4">
                      <div className="flex justify-center items-center gap-4 border-2 p-2 rounded-full">
                        <button
                          onClick={() =>
                            handleQuantityChange(product.id, "decrease")
                          }
                        >
                          <Minus />
                        </button>
                        <div>{quantity}</div>
                        <button
                          onClick={() =>
                            handleQuantityChange(product.id, "increase")
                          }
                        >
                          <Plus />
                        </button>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      ${product.price * quantity}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  You haven't selected an item
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Cart list for mobile */}
      <div className="flex flex-col md:hidden pb-32 justify-center items-center">
        {productsDetails.length > 0 ? (
          productsDetails.map((product, index) => {
            // Mencari quantity dari carts yang sesuai dengan productId
            const cartProduct = carts[0].products.find(
              (item) => item.productId === product.id
            );
            const quantity =
              quantities[product.id] || cartProduct?.quantity || 0;

            return (
              <div
                key={index}
                className="flex flex-col w-full justify-center items-center"
              >
                <div className="flex  bg-main-color w-full  p-4 items-center ">
                  <input
                    type="checkbox"
                    checked={selectedProducts[product.id] ? true : false}
                    onChange={() =>
                      handleCheckboxChange(product.id, quantities[product.id])
                    }
                  />

                  <div className="flex justify-end items-center w-full gap-4">
                    <div className="bg-main-color p-4">
                      <img
                        src={product.image}
                        className="sm:h-32 h-20 w-auto object-contain"
                        alt={product.title}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col gap-2">
                      <div className="sm:text-lg text-sm">{product.title}</div>
                      <div className="sm:text-lg text-sm">
                        Stock: {product.quantity}
                      </div>
                      <div className="sm:text-lg text-sm font-semibold">
                        ${product.price}
                      </div>
                      <div className="w-full flex justify-end">
                        <div className="flex justify-center items-center gap-4 border-2 p-1 rounded-full">
                          <button
                            onClick={() =>
                              handleQuantityChange(product.id, "decrease")
                            }
                          >
                            <Minus />
                          </button>
                          <div>{quantity}</div>
                          <button
                            onClick={() =>
                              handleQuantityChange(product.id, "increase")
                            }
                          >
                            <Plus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div colSpan="4" className="text-center p-4">
              You haven't selected an item
            </div>
          </div>
        )}
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Are you sure?</h2>
            <p className="my-4">
              You are about to remove this product from your cart.
            </p>
            <div className="flex gap-4 justify-end items-center">
              <button
                onClick={handleConfirmRemove}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={handleCancelRemove}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {showCheckoutSucccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
            <h2 className="text-xl font-semibold">
              Product checked out successfully!!
            </h2>
            <div className="flex gap-4 justify-end items-center">
              <button
                onClick={handleCloseSuccess}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {showCheckoutError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">
              product orders, exceeding available stock!
            </h2>
            <p className="my-4">please recheck the product stock</p>
            <div className="flex gap-4 justify-end items-center">
              <button
                onClick={() => setShowCheckoutError(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:static fixed bottom-0 right-3 left-1 w-full bg-second-color">
        <div className="md:mt-6 p-4 flex justify-between">
          <h2 className="text-xl font-semibold">Total Price</h2>
          <p className="text-xl font-semibold">${calculateTotal()}</p>
        </div>
        <div className="w-full flex justify-end items-center p-4">
          <button
            onClick={() => handleCheckOut()}
            disabled={Object.keys(selectedProducts).length === 0}
            className="bg-third-color w-full md:w-1/4 py-3 text-main-color font-semibold rounded-full cursor-pointer"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
