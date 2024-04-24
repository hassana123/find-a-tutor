import React, { useContext, useState } from "react";
import { FiPaperclip, FiImage } from 'react-icons/fi';
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
import { UserContext } from "../../UserContext";
import { ChatContext } from "../../ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const  user  = useContext(UserContext);
  const { data } = useContext(ChatContext);
//console.log(data)
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      uploadTask.on(
        (error) => {
          //TODO: Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.id,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.id,
          date: Timestamp.now(),
        }),
      });
    }
  
    const lastMessageData = {
      text,
      senderId: user.id,
      date: serverTimestamp(),
    };

    // Update user's chat document
    await updateDoc(doc(db, `/users/${user.id}/userChats`, user.id), {
      [`userInfo.lastMessage`]: lastMessageData,
    }, { merge: true });
    
    // Update chat user's chat document
    await updateDoc(doc(db, `/users/${data.chatUser.uid}/userChats`, data.chatUser.uid), {
      [`userInfo.lastMessage`]: lastMessageData,
    }, { merge: true });
    
    setText("");
    setImg(null);
  };
  return (
    <div className="flex justify-between  py-5 bg-white px-3 mt-5">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="w-[80%] outline-none"
      />
      <div className="flex items-center gap-3 ">
       <FiPaperclip/>
        <input
        className=" "
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label className="cursor-pointer" htmlFor="file">
          <FiImage/>
        </label>
        <button className=" font-bold  hover:text-red-600 bg-gradient-to-br text-white  from-gray-200 via-gray-300 to-gray-400 px-10 py-3 rounded-md" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;