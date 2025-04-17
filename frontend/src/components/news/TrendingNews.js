// src/components/news/TrendingNews.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrendingNews } from '../../features/news/newsSlice';
import { formatDate } from '../../utils/dateUtils';

const TrendingNews = () => {
  const dispatch = useDispatch();
  const { trendingNews, trendingLoading, error } = useSelector(state => state.news);
  
  useEffect(() => {
    dispatch(fetchTrendingNews({ limit: 5 }));
  }, [dispatch]);
  
  if (trendingLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
        {Array(5).fill().map((_, index) => (
          <div key={index} className="mb-3">
            <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Trending News</h2>
        <p className="text-red-500">Error loading trending news</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Trending News</h2>
      {trendingNews.length > 0 ? (
        <ul className="space-y-3">
          {trendingNews.map(news => (
            <li key={news._id} className="border-b border-gray-200 pb-2 last:border-0">
              <Link to={`/news/${news._id}`} className="block hover:text-blue-600">
                <h3 className="font-medium">{news.title}</h3>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{news.category}</span>
                  <span>{formatDate(news.createdAt)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No trending news available</p>
      )}
    </div>
  );
};

export default TrendingNews;
