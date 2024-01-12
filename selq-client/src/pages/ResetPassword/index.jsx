import { useState } from 'react';
import { Container } from 'react-bootstrap';
import LogIn from '../LogIn';
import NewPassword from './NewPassword';
import EmailVerification from './EmailVerification';
import EmailCodeVerification from './EmailCodeVerification';

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
            // 비밀번호 변경 API 호출
            setStep('변경성공');
          }}
        />
      )}
      {step === '변경성공' && <LogIn />}
    </Container>
  );
}
