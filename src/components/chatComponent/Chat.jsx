import React, { useContext } from "react";
import Input from "./Input";
import { FiVideo, FiUserPlus, FiMoreVertical } from "react-icons/fi";
//import { IoEllipsisVertical, IoVideocam, } from 'react-icons/io5';
import Messages from "./Messages"
import { ChatContext } from "../../ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
//console.log(data)
  return (
    <div className="bg-gradient-to-br w-[70%] from-gray-200 via-gray-300 to-gray-400">
      <div className="mx-3 flex justify-between mt-3 mb-8 ">
        <span>{data.chatUser.name}</span>
        <div className="flex gap-3 items-center">
          <FiVideo className="cursor-pointer"/>
        <FiUserPlus  className="cursor-pointer"/>
          <FiMoreVertical  className="cursor-pointer"/>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;