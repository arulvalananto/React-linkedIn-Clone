import React, { useState } from "react";
import "./Upload.css";

//Firebase
import { db, storage } from "../../../firebase";
import firebase from "firebase";

//MaterialUI
import { Avatar, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { selectUser, toggleUpload } from "../../../features/user/userSlice";

const Upload = () => {
   const [message, setMessage] = useState("");
   const [media, setMedia] = useState("");
   const [progress, setProgress] = useState(0);
   const user = useSelector(selectUser);
   const dispatch = useDispatch();

   const handleChange = (e) => {
      if (e.target.files[0]) setMedia(e.target.files[0]);
   };

   const handleUpload = () => {
      if (media) {
         const uploadMedia = storage.ref(`media/${media.name}`).put(media);

         uploadMedia.on(
            "state_changed",
            (snapshot) => {
               const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
               );
               setProgress(progress);
            },
            (error) => {
               alert(error.message);
            },
            () => {
               storage
                  .ref("media")
                  .child(media.name)
                  .getDownloadURL()
                  .then((url) => {
                     db.collection("posts").add({
                        name: user?.displayName,
                        followers: Math.floor(
                           Math.random() * 9999 + Math.random() * 1900
                        ),
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        message: message,
                        photoUrl: user?.photoUrl,
                        media: url,
                     });
                  })
            }
         );
      } else {
         db.collection("posts")
            .add({
               name: user?.displayName,
               followers: Math.floor(
                  Math.random() * 9999 + Math.random() * 1900
               ),
               createdAt: firebase.firestore.FieldValue.serverTimestamp(),
               message: message,
               photoUrl: user?.photoUrl,
            })
      }
      setProgress(0);
      setMessage("");
      setMedia("");
      uploadManager();
   };

   const uploadManager = () => {
      dispatch(toggleUpload());
   };

   return (
      <div className="upload">
         <div className="upload__wrapper">
            <div className="upload__header">
               <div className="upload__titleBox">
                  <h3>Create a post</h3>
                  <progress
                     className="upload__progress"
                     value={progress}
                     max="100"
                  />
               </div>
               <IconButton onClick={uploadManager}>
                  <Clear />
               </IconButton>
            </div>
            <div className="upload__user">
               <Avatar src={user?.photoUrl} />
               <h3 className="upload__userName">{user?.displayName}</h3>
            </div>
            <textarea
               type="text"
               placeholder="What do you want to talk about?"
               onChange={(e) => setMessage(e.target.value)}
               value={message}
               className="upload__message"
            />
            <div className="upload__footer">
               <input
                  type="file"
                  onChange={handleChange}
                  className="upload__post"
                  title="Add"
               />
               <button
                  disabled={message.length === 0 ? true : false}
                  className="upload__button"
                  onClick={handleUpload}
               >
                  Post
               </button>
            </div>
         </div>
      </div>
   );
};

export default Upload;
