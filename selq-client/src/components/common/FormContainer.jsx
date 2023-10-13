import { Col, Row } from 'react-bootstrap';

export default function FormContainer({ children }) {
  return (
    <div
      style={{
        maxWidth: '390px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Row>
        <Col>{children}</Col>
      </Row>
    </div>
  );
}
