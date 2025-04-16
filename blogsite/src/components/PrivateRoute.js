import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../services/api';

const PrivateRoute = ({ children }) => {
  const user = isLoggedIn();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default PrivateRoute; 