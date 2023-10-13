import { useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import {
  useSendEmailVerification,
  useVerifyRegisteredEmail,
} from '../../services/authHook/signUp';
import { Controller, useForm } from 'react-hook-form';

export default function EmailVerification({ onNext }) {
  const [checkBtnDisable, setCheckBtnDisable] = useState(true);
  const [sendBtnDisable, setSendBtnDisable] = useState(true);

  const { handleSubmit, control, getValues, setValue } = useForm();

  const {
    mutateAsync: verifyEmail,
    isLoading: loadingVerifyEmail,
    error: errorVerifyEmail,
  } = useVerifyRegisteredEmail();

  const {
    mutateAsync: sendEmail,
    isLoading: loadingSendEmail,
    error: errorSendEmail,
  } = useSendEmailVerification();

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
              <Button
                onClick={handleCheckButton}
                variant='Light'
                style={{
                  backgroundColor: '#2f93ea',
                  border: '1px solid #2f93ea',
                  color: '#fff',
                }}
                disabled={checkBtnDisable}
              >
                {loadingVerifyEmail ? (
                  <div>
                    <Spinner
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                ) : sendBtnDisable ? (
                  '확인'
                ) : (
                  '확인완료'
                )}
              </Button>
            </Col>
          </div>
        </Row>
      </Form.Group>
      <div className='d-flex justify-content-center'>
        <Button
          variant='Light'
          style={{
            backgroundColor: '#2f93ea',
            border: '1px solid #2f93ea',
            color: '#fff',
          }}
          className='mt-3 w-100'
          type='submit'
          disabled={sendBtnDisable}
        >
          {loadingSendEmail ? (
            <>
              <Spinner
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              <span className='visually-hidden'>Loading...</span>
            </>
          ) : (
            '이메일로 인증코드 보내기'
          )}
        </Button>
      </div>
    </Form>
  );
}
