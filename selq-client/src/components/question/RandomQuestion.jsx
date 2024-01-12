import { ButtonGroup, DropdownButton } from 'react-bootstrap';
import { CATEGORIES } from '../../constant/categories';
import { HomeDropdownItem, HomeNextButton } from '../../styles/Styles';
import { GREYS } from '../../styles/variables';

export default function RandomQuestion({
  selectedCategory,
  onSelect,
  getNextQuestion,
}) {
  return (
    <div className='d-flex justify-content-center mt-4 mb-3'>
      <ButtonGroup>
        <HomeNextButton onClick={() => getNextQuestion(selectedCategory)}>
          다음 질문
        </HomeNextButton>

        {/* TODO:styled-components 사용시 커스텀 안됨 */}
        <DropdownButton
          style={{
            color: GREYS.DARKEST,
            backgroundColor: GREYS.LIGHTEST,
            border: `1px solid ${GREYS.LIGHT}`,
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
