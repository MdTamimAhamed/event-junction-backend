import React, { useState, useEffect } from 'react';
import { baseUrl } from '../base/baseURL';
import { HiDotsVertical } from 'react-icons/hi';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillStar, AiFillEye, AiFillHeart } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';
import { HiUserGroup, HiShare } from 'react-icons/hi';
import axios from 'axios';

function ClientCard({ isLoggedIn, isAllEvents }) {
    const [eventData, setEventData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/admin/get-event`);
                setEventData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchEventData();
    }, []);

    function handlePreview(previewId) {
        if (isLoggedIn) {
            navigate(`/show-event/${previewId}`);
        } else {
            navigate(`/login`);
        }
    }

    return (
        <>
            {eventData ? (
                <div className="flex max-w-7xl flex-row flex-wrap gap-6">
                    {eventData
                        .slice(isAllEvents ? 0 : 1, eventData.length)
                        .map((item, index) => (
                            <div
                                key={index}
                                className="h-auto max-h-[450px] w-[280px] rounded-lg bg-lightForeground p-[13px] shadow-md"
                            >
                                <div className="h-[200px] overflow-hidden">
                                    <img
                                        className="h-full w-full rounded object-cover transition-all duration-200 ease-linear hover:scale-110"
                                        src={item.eventThumbnail}
                                        alt="event thumbnail"
                                    />
                                </div>
                                <p className="mt-4 text-xs font-bold text-secondary">
                                    {item.dates[0]}
                                </p>
                                <div>
                                    <p className="mt-2 line-clamp-2 min-h-[30px] cursor-pointer overflow-hidden text-ellipsis leading-5 text-white/70 hover:underline">
                                        {item.eventTitle}
                                    </p>
                                </div>
                                <div className="relative mt-5 flex w-full justify-between pb-2">
                                    <button
                                        onClick={() => handlePreview(item._id)}
                                        className="mr-2 w-full rounded bg-secondary py-2 text-sm text-white hover:bg-secondaryHover"
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
