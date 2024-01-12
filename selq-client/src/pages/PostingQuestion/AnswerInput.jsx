import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import useDebounce from '../../hooks/common/useDebounce';
import { GREYS } from '../../styles/variables';
import { NextButton } from '../../styles/ButtonStyles';
import RequiredLabel from '../../components/RequiredLabel';

export default function AnswerInput({
  autoLoad,
  question,
  onPrevious,
  onNext,
}) {
  const [answers, setAnswers] = useState('');

  const debounceAnswer = useDebounce(answers);

  const postingAnswer = (e) => {
    e.preventDefault();

    onNext({ answers });
  };

  const saveDataToLocalStorage = (dataType, data) => {
    localStorage.setItem(dataType, JSON.stringify(data));
  };

  // 작성중이던 데이터 불러오기
  useEffect(() => {
    const storedAnswerForm = localStorage.getItem('answer');

    if (autoLoad && storedAnswerForm) {
      setAnswers(JSON.parse(storedAnswerForm));
    }
  }, [autoLoad]);

  // 임시 자동저장
  useEffect(() => {
    saveDataToLocalStorage('answer', debounceAnswer);
  }, [debounceAnswer]);

  return (
    <Container>
      <Form onSubmit={postingAnswer}>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>
            질문
            <RequiredLabel />
          </Form.Label>
          <div style={{ color: GREYS.DARKEST }}>
            <ReactMarkdown children={question} />
          </div>
        </Form.Group>

        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>
            답변
            <RequiredLabel />
          </Form.Label>
          <Form.Control
            style={{ height: '150px' }}
            as='textarea'
            type='text'
            placeholder='답변을 등록하세요.'
            // value={answers}
            defaultValue={answers}
            onChange={(e) => setAnswers(e.target.value)}
          />
        </Form.Group>

        <div>
          <NextButton onClick={onPrevious}>이전</NextButton>
          <NextButton className='mx-2' disabled={!answers} type='submit'>
            다음
          </NextButton>
        </div>
      </Form>
    </Container>
  );
}
