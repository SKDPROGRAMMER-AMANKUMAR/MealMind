import React,{useState,useEffect} from 'react';
import { Edit2, MapPin, Phone, Mail, Camera,HomeIcon,MoveRight } from 'lucide-react';
import {Link} from "react-router-dom"
import {getFileId} from "../Appwrite/GetFileIdOfAvatar"
import {getAvatarFromStorage} from "../Appwrite/auth.js"
import { useSelector } from 'react-redux';
import { img } from 'framer-motion/client';
import { storage } from '../Appwrite/AppwriteConfig.js';
import conf from "../Appwrite/Conf.js"
import { useDispatch } from 'react-redux';
import { HashLoader } from 'react-spinners';
import {setusergetbio,setuserlocation,setuserphonenumber} from "../Redux/GetAvatarFileIDSlice.js"
import {getUserInfoFromDataBase,getUserEmailAndInfo,getUserProfilleSetupFromDatabases} from "../Appwrite/auth.js"

const ProfilePage = () => {
   const [fileId,setFileId] = useState(null)
   const [imageUrl,setImageUrl] = useState(null)
   const [userInfo,setUserInfo] = useState('')
   const [userEmail,setUseremailInfo] = useState(null)
   const [loading,setLoading] = useState(false)
   const [getuserProInfo,setUserProInfo] = useState(null)
  //  let fileID = getFileId()
   const fileID = useSelector((state) => state.getFileId.GetFileId)
   const DocumentID = useSelector((state) => state.getFileId.GetDocId)
   const EmailID = useSelector((state) => state.getFileId.GetEmailID)
   const UserProDocumentID = useSelector((state) => state.getFileId.GetDocIdUserProfie)
   const dispatch = useDispatch()
  //  const UserId = useSelector((state) => state.getFileId.GetUserId)
  //  console.log("The email id is:",EmailID)
  //  console.log("The DocumentId is:",DocumentID)

  useEffect(() => {
    const getFileImageById = async () => {
      if (fileID) {
        setFileId(fileID);
        try {
          setLoading(true)
          const getFileImage = await getAvatarFromStorage(fileID);
          const imagePreviewUrl = storage.getFilePreview(conf.appwriteUsersAvatarsBucketID, fileID, 500, 500)
          if (getFileImage) {
            console.log("Image and info retrieved successfully");
            // let ImageKiUrl = getFileImage.name
            setImageUrl(imagePreviewUrl)
          }
          await getUserKiJaanKari(DocumentID)
          await getUserProfileKiJaanKaari(UserProDocumentID)
          await getUserKiEmailJaanKari()
        } catch (error) {
          console.log("Error while retrieving image from storage:", error.message);
        }finally{
          setLoading(false)
        }
      } else {
        console.log("fileId not found in Redux store");
      }
    };
    
    getFileImageById();
  }, [fileID]); // Add fileID as dependenc


    if (loading) {
      return (
        <div className="loading fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50">
          <HashLoader color="#00ffc6" />
        </div>
      );
    }

    const getUserProfileKiJaanKaari = async(documentKiId) => {
       if(!documentKiId){
        console.log("Document id not found")
        return;
       }
       try {
        const getUserProInfo = await getUserProfilleSetupFromDatabases(documentKiId)
        if(getUserProInfo){
          console.log("userProfille Info Retrieve successfully ")
          setUserProInfo(getUserProInfo)
        }
       } catch (error) {
         console.log("Error while getting user Profille Info",error.message)
       }
    }

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
    const getUserKiEmailJaanKari = async() => {
        try {
          const getUserInfoFromDatabaseforEmail = await getUserEmailAndInfo()
          if(getUserInfoFromDatabaseforEmail){
          setUseremailInfo(getUserInfoFromDatabaseforEmail)
          console.log("The information successfully get retrieved")
          }
        } catch (error) {
          console.log("Error while getting user info:",error.message)
        }
    }


   
  // console.log("The imageUrl is:",imageUrl)
  // console.log("The user profile info is:", getuserProInfo)
let Bio = getuserProInfo?.Bio || ""
dispatch(setusergetbio(Bio))

let Location = getuserProInfo?.Location || ""
dispatch(setuserlocation(Location))

let PhoneNumber = getuserProInfo?.Phone || ""
dispatch(setuserphonenumber(PhoneNumber))
  let name = userInfo.Name
  let username = userInfo.Username


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg sm:mx-4 mx-0 transition-all duration-300 border border-gray-100">
        <div className="p-6 sm:p-8">
          {/* Header Section */}
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                <div className="text-blue-500 text-4xl">
                  {imageUrl ? ( <img 
                  src={imageUrl} 
                  alt="MealMind Logo" 
                  className="w-full h-full object-cover rounded-full  transform hover:scale-110 transition-transform duration-300"
                />):(<svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>)}
                  
                </div>
              </div>
              
            </div>

            {/* Name and Username */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">{ name ? name :"John Doe"}</h1>
              <p className="text-blue-500 text-lg font-medium">{username ? username : "@johndoe"}</p>
            </div>
            
            {/* Bio */}
            <p className="text-gray-600 text-center mt-4 max-w-md leading-relaxed">
              {Bio ? Bio : "Enter your Bio"}
            </p>

            {/* Divider */}
            <div className="w-full max-w-xs mx-auto mt-6 border-t border-gray-200"></div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 space-y-4 max-w-md mx-auto">
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Phone size={20} className="text-blue-600" />
              </div>
              <span className="text-gray-700 font-medium">{PhoneNumber ? PhoneNumber : "Phone"}</span>
            </div>
            
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <div className="bg-blue-100 p-2 rounded-lg">
                <MapPin size={20} className="text-blue-600" />
              </div>
              <span className="text-gray-700 font-medium">{Location ? Location:"Location"}</span>
            </div>
            
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Mail size={20} className="text-blue-600" />
              </div>
              <span className="text-gray-700 font-medium">{EmailID ? EmailID : "john.doe@example.com"}</span>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Link to="/edit">
          <div className="mt-8 flex justify-center">
            <button className="group flex items-center space-x-2 bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 li:whitespace-nowrap li:py-3 li:px-3">
              <Edit2 size={20} className="group-hover:animate-pulse" />
              <span className="font-medium">Complete your Profile Setup</span>
            </button>
          </div>
          </Link>
          <Link to="/home">
          <span className="mt-8 flex justify-center">
            <button className="group flex items-center space-x-2 bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <HomeIcon size={20} className="group-hover:animate-pulse" />
              <span className="font-medium">Back</span>
            </button>
          </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;