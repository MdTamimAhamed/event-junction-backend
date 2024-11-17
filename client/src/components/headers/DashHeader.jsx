import React from 'react';
import { MdNotifications } from 'react-icons/md';
import jwtDecode from 'jwt-decode';
import { FiSearch } from 'react-icons/fi';

function DashHeader() {
    const token = localStorage.getItem('admin-token');
    const userDetails = jwtDecode(token);

    const userName = userDetails.firstName;
    const userNameFirstLetter = userName.charAt(0);
    return (
        <>
            <div className="w-full border-b-1 border-secondary bg-foreground/10 backdrop-blur-2xl">
                <div className="container m-auto flex items-center justify-between px-8 py-5">
                    <div className="flex items-center">
                        <div className="text-lg font-bold text-white">
                            DIU <span className="text-secondary">EMS</span>
                        </div>
                        <div className="relative ml-20 rounded bg-background px-1 py-1">
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-transparent py-1 pl-8 outline-none"
                            />
                            <button className="rounded bg-secondary px-4 py-1 text-white">
                                Search
                            </button>
                            <FiSearch className="absolute left-2 top-[50%] translate-y-[-50%] text-lg text-white" />
                        </div>
                    </div>
                    <div className="flex items-center [&>p]:ml-3">
                        <p className="text-[24px] text-white/70">
                            <MdNotifications />
                        </p>

                        <div className="ml-10 flex flex-col">
                            <p className="text-right text-sm text-white">{`${userDetails.firstName} ${userDetails.lastName}`}</p>
                            <p className="text-right text-[11px] text-secondary">
                                {userDetails.email}
                            </p>
                        </div>

                        <p className="flex h-10 w-10 items-center justify-center rounded-full bg-light-gray text-lg text-white">
                            {userNameFirstLetter}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashHeader;
