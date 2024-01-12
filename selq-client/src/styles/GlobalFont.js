import BMHANNAPro from '../assets/font/BMHANNAPro.woff';
import { createGlobalStyle } from 'styled-components';

export const GlobalFont = createGlobalStyle`
  @font-face {
    font-family: 'BMHANNAPro';
    src: local('BMHANNAPro'), url(${BMHANNAPro}) format('woff');
    font-weight: normal;
  }
`;
