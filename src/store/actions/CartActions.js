import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_URI;

// ADD TO CART
export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_ERROR = "ADD_TO_CART_ERROR";

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

export const addToCart = (userId, date, products) => async (dispatch) => {
  dispatch(addToCartRequest());

  try {
    const response = await axios.post(`${BASE_URI}/carts`, {
      userId,
      date,
      products,
    });

    console.log(response.data);

    dispatch(addToCartSuccess(response.data));
  } catch (error) {
    dispatch(addToCartError(error.response?.data?.message || "Invalid data"));
  }
};
