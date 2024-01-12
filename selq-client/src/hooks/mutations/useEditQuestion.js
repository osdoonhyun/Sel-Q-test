import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editQuestion } from '../../apis/questionManagement';
import { questionKeys } from '../../constant/queryKeyFactory';

export const useEditQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => editQuestion(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.all,
      });
    },
    onError: (error) => {
      console.log('Edit Question Error', error.message);
      alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      throw new Error();
    },
  });
};
