import React from "react";
import "./InputOption.css";

const InputOption = ({ title, Icon, color, uploadManager }) => {
   return (
      <div className="inputOption" onClick={uploadManager}>
         {Icon && <Icon style={{ color: color }} />}
         <h4 className="inputOption__title">{title}</h4>
      </div>
   );
};

export default InputOption;
