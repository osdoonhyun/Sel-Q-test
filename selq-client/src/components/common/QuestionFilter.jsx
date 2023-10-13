import {
  Badge,
  ButtonGroup,
  CloseButton,
  Dropdown,
  DropdownButton,
  Form,
  Stack,
} from 'react-bootstrap';
import { DATE_FILTER_OPTION } from '../../constant/filters';

export default function QuestionFilter({
  filterOptions,
  categoryOption,
  handleOptionCheck,
  handleOptionsClick,
  handleDeleteOption,
  handleCategoryClick,
  handleDeleteCategoryOption,
  importanceOption,
  handleImportanceOptionCheck,
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
            <Stack style={{ padding: '0 16px' }} direction='horizontal'>
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
                  onChange={(e) => handleOptionCheck(e, filterOption.label)}
                  checked={option.isChecked}
                  value={option.value}
                />
                <span className='ms-auto'>{option.value}</span>
              </Stack>
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
              <Badge
                bg='#5bacee'
                style={{
                  fontSize: '0.8rem',
                  color: '#fff',
                  letterSpacing: '0.1rem',
                  backgroundColor: '#5bacee',
                }}
                key={optionIndex}
                className='d-flex justify-content-center align-items-center '
              >
                <span style={{ marginRight: '5px' }}>{option.value}</span>
                <CloseButton
                  onClick={() => {
                    handleDeleteCategoryOption(
                      label,
                      option.value,
                      optionIndex
                    );
                  }}
                />
              </Badge>
            ))
          ) : (
            <Badge
              bg='#5bacee'
              style={{
                fontSize: '0.8rem',
                color: '#fff',
                letterSpacing: '0.1rem',
                backgroundColor: '#5bacee',
              }}
              key={index}
              className='d-flex justify-content-center align-items-center '
            >
              <span style={{ marginRight: '5px' }}>{filterOptions[label]}</span>
              <CloseButton onClick={() => handleDeleteOption(label)} />
            </Badge>
          )
        )}
      </Stack>
    </>
  );
}
