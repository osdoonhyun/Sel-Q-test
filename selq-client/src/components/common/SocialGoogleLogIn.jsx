import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { serverApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { logIn } from '../../store/Slices/auth';
import Google from '../../assets/icon/oauth/google.svg';

export default function SocialGoogleLogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verifyRegisteredEmail = async (email) => {
    try {
      const { status } = await serverApi.post('/users/email', {
        email,
      });

      if (status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false;
      }
      throw error;
    }
  };

  const socialLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => {
          const { email, name, picture } = res.data;
          return { email, name, picture };
        });

      const registeredEmail = await verifyRegisteredEmail(userInfo?.email);

      if (registeredEmail) {
        await dispatch(logIn({ email: userInfo?.email }));
        navigate('/');
      } else {
        navigate('/signup/social', { state: { userInfo } });
      }
    },
    onError: (error) => {
      console.log('소셜 로그인 실패', error);
    },
  });
  return (
    <Button
      variant='Light'
      style={{ border: '1px solid #bdbdbd' }}
      onClick={socialLogin}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '28px',
        }}
      >
        <img src={Google} alt='Google 아이콘' style={{ width: '24px' }} />
        <span style={{ color: '#0c0b0b66' }}>구글 계정으로 계속하기</span>
      </div>
    </Button>
  );
}
