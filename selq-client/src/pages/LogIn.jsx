import { useState } from 'react';
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { logIn } from '../store/Slices/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ErrorMessage } from '../styles/Styles';
import ErrorToast from '../components/common/ErrorToast';
import SocialGoogleLogIn from '../components/common/SocialGoogleLogIn';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('올바른 이메일 형식이 아닙니다.')
    .required('이메일을 입력해 주세요.'),
  password: yup
    .string()
    .required('비밀번호를 입력해 주세요.')
    .min(8, '8자 이상 입력해 주세요.')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      '최소 하나의 대문자, 특수문자를 포함해야 합니다.'
    ),
});

export default function LogIn() {
  const navigate = useNavigate();
  const [errorShow, setErrorShow] = useState(false);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginHandler = async (values) => {
    const logInInfo = {
      email: values.email,
      password: values.password,
    };

    const result = await dispatch(logIn(logInInfo));

    if (result?.error) {
      setErrorShow(true);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <Container
        style={{
          maxWidth: '330px',
          padding: '140px 0',
        }}
      >
        <Form onSubmit={handleSubmit(loginHandler)}>
          <Form.Group as={Col}>
            <Row
              style={{
                fontSize: '2rem',
                fontWeight: 500,
                color: '#5bacee',
              }}
              className='justify-content-center mb-4'
            >
              Sel-Q
            </Row>
          </Form.Group>
          <Form.Group controlId='formBasic'>
            <Row className='mb-2 justify-content-center'>
              <Form.Control
                style={{ height: '50px', width: '330px' }}
                {...register('email', { required: true })}
                placeholder='이메일'
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
              <Form.Control
                style={{ height: '50px', width: '330px' }}
                {...register('password', { required: true })}
                type='text'
                placeholder='비밀번호'
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </Row>
          </Form.Group>

          {/* {isLoading && <h1>...loading</h1>} */}
          <div className='d-flex justify-content-center mt-4'>
            <Button
              style={{
                height: '55px',
                width: '330px',
                padding: '15px 10px',
                backgroundColor: '#2f93ea',
                border: '1px solid #2f93ea',
                color: '#fff',
              }}
              variant='Light'
              type='submit'
            >
              로그인
            </Button>
          </div>
        </Form>

        <div className='d-flex justify-content-center mt-3'>
          <Nav as='ul'>
            <Nav.Item as='li'>
              <Nav.Link style={{ color: '#5bacee' }} href='/password/new'>
                비밀번호 재설정
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as='li'>
              <Nav.Link style={{ color: '#5bacee' }} href='/signup'>
                회원가입
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <hr />

        <Row
          style={{ fontSize: '0.9rem' }}
          className='justify-content-center mt-4 mb-3 text-muted'
        >
          SNS 계정으로 간편하게 로그인하기
        </Row>

        <Row className='justify-content-center mt-2 mx-1'>
          <SocialGoogleLogIn />
        </Row>
      </Container>

      <ErrorToast
        errorShow={errorShow}
        setErrorShow={() => setErrorShow(false)}
      />
    </>
  );
}
