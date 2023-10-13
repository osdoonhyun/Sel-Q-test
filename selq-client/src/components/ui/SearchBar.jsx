import { Suspense, useDeferredValue, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchQuetions from './SearchQuetions';
import { useSearchQuestionsQuery } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const defferedSearchInput = useDeferredValue(searchInput);
  const isStale = searchInput !== defferedSearchInput;

  const { data: searchResults } = useSearchQuestionsQuery({ searchInput });

  const handleClose = () => {
    setSearchInput('');
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const questionClickHandler = (quesetionId) => {
    navigate(`/questions/${quesetionId}`);
    handleClose();
  };

  return (
    <>
      <Button variant='Light' onClick={handleShow}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon color='#B3B3B5' icon={faMagnifyingGlass} size='xl' />
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <label
            style={{ width: '100%', display: 'flex', alignItems: 'center' }}
          >
            <FontAwesomeIcon
              color='#B3B3B5'
              icon={faMagnifyingGlass}
              size='xl'
            />
            <input
              style={{
                width: '100%',
                marginLeft: '10px',
                padding: '2px 6px',
                border: 0,
                borderRadius: '4px',
                outline: '2px solid  #A8D0F2',
              }}
              placeholder='Search Questions'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              autoFocus
            />
          </label>
        </Modal.Header>
        <Modal.Body>
          <Suspense>
            <div style={{ opacity: isStale ? 0.5 : 1 }}>
              <SearchQuetions
                searchResults={searchResults}
                searchInput={defferedSearchInput}
                questionClickHandler={questionClickHandler}
              />
            </div>
          </Suspense>
        </Modal.Body>
      </Modal>
    </>
  );
}
