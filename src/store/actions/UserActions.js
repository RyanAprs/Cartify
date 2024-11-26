import axios from "axios";
import Cookies from "js-cookie";

const BASE_URI = import.meta.env.VITE_BASE_URI;

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

    if (response.status === 200) {
      const { token } = response.data;
      Cookies.set("token", token, { expires: 7, secure: true });
      dispatch(userLoginSuccess({ token }));
    }
  } catch (error) {
    dispatch(
      userLoginError(
        error.response?.data?.message || "Invalid usename or password"
      )
    );
  }
};