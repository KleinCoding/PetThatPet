import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../../reducks/reducers/postsReducer";

export default function AddPost() {
  const [category_name, setCategory_name] = useState("");
  const [pet_name, setPet_name] = useState("");
  const [img_url, setImg_url] = useState("")

  const dispatch = useDispatch();

  const handleAddPost = evt => {
    console.log("Adding a Post", category_name, pet_name, img_url);
    dispatch(addPost({ category_name, pet_name, img_url }));
    dispatch(addPostCount())
  };

  const fileOnChange = e => {
    const files = e.target.files
    const file = files[0]
    const postCount = props.currentUser.post_count +1
    const userID = props.currentUser.user_id
    const fileName= `user${userID}-post${postCount}`
    if(file == null) {
        alert('Error selecting file!')
    } else {
        axios.get(`/api/media/sign-s3?fileName=${fileName}&file-type=${file.type}`)
            .then(resSigned => {
                console.log(file)
                axios.put(resSigned.data.signedRequest, file, {
                    headers: {
                        'Content-Type': file.type
                        // 'Content-Length': file.size
                    }
                })
                    .then(resUpload => {
                        setImg_url(resSigned.data.url)
                        console.log(resSigned); 
                        console.log(resSigned.data.url)
                    })
                    .catch(err => {
                        console.log('Error uploading file:', err)
                    })
            })
            .catch(err => {
                console.log('Error prepping file upload:', err)
            })
    }
}



  return (
    <form onSubmit={handleAddPost}>
      <h1>Add a pet</h1>
      <input
        name="category_name"
        placeholder="Animal"
        value={category_name}
        onChange={e => setCategory_name(e.target.value)}
      />
      <input
        name="pet_name"
        placeholder="Pet Name"
        value={pet_name}
        onChange={e => setPet_name(e.target.value)}
      />
      <input
        type="file"
        onChange={e => fileOnChange(e)}
        accept="image/*"
        name="image_upload"
        id="image_upload"
      />
      <input type="hidden" value={this.state.uploadedUrl} />
    </form>
  );
}
