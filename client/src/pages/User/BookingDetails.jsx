import React from "react";
import { SkeletonTheme } from 'react-loading-skeleton';
import BookingDetails from "../../components/User/Booking/BookingDetails";
import Support from "../../components/User/common/Support";
import Footer from "../../components/User/Footer/Footer";

const BookingDetailsPage = () => {
  return (
    <>
     <SkeletonTheme baseColor="#ffffff" highlightColor="#f2f2f2">
      <BookingDetails />
      <Support />
      <Footer />
      </SkeletonTheme>
    </>
  );
};

export default BookingDetailsPage;
