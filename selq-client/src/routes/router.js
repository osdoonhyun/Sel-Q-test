import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import CategoryQuestions from '../pages/CategoryQuestions';
import ImportantQuestionsList from '../pages/ImportantQuestions';
import QuestionDetail from '../pages/QuestionDetail';
import Root from './Root';
import SignUp from '../pages/SignUp';
import LogIn from '../pages/LogIn';
import ResetPassword from '../pages/ResetPassword';
import PostingQuestion from '../pages/PostingQuestion';
import MyPage from '../pages/MyPage';
import EditQuestion from '../pages/EditQuestion';
import BookmarkedQuestions from '../pages/BookmarkedQuestions';
import SocialSignUp from '../components/SocialSignUp';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import ManagementSkeleton from '../components/ManagementSkeleton';
import { PATH } from '../constant/paths';

const UsersManagement = lazy(() => import('../pages/UsersManagement'));
const QuestionsManagement = lazy(() => import('../pages/QuestionsManagement'));

export const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> },
      { path: PATH.QUESTIONS, element: <CategoryQuestions /> },
      { path: PATH.QUESTIONS_DETAIL, element: <QuestionDetail /> },
      { path: PATH.IMPORTANTS, element: <ImportantQuestionsList /> },
      { path: PATH.IMPORTANTS_DETAIL, element: <QuestionDetail /> },
      { path: PATH.BOOKMARK, element: <BookmarkedQuestions /> },
      { path: PATH.BOOKMARK_DETAIL, element: <QuestionDetail /> },
      { path: PATH.NEW_PASSWORD, element: <ResetPassword /> },
      { path: PATH.USER_INFO, element: <MyPage /> },
      { path: PATH.SOCIAL_SIGN_UP, element: <SocialSignUp /> },
    ],
  },
  {
    path: PATH.ADMIN,
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: PATH.POST_QUESTION,
        element: (
          <PrivateRoute isOnlyAdminAllowed>
            <PostingQuestion />
          </PrivateRoute>
        ),
      },
      {
        path: PATH.EDIT_QUESTION,
        element: (
          <PrivateRoute isOnlyAdminAllowed>
            <EditQuestion />
          </PrivateRoute>
        ),
      },
      {
        path: PATH.USERS_MANAGEMENT,
        element: (
          <Suspense fallback={<ManagementSkeleton pageOption={'user'} />}>
            <PrivateRoute isOnlyAdminAllowed>
              <UsersManagement />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: PATH.QUESTIONS_MANAGEMENT,
        element: (
          <Suspense fallback={<ManagementSkeleton pageOption={'question'} />}>
            <PrivateRoute isOnlyAdminAllowed>
              <QuestionsManagement />
            </PrivateRoute>
          </Suspense>
        ),
      },
    ],
  },
  { path: PATH.LOGIN, element: <LogIn /> },
  { path: PATH.SIGN_UP, element: <SignUp /> },
]);
