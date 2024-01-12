import { Nav } from 'react-bootstrap';
import { ColorSpan, HeaderIcon } from '../../styles/Styles';
import { Link, useLocation } from 'react-router-dom';

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

export default function HeaderNavItem({ href, icon, text }) {
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
      <ColorSpan $isActive={isActive}>{text}</ColorSpan>
    </Nav.Link>
  );
}
