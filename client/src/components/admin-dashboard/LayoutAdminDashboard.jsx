import React, { useState, useEffect } from 'react';
import SideBar from '../sidebar/SideBar';
import { Outlet, useLocation } from 'react-router-dom';
import DashHeader from '../headers/DashHeader';

function LayoutAdminDashboard() {
    const location = useLocation();
    const [showSidebar, setShowSidebar] = useState(true);

    // useEffect(() => {
    //   setShowSidebar(!location.pathname.includes('/preview-event'));
    // }, [location]);

    return (
        <>
            <div className="relative bg-background">
                <div className="fixed z-40 w-full">
                    <DashHeader />
                </div>
                <div className="flex w-full justify-between">
                    {showSidebar && (
                        <div className="fixed left-0 top-[5rem] z-30">
                            <SideBar />
                        </div>
                    )}
                    <div className={`mx-10 ml-[280px] mt-24 w-full`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LayoutAdminDashboard;
