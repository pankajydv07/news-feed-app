// src/components/layout/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    // Dispatch logout action
    dispatch({ type: 'user/logout' });
    
    // Disconnect from socket
    dispatch({ type: 'socket/disconnect' });
    
    // Navigate to home
    navigate('/');
  };
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full ${
        isScrolled 
          ? 'bg-white shadow-md border-b border-gray-200' 
          : 'bg-white/80 backdrop-blur-md'
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 012 10z"></path>
              </svg>
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">NewsStream</span>
            </Link>
          </div>
          
          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`font-medium hover:text-blue-600 transition-colors duration-200 ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-700'}`}
            >
              Home
            </Link>
            <Link 
              to="/category/Tech" 
              className={`font-medium hover:text-blue-600 transition-colors duration-200 ${location.pathname === '/category/Tech' ? 'text-blue-600' : 'text-gray-700'}`}
            >
              Technology
            </Link>
            <Link 
              to="/category/Business" 
              className={`font-medium hover:text-blue-600 transition-colors duration-200 ${location.pathname === '/category/Business' ? 'text-blue-600' : 'text-gray-700'}`}
            >
              Business
            </Link>
            <Link 
              to="/category/Sports" 
              className={`font-medium hover:text-blue-600 transition-colors duration-200 ${location.pathname === '/category/Sports' ? 'text-blue-600' : 'text-gray-700'}`}
            >
              Sports
            </Link>
            <Link 
              to="/category/Entertainment" 
              className={`font-medium hover:text-blue-600 transition-colors duration-200 ${location.pathname === '/category/Entertainment' ? 'text-blue-600' : 'text-gray-700'}`}
            >
              Entertainment
            </Link>
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${userMenuOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="font-medium text-gray-900 truncate">{user.username}</div>
                        <div className="text-sm text-gray-500 truncate">{user.email}</div>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Your Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors duration-200 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span className="font-medium">Profile</span>
                </Link>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/category/Tech" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/category/Tech' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              Technology
            </Link>
            
            <Link 
              to="/category/Business" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/category/Business' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              Business
            </Link>
            
            <Link 
              to="/category/Sports" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/category/Sports' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              Sports
            </Link>
            
            <Link 
              to="/category/Entertainment" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/category/Entertainment' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              Entertainment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
