import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus, updateItemId } from "../../../redux/admin";
import axiosInstance from '../../../api/axiosInstance';
import AddFaq from './AddFaq';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const { status } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        let response = await axiosInstance.get('/faqs/admin', {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("adminToken")
            )}`,
          },
        });
        if (response.data) {
          setFaqs(response.data);
          dispatch(updateStatus(false));
        }
      } catch (err) {}
    })();
  }, [status]);

  const handleDelete = (itemId) => {
    Swal.fire({
      title: `Do you want to delete this`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await axiosInstance.delete(`/faqs/${itemId}`, {
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
              title: "successfully deleted Faq",
              showConfirmButton: false,
              timer: 1500,
            });
            dispatch(updateStatus(true));
          }
        } catch (err) {}
      }
    });
  };

  const openUpdate = (id) => {
    dispatch(updateItemId(id));
  };

  return (
    <div className="bg-sky-blue w-full min-h-screen  flex justify-center ">
      <div className=" w-4/5 p-3">
       <AddFaq />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <div className="py-4 bg-white shadow-md">
            <table className="w-full text-sm text-left text-black bg-gray-50 dark:text-black border border-black">
              <thead className="text-lg text-black uppercase dark:text-black">
                <tr className="grid grid-cols-6">
                  <th
                    scope="col"
                    className="flex justify-center py-3 col-span-1 "
                  >
                    Sl.no
                  </th>
                  <th
                    scope="col"
                    className="flex justify-center py-3 col-span-2 "
                  >
                    Question
                  </th>
                  <th
                    scope="col"
                    className="flex justify-center py-3 col-span-2 "
                  >
                    Answer
                  </th>
                  <th
                    scope="col"
                    className="flex justify-center py-3 col-span-1 "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((element, index) => (
                  <tr
                    key={index}
                    className="grid grid-cols-6 border border-black "
                  >
                    <td className="col-span-1 px-6 py-4  text-lg font-bold items-center flex justify-center">
                      {index + 1}
                    </td>
                    <td className="col-span-2 px-6 py-4 text-lg items-center flex justify-center">
                      {element.question}
                    </td>
                    <td className="col-span-2 px-6 py-4 text-lg items-center flex justify-center">
                      {element.answer}
                    </td>
                    <td className="col-span-1 px-6 py-4 flex justify-center items-center">
                      <button
                        onClick={() => openUpdate(element._id)}
                        className="bg-orange-500 font-medium w-28 text-lg h-8 rounded-full text-white"
                      >
                        update
                      </button>
                      <button
                        onClick={() => handleDelete(element._id)}
                        className="bg-red-500 font-medium w-28 text-lg h-8 rounded-full text-white"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq