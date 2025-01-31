// import { useState } from "react";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./Pages/Signup";
import SigninForm from "./Pages/Login";
import Features from "./Pages/Features";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfService from "./Pages/TermsOfServices";
import Cookies from "./Pages/Cookies";
import UploadAvatar from "./Pages/UploadAvatar";
import Error from "./Pages/Error";
import ForgotPassword from "./Pages/ForgotPassword";
import PasswordResetForm from "./Pages/PasswordResetForm";
import AuthProvider from "./Pages/AuthProvider";
import ProtectedRouteInside from "./Pages/ProtectedRoutesInside";
import ProtectedPublicRoutes from "./Pages/ProtectedPublicRoutes";
import Home from "./Pages/MainHome";
import SaveToFavourites from "./Pages/SaveToFavourites"
import ProfilePage from "./Pages/ProfilePage";
import Ingredients from "./Pages/Ingredients";
import LoginModal from "./Pages/Logout.jsx"
import EmailVerificationPage from "./Pages/EmailVerificationPage.jsx"
import Shopping from "./Pages/Shopping.jsx"
import Edit from "./Pages/EditProfile.jsx"

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        {/* public routes */}
        <Route element={<ProtectedPublicRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SigninForm />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/avatar" element={<UploadAvatar />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<PasswordResetForm />} />
          <Route path="/auth" element={<AuthProvider />} />
          <Route path="/verify" element={<EmailVerificationPage />} />
          <Route path="*" element={<Error />} />
        </Route>

        {/* private routes */}
        <Route element={<ProtectedRouteInside />}>
          <Route path="/home" element={<Home />} />
          <Route path="/favourites" element={<SaveToFavourites />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/logout" element={<LoginModal />} />
          <Route path="/shopping" element={<Shopping />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
