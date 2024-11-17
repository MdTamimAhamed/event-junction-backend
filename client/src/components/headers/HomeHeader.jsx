import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { toast } from 'react-hot-toast';

function HomeHeader({ user, isHome }) {
    const [bgClass, setBgClass] = useState('');
    const [active, setActive] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setBgClass('bg-white');
            } else {
                setBgClass('');
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function handleSetting() {
        if (!active) {
            setActive(true);
        } else {
            setActive(false);
        }
    }

    function removeToken(name) {
        if (name === 'logout') {
            localStorage.removeItem('user-token');
            toast.success('You logged out!');
            setTimeout(() => {
                window.location.href = '/home';
            }, 1000);
        }
    }

    return (
        <>
            <nav
                className={`fixed z-[9999] w-full py-3 ${
                    bgClass ? 'bg-white/70 shadow-md backdrop-blur-3xl' : ''
                } transition-all duration-200 ease-out`}
            >
                <div className="container mx-auto flex flex-wrap justify-between px-24">
                    <div
                        className={`${
                            bgClass ? 'text-black' : 'text-white'
                        } text-lg font-bold`}
                    >
                        DIU{' '}
                        <span className="font-bold text-secondary">EMS</span>
                    </div>
                    <div className="flex flex-wrap">
                        <ul
                            className={`flex flex-wrap items-center gap-x-12 ${
                                bgClass ? 'text-black' : 'text-white'
                            } `}
                        >
                            <li>
                                <Link to="/">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/events">
                                    <span>Events</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/about">
                                    <span>About</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact">
                                    <span>Contact</span>
                                </Link>
                            </li>
                            <FiSearch className="ml-10 mr-24" />
                        </ul>
                        {user ? (
                            <div
                                onClick={handleSetting}
                                className="relative cursor-pointer"
                            >
                                <div className="flex">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-white">
                                        {user}
                                    </div>
                                    <IoMdArrowDropdown
                                        className={`${
                                            bgClass
                                                ? 'text-black'
                                                : 'text-white'
                                        } text-md`}
                                    />
                                </div>
                                <div
                                    className={`${
                                        active ? 'block' : 'hidden'
                                    } absolute right-0 top-10 rounded-md bg-white px-4 py-4 shadow-xl`}
                                >
                                    <span className="absolute -top-1 right-6 h-3 w-3 rotate-45 bg-white"></span>
                                    <button>Settings</button>
                                    <button
                                        onClick={() => removeToken('logout')}
                                        className="text-red hover:font-medium"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="rounded bg-secondary px-4 py-1 text-white">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default HomeHeader;
