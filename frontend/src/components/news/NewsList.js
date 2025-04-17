// src/components/news/NewsList.js
import React from 'react';
import NewsCard from './NewsCard';
import NewsCardSkeleton from './NewsCardSkeleton';

const NewsList = ({ news, loading, error }) => {
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading news: {error}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        // Show skeletons while loading
        Array(6).fill().map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))
      ) : news.length > 0 ? (
        // Show news cards
        news.map(item => (
          <NewsCard key={item._id} news={item} />
        ))
      ) : (
        // Show empty state
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No news articles found.</p>
        </div>
      )}
    </div>
  );
};

export default NewsList;
