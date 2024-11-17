import React from 'react';
import { baseUrl } from '../../Utilities/base/baseURL';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InputHandlerSm from '../formInputHandler/InputHandlerSm';
import { MdKeyboardBackspace } from 'react-icons/md';
import {
    MdAddBox,
    MdDeleteForever,
    MdOutlineAddBox,
    MdOutlineFileUpload,
} from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import Loading from '../reuseables/Loading.jsx';
import { toast } from 'react-hot-toast';

function EventEdit() {
    const { id } = useParams();
    console.log(id);
    const [updateEventData, setUpdateEventData] = useState(null);

    useEffect(() => {
        const fatchToUpdateData = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/admin/get-event?eventId=${id}`
                );
                setUpdateEventData(response.data);
            } catch (error) {}
        };
        fatchToUpdateData();
    }, [id]);

    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [eventType, setEventType] = useState('');
    const [swag, setSwag] = useState('');
    const [showSwagItem, setShowSwagItem] = useState([]);

    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');

    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [venue, setVenue] = useState('');

    const [speaker, setSpeaker] = useState('');
    const [showSpeaker, setShowSpeaker] = useState([]);

    const [eventDetails, setEventDetails] = useState('');
    const [organizerDetails, setOrganizerDetails] = useState('');

    const [loading, setLoading] = useState(false);

    const dates = [eventStartDate, eventEndDate];
    const times = [eventStartTime, eventEndTime];

    async function handleUpload(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('eventTitle', title);
        if (file) {
            formData.append('eventThumbnail', file);
        }
        formData.append('eventType', eventType);
        formData.append('swagItems', showSwagItem);
        formData.append('eventDates', dates);
        formData.append('eventTimes', times);
        formData.append('venue', venue);
        formData.append('speaker', showSpeaker);
        formData.append('eventDetails', eventDetails);
        formData.append('organizerDetails', organizerDetails);

        try {
            setLoading(true);
            const response = await axios.patch(
                `${baseUrl}/admin/update-event/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        accept: 'application/x-www-form-urlencoded',
                    },
                }
            );
            if (response.status === 200) {
                const { message } = response.data;
                toast.success(message);
            } else {
                toast.error('Something went wrong!');
            }
        } catch (error) {
            console.error('There is an error!');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (updateEventData) {
            setTitle(updateEventData.eventTitle);
            setEventType(updateEventData.eventType);
            setShowSwagItem([...updateEventData.swagItems, swag]);
            setEventStartDate(updateEventData.dates[0]); // Set default start date
            setEventEndDate(updateEventData.dates[1]); // Set default end date
            setEventStartTime(updateEventData.times[0]); // Set default start time
            setEventEndTime(updateEventData.times[1]); // Set default end time
            setShowSpeaker([...updateEventData.speaker, speaker]);
            setEventDetails(updateEventData.eventDetails);
            setOrganizerDetails(updateEventData.organizer);
        }
    }, [updateEventData]);

    function handleRoute() {
        window.location.href = '/dashboard';
    }

    function handleAddItem() {
        if (swag) {
            setShowSwagItem([...showSwagItem, swag]);
        }
        setSwag('');
    }

    function handleDeleteSwagItem(index) {
        const updatedSwagItems = showSwagItem.filter((_, i) => i !== index);
        setShowSwagItem(updatedSwagItems);
    }

    function handleAddSpeaker() {
        if (speaker) {
            setShowSpeaker([...showSpeaker, speaker]);
        }
        setSpeaker('');
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
            {updateEventData ? (
                <>
                    <form
                        onSubmit={handleUpload}
                        encType="multipart/form-data"
                        className="mb-20 mt-5 max-w-[900px] bg-lightForeground px-8 py-8 text-white/70 shadow-md"
                    >
                        <div className="flex items-start gap-6">
                            <button onClick={handleRoute}>
                                <MdKeyboardBackspace className="text-[1.4em]" />
                            </button>
                            <div className="">
                                <div className="text-xl font-medium text-red">
                                    Edit Event
                                </div>
                                <p className="text-sm text-white/30">
                                    Update event here...
                                </p>
                            </div>
                        </div>

                        <div className="px-[46px]">
                            <div className="mt-8">
                                <p className="">
                                    Event Title{' '}
                                    <span className="text-sm text-red">*</span>
                                </p>
                                <input
                                    className="border-black-500 mt-1 min-w-full rounded-md border-[1px] bg-[rgba(0,0,0,0.04)] px-3 py-3 outline-1 outline-light-gray placeholder:text-lg"
                                    type="text"
                                    placeholder="Enter your event title here..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="mt-8">
                                <p>
                                    Event Thumbnail{' '}
                                    <span className="text-sm text-red">*</span>
                                </p>
                                <div className="relative flex w-full flex-col items-center justify-center rounded-md border-[2px] border-dashed bg-[rgba(0,0,0,0.04)] p-8">
                                    <div className="relative w-[130px] py-[2px]">
                                        <input
                                            className="relative z-10 cursor-pointer opacity-0"
                                            type="file"
                                            accept=".jpg, .png, .jpeg"
                                            onChange={(e) =>
                                                setFile(e.target.files[0])
                                            }
                                        />
                                        <button
                                            className="text-md absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-md bg-secondary text-white"
                                            type="button"
                                        >
                                            <MdOutlineFileUpload className="mr-2 text-xl" />{' '}
                                            Upload
                                        </button>
                                    </div>
                                    {file && file.name ? (
                                        <div className="flex items-center">
                                            <p>{file.name}</p>
                                            <button
                                                className="text-red-700 ml-2"
                                                type="button"
                                                onClick={() => setFile(null)}
                                            >
                                                <MdDeleteForever className="text-lg text-red" />
                                            </button>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>

                            <div className="mt-10 flex justify-between">
                                <div className="flex items-center">
                                    <p>
                                        Event Type:{' '}
                                        <span className="mr-4 text-red">*</span>
                                    </p>
                                    <select
                                        value={eventType}
                                        onChange={(e) =>
                                            setEventType(e.target.value)
                                        }
                                        className="rounded-md bg-background px-6 py-1 text-white"
                                        name="type"
                                        id="type"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Conference">
                                            Conference
                                        </option>
                                        <option value="Seminer">Seminer</option>
                                        <option value="Concert">Concert</option>
                                        <option value="Reception">
                                            Reception
                                        </option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="flex items-center">
                                    <p className="mr-2">Swag Items:</p>
                                    <div className="flex items-center justify-between">
                                        <InputHandlerSm
                                            type="text"
                                            placeholder="Enter Item"
                                            state={swag}
                                            setState={setSwag}
                                        />
                                        <MdAddBox
                                            onClick={handleAddItem}
                                            className="cursor-pointer text-4xl text-secondary"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full justify-end">
                                <ul className="w-[240px]">
                                    {showSwagItem.map((item, index) => (
                                        <li
                                            className="group mr-8 mt-1 flex items-center justify-between rounded bg-green-100 px-2 py-1 text-sm text-green-700"
                                            key={index}
                                        >
                                            <div className="flex items-center">
                                                <MdOutlineAddBox className="mr-2 text-green-700" />{' '}
                                                {item}
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleDeleteSwagItem(index)
                                                }
                                                className="text-red-700 ml-2"
                                            >
                                                <MdDeleteForever className="text-lg text-red" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-10">
                                <h1 className="text-lg font-medium text-white/70">
                                    Event Schedule
                                </h1>
                                <p className="pb-2 text-sm text-white/30">
                                    All the fields are required!
                                </p>
                            </div>

                            {/**Event Schedule section */}
                            <div className="rounded-md bg-[rgba(0,0,0,0.04)] p-6">
                                <div className="mt-5 flex w-full flex-wrap justify-between">
                                    <div className="flex justify-between pr-10">
                                        <p>
                                            Date{' '}
                                            <span className="text-red">*</span>
                                        </p>
                                        <div className="ml-10">
                                            <p className="mt-2 text-sm">
                                                Start Date:
                                            </p>
                                            <input
                                                className="w-[200px] rounded-md bg-background px-2 py-1"
                                                type="date"
                                                placeholder="Start date"
                                                value={eventStartDate}
                                                onChange={(e) => {
                                                    console.log(
                                                        'up:',
                                                        e.target.value
                                                    );
                                                    setEventStartDate(
                                                        e.target.value
                                                    );
                                                }}
                                                style={{ colorScheme: 'dark' }}
                                            />

                                            <p className="mt-2 text-sm">
                                                End Date:
                                            </p>
                                            <input
                                                className="w-[200px] rounded-md bg-background px-2 py-1"
                                                type="date"
                                                placeholder="End date"
                                                value={eventEndDate}
                                                onChange={(e) =>
                                                    setEventEndDate(
                                                        e.target.value
                                                    )
                                                }
                                                style={{ colorScheme: 'dark' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <p>
                                            Time
                                            <span className="text-red">*</span>
                                        </p>
                                        <div className="ml-10">
                                            <p className="mt-2 text-sm">
                                                Start Time:
                                            </p>
                                            <input
                                                className="w-[200px] rounded-md bg-background px-2 py-1"
                                                type="time"
                                                placeholder="Start date"
                                                value={eventStartTime}
                                                onChange={(e) =>
                                                    setEventStartTime(
                                                        e.target.value
                                                    )
                                                }
                                                style={{ colorScheme: 'dark' }}
                                            />

                                            <p className="mt-2 text-sm">
                                                End Time:
                                            </p>
                                            <input
                                                className="w-[200px] rounded-md bg-background px-2 py-1"
                                                type="time"
                                                placeholder="End date"
                                                value={eventEndTime}
                                                onChange={(e) =>
                                                    setEventEndTime(
                                                        e.target.value
                                                    )
                                                }
                                                style={{ colorScheme: 'dark' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 flex items-center">
                                    <p>
                                        Venue:{' '}
                                        <span className="mr-4 text-red">*</span>
                                    </p>
                                    <select
                                        value={venue}
                                        onChange={(e) =>
                                            setVenue(e.target.value)
                                        }
                                        className="max-w-[400px] rounded-md bg-background px-4 py-1 text-white"
                                    >
                                        <option value="">Select Venue</option>
                                        <option value="International Conference Hall, Daffodil International University (ICH)">
                                            International Conference Hall,
                                            Daffodil International University
                                            (ICH)
                                        </option>
                                        <option value="Conference Hall, Daffodil International University">
                                            Conference Hall, Daffodil
                                            International University
                                        </option>
                                        <option value="DIU Auditorium">
                                            DIU Auditorium
                                        </option>
                                    </select>
                                </div>
                            </div>
                            {/** */}

                            <div className="mt-10 flex w-full justify-start">
                                <p className="mr-2">
                                    Keynote speaker/ Guest{' '}
                                    <span className="text-red">*</span>
                                </p>
                                <div className="w-full">
                                    <div className="flex items-center justify-start">
                                        <input
                                            className="w-[60%] rounded-md bg-background px-4 py-1 outline-light-gray"
                                            type="text"
                                            value={speaker}
                                            onChange={(e) =>
                                                setSpeaker(e.target.value)
                                            }
                                            placeholder="Enter speaker/guest name"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddSpeaker}
                                            className="ml-2 flex flex-nowrap items-center rounded-md bg-secondary px-2 py-[5px] text-white"
                                        >
                                            + Add
                                        </button>
                                    </div>
                                    <div className="flex w-full justify-start">
                                        <ul className="w-[64%]">
                                            {showSpeaker.map((item, index) => (
                                                <li
                                                    className="mr-8 mt-1 flex items-center justify-between rounded bg-green-100 px-2 py-2 text-sm text-green-700"
                                                    key={index}
                                                >
                                                    <div className="flex items-center">
                                                        <MdOutlineAddBox className="mr-2 text-green-700" />{' '}
                                                        {item}
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteSpeaker(
                                                                index
                                                            )
                                                        }
                                                        className="text-red-700 ml-2"
                                                    >
                                                        <MdDeleteForever className="text-lg text-red" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h1 className="text-lg font-medium text-white/70">
                                    Event Details
                                </h1>
                                <p className="pb-2 text-sm text-white/30">
                                    Some fields are required!
                                </p>
                            </div>

                            <div className="mt-8 flex">
                                <p className="mr-2 w-[20%]">Other Details:</p>
                                <ReactQuill
                                    className="w-full placeholder:not-italic"
                                    theme="snow"
                                    modules={modules}
                                    placeholder={
                                        'Write your event details here...'
                                    }
                                    value={eventDetails}
                                    onChange={setEventDetails}
                                />
                            </div>

                            <div className="mt-16 flex">
                                <p className="mr-2 w-[20%]">
                                    Organizer's Details:
                                </p>
                                <ReactQuill
                                    className="w-full placeholder:not-italic"
                                    theme="snow"
                                    modules={modules}
                                    placeholder={
                                        "Write organizer's details here..."
                                    }
                                    value={organizerDetails}
                                    onChange={setOrganizerDetails}
                                />
                            </div>
                        </div>

                        <div className="mt-20 flex w-full justify-end px-8">
                            <button
                                type="submit"
                                className="mb-10 ml-10 flex gap-2 rounded-md bg-secondary px-8 py-2 text-white"
                            >
                                <span>
                                    {loading ? 'Updating...' : 'Update Event'}
                                </span>
                                {loading ? (
                                    <Loading type="spin" size="xs" />
                                ) : null}
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <p>Nothing to show</p>
            )}
        </>
    );
}

export default EventEdit;
