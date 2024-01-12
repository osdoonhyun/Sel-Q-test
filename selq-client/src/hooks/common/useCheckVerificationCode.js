import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkVerificationCode } from '../../apis/auth';

export const useCheckVerificationCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => checkVerificationCode(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['check'],
      });
    },
    onError: (error) => {
      console.log('Check Email Verifiaction Error', error.message);
    },
  });
};
