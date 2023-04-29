import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

const HomeBody1 = () => {
  const [banner, setBanner] = useState({});
  const bannerName = "Banner 736abe8a-11ce-4ec1-8159-87bc16d21cd4";
  
  useEffect(() => {
    (async () => {
      const BANNER = `/banners/${bannerName}`;
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
        src={`${banner.imageUrl}`}
        alt=""
        width="100%"
      />
    </div>
  );
};

export default HomeBody1;
