import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const RecycleDetails = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [headOffice, setHeadOffice] = useState("");
  const [startedYear, setStartedYear] = useState("");
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const RECYCLE_URL = `/recycling-centers/data/${id}`;
        let response = await axiosInstance.get(RECYCLE_URL, {
          headers: {
            Authorization: `Bpickj ${JSON.parse(
              localStorage.getItem("adminToken")
            )}`,
          },
        });
        if (response.data) {
          setImageUrl(response.data.imageUrl);
          setName(response.data.name);
          setCity(response.data.city);
          setPincode(response.data.pincode);
          setHeadOffice(response.data.headOffice);
          setStartedYear(response.data.startedYear);
        }
      } catch (err) {}
    })();
  }, [id]);
  return (
    <div className="bg-sky-blue w-full min-h-screen  flex justify-center ">
      <div className=" w-2/4 p-3">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-32">
          <div className="py-4 bg-white shadow-md">
            <div class="grid grid-rows-5 grid-flow-col grid-cols-7 gap-2 max-w-xl bg-white p-2">
              <div class="row-span-4 col-span-3 bg-teal-400 ">
                <img className="w-full h-full" src={`${imageUrl}`} alt="" />
              </div>
              <div class="row-span-1 col-span-3 p-2 flex flex-row border border-gray-300 shadow-lg text-xl">
                <div className="mr-5">Name: </div>
                <div className="">{name}</div>
              </div>
              <div class="row-span-1 col-span-3 p-2 flex flex-row border border-gray-300 shadow-lg text-xl">
                <div className="mr-5">Head Office: </div>
                <div className="">{headOffice}</div>
              </div>
              <div class="row-span-1 col-span-3 p-2 flex flex-row border border-gray-300 shadow-lg text-xl">
                <div className="mr-5">Since: </div>
                <div className="">{startedYear}</div>
              </div>
              <div class="row-span-1 col-span-3 p-2 flex flex-row border border-gray-300 shadow-lg text-xl">
                <div className="mr-5">City: </div>
                <div className="">{city}</div>
              </div>
              <div class="row-span-1 col-span-3 p-2 flex flex-row border border-gray-300 shadow-lg text-xl">
                <div className="mr-5">Pincode: </div>
                <div className="">{pincode}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecycleDetails;
