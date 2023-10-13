export const EMAIL_LIST = [
  'naver.com',
  'hanmail.net',
  'nate.com',
  'hotmai.com',
  'icloud.com',
  'google.com',
  'kakao.com',
  '직접입력',
];

export const TERMS_AND_CONDITIONS = [
  {
    label: '만 14세 이상입니다 (필수)',
    value: 'fourteenOverAgree',
    isChecked: false,
  },
  { label: '이용약관 (필수)', value: 'termsOfUseAgree', isChecked: false },
  {
    label: '개인정보수집 및 이용동의 (필수)',
    value: 'personalInfoAgree',
    isChecked: false,
  },
  {
    label: '개인정보 마케팅 활용 동의(선택)',
    value: 'marketingConsent',
    isChecked: false,
  },
  {
    label: '이벤트, 쿠폰, 특가 알림 메일 및 SMS 등 수신(선택)',
    value: 'smsAndEventAgree',
    isChecked: false,
  },
];
