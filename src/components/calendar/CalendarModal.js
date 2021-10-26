import React, {useEffect, useState} from "react";
import ReactModal from "react-modal";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import {add, compareAsc} from "date-fns";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";

import {uiCloseModal} from "../../actions/ui";
import {eventAddNew, eventCleanActiveNote, eventUpdated} from "../../actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

const nowDate = new Date();
const endDate = add(nowDate, {
  hours: 2,
});

const initEvent = {
  title: "",
  notes: "",
  start: nowDate,
  end: endDate,
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const {modalOpen} = useSelector((state) => state.ui);
  const {activeEvent} = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = useState(nowDate);
  const [dateEnd, setDateEnd] = useState(endDate);
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const {notes, title, start, end} = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent]);

  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(eventCleanActiveNote());
    dispatch(uiCloseModal());
  };

  const handleStartDate = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDate = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (compareAsc(start, end) === 1) {
      return Swal.fire("Error", "La fecha de finalizacion debe ser mayor a la de inicio", "error");
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if (activeEvent) {
      dispatch(
        eventUpdated({
          ...activeEvent,
          ...formValues,
        }),
      );
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date(),
          user: {
            _id: "123",
            name: "Diego",
          },
        }),
      );
    }

    //TODO: Grabacion en DB
    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      className="modal"
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      isOpen={modalOpen}
      overlayClassName="modal-fondo"
      style={customStyles}
      onRequestClose={closeModal}
    >
      <h1> {activeEvent ? "Editar evento" : "Nuevo evento"} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha y hora de inicio</label>
          <DateTimePicker
            className="form-control"
            minDate={nowDate}
            value={dateStart}
            onChange={handleStartDate}
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora de inicio</label>
          <DateTimePicker
            className="form-control"
            minDate={nowDate}
            value={dateEnd}
            onChange={handleEndDate}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            autoComplete="off"
            className={`form-control ${!titleValid && "is-invalid"}`}
            name="title"
            placeholder="Título del evento"
            type="text"
            value={title}
            onChange={handleInputChange}
          />
          <small className="form-text text-muted" id="emailHelp">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            className="form-control"
            name="notes"
            placeholder="Notas"
            rows="5"
            type="text"
            value={notes}
            onChange={handleInputChange}
          />
          <small className="form-text text-muted" id="emailHelp">
            Información adicional
          </small>
        </div>

        <button className="btn btn-outline-primary btn-block" type="submit">
          <i className="far fa-save" />
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
