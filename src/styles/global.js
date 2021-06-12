import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
body{
  font-family: Ubuntu, sans-serif;
  color: ${(props) => props.theme.colors.text}
}
:root{
    --primary: #2c77f2;
    --primary-dark: #163d7d;
    --secondary: #5b90eb;
    --secondary-light: #a4bfed;
    --danger: #d32121;
    --success: #27B54B;
    --warning: #f4b400;
    --backcolor: #dde3ed;
  }
.btn{
  height: 50px;
  border-radius: 10px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary{
  background-color: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.primary};
  &:hover{
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
  &:active{
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
  &:disabled{
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
}

.form-control{
  border-radius: 10px;
  height: 50px;
  font-size: 18px;
}

.input-group-text{
  border-radius: 10px 0 0 10px;
  width: 50px;
  display: flex;
  justify-content: center;
}

.secondary{
  background-color: ${(props) => props.theme.colors.text};
}

.alert{
  border-radius: 10px;
}

.App {
  position: absolute;
  display: flex;
  min-height: 100%;
  width: 100%;
  color: #4a4a4a;
  .text-color{
    color: #4a4a4a;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    background: var(--backcolor);
  }
  .main-content {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    padding: 0 20px;
    box-sizing: border-box;
  }
  
  .pagination li.active {
    background-color: var(--primary);
  }

  .pagination li a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .pagination{
    padding-bottom: 5px;
  }
}

`;
