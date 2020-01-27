import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../../reducks/reducers/postsReducer";
import { getAllRatings } from "../../reducks/reducers/ratingsReducer";
import { getAllRatingsByUserId } from "../../reducks/reducers/ratingsReducer";
import { getSession } from "../../reducks/reducers/authReducer";
import Axios from "axios";
import "../../App.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      randomPost: 1
    };
    // this.checkRatingValues.bind(this)
    this.lockRating = false;
    this.initialValue = 0;
    this.prevRated = false;
  }

  componentDidMount() {
    this.props.getAllPosts();
    this.props.getAllRatings();
    this.props.getAllRatingsByUserId(this.props.user_id);
    this.props.getSession();
  
  }

// componentDidUpdate(){
//   this.props.getAllRatingsByUserId(this.props.user_id);
// }
 

  randomize() {
    let a = Math.floor(Math.random() * this.props.posts.length);
    if (a !== this.state.randomPost) {
      this.setState({
        randomPost: a,
        lockRating: false
      });
    } else {
      this.randomize();
    }
  }




  render() {
    const { posts } = this.props;
    const postsCopy = posts.slice(
      this.state.randomPost,
      this.state.randomPost + 1
    );

    const postsMapped = postsCopy.map((post, i) => {
      return (
        <div key={i}>
        </div>
      );
    });
    return (
      <div ClassName="HomeContainer">
        <h1>Home App</h1>
        <h4>{this.props.user_id}</h4>
        <button onClick={() => Axios.get("/auth/logout")}>LogOut</button>
        <button onClick={this.randomize.bind(this)}>Randomize</button>
        {postsMapped}

        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    posts: reduxState.postsReducer.posts,
    ratings: reduxState.ratingsReducer.ratings,
    ratingsUser: reduxState.ratingsReducer.ratingsUser,
    user_id: reduxState.authReducer.user_id
  };
};

export default connect(mapStateToProps, {
  getAllPosts,
  getAllRatings,
  getAllRatingsByUserId,
  getSession
})(Home);
