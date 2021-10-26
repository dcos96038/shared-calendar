import React from "react";
import {useDispatch} from "react-redux";

import {eventCleanActiveNote} from "../../actions/events";
import {uiOpenModal} from "../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(uiOpenModal());
    dispatch(eventCleanActiveNote());
  };

  return (
    <button className="btn btn-primary fab" onClick={handleAdd}>
      <i className="fas fa-plus" />
    </button>
  );
};
