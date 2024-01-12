import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkRegisteredEmail } from '../../apis/auth';

export const useCheckRegisteredEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email) => checkRegisteredEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['email'],
      });
    },
    onError: (error) => {
      console.log('Verify Registered Email Error', error.message);
      alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      throw new Error();
    },
  });
};
