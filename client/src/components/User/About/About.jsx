import React from "react";
import backgroundImage from "../../../assets/images/commonbackground.jpg";

const About = () => {
  return (
    <div className="relative w-full z-40 flex flex-col bg-no-repeat">
      <img
        className="absolute w-full  top-0 object-fill h-full "
        src={`${backgroundImage}`}
        alt="Image"
      ></img>
      <div className="relative z-10 w-full">
        <div className="md:col-span-2">
          <div className="ml-2 mr-2 sm:ml-auto sm:mr-auto rounded-lg shadow-2xl mt-20 border border-gray-300 p-2 sm:w-2/4">
            <div className="w-full mb-10">
              <div className="text-4xl flex justify-center text-white font-normal mb-10">
                Team JunkPickup
              </div>
              <div className="text-xl text-white font-light">
                Our team of experts will come to your home at a scheduled date
                and time and remove any items on your list. Whether it's a
                broken piece of furniture, metal scraps, papers, electronics, or
                plastic items, we'll take care of it all. We understand that
                these items can take up valuable space in your home and can even
                be hazardous to the environment, so we take great care to
                dispose of them responsibly.
              </div>
            </div>
            <div className="w-full">
              <div className="text-3xl text-white font-medium mb-10 italic">
                Making your space junk-free, without breaking the bank.
              </div>
              <div className="text-xl text-white font-light">
                we understand the frustration of having unwanted items
                cluttering up your home. That's why we offer a completely free
                service to help you get rid of them. We believe in a waste-free
                society and are committed to doing our part to make it a
                reality.
              </div>
            </div>
          </div>

          <div className="ml-2 mr-2 sm:ml-auto sm:mr-auto rounded-lg shadow-2xl mt-20 border border-gray-300 p-2 sm:w-2/4 mb-10">
            <div className="w-full">
              <div className="text-3xl text-white font-medium italic	">
                Join us in our mission to create a waste-free society and enjoy
                a clutter-free living or working space today.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
