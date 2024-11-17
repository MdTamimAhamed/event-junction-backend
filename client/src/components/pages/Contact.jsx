import React, { useState, useEffect } from 'react';
import HeroSection from '../client-components/HeroSection';
import HomeHeader from '../headers/HomeHeader';
import Footer from '../footer/Footer';
import jwtDecode from 'jwt-decode';

function Contact() {
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
                    <HeroSection pageName="Contact Us" />

                    <div className="relative mx-auto -mt-44 mb-20 h-auto max-w-4xl rounded-md bg-white pb-20">
                        <h1 className="pt-20 text-center text-3xl font-bold">
                            Welcome to{' '}
                            <span className="text-3xl font-bold text-black">
                                DIU{' '}
                                <span className="font-bold text-secondary">
                                    EMS
                                </span>
                            </span>
                        </h1>

                        <p className="relative mx-auto mt-2 w-[580px] text-center">
                            The dynamic epicenter of cultural convergence at
                            Daffodil International University. Immerse yourself
                            in a vibrant tapestry of diverse events that
                            transcend boundaries and celebrate the global
                            spirit.
                        </p>

                        <div className="relative mx-auto mt-8 w-[580px] rounded bg-[rgba(0,0,0,0.05)] px-1 py-2">
                            <input
                                type="text"
                                placeholder="Enter Email"
                                className="bg-transparent py-1 pl-8 outline-none"
                            />
                            <button className="absolute right-1 top-[50%] translate-y-[-50%] rounded bg-secondary px-4 py-2 text-white">
                                Subscribe
                            </button>
                        </div>

                        <div className="mx-auto flex w-[580px] items-center justify-between">
                            <div className="mt-8 rounded bg-[rgba(0,0,0,0.05)] px-10 py-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="bg-transparent py-1 text-left outline-none"
                                />
                            </div>
                            <div className="mt-8 rounded bg-[rgba(0,0,0,0.05)] px-10 py-2">
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    className="bg-transparent py-1 text-left outline-none"
                                />
                            </div>
                        </div>
                        <div className="relative mx-auto mt-8 w-[580px] rounded bg-[rgba(0,0,0,0.05)] px-2 py-2 pl-10">
                            <textarea
                                name="text"
                                placeholder="Enter any message"
                                cols="30"
                                rows="6"
                                className="w-full bg-transparent py-2 text-left outline-none"
                            ></textarea>
                        </div>
                        <div className="mx-auto mt-8 w-[580px]">
                            <button className="w-full rounded bg-secondary px-4 py-4 text-white">
                                Subscribe
                            </button>{' '}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Contact;
