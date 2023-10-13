import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { serverApi } from '../api';

const getUsers = async (page) => {
  const params = {
    params: {
      take: 10,
      page,
    },
  };
  const response = await serverApi.get('/users', params);

  return response.data.body;
};

const filterUsers = (users, filterOption) => {
  const { 닉네임, 날짜, 권한 } = filterOption;

  switch (닉네임) {
    case '가나다순':
      return users?.sort((a, b) => a.username.localeCompare(b.username));
    case 'abc순':
      users?.sort((a, b) => {
        const nameA = a.username.toLowerCase();
        const nameB = b.username.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      break;
    default:
      break;
  }

  switch (날짜) {
    case '최신순':
      return users?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    case '오래된순':
      return users?.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    default:
      break;
  }

  switch (권한) {
    case '유저':
      return users?.filter((user) => user.roles.includes('user'));
    case '관리자':
      return users?.filter((user) => user.roles.includes('admin'));
    default:
      break;
  }

  return users;
};

const useUsersQuery = (currentPage, filterOption) => {
  const queryData = useQuery(
    ['users', currentPage],
    () => getUsers(currentPage),
    {
      select: (data) => ({
        ...data,
        users: filterUsers(data.data, filterOption),
      }),
      keepPreviousData: true,
    }
  );

  return queryData;
};

const updateUserByAdmin = async ({ userId, updatedInfo, token }) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const { data } = await serverApi.patch(
      `/users/${userId}`,
      updatedInfo,
      config
    );
    return data.body;
  } catch (error) {
    throw error;
  }
};

const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userInfo) => updateUserByAdmin(userInfo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user', data.id],
      });
    },
    onError: (error) => {
      console.log('User Update Error', error.message);
    },
  });
};

const updateUser = async ({ updatedInfo, token }) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const { data } = await serverApi.patch('/auth/update', updatedInfo, config);

    return data.body;
  } catch (error) {
    throw error;
  }
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedInfo) => updateUser(updatedInfo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user', data.id],
      });
    },
    onError: (error) => {
      console.log('User Update Error', error.message);
    },
  });
};

export { useUsersQuery, useUpdateUserInfo, useUpdateUser };
