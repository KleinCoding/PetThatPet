import Axios from 'axios';

const initialState = {
  currentUser_id: null,
  currentUsername: null,
  currentUser: {},
  loading: false,
  loggedIn: false
}

const GET_CURRENT_USER = "GET_CURRENT_USER"
const GET_SESSION = "GET_SESSION";
const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

// action creators
export function getSession() {
  return {
    type: GET_SESSION,
    payload: Axios.get("/auth/user")
  }
}


export function getCurrentUser(user_id) {
  return{
  type: GET_CURRENT_USER,
  payload: Axios.get(`/auth/user/${user_id}`)
  }
}
export function registerUser(newUser) {
  return {
    type: REGISTER_USER,
    payload: Axios.post("/auth/register", newUser)
  }
}

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: Axios.post("/auth/login", user)
  }
}

export function logoutUser() {
  Axios.get("/auth/logout")
  return {
    type: LOGOUT_USER
  }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case `${GET_CURRENT_USER}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${GET_CURRENT_USER}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        currentUser: payload.data
      }
    }

    case `${GET_SESSION}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${GET_SESSION}_FULFILLED`: {
      return {
        ...state,
        currentUser_id: payload.data.user_id,
        currentUsername: payload.data.username,
        loading: false
      }
    }
    case `${REGISTER_USER}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${REGISTER_USER}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        user_id: payload.data.user_id,
        username: payload.data.user
      }
    }
    case `${LOGIN_USER}_PENDING`: {
      return {
        ...state
      }
    }
    case `${LOGIN_USER}_FULFILLED`: {
      return {
        ...state,
        currentUser_id: payload.data.user_id,
        currentUsername: payload.data.username,
        loading: false,
        loggedIn: true
      }
    }
    case LOGOUT_USER: {
      return {
        user_id: null,
        username: "",
        loading: false
      }
    }
    default:
      return state;
  }
}