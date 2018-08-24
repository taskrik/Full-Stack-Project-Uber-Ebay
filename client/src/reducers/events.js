import { FETCH_ALL_EVENTS, ADD_EVENT  } from "../actions/Events";

export default function(state = [], action) {
  switch (action.type) {
    case  FETCH_ALL_EVENTS:
      return action.payload;

    case ADD_EVENT:
      return [
        ...state,
        action.payload
      ]

    default:
      return state;
  }
}

