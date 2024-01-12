export const filterUsers = (users, filterOption) => {
  const { 닉네임, 날짜, 권한 } = filterOption;

  switch (닉네임) {
    case '가나다순':
      return users?.sort((a, b) => a.username.localeCompare(b.username));
    case 'abc순':
      users?.sort((a, b) => {
        const nameA = a.username.toLowerCase();
        const nameB = b.username.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      break;
    default:
      break;
  }

  switch (날짜) {
    case '최신순':
      return users?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    case '오래된순':
      return users?.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    default:
      break;
  }

  switch (권한) {
    case '유저':
      return users?.filter((user) => user.roles.includes('user'));
    case '관리자':
      return users?.filter((user) => user.roles.includes('admin'));
    default:
      break;
  }

  return users;
};
