import React from "react";
import "./Body.css";

//Components
import Sidebar from "./Sidebar/Sidebar";
import Feed from "./Feed/Feed";
import News from "./News/News";

const Body = () => {
   return (
      <div className="body">
         <Sidebar />
         <Feed />
         <News />
      </div>
   );
};

export default Body;
