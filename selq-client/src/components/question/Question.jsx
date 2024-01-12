import { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';
import ImportanceCount from '../ImportanceCount';
import { useFontSize } from '../../context/FontSizingProvider';
import { QuestionQ, QuestionTitle } from '../../styles/Styles';
import Bookmark from '../button/Bookmark';

export default function Question({ question, children }) {
  const { fontSizing, calcFontSize } = useFontSize();
  const { id, question: questionTitle, importance } = question;

  return (
    <div className='d-flex flex-column' key={id}>
      <Row>
        <Col className='d-flex align-items-end'>
          <QuestionQ size={calcFontSize('1.8rem', fontSizing)}>Q.</QuestionQ>
        </Col>
        <Col className='d-flex justify-content-end align-items-center'>
          <div className='d-flex flex-column'>
            <div>
              <ImportanceCount importance={importance} />
            </div>
            <div className='d-flex justify-content-end mx-1 mt-2'>
              <Bookmark question={question} />
            </div>
          </div>
        </Col>
      </Row>
      <QuestionTitle size={calcFontSize('1.6rem', fontSizing)}>
        {questionTitle}
      </QuestionTitle>
      <Fragment>{children}</Fragment>
    </div>
  );
}
