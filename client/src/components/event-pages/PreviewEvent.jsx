import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../Utilities/base/baseURL';
import { useParams } from 'react-router-dom';
import { GoDotFill } from 'react-icons/go';
import { MdDateRange, MdOutlineAccessTime, MdCheckBox } from 'react-icons/md';
import { BsFillPinMapFill } from 'react-icons/bs';
import EventTimer from '../timer/EventTimer.jsx';

function PreviewEvent() {
    const { id } = useParams();
    const [previewEventData, setPreviewEventData] = useState(null);
    console.log('date', previewEventData);

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const fatchPreviewData = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/admin/get-event?eventId=${id}`
                );
                setPreviewEventData(response.data);
            } catch (error) {}
        };
        fatchPreviewData();
    }, [id]);

    //date calculation
    let startDate = '';
    let endDate = '';
    let day = '';
    let day2 = '';
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (previewEventData && previewEventData.dates) {
        const dateObj1 = new Date(previewEventData.dates[0]);
        const dateObj2 = new Date(previewEventData.dates[1]);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };

        day = daysOfWeek[dateObj1.getDay()];
        startDate = dateObj1.toLocaleDateString('en-US', options);

        day2 = daysOfWeek[dateObj2.getDay()];
        endDate = dateObj2.toLocaleDateString('en-US', options);
    }

    //time calculation
    let startTime12Hour = '';
    let endTime12Hour = '';
    if (previewEventData && previewEventData.times) {
        function convertTo12HourFormatWithSeconds(time24) {
            const [hours, minutes] = time24.split(':');
            const date = new Date(2023, 1, 1, hours, minutes);

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

    return (
        <>
            {previewEventData ? (
                <div className="flex h-[320px] justify-evenly">
                    <div className="mt-20 h-[150vh] max-w-4xl">
                        <img
                            className="rounded-lg shadow-md"
                            src={previewEventData.eventThumbnail}
                            alt="event thumbnail"
                        />

                        <div className="mt-16 flex">
                            <p className="text-red">Up comming event</p>
                            <p className="ml-4 rounded-full border-[1px] border-white/50 px-6 text-white/70">
                                {previewEventData.eventType}
                            </p>
                        </div>

                        <div className="flex justify-between text-white/70">
                            {/*Left column */}
                            <div className="mt-2 w-[65%]">
                                <div className="border-l-4 border-secondary">
                                    <h1 className="ml-2 text-2xl font-extrabold leading-7 text-white/70">
                                        {previewEventData.eventTitle}
                                    </h1>
                                </div>
                                <div className="mt-10">
                                    <p className="font-medium">
                                        Keynote speaker/guest
                                    </p>
                                    {previewEventData.speaker.map(
                                        (item, index) => (
                                            <p
                                                key={index}
                                                className="flex list-disc items-center font-lato text-white/60"
                                            >
                                                <GoDotFill className="mr-2 text-sm text-secondary" />
                                                {item}
                                            </p>
                                        )
                                    )}
                                </div>

                                <div className="mt-10">
                                    <p className="font-bold">Other Details:</p>
                                    {previewEventData.eventDetails ? (
                                        <div
                                            className="mt-2 text-white/60"
                                            dangerouslySetInnerHTML={{
                                                __html: previewEventData.eventDetails,
                                            }}
                                        />
                                    ) : (
                                        <p className="mt-2">
                                            No event details!
                                        </p>
                                    )}
                                </div>

                                <div className="mt-10">
                                    <p className="font-bold">
                                        Organizer's Details:
                                    </p>
                                    {previewEventData.organizer ? (
                                        <div
                                            className="mt-2 text-white/60"
                                            dangerouslySetInnerHTML={{
                                                __html: previewEventData.organizer,
                                            }}
                                        />
                                    ) : (
                                        <p className="mt-2">
                                            No organizer details!
                                        </p>
                                    )}
                                </div>

                                <div></div>
                            </div>

                            {/*Right column */}
                            <div className="w-[31%]">
                                <p className="mb-[3px] font-medium">
                                    Event starts in:
                                </p>
                                <EventTimer eventData={previewEventData} />

                                <div className="border-l-[1px] border-white/15">
                                    <div className="pl-6">
                                        <p className="mb-2 mt-10 font-medium">
                                            {' '}
                                            Program Schedule
                                        </p>
                                        <div className="flex text-sm">
                                            <MdDateRange className="mr-2 text-lg text-secondary" />
                                            <span className="flex font-medium">
                                                Date:
                                                <span className="pl-2">
                                                    <p className="font-normal">
                                                        <span
                                                            className={`font-medium text-red`}
                                                        >
                                                            Start:
                                                        </span>{' '}
                                                        {day} {startDate}
                                                    </p>
                                                    <p className="font-normal">
                                                        <span className="font-medium text-red">
                                                            End:
                                                        </span>{' '}
                                                        {day2} {endDate}
                                                    </p>
                                                </span>
                                            </span>
                                        </div>

                                        <div className="mt-[6px] flex">
                                            <MdOutlineAccessTime className="mr-2 text-lg text-secondary" />
                                            <span className="flex text-sm font-medium">
                                                Time:
                                                <p className="ml-2 font-normal">
                                                    {startTime12Hour} -{' '}
                                                    {endTime12Hour}
                                                </p>
                                            </span>
                                        </div>

                                        <div className="mt-[6px] flex">
                                            <BsFillPinMapFill className="mr-2 text-3xl text-secondary" />
                                            <p className="justify-between text-sm font-medium">
                                                Venue:
                                                <span className="ml-2 font-normal">
                                                    {previewEventData.venue}
                                                </span>
                                            </p>
                                        </div>

                                        <div className="mt-10">
                                            <p className="font-medium">
                                                Swag Items
                                            </p>
                                            {previewEventData.swagItems.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start"
                                                    >
                                                        <MdCheckBox className="mr-2 w-[10%] text-lg text-secondary" />
                                                        <p
                                                            key={index}
                                                            className="flex items-start"
                                                        >
                                                            {' '}
                                                            {item}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Event not found!</p>
            )}
        </>
    );
}

export default PreviewEvent;
