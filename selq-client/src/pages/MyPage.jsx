import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { useUpdateUserInfoByUser } from '../hooks/common/useUpdateUserInfoByUser';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  UsernameForm,
  ImageForm,
  EmailForm,
  DeleteForm,
} from '../components/ResponsiveForm';
import { MyPageContainer } from '../styles/LayoutStyles';
import { NextButton } from '../styles/ButtonStyles';
import LoadingSpinner from '../components/LoadingSpinner';
import DeleteUserModal from '../components/modal/DeleteUserModal';
import { getUserInfo } from '../store/Slices/auth';

const usernameSchema = yup
  .object({
    username: yup
      .string()
      .min(2, '최소 2글자 이상 입력해 주세요.')
      .max(15, '최대 15글자까지 입력 가능합니다.'),
  })
  .required('닉네임을 입력해 주세요.');

export default function MyPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const {
    mutateAsync: updateUser,
    isLoading: loadingUpdateUser,
    //error: errorUpdateUser,
  } = useUpdateUserInfoByUser();

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(usernameSchema),
  });

  const updateUserHandler = async () => {
    const updatedInfo = {};

    const usernameValue = getValues('username');
    if (usernameValue !== '' && usernameValue !== user?.username) {
      updatedInfo.username = usernameValue;
    }

    await updateUser({ updatedInfo });
    dispatch(getUserInfo());
    navigate('/');
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    //TODO: 회원탈퇴 로직
    console.log('탈퇴됨');
    handleClose();
  };

  return (
    <>
      <MyPageContainer>
        <Form onSubmit={handleSubmit(updateUserHandler)}>
          <ImageForm img={user?.profileImg} />
          <EmailForm label={'이메일'} email={user?.email} />
          <UsernameForm
            label={'닉네임'}
            content={user?.username}
            control={control}
            setValue={setValue}
            errors={errors.username?.message}
          />
          <DeleteForm showModal={handleShow} />

          <div className='d-flex justify-content-center'>
            <NextButton $my type='submit' className='mt-5'>
              {loadingUpdateUser ? <LoadingSpinner /> : '회원 정보 수정'}
            </NextButton>
          </div>
        </Form>
      </MyPageContainer>

      <DeleteUserModal
        show={show}
        setShow={setShow}
        handleDelete={handleDelete}
      />
    </>
  );
}
