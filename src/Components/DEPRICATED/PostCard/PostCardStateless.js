import React, {Fragment } from "react";
import "../../App.css";
import Ellipsis from "../Loading/Loading"
import { ReactQueryConfigProvider } from "react-query";
import './postCardStyle.scss'
import {useSelector, useDispatch} from 'react-redux'

const queryConfig = {
  suspense: true
};



 export default function usePostCardStateless(props){
const dispatch = useDispatch();
  const isLoading = useSelector(state => state.postsReducer.loading)


   return (
    <Fragment>
    <ReactQueryConfigProvider config={queryConfig}>
    <React.Suspense fallback={<div><Ellipsis /></div>}>
      {isLoading ? 
      (<div><Ellipsis />
      </div>
      ) : ( 
  
  <div className="postCard">
        <h1>Give some pets to {props.posts[props.i].pet_name}!</h1>
        <h2>{props.posts[props.i].pet_name}'s Human goes by {props.posts[props.i].username} </h2>
        <h3>{props.posts[props.i].pet_name} has been petted X times</h3>
  </div>
  
          )}
    </React.Suspense>
    </ReactQueryConfigProvider>
    </Fragment>
   )
 

}

