import { Fragment, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useFontSize } from '../context/FontSizingProvider';
import { useGetQuestions } from '../hooks/queries/useGetQuestions';
import CustomBadge from '../components/CustomBadge';
import CategoryCarousel from '../components/CategoryCarousel';
import { QuestionQ, QuestionTitle } from '../styles/Styles';

export default function CategoryQuestions() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { fontSizing, calcFontSize } = useFontSize();

  const { data: questions } = useGetQuestions();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredQuestions = questions?.filter(
    (question) =>
      selectedCategory === 'all' || question.category === selectedCategory
  );

  return (
    <>
      <CategoryCarousel
        questions={questions}
        onClickCategory={handleCategoryClick}
        selectedCategory={selectedCategory}
      />

      {filteredQuestions?.map((question, index) => (
        <Fragment key={question.id}>
          <LinkContainer to={`/questions/${question.id}`}>
            <div>
              <QuestionQ
                style={{
                  marginTop: index === 0 ? '20px' : '70px',
                }}
                size={calcFontSize('1.8rem', fontSizing)}
                cursor={'pointer'}
              >
                Q.
              </QuestionQ>
              <QuestionTitle
                size={calcFontSize('1.6rem', fontSizing)}
                $mbottom='0.5rem'
                cursor={'pointer'}
              >
                {question.question}
              </QuestionTitle>
            </div>
          </LinkContainer>
          <CustomBadge
            last={index === filteredQuestions.length - 1}
            text={question.category}
            onClickCategory={handleCategoryClick}
          />
        </Fragment>
      ))}
      {/* TODO:아래와 같이 리팩토링 계획(콜백함수의 인자 객체 구조분해할당)
      {filteredQuestions.map(({id, ...question}) => (
        <Question key={id} {...question} /> 
      ))} */}
    </>
  );
}
