import { FETCH_EVENT,ADD_EVENT } from "../actions/Events";

const event = {};

export default function(state = event, action) {
  switch (action.type) {
    case FETCH_EVENT:
      return action.payload;

    case ADD_EVENT:
      return action.payload

    default:
      return state;
  }
}
