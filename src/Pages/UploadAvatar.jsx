import React, { useState, useRef } from 'react';
import { ImagePlus, Trash2, Upload, Check, X } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { UploadAvatarToStorage } from '../Appwrite/auth';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
// import {setFileUrl} from "../Appwrite/GetFileIdOfAvatar"

const UploadAvatar = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch()

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({
          file,
          preview: reader.result
        });
        setUploadStatus('ready');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    setUploadStatus('uploading');
    try {
      // Simulated upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace with actual upload logic
      // const formData = new FormData();
      // formData.append('avatar', selectedImage.file);
      // const response = await axios.post('/upload-avatar', formData);

      setUploadStatus('success');
      const uploadAvatar = await UploadAvatarToStorage(selectedImage,dispatch)
      if(uploadAvatar){
        toast.success("Image Uploaded")
        // console.log("The image Info is: ",selectedImage)
        // setFileUrl(file.name)
      }
    } catch (error) {
      setUploadStatus('error');
      console.error('Upload failed', error);
      toast.error("Image Upload Failed")
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setUploadStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center">
      <Link to="/register">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition duration-300"
        >
          <X size={24} />
        </button>
        </Link>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Avatar <span className='text-[#4c0bff] font-serif'>Optional</span></h2>
        
        <div className="mb-6 flex justify-center">
          {selectedImage ? (
            <img 
              src={selectedImage.preview} 
              alt="Avatar Preview" 
              className="w-40 h-40 object-cover rounded-full border-4 border-blue-500"
            />
          ) : (
            <FaUserCircle className="text-gray-300 w-40 h-40" />
          )}
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*" 
          className="hidden"
          id="uploader"
        />
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <button 
            onClick={() => fileInputRef.current.click()}
            className="flex items-center justify-center w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            <ImagePlus className="mr-2" />
            {selectedImage ? 'Change Image' : 'Select Image'}
          </button>
          
          {selectedImage && (
            <>
            
              <button 
                onClick={handleRemoveImage}
                className="flex items-center justify-center w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                <Trash2 className="mr-2" />
                Remove
              </button>
              
              
              <button 
                onClick={handleImageUpload}
                disabled={uploadStatus === 'uploading' || uploadStatus === 'success'}
                className={`
                  flex items-center justify-center w-full sm:w-auto 
                  ${uploadStatus === 'success' 
                    ? 'bg-green-500 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600'}
                  text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out
                  ${uploadStatus === 'uploading' ? 'opacity-50 cursor-wait' : ''}
                `}
              >
                {uploadStatus === 'success' ? (
                  <>
                    <Check className="mr-2" />
                    Uploaded
                  </>
                ) : uploadStatus === 'uploading' ? (
                  'Uploading...'
                ) : (
                  <>
                    <Upload className="mr-2" />
                    Upload
                  </>
                )}
              </button>
            </>
          )}
        </div>
        
        {uploadStatus === 'error' && (
          <p className="text-red-500 mt-4">Upload failed. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default UploadAvatar;