import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { TERMS_AND_CONDITIONS, EMAIL_LIST } from '../constant/signUp';
import { useNavigate } from 'react-router-dom';
import {
  useSignUpHandler,
  useVerifyRegisteredEmail,
  useSendEmailVerification,
  useCheckEmailVerification,
} from '../services/authHook/signUp';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ErrorMessage } from '../styles/Styles';
import Timer from '../components/ui/Timer';
import SocialGoogleLogIn from '../components/common/SocialGoogleLogIn';

const signUpSchema = yup.object().shape({
  email: yup.string().required('이메일을 입력해 주세요.'),
  emailCategory: yup.string().required('이메일 카테고리를 선택해 주세요.'),
  password: yup
    .string()
    .required('새 비밀번호를 입력해 주세요.')
    .min(8, '8자 이상 입력해 주세요.')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      '최소 하나의 대문자, 특수문자를 포함해야 합니다.'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('새 비밀번호 확인을 입력해 주세요.'),
  username: yup
    .string()
    .min(2, '최소 2글자 이상 입력해 주세요.')
    .max(15, '최대 15글자까지 입력 가능합니다.'),
  fourteenOverAgree: yup.bool().oneOf([true]),
  termsOfUseAgree: yup.bool().oneOf([true]),
  personalInfoAgree: yup.bool().oneOf([true]),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [btnDisable, setBtnDisable] = useState(true);
  const [verificationBtnDisable, setVerificationBtnDisable] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [agreeList, setAgreeList] = useState(TERMS_AND_CONDITIONS);
  const [timerRestart, setTimerRestart] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const email = watch('email');
  const emailCategory = watch('emailCategory');

  const {
    mutateAsync: signUp,
    isLoading: loadingSignUp,
    error: errorSignUp,
  } = useSignUpHandler();

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

  const {
    mutateAsync: checkEmail,
    isLoading: loadingCheckEmail,
    error: errorCheckEmail,
  } = useCheckEmailVerification();

  const signUpHandler = async (values, e) => {
    e.preventDefault();

    const allTrue = values.allTrue;
    const signUpInfo = {
      username: values.username,
      email: values.email + '@' + values.emailCategory,
      password: values.password,
      profileImg: '',
      provider: 'local',

      fourteenOverAgree: allTrue || !!values.fourteenOverAgree,
      termsOfUseAgree: allTrue || !!values.termsOfUseAgree,
      personalInfoAgree: allTrue || !!values.personalInfoAgree,
      marketingConsent: allTrue || !!values.marketingConsent,
      smsAndEventAgree: allTrue || !!values.smsAndEventAgree,
    };

    await signUp(signUpInfo);
    navigate('/login');
  };

  const verifyRegisteredEmailHandler = async () => {
    const userEmail = email + '@' + emailCategory;
    const response = await verifyEmail(userEmail);

    if (response === true) {
      alert('이미 가입된 이메일입니다.');
      return;
    } else {
      await sendEmail(userEmail);
      setIsVerifiedEmail(true);
    }
  };

  const handleResendEmail = async () => {
    const userEmail = email + '@' + emailCategory;
    await sendEmail(userEmail);
    setTimerRestart((prev) => !prev);
  };

  const checkEmailVerificationHandler = async () => {
    const userEmail = email + '@' + emailCategory;
    const response = await checkEmail({
      email: userEmail,
      code: verificationCode,
    });

    if (response === true) {
      setIsVerifiedEmail(false);
      setVerificationBtnDisable(false);
    } else {
      alert('다시 인증 코드를 입력해 주세요');
    }
  };

  const handleAgreeCheckList = (e, field, setFieldValue) => {
    const { value, checked } = e.target;

    if (value === '전체 동의') {
      let tempAgree = agreeList.map((agree) => ({
        ...agree,
        isChecked: checked,
      }));
      setAgreeList(tempAgree);

      tempAgree.forEach((agree) => {
        setFieldValue(agree.value, checked);
      });
    } else {
      let tempAgree = agreeList.map((agree) =>
        agree.label === value ? { ...agree, isChecked: checked } : agree
      );
      setAgreeList(tempAgree);
      setFieldValue(value, checked);
    }

    field.onChange(checked);
  };

  useEffect(() => {
    if (email !== '' && emailCategory !== '선택해주세요') {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [email, emailCategory]);

  return (
    <Container
      style={{
        maxWidth: '380px',
      }}
    >
      <h1 className='mt-5 mb-4' style={{ fontSize: '2rem' }}>
        회원가입
      </h1>

      <Form onSubmit={handleSubmit(signUpHandler)}>
        <Form.Group as={Col}>
          <Row className='justify-content-center mt-2 mb-3 text-muted'>
            SNS 계정으로 간편하게 회원가입
          </Row>
          <Row className='justify-content-center mt-2 mb-4 mx-1'>
            <SocialGoogleLogIn />
          </Row>
        </Form.Group>
        <hr />

        <Form.Group as={Row} controlId='formEmail'>
          <Form.Label>이메일</Form.Label>
          <Col>
            <Form.Control
              type='text'
              placeholder='이메일'
              {...register('email', { required: true })}
            />
          </Col>
          <Col
            xs='auto'
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: 0,
            }}
          >
            <span>@</span>
          </Col>
          <Col>
            <Form.Select {...register('emailCategory', { required: true })}>
              <option className='text-muted'>선택해 주세요</option>
              {EMAIL_LIST.map((email, index) => (
                <option key={index}>{email}</option>
              ))}
            </Form.Select>
          </Col>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </Form.Group>

        <Button
          variant='Light'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '127px',
            height: '38px',
            backgroundColor: '#2f93ea',
            border: '1px solid #2f93ea',
            color: '#fff',
          }}
          onClick={verifyRegisteredEmailHandler}
          className='mb-3'
          disabled={btnDisable || !verificationBtnDisable}
        >
          {loadingVerifyEmail || loadingSendEmail ? (
            <>
              <Spinner
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              <span className='visually-hidden'>Loading...</span>
            </>
          ) : verificationBtnDisable ? (
            '이메일 인증하기'
          ) : (
            '이메일 인증완료'
          )}
        </Button>

        {isVerifiedEmail && (
          <Form.Group className='mb-3' controlId='formEmailVerification'>
            <Form.Text>이메일로 전송된 인증코드를 입력해 주세요.</Form.Text>
            <Form.Control
              type='text'
              placeholder='인증코드 6자리 입력'
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <div>
              <Form.Text style={{ color: '#828C94' }}>
                이메일을 받지 못하셨나요?{` `}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href='#'
                  onClick={handleResendEmail}
                  style={{ color: '#828C94' }}
                >
                  이메일 재전송하기
                </a>
              </Form.Text>
            </div>
            <Timer key={timerRestart} />

            <Button
              className='mt-3'
              variant='Light'
              style={{
                backgroundColor: '#2f93ea',
                border: '1px solid #2f93ea',
                color: '#fff',
              }}
              onClick={checkEmailVerificationHandler}
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
              ) : (
                '확인'
              )}
            </Button>
          </Form.Group>
        )}

        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>비밀번호</Form.Label>
          <br />
          <Form.Text>
            대문자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해 주세요.
          </Form.Text>
          <Form.Control
            type='text'
            placeholder='비밀번호'
            {...register('password', { required: true })}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formConfirmPassword'>
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type='text'
            placeholder='비밀번호 확인'
            {...register('confirmPassword', { required: true })}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formUsername'>
          <Form.Label>닉네임</Form.Label>
          <br />
          <Form.Text className='text-muted'>
            다른 유저와 겹치지 않도록 입력해 주세요. (2~15자)
          </Form.Text>
          <Form.Control
            {...register('username', { required: true })}
            type='text'
            placeholder='별명 (2~15자)'
          />
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formTerms'>
          <Form.Label>약관 동의</Form.Label>
          <div
            style={{
              border: '1px solid #B3B3B5',
              padding: '18px',
              borderRadius: '5px',
            }}
          >
            <Controller
              render={({ field }) => (
                <Form.Check
                  type='checkbox'
                  label='전체 동의 (선택항목에 대한 동의 포함)'
                  value='전체 동의'
                  checked={
                    !agreeList?.some((agree) => agree?.isChecked !== true)
                  }
                  onChange={(e) => handleAgreeCheckList(e, field, setValue)}
                />
              )}
              name='allTrue'
              control={control}
            />
            <hr />
            {agreeList.map((agree, index) => (
              <div key={index}>
                <Controller
                  name={agree.value}
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Form.Check
                      type='checkbox'
                      onChange={(e) => handleAgreeCheckList(e, field, setValue)}
                      checked={field.value || agree.isChecked}
                      label={agree.label}
                      value={agree.label}
                    />
                  )}
                />
              </div>
            ))}
          </div>
          {(errors.fourteenOverAgree ||
            errors.termsOfUseAgree ||
            errors.personalInfoAgree) && (
            <ErrorMessage>필수 항목을 체크하세요.</ErrorMessage>
          )}
        </Form.Group>

        <Button
          variant='Light'
          style={{
            backgroundColor: '#2f93ea',
            border: '1px solid #2f93ea',
            color: '#fff',
          }}
          type='submit'
          className='w-100 mt-3'
        >
          {loadingSignUp ? (
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
            '회원가입'
          )}
        </Button>
      </Form>

      <p className='mt-3' style={{ textAlign: 'center' }}>
        이미 아이디가 있으신가요?{' '}
        <a style={{ color: '#2f93ea' }} href='/login'>
          로그인
        </a>
      </p>
    </Container>
  );
}
