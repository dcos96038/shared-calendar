import React from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";

import {eventCleanActiveNote, eventDelete} from "../../actions/events";

export const DeleteEventFab = () => {
  const {activeEvent} = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(eventDelete(activeEvent.id));
    dispatch(eventCleanActiveNote());
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash" />
      <span>Borrar evento</span>
    </button>
  );
};
