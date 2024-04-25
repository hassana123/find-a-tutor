import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../UserContext";
import { ChatContext } from "../../ChatContext";

const Message = ({ message }) => {
  const {user} = useContext(UserContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Convert timestamp to JavaScript Date object
  const messageDate = new Date(message.date.seconds * 1000 + message.date.nanoseconds / 1000000);

  // Format time using toLocaleTimeString
  const messageTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
   <div className={`my- flex flex-col space-y-5 mx-5    ${message.senderId === user.id ? "items-end" : "items-start"}`}>
     <div
      ref={ref}
      className={`w-[25%] my-3  ${message.senderId == user.id ? "bg-white" : " text-black bg-gray-200"} rounded-md shadow-lg px-4 py-3`}
    >
      {/* <div className="flex items-center">
        <img
          src={message.senderId === user.id ? user.profilePicture : data.chatUser.photoURL}
          alt=""
          className="w-8 h-8 rounded-full mr-2"
        />
        </div> */}
      <div className="messageContent">
        <p className="text-[16px]">{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
        <span className="block text-right text-[12px]">{messageTime}</span> {/* Display formatted time */}
    
      </div>
    </div>
   </div>
  );
};

export default Message;
