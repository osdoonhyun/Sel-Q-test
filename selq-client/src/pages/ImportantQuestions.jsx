import { useState } from 'react';
import {
  Badge,
  ButtonGroup,
  CloseButton,
  Col,
  DropdownButton,
  Form,
  Row,
  Stack,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useFontSize } from '../context/FontSizingProvider';
import { useGetQuestionsByFilteringOption } from '../hooks/queries/useGetQuestionsByFilteringOption';
import CustomBadge from '../components/CustomBadge';
import ImportanceCount from '../components/ImportanceCount';
import { QuestionQ, QuestionTitle } from '../styles/Styles';
import Pagination from '../components/Pagination';
import { IMPORTANCE_FILTER_OPTION } from '../constant/filters';
import { MAIN, GREYS } from '../styles/variables';

export default function ImportantQuestions() {
  const { fontSizing, calcFontSize } = useFontSize();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilterOption, setSelectedFilterOption] = useState({});
  const [importanceOption, setImportanceOption] = useState(
    IMPORTANCE_FILTER_OPTION
  );

  const { data: importantQuestions } = useGetQuestionsByFilteringOption(
    currentPage,
    selectedFilterOption
  );

  const handleImportanceClick = (label, options) => {
    const updatedOptions = options
      .find((option) => option.label === label)
      .options.filter((option) => option.isChecked);
    setSelectedFilterOption({
      ...selectedFilterOption,
      [label]: updatedOptions,
    });
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

  const handleDeleteOption = (label, optionValue, optionIndex) => {
    const updatedOptions = { ...selectedFilterOption };
    updatedOptions[label] = updatedOptions[label].filter(
      (_, index) => index !== optionIndex
    );
    setSelectedFilterOption((prevOptions) => ({
      ...prevOptions,
      [label]: updatedOptions[label],
    }));

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
      {importanceOption?.map((filterOption) => (
        <DropdownButton
          className='p-1'
          onToggle={(isOpen) => {
            if (!isOpen) {
              handleImportanceClick(filterOption.label, importanceOption);
            }
          }}
          variant='Light'
          as={ButtonGroup}
          key={filterOption.label}
          id={`dropdown-variants-${filterOption.label}`}
          title={filterOption.label}
        >
          <>
            <Stack style={{ padding: '0 16px' }} direction='horizontal'>
              <Form.Check
                type='checkbox'
                value='전체선택'
                tag={filterOption.label}
                onChange={(e) =>
                  handleImportanceOptionCheck(e, filterOption.label)
                }
                checked={importanceOption
                  .find(
                    (optionGroup) => optionGroup.label === filterOption.label
                  )
                  ?.options.every((option) => option.isChecked)}
              />
              <span className='ms-auto'>전체선택</span>
            </Stack>
            <hr />
            {filterOption.options.map((option, index) => (
              <Stack
                key={index}
                style={{ padding: '0 16px' }}
                direction='horizontal'
              >
                <Form.Check
                  type='checkbox'
                  onChange={(e) =>
                    handleImportanceOptionCheck(e, filterOption.label)
                  }
                  checked={option.isChecked}
                  value={option.value}
                />
                <span className='ms-auto'>{option.value}</span>
              </Stack>
            ))}
          </>
        </DropdownButton>
      ))}
      <Stack direction='horizontal' gap={2} className='p-2'>
        {Object.keys(selectedFilterOption).map((label, index) =>
          selectedFilterOption[label].map((option, optionIndex) => (
            <Badge
              bg={MAIN.MEDIUM}
              style={{
                fontSize: '0.8rem',
                color: GREYS.LIGHTER,
                letterSpacing: '0.1rem',
                backgroundColor: MAIN.MEDIUM,
              }}
              key={optionIndex}
              className='d-flex justify-content-center align-items-center '
            >
              <span style={{ marginRight: '5px' }}>{option.value}</span>
              <CloseButton
                onClick={() => {
                  handleDeleteOption(label, option.value, optionIndex);
                }}
              />
            </Badge>
          ))
        )}
      </Stack>

      {importantQuestions?.data?.map((question, index) => (
        <LinkContainer to={`/importants/${question.id}`} key={question.id}>
          <div>
            <Row
              style={{
                marginTop: index === 0 ? '20px' : '50px',
              }}
            >
              <Col>
                <QuestionQ
                  size={calcFontSize('1.6rem', fontSizing)}
                  cursor={'pointer'}
                >
                  Q.
                </QuestionQ>
              </Col>
              <Col className='d-flex justify-content-end align-items-center'>
                <ImportanceCount importance={question.importance} />
              </Col>
            </Row>
            <div
              style={{
                marginBottom:
                  index === importantQuestions?.data.length - 1 && '50px',
              }}
            >
              <QuestionTitle
                size={calcFontSize('1.6rem', fontSizing)}
                $mbottom='0.5rem'
                cursor={'pointer'}
              >
                {question.question}
              </QuestionTitle>
              <CustomBadge text={question.category} />
            </div>
          </div>
        </LinkContainer>
      ))}
      <div className='d-flex justify-content-center'>
        <Pagination
          currentPage={currentPage}
          changePage={setCurrentPage}
          paginatinoData={importantQuestions?.meta}
        />
      </div>
    </>
  );
}
