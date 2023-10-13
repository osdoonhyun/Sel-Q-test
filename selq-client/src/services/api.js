import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const serverApi = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

const getQuestionsByCategory = async (category) => {
  let url = '/questions';

  if (category.toLowerCase() !== 'all') {
    url += `?category=${category.toLowerCase()}`;
  }
  const response = await serverApi.get(url);

  return response.data.body.data;
};

const useQuestionsQuery = ({ category }) => {
  const queryData = useQuery(['questions', category], () =>
    getQuestionsByCategory(category)
  );

  return queryData;
};

const getAllQuestions = async () => {
  const response = await serverApi.get('/questions', {
    params: {
      take: 50,
    },
  });

  return response.data.body;
};

const useAllQuestionsQuery = () => {
  const queryData = useQuery(['questions'], getAllQuestions);

  return queryData;
};

const getQueryString = (filterOption) => {
  const { 카테고리, 중요도, 날짜 } = filterOption;
  let queryString = '';

  if (날짜 === '최신순') {
    queryString += '&order=DESC';
  } else if (날짜 === '오래된순') {
    queryString += '&order=ASC';
  }

  if (카테고리 && 카테고리.length > 0) {
    const categoryLabels = 카테고리.map((category) => category.label);
    queryString += `&category=${categoryLabels.join('&category=')}`;
  }

  if (중요도 && 중요도.length > 0) {
    const importanceLabels = 중요도.map((importance) => importance.label);
    queryString += `&importance=${importanceLabels.join('&importance=')}`;
  }
  return queryString;
};

const getFilteredQuestions = async (page, queryString) => {
  const response = await serverApi.get(`/questions?${queryString}`, {
    params: {
      take: 10,
      page,
    },
  });

  return response.data.body;
};

const parseFilterOptionsToQueryKeys = (filterOption) => {
  const parsedFilter = {};

  for (const key in filterOption) {
    const value = filterOption[key];
    if (Array.isArray(value)) {
      parsedFilter[key] = value.map((item) => item.label);
    } else {
      parsedFilter[key] = value;
    }
  }

  for (const key in parsedFilter) {
    if (Array.isArray(parsedFilter[key]) && parsedFilter[key].length === 0) {
      delete parsedFilter[key];
    }
  }

  return parsedFilter;
};

const useFilteredQuestionQuery = (currentPage, filterOption) => {
  const queryString = getQueryString(filterOption);
  const filterKey = parseFilterOptionsToQueryKeys(filterOption);

  const queryKey =
    Object.keys(filterKey).length > 0
      ? ['questions', currentPage, filterKey]
      : ['questions', currentPage];

  const queryData = useQuery(
    queryKey,
    () => getFilteredQuestions(currentPage, queryString),
    {
      keepPreviousData: true,
    }
  );

  return queryData;
};

const getQuestionDetailById = async (questionId) => {
  try {
    const response = await serverApi.get(`/questions/${questionId}`);
    if (response.status === 200) {
      return response.data.body;
    }
  } catch (error) {
    console.log('Get Question Detail Error', error.message);
  }
};

const useQuestionDetailQuery = (questionId) => {
  const queryKey = ['question', questionId];
  const queryData = useQuery(queryKey, () => getQuestionDetailById(questionId));

  return queryData;
};

const getQuestionsByImportance = async (page) => {
  const params = {
    params: {
      take: 5,
      page,
    },
  };
  const response = await serverApi.get('/questions', params);

  return response.data.body;
};

const filterImportantQuestions = (questions, filterOption) => {
  switch (filterOption) {
    case '높은순':
      return questions?.sort((a, b) => b.importance - a.importance);
    case '낮은순':
      return questions?.sort((a, b) => a.importance - b.importance);
    default:
      break;
  }

  return questions;
};

const useImportantQuestionsQuery = (currentPage, filterOption) => {
  const queryData = useQuery(
    ['questions', currentPage],
    () => getQuestionsByImportance(currentPage),
    {
      select: (data) => ({
        ...data,
        questions: filterImportantQuestions(data.data, filterOption),
      }),
      keepPreviousData: true,
    }
  );

  return queryData;
};

const getQuestionsByKeyword = async (keyword) => {
  const response = await serverApi.get('/questions');

  const filteredQuestions = response.data.body.data.filter((question) => {
    const lowQuestion = question.question.toLowerCase().trim();
    const lowercaseKeyword = keyword.toLowerCase().trim();

    return lowQuestion.includes(lowercaseKeyword);
  });

  return filteredQuestions;
};

const useSearchQuestionsQuery = ({ searchInput: keyword }) => {
  const queryKey = keyword.length > 0 ? ['questions', keyword] : ['questions'];
  const queryData = useQuery(queryKey, () => getQuestionsByKeyword(keyword));

  return queryData;
};

export {
  useQuestionsQuery,
  useAllQuestionsQuery,
  useFilteredQuestionQuery,
  useQuestionDetailQuery,
  useImportantQuestionsQuery,
  useSearchQuestionsQuery,
  serverApi,
};
