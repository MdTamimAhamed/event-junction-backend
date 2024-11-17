import React, { useEffect, useState } from 'react';

function EventTimer({ eventData }) {
    const [eventStartDate, setEventStartDate] = useState('');
    const [remainingTime, setRemainingTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        if (eventData && eventData.dates && eventData.times) {
            // ISO string
            const startDateTime = `${eventData.dates[0]}T${eventData.times[0]}:00`;
            setEventStartDate(startDateTime);
        }
    }, [eventData]);

    useEffect(() => {
        if (eventStartDate) {
            const intervalId = setInterval(() => {
                const startDateTime = new Date(eventStartDate);
                const now = new Date();
                const diff = startDateTime - now;

                if (diff <= 0) {
                    clearInterval(intervalId);
                    setRemainingTime({
                        days: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                    });
                } else {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((diff / (1000 * 60)) % 60);
                    const seconds = Math.floor((diff / 1000) % 60);

                    setRemainingTime({ days, hours, minutes, seconds });
                }
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [eventStartDate]);

    const isLessThan30Minutes =
        remainingTime.days === 0 &&
        remainingTime.hours === 0 &&
        remainingTime.minutes <= 30 &&
        remainingTime.minutes > 0;

    return (
        <div>
            <div className="flex w-full justify-between gap-2 [&>div]:h-[42px] [&>div]:w-12 [&>div]:bg-white [&>div]:shadow-md">
                <div className="relative rounded">
                    <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-lg font-bold text-black">
                        {remainingTime.days}d
                    </span>
                </div>
                <div className="relative rounded">
                    <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-lg font-bold text-black">
                        {remainingTime.hours}h
                    </span>
                </div>
                <div className="relative rounded">
                    <span
                        className={`absolute left-[50%] ${
                            isLessThan30Minutes
                                ? 'text-rose-600'
                                : 'text-neutral-content'
                        } top-[50%] translate-x-[-50%] translate-y-[-50%] text-lg font-bold text-black`}
                    >
                        {remainingTime.minutes}m
                    </span>
                </div>
                <div className="relative rounded">
                    <span
                        className={`absolute left-[50%] ${
                            isLessThan30Minutes
                                ? 'text-rose-600'
                                : 'text-neutral-content'
                        } top-[50%] translate-x-[-50%] translate-y-[-50%] text-lg font-bold text-black`}
                    >
                        {remainingTime.seconds}s
                    </span>
                </div>
            </div>
        </div>
    );
}

export default EventTimer;
