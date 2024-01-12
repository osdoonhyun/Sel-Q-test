import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../constant/paths';

export default function PrivateRoute({ isOnlyAdminAllowed = false, children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isOnlyAdminAllowed && user?.roles[0] !== 'admin') {
      alert('해당 페이지는 관리자만 접근이 가능합니다. 홈으로 이동합니다.');

      navigate(PATH.HOME);
    }
  }, [isOnlyAdminAllowed, user, navigate]);

  return children;
}
