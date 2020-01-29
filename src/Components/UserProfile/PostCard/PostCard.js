import React from 'react'

export function PostCard(props){
    return (
        <div className="postCard">
        <h1>Give some pets to {props.statePosts[props.post].pet_name}!</h1>
        <img
          className="postcardimg"
          src={props.statePosts[props.post].img_url}
          alt="pet"
        ></img>
        <h2>
          {props.statePosts[props.post].pet_name}'s Human goes by
          {props.statePosts[props.post].username}
        </h2>
        <h3>{props.statePosts[props.post].pet_name} has been petted X times</h3>
     
        
      </div>
      
      
    )
}


export function PostCardUser(props){
    return (
        <div className="postCard">
            <h1>{props.statePostsUser[props.userPost].pet_name}!</h1>
            <img
              className="postcardimg"
              src={props.statePostsUser[props.userPost].img_url}
              alt="pet"
            ></img>
            <h3>{props.statePostsUser[props.userPost].pet_name} has been petted X times</h3>
            
          </div>
    )
}