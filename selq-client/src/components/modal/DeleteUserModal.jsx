import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { MESSAGE } from '../../constant/message';
import PreparationModal from './PreparationModal';

export default function DeleteUserModal({ show, setShow, handleDelete }) {
  const [isChecked, setIsChecked] = useState(false);
  const [showPreparingModal, setShowPreparingModal] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsChecked(false);
  };

  //TODO: handleDelete에 회원탈퇴 로직 필요
  const handleDeleteUser = () => {
    setShowPreparingModal(true);
    setIsChecked(false);
    handleDelete();
  };

  return (
    <>
      {showPreparingModal && (
        <PreparationModal
          show={showPreparingModal}
          onHide={() => setShowPreparingModal(false)}
          subTitle='회원 탈퇴 기능 열심히 준비하고 있어요!'
        />
      )}

      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>회원 탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Check
            type='checkbox'
            label={MESSAGE.USER.DELETE_CHECKED_CONFIRMATION}
            onChange={() => setIsChecked(!isChecked)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            취소
          </Button>
          <Button
            variant='danger'
            onClick={handleDeleteUser}
            disabled={!isChecked}
          >
            탈퇴
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
