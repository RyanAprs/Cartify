import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "../store/actions/UserActions";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { fetchProducts } from "../store/actions/ProductActions";
import { Minus, Plus } from "lucide-react"; // Pastikan ikon Plus dan Minus diimport

const Cart = () => {
  const { carts, loading, error } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();

  const [productsDetails, setProductsDetails] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});

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
      const newQuantity =
        type === "increase"
          ? prevQuantities[productId] + 1
          : prevQuantities[productId] - 1;
      return {
        ...prevQuantities,
        [productId]: Math.max(newQuantity, 1),
      };
    });
  };

  const handleCheckboxChange = (productId, quantity) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = { ...prevSelected };

      if (newSelected[productId]) {
        // If product is already selected, remove it
        delete newSelected[productId];
      } else {
        // Add productId and quantity when selected
        newSelected[productId] = { quantity };
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
    for (const productId in selectedProducts) {
      const product = selectedProducts[productId];
      console.log("Product ID:", productId);
      console.log("Quantity:", product.quantity);
    }
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
      <div className="flex items-center justify-start gap-4 ">
        <Link to="/" className="flex justify-center items-center gap-4  p-1">
          <ArrowLeft size={30} />
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
                // Mencari quantity dari carts yang sesuai dengan productId
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
                        onChange={() =>
                          handleCheckboxChange(
                            product.id,
                            quantities[product.id]
                          )
                        }
                      />
                      <div className="bg-main-color p-4">
                        <img
                          src={product.image}
                          className="h-32 w-auto object-contain"
                          alt=""
                        />
                      </div>
                      <p className="w-60">{product.title}</p>{" "}
                    </td>
                    <td className="text-center p-4">${product.price}</td>
                    <td className="text-center p-4">
                      <div className="flex justify-center items-center gap-4 border-2 p-2">
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
                    <td className="text-center p-4"></td>
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
                <div className="flex flex-col bg-main-color w-full">
                  <div className="flex justify-start p-4 items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts[product.id] ? true : false}
                      onChange={() =>
                        handleCheckboxChange(product.id, quantities[product.id])
                      }
                    />

                    <div className="bg-main-color p-4">
                      <img
                        src={product.image}
                        className="h-32  w-auto object-contain"
                        alt={product.title}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col gap-2">
                      <div className="text-lg">{product.title}</div>
                      <div className="text-lg font-semibold">
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

      <div className="flex flex-col md:static fixed bottom-0 right-3 left-1 w-full bg-second-color">
        <div className="md:mt-6  p-4 flex justify-between">
          <h2 className="text-xl font-semibold">Total Price</h2>
          <p className="text-xl font-semibold">${calculateTotal()}</p>
        </div>
        <div className="w-full flex justify-end items-center p-4">
          <button
            onClick={() => handleCheckOut()}
            disabled={Object.keys(selectedProducts).length === 0}
            className="bg-third-color w-full md:w-1/4 py-3 text-main-color font-semibold rounded-full"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
