import { api, authApi } from './api';

// 질문, 답변 등록 (admin)
export const registerQuestion = async (formData) => {
  const { question, answer } = formData;

  const { data } = await authApi.post('/questions', question);

  const questionId = data.body.id;

  const { status } = await api.post('/answers', {
    answers: answer.answers,
    question: questionId,
  });

  return { status, questionId };
};

// 질문 수정 (admin)
export const editQuestion = async (formData) => {
  const { questionId, editData } = formData;

  const { status } = await authApi.patch(`/questions/${questionId}`, editData);

  return { status, questionId };
};

// 질문 삭제 (admin)
export const deleteQuestion = async (formData) => {
  const { deletedId } = formData;

  const { data } = await authApi.delete(`/questions/${deletedId?.id}`);

  return data.body;
};
