import styled from "styled-components";

export const Container = styled.div`
  @import "../../animations.scss";
  .animate {
    animation: fade 400ms;
    animation-fill-mode: backwards;
    animation-delay: 400ms;
  }
  .table-rounded {
    border-radius: 5px;
  }
`;
export const FormSearch = styled.form`
  display: flex;
  width: 40%;
  align-items: center;
  margin-left: 20px;
  input {
    &::placeholder {
      color: #fff;
    }
  }
`;
