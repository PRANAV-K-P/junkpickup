import React, { useEffect, useRef, useState } from "react";
import supportImage from "../../../assets/images/support.png";
import backgroundImage2 from "../../../assets/images/commonbackground.jpg";
import Message from "../Message/Message";
import axiosInstance from "../../../api/axiosInstance";

import io from "socket.io-client";
const socket = io.connect("https://junkpickup.online/");

const Connect = () => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const status = true;
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState("");
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
        conversationId: conversation?._id,
        sender: userId,
        text: newMessage,
        createdAt: newDate,
      },
    };
    socket.emit("send_message", messageContent);
  };

  useEffect(() => {
    joinRoom();
    socket.on("receive_message", (data) => {
      if (data.room === conversation?._id) {
        setMessages([...messages, data.content]);
      }
    });
  }, [messages]);

  useEffect(() => {
    const createConversation = async () => {
      try {
        let response = await axiosInstance.post(
          "/conversations",
          {
            senderId: userId,
          },
          {
            headers: {
              Authorization: `Bpickj ${JSON.parse(
                localStorage.getItem("userToken")
              )}`,
            },
          }
        );
      } catch (err) {}
    };
    createConversation();

    const getConversation = async () => {
      let response = await axiosInstance.get(`/conversations/user/${userId}`, {
        headers: {
          Authorization: `Bpickj ${JSON.parse(
            localStorage.getItem("userToken")
          )}`,
        },
      });
      if (response.data) {
        setConversation(response?.data);
        setRoom(response?.data?._id);
      }
    };
    getConversation();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      let response = await axiosInstance.get(
        `/messages/user/${conversation?._id}`,
        {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("userToken")
            )}`,
          },
        }
      );
      if (response.data) {
        setMessages(response.data);
      }
    };
    getMessages();
  }, [conversation]);

  const handleSubmit = async () => {
    sendMessage();
    try {
      let response = await axiosInstance.post(
        "/messages/user/",
        {
          sender: userId,
          text: newMessage,
          conversationId: conversation?._id,
        },
        {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("userToken")
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

  return (
    <div className="relative w-full min-h-screen -mb-40 z-40 flex flex-col bg-no-repeat">
      <img
        className="absolute w-full h-full top-0 object-cover "
        src={`${backgroundImage2}`}
        alt="Image"
      ></img>
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row p-1 sm:px-10 justify-center">
        <div className=" mr-2 sm:ml-0 sm:mr-10 h-full rounded-lg shadow-2xl mt-20 border border-gray-300 px-2 w-full sm:w-4/5 lg:w-2/5">
          <div className="w-full h-full">
            <div className=" p-2 h-[600px] flex flex-col justify-between relative bg-white border ">
              <div className="chatboxtop h-full overflow-y-scroll pr-4 mt-14">
                <div className="absolute bg-purple-100  top-0 w-full left-0 h-14">
                  <div className="icon_name_headerWraper flex ml-3 mt-2 text-2xl">
                    Message us
                  </div>
                </div>

                {messages.length !== 0 ? (
                  messages.map((element, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message
                        message={element}
                        own={element.sender === userId}
                      />
                    </div>
                  ))
                ) : (
                  <>
                    <p className="text-4xl text-gray-300">
                      start conversation with our support team below
                    </p>
                  </>
                )}
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
            </div>
          </div>
        </div>

        <div className="relative ml-2 mr-2 sm:ml-0 sm:mr-0 shadow-2xl mt-20 border border-gray-300 w-full sm:w-4/5 lg:w-2/5">
          <img
            className="absolute w-full h-full top-0 object-cover "
            src={`${supportImage}`}
            alt="Image"
          ></img>
          <div className="w-full ml-10">
            <div className="text-4xl text-yellow-300 font-bold mb-3 mt-5">
              JunkPickup Ltd.
            </div>
            <div className="text-xl text-white font-bold mb-3 mt-16">
              3rd Floor, Old Tilak Road Ward Office, Near HMSS company ,
              ambedkar road 645824
            </div>
          </div>
          <hr className="h-1 my-10 bg-white" />
          <div className="text-3xl text-yellow-400 font-bold mb-10 ml-10">
            +91 8137848193
          </div>
          <div className="mb-16 text-xl text-white font-semibold flex ml-10">
            <div>junkpickup@hotmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
