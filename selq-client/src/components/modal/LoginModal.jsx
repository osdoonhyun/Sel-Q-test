import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { GreyButton, MainButton } from '../../styles/ButtonStyles';

export default function LoginModal({ openLoginModal, handleClose }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    handleClose();
    navigate('/login');
  };
  return (
    <Modal size='sm' show={openLoginModal} onHide={handleClose}>
      <Modal.Body className='py-3 text-center'>
        로그인이 필요한 서비스입니다.
        <br />
        로그인 하시겠습니까?
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <MainButton variant='Light' onClick={handleLogin}>
          로그인 하기
        </MainButton>
        <GreyButton variant='Light' onClick={handleClose}>
          취소
        </GreyButton>
      </Modal.Footer>
    </Modal>
  );
}
