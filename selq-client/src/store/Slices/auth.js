import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverApi } from '../../services/api';
import { getCookie, removeCookie } from '../../config/cookie';

const logIn = createAsyncThunk('user/logIn', async (userInput) => {
  try {
    const { status } = await serverApi.post('/auth/login', userInput);

    if (status === 200) {
      return getCookie('Authentication');
    }
  } catch (error) {
    throw error?.response?.data?.message;
  }
});

const getUserInfo = createAsyncThunk('user/userInfo', async (_, thunkAPI) => {
  const accessToken = sessionStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  try {
    const { data, status } = await serverApi.get('/auth', config);
    if (status === 200) {
      return { userInfo: data?.body, token: accessToken };
    }
  } catch (error) {
    if (error?.response?.statusText === 'Unauthorized') {
      return getNewAccessToken(thunkAPI);
    } else {
      throw error;
    }
  }
});

const getNewAccessToken = async (thunkAPI) => {
  const refreshToken = getCookie('Refresh');
  try {
    const newAccessToken = await thunkAPI.dispatch(
      refreshAccessToken(refreshToken)
    );
    sessionStorage.setItem('accessToken', newAccessToken.payload);
    thunkAPI.dispatch(getUserInfo());
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: 'Failed to refresh accessToken',
    });
  }
};

const refreshAccessToken = createAsyncThunk(
  'user/refreshAccessToken',
  async (refreshToken) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + refreshToken,
      },
    };

    try {
      const { status } = await serverApi.get('/auth/refresh', config);

      if (status === 200) {
        const newAccessToken = getCookie('Authentication');
        return newAccessToken;
      }
    } catch (error) {
      throw error;
    }
  }
);

const logOut = createAsyncThunk('user/logOut', () => {
  sessionStorage.removeItem('accessToken');
  removeCookie('Authentication');
  removeCookie('Refresh');
});

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      sessionStorage.setItem('accessToken', action.payload);
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
      state.token = action.payload?.token;
      console.log('유저정보 가져오기 성공!', state, action);
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      console.log('유저정보 가져오기 실패!', action);
    });
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      console.log('토큰 재발급 성공!+++++++++++', state, action);
      state.token = action.payload;
    });
    builder.addCase(refreshAccessToken.rejected, (state, action) => {
      state.error = action.error.message;
      console.log('토큰 재발급 실패!', action);
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      state.token = null;
      console.log('로그아웃 성공!!', state, action);
    });
    builder.addCase(logOut.rejected, (state, action) => {
      console.log('로그아웃 실패!!', state, action);
    });
  },
});

export { userSlice, getUserInfo, logIn, logOut };
