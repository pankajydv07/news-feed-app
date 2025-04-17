// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (email, { rejectWithValue }) => {
    try {
      return await userService.getUserByEmail(email);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createOrUpdateUser = createAsyncThunk(
  'user/createOrUpdateUser',
  async (userData, { rejectWithValue }) => {
    try {
      return await userService.createOrUpdateUser(userData);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSubscriptions = createAsyncThunk(
  'user/updateSubscriptions',
  async ({ email, subscribedCategories }, { rejectWithValue }) => {
    try {
      return await userService.updateSubscriptions(email, subscribedCategories);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(createOrUpdateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(createOrUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(updateSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(updateSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
