import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { useDeleteQuestion } from '../hooks/mutations/useDeleteQuestion';
import { useGetQuestionsByFilteringOption } from '../hooks/queries/useGetQuestionsByFilteringOption';
import {
  CATEGORY_FILTER_OPTION,
  IMPORTANCE_FILTER_OPTION,
} from '../constant/filters';
import QuestionFilter from '../components/filter/QuestionFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/Pagination';
import { TableData, TableHead } from '../styles/Styles';
import DeleteQuestionModal from '../components/modal/DeleteQuestionModal';

export default function QuestionsManagement() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [deletedId, setDeletedId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({});

  const { data: questions } = useGetQuestionsByFilteringOption(
    currentPage,
    filterOptions
  );

  const { mutateAsync: deleteQuestion } = useDeleteQuestion();

  const handleOptionsClick = (item, label) => {
    setFilterOptions({
      ...filterOptions,
      [label]: item,
    });
  };

  const handleCategoryClick = (label, options) => {
    const updatedOptions = options
      .find((option) => option.label === label)
      .options.filter((option) => option.isChecked);
    setFilterOptions({
      ...filterOptions,
      [label]: updatedOptions,
    });
  };

  const handleImportanceClick = (label, options) => {
    const updatedOptions = options
      .find((option) => option.label === label)
      .options.filter((option) => option.isChecked);
    setFilterOptions({
      ...filterOptions,
      [label]: updatedOptions,
    });
  };

  // const handleDeleteModalClose = () => setShow(false);
  const handleDeleteModalShow = (questionId) => {
    setDeletedId(questionId);
    setShow(true);
  };

  const handleEditQuestion = (questionId) => {
    navigate(`/admin/edit/question/${questionId}`);
  };

  const handleDeleteQuestion = () => {
    deleteQuestion({ deletedId });
    setShow(false);
  };

  const [categoryOption, setCategoryOption] = useState(CATEGORY_FILTER_OPTION);
  const [importanceOption, setImportanceOption] = useState(
    IMPORTANCE_FILTER_OPTION
  );

  // TODO: handleOptionCheck, handleImportanceOptionCheck 리팩토링할 것.
  const handleOptionCheck = (e, label) => {
    const { value, checked } = e.target;

    const updatedOptions = categoryOption?.map((optionGroup) => {
      if (optionGroup.label !== label) {
        return optionGroup;
      }

      const updatedOptions = optionGroup.options.map((option) => {
        if (value === '전체선택') {
          return { ...option, isChecked: checked };
        } else if (option.value === value) {
          return { ...option, isChecked: checked };
        }
        return option;
      });
      return { ...optionGroup, options: updatedOptions };
    });

    setCategoryOption(updatedOptions);
  };

  const handleImportanceOptionCheck = (e, label) => {
    const { value, checked } = e.target;
    const updatedOptions = importanceOption?.map((optionGroup) => {
      if (optionGroup.label !== label) {
        return optionGroup;
      }

      const updatedOptions = optionGroup.options.map((option) => {
        if (value === '전체선택') {
          return { ...option, isChecked: checked };
        } else if (option.value === value) {
          return { ...option, isChecked: checked };
        }
        return option;
      });
      return { ...optionGroup, options: updatedOptions };
    });
    setImportanceOption(updatedOptions);
  };

  const handleDeleteOption = (label) => {
    const updatedOptions = { ...filterOptions };
    delete updatedOptions[label];
    setFilterOptions(updatedOptions);
  };

  const handleDeleteCategoryOption = (label, optionValue, optionIndex) => {
    const updatedOptions = { ...filterOptions };
    updatedOptions[label] = updatedOptions[label].filter(
      (_, index) => index !== optionIndex
    );
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [label]: updatedOptions[label],
    }));

    if (label === '카테고리') {
      const updatedCategoryOptions = [...categoryOption];
      updatedCategoryOptions[0].options = updatedCategoryOptions[0].options.map(
        (option) => {
          if (option.value === optionValue) {
            return {
              ...option,
              isChecked: false,
            };
          }
          return option;
        }
      );

      setCategoryOption(updatedCategoryOptions);
    }

    if (label === '중요도') {
      const updatedImportanceOptions = [...importanceOption];
      updatedImportanceOptions[0].options =
        updatedImportanceOptions[0].options.map((option) => {
          if (option.value === optionValue) {
            return {
              ...option,
              isChecked: false,
            };
          }
          return option;
        });
      setImportanceOption(updatedImportanceOptions);
    }
  };

  return (
    <>
      <h1>질문 관리 페이지</h1>
      <QuestionFilter
        filterOptions={filterOptions}
        categoryOption={categoryOption}
        importanceOption={importanceOption}
        handleOptionCheck={handleOptionCheck}
        handleImportanceOptionCheck={handleImportanceOptionCheck}
        handleCategoryClick={handleCategoryClick}
        handleImportanceClick={handleImportanceClick}
        handleOptionsClick={handleOptionsClick}
        handleDeleteOption={handleDeleteOption}
        handleDeleteCategoryOption={handleDeleteCategoryOption}
      />

      <Table bordered hover>
        <thead>
          <tr>
            <TableHead width={4} className='text-center d-none d-md-table-cell'>
              #
            </TableHead>
            <TableHead width={56}>질문</TableHead>
            <TableHead width={12} className='text-center text-nowrap'>
              카테고리
            </TableHead>
            <TableHead width={8} className='text-center text-nowrap'>
              중요도
            </TableHead>
            <TableHead width={12} className='text-center text-nowrap'>
              등록 날짜
            </TableHead>
            <TableHead width={8} className='text-center'>
              옵션
            </TableHead>
          </tr>
        </thead>
        <tbody>
          {questions &&
            questions.data?.map((question, index) => (
              <tr key={question.id}>
                <td className='text-center align-middle p-0 d-none d-md-table-cell'>
                  {(currentPage - 1) * 10 + index + 1}
                </td>
                <TableData $maxW={100} className='align-middle d-md-none'>
                  {question.question}
                </TableData>
                <TableData className='align-middle  d-none d-md-table-cell'>
                  {question.question}
                </TableData>
                <TableData className='text-center align-middle'>
                  {question.category}
                </TableData>
                <td className='text-center align-middle p-0'>
                  {question.importance}
                </td>
                <TableData
                  $maxW={window.innerWidth <= 768 ? '50px' : 'none'}
                  className='text-center align-middle'
                >
                  {question.createdAt.slice(0, 10)}
                </TableData>
                <td className='text-center align-middle p-1'>
                  <DropdownButton
                    id='dropdown-basic-button'
                    variant='light'
                    title={<FontAwesomeIcon icon={faEllipsis} />}
                  >
                    <Dropdown.Item
                      onClick={() => handleEditQuestion(question.id)}
                    >
                      수정
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleDeleteModalShow(question)}
                    >
                      삭제
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className='d-flex justify-content-center'>
        <Pagination
          currentPage={currentPage}
          changePage={setCurrentPage}
          paginatinoData={questions?.meta}
        />
      </div>

      <DeleteQuestionModal
        show={show}
        setShow={setShow}
        handleDeleteQuestion={handleDeleteQuestion}
      />
    </>
  );
}
