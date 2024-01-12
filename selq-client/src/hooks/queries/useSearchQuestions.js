import { useQuery } from '@tanstack/react-query';
import { getQuestionsByKeyword } from '../../apis/questions';
import { questionKeys } from '../../constant/queryKeyFactory';

export const useSearchQuestions = ({ searchInput: keyword }) => {
  const queryData = useQuery(
    questionKeys.keyword(keyword),
    () => getQuestionsByKeyword(keyword),
    {
      enabled: !!keyword,
      select: (questions) => questions.slice(0, 10),
    }
  );

  return queryData;
};
