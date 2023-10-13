import { useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { TERMS_AND_CONDITIONS } from '../../constant/signUp';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '../../styles/Styles';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignUpHandler } from '../../services/authHook/signUp';
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/Slices/auth';

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, '최소 2글자 이상 입력해 주세요.')
    .max(15, '최대 15글자까지 입력 가능합니다.'),
  fourteenOverAgree: yup.bool().oneOf([true]),
  termsOfUseAgree: yup.bool().oneOf([true]),
  personalInfoAgree: yup.bool().oneOf([true]),
});

export default function SocialSignUp() {
  const [agreeList, setAgreeList] = useState(TERMS_AND_CONDITIONS);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const {
    mutateAsync: signUp,
    isLoading: loadingSignUp,
    error: errorSignUp,
  } = useSignUpHandler();

  const userInfo = location.state.userInfo;

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

  const signUpTermHandler = async (values, e) => {
    e.preventDefault();

    const allTrue = values.allTrue;
    const signUpInfo = {
      username: values.username,
      email: userInfo?.email,
      profileImg: userInfo.picture || '',
      provider: 'google',

      fourteenOverAgree: allTrue || !!values.fourteenOverAgree,
      termsOfUseAgree: allTrue || !!values.termsOfUseAgree,
      personalInfoAgree: allTrue || !!values.personalInfoAgree,
      marketingConsent: allTrue || !!values.marketingConsent,
      smsAndEventAgree: allTrue || !!values.smsAndEventAgree,
    };

    // TODO: 회원가입시 비밀번호 없는 상태로 요청
    // await signUp(signUpInfo);
    // await dispatch(logIn({ email: userInfo?.email }));
    // navigate('/');
  };

  return (
    <Container
      style={{
        maxWidth: '380px',
      }}
    >
      <h1 className='mt-5 mb-4' style={{ fontSize: '2rem' }}>
        추가 정보 입력
      </h1>

      <Form onSubmit={handleSubmit(signUpTermHandler)}>
        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>이메일</Form.Label>
          <Form.Control placeholder={userInfo?.email} disabled />
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
            defaultValue={userInfo?.name || ''}
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
    </Container>
  );
}
