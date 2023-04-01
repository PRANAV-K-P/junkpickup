import React from 'react'
import backgroundImage from "../../src/assets/images/middlebox.jpg";
// bg-[url("../../src/assets/images/green.jpg")] bg-no-repeat bg-cover

const Middle = () => {
  return (
    <div className={`bg-gradient-to-r from-green-400 to-green-200 w-full h-96 flex flex-col items-center justify-center`}>
        <div className='relative rounded-xl font-bold text-3xl bg-blue-500 h-36 w-2/5 flex items-center justify-center overflow-hidden'>
            <img className="object-cover w-full h-full" src={`${backgroundImage}`} alt="" />
            <h2 className='absolute'>YOU GOT JUNK? WE'LL REMOVE IT.</h2>
        </div>
        <div className='relative rounded-xl font-bold text-white flex flex-row items-center justify-around text-3xl  h-36 w-2/5 mt-4 '>
            <div className='bg-blue-500 py-5 flex justify-center w-56'>Junk Removal</div>
            <div className='bg-blue-500 py-5 flex justify-center w-56'>Recycle</div>
        </div>
    </div>
  )
}

export default Middle
