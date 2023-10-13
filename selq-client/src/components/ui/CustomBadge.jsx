import { Badge } from 'react-bootstrap';

export default function CustomBadge({ text, onClickCategory, last }) {
  return (
    <Badge
      bg='light'
      text='dark'
      style={{
        border: '1px solid black',
        borderRadius: '10px',
        padding: '6px',
        letterSpacing: '0.5px',
        display: 'inline-block',
        marginRight: '7px',
        marginBottom: last && '50px',
        cursor: onClickCategory ? 'pointer' : 'default',
      }}
      onClick={onClickCategory ? () => onClickCategory(text) : undefined}
    >
      {text}
    </Badge>
  );
}
