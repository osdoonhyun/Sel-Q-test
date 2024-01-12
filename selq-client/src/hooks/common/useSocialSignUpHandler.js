import { useMutation, useQueryClient } from '@tanstack/react-query';
import { socialSignUp } from '../../apis/auth';
import { userKeys } from '../../constant/queryKeyFactory';

export const useSocialSignUpHandler = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedInfo) => socialSignUp(updatedInfo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(data.id),
      });
    },
    onError: (error) => {
      console.log('Social SignUp Error', error.message);
      alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      throw new Error();
    },
  });
};
