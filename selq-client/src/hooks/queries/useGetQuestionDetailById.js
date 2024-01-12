import { useQuery } from '@tanstack/react-query';
import { getQuestionDetailById } from '../../apis/questions';
import { questionKeys } from '../../constant/queryKeyFactory';

export const useQuestionDetailQuery = (questionId) => {
  const queryData = useQuery(
    questionKeys.detail(questionId),
    () => getQuestionDetailById(questionId),
    { staleTime: 5 * 60 * 1000 }
  );

  return queryData;
};
