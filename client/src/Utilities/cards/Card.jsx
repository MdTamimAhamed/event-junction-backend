import React, { useState } from 'react';
import { baseUrl } from '../base/baseURL';
import { HiDotsVertical } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { AiFillStar, AiFillEye, AiFillHeart } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';
import { HiUserGroup, HiShare } from 'react-icons/hi';
import axios from 'axios';

function Card({ eventData }) {
    const [active, setActive] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const navigate = useNavigate();

    let eventCount = eventData ? eventData.length : 0;

    function handleEdit(updateId) {
        navigate(`/dashboard/event-edit/${updateId}`);
    }

    function handlePreview(previewId) {
        navigate(`/dashboard/preview-event/${previewId}`);
    }

    function handleOption(id) {
        if (active === id) {
            setActive(null);
        } else {
            setActive(id);
            setDeleteId(null);
        }
    }

    async function deleteEvent(id) {
        try {
            const response = await axios.delete(
                `${baseUrl}/admin/get-event?eventId=${id}`
            );
            const { success } = response.data;
            if (success) {
                console.log('Post deleted');
                window.location.reload();
            }
            console.log('Post not found');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div>
                <h1 className="text-md mb-4 mt-20 text-white">
                    My Events({eventCount})
                </h1>
            </div>
            {eventData ? (
                <div className="flex max-w-7xl flex-row flex-wrap gap-6">
                    {eventData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-lightForeground h-auto max-h-[400px] w-[280px] rounded-2xl p-[13px] shadow-md"
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
                            <div className="">
                                <p className="mt-2 line-clamp-2 min-h-[30px] cursor-pointer overflow-hidden text-ellipsis leading-5 text-white/70 hover:underline">
                                    {item.eventTitle}
                                </p>
                            </div>
                            <div className="relative mt-5 flex w-full justify-between pb-2">
                                <button
                                    onClick={() => handlePreview(item._id)}
                                    className="mr-2 w-full rounded bg-white/50 py-1 text-black hover:bg-white/60"
                                >
                                    Preview
                                </button>
                                <button
                                    onClick={() => handleOption(item._id)}
                                    className="flex w-12 items-center justify-center rounded bg-white/20 hover:bg-white/30"
                                >
                                    <HiDotsVertical />
                                </button>

                                <div
                                    className={`${active === item._id ? 'block' : 'hidden'} absolute -top-20 right-0 flex flex-col rounded bg-black px-4 py-2 text-white`}
                                >
                                    <span className="absolute -bottom-1 right-[14px] h-3 w-3 rotate-45 bg-black"></span>
                                    <button
                                        onClick={() => handleEdit(item._id)}
                                        className="text-left hover:text-green-400"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteEvent(item._id)}
                                        className="py-1 hover:text-red"
                                    >
                                        Delete
                                    </button>
                                </div>
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

export default Card;
