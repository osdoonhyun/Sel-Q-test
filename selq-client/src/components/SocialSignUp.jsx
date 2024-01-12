import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TERMS_AND_CONDITIONS } from '../constant/signUp';
import { useSocialSignUpHandler } from '../hooks/common/useSocialSignUpHandler';
import { MESSAGE } from '../constant/message';
import LoadingSpinner from './LoadingSpinner';
import { ErrorMessage } from '../styles/Styles';
import { SocialContainer } from '../styles/LayoutStyles';
import { NextButton, SocialGreyDiv } from '../styles/ButtonStyles';

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, MESSAGE.SIGNUP.VALIDATION_USERNAME_MIN)
    .max(15, MESSAGE.SIGNUP.VALIDATION_USERNAME_MAX),
  fourteenOverAgree: yup.bool().oneOf([true]),
  termsOfUseAgree: yup.bool().oneOf([true]),
  personalInfoAgree: yup.bool().oneOf([true]),
});

export default function SocialSignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [agreeList, setAgreeList] = useState(TERMS_AND_CONDITIONS);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  //TODO: 소셜 회원가입시 API 연결
  const { mutateAsync: socialSignUp, isLoading: loadingSocialSignUpUser } =
    useSocialSignUpHandler();

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

      fourteenOverAgree: allTrue || !!values.fourteenOverAgree,
      termsOfUseAgree: allTrue || !!values.termsOfUseAgree,
      personalInfoAgree: allTrue || !!values.personalInfoAgree,
      marketingConsent: allTrue || !!values.marketingConsent,
      smsAndEventAgree: allTrue || !!values.smsAndEventAgree,
    };

    await socialSignUp(signUpInfo);
    navigate('/');
  };

  return (
    <SocialContainer>
      <h2 className='mt-5 mb-4 fs-2'>추가 정보 입력</h2>

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
            defaultValue={userInfo?.username || ''}
          />
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formTerms'>
          <Form.Label>약관 동의</Form.Label>
          <SocialGreyDiv>
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
          </SocialGreyDiv>
          {(errors.fourteenOverAgree ||
            errors.termsOfUseAgree ||
            errors.personalInfoAgree) && (
            <ErrorMessage>필수 항목을 체크하세요.</ErrorMessage>
          )}
        </Form.Group>

        <NextButton variant='Light' type='submit' className='w-100 mt-3'>
          {loadingSocialSignUpUser ? <LoadingSpinner /> : '회원가입'}
        </NextButton>
      </Form>
    </SocialContainer>
  );
}
