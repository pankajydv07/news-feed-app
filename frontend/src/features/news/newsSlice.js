// src/features/news/newsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newsService from '../../services/newsService';

// Async thunks
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      return await newsService.getNews(page, limit);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchNewsByCategory = createAsyncThunk(
  'news/fetchNewsByCategory',
  async ({ category, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      return await newsService.getNewsByCategory(category, page, limit);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTrendingNews = createAsyncThunk(
  'news/fetchTrendingNews',
  async ({ limit = 5 }, { rejectWithValue }) => {
    try {
      return await newsService.getTrendingNews(limit);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const viewNews = createAsyncThunk(
  'news/viewNews',
  async (id, { rejectWithValue }) => {
    try {
      return await newsService.updateViews(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const likeNews = createAsyncThunk(
  'news/likeNews',
  async (id, { rejectWithValue }) => {
    try {
      return await newsService.likeNews(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  news: [],
  trendingNews: [],
  categoryNews: {},
  currentPage: 1,
  totalPages: 0,
  total: 0,
  loading: false,
  trendingLoading: false,
  categoryLoading: false,
  error: null
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    newsReceived: (state, action) => {
      // Add new news to the beginning of the array
      state.news = [action.payload, ...state.news];
      
      // Also add to category news if applicable
      const category = action.payload.category;
      if (state.categoryNews[category]) {
        state.categoryNews[category] = [action.payload, ...state.categoryNews[category]];
      }
    },
    trendingNewsReceived: (state, action) => {
      // Check if news is already in trending list
      const exists = state.trendingNews.some(item => item._id === action.payload._id);
      if (!exists) {
        state.trendingNews = [action.payload, ...state.trendingNews].slice(0, 5);
      }
    },
    clearNews: (state) => {
      state.news = [];
      state.currentPage = 1;
      state.totalPages = 0;
      state.total = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchNews
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchTrendingNews
      .addCase(fetchTrendingNews.pending, (state) => {
        state.trendingLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingNews.fulfilled, (state, action) => {
        state.trendingLoading = false;
        state.trendingNews = action.payload.data;
      })
      .addCase(fetchTrendingNews.rejected, (state, action) => {
        state.trendingLoading = false;
        state.error = action.payload;
      })
      
      // Handle fetchNewsByCategory
      .addCase(fetchNewsByCategory.pending, (state) => {
        state.categoryLoading = true;
        state.error = null;
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.categoryNews = {
          ...state.categoryNews,
          [action.meta.arg.category]: action.payload.data
        };
      })
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.categoryLoading = false;
        state.error = action.payload;
      })
      
      // Handle viewNews and likeNews
      .addCase(viewNews.fulfilled, (state, action) => {
        const updatedNews = action.payload.data;
        // Update in main news list
        state.news = state.news.map(item => 
          item._id === updatedNews._id ? updatedNews : item
        );
        
        // Update in trending news list
        state.trendingNews = state.trendingNews.map(item => 
          item._id === updatedNews._id ? updatedNews : item
        );
        
        // Update in category news list
        if (state.categoryNews[updatedNews.category]) {
          state.categoryNews[updatedNews.category] = state.categoryNews[updatedNews.category].map(
            item => item._id === updatedNews._id ? updatedNews : item
          );
        }
      })
      .addCase(likeNews.fulfilled, (state, action) => {
        const updatedNews = action.payload.data;
        // Update in main news list
        state.news = state.news.map(item => 
          item._id === updatedNews._id ? updatedNews : item
        );
        
        // Update in trending news list
        state.trendingNews = state.trendingNews.map(item => 
          item._id === updatedNews._id ? updatedNews : item
        );
        
        // Update in category news list
        if (state.categoryNews[updatedNews.category]) {
          state.categoryNews[updatedNews.category] = state.categoryNews[updatedNews.category].map(
            item => item._id === updatedNews._id ? updatedNews : item
          );
        }
      });
  }
});

export const { newsReceived, trendingNewsReceived, clearNews } = newsSlice.actions;

export default newsSlice.reducer;
