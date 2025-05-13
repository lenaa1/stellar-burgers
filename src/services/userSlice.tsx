import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi, loginUserApi } from './../utils/burger-api';
import { TUser } from '@utils-types';

interface userState {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean;
}

const initialState: userState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async ({
    name,
    email,
    password
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const data = await registerUserApi({ name, email, password });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user as TUser;
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) =>
    (await loginUserApi(credentials)).user
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'ошибка';
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'ошибка';
      });
  }
});

export default authSlice.reducer;
