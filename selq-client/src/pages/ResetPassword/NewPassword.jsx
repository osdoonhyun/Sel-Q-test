import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ErrorMessage } from '../../styles/Styles';
import { MESSAGE } from '../../constant/message';
import { REGEXP } from '../../constant/regexp';
import { NextButton } from '../../styles/ButtonStyles';

const newPasswordSchema = yup.object({
  password: yup
    .string()
    .required(MESSAGE.RESET_PASSWORD.VALIDATION_PASSWORD)
    .min(8, MESSAGE.RESET_PASSWORD.VALIDATION_PASSWORD_MIN)
    .matches(
      REGEXP.PASSWORD,
      MESSAGE.RESET_PASSWORD.VALIDATION_PASSWORD_MATCHES
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      MESSAGE.RESET_PASSWORD.VALIDATION_CONFIRM_PASSWORD
    )
    .required(MESSAGE.RESET_PASSWORD.VALIDATION_CONFIRM_PASSWORD_REQUIRED),
});

export default function NewPassword() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
  });

  const newPasswordHandler = async (data) => {
    // TODO: 비밀번호 재설정 로직
    console.log('NEW PASSWORD', data.password, data.confirmPassword);
  };

  return (
    <Form onSubmit={handleSubmit(newPasswordHandler)}>
      <Form.Group as={Col}>
        <Row className='justify-content-center'>Sel-Q</Row>
      </Form.Group>
      <Form.Group controlId='formBasic'>
        <Row className='mb-2 justify-content-center'>
          <Controller
            name='password'
            defaultValue=''
            control={control}
            render={({ field }) => (
              <Form.Control
                style={{ height: '50px', width: '330px' }}
                value={field.value}
                placeholder='새 비밀번호'
                type='password'
                onChange={(e) => {
                  setValue('password', e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Controller
            name='confirmPassword'
            defaultValue=''
            control={control}
            render={({ field }) => (
              <Form.Control
                style={{ height: '50px', width: '330px' }}
                value={field.value}
                onChange={(e) => {
                  setValue('confirmPassword', e.target.value);
                  field.onChange(e);
                }}
                type='password'
                placeholder='새 비밀번호 확인'
              />
            )}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
        </Row>
      </Form.Group>

      <div className='d-flex justify-content-center mt-4'>
        <NextButton $large type='submit'>
          비밀번호 변경하기
        </NextButton>
      </div>
    </Form>
  );
}
