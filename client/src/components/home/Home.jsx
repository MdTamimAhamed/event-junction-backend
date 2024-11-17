import React from 'react';
import Footer from '../footer/Footer';
import HomeHeader from '../headers/HomeHeader';
import HomeHeroSection from '../client-components/HomeHeroSection';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Utilities/base/baseURL';
import { useState } from 'react';
import ClientCard from '../../Utilities/cards/ClientCard';
import Loading from '../reuseables/Loading';

function Home() {
    const [fetchedData, setFetchedData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${baseUrl}/admin/get-event`);
                setFetchedData(response.data);
            } catch {
                console.error('Error fetching data!');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    return (
        <>
            <div>
                <HomeHeader />
                {loading ? (
                    <div className="mt-20 flex justify-center">
                        <Loading type="spin" size="sm" />
                    </div>
                ) : (
                    <>
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
                            <p className="text-white/70">Nothing to show</p>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Home;
