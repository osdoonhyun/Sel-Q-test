import styled, { css } from 'styled-components';
import {
  Button,
  Dropdown,
  DropdownButton,
  Nav,
  Offcanvas,
  Stack,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MAIN, GREYS, RED } from './variables';
import { Link } from 'react-router-dom';

export const HeaderNav = styled(Nav)`
  & .nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 12px;

    & > * {
      margin-top: 8px;
    }
  }
`;

export const HeaderIcon = styled(FontAwesomeIcon)`
  color: ${({ $isActive }) => ($isActive ? MAIN.MEDIUM : GREYS.MEDIUM)};
`;

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  color: ${GREYS.DARKEST};
  background-color: ${GREYS.LIGHTER};
  border: 1px solid ${GREYS.LIGHT};

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid ${MAIN.MEDIUM};
    `}
`;

export const StyledBadge = styled.span`
  font-size: 12px;
  margin: 1px;
  padding: 3px 7px;
  border-radius: 3px;
  line-height: 1.3;
  color: ${GREYS.LIGHTEST};
  background-color: ${({ selected }) => (selected ? MAIN.LIGHT : GREYS.MEDIUM)};
`;

export const HomeNextButton = styled(Button)`
  color: ${GREYS.DARKEST};
  background-color: ${GREYS.LIGHTEST};
  border: 1px solid ${GREYS.LIGHT};
  border-radius: 5px;
  &:hover {
    background-color: ${MAIN.MEDIUM};
  }
`;

export const HomeCategoryButton = styled(DropdownButton)`
  color: ${GREYS.DARKEST};
  background-color: ${GREYS.LIGHTEST};
  border: 1px solid ${GREYS.LIGHT};
  &:hover {
    background-color: ${MAIN.MEDIUM};
  }
`;

export const DeleteButton = styled(Button)`
  color: ${GREYS.LIGHTEST};
  background-color: ${MAIN.MEDIUM};
  border: 1px solid ${MAIN.LIGHT};
  &:hover {
    background-color: ${MAIN.LIGHT};
  }
`;

export const BackButton = styled.button`
  width: 35px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  text-align: left;
  /* vertical-align: justify; */

  color: ${GREYS.DARKEST};
  background-color: ${GREYS.LIGHTEST};
  border: 1px solid ${GREYS.LIGHT};
  border-radius: 10px;
  &:hover {
    background-color: ${MAIN.MEDIUM};
    color: ${GREYS.LIGHTEST};
  }
`;

// TODO: (수정 필요)이것만 하면 DropdownButton 속성이 안됨
export const HomeDropdownButton = styled(DropdownButton)`
  &:hover {
    background-color: ${MAIN.MEDIUM};
  }
`;

export const HomeDropdownItem = styled(Dropdown.Item)``;

export const QuestionQ = styled.div`
  font-size: ${(props) => props.size};
  font-weight: 500;
  cursor: ${({ cursor }) => (cursor === 'pointer' ? 'pointer' : 'default')};
`;

export const QuestionTitle = styled.div`
  font-size: ${(props) => props.size};
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.05rem;
  margin-bottom: ${(props) => props.$mbottom || '0'};
  cursor: ${(props) => (props.cursor === 'pointer' ? 'pointer' : 'default')};
`;

export const SearchInput = styled.input`
  width: 100%;
  margin-left: 10px;
  padding: 2px 6px;
  border: 0;
  border-radius: 4px;
  outline: 2px solid ${MAIN.LIGHT};
`;

export const OpacityDiv = styled.div`
  opacity: ${(props) => (props.$isStale ? 0.5 : 1)};
`;

export const SearchLi = styled.li`
  list-style: none;
  padding: 10px;
  border-radius: 5px;
  color: ${GREYS.DARKER};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${MAIN.LIGHT};
  }
`;

export const MenuNavLink = styled(Nav.Link)`
  &:hover {
    color: ${GREYS.DARK};
  }
`;

export const ErrorMessage = styled.p`
  padding-top: 4px;
  font-size: 14px;
  color: ${RED};
`;

export const RelativeSpan = styled.span`
  position: relative;
  top: -3px;
`;

export const GreySpan = styled.span`
  color: ${GREYS.MEDIUM};
`;

export const ColorSpan = styled.span`
  font-size: 15px;
  color: ${({ $isActive }) => ($isActive ? MAIN.MEDIUM : GREYS.MEDIUM)};
`;

export const ActiveSpan = styled.span`
  color: ${(props) => (props.$isActive ? GREYS.LIGHTEST : MAIN.MEDIUM)};
`;

export const AnswerDiv = styled.div`
  display: inline-block;
  margin-top: 1.2rem;
  padding-bottom: 1.2rem;
`;

export const CollapseDiv = styled.div`
  margin-top: 0.8rem;
  font-size: ${(props) => props.$calcFontSize};
  line-height: 1.2;
  letter-spacing: 0.1rem;
`;

export const MbDiv = styled.div`
  margin-bottom: ${(props) => (props.$isLastItem ? '50px' : '0')};
`;

export const GreyFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${MAIN.MEDIUM};
`;

export const RedDiv = styled.div`
  color: ${RED};
`;

export const OffcanvasTitle = styled(Offcanvas.Title)`
  color: ${MAIN.MEDIUM};
  font-weight: 600;
  font-size: 26px;
`;

export const BookmarkH2 = styled.h2`
  color: ${GREYS.LIGHT};
  height: 60vh;
`;

export const FilterStack = styled(Stack)`
  padding: 0 16px;
`;

export const FilterSpan = styled.span`
  margin-right: 5px;
`;

export const HomeLink = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  color: ${MAIN.MEDIUM};
`;

export const TableHead = styled.th`
  width: ${(props) => `${props.width}%` || 'auto'};
`;

export const TableData = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${(props) => (props.$maxW ? `${props.$maxW}px` : 'none')};
`;
