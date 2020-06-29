import * as types from "./../actionsTypes";
import validator from "validator";
import axios from "axios";

export const register = (username, email, password, password_confirmed) => {
  return async (dispatch) => {
    if (!username) {
      return dispatch({
        type: types.REGISTER_ERROR,
        payload: "Please enter a username",
      });
    }
    if (!validator.isEmail(email)) {
      return dispatch({
        type: types.REGISTER_ERROR,
        payload: "Please enter a valid email address",
      });
    }
    if (!password) {
      return dispatch({
        type: types.REGISTER_ERROR,
        payload: "Please enter a password",
      });
    }
    if (
      password.includes("123456") ||
      password.includes("000000") ||
      password.includes("passwor")
    ) {
      return dispatch({
        type: types.REGISTER_ERROR,
        payload:
          "Your password may not inlude '123456', '000000' or 'password'",
      });
    }
    if (password !== password_confirmed) {
      return dispatch({
        type: types.REGISTER_ERROR,
        payload: "Your two passwords must match",
      });
    }
  };
};
