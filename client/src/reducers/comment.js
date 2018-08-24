import { FETCH_COMMENT,ADD_COMMENT } from "../actions/Comments";

const comment = {};

export default function(state = comment, action) {
  switch (action.type) {
    case FETCH_COMMENT:
      return action.payload;

    case ADD_COMMENT:
      return action.payload;

    default:
      return state;
  }
}