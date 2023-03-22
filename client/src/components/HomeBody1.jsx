import React from "react";
import homebackground1 from "../../src/assets/images/firstbanner.jpg";

const HomeBody1 = () => {
  return (
    <div className="flex flex-col">
      <img
        className="opacity-100 h-[680px]"
        src={`${homebackground1}`}
        alt=""
        width="100%"
      />
    </div>
  );
};

export default HomeBody1;
