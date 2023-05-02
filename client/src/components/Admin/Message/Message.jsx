import React from "react";
import { format } from "timeago.js";
import chatUserIcon from "../../../assets/icons/chat_icon_user.jpg";

const Message = ({ message, own }) => {
  return (
    <div
      className={`Message flex flex-col mt-7${own ? "flex items-end " : ""}`}
    >
      <div className="messagetop flex">
        {own ? (
          <></>
        ) : (
          <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
            <div
              className="h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${chatUserIcon})`,
              }}
            ></div>
          </div>
        )}

        <p
          className={`messageText ${
            own ? "bg-blue-500 text-white" : "bg-purple-500 text-white"
          } p-2 text-lg rounded-2xl text-white bg-blue-500 max-w-xs`}
        >
          {message.text}
        </p>
      </div>
      <div className="messagebottom p-2">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
