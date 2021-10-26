import React, {useState} from "react";
import {Calendar} from "react-big-calendar";
import {useDispatch, useSelector} from "react-redux";

import {Navbar} from "../ui/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {localizer, messages} from "../../helpers/calendarHelpers";
import {uiOpenModal} from "../../actions/ui";
import {eventCleanActiveNote, eventSetActive} from "../../actions/events";
import {AddNewFab} from "../ui/AddNewFab";
import {DeleteEventFab} from "../ui/DeleteEventFab";

import {CalendarEvent} from "./CalendarEvent";
import {CalendarModal} from "./CalendarModal";

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const {events} = useSelector((state) => state.calendar);
  const {activeEvent} = useSelector((state) => state.calendar);

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

  const onDoubleClick = () => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = () => {
    dispatch(eventCleanActiveNote());
  };

  const eventStyleGetter = () => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        components={{
          event: CalendarEvent,
        }}
        culture="es"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        events={events}
        localizer={localizer}
        messages={messages}
        selectable={true}
        startAccessor="start"
        view={lastView}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        onView={onViewChange}
      />

      <AddNewFab />

      {activeEvent && <DeleteEventFab />}

      <CalendarModal />
    </div>
  );
};
