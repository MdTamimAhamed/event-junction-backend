import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import {MdAddCircle} from 'react-icons/md'
import jwtDecode from "jwt-decode";

function AdminProfile() {
  const token = localStorage.getItem('admin-token')
    const userDetails = jwtDecode(token)
    const userName = userDetails.firstName
    const userNameFirstLetter = userName.charAt(0)

    const [active, setActive] =  useState(false)

  return (
    <>
    { active? <Outlet/>  
    :(<div>
        <div className="relative">
          <div className=" h-[180px] rounded-tr-md rounded-tl-md bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <div className="h-[180px] bg-white">
            <h1 className=" absolute left-10 top-[52%] translate-y-[-50%] h-[125px] w-[125px] bg-light-gray flex justify-center items-center text-5xl font-bold
                text-white rounded-full border-[6px] ">
                {userNameFirstLetter}
            </h1>
            <div className="flex justify-between items-center py-16 px-10 pb-10">
                <div>
                  <h1 className="mt-4 text-xl font-bold">{`${userDetails.firstName} ${userDetails.lastName}`}</h1>
                  <p className="text-sm text-gray">{userDetails.email}</p>
                </div>
                <div className="text-sm">
                  <button className="bg-black text-white px-4 py-2 rounded mr-4">My Events</button>
                  <button className="bg-black text-white px-4 py-2 rounded">Drafts</button>
                </div>
            </div>
          </div>
        </div>

        <div className="ml-10">
          {/**Event add btn */}
          <div className="w-full">
            <Link to="create-event">
              <div onClick={()=>setActive(true)} 
              className=" w-[250px] h-[150px] border-2 border-secondary  bg-white flex flex-col justify-center items-center 
              rounded-md border-dashed  mt-10 cursor-pointer">
                <MdAddCircle className=" text-[55px] text-secondary"/>
                <p className=" font-medium text-secondary">Add Event</p>
              </div>
            </Link>
          </div>

          {/**Draft event section */}
          <div className="mt-10 b">
            <h1 className=" text-lg font-bold">Draft Events(0)</h1>
            <p>Will add soon...</p>
          </div>
        </div>
        
      </div>)}
    </>
  );
}

export default AdminProfile;
