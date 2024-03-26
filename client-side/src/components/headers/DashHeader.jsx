import React from 'react'
import {MdNotifications} from 'react-icons/md'
import jwtDecode from 'jwt-decode'
import {FiSearch} from 'react-icons/fi'

function DashHeader() {
    const token = localStorage.getItem('admin-token')
    const userDetails = jwtDecode(token)

    const userName = userDetails.firstName
    const userNameFirstLetter = userName.charAt(0)
  return (
    <>
        <div className='w-full border-b-2 border-secondary bg-white '>
            <div className='container flex justify-between px-8 py-5 items-center m-auto'>
                <div className='flex items-center'>
                    <div className=" text-black text-lg font-bold">DIU <span className='text-secondary' >Event</span> Junction</div>
                    <div className=' relative ml-20 bg-[rgba(0,0,0,0.05)] px-1 py-1 rounded'>
                        <input type="text" placeholder='Search' className='py-1 pl-8 outline-none bg-transparent' />
                        <button className='bg-black text-white px-4 py-1 rounded'>Search</button>
                        <FiSearch className=' absolute text-lg left-2 top-[50%] translate-y-[-50%]'/>
                    </div>
                </div>
                <div className='flex items-center [&>p]:ml-3'>

                    <p className=' text-[24px]'><MdNotifications/></p>

                    <div className='ml-10 flex flex-col'>
                        <p className='text-right text-sm font-bold'>{`${userDetails.firstName} ${userDetails.lastName}`}</p>
                        <p className='text-right text-[11px] text-gray'>{userDetails.email}</p>
                    </div>

                    <p className=' bg-light-gray flex justify-center items-center w-10 h-10 rounded-full
                    text-white text-lg'>
                        {userNameFirstLetter}
                    </p>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default DashHeader