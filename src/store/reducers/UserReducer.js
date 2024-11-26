import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../actions/UserActions";

const UserState = {
  token: null,
  loading: false,
  error: null,
};

export const UserReducer = (state = UserState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
