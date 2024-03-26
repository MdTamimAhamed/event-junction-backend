import React, { useState, useEffect } from "react";
import SideBar from "../sidebar/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import DashHeader from "../headers/DashHeader";

function LayoutAdminDashboard() {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);

  // useEffect(() => {
  //   setShowSidebar(!location.pathname.includes('/preview-event'));
  // }, [location]);

  return (
    <>
      <div className=" bg-off-white relative">
        <div className=" w-full fixed z-[9999]">
          <DashHeader />
        </div>
        <div className="w-full flex justify-between">
          {showSidebar && (
            <div className="fixed top-[5.1rem] left-0 z-[999]">
              <SideBar />
            </div>
          )}
          <div className={`w-full mx-10 mt-24 ml-[240px]`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default LayoutAdminDashboard;
