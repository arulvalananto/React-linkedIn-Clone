import React, { useEffect } from "react";
import "./Header.css";

//MaterialUI
import {
   Home,
   Notifications,
   People,
   Search,
   Sms,
   Work,
} from "@material-ui/icons";

//Components
import HeaderOption from "./HeaderOption/HeaderOption";
import { Avatar } from "@material-ui/core";

//Redux
import { selectUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";

//Firebase
import { auth } from "../../firebase";

const Header = () => {
   const user = useSelector(selectUser);

   useEffect(() => {
   }, [user])

   const logoutUser = () => {
      auth.signOut();
   };
   return (
      <div className="header">
         <div className="header__left">
            <img
               src="https://image.flaticon.com/icons/png/512/174/174857.png"
               alt="Linkedin Logo"
               className="header__logo"
            />
            <div className="header__searchBox">
               <Search fontSize="small" />
               <input
                  type="text"
                  placeholder="Search"
                  className="header__search"
               />
            </div>
         </div>
         <div className="header__right">
            <HeaderOption title="Home" Icon={Home} />
            <HeaderOption title="My Network" Icon={People} />
            <HeaderOption title="Jobs" Icon={Work} />
            <HeaderOption title="Messaging" Icon={Sms} />
            <HeaderOption title="Notifications" Icon={Notifications} />
            <div className="header__avatar" onClick={logoutUser}>
               <Avatar src={user?.photoUrl}>{user?.email[0]?.toUpperCase()}</Avatar>
               <h4 className="header__avatarTitle">Me</h4>
            </div>
         </div>
      </div>
   );
};

export default Header;
