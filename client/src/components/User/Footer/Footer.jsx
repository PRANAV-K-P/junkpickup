import React from "react";
import { FaGoogle, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-light-cyan w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mt-6">JunkPickup</h2>
      <div className="w-52 mt-3 flex flex-row justify-between text-3xl">
        <FaGoogle /> <FaFacebookF /> <FaInstagram /> <FaTwitter />
      </div>
      <h2 className="mt-6 mb-7">
        JunkPickup is a registered junk removal website in Kerala, India.
        Registered office at Second floor, Infopark phase IV. JunkPickup is
        committed to sustainability and reducing waste.
      </h2>
    </div>
  );
};

export default Footer;
