import React from 'react';
import Footer from '../footer/Footer';
import HomeHeader from '../headers/HomeHeader';
import HomeHeroSection from '../client-components/HomeHeroSection';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Utilities/base/baseURL';
import { useState } from 'react';
import ClientCard from '../../Utilities/cards/ClientCard';
import jwtDecode from 'jwt-decode';

function HomeLayout() {
    const [fetchedData, setFetchedData] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userToken, setUserToken] = useState(null);

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
    }, []);

    return (
        <>
            <div>
                <HomeHeader user={userLoggedIn} />

                {fetchedData && fetchedData.length > 0 ? (
                    <>
                        <HomeHeroSection
                            key={fetchedData[0]._id}
                            title={fetchedData[0].eventTitle}
                            thumbnail={fetchedData[0].eventThumbnail}
                            type={fetchedData[0].eventType}
                            dates={fetchedData[0].dates}
                            times={fetchedData[0].times}
                            venue={fetchedData[0].venue}
                        />
                    </>
                ) : (
                    <p>Nothing to show</p>
                )}

                <div className="container mx-auto px-24 py-24">
                    <p className="mb-4 text-lg text-white/80">
                        Upcoming More Events
                    </p>
                    <ClientCard
                        eventData={fetchedData}
                        altTitle={true}
                        isLoggedIn={isLoggedIn}
                        userToken={userToken}
                    />
                </div>
            </div>

            <Footer />
        </>
    );
}

export default HomeLayout;
