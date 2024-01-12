import { SearchLi } from '../../styles/Styles';

export default function SearchQuetions({
  searchInput,
  searchResults,
  questionClickHandler,
}) {
  if (searchInput === '') return null;

  if (searchResults && searchResults.length === 0) {
    return (
      <p>
        No Results for <em>"{searchInput}"</em>
      </p>
    );
  }

  return (
    <ul className='p-0'>
      {searchResults &&
        searchResults.map(({ id, question }) => (
          <SearchLi key={id} onClick={() => questionClickHandler(id)}>
            {question}
          </SearchLi>
        ))}
    </ul>
  );
}
