import React from "react";
import "./ForgotPassword.css";

//React-Router
import { Link } from "react-router-dom";

const ForgotPassword = () => {
   return (
      <div className="forgotPassword">
         <div className="forgotPassword__header">
            <img
               src="LinkedIn-Logo.png"
               className="forgotPassword__image"
               alt="linkedin-logo"
            />
            <div className="forgotPassword__paths">
               <Link to="/signin" className="forgotPassword__signIn">
                  Sign in
               </Link>
               <Link to="/signup" className="forgotPassword__signUp">
                  Join Now
               </Link>
            </div>
         </div>
         <div className="forgotPassword__body"></div>
      </div>
   );
};

export default ForgotPassword;
