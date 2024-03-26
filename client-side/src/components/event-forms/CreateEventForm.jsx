import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import InputHandlerSm from "../formInputHandler/InputHandlerSm"
import { MdKeyboardBackspace } from "react-icons/md"
import { useState, useEffect } from "react";
import { MdAddBox,MdDeleteForever,MdOutlineAddBox, MdOutlineFileUpload } from "react-icons/md"
import { baseUrl } from "../../Utilities/base/baseURL";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

function CreateEventForm() {

  const [title, setTitle] = useState('')
  const [file, setFile] = useState({})
  console.log(file)
  const [logoFile, setLogoFile] = useState([])
  console.log(logoFile)

  const [eventType, setEventType] = useState('')
  const [swag, setSwag] = useState('')
  const [showSwagItem, setShowSwagItem] = useState([])

  const [eventStartDate, setEventStartDate] = useState('')
  const [eventEndDate, setEventEndDate] = useState('')

  const [eventStartTime, setEventStartTime] = useState('')
  const [eventEndTime, setEventEndTime] = useState('')

  const [venue, setVenue] = useState('')
  const [speaker, setSpeaker] = useState('')
  const [showSpeaker, setShowSpeaker] = useState([])

  const [eventDetails, setEventDetails] = useState('')
  const [organizerDetails, setOrganizerDetails] = useState('')

  const [authorId, setAuthorId] = useState('')

  const dates = [eventStartDate, eventEndDate]
  const times = [eventStartTime, eventEndTime]

  const adminToken = localStorage.getItem("admin-token");
  useEffect(() => {
    if (adminToken) {
      const loggedAdmin = jwtDecode(adminToken);
      setAuthorId(loggedAdmin._id);
    }
  }, []);
  

  async function handleUpload(e){
    e.preventDefault()
    console.log('form submitted')

    const formData = new FormData();
    formData.append('eventTitle', title);
    formData.append('eventThumbnail', file);
    formData.append('eventType', eventType);
    formData.append('swagItems', showSwagItem);
    formData.append('eventDates', dates);
    formData.append('eventTimes', times);
    formData.append('venue', venue);
    formData.append('speaker', showSpeaker);
    formData.append('eventDetails', eventDetails);
    formData.append('organizerDetails', organizerDetails);
    formData.append('authorId', authorId);
  

    try {
      const response = await axios.post(`${baseUrl}/admin/add-event`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);


    } catch (error) {
      console.error("Error:", error);
    }
    
                
      setTitle('')
      setFile({})
      setLogoFile({})
      setEventType('')
      setShowSwagItem([])
      setVenue('')
      setSpeaker('')
      setEventDetails('')
      setOrganizerDetails('')
  }

  function handleRoute() {
    window.location.href = "/dashboard";
  }

  function handleAddItem(){
    if(swag){
      setShowSwagItem([...showSwagItem, swag])
    }
    setSwag('')
  }

  function handleAddSpeaker(){
    if(speaker){
      setShowSpeaker([...showSpeaker, speaker])
    }
    setSpeaker('')
  }

  function handleDeleteSwagItem(index) {
    const updatedSwagItems = showSwagItem.filter((_, i) => i !== index);
    setShowSwagItem(updatedSwagItems);
  }

  function handleDeleteSpeaker(index) {
    const updatedSpeaker = showSpeaker.filter((_, i) => i !== index);
    setShowSpeaker(updatedSpeaker);
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <>
      <form onSubmit={handleUpload} encType="multipart/form-data"
        className="max-w-[900px] bg-white mt-5 px-8 py-8  shadow-md mb-20">
        <div className="flex items-start gap-6">
          <button onClick={handleRoute}><MdKeyboardBackspace className=" text-[1.4em]"/></button>
          <div className="">
            <div className="text-xl font-medium">Add New Event</div>
            <p className="text-sm text-gray">Fill up this form to post your event.</p>
          </div>
        </div>


        <div className="px-[46px]">
          <div className="mt-8">
            <p className="">Event Title <span className=" text-red text-sm">*</span></p>
            <input 
              className=" min-w-full py-3 px-3 rounded-md placeholder:text-lg outline-1 outline-light-gray border-[1px]
               border-black-500 mt-1 bg-[rgba(0,0,0,0.04)]"
              type="text" 
              placeholder="Enter your event title here..."
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
            />
          </div>


          <div className="mt-8">
            <p>Event Thumbnail <span className="text-red text-sm">*</span></p>
            <div className=" relative w-full flex flex-col justify-center items-center p-8 border-[2px] border-dashed bg-[rgba(0,0,0,0.04)]  rounded-md">
              <div className=" relative   w-[130px] py-[2px]">
                <input 
                className=" z-10 relative opacity-0 cursor-pointer" 
                type="file" 
                accept=".jpg, .png, .jpeg"
                onChange={(e)=>setFile(e.target.files[0])}
                />
                <button className=" absolute left-0 top-0 flex justify-center items-center text-md text-white rounded-md w-full h-full bg-black " type="button"><MdOutlineFileUpload className="text-xl mr-2"/> Upload</button>
              </div>
              {file && file.name? (
                <div className="flex items-center">
                  <p>{file.name}</p>
                  <button
                    className="ml-2 text-red-700"
                    type="button"
                    onClick={() => setFile(null)}
                  >
                    <MdDeleteForever className="text-red text-lg" />
                  </button>
                </div>
              ):''}
            </div>
          </div>


          <div className="flex justify-between mt-10">
            <div className="flex items-center">
              <p >Event Type: <span className="text-red mr-4">*</span></p>
              <select 
              value={eventType}
              onChange={(e)=> setEventType(e.target.value)}
              className="px-6 py-1 bg-black text-white rounded-md " name="type" id="type">
                <option value="" >Select Type</option>
                <option value="Conference">Conference</option>
                <option value="Seminer">Seminer</option>
                <option value="Concert">Concert</option>
                <option value="Reception">Reception</option>
                <option value="Other">Other</option>
              </select>
            </div>


            <div className="flex items-center">
              <p className="mr-2">Swag Items:</p>
              <div className="flex justify-between items-center">
                <InputHandlerSm
                  type="text"
                  placeholder="Enter Item"
                  state={swag}
                  setState={setSwag}
                />
                <MdAddBox onClick={handleAddItem} className="text-4xl text-black cursor-pointer"/>
              </div>
            </div>
          </div>
          <div className=" w-full flex justify-end">
            <ul className="w-[240px]">
              {showSwagItem.map((item,index)=>(
                <li className=" group flex items-center justify-between mr-8 px-2 py-1 text-sm bg-green-100 text-green-700 rounded mt-1 " key={index}>
                  <div className="flex items-center">
                    <MdOutlineAddBox className="mr-2 text-green-700"/> {item}
                  </div>
                  <button onClick={() => handleDeleteSwagItem(index)} className="ml-2 text-red-700">
                    <MdDeleteForever className="text-red text-lg"/>
                  </button>
                </li>))
              }
            </ul>
          </div>
          
          <div className="mt-10">
            <h1 className="text-black text-lg font-medium">Event Schedule</h1>
            <p className="text-sm text-light-gray pb-2">All the fields are required!</p>
          </div>
          
          {/**Event Schedule section */}
          <div className=" bg-[rgba(0,0,0,0.04)] p-6 rounded-md">
            <div className="mt-5 w-full flex justify-between flex-wrap">
              <div className="flex justify-between pr-10 ">
                <p>Date <span className="text-red">*</span></p>
                <div className="ml-10">
                  <p>Start Date:</p>
                  <input 
                    className="w-[200px] border-[1px] border-light-gray py-1 px-2 rounded-md"
                    type='date'
                    placeholder="Start date"
                    value={eventStartDate}
                    onChange={(e)=> setEventStartDate(e.target.value)}
                  />
                  
                  <p>End Date:</p>
                  <input 
                    className="w-[200px] border-[1px] border-light-gray py-1 px-2 rounded-md"
                    type='date'
                    placeholder="End date"
                    value={eventEndDate}
                    onChange={(e)=> setEventEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex">
                <p>Time<span className="text-red">*</span></p>
                <div className="ml-10">
                  <p>Start Time:</p>
                  <input 
                    className="w-[200px] border-[1px] border-light-gray py-1 px-2 rounded-md"
                    type='time'
                    placeholder="Start date"
                    value={eventStartTime}
                    onChange={(e)=> setEventStartTime(e.target.value)}
                  />
                  
                  <p>End Time:</p>
                  <input 
                    className="w-[200px] border-[1px] border-light-gray py-1 px-2 rounded-md"
                    type='time'
                    placeholder="End date"
                    value={eventEndTime}
                    onChange={(e)=> setEventEndTime(e.target.value)}
                  />
                </div>
              </div>
            </div>


            <div className="flex items-center  mt-10">
              <p >Venue: <span className="text-red mr-4">*</span></p>
              <select 
                value={venue}
                onChange={(e)=> setVenue(e.target.value)}
                className="px-4 max-w-[400px] py-1 bg-black text-white rounded-md ">
                  <option value="" >Select Venue</option>
                  <option value="International Conference Hall, Daffodil International University (ICH)">
                    International Conference Hall, Daffodil International University (ICH)
                  </option>
                  <option value="Conference Hall, Daffodil International University">
                    Conference Hall, Daffodil International University
                  </option>
                  <option value="DIU Auditorium">
                    DIU Auditorium
                  </option>
              </select>
            </div>
          </div>{/** */}


          

          <div className="w-full flex justify-start mt-10">
              <p className="mr-2">Keynote speaker/ Guest <span className="text-red">*</span></p>
              <div className="w-full">
                <div className="flex justify-start items-center">
                  <input
                    className=" w-[60%] border-[1px] border-light-gray py-1 px-4 rounded-md outline-light-gray"
                    type="text"
                    value={speaker}
                    onChange={(e)=> setSpeaker(e.target.value)}
                    placeholder="Enter speaker/guest name"
                  />
                  <button type="button" onClick={handleAddSpeaker} className="flex items-center flex-nowrap py-[5px] px-2 ml-2 rounded-md text-white bg-black" >
                    + Add
                  </button>
                </div>
                <div className=" w-full flex justify-start">
                  <ul className="w-[64%]">
                    {showSpeaker.map((item,index)=>(
                      <li className="flex justify-between  items-center mr-8 px-2 py-2 text-sm bg-green-100 text-green-700 rounded mt-1" key={index}>
                        <div className="flex items-center">
                          <MdOutlineAddBox className="mr-2 text-green-700"/> {item}
                        </div>
                        <button onClick={() => handleDeleteSpeaker(index)} className="ml-2 text-red-700">
                          <MdDeleteForever className="text-red text-lg"/>
                        </button>
                      </li>))
                    }
                  </ul>
                </div>
              </div>
          </div>
          

          <div className="mt-10">
            <h1 className="text-black text-lg font-medium">Event Details</h1>
            <p className="text-sm text-light-gray pb-2">Some fields are required!</p>
          </div>

          <div className="mt-8 flex">
              <p className="mr-2 w-[20%]">Other Details:</p>
              <ReactQuill 
                className="w-full placeholder:not-italic" 
                theme="snow" 
                modules={modules}
                placeholder={"Write your event details here..."}
                value={eventDetails} 
                onChange={setEventDetails}
              />
          </div>

          <div className="mt-16 flex">
              <p className="mr-2 w-[20%]">Organizer's Details:</p>
              <ReactQuill 
                className="w-full placeholder:not-italic" 
                theme="snow" 
                modules={modules}
                placeholder={"Write organizer's details here..."}
                value={organizerDetails} 
                onChange={setOrganizerDetails}
              />
          </div>


          {/* <div className="mt-16">
              <p>Organizer's logo <span className="text-gray text-xs">(optional)</span></p>
              <div className=" relative w-full flex flex-col justify-center items-center p-8 border-[2px] border-dashed border-black bg-[rgba(0,0,0,0.04)] rounded-md">
                <div className=" relative   w-[130px] py-[2px]">
                  <input 
                    className=" z-10 relative opacity-0" 
                    type="file" 
                    name="orgThumbnail"
                    accept=".jpg, .png, .jpeg"
                    onChange={(e)=>setLogoFile(e.target.files)}
                    multiple
                  />
                  <button 
                    className=" absolute left-0 top-0 flex justify-center items-center  text-md text-white rounded-md w-full h-full bg-black " type="button">
                      <MdOutlineFileUpload className="text-xl mr-2"/> 
                      Upload
                  </button>
                  </div>
                    {logoFile && logoFile.length > 0 ? (
                      <div>
                        <p>Selected files:</p>
                        <ul>
                          {Array.from(logoFile).map((file, index) => (
                            <div key={index}>
                              <li >{file.name}</li>
                              <button
                                className="ml-2 text-red-700"
                                type="button"
                                onClick={() => setLogoFile(null)}
                                >
                                <MdDeleteForever className="text-red text-lg" />
                              </button>
                            </div>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
            </div> */}
        </div>

        <div className="w-full flex justify-start mt-20">
          <button type="submit" className=" text-white px-8 bg-black  py-2 rounded-md ml-10 mb-10">Post Event</button>
        </div>

      </form>
    </>
  );
}

export default CreateEventForm;
