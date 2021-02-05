import React, { useEffect, useState } from "react";
import "./App.css";

//Components
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Auth from "./components/Auth/Auth";
import Upload from "./components/Body/Upload/Upload";

//Redux
import {
   login,
   logout,
   selectIsUpload,
   selectUser,
} from "./features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

//Firebase
import { auth } from "./firebase";

//MaterialUI
import { Flare } from "@material-ui/icons";

function App() {
   const user = useSelector(selectUser);
   const isUpload = useSelector(selectIsUpload);
   const dispatch = useDispatch();
   const [isDark, setIsDark] = useState(false);

   const toggleDarkMode = () => {
      console.log("button clicked");
      setIsDark((prevState) => !prevState);
   };

   const userAuthChecker = () => {
      return auth.onAuthStateChanged((userAuth) => {
         if (userAuth) {
            dispatch(
               login({
                  email: userAuth.email,
                  uid: userAuth.uid,
                  displayName: userAuth.displayName,
                  photoUrl: userAuth.photoURL,
               })
            );
         } else {
            dispatch(logout());
         }
      });
   };

   useEffect(userAuthChecker, [dispatch]);

   return user ? (
      <div className={`app  ${isDark && 'dark__mode'}`}>
         <button title="Change Mode" onClick={toggleDarkMode} className="app__button">
            <Flare />
         </button>
         <Header />
         <Body />
         {isUpload && <Upload />}
      </div>
   ) : (
      <Auth />
   );
}

export default App;
