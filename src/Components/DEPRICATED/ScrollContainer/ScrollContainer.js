import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ScrollContainer.css'
import { getAllPosts } from "../../reducks/reducers/postsReducer";



class Viewer extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    return (
      <div className = "ImageViewer">
      <h1 className = "WelcomeText">Welcome Text H1 child of ImageViewerDiv</h1>
      <div className = "ScrollBox">
      <h1> This should be the image viewer</h1>
      
  </div>
     
      </div>
    )
  }
}

const mapStateToProps = reduxState => {
  return {
    posts: reduxState.postsReducer.posts
  }
}
export default connect(mapStateToProps, { getAllPosts })(Viewer);