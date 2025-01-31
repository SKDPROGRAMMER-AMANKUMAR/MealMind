import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaCookieBite } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Cookies = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF8F4] font-[Inter]">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#242731] flex items-center gap-3 mb-2">
          <FaCookieBite className="text-[#F15A2B]" />
          Cookie Policy
        </h1>
        <p className="text-[#677489] text-lg">
          Understanding how we use cookies to improve your experience
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
          {/* Introduction */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <IoShieldCheckmarkOutline className="text-2xl text-[#F15A2B]" />
              <h2 className="text-2xl font-semibold text-[#242731]">About Our Cookies</h2>
            </div>
            <p className="text-[#677489] text-lg leading-relaxed">
              MealMind uses cookies to enhance your browsing experience and provide personalized service. This policy explains how we use cookies and similar technologies on our website.
            </p>
          </div>

          {/* Cookie Types */}
          <div className="space-y-8">
            <section className="border-b border-gray-100 pb-8">
              <h3 className="text-xl font-semibold text-[#242731] mb-3">Essential Cookies</h3>
              <p className="text-[#677489] text-lg">
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
              </p>
            </section>

            <section className="border-b border-gray-100 pb-8">
              <h3 className="text-xl font-semibold text-[#242731] mb-3">Analytical Cookies</h3>
              <p className="text-[#677489] text-lg">
                We use analytical cookies to understand how visitors interact with our website. This helps us improve our website's functionality and user experience.
              </p>
            </section>

            <section className="border-b border-gray-100 pb-8">
              <h3 className="text-xl font-semibold text-[#242731] mb-3">Functional Cookies</h3>
              <p className="text-[#677489] text-lg">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[#242731] mb-3">Marketing Cookies</h3>
              <p className="text-[#677489] text-lg">
                Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
              </p>
            </section>
          </div>

          {/* Cookie Management */}
          <div className="mt-10 bg-[#FDF8F4] rounded-xl p-8">
            <h3 className="text-xl font-semibold text-[#242731] mb-3">Managing Your Cookie Preferences</h3>
            <p className="text-[#677489] text-lg">
              You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.
            </p>
          </div>

          {/* Back Button */}
          <div className="mt-10">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-8 py-4 bg-[#F15A2B] text-white rounded-xl hover:bg-[#E04D1F] transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;