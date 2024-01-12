import axios from 'axios';
import { getCookie } from '../config/cookie';
import { refreshAuth } from '../store/Slices/auth';

const {
  REACT_APP_DEPLOY_ENV: DEPLOY,
  REACT_APP_DEV_BASE_URL: DEV,
  REACT_APP_PROD_BASE_URL: PROD,
} = process.env;

const defaultConfig = {
  baseURL: DEPLOY === 'development' ? DEV : PROD,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

// 일반 API
export const api = axios.create(defaultConfig);

// 인가된 API
export const authApi = axios.create(defaultConfig);

authApi.interceptors.request.use((config) => {
  const token = getCookie('Authentication');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//TODO: 토큰 만료시
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (
      error?.response?.statusText === 'Unauthorized' &&
      config?.headers.Authorization
    ) {
      try {
        const newAccessToken = await refreshAuth();

        config.headers.Authorization = `Bearer ${newAccessToken}`;

        return authApi(config);
      } catch (error) {
        alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
        // TODO: 토큰 스토리지 삭제하기
      }
    }
  }
);
