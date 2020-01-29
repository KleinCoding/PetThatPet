import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, addPostCount } from "../../../reducks/reducers/postsReducer";
import axios from "axios";

export default function AddPost(props) {
  const [category_name, setCategory_name] = useState("");
  const [submitReady, setSubmitReady] = useState(false);
  const [pet_name, setPet_name] = useState("");
  const [img_url, setImg_url] = useState("");
  const [imgName, setImgName] = useState("");
  const [labelData, setLabelData] = useState({ loading: true });
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.authReducer.currentUser);

  const handleAddPost = evt => {
    if (category_name && pet_name && img_url != null) {
      console.log("Adding a Post", category_name, pet_name, img_url);
      dispatch(addPost({ category_name, pet_name, img_url }));
      dispatch(addPostCount());
      setSubmitReady(false);
      alert("Post Uploaded!")
      // props.setViewPosts(false)
      props.AnimReset("profile");

    } else {
      alert(
        "Please make sure you have selected an image file and provided a name!"
      );
    }
  };

  const fileOnChange = e => {
    const files = e.target.files;
    const file = files[0];
    const postCount = [currentUser[0].post_count + 1];
    const userID = [currentUser[0].user_id];
    const var1 = `${file.type}`.replace("image/", "");
    const fileName = `user${userID}-post${postCount}.${var1}`;

    console.log([currentUser[0].post_count]);
    console.log(
      "fileOnChange postCount userID fileName",
      postCount,
      userID,
      fileName
    );

    if (file == null) {
      alert("Error selecting file!");
    } else {
      axios
        .get(`/api/media/sign-s3?fileName=${fileName}&file-type=${file.type}`)
        .then(resSigned => {
          axios
            .put(resSigned.data.signedRequest, file, {
              headers: {
                "Content-Type": file.type
                // 'Content-Length': file.size
              }
            })
            .then(resUpload => {
              setImg_url(`https://pet-that-pet.s3.us-east-2.amazonaws.com/userPhotos/${fileName}`);
              setImgName(fileName);
              axios
                .get(`/api/media/detectlabel?fileName=${fileName}`)
                .then(res => {
                  setLabelData({ data: res.data, loading: false });
                  setSubmitReady(true)
                });
              console.log(resSigned.data.url);
            })
            .catch(err => {
              console.log("Error uploading file:", err);
            });
        })
        .catch(err => {
          console.log("Error prepping file upload:", err);
        });
    }
  };

  return (
    <div>
      <form>
        <h1>Add a pet</h1>
        <br />
<br/>
        {labelData.loading ? (
          <div>Please Select a Photo to get AWS Rekognition Categories</div>
          
        ) : (
          <div>
            <select onChange={e => setCategory_name(e.currentTarget.value)}>
              <option
                key={labelData.data.Labels[0].Name}
                value={labelData.data.Labels[0].Name}>
                {labelData.data.Labels[0].Name}
              </option>
              <option
                key={labelData.data.Labels[1].Name}
                value={labelData.data.Labels[1].Name}>
                {labelData.data.Labels[1].Name}
              </option>
              <option
                key={labelData.data.Labels[2].Name}
                value={labelData.data.Labels[2].Name}>
                {labelData.data.Labels[2].Name}
              </option>
            </select>
          </div>
        )}
        <input
          name="pet_name"
          placeholder="Pet Name"
          value={pet_name}
          onChange={e => setPet_name(e.target.value)}
        />
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={e => fileOnChange(e)}
          accept="image/*"
          name="image_upload"
          id="image_upload"
        />
        <input type="hidden" value={img_url} />
      </form>

      <br />
      {submitReady ? (
        <button onClick={handleAddPost}> Submit </button>
      ) : (
        <h1>Please Add a Photo</h1>
      )}
    </div>
  );
}
