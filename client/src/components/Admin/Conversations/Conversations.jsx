import React, { useState } from "react";
import chatUserIcon from "../../../assets/icons/chat_icon_user.jpg";
import axiosInstance from "../../../api/axiosInstance";

const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useState(() => {
    const userId = conversation.members.find((item) => item !== currentUser);
    const getUser = async () => {
      try {
        let response = await axiosInstance.get(`/admin/users/${userId}`, {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("adminToken")
            )}`,
          },
        });
        if (response.data) {
          setUser(response.data);
        }
      } catch (err) {}
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <div className="flex items-center p-2 cursor-pointer hover:bg-blue-100 mt-5">
      <div className="w-9 h-9 rounded-full overflow-hidden mr-3">
        <div
          className="h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${chatUserIcon})`,
          }}
        ></div>
      </div>

      <span className="text-2xl font-medium">{user?.name}</span>
    </div>
  );
};

export default Conversations;
