import { CustomStyledBadge } from '../styles/BadgeStyles';

export default function CustomBadge({ text, onClickCategory, last }) {
  return (
    <CustomStyledBadge
      bg='light'
      text='dark'
      $last={last}
      $pointer={onClickCategory}
      onClick={onClickCategory ? () => onClickCategory(text) : null}
    >
      {text}
    </CustomStyledBadge>
  );
}
