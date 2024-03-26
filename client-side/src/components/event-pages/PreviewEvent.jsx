import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../Utilities/base/baseURL'
import { useParams } from 'react-router-dom'
import { GoDotFill } from 'react-icons/go'
import {MdDateRange, MdOutlineAccessTime, MdCheckBox} from 'react-icons/md'
import {BsFillPinMapFill} from 'react-icons/bs'

function PreviewEvent() {
  const { id } = useParams();
  const [previewEventData, setPreviewEventData] = useState(null);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(()=>{
    const fatchPreviewData = async ()=>{
      try{
        const response = await axios.get(`${baseUrl}/admin/get-event?eventId=${id}`)
        setPreviewEventData(response.data)
  
      }catch(error){
  
      }
    } 
    fatchPreviewData();
  },[id])

  //date calculation
  let startDate = ''
  let endDate = ''
  let day = ''
  let day2 = ''
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if(previewEventData && previewEventData.dates){
    const dateObj1 = new Date(previewEventData.dates[0]);
    const dateObj2 = new Date(previewEventData.dates[1]);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    day = daysOfWeek[dateObj1.getDay()]
    startDate = dateObj1.toLocaleDateString('en-US', options);

    day2 = daysOfWeek[dateObj2.getDay()]
    endDate = dateObj2.toLocaleDateString('en-US', options);
  }


  //time calculation
  let startTime12Hour = ''
  let endTime12Hour  = ''
  if(previewEventData && previewEventData.times){
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
    const startTime = previewEventData.times[0];
    const endTime = previewEventData.times[1];
    
    startTime12Hour = convertTo12HourFormatWithSeconds(startTime);
    endTime12Hour = convertTo12HourFormatWithSeconds(endTime);
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
      intervalId = setInterval(updateRemainingTime, 1000);
      return () => clearInterval(intervalId);
    }, [eventStartDate])
    

  



  return (
    <>
      {previewEventData?(
        <div className='flex justify-evenly bg-primary h-[320px]'>
          <div className='max-w-4xl mt-20 h-[150vh]'>
            <img 
            className='rounded-lg shadow-md '
            src={`${baseUrl}/uploads/${previewEventData.eventThumbnail}`} alt="event thumbnail" />

            <div className='flex mt-16'>
              <p className='text-red '>Up comming event</p>
              <p className='border-[1px] border-secondary text-secondary ml-4 px-6'>{previewEventData.eventType}</p>
            </div>

            <div className='flex justify-between'>
              {/*Left column */}
              <div className='  mt-2 w-[65%] '>
                <div className='border-l-4 border-secondary'>
                  <h1 className=' font-extrabold text-2xl leading-7 ml-2'>{previewEventData.eventTitle}</h1>
                </div>
                <div className='mt-10'>
                  <p className='font-medium'>Keynote speaker/guest</p>
                  {previewEventData.speaker.map((item, index)=>(
                     <p key={index} className='flex items-center text-gray list-disc font-lato'><GoDotFill className='text-sm mr-2 text-secondary'/>{item}</p>
                  ))}
                </div>

                <div className='mt-10'>
                  <p className='font-bold '>Other Details:</p>
                  {previewEventData.eventDetails? (
                    <div className='text-gray mt-2' dangerouslySetInnerHTML={{__html:previewEventData.eventDetails}}/>
                  ):(
                    <p className='mt-2'>No event details!</p>
                  )}
                </div>


                <div className='mt-10'>
                  <p className='font-bold '>Organizer's Details:</p>
                  {previewEventData.organizer? (
                    <div className='text-gray mt-2' dangerouslySetInnerHTML={{__html:previewEventData.organizer}}/>
                  ):(
                    <p className='mt-2'>No organizer details!</p>
                  )}
                </div>

                <div>
                  
                </div>
              </div>

              {/*Right column */}
              <div className='w-[31%]'>
                  <p className='font-medium mb-[3px]'>Event starts in:</p>
                  <div className='flex justify-between w-full [&>div]:bg-white [&>div]:shadow-md [&>div]:w-12 [&>div]:h-10'>
                     <div className='relative rounded'><span className=' absolute text-lg font-bold top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>{days}d</span></div>
                     <div className='relative rounded'><span className='absolute text-lg font-bold top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>{hours}h</span></div>
                     <div className='relative rounded'><span className='absolute text-lg font-bold top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>{minutes}m</span></div>
                     <div className='relative rounded'><span className='absolute text-lg font-bold top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>{seconds}s</span></div>
                  </div>

                  <div className='border-l-[1px] border-[rgba(0,0,0,0.1)]'>
                      <div className='pl-6'>
                        <p className='mt-10 font-medium mb-2'> Program Schedule</p>
                        <div className='flex text-sm '>
                          <MdDateRange className='mr-2 text-lg text-secondary'/>
                          <span className='font-medium flex'>Date:
                            <span className='pl-2'>
                              <p className=' font-normal'><span className={`font-medium text-red`}>Start:</span> {day} {startDate}</p>
                              <p className=' font-normal'><span className='font-medium text-red'>End:</span> {day2} {endDate}</p>
                            </span>
                          </span>
                        </div>

                        <div className='flex mt-[6px]'>
                          <MdOutlineAccessTime className='mr-2 text-lg text-secondary'/>
                          <span className='font-medium text-sm flex'>Time: 
                            <p className='font-normal ml-2'>
                              {startTime12Hour} - {endTime12Hour}
                            </p>
                          </span>
                        </div>

                        <div className='flex  mt-[6px]'>
                          <BsFillPinMapFill className='mr-2 text-3xl text-secondary'/>
                          <p className='font-medium justify-between text-sm'>Venue: 
                          <span className='font-normal ml-2'>{previewEventData.venue}</span></p>
                        </div>

                        <div className='mt-10'>
                          <p className='font-medium'>Swag Items</p>
                          {previewEventData.swagItems.map((item, index)=>(
                            <div key={index} className='flex items-start'>
                              <MdCheckBox className='text-lg mr-2 text-secondary w-[10%]'/>
                              <p key={index} className='flex items-start'> {item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                  </div>
              </div>
            </div>

          </div>
        </div>
      ):(
        <p>Event not found!</p>
      )}
    </>
  )
}

export default PreviewEvent