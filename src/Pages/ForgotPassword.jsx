import React, { useState } from 'react';
import { Mail, Lock, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from "react-router-dom";
import {ForgetPassord} from "../Appwrite/auth.js"

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      // Simulated password reset request
      const RestPass = await ForgetPassord(email)
      if(RestPass) {
        console.log("Password get Pass")
        return true
      }
      // Replace with actual password reset logic
      // const response = await axios.post('/api/forgot-password', { email });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <Link to="/login">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition duration-300"
        >
          <X size={24} />
        </button>
        </Link>

        <div className="text-center mb-6">
          <Lock size={48} className="mx-auto text-blue-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Forgot Password?</h2>
          <p className="text-gray-600 mt-2">No worries, we'll help you reset it</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus('idle');
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={status === 'success'}
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center text-red-500 space-x-2">
              <AlertCircle size={20} />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`
              w-full py-3 rounded-lg transition duration-300 flex items-center justify-center
              ${status === 'success' 
                ? 'bg-green-500 text-white cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'}
              ${status === 'loading' ? 'opacity-50 cursor-wait' : ''}
            `}
          >
            {status === 'success' ? (
              <>
                <CheckCircle2 className="mr-2" />
                Reset Link Sent
              </>
            ) : status === 'loading' ? (
              'Sending...'
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {status === 'success' && (
          <p className="text-center text-green-600 mt-4 text-sm">
            A password reset link has been sent to {email}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;