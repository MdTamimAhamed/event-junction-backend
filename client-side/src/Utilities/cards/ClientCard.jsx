import React, { useState, useEffect } from 'react';
import { baseUrl } from '../base/baseURL';
import { HiDotsVertical } from 'react-icons/hi';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillStar, AiFillEye, AiFillHeart } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';
import { HiUserGroup, HiShare } from 'react-icons/hi';
import axios from 'axios';

function ClientCard({ isLoggedIn, userToken }) {
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
          const response = await axios.get(`${baseUrl}/admin/get-event`);
          setEventData(response.data);
          console.log("Got data:", response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchEventData();
  }, []);

  function handlePreview(previewId) {
    console.log("Have prev id:", previewId);
    if (isLoggedIn) {
      navigate(`/show-event/${previewId}`);
    } else {
      navigate(`/login`);
    }
  }

  return (
    <>
      {eventData ? (
        <div className='max-w-7xl flex flex-wrap flex-row gap-6'>
          {eventData.map((item, index) => (
            <div
              key={index}
              className='max-h-[400px] bg-white w-[280px] h-auto rounded-lg p-[13px] shadow-md'
            >
              <div className='h-[170px] overflow-hidden'>
                <img
                  className='rounded w-full h-full object-cover hover:scale-110 transition-all ease-linear duration-200'
                  src={`${baseUrl}/uploads/${item.eventThumbnail}`}
                  alt='event thumbnail'
                />
              </div>
              <p className='mt-4 text-xs text-red font-bold'>{item.dates[0]}</p>
              <div>
                <p className='min-h-[30px] font-bold leading-5 mt-2 text-ellipsis overflow-hidden line-clamp-2 hover:underline cursor-pointer'>
                  {item.eventTitle}
                </p>
              </div>
              <div className='relative w-full mt-5 pb-2 flex justify-between '>
                <button
                  onClick={() => handlePreview(item._id)}
                  className='bg-black w-full py-1 text-white mr-2 rounded'
                >
                  Event Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No image to display</p>
      )}
    </>
  );
}

export default ClientCard;
