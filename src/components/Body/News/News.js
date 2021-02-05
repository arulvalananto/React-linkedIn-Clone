import { FiberManualRecord } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./News.css";

const News = () => {
   const [news, setNews] = useState([]);

   useEffect(() => {
      fetch(
         "https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=tech&lang=en",
         {
            method: "GET",
            headers: {
               "x-rapidapi-key":
                  "e9a560bba1msh571bc98305f0f69p1cc54ejsnf993ecacc4f6",
            },
         }
      )
         .then((res) => res.json())
         .then((data) => {
            setNews(data.articles);
         });
   }, []);

   const strLengthCutter = (str) => {
      if (str.length > 35) {
         str = str.slice(0, 35) + " ...";
      }
      return str;
   };

   return (
      <div className="news">
         <h4 className="news__title">LinkedIn News</h4>
         <div className="news__details">
            {news?.map((el) => (
               <a
                  className="news__info"
                  href={el?.link}
                  target="blank"
                  key={el._id}
               >
                  <FiberManualRecord />
                  <div>
                     <p className="news__link">{strLengthCutter(el?.title)}</p>
                     <p className="news__readers">{el?.rank} readers</p>
                  </div>
               </a>
            ))}
         </div>
      </div>
   );
};

export default News;
