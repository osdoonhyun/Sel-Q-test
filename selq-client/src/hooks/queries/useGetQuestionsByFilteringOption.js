import { useQuery } from '@tanstack/react-query';
import { getQuestionsByFilteringOption } from '../../apis/questions';
import { parseFilterOptions } from '../../utils/parseFilterOptions';
import { getQueryString } from '../../utils/getQueryString';
import { questionKeys } from '../../constant/queryKeyFactory';

export const useGetQuestionsByFilteringOption = (currentPage, filterOption) => {
  const queryString = getQueryString(filterOption);
  const filterKey = parseFilterOptions(filterOption);

  const queryKey =
    Object.keys(filterKey).length > 0
      ? questionKeys.pageWithFilter(currentPage, filterKey)
      : questionKeys.page(currentPage);

  const queryData = useQuery(
    queryKey,
    () => getQuestionsByFilteringOption(currentPage, queryString),
    {
      keepPreviousData: true,
    }
  );

  return queryData;
};
