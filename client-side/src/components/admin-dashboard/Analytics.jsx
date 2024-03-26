import React from 'react'
import { GoStarFill } from "react-icons/go";
import { MdBookmarkAdded } from "react-icons/md";
import { BsEyeFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { HiShare } from "react-icons/hi";

function Analytics() {
  return (
    <div >
        <h1 className=' font-bold text-md mb-4 '>Event Analytics</h1>
        <div className='max-w-[700px] '>
            <div className='flex flex-wrap justify-between items-center gap-4'>
                  <div className='space-x-10 flex basis-[210px] justify-start items-center border-none rounded px-8 py-5 shadow-sm bg-white'>
                     <div className='w-[30px] h-[30px] bg-secondary rounded-full flex justify-center items-center'><GoStarFill className='text-white text-xl'/></div>
                    <div className=''>
                      <p className='text-xl font-bold'>00</p>
                      <p className='font-medium text-secondary text-center'>Interested</p>
                    </div>
                  </div>
                  <div className='space-x-10 flex basis-[210px]  justify-start items-center border-none rounded px-8 py-5 shadow-sm bg-white'>
                      <div className='w-[30px] h-[30px] bg-secondary rounded-full flex justify-center items-center'><MdBookmarkAdded className='text-white text-xl'/></div>
                    <div className=''>
                      <p className='text-xl font-bold'>00</p>
                      <p className='font-medium text-secondary text-center'>Going</p>
                    </div>
                  </div>
                  <div className='space-x-10 flex basis-[210px] justify-start items-center border-none rounded px-8 py-5 shadow-sm bg-white'>
                      <div className='w-[30px] h-[30px] bg-secondary rounded-full flex justify-center items-center'><BsEyeFill className='text-white text-xl '/></div>
                    <div className=''>
                      <p className='text-xl font-bold'>00</p>
                      <p className='font-medium text-secondary text-center'>Views</p>
                    </div>
                  </div>
                  <div className='space-x-10 flex basis-[210px] justify-start items-center border-none rounded px-8 py-5 shadow-sm bg-white'>
                      <div className='w-[30px] h-[30px] bg-secondary rounded-full flex justify-center items-center'><AiFillHeart className='text-white text-xl '/></div>
                    <div className=''>
                      <p className='text-xl font-bold'>00</p>
                      <p className='font-medium text-secondary text-center'>Favourite</p>
                    </div>
                  </div>
                  <div className='space-x-10 flex basis-[210px]  justify-start items-center border-none rounded px-8 py-5 shadow-sm bg-white'>
                     <div className='w-[30px] h-[30px] bg-secondary rounded-full flex justify-center items-center'><HiUsers className='text-white text-xl'/></div>
                    <div className=''>
                      <p className='text-xl font-bold'>00</p>
                      <p className='font-medium text-secondary text-center'>User</p>
                    </div>
                  </div>
                  <div className='space-x-10 flex basis-[210px]  justify-start items-center border-none rounded px-8 py-5 shadow-sm bg-white'>
                     <div className='w-[30px] h-[30px] bg-secondary rounded-full flex justify-center items-center'><HiShare className='text-white text-xl'/></div>
                    <div className=''>
                      <p className='text-xl font-bold'>00</p>
                      <p className='font-medium text-secondary text-center'>Shares</p>
                    </div>
                  </div>
            </div>

        </div>
    </div>
  )
}

export default Analytics