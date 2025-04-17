// src/components/news/NewsCardSkeleton.js
import React from 'react';

const NewsCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="h-5 w-12 bg-gray-300 rounded"></div>
            <div className="h-5 w-12 bg-gray-300 rounded"></div>
          </div>
          <div className="h-5 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
