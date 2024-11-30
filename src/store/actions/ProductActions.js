import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_URI;

// GET ALL PRODUCTS
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const UPDATE_PRODUCT_QUANTITY = "UPDATE_PRODUCT_QUANTITY";

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

export const updateProductQuantity = (data) => ({
  type: UPDATE_PRODUCT_QUANTITY,
  payload: data,
});

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

// FETCH PRODUCTS
export const fetchProducts = (id) => async (dispatch, getState) => {
  if (id) {
    dispatch(fetchProductByIdRequest());
    try {
      const response = await axios.get(`${BASE_URI}/products/${id}`);
      const currentProduct = getState().products.products.find(
        (product) => product.id === response.data.id
      );

      if (response.data) {
        const updatedProduct = {
          ...response.data,
          quantity: currentProduct ? currentProduct.quantity : 20,
        };
        dispatch(fetchProductByIdSuccess(updatedProduct));
        return updatedProduct;
      } else {
        dispatch(fetchProductByIdNotFound("Product not found"));
        return null;
      }
    } catch (error) {
      dispatch(fetchProductByIdError(error.message));
      throw error;
    }
  } else {
    dispatch(fetchProductsRequest());
    try {
      const response = await axios.get(`${BASE_URI}/products`);

      // Ambil state saat ini dari Redux
      const currentProducts = getState().products.products;

      // Update kuantitas hanya jika produk baru
      const productsWithQuantity = response.data.map((product) => {
        const existingProduct = currentProducts.find(
          (p) => p.id === product.id
        );
        return existingProduct
          ? { ...existingProduct }
          : { ...product, quantity: 20 };
      });

      dispatch(fetchProductsSuccess(productsWithQuantity));
    } catch (error) {
      dispatch(fetchProductsError(error.message));
    }
  }
};

// GET PRODUCT BY CATEGORY
export const fetchProductsByCategory =
  (category) => async (dispatch, getState) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await axios.get(
        `${BASE_URI}/products/category/${category}`
      );

      // Ambil state saat ini dari Redux
      const currentProducts = getState().products.products;

      // Update kuantitas hanya jika produk baru
      const productsWithQuantity = response.data.map((product) => {
        const existingProduct = currentProducts.find(
          (p) => p.id === product.id
        );
        return existingProduct
          ? { ...existingProduct }
          : { ...product, quantity: 20 };
      });

      dispatch(fetchProductsSuccess(productsWithQuantity));
    } catch (error) {
      dispatch(fetchProductsError(error.message));
    }
  };
