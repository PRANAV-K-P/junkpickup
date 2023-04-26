import React from "react";
import { Link } from "react-router-dom";

const Page404 = (props) => {
  return (
    <section className="page_404 bg-white pt-28 font-serif flex justify-center items-center">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12 sm:col-span-10 sm:col-start-2 text-center">
            <div
              className="four_zero_four_bg"
              style={{
                backgroundImage:
                  "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
                height: "400px",
                backgroundPosition: "center",
              }}
            >
              <h1 className="text-center text-6xl text-black">404</h1>
            </div>
            <div className="contant_box_404">
              <h3 className="text-3xl font-bold mb-4">
                Look like you&apos;re lost
              </h3>
              <p className="text-gray-500 mb-4 text-xl">
                The page you are looking for is not available!
              </p>
              {props.user ? (
                <Link
                  to="/"
                  className="bg-green-600 text-white py-3 px-8 rounded-full inline-block"
                >
                  Go to Home
                </Link>
              ) : (
                <Link
                  to="/admin/dashboard"
                  className="bg-green-600 text-white py-3 px-8 rounded-full inline-block"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
