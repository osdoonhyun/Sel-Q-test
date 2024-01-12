import { Image } from 'react-bootstrap';
import Header from '../components/layout/Header';
import Logo from '../assets/image/sel-q-logo.webp';
import Footer from '../components/layout/Footer';
import { BodyContainer } from '../styles/LayoutStyles';
import { HomeLink } from '../styles/Styles';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <BodyContainer className='d-flex flex-column justify-content-center align-items-center'>
        <Image src={Logo} alt={'selQ-Logo'} width={100} height={100} />
        <h2 className='mt-3'>해당 페이지를 찾지 못했습니다.</h2>
        <HomeLink to='/'>홈으로 이동하기</HomeLink>
      </BodyContainer>
      <Footer />
    </>
  );
}
