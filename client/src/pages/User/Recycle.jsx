import React from "react";
import Recycle from "../../components/User/Recycle/Recycle";
import Support from "../../components/User/Shared/Support";
import Footer from "../../components/User/Footer/Footer";

const RecyclePage = () => {
  return (
    <div className="min-h-screen">
      <Recycle />
      <Support />
      <Footer />
    </div>
  );
};

export default RecyclePage;
