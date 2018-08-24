import { FETCH_ALL_COMMENTS, ADD_COMMENT } from "../actions/Comments";

export default function(state = [], action) {
  switch (action.type) {
    case  FETCH_ALL_COMMENTS:
      return action.payload;

    case  ADD_COMMENT:
      return [
        ...state,
        action.payload
      ]

    default:
      return state;
  }
}