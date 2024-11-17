import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Utilities/base/baseURL.js';
import ClientCard from '../../Utilities/cards/ClientCard.jsx';
import HomeHeader from '../headers/HomeHeader.jsx';
import jwtDecode from 'jwt-decode';
import HeroSection from '../client-components/HeroSection.jsx';

const Events = () => {
    const [fetchedData, setFetchedData] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/admin/get-event`);
                setFetchedData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllData();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('user-token');

        if (token) {
            const userDetails = jwtDecode(token);
            const userName = userDetails.firstName;
            const userNameFirstLetter = userName.charAt(0);
            setUserLoggedIn(userNameFirstLetter);
            setIsLoggedIn(true);
        }
    }, [fetchedData]);

    return (
        <>
            <HomeHeader user={userLoggedIn} isHome={true} />
            <HeroSection pageName={'Events'} isLoggedIn={isLoggedIn} />
            <div className="container relative mx-auto px-24 py-4">
                <p className="mb-4 text-lg font-bold text-white/70">
                    All events
                </p>
                <ClientCard
                    eventData={fetchedData}
                    isLoggedIn={isLoggedIn}
                    isAllEvents={true}
                />
            </div>
        </>
    );
};

export default Events;
