import React from 'react';
import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';

export default function ErrorToast({ errorShow, setErrorShow }) {
  return (
    <ToastContainer
      className='mb-5'
      position='bottom-center'
      style={{ zIndex: 1 }}
    >
      <Toast onClose={setErrorShow} show={errorShow} delay={3000} autohide>
        <Toast.Body>이메일 주소나 비밀번호가 틀립니다.</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
