import React, { useState } from "react";

//Components
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

const Auth = () => {
   const [isNewUser, setIsNewUser] = useState(false);

   const isSignIn = () => {
      setIsNewUser((prevState) => !prevState);
   };
   return <div className="auth">{isNewUser ? <SignUp isSignIn={isSignIn}/> : <SignIn isSignIn={isSignIn}/>}</div>;
};

export default Auth;
