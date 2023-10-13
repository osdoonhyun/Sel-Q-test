import { useState } from 'react';
import EmailVerification from './EmailVerification';
import NewPassword from './NewPassword';
import axios from 'axios';
import LogIn from '../LogIn';
import EmailCodeVerification from './EmailCodeVerification';
import { Container } from 'react-bootstrap';

export default function ResetPassword() {
  const [step, setStep] = useState('이메일검증');
  const [userEmail, setUserEmail] = useState('');

  return (
    <Container style={{ maxWidth: '343px', marginTop: '40px' }}>
      {step === '이메일검증' && (
        <EmailVerification
          onNext={(email) => {
            setUserEmail(email);
            setStep('인증코드검증');
          }}
        />
      )}
      {step === '인증코드검증' && (
        <EmailCodeVerification
          userEmail={userEmail}
          onNext={() => setStep('비밀번호변경')}
        />
      )}
      {step === '비밀번호변경' && (
        <NewPassword
          onNext={async () => {
            await axios.post('/api/'); // 비밀번호 변경 API 호출
            setStep('변경성공');
          }}
        />
      )}
      {step === '변경성공' && <LogIn />}
    </Container>
  );
}
