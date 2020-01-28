import Axios from "axios";

const initialState = {
  ratings: [],
  ratingsUser: [],
  loading: false,
  wasClicked: 0
}

const GET_ALL_RATINGS = "GET_ALL_RATINGS";
const ADD_RATING = "ADD_RATING";
const EDIT_RATING = "EDIT_RATING";
const GET_ALL_RATINGS_BY_USER_ID = "GET_ALL_RATINGS_BY_USER_ID";
const ADD_CLICK = "ADD_CLICK"



export function addClick() {
   console.log("addClick function in ratings reducer fired")
  return{
    type: ADD_CLICK
  }
 
}

export function getAllRatings() {
  return {
    type: GET_ALL_RATINGS,
    payload: Axios.get("/api/ratings")
  }
}

export function addRating(post_id, rating) {
  return {
    type: ADD_RATING,
    payload: Axios.post(`/api/ratings/${post_id}`, {rating})
  }
}

export function editRating(post_id, updated_rating) {
  return {
    type: EDIT_RATING,
    payload: Axios.put(`/api/ratings/${post_id}`, {updated_rating})
  }
}


export function getAllRatingsByUserId(user_id) {
  return {
    type: GET_ALL_RATINGS_BY_USER_ID,
    payload: Axios.get(`/api/ratings/${user_id}`)
  }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case `${ADD_CLICK}`: {
      console.log("addClick fulfilled in ratings reducer fired")
      return {
        ...state,
        wasClicked: state.wasClicked +1
      }
    }

    case `${GET_ALL_RATINGS}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${GET_ALL_RATINGS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        ratings: payload.data
      }
    }
    
    case `${GET_ALL_RATINGS_BY_USER_ID}_PENDING`: {
        return {
          ...state,
          loading: true
        }
      }
      case `${GET_ALL_RATINGS_BY_USER_ID}_FULFILLED`: {
        return {
          ...state,
          ratingsUser: payload.data
        }
      }

    case `${ADD_RATING}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${ADD_RATING}_FULFILLED`: {
      return {
        ...state,
        ratings: payload.data
      }
    }
    case `${EDIT_RATING}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${EDIT_RATING}_FULFILLED`: {
      return {
        ...state,
        ratings: payload.data,
        loading: false
      }
    }
    default:
      return state;
  }
}