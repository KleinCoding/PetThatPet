import React, { useEffect } from "react";
import "./reset.css";
import "./App.css";
import Particles from "./Components/Particles/Particles";
// import ParticlesLanding from "./Components/Particles/ParticlesLanding";
// import NavBar from "./Components/Navbar/NavBar";
import GuestLanding from "./Components/GuestLanding/GuestLanding";
import {Hero} from "./Components/Particles/Particles"

import { useSelector, useDispatch } from "react-redux";
import { getAllRatings } from "./reducks/reducers/ratingsReducer";
import { getAllPosts } from "./reducks/reducers/postsReducer";
import { getCurrentUser } from "./reducks/reducers/authReducer";

function App2(props) {
  const dispatch = useDispatch();
  //Axios call to get all posts, ratings, and userRatings into redux state
  //These need to be inside of useEffect to limit how many times they fire!
  useEffect(() => {
    const allRatings = dispatch(getAllRatings());
    const allPosts = dispatch(getAllPosts());
    const userArray = dispatch(getCurrentUser(authState.currentUser_id));
  }, []);

  //Summons all redux state into App2 variables listed
  const authState = useSelector(state => state.authReducer);
  const postState = useSelector(state => state.postsReducer);
  const ratingState = useSelector(state => state.ratingsReducer);

  // const currentUser = useSelector(state => state.authReducer.currentUser)
  // //Summons logged in status from redux State in variable loggedIn
  const loggedIn = useSelector(state => state.authReducer.loggedIn);

  console.log(
    " App2.js authState, postState, ratingState",
    authState,
    postState,
    ratingState,
  );

  console.log("Logged in?", loggedIn);
  return (
    <div className="App">
      <div>
        <Hero>
          <GuestLanding />
        </Hero>
      </div>
    </div>
  );
}

export default App2;
