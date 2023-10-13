import { useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useCheckEmailVerification } from '../../services/authHook/signUp';
import { Controller, useForm } from 'react-hook-form';

export default function EmailCodeVerification({ onNext, userEmail }) {
  const [checkBtnDisable, setCheckBtnDisable] = useState(true);
  const [sendBtnDisable, setSendBtnDisable] = useState(true);

  const { handleSubmit, control, setValue, getValues } = useForm();

  const {
    mutateAsync: checkEmail,
    isLoading: loadingCheckEmail,
    error: errorCheckEmail,
  } = useCheckEmailVerification();

  const handleCheckButton = async () => {
    const emailCode = getValues('emailCode');
    const response = await checkEmail({
      email: userEmail,
      code: emailCode,
    });

    if (response === true) {
      setSendBtnDisable(false);
      setCheckBtnDisable(true);
    } else {
      alert('인증 번호가 일치하지 않습니다. 다시 시도해 주세요.');
    }
  };

  const handleEmailCodeVerification = async () => {
    onNext();
  };

  return (
    <Form onSubmit={handleSubmit(handleEmailCodeVerification)}>
      <Form.Group as={Col} className='mt-3'>
        <Form.Label>이메일로 전송된 인증코드를 입력해주세요.</Form.Label>
        <Row>
          <div className='d-flex'>
            <Col>
              <Controller
                name='emailCode'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type='text'
                    placeholder='인증코드 6자리 입력'
                    onChange={(e) => {
                      setValue('emailCode', e.target.value);
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
                variant='Light'
                style={{
                  backgroundColor: '#2f93ea',
                  border: '1px solid #2f93ea',
                  color: '#fff',
                }}
                onClick={handleCheckButton}
                disabled={checkBtnDisable}
              >
                {loadingCheckEmail ? (
                  <>
                    <Spinner
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                    <span className='visually-hidden'>Loading...</span>
                  </>
                ) : sendBtnDisable ? (
                  '확인'
                ) : (
                  '확인완료'
                )}
              </Button>
            </Col>
          </div>
          {/* 시간 카운트 */}
          {/* 재전송 버튼 */}
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
          비밀번호 재설정하기
        </Button>
      </div>
    </Form>
  );
}
