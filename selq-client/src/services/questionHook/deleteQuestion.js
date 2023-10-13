import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serverApi } from '../api';

const deleteQuestion = async ({ deletedId, token }) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    const { data } = await serverApi.delete(`/questions/${deletedId}`, config);

    if (data.body === 200) {
      return data.body;
    }
  } catch (error) {
    throw error;
  }
};

const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
    onError: (error) => {
      console.log('Delete Question Error', error.message);
    },
  });
};

export { useDeleteQuestion };
