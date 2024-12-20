import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URI = "https://fakestoreapi.com";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";

export const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

export const userLoginSuccess = (token) => ({
  type: USER_LOGIN_SUCCESS,
  payload: token,
});

export const userLoginError = (error) => ({
  type: USER_LOGIN_ERROR,
  payload: error,
});

export const loginUser = (username, password) => async (dispatch) => {
  dispatch(userLoginRequest());

  try {
    const response = await axios.post(`${BASE_URI}/auth/login`, {
      username,
      password,
    });

    console.log(response);

    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem("token", token);
      dispatch(userLoginSuccess({ token }));
      window.location.href = "/";
    }
  } catch (error) {
    dispatch(
      userLoginError(
        error.response?.data?.message || "Invalid usename or password"
      )
    );
  }
};

export const FETCH_USER_BY_ID_REQUEST = "FETCH_USER_BY_ID_REQUEST";
export const FETCH_USER_BY_ID_SUCCESS = "FETCH_USER_BY_ID_SUCCESS";
export const FETCH_USER_BY_ID_ERROR = "FETCH_USER_BY_ID_ERROR";

export const fetchUserByIdRequest = () => ({
  type: FETCH_USER_BY_ID_REQUEST,
});

export const fetchUserByIdSuccess = (user) => ({
  type: FETCH_USER_BY_ID_SUCCESS,
  payload: user,
});

export const fetchUserByIdError = (error) => ({
  type: FETCH_USER_BY_ID_ERROR,
  payload: error,
});

export const fetchUserById = (id) => async (dispatch) => {
  dispatch(fetchUserByIdRequest());
  try {
    if (id) {
      const response = await axios.get(`${BASE_URI}/users/${id}`);

      dispatch(fetchUserByIdSuccess(response.data));
      return response.data;
    }
  } catch (error) {
    dispatch(fetchUserByIdError(error.message));
    throw error;
  }
};

export const checkToken = () => {
  const token = localStorage.getItem("token");
  return token ? token : null;
};

export const getIdUser = (token) => {
  if (token) {
    const decoded = jwtDecode(token);
    const id = decoded.sub;

    return id;
  }
};

export const userLogout = () => {
  window.location.href = "/login";
  localStorage.removeItem("token");
};
