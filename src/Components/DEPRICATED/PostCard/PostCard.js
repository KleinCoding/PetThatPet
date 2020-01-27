import React, { Component } from "react";

import { connect } from "react-redux";
import { getSession } from "../../reducks/reducers/authReducer";
import { getCurrentPost } from "../../reducks/reducers/postsReducer";
import "../../App.css";
import Rating from "../Rating/Rating";
import Rating2 from "../Rating2/Rating2";
import { addRating } from '../../reducks/reducers/ratingsReducer';

class PostCard extends Component {
  constructor() {
    super();

    // this.editable = true;
    // this.initialValue = 5;
    // this.prevRated = false;
    // this.lockRating = false;

    this.state = {
      editable: true,
      initialValue: 0,
      prevRated: false,
      lockRating: false,
      currentHover: -1
    };
  }

  handleOpenEditPost = () => {
    this.setState({ editPost: true });
  };

  //Use a component did mount function to check the database
  //for a user vote on the
  //corresponding image ID and user ID to determine
  //ComponentDidMount WILL NOT RERUN on every randomize!
  //Use componentDidUpdate!!!

  checkRatingValues(arr) {
    //This function will check to see if the current logged in user
    //has already voted on the picture being displayed
    //and set state for prevRated, lockRating, and initialValue
    //to be passed to the Rating component

    for (let i = 0; i <= arr.length - 1; i++) {
      if (arr[i].post_id === this.props.post_id) {
        this.setState({
          editable: false,
          initialValue: arr[i].rating,
          prevRated: true,
          lockRating: true,
          currentHover: -1
        });
        console.log("checkrating values MATCH");
        break;
      } else {
        this.setState({
          editable: true,
          initialValue: 0,
          prevRated: false,
          lockRating: false,
          currentHover: -1
        });
        console.log("checkratingvalues NO MATCH");
      }
    }
  }


handleVote(rating, post_id){
console.log("PostCard Callback adding Vote: post_id, rating", post_id, rating)
addRating(post_id, rating);


}

  componentDidMount(){
    this.checkRatingValues(this.props.ratings_user)
  }
  componentDidUpdate(prevProps) {
    if (this.props.post_id !== prevProps.post_id) {
      this.checkRatingValues(this.props.ratings_user);
    }
  }

  render() {
    return (
      <div className="PostCard">
        <h4>This is the PostCard</h4>

        <ul>
          <li>post ID: {this.props.post_id}</li>
          <li>owner ID: {this.props.user}</li>
          <li>owner username: {this.props.username}</li>
          <li>category: {this.props.category_name}</li>
          <li>pet name: {this.props.pet_name}</li>
          <img className="postcardimg" src={this.props.url} alt="pet"></img>
          <div className="StarButtonsCard">
            {this.state.prevRated === true ? (
              <Rating2
              post_id={this.props.post_id}
              user_id={this.props.user}
              fillBG="#f1c40f"
              initialBG="white"
              initialValue={this.state.initialValue}
              lockRating={this.state.lockRating}
              editable={this.state.editable}
              ratings_user={this.props.ratings_user}
              prevRated= {true}
              callback={index =>
              alert(`You rated my component with a ${index}`)
              }
              containerStyle={{ maxWidth: "200px" }}
            />
            ) : (
              <Rating
              post_id={this.props.post_id}
              user_id={this.props.user}
              fillBG="#f1c40f"
              initialBG="white"
              initialValue={this.state.initialValue}
              lockRating={this.state.lockRating}
              editable={this.state.editable}
              ratings_user={this.props.ratings_user}
              prevRated ={false}
              callback={this.handleVote}
              containerStyle={{ maxWidth: "200px" }}
            />
            )}
            
          </div>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user_id: reduxState.authReducer.user_id,
    currentPost_id: reduxState.postsReducer.currentPost_id
  };
};

export default connect(mapStateToProps, { getSession, getCurrentPost })(
  PostCard
);
