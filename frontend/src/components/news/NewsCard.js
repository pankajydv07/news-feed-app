// src/components/news/NewsCard.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viewNews, likeNews } from '../../features/news/newsSlice';
import { formatDate } from '../../utils/dateUtils';

const NewsCard = ({ news }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleView = () => {
    dispatch(viewNews(news._id));
    navigate(`/news/${news._id}`);
  };
  
  const handleLike = () => {
    dispatch(likeNews(news._id));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      {news.imageUrl && (
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
            {news.category}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(news.createdAt)}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2">{news.title}</h3>
        <p className="text-gray-600 mb-4">{news.summary}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              {news.views}
            </span>
            <button 
              onClick={handleLike}
              className="flex items-center hover:text-red-500"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              {news.likes}
            </button>
          </div>
          <button 
            onClick={handleView}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
