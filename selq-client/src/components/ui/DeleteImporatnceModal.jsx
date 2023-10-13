import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteButton } from '../../styles/Styles';

export default function DeleteImportanceModal({
  show,
  handleClose,
  deleteImoprtance,
}) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>북마크 해제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>해당 질문을 중요질문 모아보기에서 삭제하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            취소
          </Button>
          <DeleteButton onClick={deleteImoprtance}>삭제</DeleteButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
