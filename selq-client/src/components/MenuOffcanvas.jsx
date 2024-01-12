import {
  Offcanvas,
  Nav,
  Button,
  Image,
  Stack,
  Row,
  Col,
} from 'react-bootstrap';
import { GreySpan, MenuNavLink, OffcanvasTitle } from '../styles/Styles';
import { MENU_PAGES } from '../constant/paths';

export default function MenuOffcanvas({
  user,
  isLoggedIn,
  show,
  onHide,
  logOut,
}) {
  return (
    <Offcanvas className='d-md-none' show={show} onHide={onHide}>
      <Offcanvas.Header closeButton>
        <OffcanvasTitle>Sel-Q</OffcanvasTitle>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {user !== null ? (
          <Row>
            <Col xs='auto'>
              <Image
                src={
                  user?.profileImg ||
                  'http://www.gravatar.com/avatar/04b828795157ecfab4594b7765d9cf84?d=retro'
                }
                alt={user?.profileImg}
                roundedCircle
                height={50}
                width={50}
              />
            </Col>
            <Col>
              <Stack gap={2} className='col-md-5 mx-auto'>
                <span>{user?.username}</span>
                <GreySpan>
                  {user?.roles && user?.roles[0] === 'admin'
                    ? '관리자'
                    : '일반유저'}
                </GreySpan>
              </Stack>
            </Col>
          </Row>
        ) : (
          <Stack className='mx-2' direction='horizontal' gap={3}>
            <Nav.Link href='/login'>로그인</Nav.Link>
            <Nav.Link href='/signup'>회원가입</Nav.Link>
          </Stack>
        )}

        <hr />

        <ul className='list-unstyled mx-3 my-4'>
          {MENU_PAGES?.map(({ path, label }, index) => (
            <li className='my-3' key={index}>
              <MenuNavLink href={path} onClick={onHide}>
                {label}
              </MenuNavLink>
            </li>
          ))}
        </ul>
        <hr />

        {/* ADMIN의 경우 */}
        <ul className='list-unstyled mx-3 my-4'>
          {user?.roles && user?.roles[0] === 'admin' && (
            <>
              <li>
                <MenuNavLink className='my-3 ' href='/admin/post/question'>
                  질문등록
                </MenuNavLink>
              </li>
              <li>
                <MenuNavLink className='my-3 ' href='/admin/questions'>
                  질문관리
                </MenuNavLink>
              </li>
              <li>
                <MenuNavLink className='my-3 ' href='/admin/users'>
                  유저관리
                </MenuNavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <li>
              <MenuNavLink className='my-3' href='/user'>
                마이페이지
              </MenuNavLink>
            </li>
          )}
        </ul>
      </Offcanvas.Body>

      {isLoggedIn && (
        <div className='d-flex justify-content-end'>
          <Button onClick={logOut} className='w-50 mb-2' variant='Light'>
            로그아웃
          </Button>
        </div>
      )}
    </Offcanvas>
  );
}
