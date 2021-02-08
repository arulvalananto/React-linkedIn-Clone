import React from "react";
import "./SubHeader.css";

//MaterialUI
import { Home, Notifications, People, Sms, Work } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";

//Firebase
import { auth } from "../../../firebase";

const SubHeader = ({ isShow, photoUrl }) => {
   const logout = () => {
      auth.signOut();
   };
   return (
      <div className={`subHeader ${isShow && "subHeader__show"}`}>
         <div className="subHeader__section">
            <Home />
            <p>Home</p>
         </div>
         <div className="subHeader__section">
            <People />
            <p>My Network</p>
         </div>
         <div className="subHeader__section">
            <Work />
            <p>Jobs</p>
         </div>
         <div className="subHeader__section">
            <Sms />
            <p>Messaging</p>
         </div>
         <div className="subHeader__section">
            <Notifications />
            <p>Notifications</p>
         </div>
         <div className="subHeader__section">
            <Avatar src={photoUrl} />
            <p onClick={logout}>Logout</p>
         </div>
      </div>
   );
};

export default SubHeader;
