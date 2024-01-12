export const MENU_PAGES = [
  { path: '/', label: '홈' },
  { path: '/questions', label: '질문목록' },
  { path: '/importants', label: '중요질문' },
  { path: '/bookmarks', label: '북마크' },
];

export const PATH = {
  HOME: '/',
  QUESTIONS: '/questions',
  QUESTIONS_DETAIL: '/questions/:questionId',
  IMPORTANTS: '/importants',
  IMPORTANTS_DETAIL: '/importants/:questionId',
  BOOKMARK: '/bookmarks',
  BOOKMARK_DETAIL: '/bookmarks/:questionId',
  NEW_PASSWORD: '/password/new',
  USER_INFO: '/user',
  ADMIN: '/admin',
  POST_QUESTION: 'post/question',
  EDIT_QUESTION: 'edit/question/:questionId',
  USERS_MANAGEMENT: 'users',
  QUESTIONS_MANAGEMENT: 'questions',
  LOGIN: '/login',
  SIGN_UP: 'signup',
  SOCIAL_SIGN_UP: '/signup/social',
};
