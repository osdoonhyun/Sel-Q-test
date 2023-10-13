import {
  Badge,
  ButtonGroup,
  CloseButton,
  Dropdown,
  DropdownButton,
  Stack,
} from 'react-bootstrap';
import { USER_FILTER_OPTIONS } from '../../constant/filters';

export default function Filter({
  filterOptions,
  handleOptionsClick,
  handleDeleteOption,
}) {
  return (
    <>
      {USER_FILTER_OPTIONS.map((filterOption) => (
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
          <Dropdown.Item eventKey={filterOption.option1}>
            {filterOption.option1}
          </Dropdown.Item>
          <Dropdown.Item eventKey={filterOption.option2}>
            {filterOption.option2}
          </Dropdown.Item>
        </DropdownButton>
      ))}

      <Stack direction='horizontal' gap={2} className='p-2'>
        {Object.keys(filterOptions).map((label, index) => (
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
        ))}
      </Stack>
    </>
  );
}
