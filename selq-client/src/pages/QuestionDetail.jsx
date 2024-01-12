import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import useCheckBookmarkedQuestion from '../hooks/common/useCheckBookmarkedQuestion';
import { useFontSize } from '../context/FontSizingProvider';
import { useQuestionDetailQuery } from '../hooks/queries/useGetQuestionDetailById';
import { toggleBookmark } from '../store/Slices/bookmark';
import Hint from '../components/Hint';
import Answer from '../components/Answer';
import GoBackButton from '../components/button/GoBackButton';
import ImportanceCount from '../components/ImportanceCount';
import LoginModal from '../components/modal/LoginModal';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { QuestionQ, QuestionTitle } from '../styles/Styles';
import { GREYS, MAIN } from '../styles/variables';

export default function QuestionDetail() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { questionId } = useParams();
  const { fontSizing, calcFontSize } = useFontSize();
  const { data: question } = useQuestionDetailQuery(questionId);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { bookmarked, toggleBookmarked } = useCheckBookmarkedQuestion(question);

  const handleClose = () => setOpenLoginModal(false);

  const handleBookmark = () => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
    toggleBookmarked();
    dispatch(toggleBookmark(question));
  };

  return (
    <>
      <GoBackButton />
      <div className='d-flex flex-column'>
        <Row>
          <Col className='d-flex align-items-end'>
            <QuestionQ size={calcFontSize('1.8rem', fontSizing)}>Q.</QuestionQ>
          </Col>
          <Col className='d-flex justify-content-end align-items-center'>
            <div className='d-flex flex-column'>
              <div>
                <ImportanceCount importance={question?.importance} />
              </div>
              <div className='d-flex justify-content-end mx-1 mt-2'>
                <FontAwesomeIcon
                  style={{
                    color: bookmarked ? MAIN.MEDIUM : GREYS.MEDIUM,
                    cursor: 'pointer',
                    animation: bookmarked ? 'bounce 0.75s' : '',
                    fontSize: bookmarked ?? '2rem',
                  }}
                  onClick={handleBookmark}
                  icon={bookmarked ? faBookmarkSolid : faBookmarkRegular}
                  size='xl'
                />
              </div>
            </div>
          </Col>
        </Row>
        <QuestionTitle size={calcFontSize('1.6rem', fontSizing)}>
          {question?.question}
        </QuestionTitle>
        <Fragment key={question?.id}>
          <Hint hints={question?.hints} />
          <Answer answers={question?.answers} />
        </Fragment>
      </div>

      <LoginModal openLoginModal={openLoginModal} handleClose={handleClose} />
    </>
  );
}
