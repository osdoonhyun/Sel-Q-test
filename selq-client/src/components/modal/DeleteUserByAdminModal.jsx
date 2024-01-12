import { useState } from 'react';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { MESSAGE } from '../../constant/message';

export default function DeleteUserByAdminModal({
  showModal,
  setShowModal,
  user,
  handleSubmitForm,
  handleUpdateUser,
  handleDelete,
}) {
  const [isDeletionChecked, setIsDeletionChecked] = useState(true);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>계정 삭제</Modal.Title>
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
            <Form.Control type='text' placeholder={user?.username} disabled />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>유저 등급</Form.Label>
            <Form.Control
              type='text'
              placeholder={user?.isAdmin ? '관리자' : '유저'}
              disabled
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>가입 날짜</Form.Label>
            <Form.Control
              type='text'
              placeholder={user?.createdAt.slice(0, 10)}
              disabled
            />
          </Form.Group>
        </Form>
        <Form.Check // prettier-ignore
          type={'checkbox'}
          onChange={() => setIsDeletionChecked(!isDeletionChecked)}
          label={MESSAGE.USER.DELETE_CHECKED_CONFIRMATION_ADMIN}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShowModal(false)}>
          취소
        </Button>
        <Button
          variant='danger'
          disabled={isDeletionChecked}
          onClick={() => handleDelete(user?.id)}
        >
          계정 삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
