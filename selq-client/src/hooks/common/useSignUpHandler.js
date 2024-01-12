import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUpHandler } from '../../apis/auth';

export const useSignUpHandler = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => signUpHandler(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (error) => {
      console.log('Sign Up Error', error.message);
    },
  });
};
