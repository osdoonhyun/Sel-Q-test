import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useFontSize } from '../context/FontSizingProvider';
import { bookmarkedQuestions } from '../store/Slices/bookmark';
import ImportanceCount from '../components/ImportanceCount';
import CustomBadge from '../components/CustomBadge';
import Bookmark from '../components/button/Bookmark';
import { BookmarkH2, MbDiv, QuestionQ, QuestionTitle } from '../styles/Styles';

export default function BookmarkedQuestions() {
  const { fontSizing, calcFontSize } = useFontSize();
  const bookmarkQuestions = useSelector(bookmarkedQuestions);

  return (
    <>
      {bookmarkQuestions.length > 0 ? (
        bookmarkQuestions.map((question, index) => (
          <LinkContainer to={`/bookmarks/${question.id}`} key={question.id}>
            <div>
              <Row>
                <Col className='d-flex align-items-end'>
                  <QuestionQ size={calcFontSize('1.8rem', fontSizing)}>
                    Q.
                  </QuestionQ>
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                  <div className='d-flex flex-column'>
                    <div>
                      <ImportanceCount importance={question.importance} />
                    </div>
                    <div className='mx-1 d-flex justify-content-end mt-2'>
                      <Bookmark question={question} />
                    </div>
                  </div>
                </Col>
              </Row>
              <MbDiv $isLastItem={index === bookmarkQuestions?.length - 1}>
                <QuestionTitle
                  size={calcFontSize('1.6rem', fontSizing)}
                  $mbottom='0.5rem'
                  cursor={'pointer'}
                >
                  {question.question}
                </QuestionTitle>
                <CustomBadge text={question.category} />
              </MbDiv>
            </div>
          </LinkContainer>
        ))
      ) : (
        <BookmarkH2 className='d-flex justify-content-center align-items-center'>
          북마크를 추가해 주세요.
        </BookmarkH2>
      )}
    </>
  );
}
