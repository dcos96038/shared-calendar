import {add} from "date-fns";

import {types} from "../types/types";

const initialState = {
  events: [
    {
      id: new Date(),
      title: "Un evento",
      start: new Date(),
      end: add(new Date(), {
        hours: 2,
      }),
      bgcolor: "#fafafa",
      user: {
        _id: "123",
        name: "Diego",
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  if (action.type === types.eventSetActive) {
    return {
      ...state,
      activeEvent: action.payload,
    };
  }

  if (action.type === types.eventAddNew) {
    return {
      ...state,
      events: [...state.events, action.payload],
    };
  }

  if (action.type === types.eventCleanActive) {
    return {
      ...state,
      activeEvent: null,
    };
  }

  if (action.type === types.eventUpdate) {
    return {
      ...state,
      events: state.events.map((event) => {
        if (event.id === action.payload.id) {
          return action.payload;
        }

        return event;
      }),
    };
  }

  if (action.type === types.eventDelete) {
    return {
      ...state,
      events: state.events.filter((event) => event.id !== action.payload),
    };
  }

  return state;
};
