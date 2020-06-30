import * as types from "./../actionsTypes";

const initState = {
  loading: true,
  authenticated: false,
  user: {},
  token: "",
  registerError: {
    username: "",
    email: "",
    password: "",
    password_confirmed: "",
    server_error: "",
  },
  loginError: {
    username: "",
    email: "",
    server_error: "",
  },
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case types.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        authenticated: false,
        user: {},
        registerError: {
          ...state.registerError,
          [action.payload.field]: action.payload.message,
        },
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload,
        registerError: {
          username: "",
          email: "",
          password: "",
          password_confirmed: "",
          server_error: "",
        },
        loginError: {},
      };
    default:
      return state;
  }
};

export default auth;
