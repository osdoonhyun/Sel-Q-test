// 모든 value가 '', 0, [] 이외의 값을 가지면 true 반환
export const hasValue = (obj) => {
  if (obj === null) {
    return false;
  }

  return Object.entries(obj).some(([_, value]) => {
    if (
      value !== '' &&
      value !== 0 &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      return true;
    }

    return false;
  });
};
