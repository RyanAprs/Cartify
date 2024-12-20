import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_URI;

// ADD TO CART
export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_ERROR = "ADD_TO_CART_ERROR";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const UPDATE_CART = "UPDATE_CART";

export const addToCartRequest = () => ({
  type: ADD_TO_CART_REQUEST,
});

export const addToCartSuccess = (data) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: data,
});

export const addToCartError = (error) => ({
  type: ADD_TO_CART_ERROR,
  payload: error,
});

export const updateCart = (updatedCart) => ({
  type: UPDATE_CART,
  payload: updatedCart,
});

export const addToCart = (userId, date, products) => async (dispatch) => {
  dispatch(addToCartRequest());

  try {
    const response = await axios.post(`${BASE_URI}/carts`, {
      userId,
      date,
      products,
    });

    dispatch(addToCartSuccess(response.data));
  } catch (error) {
    dispatch(addToCartError(error.response?.data?.message || "Invalid data"));
  }
};

export const FETCH_CART_BY_ID_REQUEST = "FETCH_CART_BY_ID_REQUEST";
export const FETCH_CART_BY_ID_SUCCESS = "FETCH_CART_BY_ID_SUCCESS";
export const FETCH_CART_BY_ID_ERROR = "FETCH_CART_BY_ID_ERROR";

export const fetchCartByIdRequest = () => ({
  type: FETCH_CART_BY_ID_REQUEST,
});

export const fetchCartByIdSuccess = (cart) => ({
  type: FETCH_CART_BY_ID_SUCCESS,
  payload: cart,
});

export const fetchCartByIdError = (error) => ({
  type: FETCH_CART_BY_ID_ERROR,
  payload: error,
});

export const fetchCartByUserId = (id) => async (dispatch) => {
  dispatch(fetchCartByIdRequest());
  try {
    const response = await axios.get(`${BASE_URI}/carts/user/${id}`);
    if (response.data) {
      dispatch(fetchCartByIdSuccess(response.data));
      return response.data;
    } else {
      dispatch(FETCH_CART_BY_ID_ERROR("Product not found"));
      return null;
    }
  } catch (error) {
    dispatch(fetchCartByIdError(error.message));
    throw error;
  }
};
