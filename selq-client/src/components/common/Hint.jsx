import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import CustomBadge from '../ui/CustomBadge';
import { StyledButton } from '../../styles/Styles';

export default function Hint({ hints }) {
  const [open, setOpen] = useState(false);

  const handleHintsButton = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: 'inline-block', marginTop: '1.5rem' }}>
      <StyledButton
        onClick={handleHintsButton}
        aria-controls='example-collapse-text'
        aria-expanded={open}
        disabled={hints === null}
      >
        Hint
      </StyledButton>
      <Collapse in={open}>
        <div
          id='example-collapse-text'
          style={{
            marginTop: '0.8rem',
            flexWrap: 'wrap',
          }}
        >
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
