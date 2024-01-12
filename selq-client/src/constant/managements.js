export const USER_MANAGEMENT = {
  label: 'user',
  tableHead: [
    { width: 4, label: '#', className: 'text-center d-none d-md-table-cell' },
    { width: 24, label: '닉네임', className: '' },
    { width: 28, label: '계정', className: '' },
    { width: 16, label: '가입 날짜', className: 'text-center text-nowrap' },
    { width: 10, label: '유저 권한', className: 'text-center text-nowrap' },
    { width: 10, label: '가입 유형', className: 'text-center text-nowrap' },
    { width: 8, label: '옵션', className: 'text-center' },
  ],
};

export const QUESTION_MANAGEMENT = {
  label: 'question',
  tableHead: [
    { width: 4, label: '#', className: 'text-center d-none d-md-table-cell' },
    { width: 56, label: '질문', className: '' },
    { width: 12, label: '카테고리', className: 'text-center text-nowrap' },
    { width: 8, label: '중요도', className: 'text-center text-nowrap' },
    { width: 12, label: '등록 날짜', className: 'text-center text-nowrap' },
    { width: 8, label: '옵션', className: 'text-center' },
  ],
};
