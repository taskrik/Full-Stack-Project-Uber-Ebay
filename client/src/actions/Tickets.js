import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const FETCH_ALL_TICKETS = "FETCH_ALL_TICKETS";
export const FETCH_TICKET = "FETCH_TICKET";
export const ADD_TICKET = "ADD_TICKET";

export const fetchAllTickets = () => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/tickets`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: FETCH_ALL_TICKETS,
        payload: response.body.tickets
      })
    )

    .catch(err => alert(err));
};



export const fetchTicket = ticketId => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/tickets/${ticketId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: FETCH_TICKET,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};


export const addTicket = ticket => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .post(`${baseUrl}/tickets`)
    .set("Authorization", `Bearer ${jwt}`)
    .send({
      author: ticket.authorName,
      description: ticket.description,
      price: ticket.price,
      image: ticket.image,
      events: ticket.event
    })
    .then(response =>
      dispatch({
        type: ADD_TICKET,
        payload: response.body
      })
    );
};
