import React from "react";
import Footer from "../../components/User/Footer/Footer";
import HomeBody1 from "../../components/User/Home/HomeBody1";
import HomeBody2 from "../../components/User/Home/HomeBody2";
import Middle from "../../components/User/Home/Middle";

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
