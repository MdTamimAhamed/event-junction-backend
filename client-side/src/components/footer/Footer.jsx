import React from "react";
import { BsFacebook,BsLinkedin } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className='bg-primary h-auto pb-10'>
        <div className="container mx-auto flex justify-between items-center">
          <div className="container pt-40 ml-32 flex flex-wrap justify-between items-center font-poppins text-xl font-bold text-white">

              <div>
                Get in touch!
                
                <h1 className="py-1 font-poppins font-light text-sm cursor-pointer text-white hover:underline"  >Contact</h1>
                <h1 className="py-1 font-poppins font-light text-sm cursor-pointer text-white hover:underline" >Meet with us</h1>
                <h1 className="py-1 font-poppins font-light text-sm cursor-pointer text-white hover:underline" >Help & Support</h1>
                <h1 className="py-1 font-poppins font-light text-sm cursor-pointer text-white hover:underline" >Gallery</h1>
                
              </div>
              <div>
                About Us
                
                <h1 className="py-1 font-poppins font-light text-sm cursor-pointer text-white hover:underline">About</h1>
                <h1 className="py-1 font-poppins font-light text-sm cursor-pointer text-white hover:underline">Privacy & Policy</h1>
                <h1 className="py-1 font-poppins font-light text-sm cursor-pointer text-white hover:underline">Terms of Service</h1>
                <h1 className="py-1 font-poppins font-light text-sm cursor-pointer text-white hover:underline">Daffodil International University</h1>
                
                </div>
              <div>
                Support
                
                <h1 className="py-1 font-poppins font-light text-sm cursor-pointer text-white hover:underline" >Help & Support</h1>
                <h1 className="py-1 font-poppins font-light text-sm cursor-pointer text-white hover:underline">DIU Clubs</h1>
                <h1 className="py-1 font-poppins font-light text-sm cursor-pointer text-white hover:underline">DIU News</h1>
                <h1 className="py-1 font-poppins font-light text-sm cursor-pointer text-white hover:underline">FAQ</h1>
               
              </div>
          </div>
          <div className=" pt-40 mx-32   w-[500px] text-right">
                <p className="font-poppins font-bold text-xl text-white pl-[50px] ">Join with us</p>
                <div className="flex flex-wrap justify-between items-center pt-[6px] ml-[90px] w-[200px]">
                
                    <BsFacebook className="px-[5px] text-[40px] text-secondary"/>
                    <AiFillInstagram className="px-[5px] text-[50px] text-secondary"/>
                    <BsLinkedin className="px-[5px] text-[40px] text-secondary"/>
                    <FaYoutube className="px-[5px] text-[50px] text-secondary  "/>
                  
                </div>
                <p className="container font-poppins pt-3 text-white text-2xl  font-bold">DIU <span className='text-secondary'>Event</span> Junction</p>
          </div>
        </div> 
        <div>
            <p className="mt-40"></p>
            <p className="font-poppins font-light text-[.7em] text-center mt-2 text-[#dcdde1] tracking-[0.09rem]  ">DIU Event Junction (Tamim.Ahsan.Prantik.Sraboni.Maliha) &copy;  2023 | All right reserved.</p>
          </div>
        

      </div>
    </>
  );
}

export default Footer;
