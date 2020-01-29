import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost, deletePost } from "../../../reducks/reducers/postsReducer";

export default function EditPost(props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [editState, setEditState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

 const handleEditPost = () => {
    const post_id = props.postId;
    const pet_name = title
    const updated_post = {pet_name: pet_name}
    
    dispatch(editPost(post_id, updated_post));
    setEditState(false);
    props.setView("profile");
 }
 const handleChangeView = () => {
    const post_id = props.postId;
    const pet_name = title
    const updated_post = {pet_name: pet_name}
    
    setEditState(false);
    props.setView("profile");
 }
 const handleDeletePost= () => {
    const post_id = props.postId;
    console.log("handleDeletePost, editPost.js", post_id)
    dispatch(deletePost(post_id));
    setDeleteState(false);
    props.setView("profile");
  } 
  return (
    <div>
      {editState ? (
     <div>
          <input
            name="title"
            placeholder="Pet Name"
            onChange={e => setTitle(e.currentTarget.value)}
          />
          <button onClick={handleEditPost}>Submit Edit</button>
        </div> 
      ) : (
        <div> <h1>Edit Your Pet's Name</h1>
          <button onClick={setEditState}>Edit Your Pet's Name</button>
        </div> 
         
      )}

      <div>
      {deleteState ? (
  <div>
        <button onClick={handleDeletePost}>Submit Delete</button>
        </div>
      ) : (
       <div>
 <h1>Delete Your Pet Post</h1>
 <button onClick={setDeleteState}>Delete Post</button>
</div>
      )}
    </div>
    <button onClick ={handleChangeView}>To Profile</button>
    </div>
  );
}
