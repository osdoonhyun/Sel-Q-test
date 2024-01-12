import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { bookmarkedQuestions } from '../../store/Slices/bookmark';

export default function useCheckBookmarkedQuestion(question) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const bookmarkQuestions = useSelector(bookmarkedQuestions);

  const isIncludedBookmarked = bookmarkQuestions?.some(
    (bookmarkQuestion) => bookmarkQuestion.id === question?.id
  );

  const toggleBookmarked = () => {
    setIsBookmarked((prev) => !prev);
  };

  useEffect(() => {
    if (isIncludedBookmarked) {
      setIsBookmarked(true);
    }
  }, [isIncludedBookmarked]);

  return { bookmarked: isBookmarked, toggleBookmarked };
}
