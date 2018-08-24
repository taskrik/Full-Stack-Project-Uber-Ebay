import {ADD_USER, UPDATE_USER} from '../actions/users'
import {USER_LOGOUT} from '../actions/users'
  
/*
The state will contain the users in an object with the game ID as key
*/

export default (state = null, {type, payload}) => {
  switch (type) {
    case USER_LOGOUT:
      return null
      
    case ADD_USER:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_USER:
      return {
        ...state,
        [payload.id]: payload
      }

    default:
      return state
  }
}
