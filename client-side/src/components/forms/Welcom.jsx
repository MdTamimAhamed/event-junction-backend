import React from 'react'
import WelcomeSvg from '../../images/welcome_svg.svg'

function Welcom({bgHeight}) {
  return (
    <>
      <div className={`h-[${bgHeight}] w-[400px] bg-primary shadow-[0px_5px_25px_rgba(0,0,0,0.1)] rounded-tr-lg rounded-br-lg`}>
        <div className='h-full flex flex-col justify-center items-center relative'>
          <h1 className='text-2xl text-white'>Welcome to</h1>
          <h1 className='font-bold text-2xl text-white'>DIU<span className='font-comforter text-secondary'> Event</span> Junction</h1>
          <img className=' absolute bottom-8 object-fill px-6' src={WelcomeSvg} alt="bg" />
        </div>
      </div>
    </>
  )
}

export default Welcom