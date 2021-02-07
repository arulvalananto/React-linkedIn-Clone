import React, { useEffect } from "react";
import "./App.css";

//Components
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import Home from "./components/Home/Home";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";

//Redux
import { login, logout } from "./features/user/userSlice";
import { useDispatch } from "react-redux";

//Firebase
import { auth } from "./firebase";

//React-Router
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
   const dispatch = useDispatch();

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

   return (
      <BrowserRouter>
         <Switch>
            <Route path="/forgot-password">
               <ForgotPassword />
            </Route>
            <Route path="/signup">
               <SignUp />
            </Route>
            <Route path="/signin">
               <SignIn />
            </Route>
            <Route path="/" exact>
               <Home />
            </Route>
            <Route path="*">
               <PageNotFound />
            </Route>
         </Switch>
      </BrowserRouter>
   );
}

export default App;
