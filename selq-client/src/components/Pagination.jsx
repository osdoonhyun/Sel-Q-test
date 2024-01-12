import { Pagination as PaginationTool } from 'react-bootstrap';
import {
  faChevronLeft,
  faAnglesLeft,
  faChevronRight,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import { MAIN } from '../styles/variables';
import { ActiveSpan, GreyFontAwesomeIcon } from '../styles/Styles';

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
        <GreyFontAwesomeIcon icon={faAnglesLeft} size='lg' />
      </PaginationTool.First>
      <PaginationTool.Prev
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
      >
        <GreyFontAwesomeIcon icon={faChevronLeft} size='sm' />
      </PaginationTool.Prev>

      {[...Array(pageCount)].map((_, index) => (
        <PaginationTool.Item
          key={index}
          linkStyle={
            index + 1 === currentPage
              ? {
                  backgroundColor: MAIN.MEDIUM,
                }
              : {}
          }
          onClick={() => handlePageChange(index + 1)}
        >
          <ActiveSpan $isActive={index + 1 === currentPage}>
            {index + 1}
          </ActiveSpan>
        </PaginationTool.Item>
      ))}

      <PaginationTool.Next
        onClick={() => handlePageChange(Math.min(currentPage + 1, pageCount))}
      >
        <GreyFontAwesomeIcon icon={faChevronRight} size='sm' />
      </PaginationTool.Next>
      <PaginationTool.Last onClick={() => handlePageChange(pageCount)}>
        <GreyFontAwesomeIcon icon={faAnglesRight} size='lg' />
      </PaginationTool.Last>
    </PaginationTool>
  );
}
