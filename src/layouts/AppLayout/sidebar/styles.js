import styled from "styled-components";
import "../../../animations.scss";

export const Container = styled.div`
  box-sizing: border-box;
  min-height: 100%;
  width: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s;
  background-color: #333;
  .brand {
    display: flex;
    width: 100%;
    height: 100px;
    line-height: 0px;
    align-items: center;
    justify-content: center;
    .icon {
      left: 40px;
      font-size: 2em;
      margin: 0;
      padding: 0;
      transform: rotate(-45deg);
    }
    .title {
      font-size: 15pt;
    }
  }
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0 !important;
    align-items: center;
  }
  li {
    display: flex;
    padding: 7px;
    padding-left: 15px;
    transition: all 0.4s;
    font-size: 12pt;
    width: 100%;
    align-items: center;
    justify-content: center;
    a {
      width: 100%;
      color: #b8c7ce;
    }
    .showSidebar {
      animation-name: moveShow;
      animation-duration: 400ms;
      animation-fill-mode: forwards;
    }
    .hideSidebar {
      animation-name: moveHide;
      animation-duration: 400ms;
      animation-fill-mode: forwards;
    }
  }
`;

export const Item = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background: ${(props) =>
    props.active ? "rgba(0, 0, 0, 0.2)" : "tranparent"};
  span {
    color: ${(props) => props.active && "#fff"};
  }
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
  }
`;
