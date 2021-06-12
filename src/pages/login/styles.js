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

const ScaleMacAnimation = keyframes`
  from {
    transform: scale(1.2);
    opacity: 0;
  }to{
    transform: scale(1);
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
  background: ${(props) => props.theme.colors.background};
  flex-wrap: wrap;
  #logo-login {
    max-width: 253;
    max-height: 133px;
    position: absolute;
    margin-top: -180px;
  }
`;

export const TextLogin = styled.h1`
  color: white;
  font-size: 24px;
  font-family: "Ubuntu", sans-serif;
  width: 45%;
  text-align: center;
  margin-right: 5%;
  font-weight: 400;
  animation-delay: 400ms;
  animation-fill-mode: backwards;
`;

export const Square = styled.div`
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.6);
  position: absolute;
  animation: ${SpinnerAnimation} 3s infinite;
  ${(props) => props.right && "right: " + props.right + "px;"}
  ${(props) => props.left && "left: " + props.left + "px;"}
  ${(props) => props.top && "top: " + props.top + "px;"}
  ${(props) => props.bottom && "bottom: " + props.bottom + "px;"}
  animation-delay: ${(props) => (props.delay ? props.delay + "ms" : "50ms")};
  animation-timing-function: linear;
`;

export const LoginBox = styled.div`
  animation: ${ScaleMacAnimation} 500ms;
  animation-fill-mode: backwards;
`;

export const FooterBox = styled.div`
  display: flex;
  width: 380px;
  height: 70px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  box-shadow: 0 0 1px black;
  padding: 10px;
  margin-top: 20px;
  animation: ${ScaleMacAnimation} 300ms;
  animation-fill-mode: backwards;
  animation-delay: 500ms;
  span {
    font-size: 15px;
    text-align: center;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 100%;
  .button-submit {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    button {
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
