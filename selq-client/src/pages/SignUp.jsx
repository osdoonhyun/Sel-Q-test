import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUpHandler } from '../hooks/common/useSignUpHandler';
import { useCheckRegisteredEmail } from '../hooks/common/useCheckRegisteredEmail';
import { useSendVerificationCode } from '../hooks/common/useSendVerificationCode';
import { useCheckVerificationCode } from '../hooks/common/useCheckVerificationCode';
import { ErrorMessage } from '../styles/Styles';
import { TERMS_AND_CONDITIONS, EMAIL_LIST } from '../constant/signUp';
import Timer from '../components/Timer';
import SocialLogInButton from '../components/button/SocialLogInButton';
import PasswordInputGroup from '../components/PasswordInputGroup';
import { MAIN, GREYS } from '../styles/variables';
import { REGEXP } from '../constant/regexp';
import { MESSAGE } from '../constant/message';
import { NextButton } from '../styles/ButtonStyles';
import LoadingSpinner from '../components/LoadingSpinner';

const signUpSchema = yup.object().shape({
  email: yup.string().required(MESSAGE.SIGNUP.VALIDATION_EMAIL),
  emailCategory: yup
    .string()
    .required(MESSAGE.SIGNUP.VALIDATION_EMAIL_CATEGORY),
  password: yup
    .string()
    .required(MESSAGE.SIGNUP.VALIDATION_PASSWORD)
    .min(8, MESSAGE.SIGNUP.VALIDATION_PASSWORD_MIN)
    .matches(REGEXP.PASSWORD, MESSAGE.SIGNUP.VALIDATION_PASSWORD_MATCHES),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      MESSAGE.SIGNUP.VALIDATION_CONFIRM_PASSWORD
    )
    .required(MESSAGE.SIGNUP.VALIDATION_CONFIRM_PASSWORD_REQUIRED),
  username: yup
    .string()
    .min(2, MESSAGE.SIGNUP.VALIDATION_USERNAME_MIN)
    .max(15, MESSAGE.SIGNUP.VALIDATION_USERNAME_MAX),
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

  const { mutateAsync: signUp, isLoading: loadingSignUp } = useSignUpHandler();

  const { mutateAsync: verifyEmail, isLoading: loadingVerifyEmail } =
    useCheckRegisteredEmail();

  const { mutateAsync: sendEmail, isLoading: loadingSendEmail } =
    useSendVerificationCode();

  const { mutateAsync: checkEmail, isLoading: loadingCheckEmail } =
    useCheckVerificationCode();

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
      alert(MESSAGE.SIGNUP.VERIFY_REGISTERED_EMAIL);
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
      alert(MESSAGE.SIGNUP.VERIFY_EMAIL_CODE);
    }
  };

  const handleAgreeCheckList = (e, field, setFieldValue) => {
    const { value, checked } = e.target;

    console.log('클릭됨 ', value, checked);
    if (value === MESSAGE.SIGNUP.TOTAL_AGREE) {
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
            <SocialLogInButton />
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

        <NextButton
          onClick={verifyRegisteredEmailHandler}
          className='d-flex justify-content-center align-items-center mb-3'
          disabled={btnDisable || !verificationBtnDisable}
        >
          {loadingVerifyEmail || loadingSendEmail ? (
            <LoadingSpinner />
          ) : verificationBtnDisable ? (
            '이메일 인증하기'
          ) : (
            '이메일 인증완료'
          )}
        </NextButton>

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
              <Form.Text style={{ color: GREYS.DARK }}>
                이메일을 받지 못하셨나요?{` `}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href='#'
                  onClick={handleResendEmail}
                  style={{ color: GREYS.DARK }}
                >
                  이메일 재전송하기
                </a>
              </Form.Text>
            </div>
            <Timer key={timerRestart} />

            <NextButton
              className='mt-3'
              onClick={checkEmailVerificationHandler}
            >
              {loadingCheckEmail ? <LoadingSpinner /> : '확인'}
            </NextButton>
          </Form.Group>
        )}

        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>비밀번호</Form.Label>
          <br />
          <Form.Text>
            대문자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해 주세요.
          </Form.Text>
          <PasswordInputGroup
            register={register}
            name='password'
            placeholder='비밀번호'
          />

          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formConfirmPassword'>
          <Form.Label>비밀번호 확인</Form.Label>
          <PasswordInputGroup
            register={register}
            name='confirmPassword'
            placeholder='비밀번호 확인'
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
              border: `1px solid ${GREYS.MEDIUM}`,
              padding: '18px',
              borderRadius: '5px',
            }}
          >
            <Controller
              render={({ field }) => (
                <Form.Check
                  type='checkbox'
                  id='all'
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
                      id={agree.label}
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

        <NextButton type='submit' className='w-100 mt-3'>
          {loadingSignUp ? <LoadingSpinner /> : '회원가입'}
        </NextButton>
      </Form>

      <p className='mt-3' style={{ textAlign: 'center' }}>
        이미 아이디가 있으신가요?{' '}
        <a style={{ color: MAIN.DARK }} href='/login'>
          로그인
        </a>
      </p>
    </Container>
  );
}
