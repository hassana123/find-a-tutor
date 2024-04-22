import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../ChatContext";
import { db } from "../../../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const combinedId = localStorage.getItem("combinedId");
 
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
      doc.exists() && setMessages(doc.data());
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
//console.log(messages.messages)

  return (
    <div className="h-[75.2vh] overflow-hidden overflow-auto">
      {messages.length==0? <span className="text-center block my-5 text-[15px] text-gray-700">No Messages Yet</span> :   <>
      {messages.messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
      </>}
    
    </div>
  );
};

export default Messages;