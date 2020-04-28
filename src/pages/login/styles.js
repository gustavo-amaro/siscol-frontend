import styled from "styled-components";
import "../../animations.scss";

export const Container = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #682ab5;
`;

export const LoginBox = styled.div`
  width: 300px;
  height: 320px;
  border-radius: 8px;
  box-shadow: 0 0 1px black;
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(4px);
  animation: fade 400ms;
  animation-fill-mode: backwards;
  animation-delay: 200ms;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
