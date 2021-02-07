import React from "react";
import FlipMove from "react-flip-move";

//Components
import Post from "./Post/Post";

const Posts = ({ posts }) => {
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
