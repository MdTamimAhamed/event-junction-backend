import React from 'react'
import { baseUrl } from '../../Utilities/base/baseURL'
import { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


function HomeHeroSection({title,type,thumbnail,dates,times, venue}) {

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();
  
  //date calculation
  let startDate = ''
  let day = ''
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if(dates){
    const dateObj1 = new Date(dates[0]);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    day = daysOfWeek[dateObj1.getDay()]
    startDate = dateObj1.toLocaleDateString('en-US', options);
  }


  //time calculation
  let startTime12Hour = ''
  if(times){
    function convertTo12HourFormatWithSeconds(time24) {
      const [hours, minutes] = time24.split(':');
      const date = new Date(2023, 1, 1, hours, minutes); // Use an arbitrary date (January 1, 2000) for time parsing
    
      let formattedTime = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    
      return formattedTime;
    }
    const startTime = times[0];
    startTime12Hour = convertTo12HourFormatWithSeconds(startTime);
  }


    // Set the start date to November 14, 2023
    const eventStartDate = new Date(`${startDate} ${startTime12Hour}`);

    // Function to calculate and display the remaining time
    let intervalId;
    function updateRemainingTime() {
      const currentTime = new Date();
      const timeRemaining = eventStartDate - currentTime;

      if (timeRemaining <= 0) {
        clearInterval(intervalId);
        return;
      }
      const totalSeconds = Math.floor(timeRemaining / 1000);
      
      const remainingDays = Math.floor(totalSeconds / (24 * 60 * 60));
      const remainingHours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
      const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
      const remainingSeconds = totalSeconds % 60;
      setDays(remainingDays);
      setHours(remainingHours);
      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);
    }

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
    
    useEffect(() => {
      intervalId = setInterval(updateRemainingTime, 1000);
      return () => clearInterval(intervalId);
    }, [eventStartDate])

    useEffect(() => {
        const token = localStorage.getItem("user-token");
        if (token) {
          setIsLoggedIn(true);
        }
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
        <div className='bg-clientHeroImg h-[80vh] bg-no-repeat bg-cover bg-center'>
            <div className=' flex justify-center h-full w-full backdrop-blur-[120px]'>
                <div className='flex justify-between items-center container px-28'>
                    <div className=' basis-[50%]'>
                        <div className='flex'>
                            <p className='mr-4 text-secondary font-medium'>Up coming event</p>
                            <p className='text-white text-start font-light px-4 border-[1px] border-white'>{type}</p>
                        </div>
                        <div className='mt-4'>
                            <h1 className='text-white text-4xl leading-tight font-bold'>{title}</h1>
                        </div>

                        <div className='max-w-[450px] text-white my-4 p-4 border-l-[6px] border-secondary bg-[rgba(255,255,255,0.3)]'>
                            <div className='flex text-sm'>
                                <span className='flex font-bold '>
                                    Date:<p className='font-light ml-4'> {day}, {startDate}</p>
                                </span>
                                <span className='w-[2px] bg-secondary mx-4'></span>
                                <span className='flex font-bold'>
                                    Time:<p className='font-light ml-4'> {startTime12Hour}</p>
                                </span>
                            </div>
                            <span className='flex font-bold text-sm mt-2'>Venue: <p className='font-light ml-4'>{venue}</p></span>
                        </div>

                        <div className='flex items-end'>
                            {eventData && eventData.length > 0  && ( 
                            <button onClick={() => handlePreview(eventData[2]._id)} className='bg-white text-black font-medium px-6 py-2 rounded'>Event Details</button>
                            ) }
                           
                            <div>
                                <p className='ml-8 basis-10 mt-4 text-white mb-2 text-center'>Event starts in:</p>
                                <div className='ml-8 flex justify-between w-full [&>div]:bg-white [&>div]:shadow-md [&>div]:w-12 [&>div]:h-10'>
                                    <div className='relative rounded'><span className='absolute text-secondary text-lg font-bold top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>{days}d</span></div>
                                    <div className='relative rounded'><span className='absolute text-secondary text-lg font-bold top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>{hours}h</span></div>
                                    <div className='relative rounded'><span className='absolute text-secondary text-lg font-bold top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>{minutes}m</span></div>
                                    <div className='relative rounded'><span className='absolute text-secondary text-lg font-bold top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>{seconds}s</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative max-w-xl'>
                        <img className=' absolute -top-6 -left-8 -z-0 w-24' src="/src/images/svgs/outline_clr.svg"/>
                        <img className=' absolute -right-8 -bottom-8 z-10 w-28 ' src="/src/images/svgs/fill.svg"/>
                        <img className=' absolute right-10 -bottom-8 z-10 w-16 ' src="/src/images/svgs/small_elp.svg"/>
                        <img className=' relative z-0 w-full h-full rounded-3xl object-cover shadow-[0px_1px_20px_rgba(0,0,0,0.3)]' 
                            src={`${baseUrl}/uploads/${thumbnail}`} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HomeHeroSection