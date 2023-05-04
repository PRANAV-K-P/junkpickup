import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../api/axiosInstance'
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus, updateItemId } from "../../../redux/admin";

const AddFaq = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { itemId } = useSelector((state) => state.admin);

    const dispatch = useDispatch();

    const regex = /^[a-zA-Z0-9][a-zA-Z0-9,.]*(\s[a-zA-Z0-9,.]+)*[a-zA-Z0-9,.]*$/;


    const closeModal = () => {
        setQuestion("");
        setAnswer("");
        setError(false);
        setModalOpen(false);
        dispatch(updateItemId(""));
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        if (!regex.test(question) || !regex.test(answer)) {
          setError(true);
          return false;
        }
        if (itemId) {
          updateData();
        } else {
          addData();
        }
      };

      const addData = async () => {
        try {
          let response = await axiosInstance.post('/faqs', {
            question,
            answer
          }, {
            headers: {
              Authorization: `Bpickj ${JSON.parse(
                localStorage.getItem("adminToken")
              )}`,
            },
          });
          if (response.data) {
            await Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully added FAQ",
              showConfirmButton: false,
              timer: 1500,
            });
            setQuestion("");
        setAnswer("");
        setError(false);
        setModalOpen(false);
            dispatch(updateStatus(true));
            
          }
        } catch (err) {}
      };
    
      const updateData = async () => {
        try {
          let response = await axiosInstance.put(`/faqs/${itemId}`, {
            question,
            answer
          }, {
            headers: {
              Authorization: `Bpickj ${JSON.parse(
                localStorage.getItem("adminToken")
              )}`,
            },
          });
          if (response.data) {
            await Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully Updated",
              showConfirmButton: false,
              timer: 1500,
            });
 
            setQuestion("");
            setAnswer("");
            setError(false);
            setModalOpen(false);
                dispatch(updateStatus(true));
            dispatch(updateItemId(""));
            
          }
        } catch (err) {}
      };

      useEffect(() => {
        (async () => {
          try {
            let response = await axiosInstance.get(`/faqs/data/${itemId}`, {
              headers: {
                Authorization: `Bpickj ${JSON.parse(
                  localStorage.getItem("adminToken")
                )}`,
              },
            });
            if (response.data) {
                setQuestion(response.data.question);
                setAnswer(response.data.answer);
            }
          } catch (err) {}
        })();
      }, [itemId]);
    
  return (
    <div className="md:col-span-2">
    <div className="bg-white rounded-lg shadow-md pl-5 py-3">
      <div className="mb-3">
        <h2 className="text-xl font-medium mb-4"> Add FAQs</h2>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 w-1/5 py-2 mt-4"
          onClick={() => setModalOpen(true)}
        >
          Add FAQs
        </button>

        {(modalOpen || itemId) && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="relative bg-white w-2/5 mx-4  rounded shadow-xl border border-gray-300">
                <button
                  className="absolute top-0 right-0 m-3 text-gray-600"
                  onClick={closeModal}
                >
                  <MdClose size={20} />
                </button>
                <div className="p-6 flex justify-center flex-col">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="question"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Question
                      </label>
                      <input
                        type="text"
                        id="question"
                        name="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        required
                      />
                      {error && !regex.test(question) && (
                        <span className="mt-1 text-red-500 font-medium block ml-0">
                          Please enter a valid question.
                        </span>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label
                        htmlFor="answer"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Answer
                      </label>
                      <input
                        type="text"
                        id="answer"
                        name="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        required
                      />
                      {error && !regex.test(answer) && (
                        <span className="mt-1 text-red-500 font-medium block ml-0">
                          Please enter a valid answer.
                        </span>
                      )}
                    </div>

                    <div className="flex justify-center mt-12">
                      <button
                        type="submit"
                        className="bg-blue-500 w-1/3 hover:bg-blue-600 text-white font-medium rounded px-4 py-2"
                      >
                        {itemId ? "update" : "save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default AddFaq