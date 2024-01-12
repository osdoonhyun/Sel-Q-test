import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendVerificationCode } from '../../apis/auth';

export const useSendVerificationCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email) => sendVerificationCode(email),
    onSuccess: (userEmail) => {
      queryClient.invalidateQueries({
        queryKey: ['send', userEmail],
      });
    },
    onError: (error) => {
      console.log('Send Email Verification Error', error.message);
    },
  });
};
