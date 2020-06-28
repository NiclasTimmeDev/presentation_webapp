import * as types from "./../actionsTypes";

const initState = {
  loading: false,
};

const spinner = (state = initState, action) => {
  switch (action.type) {
    case types.START_LOADING:
      return { ...state, loading: true };
    case types.STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default spinner;
