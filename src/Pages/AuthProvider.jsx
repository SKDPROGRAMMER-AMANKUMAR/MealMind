import React, { useState, useRef, useEffect } from "react";
import { ImagePlus, Trash2, Upload, Check, X } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { account, database, storage } from "../Appwrite/AppwriteConfig.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../Redux/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
// import {
//   SendingDataToDatabaseGoogleSignup,
//   LoggedInUser,
// } from "../Appwrite/auth.js";
import { PulseLoader } from "react-spinners";
import conf from "../Appwrite/Conf.js";
import { OAuthProvider } from "appwrite";

const AuthProvider = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("Redux state (isAuthenticated):", isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genNumber = Math.floor(Math.random() * (7 - 1) + 1);

  // useEffect(() => {

  //   const fetchUserSession = async () => {
  //     try {
  //       const user = await account.get(); // Fetch the user
  //       if (user) {
  //         dispatch(setUser(user)); // Update Redux state
  //         navigate("/home"); // Navigate to home if authenticated
  //       }
  //     } catch (error) {
  //       console.error("No active session found:", error.message);
  //     }
  //   };

  //   if (!isAuthenticated) {
  //     fetchUserSession();
  //   }
  // }, [dispatch, isAuthenticated, navigate]);

  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const session = await account.get();
  //       if (session) {
  //         dispatch(setUser(session));
  //         navigate("/home");
  //       }
  //     } catch (error) {
  //       console.error("No active session:", error);
  //     }
  //   };

  //   checkSession();
  // }, [dispatch, navigate]);


  // const HandleGoogleLogin = async () => {
  //   setLoading(true);
  //   try {
  //     // Start OAuth login process
  //     await account.createOAuth2Session(
  //       OAuthProvider.Google,
  //       `${conf.ReactappRedirectUrlsuccessflly}`,
  //       `${conf.ReactappRedirectUrlfailure}`
  //     );

  //     // Fetch the current session after successful login
  //     const user = await account.getSession('current');
  //     console.log("Authenticated user:", user);

  //     if (user) {
  //       // Generate a username and save to the database
  //       const username = `_${user.name}@${genNumber}`;
  //       dispatch(setUser(user)); // Update Redux state

  //       try {
  //         await SendingDataToDatabaseGoogleSignup(user.name, username);
  //         console.log("User data saved to database successfully.");
  //       } catch (error) {
  //         console.error("Error saving user data to database:", error.message);
  //         toast.error("Failed to save user data.");
  //       }

  //       navigate("/home"); // Navigate to home after login
  //     }
  //   } catch (error) {
  //     console.error("Error during Google login:", error.message);
  //     // toast.error("Authentication Failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const checkAndSetSession = async () => {
  //     try {
  //       setLoading(true);
  //       const currentSession = await account.get();
        
  //       if (currentSession) {
  //         console.log("Current session found:", currentSession);
          
  //         // Get user details from database or create if doesn't exist
  //         try {
  //           const username = `_${currentSession.name}@${genNumber}`;
  //           await SendingDataToDatabaseGoogleSignup(currentSession.name, username);
            
  //           // Important: Dispatch user data with all necessary information
  //           dispatch(setUser({
  //             ...currentSession,
  //             username,
  //             provider: 'google'
  //           }));
            
  //           navigate("/home");
  //         } catch (dbError) {
  //           console.error("Database operation failed:", dbError);
  //           toast.error("Failed to complete profile setup");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Session check failed:", error);
  //       dispatch(logout()); // Ensure clean state on error
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAndSetSession();
  // }, [dispatch, navigate]);

  // const HandleGoogleLogin = async () => {
  //   setLoading(true);
  //   try {
  //     // 1. Start OAuth login process
  //     await account.createOAuth2Session(
  //       OAuthProvider.Google,
  //       `${conf.ReactappRedirectUrlsuccessflly}`,
  //       `${conf.ReactappRedirectUrlfailure}`
  //     );

  //     // 2. Get the current session
  //     const session = await account.get();
      
  //     if (session) {
  //       // 3. Generate username for new users
  //       const username = `_${session.name}@${genNumber}`;
        
  //       try {
  //         // 4. Save user data to database
  //         await SendingDataToDatabaseGoogleSignup(session.name, username);
          
  //         // 5. Update Redux state
  //         dispatch(setUser({
  //           ...session,
  //           username: username // Include username in user object
  //         }));
          
  //         // 6. Navigate to home
  //         navigate("/home");
  //       } catch (error) {
  //         console.error("Error saving user data:", error);
  //         toast.error("Failed to complete signup process");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Google auth error:", error);
  //     toast.error("Authentication failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

     // Check and handle current session
  
     useEffect(() => {
    const getCurrentSession = async () => {
      try {
        const session = await account.getSession('current');
        if (session) {
          console.log("Provider:", session.provider);
          console.log("Provider UID:", session.providerUid);
          console.log("Access Token:", session.providerAccessToken);

          // Get user account details
          const user = await account.get();
          
          if (user) {
            // Update Redux state with complete user info
            dispatch(setUser({
              ...user,
              provider: session.provider,
              providerUid: session.providerUid,
              accessToken: session.providerAccessToken
            }));
            navigate("/home");
          }
        }
      } catch (error) {
        console.error("Session check failed:", error);
      }
    };

    getCurrentSession();
  }, [dispatch, navigate]);

  // const HandleGoogleLogin = async () => {
  //   setLoading(true);
  //   try {
  //     // Create OAuth2 session
  //     await account.createOAuth2Session(
  //       'google',
  //       `${window.location.origin}/home`, // Make sure this matches your Google Console redirect URI
  //       `${window.location.origin}/auth`
  //     );
      
  //     // Note: The actual session handling will be done by the useEffect above
  //     // after the OAuth redirect completes
      
  //   } catch (error) {
  //     console.error("Google login failed:", error);
  //     toast.error("Authentication failed. Please try again.");
  //     setLoading(false);
  //   }
  // };

  const HandleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Create OAuth2 session with proper error handling
      await account.createOAuth2Session(
        'google',
        `${conf.ReactappRedirectUrlsuccessflly}`,
      `${conf.ReactappRedirectUrlfailure}`,
        ['profile'] // Specify required scopes
      );

      // Note: The session handling and database operations will be handled
      // by the useEffect hook after successful OAuth redirect
      
    } catch (error) {
      console.error("Google OAuth error:", error);
      setLoading(false);
      toast.error("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />

      {loading ? (
        <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white text-xl">
          <PulseLoader color="#ffffff" size={15} />
        </div>
      ) : (
        <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center">
          <Link to="/register">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition duration-300"
            >
              <X size={24} />
            </button>
          </Link>

          <div
            onClick={HandleGoogleLogin}
            className=" border-2 cursor-pointer hover:bg-[#f2efef]  border-black rounded-3xl mt-9 flex justify-center items-center"
          >
            <FcGoogle className="text-3xl" />
            <p className="p-3 text-[black] text-[18px] ">Signup with google</p>
          </div>

          <div className=" border-2 cursor-pointer hover:bg-[#f2efef]  border-black rounded-3xl mt-4 flex justify-center items-center">
            <FaFacebook className="text-2xl text-[#3374f8]" />
            <p className="p-3 text-[black] text-[18px] ">
              Signup with facebook
            </p>
          </div>

          <div className=" border-2 cursor-pointer hover:bg-[#f2efef]  border-black rounded-3xl mt-4 flex justify-center items-center">
            <FaXTwitter className="text-2xl text-[black]" />
            <p className="p-3 text-[black] text-[18px] ">Signup with twitter</p>
          </div>

          <div className="text-[18px] text-gray-400 mt-16 ">
            Choose your favourite{" "}
            <span className="text-[black] font-bold">Authprovider</span> to
            Signup
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthProvider;
