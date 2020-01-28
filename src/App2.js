import React, { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import GuestLanding from "./Components/GuestLanding/GuestLanding";
import { Hero } from "./Components/Particles/Particles";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  getAllRatings,
  getAllRatingsByUserId
} from "./reducks/reducers/ratingsReducer";
import { getAllPosts, getAllPostsByUserId } from "./reducks/reducers/postsReducer";
import { getCurrentUser } from "./reducks/reducers/authReducer";

function App2() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.authReducer.loggedIn)

 


   //Axios call to get all posts, ratings, and userRatings into redux state



  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllRatings());
    if (loggedIn === true) {
      console.log("Now that you're logged in", authState.currentUsername, authState.currentUser_id, ", i can get your user table, posts and ratings!")
      dispatch(getAllRatingsByUserId());
      dispatch(getAllPostsByUserId(authState.currentUser_id))
      dispatch(getCurrentUser())
      
    }
  
  }, [loggedIn]);

  //pulls in the full values of each redux controller state.
  const {authState, postsState, ratingsState} = useSelector(state => ({
    authState: state.authReducer,
    postsState: state.postsReducer,
    ratingsState: state.ratingsReducer
  }), shallowEqual);
 
  //Pulls in the loading status of each redux controller.
  const {authLoad, postsLoad, ratingsLoad, appLoad} = useSelector(state => ({
    authLoad: state.ratingsReducer.loading,
    postsLoad: state.postsReducer.loading,
    ratingsLoad: state.authReducer.loading,
    appLoad: false
  }), shallowEqual);

  return (
    <div className="App">
      <div>
        <Hero>
          <GuestLanding
          />
          
        </Hero>
      </div>
    </div>
  );
}

export default App2;
