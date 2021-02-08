import React, { useEffect, useRef, useState } from "react";
import "./ForgotPassword.css";

//React-Router
import { Link } from "react-router-dom";

//Firebase
import { auth } from "../../../firebase";
import { Clear } from "@material-ui/icons";

const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const emailRef = useRef();

   useEffect(() => {
      emailRef.current.focus();
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      setError("");
      setMessage("");
      auth.sendPasswordResetEmail(email).catch((e) => setError(e.message));
      setMessage("Check your inbox for further instructions");
      setEmail("");
   };

   const clearError = () => {
      setError("");
   };
   const clearMessage = () => {
      setMessage("");
   };

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
         {!message ? (
            <div className="forgotPassword__body">
               <h1 className="forgotPassword__title">
                  First, let's find your account
               </h1>
               <p className="forgotPassword__subtitle">
                  Please enter your email
               </p>
               {error && (
                  <div className="forgotPassword__error">
                     <p>{error}</p>
                     <Clear onClick={clearError} />
                  </div>
               )}
               <form onSubmit={handleSubmit}>
                  <div className="forgotPassword__emailContainer">
                     <label>Email</label>
                     <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="forgotPassword__email"
                        ref={emailRef}
                     />
                  </div>
                  <div>
                     <Link to="/signin" className="forgotPassword__link">
                        Cancel
                     </Link>
                     <button type="submit" className="forgotPassword__submit">
                        Submit
                     </button>
                  </div>
               </form>
            </div>
         ) : (
            <div className="forgotPassword__success">
               <div>
                  <p>{message}</p>
                  <Clear onClick={clearMessage} />
               </div>
            </div>
         )}
      </div>
   );
};

export default ForgotPassword;
