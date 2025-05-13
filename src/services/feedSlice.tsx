import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from './../utils/burger-api';

interface feedsState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  total: number;
  totalToday: number;
}

const initialState: feedsState = {
  orders: [],
  loading: true,
  error: null,
  total: 0,
  totalToday: 0
};

export const feedsThunk = createAsyncThunk('auth/login', getFeedsApi);

const feedsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(feedsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(feedsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(feedsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'ошибка';
      });
  }
});

export const selector = feedsSlice.selectors;
export default feedsSlice.reducer;
