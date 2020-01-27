import React, { setState } from 'react';
import { useDispatch } from 'react-redux';
import { editPost } from '../../../reducks/reducers/postsReducer'



 

export default function EditPost() {

  const dispatch = useDispatch()
  const [title, setTitle] = setState("")
  const [content, setContent] = setState("")

 function handleEditPost() {
    const post_id = props.postId
    const updated_post = {
      title,
      content
    }
    dispatch(editPost(post_id, updated_post))
    props.setEditPost(false)
  }


    return (
      <div>
        <h1>Edit DevNote</h1>
        <input name="title" placeholder="Title" onChange= {(e) => setTitle(e.currentTarget.value) }/>
        <input name="content" placeholder="Content" onChange= {(e) => setContent(e.currentTarget.value) }/>
        <button onClick={handleEditPost}>Save Changes</button>
      </div>
    )
  
}


