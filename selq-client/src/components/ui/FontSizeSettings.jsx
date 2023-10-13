import { useContext, useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  CardGroup,
  Col,
  Overlay,
  Popover,
  Row,
} from 'react-bootstrap';
import { FontSizingContext } from '../../context/FontSizingProvider';
import { getTargetIndex } from '../../utils/fontSize';
import { FONT_SIZE_OPTIONS } from '../../constant/options';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function FontSizeSettings() {
  const { fontSizing, handleFontSizing } = useContext(FontSizingContext);
  const [selectedFontCard, setSelectedFontCard] = useState('');
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleFontSizeSaved = (event) => {
    event.stopPropagation();
    handleFontSizing(getTargetIndex(selectedFontCard));
    setShow(!show);
    setTarget(event.target);
  };

  const handleFontCardClick = (variant) => {
    setSelectedFontCard(variant);
  };

  useEffect(() => {
    const handleOutsideClose = (event) => {
      if (show && !ref.current.contains(event.target)) {
        setShow(!show);
      }
    };
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
  }, [show]);

  return (
    <div ref={ref}>
      <Button variant='Light' onClick={handleClick}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon color='#B3B3B5' icon={faGear} size='xl' />
        </div>
      </Button>

      <Overlay
        show={show}
        target={target}
        placement='bottom'
        container={ref}
        containerPadding={20}
        style={{
          fontFamily: 'BMHANNAPro',
        }}
      >
        <Popover id='popover-contained'>
          <Popover.Header as='h3'>
            <Row className='d-flex justify-content-between'>
              <Col
                style={{
                  fontFamily: 'BMHANNAPro',
                }}
                className='text-muted'
              >
                글자크기
              </Col>
              <Col
                className='text-end text-muted'
                onClick={handleFontSizeSaved}
                style={{
                  cursor: 'pointer',
                  fontFamily: 'BMHANNAPro',
                }}
              >
                저장
              </Col>
            </Row>
          </Popover.Header>
          <Popover.Body>
            <CardGroup>
              <Row>
                {FONT_SIZE_OPTIONS.map(({ label, size, variant }, index) => (
                  <Col key={index}>
                    <Card
                      onClick={() => handleFontCardClick(variant)}
                      style={{
                        border:
                          (selectedFontCard || fontSizing) === variant &&
                          '3px solid #5bacee',
                      }}
                    >
                      <Card.Body
                        style={{
                          height: '86px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Card.Text
                          style={{
                            fontSize: size,
                            fontFamily: 'BMHANNAPro',
                          }}
                        >
                          가 Aa
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className='d-flex justify-content-center align-items-center p-3'>
                        <span className='text-muted'>{label}</span>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </CardGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}
