import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_URI;

// GET ALL PRODUCTS
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsError = (error) => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: error,
});

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await axios.get(`${BASE_URI}/products`);
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsError(error.message));
  }
};

// GET PRODUCT BY ID
export const FETCH_PRODUCT_BY_ID_REQUEST = "FETCH_PRODUCT_BY_ID_REQUEST";
export const FETCH_PRODUCT_BY_ID_SUCCESS = "FETCH_PRODUCT_BY_ID_SUCCESS";
export const FETCH_PRODUCT_BY_ID_ERROR = "FETCH_PRODUCT_BY_ID_ERROR";
export const FETCH_PRODUCT_BY_ID_NOT_FOUND = "FETCH_PRODUCT_BY_ID_NOT_FOUND";

export const fetchProductByIdRequest = () => ({
  type: FETCH_PRODUCT_BY_ID_REQUEST,
});

export const fetchProductByIdSuccess = (product) => ({
  type: FETCH_PRODUCT_BY_ID_SUCCESS,
  payload: product,
});

export const fetchProductByIdError = (error) => ({
  type: FETCH_PRODUCT_BY_ID_ERROR,
  payload: error,
});

export const fetchProductByIdNotFound = (error) => ({
  type: FETCH_PRODUCT_BY_ID_NOT_FOUND,
  payload: error,
});

export const fetchProductsByCategory = (category) => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await axios.get(
      `${BASE_URI}/products/category/${category}`
    );
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsError(error.message));
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  dispatch(fetchProductByIdRequest());
  try {
    const response = await axios.get(`${BASE_URI}/products/${id}`);

    const data = response.data;

    if (data) {
      dispatch(fetchProductByIdSuccess(response.data));
    } else {
      dispatch(fetchProductByIdNotFound("Product not found"));
    }
  } catch (error) {
    dispatch(fetchProductByIdError(error.message));
  }
};
