import React from 'react';
import { Controller } from 'react-hook-form';
import { Form, Row, Col, Image, Button } from 'react-bootstrap';
import { ErrorMessage } from '../styles/Styles';

const UsernameForm = ({ label, content, control, setValue, errors }) => {
  const isMdOrLarger = window.innerWidth >= 988;
  return (
    <>
      {isMdOrLarger ? (
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            {label}
          </Form.Label>
          <Col sm={10}>
            <Controller
              name='username'
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='text'
                  value={field.value || content || ''}
                  onChange={(e) => {
                    setValue('username', e.target.value);
                    field.onChange(e);
                  }}
                />
              )}
            />
          </Col>
        </Form.Group>
      ) : (
        <Form.Group as={Col}>
          <Form.Label>{label}</Form.Label>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                type='text'
                value={field.value || content || ''}
                onChange={(e) => setValue('username', e.target.value)}
              />
            )}
          />
        </Form.Group>
      )}
      <ErrorMessage className='mb-4'>{errors}</ErrorMessage>
    </>
  );
};

const EmailForm = ({ label, email }) => {
  if (!email) {
    return null;
  }
  const isMdOrLarger = window.innerWidth >= 988;
  const [emailId, emailCategory] = email.split('@');

  return (
    <>
      {isMdOrLarger ? (
        <Form.Group as={Row} className='mb-4'>
          <Form.Label column sm={2}>
            {label}
          </Form.Label>
          <Col sm={10}>
            <Row>
              <Col>
                <Form.Control type='text' value={emailId} disabled />
              </Col>
              <Col xs='auto' className='d-flex align-items-center p-0'>
                <span>@</span>
              </Col>
              <Col>
                <Form.Control type='text' value={emailCategory} disabled />
              </Col>
            </Row>
          </Col>
        </Form.Group>
      ) : (
        <Form.Group as={Col} className='mb-4'>
          <Form.Label>{label}</Form.Label>
          <Col>
            <Row>
              <Col>
                <Form.Control type='text' value={emailId} disabled />
              </Col>
              <Col xs='auto' className='d-flex align-items-center p-0'>
                <span>@</span>
              </Col>
              <Col>
                <Form.Control type='text' value={emailCategory} disabled />
              </Col>
            </Row>
          </Col>
        </Form.Group>
      )}
    </>
  );
};

const ImageForm = ({ img }) => {
  const isMdOrLarger = window.innerWidth >= 988;

  return (
    <>
      {isMdOrLarger ? (
        <Form.Group as={Row} className='mb-4'>
          <Form.Label column sm={3}>
            프로필 이미지
          </Form.Label>

          <Col sm={9}>
            <Image src={img} roundedCircle />
            {/* <Form.Control type='file' /> */}
          </Col>
        </Form.Group>
      ) : (
        <Form.Group as={Col} className='mb-4'>
          <Form.Label>프로필 이미지</Form.Label>

          <Col>
            <Image src={img} roundedCircle />
            {/* <Form.Control type='file' /> */}
          </Col>
        </Form.Group>
      )}
    </>
  );
};

const DeleteForm = ({ showModal }) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        회원 탈퇴
      </Form.Label>
      <Col sm={10}>
        <Button variant='danger' onClick={showModal}>
          회원 탈퇴
        </Button>
      </Col>
    </Form.Group>
  );
};

export { UsernameForm, EmailForm, ImageForm, DeleteForm };
