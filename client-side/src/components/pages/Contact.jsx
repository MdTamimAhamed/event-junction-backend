import React, { useState, useEffect } from 'react'
import HeroSection from '../client-components/HeroSection'
import HomeHeader from '../headers/HomeHeader'
import Footer from '../footer/Footer'
import {FaFacebookSquare,FaGithubSquare} from 'react-icons/fa'
import {RiInstagramFill} from 'react-icons/ri'
import { Link} from 'react-router-dom'
import jwtDecode from 'jwt-decode'


function Contact() {
  // const [userLoggedIn, setUserLoggedIn] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("user-token");

  //   if (token) {
  //     const userDetails = jwtDecode(token);
  //     const userName = userDetails.firstName;
  //     const userNameFirstLetter = userName.charAt(0);
  //     setUserLoggedIn(userNameFirstLetter);
  //   }
  // }, []);
  return (
    <>
   <div className=''>
        {/* home header*/}
        <HomeHeader
          // user={userLoggedIn}
        />


        {/* blur background*/}
        <div className=''>
          <HeroSection
            pageName='Contact Us'
          />

          <div className='relative -mt-44 max-w-4xl bg-white h-auto mx-auto pb-20 rounded-md '>
                <h1 className='text-center font-bold text-3xl pt-20'>Welcome to <span className=" text-black text-3xl font-bold">DIU <span className='text-secondary font-bold' >Event</span> Junction</span></h1>
                
                <p className='relative w-[580px] mx-auto text-center mt-2'>
                  The dynamic epicenter of cultural convergence at Daffodil International University. 
                  Immerse yourself in a vibrant tapestry of diverse events that transcend boundaries and celebrate the global spirit.
                </p>
                
                  <div className='mx-auto relative w-[580px] bg-[rgba(0,0,0,0.05)] mt-8 px-1 py-2 rounded'>
                        <input type="text" placeholder='Enter Email' className='py-1 pl-8 outline-none bg-transparent' />
                        <button className='absolute right-1 bg-secondary  text-white px-4 py-2 top-[50%] translate-y-[-50%] rounded'>Subscribe</button> 
                  </div>

                  <div className='flex w-[580px] mx-auto justify-between items-center    ' >
                    <div className='  bg-[rgba(0,0,0,0.05)] mt-8 px-10 py-2 rounded'>
                        <input type="text" placeholder='Name' className='py-1 text-left outline-none bg-transparent' />
                    </div>
                    <div className='  bg-[rgba(0,0,0,0.05)] mt-8 px-10 py-2 rounded'>
                        <input type="text" placeholder='Enter Email' className='py-1 text-left outline-none bg-transparent' />
                    </div>
                  </div>
                  <div className=' relative  w-[580px] mx-auto bg-[rgba(0,0,0,0.05)] mt-8 px-2 pl-10 py-2 rounded'>

                      <textarea name="text" placeholder='Enter any message' cols="30" rows="6" className='py-2 w-full text-left outline-none bg-transparent' ></textarea>
                        
                    </div>
                    <div className='w-[580px] mx-auto mt-8'>
                    <button className=' w-full bg-secondary  text-white px-4 py-4 rounded'>Subscribe</button> </div>
            </div>
        </div>


        
      <Footer/>
    </div>
    
    </>
  )
}

export default Contact