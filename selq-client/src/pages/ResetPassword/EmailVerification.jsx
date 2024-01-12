import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useCheckRegisteredEmail } from '../../hooks/common/useCheckRegisteredEmail';
import { useSendVerificationCode } from '../../hooks/common/useSendVerificationCode';
import { NextButton } from '../../styles/ButtonStyles';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function EmailVerification({ onNext }) {
  const [checkBtnDisable, setCheckBtnDisable] = useState(true);
  const [sendBtnDisable, setSendBtnDisable] = useState(true);

  const { handleSubmit, control, getValues, setValue } = useForm();

  const {
    mutateAsync: verifyEmail,
    isLoading: loadingVerifyEmail,
    error: errorVerifyEmail,
  } = useCheckRegisteredEmail();

  const {
    mutateAsync: sendEmail,
    isLoading: loadingSendEmail,
    error: errorSendEmail,
  } = useSendVerificationCode();

  const handleCheckButton = async () => {
    const inputEmail = getValues('email');
    const response = await verifyEmail(inputEmail);

    if (response === false) {
      alert('가입 되지 않은 이메일입니다.');
      return;
    } else {
      setSendBtnDisable(false);
      setCheckBtnDisable(true);
    }
  };

  const handleEmailVerification = async () => {
    const inputEmail = getValues('email');
    await sendEmail(inputEmail);
    onNext(inputEmail);
  };

  return (
    <Form onSubmit={handleSubmit(handleEmailVerification)}>
      <Form.Label>가입한 이메일 주소를 입력해주세요.</Form.Label>
      <Form.Group as={Col} controlId='formGridCity'>
        <Form.Text className='text-muted'>
          이메일 형식에 맞게 작성해주세요.
        </Form.Text>
        <Row>
          <div className='d-flex'>
            <Col>
              <Controller
                name='email'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type='email'
                    placeholder='이메일'
                    onChange={(e) => {
                      setValue('email', e.target.value);
                      setCheckBtnDisable(e.target.value === '');
                    }}
                    disabled={!sendBtnDisable}
                  />
                )}
              />
            </Col>
            <Col
              xs='auto'
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginLeft: '10px',
              }}
            >
              <NextButton
                onClick={handleCheckButton}
                disabled={checkBtnDisable}
              >
                {loadingVerifyEmail ? (
                  <LoadingSpinner />
                ) : sendBtnDisable ? (
                  '확인'
                ) : (
                  '확인완료'
                )}
              </NextButton>
            </Col>
          </div>
        </Row>
      </Form.Group>
      <div className='d-flex justify-content-center'>
        <NextButton
          className='mt-3 w-100'
          type='submit'
          disabled={sendBtnDisable}
        >
          {loadingSendEmail ? <LoadingSpinner /> : '이메일로 인증코드 보내기'}
        </NextButton>
      </div>
    </Form>
  );
}
