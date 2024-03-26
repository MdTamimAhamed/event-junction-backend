import React, { useState, useEffect } from 'react'
import HeroSection from '../client-components/HeroSection'
import HomeHeader from '../headers/HomeHeader'
import Footer from '../footer/Footer'
import {FaFacebookSquare,FaGithubSquare} from 'react-icons/fa'
import {RiInstagramFill} from 'react-icons/ri'
import { Link} from 'react-router-dom'
import jwtDecode from 'jwt-decode'

function About() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user-token");

    if (token) {
      const userDetails = jwtDecode(token);
      const userName = userDetails.firstName;
      const userNameFirstLetter = userName.charAt(0);
      setUserLoggedIn(userNameFirstLetter);
    }
  }, []);

  return (
    <>
    <div className=''>
        {/* home header*/}
        <HomeHeader
          user={userLoggedIn}
        />


        {/* blur background*/}
        <div className=''>
          <HeroSection
            pageName='About us'
          />

          <div className='relative -mt-44 max-w-4xl bg-white h-auto mx-auto rounded-md '>
                <h1 className='text-center font-thin text-4xl pt-8'>Meet the team</h1>
                <div className='px-20 pb-20 pt-10 h-auto'>
                  <div className='flex flex-wrap justify-center gap-x-14 gap-y-20 [&>div]:w-48 [&>div]:h-48'>
                      <div className=' group relative'>
                        <img src="/src/images/profiles/tamim.jpg" alt="profile_tamim" 
                        className='rounded-lg group-hover:scale-105 transition-all ease-in overflow-hidden'/>
                        <p className='text-center text-lg mt-2'>Tamim Ahamed</p>
                        <div 
                        className=' group-hover:flex group-hover:text-white bg-[rgba(0,0,0,0.5)] px-8 py-2  
                        absolute left-[50%] bottom-2 translate-x-[-50%] hidden 
                        justify-center items-center gap-4 text-xl hover:cursor-pointer'>

                            <a href="https://www.facebook.com/tamim.ssgt/" rel='noopener' target='_blank'><FaFacebookSquare className='hover:text-secondary'/></a>
                            <a href='#' ><RiInstagramFill className='hover:text-secondary'/></a>
                            <a href='https://github.com/MdTamimAhamed' rel='noopener' target='_blank' ><FaGithubSquare className='hover:text-secondary'/></a>
                        </div>
                      </div>

                      <div className=' group relative'>
                        <img src="/src/images/profiles/ahsan.jpg" alt="profile_tamim" 
                        className='rounded-lg group-hover:scale-105 transition-all ease-in overflow-hidden'/>
                        <p className='text-center text-lg mt-2'>Md Monjurul Ahsan</p>
                        <div 
                        className=' group-hover:flex group-hover:text-white bg-[rgba(0,0,0,0.5)] px-8 py-2  
                        absolute left-[50%] bottom-2 translate-x-[-50%] hidden 
                        justify-center items-center gap-4 text-xl hover:cursor-pointer'>

                            <a href="https://www.facebook.com/monjurulmd2001" rel='noopener' target='_blank'><FaFacebookSquare className='hover:text-secondary'/></a>
                            <a href='#' ><RiInstagramFill className='hover:text-secondary'/></a>
                            <a href='https://github.com/MdTamimAhamed' rel='noopener' target='_blank' ><FaGithubSquare className='hover:text-secondary'/></a>
                        </div>
                      </div>

                      <div className=' group relative'>
                        <img src="/src/images/profiles/pro.jpg" alt="profile_tamim" 
                        className='rounded-lg group-hover:scale-105 transition-all ease-in overflow-hidden'/>
                        <p className='text-center text-lg mt-2'>Md. Zihadul Haque Prantik</p>
                        <div 
                        className=' group-hover:flex group-hover:text-white bg-[rgba(0,0,0,0.5)] px-8 py-2  
                        absolute left-[50%] bottom-2 translate-x-[-50%] hidden 
                        justify-center items-center gap-4 text-xl hover:cursor-pointer'>

                            <a href="https://www.facebook.com/Prantik.Pr0" rel='noopener' target='_blank'><FaFacebookSquare className='hover:text-secondary'/></a>
                            <a href='#' ><RiInstagramFill className='hover:text-secondary'/></a>
                            <a href='https://github.com/MdTamimAhamed' rel='noopener' target='_blank' ><FaGithubSquare className='hover:text-secondary'/></a>
                        </div>
                      </div>

                      <div className=' group relative'>
                        <img src="/src/images/profiles/sraboni.jpg" alt="profile_tamim" 
                        className='rounded-lg group-hover:scale-105 transition-all ease-in overflow-hidden'/>
                        <p className='text-center text-lg mt-2'>Sraboni Akter</p>
                        <div 
                        className=' group-hover:flex group-hover:text-white bg-[rgba(0,0,0,0.5)] px-8 py-2  
                        absolute left-[50%] bottom-2 translate-x-[-50%] hidden 
                        justify-center items-center gap-4 text-xl hover:cursor-pointer'>

                            <a href="https://www.facebook.com/sraboniakter.akhi.77" rel='noopener' target='_blank'><FaFacebookSquare className='hover:text-secondary'/></a>
                            <a href='#' ><RiInstagramFill className='hover:text-secondary'/></a>
                            <a href='https://github.com/MdTamimAhamed' rel='noopener' target='_blank' ><FaGithubSquare className='hover:text-secondary'/></a>
                        </div>
                      </div>

                      <div className=' group relative'>
                        <img src="/src/images/profiles/maliha.jpg" alt="profile_tamim" 
                        className='rounded-lg group-hover:scale-105 transition-all ease-in overflow-hidden'/>
                        <p className='text-center text-lg mt-2'>Maliha Mustary Abeda</p>
                        <div 
                        className=' group-hover:flex group-hover:text-white bg-[rgba(0,0,0,0.5)] px-8 py-2  
                        absolute left-[50%] bottom-2 translate-x-[-50%] hidden 
                        justify-center items-center gap-4 text-xl hover:cursor-pointer'>

                            <a href="https://www.facebook.com/maliha.abeda" rel='noopener' target='_blank'><FaFacebookSquare className='hover:text-secondary'/></a>
                            <a href='#' ><RiInstagramFill className='hover:text-secondary'/></a>
                            <a href='https://github.com/MdTamimAhamed' rel='noopener' target='_blank' ><FaGithubSquare className='hover:text-secondary'/></a>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
        <div className=' flex justify-between max-w-4xl mt-10 mx-auto mb-32'>
            <div className='basis-[45%]'>
              <h1 className=' text-xl font-bold'>Our vision</h1>
              <p className='text-gray'>At DIU Event Junction, we believe in the power of connection and celebration. Our vision is to simplify event management, empowering individuals and organizations to create unforgettable experiences effortlessly.</p>
            </div>

            <div className='basis-[45%]'>
              <h1 className=' text-xl font-bold'>Join Us on this Journey!</h1>
              <p className='text-gray'>We invite you to embark on this exciting journey with us. Whether you're planning a small gathering or a large-scale event, DIU Event Junction is here to make the process enjoyable and stress-free.
                Thank you for being a part of the DIU Event Junction community!</p>
            </div>
        </div>

        
      <Footer/>
    </div>
    </>
  )
}

export default About