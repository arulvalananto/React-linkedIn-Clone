import React from "react";
import "./PageNotFound.css";

//React-Router
import { Link } from "react-router-dom";

const PageNotFound = () => {
   return (
      <div className="pageNotFound">
         <h3 className="pageNotFound__title">Page Not Found</h3>
         <p>
            Please go to <Link to="/">Home Page</Link>
         </p>
         <img src="404-Page.png" className="pageNotFound__image" alt="linkedin-duplicate-pagenot-found" />
      </div>
   );
};

export default PageNotFound;
