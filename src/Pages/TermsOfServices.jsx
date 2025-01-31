import React, { useState } from 'react';
import { 
  ScrollText, Shield, UserRound, Scale, AlertCircle, Cookie, Lock, 
  Mail, Building, FileTerminal, HeartHandshake, BadgeAlert, GlobeLock,
  Menu, X, Laptop, DollarSign, Bookmark, MessageCircle, Share2,
  Bell, HelpCircle, Settings, UserPlus, ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = {
    introduction: {
      icon: <ScrollText />,
      title: "Introduction",
      content: `Welcome to MealMind ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of MealMind's website, mobile applications, and services (collectively, the "Service"). 

By using our Service, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of these terms, you may not access the Service.

These Terms apply to all visitors, users, and others who access or use the Service. By accessing or using the Service, you agree to be bound by these Terms. You represent and warrant that you are at least 13 years old, as the Service is not intended for children under 13.`
    },
    accounts: {
      icon: <UserRound />,
      title: "Account Registration",
      content: `To access certain features of the Service, you must register for an account. You must provide accurate, current, and complete information during the registration process and keep your account information up-to-date.

You are responsible for:
• Maintaining the confidentiality of your account credentials
• Restricting access to your account
• All activities that occur under your account
• Notifying us immediately of any unauthorized access

We reserve the right to suspend or terminate your account if any information provided proves to be inaccurate, false, or outdated.

Your account is strictly personal, and you may not transfer or share your account with others. Each user must create their own account.`
    },
    usage: {
      icon: <Scale />,
      title: "Acceptable Use",
      content: `You agree not to use the Service to:
• Violate any applicable laws or regulations
• Infringe upon the rights of others
• Post or share inappropriate, defamatory, or offensive content
• Transmit viruses or malicious code
• Attempt to gain unauthorized access
• Interfere with the proper functioning of the Service

We reserve the right to:
• Remove any content that violates these Terms
• Suspend or terminate accounts engaging in prohibited behavior
• Monitor user activity to enforce these Terms
• Take appropriate legal action

You acknowledge that we have no obligation to monitor your access to or use of the Service or to review or edit any content, but we have the right to do so for the purpose of operating the Service.`
    },
    privacy: {
      icon: <Lock />,
      title: "Privacy & Data Protection",
      content: `We take your privacy seriously. Our Privacy Policy describes how we collect, use, and protect your personal information when you use our Service.

Key privacy points include:
• Data Collection: We collect information you provide directly and automatically through your use of the Service
• Data Usage: We use your data to provide and improve the Service, communicate with you, and ensure security
• Data Protection: We implement appropriate technical and organizational measures to protect your data
• Data Sharing: We may share your data with third-party service providers who assist in operating our Service
• Your Rights: You have rights regarding your personal data, including access, correction, and deletion

For complete details about our privacy practices, please review our Privacy Policy.`
    },
    subscription: {
      icon: <DollarSign />,
      title: "Subscription Terms",
      content: `Our Service may offer paid subscriptions with different levels of access and features. By selecting a paid subscription, you agree to:

• Pay all applicable fees
• Provide current and accurate billing information
• Automatic renewal unless cancelled
• Our refund and cancellation policies

Subscription fees:
• Are billed in advance
• May be subject to taxes
• Are non-refundable except as required by law
• May change with notice

Cancellation:
• Can be done at any time through your account settings
• Takes effect at the end of your current billing period
• Does not provide refunds for partial periods`
    },
    content: {
      icon: <FileTerminal />,
      title: "User Content",
      content: `By posting content on our Service, you:

• Grant us a worldwide, non-exclusive license to use, modify, publicly perform, publicly display, reproduce, and distribute such content
• Represent and warrant that you own or have the necessary rights to such content
• Agree that your content will not violate any third-party rights

We may, but have no obligation to, monitor, edit, or remove content that we determine violates these Terms or may be offensive or illegal.

You retain all ownership rights to your content, but you grant us permission to use it as described above.`
    },
    intellectual: {
      icon: <Bookmark />,
      title: "Intellectual Property",
      content: `All rights, title, and interest in and to the Service (excluding content provided by users) are and will remain the exclusive property of MealMind and its licensors.

Protected elements include:
• Software code
• Logos and graphics
• Design elements
• Text and documentation
• Trademarks and trade dress
• Features and functionality

You agree not to:
• Copy, modify, or create derivative works
• Reverse engineer the Service
• Remove or alter any copyright notices
• Attempt to derive source code

Any feedback or suggestions you provide regarding the Service may be used by us without any obligation to compensate you.`
    },
    termination: {
      icon: <Shield />,
      title: "Termination",
      content: `We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including:

• Breach of these Terms
• Violation of law
• At our sole discretion
• Upon your request

Upon termination:
• Your right to use the Service will immediately cease
• We may delete your content and account information
• You remain liable for all amounts due
• Sections of these Terms that by their nature should survive will survive

We are not liable to you or any third party for termination of your access to the Service.`
    },
    liability: {
      icon: <AlertCircle />,
      title: "Liability & Warranty",
      content: `The Service is provided "as is" without warranties of any kind, whether express or implied. We do not warrant that:

• The Service will be uninterrupted or error-free
• Defects will be corrected
• The Service is free of viruses or harmful components

You agree that we shall not be liable for:
• Indirect, incidental, special, or consequential damages
• Lost profits or data
• Business interruption
• Personal injury or property damage

The maximum liability of MealMind for any claim shall not exceed the amount you paid us in the past 12 months.`
    },
    communication: {
      icon: <MessageCircle />,
      title: "Communications",
      content: `By creating an account, you agree to receive communications from us, including:

• Service announcements
• Newsletter emails
• Marketing communications
• Security alerts
• Support messages

You can opt-out of non-essential communications through your account settings or by following the unsubscribe instructions in our emails.

We may use various methods of communication:
• Email
• Push notifications
• In-app messages
• SMS (if you opt-in)`
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F6] flex">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#F15A22] text-white p-2 rounded-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}>
        <div className="h-full overflow-y-auto p-4">
          <div className="flex items-center gap-2 mb-8 p-2">
            <ScrollText className="w-6 h-6 text-[#F15A22]" />
            <h2 className="text-xl font-bold text-gray-900">MealMind Terms</h2>
          </div>
          
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => {
                setActiveSection(key);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center gap-3 transition-all duration-200 ${
                activeSection === key
                  ? 'bg-[#F15A22] text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {React.cloneElement(section.icon, { 
                size: 18,
                className: activeSection === key ? 'text-white' : 'text-[#F15A22]'
              })}
              <span className="text-sm font-medium">{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 lg:px-8 py-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
              {React.cloneElement(sections[activeSection].icon, { 
                size: 28,
                className: 'text-[#F15A22]'
              })}
              <h2 className="text-2xl font-semibold text-gray-900">
                {sections[activeSection].title}
              </h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                {sections[activeSection].content}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-5 h-5" />
                <p>Questions? Contact support@mealmind.com</p>
              </div>
              <button className="bg-[#F15A22] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#d94d1a] transition-colors duration-200">
                Accept Terms
              </button>
            </div>
          </div>
          <Link to="/">
          <button className="bg-[#F15A22] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#d94d1a] transition-colors duration-200">
               Back
              </button>
              </Link>
        </div>
      </div>

    </div>
  );
};

export default TermsOfService;