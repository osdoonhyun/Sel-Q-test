import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useFontSize } from '../context/FontSizingProvider';
import { AnswerDiv, CollapseDiv, StyledButton } from '../styles/Styles';

export default function Answer({ answers }) {
  const { fontSizing, calcFontSize } = useFontSize();
  const [open, setOpen] = useState(false);

  const handleAnswerButton = () => {
    setOpen(!open);
  };

  return (
    <AnswerDiv>
      <StyledButton
        onClick={handleAnswerButton}
        aria-controls='example-collapse-text'
        aria-expanded={open}
      >
        A.
      </StyledButton>
      <Collapse in={open}>
        <CollapseDiv
          id='example-collapse-text'
          $calcFontSize={calcFontSize('1.3rem', fontSizing)}
        >
          <ul className='p-0'>
            {answers?.map((answer, index) => (
              <li key={index}>
                <ReactMarkdown children={answer.answers} />
              </li>
            ))}
          </ul>
        </CollapseDiv>
      </Collapse>
    </AnswerDiv>
  );
}
