import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const FETCH_ALL_EVENTS = "FETCH_ALL_EVENTS";
export const FETCH_EVENT = "FETCH_EVENT";
export const ADD_EVENT = "ADD_EVENT";

export const fetchAllEvents = () => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/events`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: FETCH_ALL_EVENTS,
        payload: response.body.events
      })
    )

    .catch(err => alert(err));
};



export const fetchEvent = eventId => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/events/${eventId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: FETCH_EVENT,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};



export const addEvent = event => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .post(`${baseUrl}/events`)
    .set("Authorization", `Bearer ${jwt}`)
    .send({
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      image: event.image
    })
    .then(response =>
      dispatch({
        type: ADD_EVENT,
        payload: response.body
      })
    );
};

