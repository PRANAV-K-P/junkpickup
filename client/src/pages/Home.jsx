import React from "react";
import Footer from "../components/partials/Footer";
import HomeBody1 from "../components/userHome/HomeBody1";
import HomeBody2 from "../components/userHome/HomeBody2";
import Middle from "../components/userHome/Middle";

const Home = () => {
  return (
    <div className="relative">
      <HomeBody1 />
      <Middle />
      <HomeBody2 />
      <Footer />
    </div>
  );
};

export default Home;
