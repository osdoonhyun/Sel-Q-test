import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
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
import { useEditQuestion } from '../hooks/mutations/useEditQuestion';
import { useQuestionDetailQuery } from '../hooks/queries/useGetQuestionDetailById';
import { CATEGORIES, IMPORTANCES } from '../constant/options';
import RequiredLabel from '../components/RequiredLabel';
import { NextButton } from '../styles/ButtonStyles';
import { MAIN, GREYS } from '../styles/variables';

export default function EditQuestion() {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [newHint, setNewHint] = useState('');
  const [hints, setHints] = useState([]);
  const [hintBtnDisable, setHintBtnDisable] = useState(true);

  const { data: question } = useQuestionDetailQuery(questionId);

  const { handleSubmit, getValues, control, setValue } = useForm();

  const { mutateAsync: editQuestion } = useEditQuestion();

  const handleAddHint = () => {
    if (newHint !== '') {
      setHints([...hints, newHint]);
      setValue('hints', hints);
      setNewHint('');
    }
  };

  const handleDeleteHint = (index) => {
    const updatedHints = [...hints];
    updatedHints.splice(index, 1);
    setHints(updatedHints);
  };

  const editQuestionHandler = () => {
    const updatedData = {};

    const questionValue = getValues('question');
    if (questionValue !== '' && questionValue !== question?.question) {
      updatedData.question = questionValue;
    }

    const categoryValue = getValues('category');
    if (categoryValue !== '' && categoryValue !== question?.category) {
      updatedData.category = categoryValue;
    }

    const importanceValue = getValues('importance');
    if (importanceValue !== '' && importanceValue !== question?.importance) {
      updatedData.importance = Number(importanceValue);
    }

    const areArraysEqual =
      JSON.stringify(hints) !== JSON.stringify(question?.hints);
    if (areArraysEqual) {
      updatedData.hints = [...hints];
    }

    editQuestion({ editData: updatedData, questionId });
    navigate(-1);
  };

  useEffect(() => {
    if (newHint !== '') {
      setHintBtnDisable(false);
    } else {
      setHintBtnDisable(true);
    }
  }, [newHint]);

  useEffect(() => {
    if (question?.hints) {
      setHints(question.hints);
    }
  }, [question?.hints]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(editQuestionHandler)}>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>
            질문
            <RequiredLabel />
          </Form.Label>
          <Controller
            name='question'
            control={control}
            defaultValue={question?.question || ''}
            render={({ field }) => (
              <Form.Control
                style={{ height: '80px' }}
                {...field}
                as='textarea'
                type='text'
                value={field.value || question?.question}
                placeholder='질문을 등록하세요.'
              />
            )}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>
                중요도
                <RequiredLabel />
              </Form.Label>
              <Controller
                name='importance'
                control={control}
                defaultValue={question?.importance || ''}
                render={({ field }) => (
                  <Form.Select
                    {...field}
                    value={field.value || question?.importance}
                    aria-label='Select Importance'
                  >
                    <option>중요도 선택</option>
                    {IMPORTANCES.map(({ level }, index) => (
                      <option key={index} value={level}>
                        {level}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>
                카테고리
                <RequiredLabel />
              </Form.Label>
              <Controller
                name='category'
                control={control}
                defaultValue={question?.category || ''}
                render={({ field }) => (
                  <Form.Select
                    {...field}
                    value={field.value || question?.category}
                    aria-label='Select Category'
                  >
                    <option>카테고리 선택</option>
                    {CATEGORIES.slice(1).map(({ category, label }, index) => (
                      <option key={index} value={label}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className='mb-3'>
          <Form.Label>힌트</Form.Label>
          <Controller
            name='hints'
            control={control}
            defaultValue={question?.hints || []}
            render={({ field }) => (
              <>
                <Row>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='힌트를 입력하세요'
                      value={newHint}
                      onChange={(e) => setNewHint(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <NextButton
                      disabled={hintBtnDisable}
                      onClick={handleAddHint}
                    >
                      추가
                    </NextButton>
                  </Col>
                </Row>
                <Stack className='mt-3' direction='horizontal' gap={2}>
                  {hints?.map((hint, index) => (
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
              </>
            )}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>
            답변
            <RequiredLabel />
          </Form.Label>
          <Controller
            name='answer'
            control={control}
            defaultValue={question?.answers[0]?.answers || ''}
            render={({ field }) => (
              <Form.Control
                {...field}
                style={{ height: '180px' }}
                as='textarea'
                type='text'
                value={field.value || question?.answers[0]?.answers}
                placeholder='답변을 등록하세요.'
              />
            )}
          />
        </Form.Group>

        <Button variant='light' type='submit'>
          수정
        </Button>
        <Button
          className='mx-2'
          variant='secondary'
          onClick={() => navigate(-1)}
        >
          취소
        </Button>
      </Form>
    </Container>
  );
}
