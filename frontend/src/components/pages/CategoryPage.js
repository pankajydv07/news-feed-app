// src/components/pages/CategoryPage.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NewsList from '../news/NewsList';
import TrendingNews from '../news/TrendingNews';
import { fetchNewsByCategory } from '../../features/news/newsSlice';
import { selectCategory } from '../../features/categories/categoriesSlice';

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { categoryNews, categoryLoading, error } = useSelector(state => state.news);
  const { selectedCategories } = useSelector(state => state.categories);
  
  useEffect(() => {
    dispatch(fetchNewsByCategory({ category, page: 1, limit: 9 }));
    
    // Add to selected categories if not already selected
    if (!selectedCategories.includes(category)) {
      dispatch(selectCategory(category));
      dispatch({ 
        type: 'socket/subscribe', 
        payload: { categories: [category] } // Only send the current category
      });
    }
  }, [category, dispatch, selectedCategories]);
  
  const newsForCategory = categoryNews[category] || [];
  
  // Get category color based on category name
  const getCategoryColor = () => {
    const colors = {
      'Tech': 'from-blue-500 to-indigo-600',
      'Business': 'from-emerald-500 to-green-600',
      'Sports': 'from-orange-500 to-red-600',
      'Entertainment': 'from-purple-500 to-pink-600',
      'Science': 'from-cyan-500 to-blue-600',
      'Health': 'from-green-500 to-teal-600'
    };
    return colors[category] || 'from-blue-500 to-indigo-600';
  };

  // Get category icon
  const getCategoryIcon = () => {
    switch(category) {
      case 'Tech':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        );
      case 'Business':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        );
      case 'Sports':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
          </svg>
        );
    }
  };
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Header */}
      <div className={`relative bg-gradient-to-r ${getCategoryColor()} rounded-xl shadow-lg overflow-hidden mb-10`}>
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="relative z-10 px-8 py-10 sm:py-12 text-white flex items-center">
          <div className="mr-6 bg-white bg-opacity-20 p-3 rounded-lg">
            {getCategoryIcon()}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              {category} News
            </h1>
            <p className="text-lg text-blue-100">
              The latest updates from the world of {category.toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Latest {category} Stories</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {newsForCategory.length} Articles
              </span>
            </div>
            <div className="transition-all duration-500 ease-in-out">
              <NewsList 
                news={newsForCategory} 
                loading={categoryLoading} 
                error={error} 
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            <TrendingNews />
            
            {/* Related Categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Related Categories
              </h3>
              <div className="space-y-2">
                {['Tech', 'Business', 'Sports', 'Entertainment', 'Science', 'Health']
                  .filter(cat => cat !== category)
                  .slice(0, 4)
                  .map(cat => (
                    <a key={cat} href={`/category/${cat}`} className="block p-2 bg-gray-50 hover:bg-blue-50 rounded text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      {cat}
                    </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add a pattern background */}
      <style jsx>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;
