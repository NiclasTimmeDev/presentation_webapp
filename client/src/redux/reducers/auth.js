import * as types from "./../actionsTypes";

const initState = {
  loading: true,
  authenticated: false,
  user: {},
  errorMsg: "",
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case types.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        authenticated: false,
        user: {},
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
