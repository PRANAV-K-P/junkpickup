import React, { useEffect, useState } from 'react'
import backgroundImage from "../../../assets/images/commonbackground.jpg";
import axiosInstance from '../../../api/axiosInstance';

const Faq = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        (async () => {
          try {
            let response = await axiosInstance.get('/faqs/user');
            if (response.data) {
              setFaqs(response.data);
            }
          } catch (err) {}
        })();
      }, []);

  return (
    <div className="relative w-full z-40 flex flex-col bg-no-repeat">
      <img
        className="absolute w-full  top-0 object-fill h-full "
        src={`${backgroundImage}`}
        alt="Image"
      ></img>
      <div className="relative z-10 w-full">
        <div className="md:col-span-2 ">


        <div className="flex items-center justify-center h-screen">
            <div className="bg-white">
                <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                    <h2 className="text-3xl font-semibold">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg mb-8 text-gray-600">
                    Questions that are frequently asked by users
                    </p>
                    <div className="space-y-4">
                        {faqs.map((item, index) => (
                            <details 
                            key={index}
                            className="w-full rounded-lg ring-1 ring-purple-600">
                            <summary className="px-4 text-xl text-black font-semibold py-6">
                                {item.question}
                            </summary>
                            <p className="px-4 py-6 text-lg pt-0 ml-4 -mt-4 text-gray-600">
                                {item.answer} 
                            </p>
                        </details>
                        ))}

                        


                    </div>
                </div>
            </div>
        </div>

        </div>
      </div>
    </div>
  )
}

export default Faq