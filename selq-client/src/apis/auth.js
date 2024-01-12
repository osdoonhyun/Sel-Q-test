import { api, authApi } from './api';

// 회원가입
export const signUpHandler = async (userInput) => {
  const { status } = await api.post('/auth/signup', userInput);

  return status; // 201
};

// 이메일 등록 검증
export const checkRegisteredEmail = async (email) => {
  try {
    const { status } = await api.post('/users/email', {
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
// 인증번호 전송
export const sendVerificationCode = async (email) => {
  await api.post('/auth/email/send', {
    email,
  });
};

// 인증번호 검증
export const checkVerificationCode = async (data) => {
  const { email, code } = data;

  const { status } = await api.post('/auth/email/check', {
    email,
    code,
  });

  if (status === 201) {
    return true;
  } else {
    return false;
  }
};

// 소셜 회원가입: 추가 정보 요청(닉네임, 이용약관)
export const socialSignUp = async (signUpInfo) => {
  try {
    const { status } = await authApi.patch('/auth/update', signUpInfo);
    return status;
  } catch (error) {
    console.log('소셜 로그인(회원가입) 에러 발생');
  }
};
