import { GREYS, YELLOW } from '../styles/variables';

export const FONT_SIZE_OPTIONS = [
  { label: '축소', size: '15px', variant: 'small' },
  { label: '기본', size: '18px', variant: 'basic' },
  { label: '확대', size: '21px', variant: 'large' },
];

export const IMPORTANCE_OPTIONS = [
  { label: '안중요', level: 0, color: GREYS.MEDIUM },
  { label: '중요하지 않음', level: 1, color: YELLOW },
  { label: '약간 중요', level: 2, color: YELLOW },
  { label: '다소 중요', level: 3, color: YELLOW },
  { label: '중요', level: 4, color: YELLOW },
  { label: '매우 중요', level: 5, color: YELLOW },
];

export const CATEGORIES = [
  { category: 'All', label: 'all' },
  { category: 'HTML/CSS', label: 'html/css' },
  { category: 'React', label: 'react' },
  { category: 'JavaScript', label: 'javascript' },
  { category: 'TypeScript', label: 'typescript' },
  { category: 'CS', label: 'cs' },
];

export const IMPORTANCES = [
  { label: '중요하지 않음', level: 1 },
  { label: '약간 중요', level: 2 },
  { label: '다소 중요', level: 3 },
  { label: '중요', level: 4 },
  { label: '매우 중요', level: 5 },
];

const POPUP_OPTIONS = {
  width: 400,
  height: 500,
  left: window.innerWidth / 2 - 200, // 화면 가운데 정렬
  top: window.innerHeight / 2 - 250,
};

export const POPUP_STRING = Object.entries(POPUP_OPTIONS)
  .map(([key, value]) => `${key}=${value}`)
  .join(',');
