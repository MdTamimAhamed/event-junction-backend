import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { MdAddCircle } from 'react-icons/md';
import jwtDecode from 'jwt-decode';

function AdminProfile() {
    const token = localStorage.getItem('admin-token');
    const userDetails = jwtDecode(token);
    const userName = userDetails.firstName;
    const userNameFirstLetter = userName.charAt(0);

    const [active, setActive] = useState(false);

    return (
        <>
            {active ? (
                <Outlet />
            ) : (
                <div>
                    <div className="relative">
                        <div className="h-[180px] rounded-tl-md rounded-tr-md bg-gradient-to-br from-blue-800 to-secondary"></div>
                        <div className="h-[180px] bg-white/5">
                            <h1 className="absolute left-10 top-[52%] flex h-[125px] w-[125px] translate-y-[-50%] items-center justify-center rounded-full border-[6px] bg-secondary text-5xl font-bold text-white">
                                {userNameFirstLetter}
                            </h1>
                            <div className="flex items-center justify-between px-10 py-16 pb-10">
                                <div>
                                    <h1 className="mt-4 text-xl font-bold text-white">{`${userDetails.firstName} ${userDetails.lastName}`}</h1>
                                    <p className="text-sm text-white/60">
                                        {userDetails.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ml-10">
                        {/**Event add btn */}
                        <div className="w-full">
                            <Link to="create-event">
                                <div
                                    onClick={() => setActive(true)}
                                    className="bg-lightForeground mt-10 flex h-[150px] w-[250px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-secondary"
                                >
                                    <MdAddCircle className="text-[55px] text-secondary" />
                                    <p className="font-medium text-secondary">
                                        Add Event
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/**Draft event section */}
                        <div className="b mt-10">
                            <h1 className="text-lg font-bold text-white/70">
                                Draft Events(0)
                            </h1>
                            <p className="text-white/60">Will add soon...</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminProfile;
