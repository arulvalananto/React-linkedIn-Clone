import React from "react";
import "./Sidebar.css";

//MaterialUI
import { Avatar, IconButton } from "@material-ui/core";
import { Add, Bookmark } from "@material-ui/icons";

//Redux
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/user/userSlice";

const Sidebar = () => {
   const hashTags = [
      "react.js",
      "programming",
      "softwareEngineering",
      "design",
      "firebase",
   ];
   const user = useSelector(selectUser);

   return (
      <div className="sidebar">
         <div className="sidebar__top">
            <div className="sidebar__profile">
               <img
                  src="https://fbcoverstreet.com/thumbnail/KzC8xDTGa7QqZsWFOihMGZNHGQDhQkL2RmYeTC2EOE8olkGWORz5yRRtm42hAuzy.webp"
                  alt="cover__photo"
                  className="sidebar__profileCover"
               />
               <Avatar src={user?.photoUrl}>
                  {user?.email[0]?.toUpperCase()}
               </Avatar>
               <h3>{user.displayName}</h3>
               <p>JavaScript Developer</p>
            </div>
            <div className="sidebar__stats">
               <div className="sidebar__stat">
                  <p className="sidebar__profileView">
                     Who viewed your profile
                  </p>
                  <p className="sidebar__profileViewCount">2,483</p>
               </div>
               <div className="sidebar__stat">
                  <p className="sidebar__profileView">Views of your post</p>
                  <p className="sidebar__profileViewCount">1,365</p>
               </div>
            </div>
            <div className="sidebar__items">
               <Bookmark fontSize="small" />
               <h5>My items</h5>
            </div>
         </div>
         <div className="sidebar__bottom">
            <div className="sidebar__recent">
               <h4 className="sidebar__recentTitle">Recent</h4>
               {hashTags.map((hashTag, i) => (
                  <div className="sidebar__hashTags" key={i}>
                     <span>#</span>
                     <p className="sidebar__hashTag">{hashTag}</p>
                  </div>
               ))}
            </div>
            <div className="sidebar__group">
               <p>Groups</p>
            </div>
            <div className="sidebar__event">
               <p>Events</p>
               <IconButton>
                  <Add fontSize="small" />
               </IconButton>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
