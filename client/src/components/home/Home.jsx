import React from 'react';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import HomeHeader from '../headers/HomeHeader';
import HomeHeroSection from '../client-components/HomeHeroSection';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Utilities/base/baseURL';
import { useState } from 'react';
import ClientCard from '../../Utilities/cards/ClientCard';
import jwtDecode from 'jwt-decode';

function Home() {
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/admin/get-event`);
                setFetchedData(response.data);
            } catch {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllData();
    }, []);

    return (
        <>
            <div>
                <HomeHeader />
                {fetchedData && fetchedData.length > 0 ? (
                    <>
                        <HomeHeroSection
                            key={0}
                            title={fetchedData[0].eventTitle}
                            thumbnail={fetchedData[0].eventThumbnail}
                            type={fetchedData[0].eventType}
                            dates={fetchedData[0].dates}
                            times={fetchedData[0].times}
                            venue={fetchedData[0].venue}
                        />

                        <div className="container mx-auto px-24 py-24">
                            <p className="mb-4 text-lg text-white/80">
                                Upcoming More Events
                            </p>
                            <ClientCard
                                eventData={fetchedData}
                                altTitle={true}
                            />
                        </div>
                    </>
                ) : (
                    <p>Nothing to show</p>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Home;
