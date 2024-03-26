import React, { useState } from 'react'
import { baseUrl } from '../base/baseURL'
import {HiDotsVertical} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';

import { AiFillStar, AiFillEye, AiFillHeart } from 'react-icons/ai'
import { ImCheckmark } from 'react-icons/im'
import { HiUserGroup, HiShare } from 'react-icons/hi'
import axios from 'axios';


function Card({eventData}) {
  const [active, setActive] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  let eventCount = eventData? eventData.length : 0;

  function handleEdit(updateId) {
    navigate(`/dashboard/event-edit/${updateId}`);
  }

  function handlePreview(previewId){
    navigate(`/dashboard/preview-event/${previewId}`);
  }

  function handleOption(id) {
    if (active === id) {
      setActive(null);
    } else {
      setActive(id);
      setDeleteId(null)
    }
  }


async function deleteEvent(){
      try{ 
        const response = await axios.delete(`${baseUrl}/admin/get-event?eventId=${deleteId}`);
        const {success} = response.data;
        if(success){
          console.log('Post deleted')
          window.location.reload();
        }
        console.log('Post not found')
      }catch(error){
        console.log(error)
      }
  }


  
  return (
        <>    
          <div>
            <h1 className='text-md font-bold mb-4 mt-20'>My Events({eventCount})</h1>
          </div>
          {eventData ? (
            <div className=' max-w-7xl flex flex-wrap flex-row gap-6'>
              {eventData.map((item, index)=>(
                <div key={index} className=' max-h-[400px] bg-white w-[280px] h-auto rounded-lg p-[13px] shadow-md'>
                  <div className='h-[170px] overflow-hidden'>
                    <img 
                    className=' rounded w-full h-full object-cover hover:scale-110 transition-all ease-linear duration-200'
                    src={`${baseUrl}/uploads/${item.eventThumbnail}`} 
                    alt="event thumbnail" />
                  </div>
                  <p className='mt-4 text-xs text-red font-bold'>{item.dates[0]}</p>
                  <div className=''>
                    <p className='min-h-[30px] font-bold leading-5 mt-2 text-ellipsis overflow-hidden line-clamp-2 hover:underline cursor-pointer'>{item.eventTitle}</p>
                  </div>
                  <div className='relative w-full mt-5 pb-2 flex justify-between '>
                    <button onClick={()=>handlePreview(item._id)}  className=' bg-black w-full py-1 text-white mr-2 rounded'>Preview</button>
                    <button onClick={()=>handleOption(item._id)} className=' flex justify-center items-center bg-[rgba(0,0,0,0.1)] rounded w-12'><HiDotsVertical className=''/></button>
                    
                    <div className={`${active === item._id? 'block': 'hidden'}  absolute right-0 -top-20 flex flex-col bg-black text-white px-4 py-2 rounded`}>
                      <span className='absolute h-3 w-3 bg-black rotate-45 right-[14px] -bottom-1'></span>
                      <button onClick={()=>handleEdit(item._id)} className=' text-left hover:text-green-400 '>Edit</button>
                      <button onClick={()=>deleteEvent()} className='py-1 hover:text-red'>Delete</button>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
            
            
          ) : (
            <p>No image to display</p>
          )}
      </>
  )
}

export default Card