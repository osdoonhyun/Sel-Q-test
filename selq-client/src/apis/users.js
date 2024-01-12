import { api, authApi } from './api';

// 유저 정보 조회
export const getUsers = async (page) => {
  const params = {
    params: {
      take: 10,
      page,
    },
  };
  const response = await api.get('/users', params);

  return response.data.body;
};

// 유저 정보 수정 - Admin
export const updateUserInfoByAdmin = async ({ userId, updatedInfo }) => {
  const { data } = await authApi.patch(`/users/${userId}`, updatedInfo);
  return data.body;
};

// 유저 정보 수정 - User
export const updateUserInfoByUser = async ({ updatedInfo }) => {
  const { data } = await authApi.patch('/auth/update', updatedInfo);

  return data.body;
};

// TODO: 유저 정보 삭제 API가 아직 안나옴
