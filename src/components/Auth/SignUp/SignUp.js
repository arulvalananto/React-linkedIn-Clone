import React, { useState } from "react";
import "./SignUp.css";

//Redux
import { useDispatch } from "react-redux";
import { login } from "../../../features/user/userSlice";

//Firebase
import { auth } from "../../../firebase";

const SignUp = ({ isSignIn }) => {
   const initialState = {
      email: "",
      password: "",
      fullName: "",
      photoUrl: "",
   };
   const errorState = {
      email: "",
      password: "",
      fullName: "",
      photoUrl: "",
   };

   const [credentials, setCredentials] = useState(initialState);
   const [error, setError] = useState(errorState);
   const dispatch = useDispatch();

   const validate = () => {
      let emailError = "";
      let passwordError = "";
      let fullNameError = "";
      let photoUrlError = "";

      setError({
         ...error,
         email: "",
         password: "",
         fullName: "",
         photoUrl: "",
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
      if (credentials.fullName.trim() === "") {
         fullNameError = "Please Enter Your Full Name";
      }
      if (credentials.photoUrl.trim() === "") {
         photoUrlError = "Please Enter Your Photo URL";
      }
      if (emailError || passwordError || fullNameError || photoUrlError) {
         setError({
            ...error,
            email: emailError,
            password: passwordError,
            fullName: fullNameError,
            photoUrl: photoUrlError,
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
            .createUserWithEmailAndPassword(
               credentials.email,
               credentials.password
            )
            .then((userAuth) => {
               userAuth.user.updateProfile({
                  displayName: credentials.fullName,
                  photoURL: credentials.photoUrl,
               });
               dispatch(
                  login({
                     email: credentials.email,
                     uid: userAuth.user.uid,
                     displayName: credentials.fullName,
                     photoUrl: credentials.photoUrl,
                  })
               );
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

   return (
      <div className="signUp">
         <img
            src="LinkedIn.png"
            alt="LinkedIn Logo"
            className="signUp__logo"
         />
         <h1 className="signUp__title">
            Make the most of your professional life
         </h1>
         <div className="signUp__wrapper">
            <form>
               <div className="signUp__inputContainer">
                  <label>Full Name</label>
                  <input
                     className={`signUp__input ${
                        error.fullName && "signUp__errorInput"
                     }`}
                     type="text"
                     onChange={changeHandler}
                     name="fullName"
                     value={credentials.fullName}
                  />
                  <div className="signUp__error">{error.fullName}</div>
               </div>
               <div className="signUp__inputContainer">
                  <label>Photo URL</label>
                  <input
                     className={`signUp__input ${
                        error.photoUrl && "signUp__errorInput"
                     }`}
                     type="text"
                     onChange={changeHandler}
                     name="photoUrl"
                     value={credentials.photoUrl}
                  />
                  <div className="signUp__error">{error.photoUrl}</div>
               </div>
               <div className="signUp__inputContainer">
                  <label>Email</label>
                  <input
                     className={`signUp__input ${
                        error.email && "signUp__errorInput"
                     }`}
                     type="email"
                     onChange={changeHandler}
                     name="email"
                     value={credentials.email}
                  />
                  <div className="signUp__error">{error.email}</div>
               </div>
               <div className="signUp__inputContainer">
                  <label>Password</label>
                  <input
                     className={`signUp__input ${
                        error.password && "signUp__errorInput"
                     }`}
                     type="password"
                     onChange={changeHandler}
                     name="password"
                     value={credentials.password}
                  />
                  <div className="signUp__error">{error.password}</div>
               </div>
               <p className="signUp__terms">
                  By clicking Agree & Join, you agree to the LinkedIn User
                  Agreement, Privacy Policy, and Cookie Policy.
               </p>
               <button onClick={handleSubmit} className="signUp__button">
                  Agree & Join
               </button>
            </form>
            <p className="signUp__link">
               Already on LinkedIn? <span onClick={isSignIn}>Sign in</span>
            </p>
         </div>
      </div>
   );
};

export default SignUp;
