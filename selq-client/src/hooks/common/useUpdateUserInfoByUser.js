import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfoByUser } from '../../apis/users';
import { userKeys } from '../../constant/queryKeyFactory';

export const useUpdateUserInfoByUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedInfo) => updateUserInfoByUser(updatedInfo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(data.id),
      });
    },
    onError: (error) => {
      console.log('User Update Error', error.message);
      alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      throw new Error();
    },
  });
};
