import { createSlice } from '@reduxjs/toolkit';

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: {
    bookmarkedQuestions: [],
  },
  reducers: {
    toggleBookmark: (state, action) => {
      const questionInfo = action.payload;

      const updatedQuestion = {
        ...questionInfo,
        isBookmarked: !state.bookmarkedQuestions.some(
          (question) => question.id === questionInfo?.id
        ),
      };

      const isIncludedBookmarked = state.bookmarkedQuestions.some(
        (question) => question.id === questionInfo?.id
      );

      if (isIncludedBookmarked) {
        state.bookmarkedQuestions = state.bookmarkedQuestions.filter(
          (question) => question.id !== questionInfo?.id
        );
      } else {
        state.bookmarkedQuestions.push(updatedQuestion);
      }
    },
  },
});

export const { toggleBookmark } = bookmarkSlice.actions;

const bookmarkedQuestions = (state) => state.bookmark.bookmarkedQuestions;

export { bookmarkSlice, bookmarkedQuestions };
