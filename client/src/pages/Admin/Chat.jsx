import React from "react";
import AdminSideBar from "../../components/Admin/Navigation/AdminSideBar";
import Chat from "../../components/Admin/Chat/Chat";

const ChatPage = () => {
  return (
    <div className="flex min-h-full ">
      <AdminSideBar />
      <Chat />
    </div>
  );
};

export default ChatPage;
