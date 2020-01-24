import React, { useEffect } from "react";
import "./reset.css";
import "./App.css";
import Particles from "./Components/Particles/Particles";
import ParticlesLanding from "./Components/Particles/ParticlesLanding";
import { useSelector, useDispatch } from "react-redux";
import { getAllRatings } from "./reducks/reducers/ratingsReducer";
import { getAllPosts } from "./reducks/reducers/postsReducer";
import { getCurrentUser } from './reducks/reducers/authReducer'
import NavBar from "./Components/Navbar/NavBar";

function App2(props) {
  const dispatch = useDispatch();



//Axios call to get all posts, ratings, and userRatings into redux state
//These need to be inside of useEffect to limit how many times they fire!

 useEffect(() => {
const allRatings = dispatch(getAllRatings(),);
const allPosts = dispatch(getAllPosts());
const userArray = dispatch(getCurrentUser(authState.currentUser_id))

  }, []);


//Summons all redux state into App2 variables listed
const authState = useSelector(state => state.authReducer);
const postState = useSelector(state => state.postsReducer);
const ratingState = useSelector(state => state.ratingsReducer);

const currentUser = useSelector(state => state.authReducer.currentUser)
//Summons logged in status from redux State in variable loggedIn
const loggedIn = useSelector(state => state.authReducer.loggedIn);

console.log(
  " App2.js authState, postState, ratingState, currentUser",
  authState,
  postState,
  ratingState,
  currentUser
);
 
  console.log("Logged in?", loggedIn);
  return (
    <div className="App">
  
      <div><Particles /></div>
      {/* {loggedIn ? (
        
        <div>
          
          <Particles
            props={props}
            authState={authState}
            postState={postState}
            ratingState={ratingState}
          />
        </div>
      ) : (
        <div>
          <ParticlesLanding
            props={props}
            authState={authState}
            postState={postState}
            ratingState={ratingState}
          />
        </div>
      )} */}
    </div>
  );
}

export default App2;
