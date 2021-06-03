import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  USERS_LOADED,
  SEND_OTP_SUCCESS,
  DELIVERY_BOY_LOADED,
  DELIVERY_DETAILS_LOADING,
  GET_SERVICE_AVAILABLITY,
  GET_SERVICE_AVAILABLITY_NOTICE,
  GET_GLOBAL_MESSAGE,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: [],
  loginType: null,
  otpSend: false,
  delivery_boy: null,
  serviceAvailablity: "",
  globalNotice: "",
  serviceAvailablityNotice: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case DELIVERY_BOY_LOADED:
      return {
        ...state,
        delivery_boy: payload,
        loading: false,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case USERS_LOADED:
      return {
        ...state,
        users: payload,
        loading: false,
        isAuthenticated: true,
      };

    case SEND_OTP_SUCCESS:
      return {
        ...state,
        loginType: payload.type,
        otpSend: payload.send,
      };

    case DELIVERY_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
        delivery_boy: null,
      };

    case GET_SERVICE_AVAILABLITY:
      return {
        ...state,
        serviceAvailablity: payload,
        loading: false,
      };

    case GET_SERVICE_AVAILABLITY_NOTICE:
      return {
        ...state,
        serviceAvailablityNotice: payload,
        loading: false,
      };

    case GET_GLOBAL_MESSAGE:
      return {
        ...state,
        globalNotice: payload,
        loading: false,
      };

    default:
      return state;
  }
}
