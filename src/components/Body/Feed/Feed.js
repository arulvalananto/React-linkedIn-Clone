import React, { useEffect, useState } from "react";
import "./Feed.css";

//MaterialUI
import { Edit, Event, Image, Subject, VideoLibrary } from "@material-ui/icons";

//Components
import InputOption from "./InputOption/InputOption";
import Posts from "./Posts/Posts";

//firebase
import { db } from "../../../firebase";
import firebase from "firebase";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { selectUser, toggleUpload } from "../../../features/user/userSlice";

const Feed = () => {
   const [posts, setPosts] = useState([]);
   const [input, setInput] = useState("");
   const user = useSelector(selectUser);
   const dispatch = useDispatch();

   useEffect(() => {
      try {
         db.collection("posts")
            .orderBy("createdAt", "desc")
            .get()
            .then((snapshot) => {
               setPosts(
                  snapshot.docs.map((doc) => ({
                     id: doc.id,
                     data: doc.data(),
                  }))
               );
            });
      } catch (e) {
         console.error(e);
      }
   }, [posts]);

   const uploadManager = () => {
      dispatch(toggleUpload());
   };

   const sendPost = (e) => {
      e.preventDefault();
      db.collection("posts").add({
         name: user?.displayName,
         followers: Math.floor(Math.random() * 99999 + Math.random() * 1900),
         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
         message: input,
         photoUrl: user?.photoUrl,
      });
      setInput("");
   };

   return (
      <div className="feed">
         <div className="feed__top">
            <div className="feed__inputBox">
               <Edit />
               <form className="feed__form" onSubmit={sendPost}>
                  <input
                     type="text"
                     placeholder="Start a post"
                     className="feed__input"
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                  />
                  <button type="submit">Send</button>
               </form>
            </div>
            <div className="feed__inputType">
               <InputOption
                  Icon={Image}
                  title="Photo"
                  color="skyblue"
                  uploadManager={uploadManager}
               />
               <InputOption Icon={VideoLibrary} title="Video" color="#E7A33E" />
               <InputOption Icon={Event} title="Event" color="#A0B4B7" />
               <InputOption
                  Icon={Subject}
                  title="Write article"
                  color="#F5987E"
               />
            </div>
         </div>
         <div className="feed__bottom">
            <Posts posts={posts} />
         </div>
      </div>
   );
};

export default Feed;
