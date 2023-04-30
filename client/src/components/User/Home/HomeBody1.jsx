import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

const HomeBody1 = () => {
  const [banner, setBanner] = useState({});
  
  useEffect(() => {
    (async () => {
      const BANNER = "/banners/data";
      try {
        let response = await axiosInstance.get(BANNER);
        if (response.data) {
          setBanner(response.data);
        }
      } catch (err) {}
    })();
  }, []);
  return (
    <div className="flex flex-col">
      <img
        className="opacity-100 h-[680px]"
        src={`${banner[1]?.imageUrl}`}
        alt=""
        width="100%"
      />
    </div>
  );
};

export default HomeBody1;
