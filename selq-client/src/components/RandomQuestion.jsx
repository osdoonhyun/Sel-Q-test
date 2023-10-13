import { ButtonGroup, DropdownButton } from 'react-bootstrap';
import { CATEGORIES } from '../constant/categories';
import { HomeDropdownItem, HomeNextButton } from '../styles/Styles';

export default function RandomQuestion({
  selectedCategory,
  onSelect,
  getNextQuestion,
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '30px 0 15px',
      }}
    >
      <ButtonGroup>
        <HomeNextButton onClick={() => getNextQuestion(selectedCategory)}>
          다음 질문
        </HomeNextButton>

        <DropdownButton
          style={{
            color: '#313030',
            backgroundColor: '#f9f9f9',
            border: '1px solid #c0c0ce',
          }}
          variant='Light'
          as={ButtonGroup}
          title={selectedCategory}
          id='bg-nested-dropdown'
          onSelect={onSelect}
        >
          {CATEGORIES.map(({ category }, index) => (
            <HomeDropdownItem key={index} eventKey={category}>
              {category}
            </HomeDropdownItem>
          ))}
        </DropdownButton>
      </ButtonGroup>
    </div>
  );
}
