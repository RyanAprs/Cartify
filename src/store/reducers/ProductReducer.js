import {
  FETCH_PRODUCT_BY_ID_ERROR,
  FETCH_PRODUCT_BY_ID_REQUEST,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from "../actions/ProductActions";

const ProductState = {
  products: [],
  loading: false,
  error: null,
  singleProduct: {},
  singleProductError: null,
};

export const ProductReducer = (state = ProductState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        singleProductError: null,
      };
    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        singleProduct: action.payload,
      };
    case FETCH_PRODUCT_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        singleProductError: action.payload,
      };
    default:
      return state;
  }
};
