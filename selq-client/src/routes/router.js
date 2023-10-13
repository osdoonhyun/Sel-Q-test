import Home from '../pages/Home';
import CategoryQuestions from '../pages/CategoryQuestions';
import ImportantQuestionsList from '../pages/ImportantQuestions';
import QuestionDetail from '../pages/QuestionDetail';
import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import SignUp from '../pages/SignUp';
import LogIn from '../pages/LogIn';
import ResetPassword from '../pages/ResetPassword';
import PostingQuestion from '../pages/PostingQuestion';
import MyPage from '../pages/MyPage';
import UsersManagement from '../pages/UserManagement';
import EditQuestion from '../pages/EditQuestion';
import BookmarkedQuestions from '../pages/BookmarkedQuestions';
import QuestionManagement from '../pages/QuestionManagement';
import SocialSignUp from '../components/common/SocialSignUp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: '/questions', element: <CategoryQuestions /> },
      { path: '/questions/:questionId', element: <QuestionDetail /> },
      { path: '/importants', element: <ImportantQuestionsList /> },
      { path: '/importants/:questionId', element: <QuestionDetail /> },
      { path: '/bookmarks', element: <BookmarkedQuestions /> },
      { path: '/password/new', element: <ResetPassword /> },
      { path: '/user', element: <MyPage /> },
      { path: '/signup/social', element: <SocialSignUp /> },

      { path: '/admin/post/question', element: <PostingQuestion /> },
      { path: '/admin/edit/question/:questionId', element: <EditQuestion /> },
      { path: '/admin/users', element: <UsersManagement /> },
      { path: '/admin/questions', element: <QuestionManagement /> },
    ],
  },
  { path: '/login', element: <LogIn /> },
  { path: '/signup', element: <SignUp /> },
]);
