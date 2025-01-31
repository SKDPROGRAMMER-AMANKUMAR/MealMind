import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
// import {logout} from "../Redux/authSlice.js"
// import { useDispatch } from "react-redux";

const ProtectedPublicRoutes = () => {
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("The user's authentication state is: ", isAuthenticated);

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
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

  if (isAuthenticated) {
    return <Navigate to="/home" />; // Redirect to home if already authenticated
  } else {
    // If not authenticated, show the public route (via Outlet)
    return <Outlet />;
  }
};

export default ProtectedPublicRoutes;
