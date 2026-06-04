import React, { useState } from 'react';
import { Bell, User, Layout, Compass, Shield, Laptop } from 'lucide-react';

interface HeaderProps {
  currentView: 'explore' | 'dashboard';
  setView: (view: 'explore' | 'dashboard') => void;
  userEmail?: string;
  notifications: string[];
  clearNotifications: () => void;
}

export default function Header({
  currentView,
  setView,
  userEmail = 'parvinpw@gmail.com',
  notifications,
  clearNotifications,
}: HeaderProps) {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <nav className="w-full top-0 sticky z-50 bg-[#0b1326] border-b border-[#2d3449]">
      <div className="flex justify-between items-center h-16 px-4 md:px-10 max-w-7xl mx-auto">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-8">
          <div 
            onClick={() => setView('explore')}
            className="flex items-center gap-2 cursor-pointer group"
            id="nav-logo"
          >
            <span className="font-sans text-xl font-bold tracking-tight text-[#4edea3] group-hover:opacity-90 transition-opacity">
              Show-Off
            </span>
            <span className="text-[10px] bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/20 px-1.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase">
              v2.0
            </span>
          </div>

          <div className="hidden md:flex gap-6 items-center">
            <button
              onClick={() => setView('explore')}
              className={`flex items-center gap-1.5 font-medium pb-1 transition-colors duration-200 border-b-2 text-sm ${
                currentView === 'explore'
                  ? 'text-[#4edea3] border-[#4edea3] font-semibold'
                  : 'text-[#bbcabf] border-transparent hover:text-[#4edea3]'
              }`}
              id="nav-link-explore"
            >
              <Compass className="w-4 h-4" />
              Explore
            </button>
            <button
              onClick={() => setView('dashboard')}
              className={`flex items-center gap-1.5 font-medium pb-1 transition-colors duration-200 border-b-2 text-sm ${
                currentView === 'dashboard'
                  ? 'text-[#4edea3] border-[#4edea3] font-semibold'
                  : 'text-[#bbcabf] border-transparent hover:text-[#4edea3]'
              }`}
              id="nav-link-dashboard"
            >
              <Layout className="w-4 h-4" />
              My Dashboard
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              className="relative p-2 rounded-lg text-[#bbcabf] hover:text-[#4edea3] bg-[#171f33] border border-[#2d3449] transition-all hover:scale-105 active:scale-95"
              title="Notifications"
              id="notification-bell-btn"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3]" />
              )}
            </button>

            {showNotificationDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-[#171f33] border border-[#2d3449] rounded-lg shadow-2xl p-4 z-50 text-xs">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-white tracking-wide uppercase font-mono">System Events</span>
                  {notifications.length > 0 && (
                    <button
                      onClick={() => {
                        clearNotifications();
                        setShowNotificationDropdown(false);
                      }}
                      className="text-[#4edea3] font-mono hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-[#bbcabf]/60 italic py-2 text-center">No active transparency notifications.</p>
                  ) : (
                    notifications.map((notif, index) => (
                      <div key={index} className="p-2 bg-[#0b1326] rounded border border-[#2d3449] flex gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] mt-1 shrink-0" />
                        <p className="text-[#bbcabf] font-sans leading-relaxed">{notif}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 text-[#bbcabf] hover:text-[#4edea3] focus:outline-none"
              id="profile-dropdown-btn"
            >
              <div className="h-8 w-8 rounded-full bg-[#222a3d] border border-[#3c4a42] overflow-hidden">
                <img
                  alt="Developer Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB71YobwTwRVWNNj5k-D5B2XQy2thfTKAIaXsJVNuy_jMB_wredI5NLKMzcuLHWY15vVraKgv-WXjDAFsMfn_8Oqf-6PniCBsN4eWEiOpoiBOdLnE1S3XlpFOzzK4LhVPKO3OSWfq-o5Y0Gx_grLPxNwUcRzLXGjbMFIYINd7vkokgBMMXxyTVG5rpqHYPzbKx98hxYwnj0Mfjco-wAcgzQWMpg0VVrpNeBueG8WGRqC3UeE3eeHGIDc0tF9ofBHARMZVQ_XhzJZbDo"
                />
              </div>
              <span className="hidden sm:inline font-mono text-xs opacity-85">
                {userEmail.split('@')[0]}
              </span>
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-[#171f33] border border-[#2d3449] rounded-lg shadow-2xl p-4 z-50 text-xs">
                <div className="border-b border-[#2d3449] pb-2 mb-2">
                  <p className="font-semibold text-white truncate">{userEmail}</p>
                  <p className="font-mono text-[10px] text-[#4edea3] mt-0.5">Show-Off Builder</p>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setView('dashboard');
                      setShowProfileDropdown(false);
                    }}
                    className="w-full text-left p-1.5 rounded hover:bg-[#222a3d] text-[#bbcabf] flex items-center gap-1.5"
                  >
                    <Layout className="w-3.5 h-3.5" />
                    My Workspace
                  </button>
                  <button
                    onClick={() => {
                      setView('explore');
                      setShowProfileDropdown(false);
                    }}
                    className="w-full text-left p-1.5 rounded hover:bg-[#222a3d] text-[#bbcabf] flex items-center gap-1.5"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    Explore Feed
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Submenu Toolbar */}
      <div className="flex md:hidden bg-[#060e20] border-t border-[#2d3449] h-10 px-4 items-center justify-around">
        <button
          onClick={() => setView('explore')}
          className={`flex items-center gap-1 text-xs font-mono tracking-wider transition-colors ${
            currentView === 'explore' ? 'text-[#4edea3] font-bold' : 'text-[#bbcabf]'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          EXPLORE FEED
        </button>
        <div className="w-[1px] h-4 bg-[#2d3449]"></div>
        <button
          onClick={() => setView('dashboard')}
          className={`flex items-center gap-1 text-xs font-mono tracking-wider transition-colors ${
            currentView === 'dashboard' ? 'text-[#4edea3] font-bold' : 'text-[#bbcabf]'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          MY DASHBOARD
        </button>
      </div>
    </nav>
  );
}
