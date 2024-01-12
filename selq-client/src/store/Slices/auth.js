import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie, removeCookie } from '../../config/cookie';
import { api, authApi } from '../../apis/api';

const logIn = createAsyncThunk('user/logIn', async (userInput) => {
  try {
    const { data, status } = await api.post('/auth/login', userInput);

    if (status === 200) {
      return { logInUserInfo: data.body };
    }
  } catch (error) {
    throw error?.response?.data?.message;
  }
});

const getUserInfo = createAsyncThunk('user/userInfo', async () => {
  try {
    const { data, status } = await authApi.get('/auth');
    if (status === 200) {
      return { userInfo: data?.body };
    }
  } catch (error) {
    throw error?.response?.data?.message;
  }
});

const refreshAuth = async () => {
  const refreshToken = getCookie('Refresh');
  const config = {
    headers: {
      Authorization: 'Bearer ' + refreshToken,
    },
  };

  try {
    const { status } = await api.get('/auth/refresh', config);

    if (status === 200) {
      const newAccessToken = getCookie('Authentication');
      return newAccessToken;
    }
  } catch (error) {
    throw error;
  }
};

const logOut = createAsyncThunk('user/logOut', () => {
  removeCookie('Authentication');
  removeCookie('Refresh');
});

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload?.logInUserInfo;
      console.log('로그인 성공!');
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
      console.log('로그인 실패!');
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload?.userInfo;
      console.log('유저정보 가져오기 성공!', state, action);
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      console.log('유저정보 가져오기 실패!', action);
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      console.log('로그아웃 성공!!', state, action);
    });
    builder.addCase(logOut.rejected, (state, action) => {
      console.log('로그아웃 실패!!', state, action);
    });
  },
});

export { userSlice, refreshAuth, getUserInfo, logIn, logOut };
