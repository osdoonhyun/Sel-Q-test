import {
  ButtonGroup,
  CloseButton,
  Dropdown,
  DropdownButton,
  Stack,
} from 'react-bootstrap';
import { USER_FILTER_OPTIONS } from '../../constant/filters';
import { MAIN } from '../../styles/variables';
import { MainBadge } from '../../styles/BadgeStyles';
import { FilterSpan } from '../../styles/Styles';

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
          <MainBadge
            bg={MAIN.MEDIUM}
            key={index}
            className='d-flex justify-content-center align-items-center'
          >
            <FilterSpan>{filterOptions[label]}</FilterSpan>
            <CloseButton onClick={() => handleDeleteOption(label)} />
          </MainBadge>
        ))}
      </Stack>
    </>
  );
}
