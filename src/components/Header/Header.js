import React, { useEffect, useState } from "react";
import "./Header.css";

//MaterialUI
import {
   Home,
   Notifications,
   People,
   Search,
   Sms,
   Work,
   Menu,
} from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";

//Components
import HeaderOption from "./HeaderOption/HeaderOption";
import SubHeader from "./SubHeader/SubHeader";

//Redux
import { selectUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";

//Firebase
import { auth } from "../../firebase";

const Header = () => {
   const [isShow, setIsShow] = useState(false);
   const user = useSelector(selectUser);

   useEffect(() => {}, [user]);

   const toggleShow = () => {
      setIsShow((prevState) => !prevState);
   };

   const logoutUser = () => {
      auth.signOut();
   };
   return (
      <>
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
                  <Avatar src={user?.photoUrl}>
                     {user?.email[0]?.toUpperCase()}
                  </Avatar>
                  <h4 className="header__avatarTitle">Logout</h4>
               </div>
            </div>
            <div className="header__collapseRight" onClick={toggleShow}>
               <IconButton>
                  <Menu />
               </IconButton>
            </div>
         </div>
         <SubHeader isShow={isShow} photoUrl={user?.photoUrl} />
      </>
   );
};

export default Header;
