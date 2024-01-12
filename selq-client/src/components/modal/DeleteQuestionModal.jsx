import { Button, Modal } from 'react-bootstrap';

export default function DeleteQuestionModal({
  show,
  setShow,
  handleDeleteQuestion,
}) {
  return (
    <Modal show={show} onHide={() => setShow(false)} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>질문 삭제</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        질문을 삭제하시면 다시 돌릴 수 없습니다 삭제하시겠습니까?
      </Modal.Body>
      <Modal.Footer>
        <Button variant='light' onClick={() => setShow(false)}>
          취소
        </Button>
        <Button variant='secondary' onClick={() => handleDeleteQuestion()}>
          삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
