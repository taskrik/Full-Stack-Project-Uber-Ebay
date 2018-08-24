import { FETCH_ALL_TICKETS } from "../actions/Tickets";

export default function(state = [], action) {
  switch (action.type) {
    case  FETCH_ALL_TICKETS:
      return action.payload;

    default:
      return state;
  }
}

