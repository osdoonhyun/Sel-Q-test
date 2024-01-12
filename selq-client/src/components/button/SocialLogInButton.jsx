import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Image } from 'react-bootstrap';
import { POPUP_STRING } from '../../constant/options';
import { SocialLoginButton, SocialLoginSpan } from '../../styles/ButtonStyles';
import { getUserInfo } from '../../store/Slices/auth';
import Google from '../../assets/icon/google.webp';

export default function SocialLogInButton() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const socialLogin = () => {
    const popup = window.open(
      process.env.REACT_APP_GOOGLE_LOGIN_URL,
      'Google Login',
      POPUP_STRING
    );

    const receiveLoginCompleteMessage = async (event) => {
      if (
        event.origin === process.env.REACT_APP_ORIGIN_URL &&
        event.data === 'loginComplete'
      ) {
        popup.close();

        // 유저 정보 조회
        const userInfo = await dispatch(getUserInfo());

        // 이용약관 확인
        const { termsOfUseAgree, personalInfoAgree, fourteenOverAgree } =
          userInfo.payload.userInfo;

        // 필수항목 체크 X -> 회원가입 진행
        if (
          termsOfUseAgree === false ||
          personalInfoAgree === false ||
          fourteenOverAgree === false
        ) {
          navigate('/signup/social', {
            state: { userInfo: userInfo.payload.userInfo },
          });
        } else {
          navigate('/');
        }
      }
    };

    window.addEventListener('message', receiveLoginCompleteMessage);
  };

  return (
    <SocialLoginButton variant='Light' onClick={socialLogin}>
      <div className='d-flex justify-content-center align-items-center'>
        <Image src={Google} alt='Google 아이콘' width={24} />
        <SocialLoginSpan>구글 계정으로 계속하기</SocialLoginSpan>
      </div>
    </SocialLoginButton>
  );
}
