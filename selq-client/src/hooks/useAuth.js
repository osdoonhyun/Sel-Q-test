import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../store/Slices/auth';
// import { getUserInfo } from '../../store/slices/auth';

export default function useAuth() {
  const dispatch = useDispatch();
  const { isLoggedIn, user, token } = useSelector((state) => state.user);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      dispatch(getUserInfo());
    }
  }, [dispatch]);

  return { isLoggedIn, user, token };
}
