import React from "react";
import Footer from "../footer/Footer";
import { Link} from "react-router-dom";
import HomeHeader from "../headers/HomeHeader";
import HomeHeroSection from "../client-components/HomeHeroSection";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../Utilities/base/baseURL";
import { useState } from "react";
import ClientCard from "../../Utilities/cards/ClientCard";
import UserLogout from "../logout/UserLogout";
import jwtDecode from "jwt-decode";



function HomeLayout() {
  const [fetchedData, setFetchedData] = useState(null)
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const fetchAllData = async()=>{
      try{
        const response = await axios.get(`${baseUrl}/admin/get-event`);
        console.log(response.data)
        setFetchedData(response.data)
      }catch{
        console.error("Error fetching data:", error);
      }
    }

    fetchAllData();
  }, [])


  useEffect(() => {
    const token = localStorage.getItem("user-token");

    if (token) {
      const userDetails = jwtDecode(token);
      const userName = userDetails.firstName;
      const userNameFirstLetter = userName.charAt(0);
      setUserLoggedIn(userNameFirstLetter);
      setIsLoggedIn(true);
    }
  }, []);
  

  return (
    <>
      <div>
          <HomeHeader 
            user={userLoggedIn}
          />

          {fetchedData && fetchedData.length > 0?(
            <>
              <HomeHeroSection
                key={2}
                title={fetchedData[2].eventTitle}
                thumbnail={fetchedData[2].eventThumbnail}
                type={fetchedData[2].eventType}
                dates={fetchedData[2].dates}
                times={fetchedData[2].times}
                venue={fetchedData[2].venue}
              />
            </>
          ):(
            <p>Nothing to show</p>
          )}

            <div className="container mx-auto py-24 px-24">
              <p className="font-bold text-lg mb-4">Upcoming More Events</p>
              <ClientCard
                eventData={fetchedData}
                altTitle={true}
                isLoggedIn={isLoggedIn}
                userToken={userToken}
                />
            </div>
      </div>

      <Footer/>
    </>
  );
}

export default HomeLayout;
