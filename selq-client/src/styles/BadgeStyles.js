import { Badge } from 'react-bootstrap';
import { css, styled } from 'styled-components';
import { GREYS, MAIN } from './variables';

export const MainBadge = styled(Badge)`
  font-size: 0.8rem;
  color: ${GREYS.LIGHTER};
  letter-spacing: 0.1rem;
  background-color: ${MAIN.MEDIUM};
`;

export const CustomStyledBadge = styled(Badge)`
  display: inline-block;
  border: 1px solid black;
  border-radius: 10px;
  padding: 6px;
  letter-spacing: 0.5px;
  margin-right: 7px;

  ${(props) =>
    props.$last &&
    css`
      margin-bottom: 50px;
    `}

  cursor: ${(props) => (props.$pointer ? 'pointer' : 'default')};
`;
