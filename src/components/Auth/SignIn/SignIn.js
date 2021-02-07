import React, { useEffect, useState } from "react";
import "./SignIn.css";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../../features/user/userSlice";

//Firebase
import { auth } from "../../../firebase";

//React-Router
import { Link, Redirect, useHistory } from "react-router-dom";
import { useRef } from "react";

const SignIn = () => {
   const initialState = {
      email: "",
      password: "",
   };
   const errorState = {
      email: "",
      password: "",
   };

   const [credentials, setCredentials] = useState(initialState);
   const [error, setError] = useState(errorState);
   const [showPassword, setShowPassword] = useState(false);
   const dispatch = useDispatch();
   const history = useHistory();
   const user = useSelector(selectUser);
   const emailRef = useRef();

   useEffect(() => {
      emailRef.current.focus();
   }, []);

   const validate = () => {
      let emailError = "";
      let passwordError = "";
      setError({
         ...error,
         email: "",
         password: "",
      });
      const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (credentials.email.trim() === "") {
         emailError = "Please Enter Your Email";
      } else if (!emailPattern.test(String(credentials.email).toLowerCase())) {
         emailError = "Invalid Email";
      }
      if (credentials.password.trim() === "") {
         passwordError = "Please Enter Your Creative Password";
      } else if (credentials.password.length < 6) {
         passwordError = "Password must be above 6 characters";
      }
      if (emailError || passwordError) {
         setError({
            ...error,
            email: emailError,
            password: passwordError,
         });
         return false;
      }
      return true;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const isValid = validate();

      if (isValid) {
         auth
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then((userAuth) => {
               dispatch(
                  login({
                     email: userAuth.user.email,
                     uid: userAuth.user.uid,
                     displayName: userAuth.user.displayName,
                     photoUrl: userAuth.user.photoURL,
                  })
               );
            })
            .then(() => {
               history.push("/");
            })
            .catch((error) => alert(error.message));
      }
   };

   const changeHandler = (e) => {
      const { name, value } = e.target;
      setCredentials({
         ...credentials,
         [name]: value,
      });
   };

   const changeShowPassword = () => {
      setShowPassword((prevState) => !prevState);
   };

   return !user ? (
      <div className="signIn">
         <img
            src="LinkedIn-Logo.png"
            alt="LinkedIn Logo"
            className="signIn__logo"
         />
         <div className="signIn__container">
            <h2 className="signIn__title">Sign in</h2>
            <p className="signIn__subtitle">
               Stay updated on your professional world
            </p>
            <form className="signIn__form">
               <input
                  name="email"
                  type="email"
                  ref={emailRef}
                  placeholder="Enter Email"
                  value={credentials.email}
                  onChange={changeHandler}
                  className={`signIn__email ${
                     error.email && "signIn__errorInput"
                  }`}
               />
               <div className="signIn__error">{error.email}</div>
               <div className="signIn__passwordContainer">
                  <input
                     name="password"
                     type={showPassword ? "text" : "password"}
                     placeholder="Password"
                     value={credentials.password}
                     autoComplete="true"
                     onChange={changeHandler}
                     className={`signIn__password ${
                        error.password && "signIn__errorInput"
                     }`}
                  />
                  <div
                     onClick={changeShowPassword}
                     className="signIn__showPassword"
                  >
                     {showPassword ? "Hide" : "Show"}
                  </div>
               </div>
               <div className="signIn__error">{error.password}</div>
               <Link to="/forgot-password" className="signin__forgot">
                  Forgot password?
               </Link>
               <button className="signIn__button" onClick={handleSubmit}>
                  Sign in
               </button>
            </form>
         </div>
         <div className="signIn__bottom">
            <p className="signIn__link">
               New to LinkedIn? <Link to="/signup">Join now</Link>
            </p>
         </div>
      </div>
   ) : (
      <Redirect to="/" />
   );
};

export default SignIn;
