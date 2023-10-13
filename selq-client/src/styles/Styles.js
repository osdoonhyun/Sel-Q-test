import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, DropdownButton, Nav } from 'react-bootstrap';
import styled, { css } from 'styled-components';

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
  color: ${({ $isActive }) => ($isActive ? '#5BACEE' : '#B3B3B5')};
`;

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  color: #313030;
  background-color: #f9f9f9;
  border: 1px solid #c0c0ce;

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid #5bacee;
    `}
`;

export const StyledBadge = styled.span`
  font-size: 12px;
  margin: 1px;
  padding: 3px 7px;
  border-radius: 3px;
  line-height: 1.3;
  color: #f9f9f9;
  background-color: ${({ selected }) => (selected ? '#a8d0f2' : '#b3b3b5')};
`;

export const HomeNextButton = styled(Button)`
  color: #313030;
  background-color: #f9f9f9;
  border: 1px solid #c0c0ce;
  border-radius: 5px;
  &:hover {
    background-color: #5bacee;
  }
`;

export const HomeCategoryButton = styled(DropdownButton)`
  color: #313030;
  background-color: #f9f9f9;
  border: 1px solid #c0c0ce;
  &:hover {
    background-color: #5bacee;
  }
`;

export const DeleteButton = styled(Button)`
  color: #f9f9f9;
  background-color: #5bacee;
  border: 1px solid #a8d0f2;
  &:hover {
    background-color: #a8d0f2;
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

  color: #313030;
  background-color: #f9f9f9;
  border: 1px solid #c0c0ce;
  border-radius: 10px;
  &:hover {
    background-color: #5bacee;
    color: #f9f9f9;
  }
`;

// TODO: (수정 필요)이것만 하면 DropdownButton 속성이 안됨
export const HomeDropdownButton = styled(DropdownButton)`
  &:hover {
    background-color: #5bacee;
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
  margin-bottom: ${(props) => (props.mb ? props.mb : 0)};
  cursor: ${(props) => (props.cursor === 'pointer' ? 'pointer' : 'default')};
`;

export const SearchLi = styled.li`
  list-style: none;
  padding: 10px;
  border-radius: 5px;
  color: #626468;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a8d0f2;
  }
`;

export const MenuNavLink = styled(Nav.Link)`
  &:hover {
    color: #868e96;
  }
`;

export const ErrorMessage = styled.p`
  padding-top: 4px;
  font-size: 14px;
  color: #ff7777;
`;

export const StyledTd = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${(props) => props.maxWidth};
`;

// #F7F6F7 -> 밝은 회색 (Header, Footer)
// 아이콘 선택 안되었을때 #B3B3B5 -> 조금 어두운 회색
// 선택되었을때 파란색 #5bacee
// 선택되었을때 밝은 파랑: #A8D0F2
// 진한 파랑 : #2f93ea
// 글자색 검정: #313030 흰색: #f0f4f5
// 등록 글자 회삭: #1e235a66
