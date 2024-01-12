import { styled } from 'styled-components';
import { Container, NavbarBrand } from 'react-bootstrap';
import { GREYS, MAIN } from './variables';

export const BodyContainer = styled.div`
  width: 100%;
  padding: 20px;
  min-height: calc(100vh - 150px);
  max-width: 1080px;
  margin: 0 auto;
`;

export const FooterDiv = styled.div`
  height: 60px;
  bottom: 0;
  font-weight: 500;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${GREYS.LIGHTER};
  color: ${GREYS.DARKEST};
`;

export const FormContainerDiv = styled.div`
  max-width: 390px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

export const LayoutContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: BMHANNAPro;
`;

export const SocialContainer = styled(Container)`
  max-width: 380px;
`;

export const MyPageContainer = styled(Container)`
  max-width: 550px;
`;

export const PostingContainer = styled(Container)`
  width: 90%;
  min-width: 390px;
`;

export const HeaderContainer = styled(Container)`
  padding-bottom: 10px;
  max-width: 1080px;
  margin: 0 auto;
`;

export const HeaderNavBarBrandMd = styled(NavbarBrand)`
  font-size: 32px;
  font-weight: 600;
  color: ${MAIN.MEDIUM};
  text-decoration: none;
`;

export const HeaderNavBarBrand = styled(NavbarBrand)`
  padding: 5px 0;
  font-size: 26px;
  font-weight: 600;
  color: ${MAIN.MEDIUM};
  text-decoration: none;
`;
