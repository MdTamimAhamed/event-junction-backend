import React, { useState, useEffect } from 'react';
import HeroSection from '../client-components/HeroSection';
import HomeHeader from '../headers/HomeHeader';
import Footer from '../footer/Footer';
import { FaFacebookSquare, FaGithubSquare } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function About() {
    const [userLoggedIn, setUserLoggedIn] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('user-token');
        if (token) {
            const userDetails = jwtDecode(token);
            const userName = userDetails.firstName;
            const userNameFirstLetter = userName.charAt(0);
            setUserLoggedIn(userNameFirstLetter);
        }
    }, []);

    return (
        <>
            <div className="">
                {/* home header*/}
                <HomeHeader user={userLoggedIn} />

                {/* blur background*/}
                <div className="">
                    <HeroSection pageName="About" />

                    <div className="relative mx-auto -mt-44 h-auto max-w-4xl rounded-md bg-background shadow-2xl shadow-black">
                        <div className="h-auto px-20 pb-20 pt-10">
                            <div className="flex flex-wrap justify-center gap-x-14 gap-y-20 [&>div]:h-48 [&>div]:w-48">
                                <div className="group relative">
                                    <img
                                        src="/images/profiles/tamim.jpg"
                                        alt="profile_tamim"
                                        className="overflow-hidden rounded-lg transition-all ease-in group-hover:scale-105"
                                    />
                                    <p className="mt-2 text-center text-xl text-white/70">
                                        Tamim Ahamed
                                    </p>
                                    <div className="absolute bottom-2 left-[50%] hidden translate-x-[-50%] items-center justify-center gap-4 bg-[rgba(0,0,0,0.5)] px-8 py-2 text-xl hover:cursor-pointer group-hover:flex group-hover:text-white">
                                        <a
                                            href="https://www.facebook.com/tamim.ssgt/"
                                            rel="noopener"
                                            target="_blank"
                                        >
                                            <FaFacebookSquare className="hover:text-secondary" />
                                        </a>
                                        <a href="#">
                                            <RiInstagramFill className="hover:text-secondary" />
                                        </a>
                                        <a
                                            href="https://github.com/MdTamimAhamed"
                                            rel="noopener"
                                            target="_blank"
                                        >
                                            <FaGithubSquare className="hover:text-secondary" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mb-32 mt-10 flex max-w-4xl justify-between">
                    <div className="basis-[45%]">
                        <h1 className="text-xl font-bold text-white/70">
                            Our vision
                        </h1>
                        <p className="text-white/50">
                            At DIU Event Junction, we believe in the power of
                            connection and celebration. Our vision is to
                            simplify event management, empowering individuals
                            and organizations to create unforgettable
                            experiences effortlessly.
                        </p>
                    </div>

                    <div className="basis-[45%]">
                        <h1 className="text-xl font-bold text-white/70">
                            Join Us on this Journey!
                        </h1>
                        <p className="text-white/50">
                            We invite you to embark on this exciting journey
                            with us. Whether you're planning a small gathering
                            or a large-scale event, DIU Event Junction is here
                            to make the process enjoyable and stress-free. Thank
                            you for being a part of the DIU Event Junction
                            community!
                        </p>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default About;
