import React from "react";
import FlipMove from "react-flip-move";
// import {Auth} from 'firebase/auth';

//Components
import Post from "./Post/Post";

const Posts = ({ posts }) => {

   // console.log(Auth);
   return (
      <>
         <FlipMove>
            {posts?.map(({ id, data }) => (
               <Post post={data} id={id} key={id} />
            ))}
         </FlipMove>
      </>
   );
};

export default Posts;
