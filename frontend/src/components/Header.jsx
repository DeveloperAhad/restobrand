import React, { useState } from 'react';
import { Bell, Menu, User, ChevronDown } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Header = ({ onMenuClick }) => {
  const { user } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-brand-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Menu button for mobile */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-600 hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Page title can be passed as children or props */}
        </div>

        {/* Right side - Notifications and User */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-coral rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <div className="w-8 h-8 bg-brand-coral rounded-full flex items-center justify-center text-white font-medium">
                {user?.first_name?.[0] || user?.email?.[0] || 'U'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-brand-navy">
                  {user?.first_name || 'User'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.subscription_plan || 'Free Plan'}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-brand-border z-20 py-2">
                  <a
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <hr className="my-2 border-brand-border" />
                  <a
                    href="/subscription"
                    className="flex items-center px-4 py-2 text-sm text-brand-coral hover:bg-gray-100"
                  >
                    Upgrade Plan
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
