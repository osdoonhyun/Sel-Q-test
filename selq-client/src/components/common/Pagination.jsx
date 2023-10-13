import { Pagination as PaginationTool } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faAnglesLeft,
  faChevronRight,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Pagination({
  currentPage,
  changePage,
  paginatinoData,
}) {
  const pageCount = paginatinoData?.pageCount || 0;

  const handlePageChange = (page) => {
    changePage(page);
  };

  return (
    <PaginationTool>
      <PaginationTool.First onClick={() => handlePageChange(1)}>
        <FontAwesomeIcon
          style={{ color: '#5bacee' }}
          icon={faAnglesLeft}
          size='lg'
        />
      </PaginationTool.First>
      <PaginationTool.Prev
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
      >
        <FontAwesomeIcon
          style={{ color: '#5bacee' }}
          icon={faChevronLeft}
          size='sm'
        />
      </PaginationTool.Prev>

      {[...Array(pageCount)].map((_, index) => (
        <PaginationTool.Item
          key={index}
          linkStyle={
            index + 1 === currentPage
              ? {
                  backgroundColor: '#5bacee',
                }
              : {}
          }
          onClick={() => handlePageChange(index + 1)}
        >
          <span
            style={{
              color: index + 1 === currentPage ? '#f0f4f5' : '#5bacee',
            }}
          >
            {index + 1}
          </span>
        </PaginationTool.Item>
      ))}

      <PaginationTool.Next
        onClick={() => handlePageChange(Math.min(currentPage + 1, pageCount))}
      >
        <FontAwesomeIcon
          style={{ color: '#5bacee' }}
          icon={faChevronRight}
          size='sm'
        />
      </PaginationTool.Next>
      <PaginationTool.Last onClick={() => handlePageChange(pageCount)}>
        <FontAwesomeIcon
          style={{ color: '#5bacee' }}
          icon={faAnglesRight}
          size='lg'
        />
      </PaginationTool.Last>
    </PaginationTool>
  );
}
