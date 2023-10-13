import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serverApi } from '../api';

const registerQuestion = async (formData) => {
  const { question, answer, token } = formData;

  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const { data } = await serverApi.post('/questions', question, config);
    const questionId = data.body.id;

    const { status } = await serverApi.post('/answers', {
      answers: answer.answers,
      question: questionId,
    });
    return { status, questionId };
  } catch (error) {
    throw error;
  }
};

const useRegisterQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => registerQuestion(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['register'],
      });
    },
    onError: (error) => {
      console.log('Register Question Error', error.message);
    },
  });
};

const editQuestion = async (formData) => {
  const { questionId, editData, token } = formData;

  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const { status } = await serverApi.patch(
      `/questions/${questionId}`,
      editData,
      config
    );

    if (status === 200) {
      return { status, questionId };
    }
  } catch (error) {
    throw error;
  }
};

const useEditQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => editQuestion(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['edit'],
      });
    },
    onError: (error) => {
      console.log('Edit Question Error', error.message);
    },
  });
};

export { useRegisterQuestion, useEditQuestion };
