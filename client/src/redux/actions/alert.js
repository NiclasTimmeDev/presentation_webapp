import * as types from "./../actionsTypes";

const setAlert = async (type, message) => {
  try {
    return async (dispatch) => {
      dispatch({
        type: types.SET_ALERT,
        payload: {
          type: type,
          message: message,
        },
      });
      setTimeout(() => {
        dispatch({
          type: types.REMOVE_ALERT,
        });
      }, 5000);
    };
  } catch (error) {
    console.log(error.message);
  }
};
