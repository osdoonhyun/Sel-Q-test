import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from 'react-bootstrap';
import { CATEGORIES } from '../../constant/categories';

export default function QuestionInput({ onNext }) {
  const [questionFormData, setQuestionFormData] = useState({
    question: '',
    importance: 0,
    category: '',
    hint: '',
    hints: [],
  });
  const [hintBtnDisable, setHintBtnDisable] = useState(true);
  const [nextBtnDisable, setNextBtnDisable] = useState(true);

  const postingQuestion = (e) => {
    e.preventDefault();

    onNext({
      question: questionFormData.question,
      importance: questionFormData.importance,
      category: questionFormData.category,
      hints: questionFormData.hints,
    });
  };

  const handleAddHint = () => {
    setQuestionFormData({
      ...questionFormData,
      hints: [...questionFormData.hints, questionFormData.hint],
      hint: '',
    });
  };

  const handleDeleteHint = (index) => {
    const updatedHints = [...questionFormData.hints];
    updatedHints.splice(index, 1);
    setQuestionFormData({
      ...questionFormData,
      hints: updatedHints,
    });
  };

  useEffect(() => {
    if (questionFormData.hint !== '') {
      setHintBtnDisable(false);
    } else {
      setHintBtnDisable(true);
    }
  }, [questionFormData.hint]);

  useEffect(() => {
    if (
      questionFormData.question !== '' &&
      questionFormData.importance !== '' &&
      questionFormData.category !== ''
    ) {
      setNextBtnDisable(false);
    } else {
      setNextBtnDisable(true);
    }
  }, [questionFormData]);

  return (
    <Container>
      <Form onSubmit={postingQuestion}>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>
            질문
            <span style={{ position: 'relative', top: '-3px' }}>*</span>
          </Form.Label>

          <Form.Control
            style={{ height: '120px' }}
            as='textarea'
            type='text'
            placeholder='질문을 등록하세요.'
            value={questionFormData.question}
            onChange={(e) =>
              setQuestionFormData({
                ...questionFormData,
                question: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>
            중요도<span style={{ position: 'relative', top: '-3px' }}>*</span>
          </Form.Label>
          <Form.Select
            value={questionFormData.importance}
            onChange={(e) =>
              setQuestionFormData({
                ...questionFormData,
                importance: Number(e.target.value),
              })
            }
            aria-label='Select Importance'
          >
            <option>중요도 선택</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>
            카테고리<span style={{ position: 'relative', top: '-3px' }}>*</span>
          </Form.Label>
          <Form.Select
            value={questionFormData.category}
            onChange={(e) =>
              setQuestionFormData({
                ...questionFormData,
                category: e.target.value,
              })
            }
            aria-label='Select Category'
          >
            <option>카테고리 선택</option>
            {CATEGORIES.slice(1).map(({ category, label }, index) => (
              <option key={index} value={label}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' md='4' controlId='validationCustom01'>
          <Form.Label>힌트</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type='text'
                placeholder='힌트를 입력하세요'
                value={questionFormData.hint}
                onChange={(e) =>
                  setQuestionFormData({
                    ...questionFormData,
                    hint: e.target.value,
                  })
                }
              />
            </Col>
            <Col>
              <Button
                variant='Light'
                style={{
                  backgroundColor: '#2f93ea',
                  border: '1px solid #2f93ea',
                  color: '#fff',
                }}
                disabled={hintBtnDisable}
                onClick={handleAddHint}
              >
                추가
              </Button>
            </Col>
          </Row>
          <Stack className='mt-3' direction='horizontal' gap={2}>
            {questionFormData.hints?.map((hint, index) => (
              <Badge
                bg='#5bacee'
                style={{
                  fontSize: '0.8rem',
                  color: '#fff',
                  letterSpacing: '0.1rem',
                  backgroundColor: '#5bacee',
                }}
                key={index}
                className='d-flex justify-content-center align-items-center'
              >
                <span style={{ marginRight: '5px' }}>{hint}</span>
                <CloseButton onClick={() => handleDeleteHint(index)} />
              </Badge>
            ))}
          </Stack>
        </Form.Group>

        <Button
          style={{
            backgroundColor: '#2f93ea',
            border: '1px solid #2f93ea',
            color: '#fff',
          }}
          disabled={nextBtnDisable}
          variant='Light'
          type='submit'
        >
          다음
        </Button>
      </Form>
      <br />
    </Container>
  );
}
