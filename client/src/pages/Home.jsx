import React from 'react'
import Footer from '../components/Footer';
import HomeBody1 from "../components/HomeBody1";
import HomeBody2 from '../components/HomeBody2';
import Middle from '../components/Middle';

const Home = () => {
  return (
    <div className='relative'>
    <HomeBody1 />
    <Middle />
    <HomeBody2 />
    <Footer />
    </div>
  )
}

export default Home