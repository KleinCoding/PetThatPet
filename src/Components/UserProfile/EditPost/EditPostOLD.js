import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../../../reducks/reducers/postsReducer'

class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: ""
    }
  }

  componentDidMount() {
    
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleEditPost = (post_id) => {
    const { title, content } = this.state;
    const { editPost } = this.props;
    const updated_post = {
      title,
      content
    }
    editPost(post_id, updated_post)
  }


  render() {
    return (
      <div>
        <h1>Edit DevNote</h1>
        <input name="title" placeholder="Title" value={this.state.title} />
        <input name="content" placeholder="Content" value={this.state.content} />
        <button onClick={this.handleEditPost}>Save Changes</button>
      </div>
    )
  }
}

const mapStateToProps = reduxState => {
  return {
    posts: reduxState.postsReducer.posts
  }
}

export default connect(mapStateToProps, { editPost })(EditPost);