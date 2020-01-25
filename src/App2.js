import React, { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import GuestLanding from "./Components/GuestLanding/GuestLanding";
import { Hero } from "./Components/Particles/Particles";

import { useSelector, useDispatch } from "react-redux";
import { getAllRatings } from "./reducks/reducers/ratingsReducer";
import { getAllPosts } from "./reducks/reducers/postsReducer";
import { useAsyncLoad}  from "./Hooks/Hooks"
import Axios from "axios";
// import { getCurrentUser } from "./reducks/reducers/authReducer";

function App2() { 
  const dispatch= useDispatch();

  useEffect(() => {
   dispatch(getAllRatings());
   dispatch(getAllPosts());
    console.log("App2 useEffect Dispatches");
  }, {} );
  
  const [reducerState, setReducerState] = useState({
    auth: useSelector(state => state.authReducer),
    posts: useSelector(state => state.postsReducer),
    ratings: useSelector(state => state.ratingsReducer)
  });
  const [loggedIn, setLoggedIn] = useState({
    loggedIn: useSelector(state => state.authReducer.loggedIn)
  });
  const [loadingState, setLoading] = useState({
    authLoad: useSelector(state => state.ratingsReducer.ratings),
    postsLoad: useSelector(state => state.postsReducer.posts),
    ratingsLoad: useSelector(state => state.authReducer.loggedIn)
  });
  

  // const [allRatings, setAllRatings] = useState({ ratings: useSelector(state => state.ratingsReducer.ratings)})
  // const [allPosts, setAllPosts] = useState({ posts: useSelector(state => state.postsReducer.posts)})

  //Axios call to get all posts, ratings, and userRatings into redux state
  //These need to be inside of useEffect to limit how many times they fire!

  // const currentUser = useSelector(state => state.authReducer.currentUser)
  // // //Summons logged in status from redux State in variable loggedIn
  // const loggedIn = useSelector(state => state.authReducer.loggedIn);
  // const authLoading = useSelector(state => state.authReducer.authLoading);

  // console.log(
  //   " App2.js authState, postState, ratingState",
  //   authState,
  //   postState,
  //   ratingState,
  // );

  // console.log("Logged in?", loggedIn, "loading?", authLoading);

  return (
    <div className="App">
      <div>
        <Hero>
         
          <GuestLanding reducerState = {reducerState} loadingState = {loadingState} loggedIn= {loggedIn}/>
        </Hero>
      </div>
    </div>
  );
}

export default App2;
