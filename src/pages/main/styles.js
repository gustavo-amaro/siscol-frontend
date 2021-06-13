import styled from 'styled-components';
import "../../animations.scss";
import { ScaleMacAnimation } from '../../styles/animations';

export const Container = styled.div`
  h1{
    font-size: 72px;
    margin: 100px 0 135px 0;
    animation: ${ScaleMacAnimation} 500ms;
    animation-fill-mode: backwards;
  }
  .btn{
    max-width: 300px;
    width: 100%;
    height: 140px;
    font-size: 24px;
    font-weight: bold;
  }
`;

export const ButtonAction = styled.button`
  animation: ${ScaleMacAnimation} 500ms;
  animation-fill-mode: backwards;
  animation-delay: ${props => props.delay ? props.delay+'ms' : '600ms'};
`;