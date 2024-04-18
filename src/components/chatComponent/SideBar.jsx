import React from "react";
import ChatNav from "./ChatNav";
import Search from "./Search"
import Chats from "./Chats"

const SideBar = () => {
  return (
    <div className="bg-white shadow-lg w-[30%]">
     
      <Search/>
      <Chats/>
    </div>
  );
};

export default SideBar;