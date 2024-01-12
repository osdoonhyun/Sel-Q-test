import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function PreparationModal({
  show,
  onHide,
  title = '준비중',
  subTitle = '열심히 준비하고 있어요',
}) {
  return (
    <Modal
      size='sm'
      show={show}
      onHide={onHide}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{subTitle}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
