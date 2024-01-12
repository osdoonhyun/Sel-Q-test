export const questionKeys = {
  all: ['questions'],
  lists: () => [...questionKeys.all, 'list'],
  list: (filter) => [...questionKeys.lists(), filter],
  details: () => [...questionKeys.all, 'detail'],
  detail: (questionId) => [...questionKeys.details(), questionId],
  categories: () => [...questionKeys.all, 'category'],
  category: (category) => [...questionKeys.categories(), category],
  keyword: (keyword) => [...questionKeys.all, 'search', keyword],
  pages: () => [...questionKeys.all, 'page'],
  page: (pageNumber) => [...questionKeys.pages(), pageNumber],
  pageWithFilter: (pageNumber, filter) => [
    ...questionKeys.pages(),
    pageNumber,
    filter,
  ],
};

export const userKeys = {
  all: ['users'],
  lists: () => [...userKeys.all, 'list'],
  details: () => [...userKeys.all, 'detail'],
  detail: (userId) => [...userKeys.details(), userId],
  pages: () => [...userKeys.all, 'page'],
  page: (page) => [...userKeys.pages(), page],
};
