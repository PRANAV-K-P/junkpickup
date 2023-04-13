import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  const handleAddAddress = (address) => {
     setAddresses([...addresses, address]);
    setIsAddAddressModalOpen(false);
  };

  const handleUploadProfileImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={profileImage || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full cursor-pointer p-1"
                  >
                    <IoMdAddCircle size={20} />
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadProfileImage}
                  />
                </div>
              </div>
              <h2 className="text-xl font-medium mb-4">{name}</h2>
              <p className="text-gray-700">{email}</p>
              <p className="text-gray-700">{phoneNumber}</p>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={profileImage || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full cursor-pointer p-1"
                  >
                    <IoMdAddCircle size={20} />
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadProfileImage}
                  />
                </div>
              </div>
              <h2 className="text-xl font-medium mb-4">{name}</h2>
              <p className="text-gray-700">{email}</p>
              <p className="text-gray-700">{phoneNumber}</p>
            </div>
          </div>


          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-xl font-medium mb-4">Addresses</h2>
                {addresses.length > 0 ? (
                  <ul className="flex flex-row">
                    {addresses.map((address, index) => (
                      <li key={index} className="flex items-center py-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mr-3">
                          <FaUserCircle
                            size={24}
                            className="text-gray-500 mx-auto my-auto"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">
                            {address.name}
                          </h3>
                          <p className="text-gray-700">{address.address}</p>
                          <p className="text-gray-700">{address.pincode}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">No addresses added yet.</p>
                )}
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 py-2 mt-4"
                  onClick={() => setIsAddAddressModalOpen(true)}
                >
                  Add Address
                </button>

                {isAddAddressModalOpen && (
                  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                  <div className="relative bg-white rounded-lg shadow-md p-6 md:p-10 w-96">
                    <h2 className="text-xl font-medium mb-4">Add Address</h2>
                    <button
                      className="absolute top-0 right-0 m-3 text-gray-600"
                      onClick={() => setIsAddAddressModalOpen(false)}
                    >
                      <MdClose size={20} />
                    </button>
            
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full border-gray-400 border rounded-md p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="w-full border-gray-400 border rounded-md p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="pincode"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        className="w-full border-gray-400 border rounded-md p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="mobileNo"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Mobile No
                      </label>
                      <input
                        type="tel"
                        id="mobileNo"
                        name="mobileNo"
                        className="w-full border-gray-400 border rounded-md p-2"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full border-gray-400 border rounded-md p-2"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 py-2 mt-4"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsAddAddressModalOpen(false)}
                      type="submit"
                      className="bg-red-500 hover:bg-red-600 text-white font-medium rounded px-4 py-2 ml-2 mt-4"
                    >
                      close
                    </button>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
