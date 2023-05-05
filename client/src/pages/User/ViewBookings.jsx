import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import ViewBookings from "../../components/User/Booking/ViewBookings";
import Support from "../../components/User/Common/Support";
import Footer from "../../components/User/Footer/Footer";

const ViewBookingsPage = () => {
  return (
    <>
      <SkeletonTheme baseColor="#e6e6e6" highlightColor="#ffffff">
        <ViewBookings />
        <Support />
        <Footer />
      </SkeletonTheme>
    </>
  );
};

export default ViewBookingsPage;
