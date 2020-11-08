import styled, { keyframes } from "styled-components";
import "../../animations.scss";


const SpinnerAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const OpacityAnimation = keyframes`
  from {
    opacity: 0;
  }
  to: {
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#682ab5, #2D0A5A);
  flex-wrap: wrap-reverse;
`;

export const TextLogin = styled.h1`
  color: white;
  font-size: 24px;
  font-family: 'Ubuntu', sans-serif;
  width: 45%;
  text-align: center;
  margin-right: 5%;
  font-weight: 400;
  animation: ${OpacityAnimation} 3s;
  animation-delay: 400ms;
  animation-fill-mode: backwards;
`;

export const Square = styled.div`
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, .6);
  position: absolute;
  animation: ${SpinnerAnimation} 3s infinite;
  ${props=>props.right&&'right: '+props.right+'px;'}
  ${props=>props.left&&'left: '+props.left+'px;'}
  ${props=>props.top&&'top: '+props.top+'px;'}
  ${props=>props.bottom&&'bottom: '+props.bottom+'px;'}
  animation-delay: ${props=>props.delay?props.delay+'ms': '50ms'};
  animation-timing-function: linear;
`;

export const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 320px;
  border-radius: 10px;
  box-shadow: 0 0 1px black;
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(4px);
  animation: fade 400ms;
  animation-fill-mode: backwards;
  animation-delay: 200ms;
  flex-direction: column;
  z-index: 2;
`;

export const FooterBox = styled.div`
display: flex;
  width: 100%;
  height: 70px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  box-shadow: 0 0 1px black;
  padding: 10px;
  color: #fff;
  span {
    font-size: 15px;
    text-align: center;
    a{
      color: #682ab5;
    }
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 100%;
  .button-submit{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    button{
      width: 67px;
      height: 53px;
      font-size: 22px;
      border-radius: 10px;
      margin-right: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
`;
