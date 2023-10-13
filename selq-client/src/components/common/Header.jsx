import {
  Button,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
} from 'react-bootstrap';
import {
  faHouse,
  faList,
  faBars,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'react-bootstrap';
import { HeaderIcon, HeaderNav } from '../../styles/Styles';
import SearchBar from '../ui/SearchBar';
import FontSizeSettings from '../ui/FontSizeSettings';
import MenuOffcanvas from './MenuOffcanvas';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/Slices/auth';
import useAuth from '../../hooks/useAuth';

function isPathMatch(targetPath, currentPath) {
  if (targetPath === '/') {
    return currentPath === '/';
  }

  const cleanTargetPath = targetPath.endsWith('/')
    ? targetPath.slice(0, -1)
    : targetPath;
  const cleanCurrentPath = currentPath.endsWith('/')
    ? currentPath.slice(0, -1)
    : currentPath;
  return cleanCurrentPath.startsWith(cleanTargetPath);
}

const NavItem = ({ href, icon, text }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = isPathMatch(href, currentPath);
  return (
    <Nav.Link as={Link} to={href}>
      <HeaderIcon
        className='d-none d-md-block'
        icon={icon}
        size='xl'
        $isActive={isActive}
      />
      <span
        style={{ fontSize: '15px', color: isActive ? '#5BACEE' : '#B3B3B5' }}
      >
        {text}
      </span>
    </Nav.Link>
  );
};

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { isLoggedIn, user } = useAuth();

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
      <Container
        style={{ paddingBottom: '10px', maxWidth: '1080px', margin: '0 auto' }}
        className='d-none d-md-block w-100'
      >
        <Row className='align-items-center'>
          <Col md={2}>
            <Navbar.Brand
              as={Link}
              to='/'
              style={{
                fontSize: '26px',
                fontWeight: '600',
                color: '#5bacee',
              }}
            >
              Sel-Q
            </Navbar.Brand>
          </Col>
          <Col className='d-flex' md={5}>
            <HeaderNav className='me-auto'>
              <NavItem href='/' icon={faHouse} text='홈' />
              <NavItem href='/questions' icon={faList} text='질문목록' />
              <NavItem href='/importants' icon={faStar} text='중요질문' />
              <NavItem href='/bookmarks' icon={faBookmark} text='북마크' />
            </HeaderNav>
          </Col>
          <Col className='d-flex justify-content-end align-items-center' md={5}>
            <SearchBar />

            <div>
              {user && isLoggedIn ? (
                <>
                  <Button
                    variant='Ligth'
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <Dropdown
                      show={showDropdown}
                      onToggle={() => setShowDropdown(!showDropdown)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                        className='d-none d-md-flex align-items-center'
                      >
                        <Image
                          src={
                            user?.profileImg ||
                            'http://www.gravatar.com/avatar/04b828795157ecfab4594b7765d9cf84?d=retro'
                          }
                          alt={user.profileImg}
                          roundedCircle
                          style={{ width: '40px', height: '40px' }}
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
                  <Button
                    onClick={() => navigate('/login')}
                    style={{ color: '#B3B3B5' }}
                    variant='Light'
                  >
                    로그인
                  </Button>
                  <Button
                    onClick={() => navigate('/signup')}
                    style={{ color: '#B3B3B5' }}
                    variant='Light'
                  >
                    회원가입
                  </Button>
                </div>
              )}
            </div>
            <FontSizeSettings />
          </Col>
        </Row>
      </Container>

      <div className='d-md-none'>
        <Row>
          <Col className='d-flex justify-content-start'>
            <Button onClick={handleShowOffcanvas} variant='light'>
              <FontAwesomeIcon color='#B3B3B5' icon={faBars} size='xl' />
            </Button>
          </Col>
          <Col>
            <Navbar.Brand
              as={Link}
              to='/'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px 0',
                fontSize: '28px',
                fontWeight: '600',
                color: '#5bacee',
              }}
            >
              Sel-Q
            </Navbar.Brand>
          </Col>
          <Col className='d-flex justify-content-end'>
            <SearchBar />
          </Col>
        </Row>

        <Row style={{ marginTop: '-12px' }}>
          <Col>
            <HeaderNav
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              className='me-auto'
            >
              <NavItem href='/' icon={faHouse} text='홈' />
              <NavItem href='/questions' icon={faList} text='질문목록' />
              <NavItem href='/importants' icon={faStar} text='중요질문' />
              <NavItem href='/bookmarks' icon={faBookmark} text='북마크' />
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
