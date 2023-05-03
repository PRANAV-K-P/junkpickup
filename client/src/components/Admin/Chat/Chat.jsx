import React, { useEffect, useRef, useState } from "react";
import Conversations from "../Conversations/Conversations";
import Message from "../Message/Message";
import axiosInstance from "../../../api/axiosInstance";
import chatUserIcon from "../../../assets/icons/chat_icon_user.jpg";

import io from "socket.io-client";
const socket = io.connect("http://localhost:6001/");

const Chat = () => {
  const adminId = JSON.parse(localStorage.getItem("admin"))._id;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState("");
  const [user, setUser] = useState({});
  const [status, setStatus] = useState(false);
  const [arrivedMessage, setArrivedMessage] = useState({});
  const scrollRef = useRef();

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    const date = new Date();
    const newDate = date.toISOString();
    let messageContent = {
      room: room,
      content: {
        conversationId: currentChat?._id,
        sender: adminId,
        text: newMessage,
        createdAt: newDate,
      },
    };
    socket.emit("send_message", messageContent);
  };

  useEffect(() => {
    joinRoom();
    socket.on("receive_message", (data) => {
      if (data.room === currentChat?._id) {
        setArrivedMessage(data.content);
      }
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axiosInstance.get(
          `/conversations/admin/${adminId}`,
          {
            headers: {
              Authorization: `Bpickj ${JSON.parse(
                localStorage.getItem("adminToken")
              )}`,
            },
          }
        );
        if (response.data) {
          setConversations(response.data);
        }
      } catch (err) {}
    };
    getConversations();
  }, [adminId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axiosInstance.get(
          `/messages/admin/${currentChat?._id}`,
          {
            headers: {
              Authorization: `Bpickj ${JSON.parse(
                localStorage.getItem("adminToken")
              )}`,
            },
          }
        );
        if (response.data) {
          setMessages(response.data);
        }
      } catch (err) {}
    };
    getMessages();
  }, [currentChat]);

  const getUser = async () => {
    const userId = await currentChat?.members?.find((item) => item !== adminId);
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

  useEffect(() => {
    getUser();
  }, [currentChat]);

  const handleSubmit = async () => {
    sendMessage();

    try {
      let response = await axiosInstance.post(
        "/messages/admin/",
        {
          sender: adminId,
          text: newMessage,
          conversationId: currentChat?._id,
        },
        {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("adminToken")
            )}`,
          },
        }
      );
      if (response.data) {
        setMessages([...messages, response.data]);
        setNewMessage("");
      }
    } catch (err) {}
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const mergeArrivedMessage = () => {
    if (
      Object.keys(arrivedMessage).length &&
      user?._id === arrivedMessage?.sender
    ) {
      setMessages([...messages, arrivedMessage]);
    }
  };

  useEffect(() => {
    mergeArrivedMessage();
  }, [arrivedMessage, currentChat]);

  return (
    <div className="h-screen w-full -mb-28 flex px-12 pt-10 ">
      <div className="w-3/12  bg-gray-100 shadow-2xl">
        <div className="p-2 h-full">
          <input
            type="text"
            placeholder="Search for users"
            className="w-5/6 py-2 px-0 border-top border-b-2 hidden border-gray-400"
          />
          {conversations.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setUser({});
                setCurrentChat(item);
                setRoom(item?._id);
                mergeArrivedMessage();
              }}
            >
              <Conversations conversation={item} currentUser={adminId} />
            </div>
          ))}
        </div>
      </div>

      <div className="w-6/12 border border-gray-100">
        <div className=" p-2 h-5/6 flex flex-col justify-between relative">
          {currentChat ? (
            <>
              <div className="chatboxtop h-full overflow-y-scroll pr-4 mt-14">
                <div className="absolute top-0 w-full left-0 h-14 bg-gray-50">
                  <div className="icon_name_headerWraper flex ml-3 mt-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                      <div
                        className="h-full bg-center bg-cover"
                        style={{
                          backgroundImage: `url(${chatUserIcon})`,
                        }}
                      ></div>
                    </div>
                    <span className="text-2xl font-medium">{user?.name}</span>
                  </div>
                </div>
                {messages.map((element, index) => (
                  <div key={index} ref={scrollRef}>
                    <Message
                      message={element}
                      own={element.sender === adminId}
                    />
                  </div>
                ))}
              </div>
              <div className="chatboxbottom flex items-center justify-between mt-1">
                <textarea
                  value={newMessage}
                  onChange={(event) => setNewMessage(event.target.value)}
                  className="chatmessageInput w-5/6 h-15 p-2 border border-gray-400 rounded-xl"
                  placeholder="Message..."
                ></textarea>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="chatSubmitbtn w-16 h-10 rounded-lg cursor-pointer bg-teal-500 text-white"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="absolute top-2/4 text-4xl text-gray-300 items-center text-center cursor-default w-full">
              Open a conversation to continue
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
