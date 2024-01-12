import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import LoadingSpinner from '../LoadingSpinner';
import { NextButton } from '../../styles/ButtonStyles';

export default function EditUserByAdminModal({
  showModal,
  setShowModal,
  user,
  handleSubmitForm,
  handleUpdateUser,
  setValue,
  control,
  loading,
}) {
  useEffect(() => {
    setValue('username', user?.username);
    setValue('roles', user?.roles[0]);
  }, [user, setValue]);

  return (
    <Modal key={user?.id} show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>계정 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitForm(handleUpdateUser)}>
          <div className='d-flex justify-content-center'>
            <Image
              src={user?.profileImg}
              alt='프로필이미지'
              height={150}
              width={150}
              roundedCircle
            />
          </div>

          <Form.Group className='mb-3'>
            <Form.Label>이메일</Form.Label>
            <Form.Control type='email' placeholder={user?.email} disabled />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>유저 이름</Form.Label>
            <Controller
              name='username'
              control={control}
              defaultValue={user?.username}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='text'
                  onChange={(e) => setValue('username', e.target.value)}
                />
              )}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>유저 등급</Form.Label>
            <Controller
              name='roles'
              control={control}
              defaultValue={user?.roles[0]}
              render={({ field }) => (
                <Form.Select
                  {...field}
                  onChange={(e) => {
                    setValue('roles', e.target.value);
                  }}
                >
                  <option value='default'>
                    {user?.roles[0] === 'admin' ? '관리자' : '유저'}
                  </option>
                  <option value='select' disabled>
                    선택해 주세요
                  </option>
                  <option value='user'>유저</option>
                  <option value='admin'>관리자</option>
                </Form.Select>
              )}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShowModal(false)}>
          취소
        </Button>
        <NextButton variant='Light' onClick={() => handleUpdateUser(user?.id)}>
          {loading ? <LoadingSpinner /> : '수정하기'}
        </NextButton>
      </Modal.Footer>
    </Modal>
  );
}
