import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import EventTimer from '../timer/EventTimer.jsx';
import { baseUrl } from '../../Utilities/base/baseURL.js';

function HomeHeroSection() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [eventData, setEventData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/admin/get-event`);
                const filteredAndSortedEvents = response.data
                    .filter((event) => new Date(event.dates[0]) >= new Date())
                    .sort(
                        (a, b) => new Date(a.dates[0]) - new Date(b.dates[0])
                    );
                setEventData(filteredAndSortedEvents);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEventData();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('user-token');
        setIsLoggedIn(!!token);
    }, []);

    const handlePreview = (previewId) => {
        navigate(isLoggedIn ? `/show-event/${previewId}` : `/login`);
    };

    return (
        <div className="h-[80vh] bg-gradient-to-tr from-violet-950 via-blue-950 to-secondary">
            <div className="flex h-full w-full justify-center backdrop-blur-[120px]">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={false}
                    speed={600}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) =>
                            `<span class="${className} inline-block w-2 h-2 bg-white relative -top-10 rounded-full mx-1"></span>`,
                    }}
                    className="swiper relative"
                >
                    {eventData.slice(0, 3).map((event, index) => {
                        const startDateObj = new Date(event.dates[0]);
                        const formattedDate = startDateObj.toLocaleDateString(
                            'en-US',
                            {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            }
                        );
                        const formattedTime = new Date(
                            `1970-01-01T${event.times[0]}:00`
                        ).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        });

                        return (
                            <SwiperSlide key={index}>
                                <div className="flex h-full items-center justify-center">
                                    <div className="container flex items-center justify-between px-28">
                                        <div className="basis-[50%]">
                                            <div className="flex">
                                                <p className="relative mr-4 font-medium text-secondary">
                                                    <span className="absolute top-[5px]">
                                                        <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-secondary opacity-75"></span>
                                                        <span className="absolute inline-flex h-3 w-3 rounded-full bg-secondary"></span>
                                                    </span>
                                                    <span className={'ml-5'}>
                                                        Upcoming event
                                                    </span>
                                                </p>
                                                <p className="rounded-full border-1 border-white/60 px-4 py-1 text-start text-sm font-light text-white">
                                                    {event.eventType}
                                                </p>
                                            </div>
                                            <div className="mt-4">
                                                <h1 className="text-4xl font-bold leading-tight text-white">
                                                    {event.eventTitle}
                                                </h1>
                                            </div>
                                            <div className="my-8 max-w-[550px] border-l-[6px] border-secondary bg-gradient-to-r from-[rgba(255,255,255,0.3)] to-[rgba(0,0,0,0)] p-4 text-white">
                                                <div className="flex text-sm">
                                                    <span className="flex font-bold">
                                                        Date:{' '}
                                                        <p className="ml-4 font-light">
                                                            {formattedDate}
                                                        </p>
                                                    </span>
                                                    <span className="mx-4 w-[2px] bg-secondary"></span>
                                                    <span className="flex font-bold">
                                                        Time:{' '}
                                                        <p className="ml-4 font-light">
                                                            {formattedTime}
                                                        </p>
                                                    </span>
                                                </div>
                                                <span className="mt-2 flex text-sm font-bold">
                                                    Venue:{' '}
                                                    <p className="ml-4 font-light">
                                                        {event.venue}
                                                    </p>
                                                </span>
                                            </div>
                                            <div className="flex items-end gap-8">
                                                <button
                                                    onClick={() =>
                                                        handlePreview(event._id)
                                                    }
                                                    className="rounded bg-white px-6 py-2 font-medium text-black"
                                                >
                                                    Event Details
                                                </button>
                                                <div>
                                                    <p className="mb-2 ml-8 mt-4 basis-10 text-center text-white">
                                                        Event starts in:
                                                    </p>
                                                    <EventTimer
                                                        eventData={event}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative max-w-xl">
                                            <img
                                                className="relative z-0 aspect-square h-[375px] w-[992px] rounded-3xl object-cover"
                                                src={event.eventThumbnail}
                                                alt={event.eventTitle}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}

export default HomeHeroSection;
