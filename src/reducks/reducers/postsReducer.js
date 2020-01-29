import Axios from "axios";

const initialState = {
  posts: {},
  loading: false,
  currentPost_id: 0,
  postsByCategory: [],
  postsByUserId: [],
  randPosts: []
}

//Posts calls
const GET_ALL_POSTS = "GET_ALL_POSTS";
const GET_CURRENT_POST = "GET_CURRENT_POST"
const GET_ALL_POSTS_BY_USER_ID = "GET_ALL_POSTS_BY_USER_ID"
const GET_ALL_POSTS_BY_CATEGORY_NAME = "GET_ALL_POSTS_BY_CATEGORY_NAME";
const GET_RANDOM_POSTS = "GET_RANDOM_POSTS"

//Add/Edit/Delete
const ADD_POST = "ADD_POST";
const ADD_POST_COUNT = "ADD_POST_COUNT"
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";


export function getAllPosts() {
  return {
    type: GET_ALL_POSTS,
    payload: Axios.get("/api/posts")
  }
}

export function getCurrentPost(post_id) {
  return{
  type: GET_CURRENT_POST,
  payload: Axios.get(`/api/post/${post_id}`)
  }
}

export function getAllPostsByCategoryName(category_name) {
  return {
    type: GET_ALL_POSTS_BY_CATEGORY_NAME,
    payload: Axios.get(`/api/posts/${category_name}`)
  }
}

export function getAllPostsByUserId(user_id) {
  return {
    type: GET_ALL_POSTS_BY_USER_ID,
    payload: Axios.get(`/api/userposts/${user_id}`)
  }
}

export function getRandomPosts(amount) {
  return {
    type: GET_RANDOM_POSTS,
    payload: Axios.get(`/api/posts/${amount}`)
  }
}


export function addPost(post) {
  return {
    type: ADD_POST,
    payload: Axios.post("/api/posts", post)
  }
}

export function addPostCount(user_id) {
  return {
    type: ADD_POST_COUNT,
    payload: Axios.put(`/api/count/${user_id}`)
  }
}



export function editPost(post_id, pet_name) {
  return {
    type: EDIT_POST,
    payload: Axios.put(`/api/posts/${post_id}`, pet_name)
  }
}

export function deletePost(post_id) {
  return {
    type: DELETE_POST,
    payload: Axios.delete(`/api/posts/${post_id}`)
  }
}


export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case `${GET_ALL_POSTS}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${GET_ALL_POSTS}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        posts: payload.data
      }
    }
    case `${GET_ALL_POSTS_BY_CATEGORY_NAME}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${GET_ALL_POSTS_BY_CATEGORY_NAME}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        postsByCategory: payload.data
      }
    }
    case `${GET_ALL_POSTS_BY_USER_ID}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${GET_ALL_POSTS_BY_USER_ID}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        postsByUserId: payload.data
      }
    }
    case `${GET_RANDOM_POSTS}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${GET_RANDOM_POSTS}_FULFILLED`: {
      return {
        ...state,
        loading:false,
        randPosts: payload.data
      }
    }
    case `${GET_CURRENT_POST}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${GET_CURRENT_POST}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        currentPost_id: payload.data
      }
    }
    case `${ADD_POST}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${ADD_POST}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        posts: payload.data
      }
    }
    case `${ADD_POST_COUNT}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${ADD_POST_COUNT}_FULFILLED`: {
      return {
        ...state,
        loading: false,
      }
    }
    case `${EDIT_POST}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${EDIT_POST}_FULFILLED`: {
      return {
        ...state,
        posts: payload.data,
        loading: false
      }
    }
    case `${DELETE_POST}_PENDING`: {
      return {
        ...state,
        loading: true
      }
    }
    case `${DELETE_POST}_FULFILLED`: {
      return {
        ...state,
        loading: false,
        posts: payload.data
      }
    }
    default:
      return state;
  }
}