import React, { useState } from "react";
import "./Home.css";

//React-Redux
import { useSelector } from "react-redux";
import { selectIsUpload, selectUser } from "../../features/user/userSlice";

//MaterialUI
import { Flare } from "@material-ui/icons";

//Components
import Header from "../Header/Header";
import Body from "./Body/Body";
import Upload from "./Upload/Upload";

//React-Router
import { Redirect } from "react-router-dom";

const Home = () => {
   const isUpload = useSelector(selectIsUpload);
   const [isDark, setIsDark] = useState(false);
   const user = useSelector(selectUser);

   const toggleDarkMode = () => {
      setIsDark((prevState) => !prevState);
   };
   return user ? (
      <div className={`home ${isDark && "home__darkMode"}`}>
         <button
            title="Change Mode"
            onClick={toggleDarkMode}
            className="home__button"
         >
            <Flare />
         </button>
         <Header />
         <Body />
         {isUpload && <Upload />}
      </div>
   ) : (
      <Redirect to="/signin" />
   );
};

export default Home;
