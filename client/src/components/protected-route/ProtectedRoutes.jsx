import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function ProtectedRoute({ element, userRole, ...rest }) {
  const adminToken = localStorage.getItem("admin-token");
  const userToken = localStorage.getItem("user-token");

  if (adminToken) {
    const admin = jwtDecode(adminToken);
    if (admin.role === userRole) {
      return element;
    }
    return <Navigate to="/login" />;
  } 

  if (userToken) {
    const user = jwtDecode(userToken);
    if(user.role === userRole){
      return element;
    }
    return <Navigate to="/login" />;
  } 

  
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
