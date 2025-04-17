// src/components/common/CategoryNav.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategories } from '../../features/categories/categoriesSlice';

const CategoryNav = ({ categories }) => {
  const dispatch = useDispatch();
  const { selectedCategories } = useSelector(state => state.categories);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const scrollRef = useRef(null);
  
  // Add resize listener to detect mobile/desktop view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleCategoryClick = (category) => {
    // If already selected, do nothing
    if (selectedCategories.includes(category)) {
      return;
    }
    
    // Update selected categories
    const newSelected = [...selectedCategories, category];
    dispatch(setSelectedCategories(newSelected));
    
    // Subscribe to new categories via socket
    dispatch({ type: 'socket/subscribe', payload: { categories: newSelected } });
    
    // On mobile, close the dropdown after selection
    if (isMobile && showAllCategories) {
      setShowAllCategories(false);
    }
  };
  
  // Implement horizontal scrolling for desktop
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  // For mobile: show limited categories or all based on toggle
  const visibleCategories = isMobile && !showAllCategories 
    ? categories.slice(0, 3) // Show only first 3 on mobile by default
    : categories;
  
  return (
    <div className="mt-4 relative">
      {/* Desktop view with horizontal scroll */}
      <div className="hidden md:flex items-center">
        <button 
          onClick={scrollLeft}
          className="absolute left-0 z-10 bg-gradient-to-r from-blue-600 to-transparent px-2 h-full flex items-center"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <div 
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide px-6 flex space-x-2 pb-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map(category => (
            <Link 
              key={category} 
              to={`/category/${category}`}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                selectedCategories.includes(category)
                  ? 'bg-white text-blue-600'
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
        
        <button 
          onClick={scrollRight}
          className="absolute right-0 z-10 bg-gradient-to-l from-blue-600 to-transparent px-2 h-full flex items-center"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      
      {/* Mobile view with dropdown */}
      <div className="md:hidden">
        <div className="flex flex-wrap gap-2 pb-2">
          {visibleCategories.map(category => (
            <Link 
              key={category} 
              to={`/category/${category}`}
              onClick={() => handleCategoryClick(category)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                selectedCategories.includes(category)
                  ? 'bg-white text-blue-600'
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              {category}
            </Link>
          ))}
          
          {categories.length > 3 && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              {showAllCategories ? 'Show Less' : `+${categories.length - 3} More`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
