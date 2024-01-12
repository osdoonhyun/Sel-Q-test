import { Col, Row } from 'react-bootstrap';
import { FormContainerDiv } from '../../styles/LayoutStyles';

export default function FormContainer({ children }) {
  return (
    <FormContainerDiv>
      <Row>
        <Col>{children}</Col>
      </Row>
    </FormContainerDiv>
  );
}
