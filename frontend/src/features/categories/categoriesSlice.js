// src/features/categories/categoriesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../services/categoryService';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  categories: [],
  selectedCategories: [], // We'll keep the array structure but enforce only one item
  loading: false,
  error: null
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      // Replace the entire array with just the selected category
      state.selectedCategories = [action.payload];
    },
    unselectCategory: (state) => {
      // Clear all selections
      state.selectedCategories = [];
    },
    setSelectedCategories: (state, action) => {
      // Ensure we only set one category at a time
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        state.selectedCategories = [action.payload[action.payload.length - 1]]; // Take only the last one
      } else {
        state.selectedCategories = [];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { selectCategory, unselectCategory, setSelectedCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
