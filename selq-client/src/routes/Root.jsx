import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { BodyContainer } from '../styles/LayoutStyles';

export default function Root() {
  return (
    <>
      <Header />
      <BodyContainer>
        <Outlet />
      </BodyContainer>
      <Footer />
    </>
  );
}
