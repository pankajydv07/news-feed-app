// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import CategoryPage from './components/pages/CategoryPage';
import ProfilePage from './components/pages/ProfilePage';
import NewsDetailPage from './components/pages/NewsDetailPage';
import { fetchCategories } from './features/categories/categoriesSlice';
import { fetchTrendingNews } from './features/news/newsSlice';
import { API_URL } from './config';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Initialize socket connection
    dispatch({ type: 'socket/connect', payload: { url: API_URL } });
    
    // Fetch initial data
    dispatch(fetchCategories());
    dispatch(fetchTrendingNews({ limit: 5 }));
    
    // Cleanup socket on unmount
    return () => {
      dispatch({ type: 'socket/disconnect' });
    };
  }, [dispatch]);
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
