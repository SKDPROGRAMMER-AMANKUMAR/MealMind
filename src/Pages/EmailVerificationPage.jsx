import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { account } from '../Appwrite/AppwriteConfig';
import { MailCheck, Loader2, CheckCircle2, XCircle, RefreshCw, Mail } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usergetLoggedIn } from '../Appwrite/userLoggedIn';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/authSlice';

const EmailVerificationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verificationState, setVerificationState] = useState('initial'); // initial, sending, sent, verifying, success, error
    const [error, setError] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const dispatch = useDispatch()

    useEffect(() => {
        const userId = searchParams.get('userId');
        const secret = searchParams.get('secret');

        // Get current user's email
        const getCurrentUser = async () => {
            try {
                const user = await account.get();
                setUserEmail(user.email);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        getCurrentUser();

        // If URL has verification parameters, handle verification
        if (userId && secret) {
            setVerificationState('verifying');
            handleVerification(userId, secret);
        }
    }, [searchParams]);

    const handleVerification = async (userId, secret) => {
        try {
            await account.updateVerification(userId, secret);
            const userLoginData = await usergetLoggedIn() 
            setVerificationState('success');
            setTimeout(() => {
                // navigate('/home');
                dispatch(setUser(userLoginData))
                toast.success("Email Successfully Verified")
            }, 3000);
        } catch (error) {
            console.error('Verification error:', error);
            setVerificationState('error');
            setError(error.message || 'Verification failed. Please try again.');
        }
    };

    const sendVerificationEmail = async () => {
        try {
            setVerificationState('sending');
            await account.createVerification(window.location.origin + '/verify');
            setVerificationState('sent');
        } catch (error) {
            setVerificationState('error');
            setError('Failed to send verification email. Please try again.');
        }
    };

    const renderContent = () => {
        switch (verificationState) {
            case 'initial':
                return (
                    <div className="space-y-6 text-center">
                        <Mail className="w-16 h-16 text-blue-500 mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
                        <p className="text-gray-600">
                            To continue using our services, please verify your email address, &nbsp; An Email get send to your entered email click to get verified:
                            <span className="block font-medium text-blue-600 mt-1">{userEmail}</span>
                        </p>
                        {/* <button
                            onClick={sendVerificationEmail}
                            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <MailCheck className="w-5 h-5 mr-2" />
                            Send Verification Email
                        </button> */}
                    </div>
                );

            case 'sending':
                return (
                    <div className="space-y-4 text-center">
                        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-900">Sending Email</h2>
                        <p className="text-gray-600">Please wait while we send your verification email...</p>
                    </div>
                );

            case 'sent':
                return (
                    <div className="space-y-6 text-center">
                        <MailCheck className="w-16 h-16 text-green-500 mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-900">Email Sent!</h2>
                        <p className="text-gray-600">
                            We've sent a verification link to:
                            <span className="block font-medium text-blue-600 mt-1">{userEmail}</span>
                        </p>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">Didn't receive the email?</p>
                            <button
                                onClick={sendVerificationEmail}
                                className="inline-flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Resend Email
                            </button>
                        </div>
                    </div>
                );

            case 'verifying':
                return (
                    <div className="space-y-4 text-center">
                        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-900">Verifying Email</h2>
                        <p className="text-gray-600">Please wait while we verify your email address...</p>
                    </div>
                );

            case 'success':
                return (
                    <div className="space-y-6 text-center">
                        <ToastContainer/>
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-900">Email Verified!</h2>
                        <p className="text-gray-600">
                            Your email has been successfully verified.
                            <span className="block mt-1">Redirecting to home...</span>
                        </p>
                    </div>
                );

            case 'error':
                return (
                    <div className="space-y-6 text-center">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-900">Verification Failed</h2>
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={() => setVerificationState('initial')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <RefreshCw className="w-5 h-5 mr-2" />
                            Try Again
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default EmailVerificationPage;