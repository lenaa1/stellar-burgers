import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from './../utils/burger-api';
import { TIngredient } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';

interface ingredientsState {
  ingredients: TIngredient[] | null;
  loading: boolean;
  error: null | SerializedError;
}

const initialState: ingredientsState = {
  ingredients: null,
  loading: false,
  error: null
};

export const ingredientsThunk = createAsyncThunk(
  'ingredients/get',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ingredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ingredientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(ingredientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export default ingredientsSlice.reducer;
