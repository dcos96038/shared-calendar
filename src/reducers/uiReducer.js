import {types} from "../types/types";

const initialState = {
  modalOpen: false,
};

export const uiReducer = (state = initialState, action) => {
  if (action.type === types.uiOpenModal) {
    return {
      ...state,
      modalOpen: true,
    };
  }

  if (action.type === types.uiCloseModal) {
    return {
      ...state,
      modalOpen: false,
    };
  }

  return state;
};
