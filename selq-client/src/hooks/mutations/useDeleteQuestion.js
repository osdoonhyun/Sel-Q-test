import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuestion } from '../../apis/questionManagement';
import { questionKeys } from '../../constant/queryKeyFactory';

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => deleteQuestion(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: questionKeys.all });
    },
    onError: (error) => {
      console.log('Delete Question Error', error.message);
      alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      throw new Error();
    },
  });
};
