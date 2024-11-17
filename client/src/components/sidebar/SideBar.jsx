import React, { useState } from 'react';
import { BiSolidDashboard, BiLogOut } from 'react-icons/bi';
import {
    MdAccountCircle,
    MdEvent,
    MdFavorite,
    MdGroups2,
    MdImage,
    MdSettings,
} from 'react-icons/md';

import { FaSearch } from 'react-icons/fa';

import { useNavigate, useLocation, Link } from 'react-router-dom';

function SideBar() {
    const navTitles = [
        {
            id: 1,
            title: 'Dashboard',
            path: '',
            icon: <BiSolidDashboard />,
        },
        {
            id: 2,
            title: 'Profile',
            path: 'admin-profile',
            icon: <MdAccountCircle />,
        },
        { id: 3, title: 'Event', path: '#', icon: <MdEvent /> },
        { id: 4, title: 'Favorite', path: '#', icon: <MdFavorite /> },
        { id: 5, title: 'Clubs', path: '#', icon: <MdGroups2 /> },
        { id: 6, title: 'Gallery', path: '#', icon: <MdImage /> },
        { id: 7, title: 'Settings', path: '#', icon: <MdSettings /> },
        { id: 8, title: 'Logout', path: 'logout', icon: <BiLogOut /> },
    ];
    const [active, setActive] = useState(0);
    const handleActiveBtn = (index) => {
        setActive(index);
    };

    return (
        <div className="bg-foreground h-[95vh] w-[250px] pt-5 shadow-[0px_3px_5px_rgba(0,0,0,0.7)]">
            <ul>
                {navTitles.map((item, index) => (
                    <li key={item.id} className="px-4 py-2 text-white/70">
                        <Link
                            to={item.path}
                            className={`flex items-center rounded py-2 pl-7 hover:bg-[rgba(0,0,0,0.3)] hover:text-white ${item.id === 8 ? 'text-red hover:bg-red hover:text-white' : ''} ${active === index ? 'bg-secondary text-white' : ''} ${active === 7 && item.id === 8 ? 'bg-red text-white' : ''}`}
                            onClick={() => handleActiveBtn(index)}
                        >
                            {item.icon}
                            <span className="cursor-pointer pl-1">
                                {item.title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideBar;
