import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const FETCH_ALL_COMMENTS = "FETCH_ALL_COMMENTS";
export const FETCH_COMMENT = "FETCH_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";

export const fetchAllComments = () => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/comments`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: FETCH_ALL_COMMENTS,
        payload: response.body.comments
      })
    )

    .catch(err => alert(err));
};

export const fetchComment = commentId => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/comments/${commentId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: FETCH_COMMENT,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

export const addComment = comment => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .post(`${baseUrl}/comments`)
    .set("Authorization", `Bearer ${jwt}`)
    .send({
      comment: comment.comment,
      tickets: state.ticket
    })
    .then(response =>
      dispatch({
        type: ADD_COMMENT,
        payload: response.body
      })
    );
};