import React,{useEffect, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";

const HomeBody2 = () => {
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
    <div className="relative w-full h-[550px] sm:h-[35rem] sm:max-w-full">
      <img
        className="object-cover w-full h-full"
        src={`${banner[0]?.imageUrl}`}
        alt=""
      />
      <h2 className="absolute font-bold text-white top-2/4 text-3xl px-40 ">
        From serving the business owners in our communities to construction
        workers on the job site, we are committed to providing sustainable waste
        management solutions that you can rely on to make your life easier – no
        matter your unique needs! We are striving for a greener and cleaner
        tomorrow in all our locations{" "}
      </h2>
    </div>
  );
};

export default HomeBody2;
