import React, { useState, useEffect } from "react";
import { X, Edit, Save, AlertCircle } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import { getFileId } from "../Appwrite/GetFileIdOfAvatar";
import { getAvatarFromStorage } from "../Appwrite/auth.js";
import { useSelector,useDispatch } from "react-redux";
import { img } from "framer-motion/client";
import { storage } from "../Appwrite/AppwriteConfig.js";
import conf from "../Appwrite/Conf.js";
import { HashLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getUserInfoFromDataBase,savedUserProfileSetupToDatabase} from "../Appwrite/auth.js"
import {PulseLoader} from "react-spinners"

const EditProfile = () => {
  const [tempData, setTempData] = useState({
    name: "",
    username: "",
    phone: "",
    location: "",
    bio: "",
  });

  const [fileId, setFileId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userInfo,setUserInfo] = useState('')
  const [loadingSavebutton,setLoadingSavebutton] = useState(false) 
  //  let fileID = getFileId()
  const fileID = useSelector((state) => state.getFileId.GetFileId);
  const DocumentID = useSelector((state) => state.getFileId.GetDocId)
  const userId = useSelector((state) => state.getFileId.GetUserId)
  const getBio = useSelector((state) => state.getFileId.GetBio)
  const getLocation = useSelector((state) => state.getFileId.GetLocation)
  const getPhoneNumber = useSelector((state) => state.getFileId.GetPhoneNumber)
  const navigate = useNavigate()
  const dispatch = useDispatch()
//   console.log("The fileId is:", fileID);
{/* <PulseLoader color="#02ebff" /> */}
  useEffect(() => {
    const getFileImageById = async () => {
      if (fileID) {
        setFileId(fileID);

        try {
          setLoading(true);
          const getFileImage = await getAvatarFromStorage(fileID);
          const imagePreviewUrl = storage.getFilePreview(
            conf.appwriteUsersAvatarsBucketID,
            fileID,
            500,
            500
          );
          if (getFileImage) {
            console.log("Image retrieved successfully");
            // let ImageKiUrl = getFileImage.name
            setImageUrl(imagePreviewUrl);
          }
          await getUserKiJaanKari(DocumentID)
        } catch (error) {
          console.log(
            "Error while retrieving image from storage:",
            error.message
          );
        } finally {
          setLoading(false);
        }
      } else {
        console.log("fileId not found in Redux store");
      }
    };

    getFileImageById();
  }, [fileID]); // Add fileID as dependenc

    

  const getUserKiJaanKari = async(DocumentID) => {
          if(!DocumentID){
            console.log("Document id is missing",DocumentID)
            return;
          }
          try {
            const getUserInfoFromDatabase = await getUserInfoFromDataBase(DocumentID)
            if(getUserInfoFromDatabase){
            setUserInfo(getUserInfoFromDatabase)
            console.log("The information successfully get retrieved")
            }
          } catch (error) {
            console.log("Error while getting user info:",error.message)
          }
      }

    //   console.log("The user info is:",userInfo)

      let name = userInfo.Name
      let username = userInfo.Username

  if (loading) {
    return (
      <div className="loading fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50">
        <HashLoader color="#00ffc6" />
      </div>
    );
  }

  const handleSubmitForm = async(tempData,userId) => {
    // e.preventDefault()
    // console.log("The user remaining data is:",tempData)
    if(!userId){
        console.log("user Id not found",userId)
        return;
    }
    // const basicUSPhoneNumberRegex = /^\d{10}$/;
    // const validatePhoneNumber = 

    try {
        setLoadingSavebutton(true)
        const uploaduserRemainingInfoToDB = await savedUserProfileSetupToDatabase(tempData.phone,tempData.location,tempData.bio,userId,dispatch)

        if(uploaduserRemainingInfoToDB){
            console.log("Info successfully get uploaded to db")
            toast.success("Profile Setup Completed")
            navigate("/profile")
        }
    } catch (error) {
        toast.error("Something went wrong")
        console.log("Error while uploading remainig info of user:",error.message)
    }finally{
        setLoadingSavebutton(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <ToastContainer/>
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-6 sm:p-8 space-y-8 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Edit className="text-blue-600 w-6 h-6 sm:w-7 sm:h-7" />
            <span>Setup Your Profile</span>
          </h2>

          <Link to="/home">
            <button className="text-gray-400 hover:text-gray-600 transition-colors hover:rotate-90 transform duration-200">
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Image Section */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="MealMind Logo"
                    className="w-full h-full object-cover rounded-full  transform hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <svg
                    className="w-16 h-16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="col-span-2 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name ? name : tempData.name}
                  onChange={(e) =>
                    setTempData({ ...tempData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-gray-50/50"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={username ? username:tempData.username}
                  onChange={(e) =>
                    setTempData({ ...tempData, username: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-gray-50/50"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            {/* <form > */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={ getPhoneNumber ? getPhoneNumber : tempData.phone}
                //   max={10}
                  maxLength={10}
                  onChange={(e) =>
                    setTempData({ ...tempData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-gray-50/50"
                  placeholder="Enter your phone number"
                />
                {/* <p className="text-xs text-gray-500 text-right">
                {tempData.phone.length}/10 characters
              </p> */}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={getLocation ? getLocation : tempData.location}
                  onChange={(e) =>
                    setTempData({ ...tempData, location: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-gray-50/50"
                  placeholder="Enter your location"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                value={getBio ? getBio : tempData.bio}
                onChange={(e) =>
                  setTempData({ ...tempData, bio: e.target.value })
                }
                rows={2}
                maxLength={53}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-gray-50/50 resize-none"
                placeholder="Write a short bio about yourself"
              />
              <p className="text-xs text-gray-500 text-right">
                {tempData.bio.length}/53 characters
              </p>
            </div>
            {/* </form> */}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 border-t border-gray-100 pt-6 mt-8">
          <div className="flex items-center text-amber-600">
            <AlertCircle className="mr-2 w-4 h-4" />
            <span className="text-xs sm:text-sm">
              Some fields may require verification
            </span>
          </div>
          <div className="flex gap-4">
            <Link to="/profile">
              <button className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium">
                Cancel
              </button>
            </Link>
            <button onClick={() => handleSubmitForm(tempData,userId)} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-2 text-sm font-medium shadow-lg shadow-blue-100 hover:shadow-blue-200">
              <Save className="w-4 h-4" />
              <span>{loadingSavebutton ? <PulseLoader color="#02ebff" />:"Save Changes"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
