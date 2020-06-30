import * as types from "./../actionsTypes";
import validator from "validator";
import axios from "axios";

export const register = (username, email, password, password_confirmed) => {
  return async (dispatch) => {
    let errors = [];
    if (!username) {
      errors.push("error");
      dispatch({
        type: types.REGISTER_ERROR,
        payload: { field: "username", message: "Please enter a username" },
      });
    }
    if (!validator.isEmail(email)) {
      errors.push("error");
      dispatch({
        type: types.REGISTER_ERROR,
        payload: {
          field: "email",
          message: "Please enter a valid email address",
        },
      });
    }
    if (
      password.includes("123456") ||
      password.includes("000000") ||
      password.includes("passwor") ||
      password === ""
    ) {
      errors.push("error");
      dispatch({
        type: types.REGISTER_ERROR,
        payload: {
          field: "password",
          message:
            "Please enter a password that does not inlude '123456', '000000' or 'password'",
        },
      });
    }
    if (password !== password_confirmed) {
      errors.push("error");
      dispatch({
        type: types.REGISTER_ERROR,
        payload: {
          field: "password_confirmed",
          message: "Your two passwords must match",
        },
      });
    }

    if (errors.length === 0) {
      const res = await axios.post("/api/users/register", {
        username: username,
        email: email,
        password1: password,
        password2: password_confirmed,
      });

      if (res.status === 201) {
        dispatch({
          type: types.REGISTER_SUCCESS,
          payload: res.data,
        });
      }
    }
  };
};
