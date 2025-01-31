import React, { useState } from "react";
import { Lock, Home, EyeOff, Eye } from "lucide-react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateForgetPasswordRecovery } from "../Appwrite/auth.js";
import { useSearchParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const PasswordResetForm = () => {
  const [searchParams] = useSearchParams(); // Get query params from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const secret = searchParams.get("secret");
  

  const handlePasswordChange = (e, isConfirm = false) => {
    const value = e.target.value;
    if (isConfirm) {
      setConfirmPassword(value);
      setPasswordsMatch(newPassword === value);
    } else {
      setNewPassword(value);
      setPasswordsMatch(value === confirmPassword);
    }
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault()
    // Check if the new password is valid
    setLoading(true);
    if (!validatePassword(newPassword)) {
      toast.error("Invalid Password Follow The Instructions");
      return; // Prevent further execution if password is invalid
    }

    // Check if new password matches confirm password and is not empty
    if (newPassword === confirmPassword && newPassword !== "") {
      return;
    } else {
      toast.error("Passwords do not match or are empty");
    }

    try {
      const updatepassword = await updateForgetPasswordRecovery(
        newPassword,
        secret
      );
      if (updatepassword) {
        console.log("The keys is:  ",secret)
        console.log("Password reset successfully(PRF)");
        toast.success("Password Reset Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error while Password reset", error.message);
      toast.error("Password Reset Failed");
    } finally {
      setLoading(false);
    }

    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onClick={handleResetPassword}>
          {/* <!-- Optional Username Field (Hidden) --> */}
          <div class="hidden">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              autocomplete="username"
              value=""
            />
          </div>
          <div className="flex items-center justify-center mb-6">
            <Lock className="text-blue-500 mr-2" size={32} />
            <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
          </div>

          <div className=" relative">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => handlePasswordChange(e)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <p className="text-gray-500 ml-1 mb-2">
            Strong passwords need at least 8 characters, uppercase, lowercase,
            and a number.
          </p>

          <div className="mb-6 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handlePasswordChange(e, true)}
                className={`w-full p-3 border rounded-md focus:outline-none 
                ${
                  confirmPassword
                    ? passwordsMatch
                      ? "border-green-500 focus:ring-2 focus:ring-green-500"
                      : "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "focus:ring-2 focus:ring-blue-500"
                }`}
                placeholder="Confirm new password"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {confirmPassword && (
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                  {passwordsMatch ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaTimesCircle className="text-red-500" />
                  )}
                </div>
              )}
            </div>
            {!passwordsMatch && confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <div className="space-y-4">
            <button
              disabled={!passwordsMatch || newPassword === ""}
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 
              disabled:bg-gray-400 disabled:cursor-not-allowed 
              transition duration-300 ease-in-out flex items-center justify-center mb-2"
            >
              <Lock className="mr-2" size={20} />
              {loading ? <BeatLoader /> : "Reset Password"}
            </button>
            <p className="text-gray-500 ml-1 mt-0">
              Kindly enter your password to activate Reset Password button.
            </p>
            &nbsp; &nbsp;
            <Link to="/">
              <button
                className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 
            transition duration-300 ease-in-out flex items-center justify-center "
              >
                <Home className="mr-2" size={20} />
                Go Back to Home
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetForm;
