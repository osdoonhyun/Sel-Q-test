import { useEffect, useState } from 'react';
import {
  Badge,
  CloseButton,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from 'react-bootstrap';
import useDebounce from '../../hooks/common/useDebounce';
import { MAIN, GREYS } from '../../styles/variables';
import { NextButton } from '../../styles/ButtonStyles';
import RequiredLabel from '../../components/RequiredLabel';
import { CATEGORIES, IMPORTANCES } from '../../constant/options';

export default function QuestionInput({ autoLoad, onNext }) {
  const [questionFormData, setQuestionFormData] = useState({
    question: '',
    importance: 0,
    category: '',
    hint: '',
    hints: [],
  });
  const [hintBtnDisable, setHintBtnDisable] = useState(true);
  const [nextBtnDisable, setNextBtnDisable] = useState(true);

  const debounceFormData = useDebounce(questionFormData);

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

  const saveDataToLocalStorage = (dataType, data) => {
    localStorage.setItem(dataType, JSON.stringify(data));
  };

  // 작성중이던 데이터 불러오기
  useEffect(() => {
    const storedQuestionForm = localStorage.getItem('question');

    if (autoLoad && storedQuestionForm) {
      setQuestionFormData(JSON.parse(storedQuestionForm));
    }
  }, [autoLoad]);

  // 임시 자동저장
  useEffect(() => {
    saveDataToLocalStorage('question', debounceFormData);
  }, [debounceFormData]);

  // 힌트 버튼 활성화 관련 Effect
  useEffect(() => {
    if (questionFormData.hint !== '') {
      setHintBtnDisable(false);
    } else {
      setHintBtnDisable(true);
    }
  }, [questionFormData.hint]);

  // 다음 버튼 활성화 관련 Effect
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
            <RequiredLabel />
          </Form.Label>

          <Form.Control
            style={{ height: '120px' }}
            as='textarea'
            type='text'
            placeholder='질문을 등록하세요.'
            defaultValue={questionFormData.question}
            // value={questionFormData.question}
            onChange={(e) =>
              setQuestionFormData({
                ...questionFormData,
                question: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>
            중요도
            <RequiredLabel />
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
            {IMPORTANCES.map(({ level }, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>
            카테고리
            <RequiredLabel />
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
              <NextButton disabled={hintBtnDisable} onClick={handleAddHint}>
                추가
              </NextButton>
            </Col>
          </Row>
          <Stack className='mt-3' direction='horizontal' gap={2}>
            {questionFormData.hints?.map((hint, index) => (
              <Badge
                bg={MAIN.MEDIUM}
                style={{
                  fontSize: '0.8rem',
                  color: GREYS.LIGHTER,
                  letterSpacing: '0.1rem',
                  backgroundColor: MAIN.MEDIUM,
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

        <NextButton disabled={nextBtnDisable} type='submit'>
          다음
        </NextButton>
      </Form>
      <br />
    </Container>
  );
}
