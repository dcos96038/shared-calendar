import {types} from "../types/types";

const initialState = {
  checking: true,
};

export const authReducer = (state = initialState, action) => {
  if (action.type === types.authLogin) {
    return {
      ...state,
      ...action.payload,
      checking: false,
    };
  }

  if (action.type === types.authCheckingFinished) {
    return {
      ...state,
      checking: false,
    };
  }

  if (action.type === types.authLogout) {
    return {
      checking: false,
    };
  }

  return state;
};
