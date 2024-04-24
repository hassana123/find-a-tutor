import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import { FiUser } from "react-icons/fi";
import { UserContext } from "../../UserContext";
import { ChatContext } from "../../ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const user = useContext(UserContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, `/users/${user.id}/userChats`, user.id), (doc) => {
        console.log(doc.data());
        if (doc.data()) {
          // Convert object to array of entries
          const chatsArray = Object.entries(doc.data());
          // Sort chats based on timestamp date in descending order
          const sortedChats = chatsArray.sort((a, b) => b[1].date.seconds - a[1].date.seconds);
          // Set sorted chats to state
          setChats(sortedChats);
        }
      });

      return () => {
        unsub();
      };
    };

    user.id && getChats();
  }, [user.id]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
//console.log(chats);
  return (
    <div className="my-10  grid gap-3 items-center ">
      {chats.length > 0 &&
        chats.map((chat) => (
          <div
            className="flex items-center cursor-pointer py-5 px-5 gap-2 hover:text-white hover:bg-red-600"
            key={chat[0]}
            onClick={() => handleSelect(chat[1])}
          >
             {chat[1].photoURL ? (
            <img
              className="w-[50px] rounded-full h-[50px]"
              src={chat[1].photoURL}
              alt=""
            />
          ) : (
            <FiUser  className="w-[50px] rounded-full h-[50px]" />
          )}
            <img  alt="" />
            <div className="userChatInfo">
              <span>{chat[1].name}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;