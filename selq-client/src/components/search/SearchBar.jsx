import { Suspense, useDeferredValue, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchQuetions from './SearchQuetions';
import { useNavigate } from 'react-router-dom';
import { GREYS } from '../../styles/variables';
import { useSearchQuestions } from '../../hooks/queries/useSearchQuestions';
import useThrottle from '../../hooks/common/useThrottle';
import { OpacityDiv, SearchInput } from '../../styles/Styles';

export default function SearchBar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const throttleSearch = useThrottle(searchInput, 500);
  const defferedSearchInput = useDeferredValue(searchInput);
  const isStale = searchInput !== defferedSearchInput;

  const { data: searchResults } = useSearchQuestions({
    searchInput: throttleSearch,
  });

  const onChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

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
        <div className='d-flex flex-column align-items-center'>
          <FontAwesomeIcon
            color={GREYS.MEDIUM}
            icon={faMagnifyingGlass}
            size='xl'
          />
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <label className='w-100 d-flex align-items-center'>
            <FontAwesomeIcon
              color={GREYS.MEDIUM}
              icon={faMagnifyingGlass}
              size='xl'
            />
            <SearchInput
              placeholder='Search Questions'
              value={searchInput}
              onChange={onChangeSearchInput}
              autoFocus
            />
          </label>
        </Modal.Header>
        <Modal.Body>
          <Suspense>
            <OpacityDiv $isStale={isStale}>
              <SearchQuetions
                searchResults={searchResults}
                searchInput={defferedSearchInput}
                questionClickHandler={questionClickHandler}
              />
            </OpacityDiv>
          </Suspense>
        </Modal.Body>
      </Modal>
    </>
  );
}
