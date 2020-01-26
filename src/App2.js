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
import { getAllPosts } from "./reducks/reducers/postsReducer";
import { useAsyncLoad } from "./Hooks/Hooks";
import Axios from "axios";

// import { getCurrentUser } from "./reducks/reducers/authReducer";

function App2() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [url, setUrl] = useState("/api/posts");
  const [isLoading, setIsLoading] = useState(true);
  const {loggedIn} = useSelector(state => ({loggedIn: state.authReducer.loggedIn}))

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading( true );
      const res = await Axios(url);
      setData(res.data);
      console.log(res.data);
      setIsLoading(false);
    };
    dispatch(getAllPosts());
    dispatch(getAllRatings());
    if (loggedIn === true) {
      console.log("getting ratins now that youre logged in!")
      dispatch(getAllRatingsByUserId());
    }
    fetchData();
  }, [url]);

  
  const {authState, postsState, ratingsState} = useSelector(state => ({
    auth: state.authReducer,
    posts: state.postsReducer,
    ratings: state.ratingsReducer
  }), shallowEqual);
 
  const {authLoad, postsLoad, ratingsLoad, appLoad} = useSelector(state => ({
    authLoad: state.ratingsReducer.loading,
    postsLoad: state.postsReducer.loading,
    ratingsLoad: state.authReducer.loading,
    appLoad: false
  }), shallowEqual);

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
          <GuestLanding
            // reducerState={reducerState}
            // loadingState={loadingState}
            // loggedIn={loggedIn}
          />
        </Hero>
      </div>
    </div>
  );
}

export default App2;
