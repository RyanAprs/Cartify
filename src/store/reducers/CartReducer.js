import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  UPDATE_CART,
} from "../actions/CartActions";

const CartState = {
  carts: [],
  loading: false,
  error: null,
};

export const CartReducer = (state = CartState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_CART_SUCCESS: {
      // validasi user id
      const existingCart = state.carts.find(
        (cart) => cart.userId === action.payload.userId
      );

      if (existingCart) {
        // Jika cart untuk userId sudah ada
        const updatedProducts = [...existingCart.products];
        action.payload.products.forEach((newProduct) => {
          // cek id product apakah sudah ada pada cart
          const existingProductIndex = updatedProducts.findIndex(
            (product) => product.productId === newProduct.productId
          );
          //   jika sudah id product sudah ada di cart maka akan menambahkan qantitynya saja
          if (existingProductIndex !== -1) {
            updatedProducts[existingProductIndex].quantity +=
              newProduct.quantity;
          } else {
            updatedProducts.push(newProduct);
          }
        });
        return {
          ...state,
          loading: false,
          carts: state.carts.map((cart) =>
            cart.userId === action.payload.userId
              ? { ...cart, products: updatedProducts }
              : cart
          ),
        };
      } else {
        // Jika cart untuk userId belum ada
        return {
          ...state,
          loading: false,
          carts: [
            ...state.carts,
            {
              userId: action.payload.userId,
              date: action.payload.date,
              products: action.payload.products,
            },
          ],
        };
      }
    }
    case ADD_TO_CART_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CART:
      return {
        ...state,
        carts: [action.payload],
      };
    default:
      return state;
  }
};
