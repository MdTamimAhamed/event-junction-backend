import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Utilities/base/baseURL";
import Card from "../../Utilities/cards/Card";
import jwtDecode from "jwt-decode";
import Analytics from "./Analytics";

function Dashboard() {
  const [eventData, setEventData] = useState([]);
  const adminToken = localStorage.getItem("admin-token");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        if (adminToken) {
          const loggedAdmin = jwtDecode(adminToken);
          const loggedId = loggedAdmin._id;

          const response = await axios.get(`${baseUrl}/admin/get-event?authorId=${loggedId}`);
          setEventData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchEventData();
  }, [adminToken]);

  return (
    <>
      <div className="mb-20">
        <Analytics/>
        <Card eventData={eventData} />
      </div>
    </>
  );
}

export default Dashboard;
