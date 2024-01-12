export const getQueryString = (filterOption) => {
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
