import React from "react";
import { format } from "timeago.js";

const Message = ({ message, own = true }) => {
  return (
    <div
      className={`Message flex flex-col mt-7${own ? "flex items-end " : ""}`}
    >
      <div className="messagetop flex">
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
