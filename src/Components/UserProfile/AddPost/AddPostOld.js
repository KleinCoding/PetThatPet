import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../reducks/reducers/postsReducer';
import { getSession } from '../../reducks/reducers/authReducer';
import { withRouter } from "react-router-dom";

class AddPost extends Component {
  constructor() {
    super();
    this.state = {
      category_name: "",
      pet_name: "",
      img_url: "",

    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAddPost = () => {
    const { category_name, pet_name, img_url } = this.state;

    const { addPost } = this.props;

    addPost({ category_name, pet_name, img_url })
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <h1>Add a pet</h1>
        <input name="category_name" placeholder="Animal" value={this.state.category_name} onChange={this.handleChange} />
        <input name="pet_name" placeholder="Pet Name" value={this.state.title} onChange={this.handleChange} />
        <input name="img_url" placeholder="img link" value={this.state.content} onChange={this.handleChange} />
        <button onClick={this.handleAddPost}>Add your pet!</button>
      </div>
    )
  }
}
const mapStateToProps = reduxState => {
  return {
    user_id: reduxState.authReducer.currentUser_id
  }
}
export default withRouter(connect(mapStateToProps, {
  addPost,
  getSession
})(AddPost));