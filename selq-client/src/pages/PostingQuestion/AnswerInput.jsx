import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function AnswerInput({ question, onNext }) {
  const [answers, setAnswers] = useState('');

  const postingAnswer = (e) => {
    e.preventDefault();

    onNext({ answers });
  };

  return (
    <Container>
      <Form onSubmit={postingAnswer}>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>
            질문<span style={{ position: 'relative', top: '-3px' }}>*</span>
          </Form.Label>
          <div style={{ color: '#1e235a66' }}>
            <ReactMarkdown children={question} />
          </div>
        </Form.Group>

        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>
            답변<span style={{ position: 'relative', top: '-3px' }}>*</span>
          </Form.Label>
          <Form.Control
            style={{ height: '150px' }}
            as='textarea'
            type='text'
            placeholder='답변을 등록하세요.'
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
          />
        </Form.Group>

        <Button
          style={{
            backgroundColor: '#2f93ea',
            border: '1px solid #2f93ea',
            color: '#fff',
          }}
          disabled={!answers}
          variant='Light'
          type='submit'
        >
          다음
        </Button>
      </Form>
    </Container>
  );
}
