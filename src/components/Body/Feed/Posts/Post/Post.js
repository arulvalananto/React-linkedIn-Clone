import React, { forwardRef } from "react";
import "./Post.css";

//MaterialUI
import { Avatar } from "@material-ui/core";
import {
   ChatOutlined,
   SendOutlined,
   ShareOutlined,
   ThumbUpAltOutlined,
} from "@material-ui/icons";

//Components
import ButtonOption from "./ButtonOption/ButtonOption";

const Post = forwardRef(({ post, id }, ref) => {
   return (
      <div ref={ref} className="post">
         <div className="post__top" id={id}>
            <Avatar src={post?.photoUrl} />
            <div className="post__userDetails">
               <p className="post__userName">{post?.name}</p>
               <p className="post__userFollowers">
                  {post?.followers.toLocaleString()} followers
               </p>
               <p className="post__exactTime">{}</p>
            </div>
         </div>
         <div className="post__bottom">
            <div className="post__body">
               <p className="post__description">{post?.message}</p>
               {post?.media && <img src={post?.media} className="post__media" alt={post?.message} />}
            </div>
            <div className="post__buttons">
               <ButtonOption Icon={ThumbUpAltOutlined} title="Like" />
               <ButtonOption Icon={ChatOutlined} title="Comment" />
               <ButtonOption Icon={ShareOutlined} title="Share" />
               <ButtonOption Icon={SendOutlined} title="Send" />
            </div>
         </div>
      </div>
   );
});

export default Post;
