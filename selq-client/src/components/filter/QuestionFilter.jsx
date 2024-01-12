import {
  ButtonGroup,
  CloseButton,
  Dropdown,
  DropdownButton,
  Form,
  Stack,
} from 'react-bootstrap';
import { DATE_FILTER_OPTION } from '../../constant/filters';
import { MAIN } from '../../styles/variables';
import { MainBadge } from '../../styles/BadgeStyles';
import { FilterSpan, FilterStack } from '../../styles/Styles';

export default function QuestionFilter({
  filterOptions,
  categoryOption,
  importanceOption,
  handleOptionCheck,
  handleOptionsClick,
  handleDeleteOption,
  handleDeleteCategoryOption,
  handleImportanceOptionCheck,
  handleCategoryClick,
  handleImportanceClick,
}) {
  return (
    <>
      {categoryOption?.map((filterOption) => (
        <DropdownButton
          className='p-1'
          onToggle={(isOpen) => {
            if (!isOpen) {
              handleCategoryClick(filterOption.label, categoryOption);
            }
          }}
          variant='Light'
          as={ButtonGroup}
          key={filterOption.label}
          id={`dropdown-variants-${filterOption.label}`}
          title={filterOption.label}
        >
          <>
            <FilterStack direction='horizontal'>
              <Form.Check
                type='checkbox'
                value='전체선택'
                tag={filterOption.label}
                onChange={(e) => handleOptionCheck(e, filterOption.label)}
                checked={categoryOption
                  .find(
                    (optionGroup) => optionGroup.label === filterOption.label
                  )
                  ?.options.every((option) => option.isChecked)}
              />
              <span className='ms-auto'>전체선택</span>
            </FilterStack>
            <hr />
            {filterOption.options.map((option, index) => (
              <FilterStack key={index} direction='horizontal'>
                <Form.Check
                  type='checkbox'
                  onChange={(e) => handleOptionCheck(e, filterOption.label)}
                  checked={option.isChecked}
                  value={option.value}
                />
                <span className='ms-auto'>{option.value}</span>
              </FilterStack>
            ))}
          </>
        </DropdownButton>
      ))}

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
            <FilterStack direction='horizontal'>
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
            </FilterStack>
            <hr />
            {filterOption.options.map((option, index) => (
              <FilterStack key={index} direction='horizontal'>
                <Form.Check
                  type='checkbox'
                  onChange={(e) =>
                    handleImportanceOptionCheck(e, filterOption.label)
                  }
                  checked={option.isChecked}
                  value={option.value}
                />
                <span className='ms-auto'>{option.value}</span>
              </FilterStack>
            ))}
          </>
        </DropdownButton>
      ))}

      {DATE_FILTER_OPTION?.map((filterOption) => (
        <DropdownButton
          className='p-1'
          variant='Light'
          as={ButtonGroup}
          key={filterOption.label}
          id={`dropdown-variants-${filterOption.label}`}
          title={filterOption.label}
          onSelect={(eventKey) =>
            handleOptionsClick(eventKey, filterOption.label)
          }
        >
          {filterOption.options.map((option, index) => (
            <Dropdown.Item key={index} eventKey={option.value}>
              {option.value}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      ))}

      <Stack direction='horizontal' gap={2} className='p-2'>
        {Object.keys(filterOptions).map((label, index) =>
          Array.isArray(filterOptions[label]) ? (
            filterOptions[label].map((option, optionIndex) => (
              <MainBadge
                bg={MAIN.MEDIUM}
                key={optionIndex}
                className='d-flex justify-content-center align-items-center '
              >
                <FilterSpan>{option.value}</FilterSpan>
                <CloseButton
                  onClick={() => {
                    handleDeleteCategoryOption(
                      label,
                      option.value,
                      optionIndex
                    );
                  }}
                />
              </MainBadge>
            ))
          ) : (
            <MainBadge
              bg={MAIN.MEDIUM}
              key={index}
              className='d-flex justify-content-center align-items-center '
            >
              <FilterSpan>{filterOptions[label]}</FilterSpan>
              <CloseButton onClick={() => handleDeleteOption(label)} />
            </MainBadge>
          )
        )}
      </Stack>
    </>
  );
}
