import { useCallback, useEffect, useState } from 'react';
import Question from '../components/Question';
import RandomQuestion from '../components/RandomQuestion';
import Hint from '../components/common/Hint';
import Answer from '../components/common/Answer';
import { useQuestionsQuery } from '../services/api';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [prevIndex, setPrevIndex] = useState(-1);
  const [randomQuestion, setRandomQuestion] = useState({});

  const { data: questions } = useQuestionsQuery({
    category: selectedCategory,
  });

  const getRandomQuestion = useCallback(() => {
    if (questions && questions.length > 0) {
      let randomIndex;

      do {
        randomIndex = Math.floor(Math.random() * questions.length);
      } while (randomIndex === prevIndex);
      setPrevIndex(randomIndex);
      setRandomQuestion(questions[randomIndex]);
    }
  }, [questions, prevIndex]);

  const handleDropdownCategorySelect = useCallback((eventKey) => {
    setSelectedCategory(eventKey);
  }, []);

  useEffect(() => {
    if (questions) {
      getRandomQuestion();
    }
  }, [questions]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <RandomQuestion
        selectedCategory={selectedCategory}
        getNextQuestion={getRandomQuestion}
        onSelect={handleDropdownCategorySelect}
      />
      <Question question={randomQuestion}>
        <Hint hints={randomQuestion?.hints} />
        <Answer answers={randomQuestion?.answers} />
      </Question>
    </div>
  );
}
