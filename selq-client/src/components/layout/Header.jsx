import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Image, Row, Col } from 'react-bootstrap';
import { logOut } from '../../store/Slices/auth';
import SearchBar from '../search/SearchBar';
import FontSizeSettings from '../FontSizeSettings';
import HeaderNavItem from './HeaderNavItem';
import MenuOffcanvas from '../MenuOffcanvas';
import {
  faHouse,
  faList,
  faBars,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HeaderNav } from '../../styles/Styles';
import { GREYS } from '../../styles/variables';
import {
  HeaderContainer,
  HeaderNavBarBrand,
  HeaderNavBarBrandMd,
} from '../../styles/LayoutStyles';
import { GreyButton } from '../../styles/ButtonStyles';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  const handleUserMenuClick = (path) => {
    navigate(path);
    setShowDropdown(!showDropdown);
  };

  const logOutHandler = () => {
    dispatch(logOut());

    if (showOffcanvas) {
      handleCloseOffcanvas();
    }
    navigate('/');
  };

  return (
    <>
      <HeaderContainer className='d-none d-md-block w-100'>
        <Row className='align-items-center'>
          <Col md={2}>
            <HeaderNavBarBrandMd as={Link} to='/'>
              Sel-Q
            </HeaderNavBarBrandMd>
          </Col>
          <Col className='d-flex' md={5}>
            <HeaderNav className='me-auto'>
              <HeaderNavItem href='/' icon={faHouse} text='홈' />
              <HeaderNavItem href='/questions' icon={faList} text='질문목록' />
              <HeaderNavItem href='/importants' icon={faStar} text='중요질문' />
              <HeaderNavItem
                href='/bookmarks'
                icon={faBookmark}
                text='북마크'
              />
            </HeaderNav>
          </Col>
          <Col className='d-flex justify-content-end align-items-center' md={5}>
            <SearchBar />

            <div>
              {user && isLoggedIn ? (
                <>
                  <Button
                    variant='Light'
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <Dropdown
                      show={showDropdown}
                      onToggle={() => setShowDropdown(!showDropdown)}
                    >
                      <div className='d-none d-md-flex  flex-column align-items-center'>
                        <Image
                          src={
                            user?.profileImg ||
                            'http://www.gravatar.com/avatar/04b828795157ecfab4594b7765d9cf84?d=retro'
                          }
                          alt={user.profileImg}
                          roundedCircle
                          width={40}
                          height={40}
                        />
                      </div>

                      <Dropdown.Menu>
                        {user?.roles && user?.roles[0] === 'admin' && (
                          <>
                            <Dropdown.Item
                              onClick={() =>
                                handleUserMenuClick('/admin/post/question')
                              }
                            >
                              질문 등록
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleUserMenuClick('/admin/questions')
                              }
                            >
                              질문 관리
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handleUserMenuClick('/admin/users')
                              }
                            >
                              유저 관리
                            </Dropdown.Item>
                          </>
                        )}
                        <Dropdown.Item
                          onClick={() => handleUserMenuClick('/user')}
                        >
                          마이페이지
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logOutHandler}>
                          로그아웃
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Button>
                </>
              ) : (
                <div className='d-flex justify-content'>
                  <GreyButton
                    onClick={() => navigate('/login')}
                    variant='Light'
                  >
                    로그인
                  </GreyButton>
                  <GreyButton
                    onClick={() => navigate('/signup')}
                    variant='Light'
                  >
                    회원가입
                  </GreyButton>
                </div>
              )}
            </div>
            <FontSizeSettings />
          </Col>
        </Row>
      </HeaderContainer>

      <div className='d-md-none'>
        <Row>
          <Col className='d-flex justify-content-start'>
            <Button onClick={handleShowOffcanvas} variant='light'>
              <FontAwesomeIcon color={GREYS.MEDIUM} icon={faBars} size='xl' />
            </Button>
          </Col>
          <Col>
            <HeaderNavBarBrand
              className='d-flex justify-content-center align-items-center'
              as={Link}
              to='/'
            >
              Sel-Q
            </HeaderNavBarBrand>
          </Col>
          <Col className='d-flex justify-content-end'>
            <SearchBar />
          </Col>
        </Row>

        <Row style={{ marginTop: '-12px' }}>
          <Col>
            <HeaderNav className='d-flex me-auto align-items-center justify-content-between'>
              <HeaderNavItem href='/' icon={faHouse} text='홈' />
              <HeaderNavItem href='/questions' icon={faList} text='질문목록' />
              <HeaderNavItem href='/importants' icon={faStar} text='중요질문' />
              <HeaderNavItem
                href='/bookmarks'
                icon={faBookmark}
                text='북마크'
              />
            </HeaderNav>
          </Col>
        </Row>
      </div>

      <MenuOffcanvas
        isLoggedIn={isLoggedIn}
        user={user}
        show={showOffcanvas}
        onHide={handleCloseOffcanvas}
        logOut={logOutHandler}
      />
    </>
  );
}
