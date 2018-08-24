import { FETCH_TICKET,ADD_TICKET } from "../actions/Tickets";

const ticket = {};

export default function(state = ticket, action) {
  switch (action.type) {
    case FETCH_TICKET:
      return action.payload;

    case ADD_TICKET:
      return action.payload;

    default:
      return state;
  }
}
