import { api } from './api';

const questionsParams = {
  params: {
    take: 50,
  },
};

export const getQuestions = async () => {
  const response = await api.get('/questions', questionsParams);

  return response.data.body.data;
};

export const getQuestionsByCategory = async (category) => {
  let url = '/questions';

  if (category.toLowerCase() !== 'all') {
    url += `?category=${category.toLowerCase()}`;
  }
  const response = await api.get(url, questionsParams);

  return response.data.body.data;
};

export const getQuestionDetailById = async (questionId) => {
  const response = await api.get(`/questions/${questionId}`);

  return response.data.body;
};

export const getQuestionsByKeyword = async (keyword) => {
  const response = await api.get('/questions', questionsParams);

  const filteredQuestions = response.data.body.data.filter((question) => {
    const lowQuestion = question.question.toLowerCase().trim();
    const lowercaseKeyword = keyword.toLowerCase().trim();

    return lowQuestion.includes(lowercaseKeyword);
  });

  return filteredQuestions;
};

export const getQuestionsByFilteringOption = async (page, queryString) => {
  const response = await api.get(`/questions?${queryString}`, {
    params: {
      take: 10,
      page,
    },
  });

  return response.data.body;
};
