import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import CustomBadge from '../components/CustomBadge';
import { StyledButton } from '../styles/Styles';

export default function Hint({ hints }) {
  const [open, setOpen] = useState(false);

  const handleHintsButton = () => {
    setOpen(!open);
  };

  return (
    <div className='d-inline-block mt-4'>
      <StyledButton
        onClick={handleHintsButton}
        aria-controls='example-collapse-text'
        aria-expanded={open}
        disabled={hints === null}
      >
        Hint
      </StyledButton>
      <Collapse in={open}>
        <div id='example-collapse-text' className='mt-4 flex-wrap'>
          <ul className='d-flex p-0'>
            {hints?.map((hint, index) => (
              <li key={index}>
                <CustomBadge text={hint} />
              </li>
            ))}
          </ul>
        </div>
      </Collapse>
    </div>
  );
}
