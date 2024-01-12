import { Button } from 'react-bootstrap';
import { css, keyframes, styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MAIN, GREYS } from './variables';

export const NextButton = styled(Button)`
  background-color: ${MAIN.DARK};
  border: 1px solid ${MAIN.DARK};
  color: ${GREYS.LIGHTER};

  ${(props) =>
    props.$large &&
    css`
      height: 55px;
      width: 330px;
      padding: 15px 10px;
    `};

  ${(props) =>
    props.$my &&
    css`
      width: 280px;
    `};

  ${(props) =>
    props.signUp &&
    css`
      width: 127px;
      height: 38px;
    `};

  &:hover {
    color: ${GREYS.LIGHTEST};
    background-color: ${MAIN.MEDIUM};
  }
`;

export const GreyButton = styled(Button)`
  color: ${GREYS.MEDIUM};

  ${(props) =>
    props.$greyBorder &&
    css`
      border: 1px solid ${GREYS.LIGHT};
    `};

  &:hover {
    color: ${GREYS.MEDIUM};
    border: 1px solid ${GREYS.LIGHT};
    background-color: ${GREYS.LIGHTER};
  }
`;

export const MainButton = styled(Button)`
  color: ${MAIN.MEDIUM};
`;

const bounceAnimation = keyframes`
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) scale(1);
  }
  40% {
    transform: translateY(-10px) scale(1.2);
  }
  60% {
    transform: translateY(-5px) scale(1.1);
  }
`;

export const EyeIcon = styled(FontAwesomeIcon)`
  width: 18px;
`;

export const BookmarkButton = styled(FontAwesomeIcon)`
  color: ${(props) => (props.$isBookmarked ? MAIN.MEDIUM : GREYS.MEDIUM)};
  font-size: ${(props) => props.$isBookmarked ?? '2rem'};
  animation: ${(props) =>
      props.$clicked && props.$isBookmarked && bounceAnimation}
    0.75s;
  cursor: pointer;
`;

export const SocialLoginButton = styled(Button)`
  border: 1px solid ${GREYS.MEDIUM};
`;

export const SocialLoginSpan = styled.span`
  color: ${GREYS.DARKEST};
`;

export const SocialGreyDiv = styled.div`
  border: 1px solid ${GREYS.MEDIUM};
  padding: 18px;
  border-radius: 5px;
`;
