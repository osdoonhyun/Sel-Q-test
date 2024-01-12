import styled from 'styled-components';
import { GREYS, MAIN } from './variables';

export const ProgressBarWrapper = styled.div`
  max-width: 800px;
  margin: 1em 1em;
  font-size: 13px;
`;

export const ProgressBarList = styled.ol`
  margin: 0 auto;
  padding: 1em 0 2em;
  list-style: none;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

export const ProgressBarStep = styled.li`
  text-align: center;
  position: relative;
  width: 100%;

  &:before,
  &:after {
    content: '';
    height: 0.5em;
    background-color: ${GREYS.LIGHT};
    position: absolute;
    z-index: 1;
    width: 100%;
    left: -50%;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.5s ease-out;
  }

  &:first-child:before,
  &:first-child:after {
    display: none;
  }

  &:after {
    background-color: ${MAIN.MEDIUM};
    width: 0%;
  }

  &.is-complete + &.is-current:after,
  &.is-complete + &.is-complete:after {
    width: 100%;
  }
`;

export const ProgressBarIcon = styled.span`
  width: 1.5em;
  height: 1.5em;
  background-color: ${GREYS.LIGHT};
  fill: ${GREYS.LIGHT};
  color: ${GREYS.LIGHT};
  border-radius: 50%;
  padding: 0.5em;
  max-width: 100%;
  z-index: 10;
  position: relative;
  transition: all 0.5s ease-out;

  ${ProgressBarStep}.is-current & {
    fill: ${MAIN.MEDIUM};
    color: ${MAIN.MEDIUM};
    background-color: ${MAIN.MEDIUM};
  }

  ${ProgressBarStep}.is-complete & {
    fill: ${GREYS.LIGHTEST};
    color: ${GREYS.LIGHTEST};
    background-color: ${MAIN.MEDIUM};
  }

  ${ProgressBarStep}.is-finished & {
    color: ${GREYS.LIGHTEST};
  }
`;

export const ProgressBarStepLabel = styled.span`
  display: block;
  text-transform: uppercase;
  color: ${GREYS.LIGHT};
  position: absolute;
  padding-top: 0.5em;
  width: 100%;
  transition: all 0.5s ease-out;

  ${ProgressBarStep}.is-current > &,
  ${ProgressBarStep}.is-complete > & {
    color: ${MAIN.MEDIUM};
  }
`;
