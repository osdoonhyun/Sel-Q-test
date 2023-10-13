export const USER_FILTER_OPTIONS = [
  { label: '닉네임', option1: '가나다순', option2: 'abc순' },
  { label: '날짜', option1: '최신순', option2: '오래된순' },
  { label: '권한', option1: '유저', option2: '관리자' },
];

export const IMPORTANCE_FILTER_OPTION = [
  {
    label: '중요도',
    options: [
      { label: 1, value: '중요하지 않음', isChecked: false },
      { label: 2, value: '약간 중요', isChecked: false },
      { label: 3, value: '다소 중요', isChecked: false },
      { label: 4, value: '중요', isChecked: false },
      { label: 5, value: '매우 중요', isChecked: false },
    ],
  },
];

export const CATEGORY_FILTER_OPTION = [
  {
    label: '카테고리',
    options: [
      { label: 'html/css', value: 'HTML/CSS', isChecked: false },
      { label: 'react', value: 'React', isChecked: false },
      { label: 'javascript', value: 'JavaScript', isChecked: false },
      { label: 'typescript', value: 'TypeScript', isChecked: false },
      { label: 'cs', value: 'CS', isChecked: false },
    ],
  },
];

export const DATE_FILTER_OPTION = [
  {
    label: '날짜',
    options: [
      { label: 'DESC', value: '최신순' },
      { label: 'ASC', value: '오래된순' },
    ],
  },
];
