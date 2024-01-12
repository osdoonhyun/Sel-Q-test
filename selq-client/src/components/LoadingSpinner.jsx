import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner() {
  return (
    <>
      <Spinner animation='border' size='sm' role='status' aria-hidden='true' />
      <span className='visually-hidden'>Loading...</span>
    </>
  );
}
