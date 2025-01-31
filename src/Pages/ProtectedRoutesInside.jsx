import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
// import { logout } from '../Redux/authSlice'; // Make sure you import your logout action

const ProtectedRoute = () => {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("The user's authentication state (PRI): ", isAuthenticated);

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async operation
      setLoading(false);
    };
    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <div className="loading fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50">
        <ScaleLoader color="#00e3ff" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to landing page when not authenticated
  }

  return <Outlet />;
};

export default ProtectedRoute;
